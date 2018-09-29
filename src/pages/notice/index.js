import Vue from 'vue'
import Component from 'vue-class-component'
import MyCropper from 'COMPONENTS/cropper/index.vue'
import VueAudio from 'COMPONENTS/vueAudio/index.vue'
@Component({
	components: {
    MyCropper,
    VueAudio
  }
})
export default class pageNotice extends Vue {
	controlList = 'noDownload noVolume noMuted onlyOnePlaying noSpeed'
	url = 'http://fs.w.kugou.com/201809282247/28b767c1eff5f556cf1faf5083acaf2b/G054/M07/11/17/dg0DAFaeU-yANViHAEYYfQMmswo832.mp3'
}