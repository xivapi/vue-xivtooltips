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
      return this.$store.getters.getActionById(this.id)
    },
    icon () {
      return this.$store.getters.getIconById(this.id)
    }
  },
  created () {
    this.$store.dispatch('fetchActionId', this.id)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

/*
.xivtooltip-inline:before {
	content: "";
	background-image: url("/i/002000/002639.png");
	background-image: url("{Icon}"); 
	// would need to pull in icon field for related action
	background-repeat: no-repeat;
	background-size: contain;
	width: 1.3em;
    height:1.3em;
    vertical-align: bottom;
	display: inline-block;
	padding-right: 3px;
	margin-bottom: 1px;
}*/

/* .xivtooltip-action {
  max-width: 370px;
  height: auto;
  font-family: sans-serif;
  display: block;
  border-radius: 3px;
  border: #000000 solid 1px;
  opacity: 1;
  background-color: #333333;
  line-height: 1.2em;
}
.xivtooltip-container {
  padding-top: 9px;
  padding-right: 13px;
  padding-left: 13px;
  padding-bottom: 0px;
	max-width: 370px;
  height: auto;
  font-family: sans-serif;
  display: block;
  border-radius: 3px;
  opacity: 1;
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(112, 112, 112, .50)), color-stop(10%, #333333)); /* webkit
  filter: drop-shadow(0px 5px 6px rgba(0, 0, 0, .5));
	
}
.xivtooltip-text {
  font-family: Mada, sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: .28px;
  color: #C3BCA5;
  text-shadow: 0px 1px 1px #000;
}
.xivtooltip-value {
  color: #FFFFFF;
  font-family: Mada, sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: .5px;
  text-shadow: 1px 1px 1px #000;
}
/* TOP 
.xivtooltip-top {
  width: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 6px;
}
.xivtooltip-icon {
  margin: 0px 10px 0px 0px;
}
.xivtooltip-icon img {
  box-shadow: 1px 3px 2px #00000069;
}
.xivtooltip-actionidentity {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.xivtooltip-name.xivtooltip-value {
  font-size: 17px;
  flex-grow: 1;
  flex-basis: 100%;
  margin-bottom: 1px;
  margin-top: 2px;
}
.xivtooltip-classification.xivtooltip-text {
  align-self: flex-start;
  flex-grow: 1
}
.xivtooltip-area-of-effect {
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
}
.xivtooltip-area-of-effect div {
  padding-left: 4px;
  padding-right: 10px;
}
.xivtooltip-aoe.xivtooltip-text {
  color: #A0A0A0;
}
/* MID
.xivtooltip-mid {
  align-items: stretch;
  display: flex;
  text-align: right;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding-bottom: 5px;
  position: relative;
}
.xivtooltip-mid:after {
  position: absolute;
  content: "";
  left: 0;
  bottom: 2px;
  width: 100%;
  height: 1px;
  border-radius: 0px;
  background: rgba(255, 255, 255, .2);
  box-shadow: 0px -1px 1px rgba(0, 0, 0, .8);
}
.xivtooltip-c.xivtooltip-text {
  line-height: 1em;
}
.xivtooltip-c.xivtooltip-value {
  text-align: right;
  font-family: "Benton Sans Extra Compressed", benton-sans-extra-compressed, sans-serif;
  font-weight: 500;
  font-size: 23px;
  line-height: 28px;
}
.xivtooltip-cooldown {
  position: relative;
  margin: 0 10 0 10;
  padding-bottom: 0px;
  width: 32%;
}
.xivtooltip-cooldown:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 3px;
  width: 100%;
  height: 7px;
  border-radius: 7px;
  background: rgba(255, 255, 255, .14);
}
/* BOTTOM
.xivtooltip-bottom {
  align-content: center;
  width: 100%;
}
.xivtooltip-description {
  font-weight: 400 !important;
  line-height: 14px;
  padding: 2px 0px;
}
.xivtooltip-acquisition {
  display: flex;
  height: 19px;
  align-items: center;
  padding-bottom: 0px;
}
.xivtooltip-acquisition:last-child {
  margin-top: 2px;
  padding-bottom: 8px;
  height: auto;
  line-height: 13px;
  align-items: flex-start;
}
.xivtooltip-acqlevel {
  color: #84C054;
  font-size: 15px;
}
.xivtooltip-a.xivtooltip-text {
  width: 75px;
  flex: 0 0 75px;
  vertical-align: middle;
}
.xivtooltip-a.xivtooltip-value > img {
  width: 19px;
  vertical-align: middle;
  padding-right: 1px;
  margin-top: -3px;
}  */
</style>
