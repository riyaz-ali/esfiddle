<template>
  <nav class="esf navigation">
    <div class="row flex-column">
      <div class="col"><ul class="links">
        <li :class="{ 'hint--right': !!li.help }" :data-hint="li.help" v-for="li in links" :key="li.url"><a :href="li.url"><i :class="li.icon"></i></a></li>
      </ul></div>
    </div>
  </nav>
</template>

<script>
let makeLI = (url, icon, help) => ({ url, icon: `fa ${icon}`, help })

export default {
  data: () => ({
    links: [
      makeLI('javascript:void(0)', 'fa-code'),
      makeLI('https://github.com/esfiddle/esfiddle', 'fa-github', 'View on Github'),
      makeLI('/about.html', 'fa-info-circle', 'About ESFiddle'),
    ]
  }),
};
</script>

<style lang="less">
.esf.navigation {
  background-color: #23627B;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);

  ul.links {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: list-item;
      //border: 1px solid #fff;
      margin: 7.5px 0;
      a {
        color:rgba(255,255,255,0.75);
        font-size: 24px; 

        &:hover {
          color: #FFF;
        }
      }
    }
  }
}
</style>
