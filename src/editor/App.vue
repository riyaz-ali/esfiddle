<template>
  <div class="container-fluid">
    <!-- main header -->
    <Header class="row"></Header>
    <div class="esf content row">
      <!-- Side navigation bar -->
      <Navbar class="col-auto" />

      <!-- main content area -->
      <main class="col">
        <div class="row flex-column">
          <!-- IDE -->
          <IDE class="col" />
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
// main IDE
import IDE from './components/ide';
// application console
import Console from './components/console';

export default {
  components: {
    Header,
    Navbar,
    IDE,
    Console
  },
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
</style>
