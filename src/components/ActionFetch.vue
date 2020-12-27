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
            <div class="xivtooltip-inline">
                <div :class="[name ? 'xivtooltip-inline-image-wrapper' : 'xivtooltip-icon-image-wrapper']">
                    <img 
                        :src="icon"
                        :class="[name ? 'xivtooltip-inline-image' : 'xivtooltip-icon-image']"
                    >
                    <img
                        src="@/assets/cover.png"
                        :class="[name ? 'xivtooltip-inline-cap' : 'xivtooltip-icon-cap']"
                    >
                </div>
                <span 
                    v-if="name"
                    class="xivtooltip-inline-underline"
                >{{ name }}</span>
            </div>
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

/* TOOLTIP CAP COVER IMAGE */

/*inline*/
.xivtooltip-inline-image-wrapper {
position: relative;
	display: inline;
	margin-right: 1.4em;
	padding-right: 8px;
}
.xivtooltip-inline-cap {
  width: 1.68em;
  height: 1.68em;
  vertical-align: middle;
  margin-bottom: 1.7px;
  margin-right: .18em;
  margin-top: -1.7px;
  margin-left: 2px;
  position: absolute;	
  left: -.15em;
  top: -.08em;
	
}
.xivtooltip-inline-image {
  width: 1.4em;
  height: 1.4em;
  vertical-align: middle;
  margin-bottom: 1.7px;
  margin-right: .18em;
  margin-top: -1.7px;
  margin-left: 2px;
  position: absolute;

}
/*icon*/
.xivtooltip-icon-image-wrapper {
	position: relative;
	display: inline;
	margin-right: 40px;
}
.xivtooltip-icon-image {
	width: 40px;
	height: 40px;
	position: absolute;
	bottom: 0px;
	left: 0px
}
.xivtooltip-icon-cap {
	width: 48px;
  height: 48px;
  position: absolute;	
	left: -4px;
	bottom: -6px;
}
</style>