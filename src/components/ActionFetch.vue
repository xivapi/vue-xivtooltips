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
        <span 
            slot="reference" 
            class="xivtooltip-inline"
        >
            <!-- eslint-enable -->
            <img
                :class="[name ? 'xivtooltip-inline-image' : 'xivtooltip-thumbnail']"
                :src="icon"
            ><span
                v-if="name"
                class="xivtooltip-inline-underline"
            >{{ name }}</span>
        </span>
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
}

.xivtooltip-inline-underline {
	border-bottom: dotted #AFAFAF 2px;
}

.xivtooltip-inline-image {
    width: 1.3em;
    height: 1.3em;
    vertical-align: bottom;
    margin-bottom: 1px;
    padding-right: .2em;
}
</style>
