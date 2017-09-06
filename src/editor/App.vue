<template>
  <div class="container-fluid">
    <!-- main header -->
    <Header class="row">
      <div class="col">
        <!-- common tools -->
        <Toolbar />
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
          <IDE class="col" :lightsOn="true" />
          <!-- Console -->
          <Console class="col-auto" />
        </div>
      </main>
    </div>
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
  data: function() {
    return {
      isLoggedIn: true
    }
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
