<template>
  <header class="esf header">
    <div class="col-auto logo"><a href="/"><img src="/images/esfiddle.png"/></a></div>
    <div class="extra">
      <slot>Extras</slot>
    </div>
  </header>  
</template>

<style lang="less">
.esf.header {
  display: flex;
  background-color: #A8D5BE;
  height: 48px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);

  .logo {
    height: 100%;
    overflow: hidden;
    border-right: 1px solid rgba(0,0,0,.12);
    position: relative;

    img {
      position: relative;
      top: 10px;
      transition: 0.2s all ease;

      &:hover {
        margin-top: -35px;
      }
    }
  }

  .extra {
    margin: auto 15px;
    flex-grow: 1;
  }
}
</style>
