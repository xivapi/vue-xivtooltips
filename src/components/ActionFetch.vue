<script>
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';
import ActionTooltip from './ActionTooltip.vue'

export default {
  name: 'ActionFetch',
  components: {
      Popper,
      ActionTooltip,
  },
  props: {
      /**
       * Name to display
       */
      name: {
        type: String,
        default: '',
      },
      /**
       * Id to fetch from xivapi
       */
      id: {
        type: Number,
        default: 0,
      },
      /**
       * Lang to display the tooltip in
       * @values 'en', 'de', 'fr', 'ja'
       */
      lang: {
        type: String,
        default: 'en',
      },
      /**
       * Whether to embed the tooltips directly or not
       */
      embedded: {
        type: Boolean,
        default: false,
      }
  },
  data () {
    return {
      loading: true,
    }
  },
  computed: {
    data () {
      return this.$TTStore.getters.getActionById(this.id)
    },
    icon () {
      return this.$TTStore.getters.getIconById(this.id)
    }
  },
  created () {
    this.$TTStore.dispatch('fetchActionId', this.id)
  },
}
</script>

<template>
    <ActionTooltip 
        v-if="embedded"
        v-bind="data"
        :lang="lang"
    />
    <Popper 
        v-else
        :visible-arrow="false"
        trigger="hover"
        :options="{
            placement: 'auto',
            modifiers: { 
                offset: { offset: '0,10px' } 
            },
        }"
    >
        <div class="popper">
            <ActionTooltip
                v-bind="data" 
                :lang="lang"
            />
        </div>
        <!-- popper doesn't like the new vue slot syntax – https://github.com/RobinCK/vue-popper/issues/88 -->
        <!-- eslint-disable vue/no-deprecated-slot-attribute -->
        <div 
            slot="reference" 
            class="xivtooltip-inline"
        >
            <!-- eslint-enable -->
            <span :class="[name ? 'xivtooltip-inline-image' : 'xivtooltip-thumbnail']"><img
                :class="[name ? 'xivtooltip-inline-image' : 'xivtooltip-thumbnail']"
                :src="icon"
            ></span><span
                v-if="name"
                class="xivtooltip-inline-underline"
            >{{ name }}</span>
        </div>
    </Popper>
</template>

<style scoped>
.popper {
  width: auto;
  background-color: transparent;
  color: transparent;
  text-align: left;
  padding: 2px;
  display: inline-block;
  border-radius: 3px;
  position: absolute;
  font-size: 14px;
  font-weight: normal;
  border: transparent;
  z-index: 200000;
  -moz-box-shadow: none;
  -webkit-box-shdow: none;
  box-shadow: none;
}

.xivtooltip-inline {
  cursor: pointer;
  display: inline;
  position: relative;
}

.xivtooltip-inline-underline {
	border-bottom: dotted #AFAFAF 2px;
}

.xivtooltip-inline-image {
  width: 1.45em;
  height: 1.45em;
  vertical-align: middle;
  margin-bottom: 1.7px;
  margin-right: .18em;
  margin-top: -1.7px;
  margin-left: 2px;
}

/* TOOLTIP CAP COVER IMAGE */

