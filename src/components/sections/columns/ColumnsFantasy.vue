<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const C_CUSTOM_COLUMN = [
  {
    element: {
      text: '<h2><strong>This is a header</strong></h2>',
      styles: {
        'font-size': '3.2rem',
        'color': '#ffffff'
      },
      media: {
        'is-mobile': {
          'font-size': '3.2rem'
        }
      }
    }
  },
  {
    element: {
      text: 'You can add text for each of your game feature here.. Change the button bellow to open full description of game feature or just delete it</div>',
      styles: {
        'font-size': '1.6rem',
        'line-height': '25px',
        'color': '#ffffff'
      }
    }
  },
  {},
  {
    element: {
      text: '<p><strong>SECONDARY BUTTON</strong></p>',
      styles: {
        'background-color': '#333333',
        'color': '#FFFFFF',
        'font-size:': '1.6rem',
        'text-align': 'center',
        'width': '280px',
        'height': '64px',
        'border-width': '2px',
        'border-style': 'solid',
        'border-color': '#AF2E11'
      },
      pseudo: {
        hover: {
          'background-color': '#A9893C !important'
        }
      }
    }
  }
]

const C_CUSTOM_COLUMN2 = _.cloneDeep(C_CUSTOM_COLUMN)

const C_CUSTOM_COLUMN3 = _.cloneDeep(C_CUSTOM_COLUMN)

const C_CUSTOM_CONTAINER = {
  styles: {
    'flex-direction': 'column',
    'align-items': 'center',
    'background-position': '50% 100%',
    'background-repeat': 'no-repeat',
    'background-size': 'contain',
    'margin-bottom': '-36px',
    'padding-bottom': '300px'
  },
  media: {
    'is-mobile': {
      'margin-left': '10px',
      'margin-right': '10px',
      'margin-bottom': '32px',
      'padding-bottom': '332px'
    }
  }
}

const [C_CUSTOM_CONTAINER_1, C_CUSTOM_CONTAINER_2, C_CUSTOM_CONTAINER_3, C_CUSTOM_CONTAINER_4] = [
  _.merge({}, C_CUSTOM_CONTAINER, {
    styles: {
      'background-image': 'url(https://s3.protocol.one/images/Vred.png)'
    }
  }),
  _.merge({}, C_CUSTOM_CONTAINER, {
    styles: {
      'background-image': 'url(https://s3.protocol.one/images/Druket.png)'
    }
  }),
  _.merge({}, C_CUSTOM_CONTAINER, {
    styles: {
      'background-image': 'url(https://s3.protocol.one/images/Bolla.png)'
    }
  }),
  _.merge({}, C_CUSTOM_CONTAINER, {
    styles: {
      'background-image': 'url(https://s3.protocol.one/images/Mabok_s.png)'
    }
  })
]

const C_CUSTOM = [{
  element: {
    styles: {
      height: '60px'
    }
  }
}]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'padding-top': '30px',
      'padding-bottom': '0px'
    },
    count: 3
  },
  container: _.merge({}, C_CUSTOM_CONTAINER),
  container1: _.merge({}, C_CUSTOM_CONTAINER_1),
  container2: _.merge({}, C_CUSTOM_CONTAINER_2),
  container3: _.merge({}, C_CUSTOM_CONTAINER_3),
  container4: _.merge({}, C_CUSTOM_CONTAINER_4),
  components: _.merge({}, C_CUSTOM),
  components1: _.merge({}, C_CUSTOM_COLUMN),
  components2: _.merge({}, C_CUSTOM_COLUMN2),
  components3: _.merge({}, C_CUSTOM_COLUMN3),
  components4: _.merge({}, C_CUSTOM_COLUMN),
  edited: true
}

const COMPONENTS = [
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-title',
    label: 'title'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'description'
  },
  {
    name: 'Delimiter',
    element: types.Delimiter,
    type: 'delimiter',
    class: 'b-delimiter',
    label: 'delimiter'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button-test',
    label: 'button'
  }
]

const HEADER = [
  {
    name: 'Delimiter',
    element: types.Delimiter,
    type: 'delimiter',
    class: 'b-delimiter',
    label: 'delimiter'
  }
]

const GROUP_NAME = 'Columns'
const NAME = 'ColumnsFantasy'

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Three columns additional features presentation',

  mixins: [defaults, sectionMedia],

  cover: 'https://s3.protocol.one/images/ash_cover_col.jpg',

  $schema: {
    mainStyle: types.Columns,
    container: types.StyleObject,
    container1: types.StyleObject,
    container2: types.StyleObject,
    container3: types.StyleObject,
    container4: types.StyleObject,
    components: _.merge([], HEADER),
    components1: _.merge([], COMPONENTS),
    components2: _.merge([], COMPONENTS),
    components3: _.merge([], COMPONENTS),
    components4: _.merge([], COMPONENTS)
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(_.merge(this.$sectionData, SCHEMA_CUSTOM))
    }
  }
}
</script>

<template>
  <section
    class="b-columns"
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>
    <div class="b-grid">

      <div class="b-section-padd">
        <div class="b-section-padd-border">

          <div class="b-grid__row"
           :style="{ 'align-items' : $sectionData.mainStyle.styles['align-items']}"
          >
            <div class="b-grid__col-m-12"
             :class="`b-grid__col-${12/$sectionData.mainStyle.count}`"
             v-for="(column, key) in $sectionData"
             v-if="key.indexOf('components') !== -1 && key.split('components')[1] && parseFloat(key.split('components')[1]) <= $sectionData.mainStyle.count"
             :key="key"
            >
              <sandbox
                class="b-sandbox"
                :container-path="`$sectionData.container${key.split('components')[1]}`"
                :components-path="`$sectionData.components${key.split('components')[1]}`"
              >
                <draggable v-model="$sectionData[key]" class="b-draggable-slot" :style="$sectionData[`container${key.split('components')[1]}`].styles" @start="$_drag(`components${key.split('components')[1]}`)" @change="$_dragStop">
                  <div :class="`b-draggable-slot__${component.type}`"
                   v-for="(component, index) in $sectionData[key]"
                   v-if="$sectionData[key].length !== 0"
                   :key="index"
                  >
                    <component class="b-columns-component"
                     v-styler:for="{ el: $sectionData[`${key}`][index].element, path: `$sectionData.${key}[${index}].element`, type: $sectionData[key][index].type, label: $sectionData[`${key}`][index].label }"
                     :is="component.name"
                     :href="$sectionData[key][index].element.link.href"
                     :target="$sectionData[key][index].element.link.target"
                     :path="`${key}[${index}].element`"
                     :style="$sectionData[key][index].element.styles"
                     :class="[$sectionData[key][index].element.classes, $sectionData[key][index].class]"
                    >
                      <div v-html="$sectionData[key][index].element.text"></div>
                    </component>
                  </div>
                </draggable>
              </sandbox>
            </div><!--/.b-grid__col-3 b-grid__col-m-12-->
          </div><!--/.b-grid__row-->
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
</style>
