<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Form
    </h6>

    <IndicatorPlatform />

    <div class="b-panel__layout _top-9">
      <div class="layout _top-2">
        <base-scroll-container v-if="!isMobile">
          <div class="layout-padding _pr-0">
            <!-- Form settings -->
            <div class="b-panel__control">
              <base-caption>
                Form settings
              </base-caption>

              <control-section-form-settings/>
            </div>
          </div>
        </base-scroll-container>

        <disabled-mobile-mode v-else />
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlSectionFormSettings from '../controls/TheControlSectionFormSettings'
import IndicatorPlatform from '../IndicatorPlatform'
import DisabledMobileMode from '../DisabledMobileMode'

export default {
  name: 'ThePanelSectionFormSettings',
  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    IndicatorPlatform,
    ControlSectionFormSettings,
    DisabledMobileMode
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectLabel',
      'isMobile'
    ])
  }
}
</script>
