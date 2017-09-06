<template>
  <div class="esf console">
    <div class="toggle" @click="displayConsole = !displayConsole">
      Console
      <i class="fa pull-right" :class="{'fa-caret-up': !displayConsole, 'fa-caret-down': displayConsole}"></i>
    </div>
    <div class="console-container" :class="{'hidden': !displayConsole}">
      <div class="display" ref="terminal"></div>
      <div class="input">
        <i class="fa fa-chevron-right"></i> <input type="text" />
      </div>
    </div>
  </div>
</template>

<script>
import CodeMirror from "codemirror";

/* adding helpers */
CodeMirror.prototype.addLine = function(content) {
  let doc = this.getDoc();
  let cursor = doc.getCursor(); // gets the line number in the cursor position
  let line = doc.getLine(cursor.line); // get the line contents
  let pos = { // create a new object to avoid mutation of the original selection
    line: cursor.line,
    ch: line.length - 1 // set the character position to the end of the line
  }
  doc.replaceRange(content + '\n', pos); // adds a new line
};

CodeMirror.prototype.clear = function() {
  this.setValue("");
  this.clearHistory();
};

export default {
  data: function() {
    return {
      displayConsole: true,
      _console: null
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
    ].forEach(line => this._console.addLine(line));
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
    overflow: hidden;
    display: flex;
    flex-direction: column;

    &.hidden {
      display: none;
    }

    .display {
      overflow: auto; // custom codemirror styles
      
      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        background-color: #F5F5F5;
      }
          
      &::-webkit-scrollbar {
        width: 6px;
        background-color: #F5F5F5;
      }
          
      &::-webkit-scrollbar-thumb {
        background-color: #555;
      }
        
      .CodeMirror {
        background-color: rgb(48, 10, 36); //#000;
        color: #fff;

        &-line {
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding: 5px 10px;

          &:last-child { border-bottom: none; }
        }
      }
    }

    .input {
      flex-basis: 25%;
      display: flex;
      position: relative;

      i {
        position: absolute;
        top: 10px;
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
      }
    }
  }
}
</style>
