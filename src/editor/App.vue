<template>
  <div 
    class="container-fluid" 
    @keydown.ctrl.83="onKeyEvent($event, 'save')"
    @keydown.ctrl.76="onKeyEvent($event, 'clear')"
    @keydown.ctrl.13="onKeyEvent($event, 'run')">

    <!-- main header -->
    <Header class="row">
      <div class="col">
        <!-- common tools -->
        <Toolbar :onRun="onRun" :onSave="onSave" :onLint="onLint" :onTidy="onTidy" />

        <!-- User Profile section -->
        <div class="esf user-profile">
          <ul>
            <li v-if="isLoggedIn" class="hint--bottom-left" aria-label="View Profile">
              <a href="/github/myProfile"><i class="fa fa-user"></i></a>
            </li>
            <li v-if="isLoggedIn" class="hint--bottom-left" aria-label="Logout">
              <a href="/github/logout"><i class="fa fa-sign-out"></i></a>
            </li>
            <li v-if="!isLoggedIn" class="hint--bottom-left" aria-label="Login">
              <a href="/auth/github"><i class="fa fa-sign-in"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </Header>
    <div class="esf content row">
      <!-- Side navigation bar -->
      <Navbar class="col-auto" />

      <!-- main content area -->
      <main class="col">
        <div class="row flex-column">
          <!-- IDE -->
          <IDE ref="$ide" class="col" :examples="examples" :lightsOn="true" :changePrivacy="onChangePrivacy" :loadExample="onLoadExample" />
          <!-- Console -->
          <Console ref="$console" class="col-auto" />
        </div>
      </main>
    </div>

    <!-- notifications container -->
    <notifications position="bottom right" />
  </div>
</template>

<script>
// import base application components
import Header from './components/commons/Header';
import Navbar from './components/commons/Navbar';
import Toolbar from './components/commons/Toolbar';
// main IDE
import IDE from './components/ide';
// application console
import Console from './components/console';

export default {
  components: {
    Header,
    Navbar,
    Toolbar,
    IDE,
    Console
  },

  props: {
    examples: { type: Array, required: true }
  },

  data: function() {
    return {
      isLoggedIn: false
    }
  },

  /** application callback handlers */
  methods: {
    /** Toolbar buttons callback handlers */
    onRun() {
      this.$refs.$console.dispatchCommand('run');
    },
    onSave() {
      this.$refs.$console.dispatchCommand('save');
    },
    onLint() {
      this.$refs.$console.dispatchCommand('lint');
    },
    onTidy() {
      this.$refs.$console.dispatchCommand('tidy');
    },

    /** IDE callback handlers */
    onChangePrivacy(callback) {
      this.$api.togglePrivacy()
        .then(() => callback(true))
        .catch((error) => {
          this.$notify({
            type: 'error',
            text: error.message
          });
          callback(false);
        })
    },
    onLoadExample(index, callback) {
      callback(this.examples[index].code);
    },

    // global key events proxy
    onKeyEvent(event, code, special=false) {
      event.preventDefault();
      if(!special)
        return this.$refs.$console.dispatchCommand(code);
    },
  },

  mounted: function() {
    // configure console
    // 1. save command
    this.$refs.$console.addCommand('save', (a, { write, release }) => {
      write('Saving fiddle...');
      this.$notify("Saving fiddle...");
      this.$api.save(this.$refs.$ide.value()).then(() => {
        write('Fiddle saved!');
        this.$notify({
          type: 'success',
          text: 'Fiddle saved!'
        });
      }).catch((reason) => {
        write(reason || 'Cannot save fiddle! Try again later...');
        this.$notify({
          type: 'error',
          text: (reason || 'Cannot save fiddle! Try again later...'),
        });
      }).then(release);
    });

    // 2. lint command
    this.$refs.$console.addCommand('lint', (a, { write, release }) => {
      write('Linting your code...')
      this.$notify('Linting your code...');
      this.$refs.$ide.removeErrors();
      this.$api.lint(this.$refs.$ide.value()).then(() => {
        write('Hurray! Your code is lint free...');
        this.$notify({
          type: 'success',
          text: 'Hurray! Your code is lint free...',
        });
      }).catch((errors) => {
        this.$notify({
          type: 'error',
          text: 'Lint failed',
        });
        errors.forEach((error) => {
          write(`Line ${error.line}: ${error.reason}`);
          this.$refs.$ide.addError(error.line-1, error.reason)
        });
      }).then(release);
    });

    // 3. Tidy command
    this.$refs.$console.addCommand('tidy', (a, { write, release }) => {
      write("Tidying your code...");
      this.$notify('Tidying your code...');
      this.$api.tidy(this.$refs.$ide.value()).then((beautified) => {
        write('Done tidying! Your code looks good now...');
        this.$notify({
          type: 'success',
          text: 'Done tidying! Your code looks good now...',
        });
        this.$refs.$ide.value(beautified);
        release();
      });
    });
  }
};
</script>

<style lang="less">
.container-fluid {
  height: 100%;
}
.esf.content.row {
  height: ~'calc(100% - 48px)';
}
main.col {
  > .row {
    height: 100%;
  }
}

.esf.user-profile {
  height: 100%;
  float: right;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    
    li {
      display: inline-block;
      margin: 0;
      padding: 0;

      a {
        text-transform: uppercase;
        display: inline-block;
        color: #fff;
        padding-left: 15px; 
        line-height: 3;
        font-size: 14px;
        font-weight: bold;

        &:hover {
          text-decoration: none;
        }
      }
    }
  }
}
</style>
