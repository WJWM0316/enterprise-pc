<template>
  <div class="nodata">
    <div class="nodata-inner">
      <img src="~IMAGES/nodata.png" alt="">
      <p>{{defaultText}}</p>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
	name: 'nodata',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    defaultText() {
      return this.text
    }
  }
})
</script>
<style lang="scss" scoped>
	
</style>