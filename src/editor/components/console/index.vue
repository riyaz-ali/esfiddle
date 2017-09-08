<template>
  <div class="esf console">
    <div class="toggle" @click="displayConsole = !displayConsole">
      Console
      <i class="fa pull-right" :class="{'fa-caret-up': !displayConsole, 'fa-caret-down': displayConsole}"></i>
    </div>
    <div class="console-container" :class="{'hidden': !displayConsole}">
      <div class="display" ref="terminal"></div>
      <div class="input">
        <i class="fa fa-chevron-right"></i> <input :disabled="isConsoleLocked" @keyup.enter="dispatchCommand(command), (command='')" type="text" v-model="command" />
      </div>
    </div>
  </div>
</template>

<script>
import CodeMirror from "codemirror";

/* adding helpers */
//- add a line to the console
CodeMirror.prototype.writeLine = function(...content) {
  let doc = this.getDoc();
  let cursor = doc.getCursor(); // gets the line number in the cursor position
  let line = doc.getLine(cursor.line); // get the line contents
  let pos = { // create a new object to avoid mutation of the original selection
    line: cursor.line,
    ch: line.length - 1 // set the character position to the end of the line
  }
  doc.replaceRange(content.join(' ') + '\n', pos); // adds a new line

  // scroll to end
  this.scrollToEnd();

  return this;
};

// clear the console
CodeMirror.prototype.clear = function() {
  this.setValue("");
  this.clearHistory();

  return this;
};

// scrolls the console to last line
CodeMirror.prototype.scrollToEnd = function() {
  this.scrollIntoView({ line: this.lastLine(), ch: 0 });

  return this;
}

export default {
  data: function() {
    return {
      displayConsole: true,
      _console: null,
      command: "",
      commands: {
      },
      isConsoleLocked: false,
    }
  },
  mounted: function() {
    this._console = CodeMirror(this.$refs.terminal, {
      showLineNumbers: false,
      readOnly: "nocursor",
      lineWrapping: true,
      mode: "shell",
      theme: "base16-dark"
    });

    // default lines
    [
      "Welcome to ESFiddle!",
      "Press `ctrl + s` or type 'save' to save",
      "Press `ctrl + l` or type 'clear' to clear console",
      "Press `ctrl + enter` or type 'run' to run fiddle",
    ].forEach(line => this._console.writeLine(line));

    // clear the console
    this.addCommand('clear', function(a, {clear:c, release}) { c(); release(); })
    // display help
    this.addCommand('help', function(a, {write, release}) {
      write("'save': save the fiddle");
      write("'clear': clear the console");
      write("'run': run the fiddle");
      release();
    });
  },

  /** Console interface API */
  methods: {
    /**
     * add a command that this console instance can 'understand'
     *
     * @param name {string} The name of the command that the console will parse
     * @param handler {Function} The handler function for the command.
     * The signature for the handler must be,
     * handler = (args: Object, interface: Object)
     * The interface object contains following methods:
     *   write(): write a line to the console
     *   clear(): clears the console
     */
    addCommand(name, handler) {
      this.commands[name] = handler;
    },

    /**
     * Dispatches a command
     *
     * @param cmd {string} The command line string
     */
    dispatchCommand(cmd) {
      if(this.isConsoleLocked) {
        throw new Error('Console busy');
      }

      let command = cmd.split(' ')[0];
      let handler = this.commands[command];
      if(handler) {
        // lock the console
        this.isConsoleLocked = true;
        let vm = this;

        // write the command to the console
        this._console.writeLine(`> ${cmd}`);

        // call the handler
        handler({ /* no args parsing supported for now */ }, {
          write: this._console.writeLine.bind(this._console, `[${command}]`),
          clear: this._console.clear.bind(this._console),
          release() {
            vm.isConsoleLocked = false;
          }
        });
      } else {
        this._console.writeLine(`'${command}': command not found`);
      }
    }
  }
}
</script>

<style lang="less">
.esf.console {
  //border-left: 6px solid #FFF;
  .toggle {
    background-color:  #1d0515;
    color: #fff;
    font-family: monospace;
    margin: 0px -15px;
    padding: 5px 15px;
    cursor: pointer;
    user-select: none;
  }

  .console-container {
    height: 200px; //background-color: red;
    margin: 0px -15px;
    //overflow: hidden;
    display: flex;
    flex-direction: column;

    &.hidden {
      display: none;
    }

    .display {
      .CodeMirror {
        background-color: rgb(48, 10, 36); //#000;
        color: #fff;
        max-height: 160px;

        &-line {
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding: 5px 10px;

          &:last-child { border-bottom: none; }
        }
      }
    }

    .input {
      //flex-basis: 15%;
      height: 40px;
      display: flex;
      position: relative;

      i {
        position: absolute;
        top: 16px;
        left: 10px;
        color: #fff;
        font-weight: 100;
        font-size: 0.8em;
      }

      input[type='text'] {
        font-family: monospace;
        width: 100%;
        background-color: rgb(48, 10, 36);
        color: #fff;
        border: none;
        padding: 10px;
        padding-left: 25px;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        outline: none;

        &[disabled] {
          cursor: wait;
        }
      }
    }
  }
}
</style>
