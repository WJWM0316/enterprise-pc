import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class pageNotice extends Vue {
	columns = []
	dragEl = null

	domdrugstart(e) {
		e.target.style.opacity = '0.5'
    this.dragEl = e.target
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.target.innerHTML)
	}

	domdrugenter(e) {
		e.target.classList.add('over')
	}

	domdrugover(e) {
		if (e.preventDefault) {
      e.preventDefault()
    }
    e.dataTransfer.dropEffect = 'move'
	}

	domdrugleave(e) {
		e.target.classList.remove('over')
	}

	domdrop(e) {
		if (e.stopPropagation) {
      e.stopPropagation()
    }
    if (this.dragEl != this) {
      this.dragEl.innerHTML = e.target.innerHTML
      this.innerHTML = e.dataTransfer.getData('text/html')
    }
	}

	domdrapend(e) {
		[].forEach.call(this.columns, column => {
      column.classList.remove('over')
       column.style.opacity = '1'
    })
	}
	
	init() {
		[].forEach.call(this.columns, column => {
	    column.addEventListener('dragstart', this.domdrugstart, false)
	    column.addEventListener('dragenter', this.domdrugenter, false)
	    column.addEventListener('dragover', this.domdrugover, false)
	    column.addEventListener('dragleave', this.domdrugleave, false)
	    column.addEventListener('drop', this.domdrop, false)
	    column.addEventListener('dragend', this.domdrapend, false)
	  })
	}

	mounted() {
		this.columns = document.querySelectorAll('.column');
	  let dragEl = null;
		this.init()
	}
}