.xivtooltip-thumbnail::before{
  content: '';
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAA7VBMVEUAAAAAAAD////////8/Pz///////8AAAD////////////////+/v7///8AAAAAAAD////y8vIAAAAAAAD9/f0AAAD9/f3+/v7+/v4AAAD///////8AAAD///8cHBwJCQlvb28AAAAAAAD////x8fH+/v6FhYULCwsFBQUjIyMMDAx2dnZhYWEXFxesrKxBQUECAgLX19cMDAz09PS6urpGRkZZWVkzMzMKCgpdXV3///8AAAAGBgZeXl4AAAAFBQX///9XV1cAAAA3Nze1tbX///+zs7OgoKAbGxs4ODgAAADz8/MICAgsLCyNjY0qfaSCAAAATHRSTlMAIwMLG0k9DC9QNUQnq5tfVTMJAx0eERYOFmZZQQfiim9hUDk1IPf18eza19DMy8rKtbGurKupopuYk5ORgnl2c2RXVkpFPTY1MjInha+GRQAAAVdJREFUSMft1tdOwzAUgOFmNRQKFDtxdtus7r333g28/+MQJWkrLnAiIXGV/8aWjj/JlyfhBSEALDYAIEzcguA8rha+sBWq4zOAt/fbWqPdfcXWbTdq20DAU7M3WclKBpMirya95skHIDeQ5UwqpIwsD3LAA2wrr6SY0FJKvsV6QCodFGb/EtKeUQ4lyQO8YzPJCDG2wweAS5rPoZlJLgCEQ5tPETJph7gBAQm0ncZl024PQJHuSWqUKCJBcCecn3sTBCSKlEa6Y+onCCkGMYhBDP4CuGiAewAxChDvoHhEWjjQ0LEYgMpaoMjwHwnrig/4zvCKKI3EplHoOuzwPlhm52kaiRQmEdHpeXbpA8kYZfv5nWV9/Jpl7fL97MiQPMCq+qxe/gypXJ/pKusBQKj6Ijd9wzbNLXSVAB6ALHFRjc07to2hXgjpvjuwEs8T2HheYgFM/EffzfVXvQZrTbEAAAAASUVORK5CYII=');
  height: 48px;
  width: 48px;
  background-size: contain;
  position: absolute;
  background-repeat: no-repeat;
  left: -4px;
  bottom: -3px;
}

.xivtooltip-inline-image::before{
  content: '';
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAA7VBMVEUAAAAAAAD////////8/Pz///////8AAAD////////////////+/v7///8AAAAAAAD////y8vIAAAAAAAD9/f0AAAD9/f3+/v7+/v4AAAD///////8AAAD///8cHBwJCQlvb28AAAAAAAD////x8fH+/v6FhYULCwsFBQUjIyMMDAx2dnZhYWEXFxesrKxBQUECAgLX19cMDAz09PS6urpGRkZZWVkzMzMKCgpdXV3///8AAAAGBgZeXl4AAAAFBQX///9XV1cAAAA3Nze1tbX///+zs7OgoKAbGxs4ODgAAADz8/MICAgsLCyNjY0qfaSCAAAATHRSTlMAIwMLG0k9DC9QNUQnq5tfVTMJAx0eERYOFmZZQQfiim9hUDk1IPf18eza19DMy8rKtbGurKupopuYk5ORgnl2c2RXVkpFPTY1MjInha+GRQAAAVdJREFUSMft1tdOwzAUgOFmNRQKFDtxdtus7r333g28/+MQJWkrLnAiIXGV/8aWjj/JlyfhBSEALDYAIEzcguA8rha+sBWq4zOAt/fbWqPdfcXWbTdq20DAU7M3WclKBpMirya95skHIDeQ5UwqpIwsD3LAA2wrr6SY0FJKvsV6QCodFGb/EtKeUQ4lyQO8YzPJCDG2wweAS5rPoZlJLgCEQ5tPETJph7gBAQm0ncZl024PQJHuSWqUKCJBcCecn3sTBCSKlEa6Y+onCCkGMYhBDP4CuGiAewAxChDvoHhEWjjQ0LEYgMpaoMjwHwnrig/4zvCKKI3EplHoOuzwPlhm52kaiRQmEdHpeXbpA8kYZfv5nWV9/Jpl7fL97MiQPMCq+qxe/gypXJ/pKusBQKj6Ijd9wzbNLXSVAB6ALHFRjc07to2hXgjpvjuwEs8T2HheYgFM/EffzfVXvQZrTbEAAAAASUVORK5CYII=');
  height: 1.7em;
  width: 1.7em;
  background-size: contain;
  position: absolute;
  background-repeat: no-repeat;
  left: 2px;
  top: -4px;
}

</style>
