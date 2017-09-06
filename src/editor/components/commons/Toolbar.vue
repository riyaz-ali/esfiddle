<template>
  <div class="esf toolbar">
    <ul>
      <li class="hint--bottom" aria-label="Run fiddle">
        <a href="javascript:void(0);" @click="onRun"><i class="fa fa-play-circle"></i></a>
      </li>
      <li class="hint--bottom" aria-label="Save fiddle">
        <a href="javascript:void(0);" @click="onSave"><i class="fa fa-save"></i></a>
      </li>
      <li class="hint--bottom" aria-label="Lint fiddle">
        <a href="javascript:void(0);" @click="onLint"><i class="fa fa-eraser"></i></a>
      </li>
      <li class="hint--bottom" aria-label="Tidy up fiddle">
        <a href="javascript:void(0);" @click="onTidy"><i class="fa fa-align-left"></i></a>
      </li>
    </ul>
  </div>  
</template>

<script>
export default {
  props: {
    onRun: {
      type: Function,
      required: true
    },
    onSave: {
      type: Function,
      required: true
    },
    onLint: {
      type: Function,
      required: true
    },
    onTidy: {
      type: Function,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.esf.toolbar {
  height: 100%;
  float: left;
  
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
        padding: 9px 15px;
        border-bottom: 5px solid transparent;
        transition: 0.25s;
        font-size: 18px;
        font-weight: bold;

        &:hover {
          text-decoration: none;
          border-bottom-color: #23627B;
        }
      }
    }
  }
}
</style>
