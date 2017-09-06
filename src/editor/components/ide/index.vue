<template>
  <div class="esf ide">
    <div class="tools">
      <!-- Example presets -->
      <div class="examples">
        <span>Load Example </span>
        <select id="example" @change="loadExample" v-model="currentExample">
          <option value="default" selected disabled>ES6 Examples</option>
          <option v-for="ex in examples" :key="ex.title" :value="ex.val">{{ ex.title }}</option>
        </select>
      </div>
      <ul class="pull-right extra">
        <li>
          <a href="javascript:void(0)" @click="togglePrivacy" class="hint--bottom-left hint--info hint--bounce" :aria-label="`Make fiddle ${(this.private)? 'public':'private'}`">
            <i class="fa" :class="{'fa-lock': this.private, 'fa-unlock-alt': !this.private}"></i>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" @click="toggleLight" class="hint--bottom-left hint--info hint--bounce" :aria-label="`Turn ${(this.lights)?'off':'on'} lights`">
            <i class="fa fa-lightbulb-o" :class="{lit: this.lights}"></i>
          </a>
        </li>
      </ul>
    </div>
    <div class="codemirror" ref="ide">
      <!-- CodeMirror mount -->
    </div>
  </div>
</template>

<script>
import CodeMirror from 'codemirror';

export default {
  props: {
    changePrivacy: { type: Function, default: function noop(){} },
    lightsOn: { type: Boolean, default: true },
    isPrivate: { type: Boolean, default: false }
  },
  data: function(){
    return {
      $ide: null,
      lights: this.lightsOn,
      private: this.isPrivate,
      currentExample: "default",
      examples: []
    }
  },
  mounted: function(){
    this.$ide = CodeMirror(this.$refs.ide, {
      mode: "javascript",
      theme: (this.lights)? "mdn-like" : "mbo",
      lineNumbers: true
    });
  },
  methods: {
    toggleLight: function() {
      this.lights = !this.lights;
      this.$ide.setOption('theme', (this.lights)? "mdn-like" : "mbo");
    },
    togglePrivacy: function() {
      this.private = !this.private;
      this.changePrivacy();
    },
    loadExample: function() {
      console.log(this.currentExample);
    }
  }
}
</script>


<style lang="less">
.esf.ide {
  .tools {
    background-color: #568CBE; //#009688;
    margin: 0px -15px;
    padding: 0px 15px;
    height: 32px;
    line-height: 32px;
    
    ul.extra {
      list-style-type: none;
      margin: 0;
      padding: 0;
      display: inline-block;
      
      li {
        display: inline;
        margin: 0 5px;
        a {
          color: #fff;
        }
      }
    }

    // lit bulb ;)
    .lit { color: gold; }
  }

  // examples
  .examples {
    display: inline-flex;
    justify-content: center;

    span {
      font-size: 0.75rem;
      text-transform: uppercase;
      color: rgba(255,255,255,0.7);
      margin-right: 10px;
      font-weight: bold;
    }

    select {
      background-image: linear-gradient(45deg, transparent 50%, gray 50%), linear-gradient(135deg, gray 50%, transparent 50%), linear-gradient(to right, #ddd, #ddd);
      background-position: calc(100% - 10px) 1em, calc(100% - 5px) 1em, calc(100% - 2.5em) 0.5em;
      background-size: 5px 5px,
          5px 5px,
          1px 1.5em;
      background-repeat: no-repeat;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 2px;
      display: inline-block;
      line-height: 10px;
      margin: 0.5em 0;
      padding: 0.5em 2.5em 0.5em 1em;
      font-size: 10px;
      box-sizing: border-box;
      -webkit-appearance: none;
      -moz-appearance: none;

      &:focus {
        border-color: #A8D5BE;
        outline: 0;
      }

      &::-moz-focusring {
        color: transparent;
        text-shadow: 0 0 0 #000;
      }
    }
  }


  .codemirror {
    margin: 0px -15px;
    height: ~'calc(100% - 32px)';

    .CodeMirror {
      height: 100%;
    }
  }
}
</style>
