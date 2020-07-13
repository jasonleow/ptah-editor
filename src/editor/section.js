import getPath from 'lodash-es/get'
import toPath from 'lodash-es/toPath'
import Seeder from './seeder'
import {randomSectionId} from './util'

const SECTION_OPTIONS = {
  name: null,
  schema: {}
}

export default class Section {
  constructor (options) {
    options = Object.assign({}, SECTION_OPTIONS, options)
    this.id = options.id || randomSectionId()
    this.name = options.name
    this.description = options.description
    this.group = options.group
    this.schema = options.schema
    this.data = options.data || Seeder.seed(options.schema)
    this.stylers = []
    this.isMain = false // flag for group
    this.applyPageStyle = options.applyPageStyle || false // flag if section added from list
    this.isHeader = this.schema.isHeader || false // --- flag for header element
  }

  set (name, value) {
    const path = toPath(name)
    const prop = path.pop()

    path.shift()
    const obj = path.length === 0 ? this.data : getPath(this.data, path)

    if (typeof obj === 'undefined') {
      console.warn('Wrong path', path)
      return
    }

    if (typeof value === 'function') {
      value(obj[prop])
      return
    }

    obj[prop] = value
  }

  get (name) {
    const path = toPath(name)
    const prop = path.pop()
    path.shift()
    const obj = path.length === 0 ? this.data : getPath(this.data, path)

    if (typeof obj === 'undefined') {
      console.warn('Wrong path', path)
      return
    }

    return obj[prop]
  }

  destroy () {
    this.stylers.forEach(styler => styler.$destroy())
  }
};
