import Draggable from 'vuedraggable'
import { mapActions } from 'vuex'
import forEach from 'lodash-es/forEach'

export default {
  components: {
    Draggable
  },

  data () {
    return {
      arrayName: ''
    }
  },

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  watch: {
    '$sectionData': {
      handler () {
        let newState = this.$builder.export('JSON')
        this.saveState(newState)
      },
      deep: true
    },

    '$store.state.currentLanding.settings.logo': {
      handler (value) {
        if (value.length) {
          this.changeLogos(value)
        }
      }
    },

    '$store.state.currentLanding.settings.colors': {
      handler () {
        this.changeColors()
      },
      deep: true
    }
  },

  beforeDestroy () {
    this.$section.set(`$sectionData.components`, [])
  },

  mounted () {
    let logo = this.$store.state.currentLanding.settings.logo

    if (logo && logo.length) {
      this.changeLogos(logo)
    }

    this.changeColors()
  },

  methods: {
    ...mapActions('Landing', ['saveState']),
    ...mapActions('Sidebar', ['toggleDragStop']),

    $_dragStop (event) {
      this.selectElement(event.moved.newIndex)

      this.toggleDragStop(false)
    },

    $_drag (arrayName) {
      this.arrayName = arrayName

      this.toggleDragStop(true)
    },

    selectElement (newIndex) {
      let idSection = this.id
      let section = document.getElementById(`section_${idSection}`)
      let el = section.querySelector(`[path="${this.arrayName}[${newIndex}].element"]`)
      let resize = el.querySelector(`.resizable.vdr`)

      if (resize) {
        el = resize
      }

      this.clickOnElement(el)
    },

    clickOnElement (el) {
      let machineEvent = new Event('mousedown', { bubbles: true })
      el.dispatchEvent(machineEvent)
    },

    changeLogos (url) {
      let paths = this.getElementPropertyPath('Logo', 'background-image')
      paths.forEach(path => this.$section.set(path, `url(${url})`))
    },

    changeColors () {
      // Text color
      let plainTextColor = this.$store.state.currentLanding.settings.colors.text
      if (plainTextColor !== '') {
        let textPaths = this.getElementPropertyPath('TextElement', 'color')
        let iconTextPaths = this.getElementPropertyPath('IconWithText', 'color')
        let toggle = this.getElementPropertyPath('ToggleElement', 'color')
        let plainText = textPaths
          .concat(iconTextPaths)
          .concat(toggle)

        plainText.forEach(path => this.$section.set(path, plainTextColor))
      }

      // Buttons color
      let buttonColor = this.$store.state.currentLanding.settings.colors.button
      let buttonTextColor = this.$store.state.currentLanding.settings.colors.buttonText
      let buttonHoverColor = this.$store.state.currentLanding.settings.colors.add1

      if (buttonColor !== '') {
        let buttonBgPaths = this.getElementPropertyPath('Button', 'background-color')
        buttonBgPaths.forEach(path => this.$section.set(path, buttonColor))
      }

      if (buttonTextColor !== '') {
        let buttonColorPaths = this.getElementPropertyPath('Button', 'color')
        buttonColorPaths.forEach(path => this.$section.set(path, buttonTextColor))
      }

      if (buttonHoverColor !== '') {
        let buttonColorPaths = this.getElementPropertyPath('Button', 'pseudo.hover.background-color', true)
        buttonColorPaths.forEach(path => this.$section.set(path, `${buttonHoverColor} !important`))
      }
    },

    getElementPropertyPath (el, prop, root = false) {
      let paths = []

      // find all logos in section
      forEach(this.$sectionData, (value, key) => {
        let paramPath = root ? '.element' : '.element.styles'
        if (key.indexOf('components') > -1) {
          value.forEach((element, index) => {
            // TODO: element.label !== 'link' ---> fix coloring link in header
            if (element.name === el && !element.element.customColor && element.label !== 'link') {
              paths.push(`$sectionData.${key}[${index}]${paramPath}[${prop}]`)
            }
          })
        }
      })

      return paths
    }
  }
}
