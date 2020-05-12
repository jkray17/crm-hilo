<template>
  <div id="app" class="center">
    <small>Как играть в покер и не проиграть? Точнее - остаться в выиграше, даже проиграв в игре.</small>
    <h6>Беспроигрышнй покер!</h6>
    <p>Так не бывает? Еще как бывает!</p>
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
export default {
  computed: {
    layout () {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  components: {
    EmptyLayout, MainLayout
  }
}
</script>

<style lang="sass">
@import '~materialize-css/dist/css/materialize.min.css'
@import 'assets/index.css'
#app
  font-family: 'Montserrat', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  // text-align: center
  color: #2c3e50

</style>
