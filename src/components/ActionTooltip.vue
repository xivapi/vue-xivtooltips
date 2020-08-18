<script>
export default {
  name: 'ActionTooltip',
  filters: {
    newline2Br (value) { return value.replace(/\n\n/g, '<br />') },
  },
  props: {
    /**
     * The language to display the tooltip in.
     * @default 'en'
     * @values 'en', 'de', 'fr', 'ja'
     */
    lang: {
      type: String,
      default: 'en',
    },
    /**
     * The icon of the action.
     */
    /* eslint-disable vue/prop-name-casing */
    Icon: {
      type: String,
      default: '',
    },
    /**
     * The name of the action.
     */
    Name: {
      type: String,
      default: '',
    },
    /**
     * The number of 100ms intervals it takes to cast
     */
    Cast100ms: {
      type: Number,
      default: 0,
    },
    /**
     * The number of 100ms intervals it takes to recast the spell
     */
    Recast100ms: {
      type: Number,
      default: 0,
    },
    /**
     * The name of the tooltip in English
     */
    Name_en: {
      type: String,
      default: '',
    },
    /**
     * The name of the tooltip in French
     */
    Name_fr: {
      type: String,
      default: '',
    },
    /**
     * The name of the tooltip in Japanese
     */
    Name_ja: {
      type: String,
      default: '',
    },
    /**
     * The name of the tooltip in German
     */
    Name_de: {
      type: String,
      default: '',
    },
    /**
     * The description of the tooltip (using html) in English.
     */
    Description_en: {
      type: String,
      default: '',
    },
    /**
     * The description of the tooltip (using html) in French.
     */
    Description_fr: {
      type: String,
      default: '',
    },
    /**
     * The description of the tooltip (using html) in Japanese.
     */
    Description_ja: {
      type: String,
      default: '',
    },
    /**
     * The description of the tooltip (using html) in German.
     */
    Description_de: {
      type: String,
      default: '',
    },
    /**
     * The range of the action.
     */
    Range: {
      type: Number,
      default: 0,
    },
    /**
     * The level at which the Class/Job obtains the action
     */
    ClassJobLevel: {
      type: Number,
      default: 0,
    },
    /**
     * The range that the action has once used
     */
    EffectRange: {
      type: Number,
      default: 0,
    },
    /**
     * The MP cost of the action
     */
    PrimaryCostValue: {
      type: Number,
      default: 0,
    },
    /**
     * The category the action falls under
     */
    ActionCategory: {
      type: Object,
      default: () => ({
        Name_en: '',
        Name_fr: '',
        Name_de: '',
        Name_ja: '',
      })
    },
    /**
     * The name of the Class/Job that gets the ability
     */
    ClassJobCategory: {
      type: Object,
      default: () => ({
        Name_en: '',
        Name_fr: '',
        Name_de: '',
        Name_ja: '',
      })
    },
    /* eslint-enable */
  },
  computed: {
    name () { return this[`Name_${this.lang}`] },
    icon () { return `https://xivapi.com${this.Icon}` },
    actionCategory () { return this.ActionCategory ? this.ActionCategory[`Name_${this.lang}`] : '' },
    description () { return this[`Description_${this.lang}`].replace(/\n\n/g, '<br/>') },
    classJobCategory () { return this.ClassJobCategory ? this.ClassJobCategory[`Name_${this.lang}`] : '' },
    range () { return this.Range === -1 ? 3 : this.Range },
  },
}
</script>

<template>
    <div class="xivtooltip-action">
        <div class="xivtooltip-container">
            <div class="xivtooltip-top">
                <div class="xivtooltip-icon">
                    <img :src="icon">
                </div>
                <div class="xivtooltip-actionidentity">
                    <div class="xivtooltip-name xivtooltip-value">
                        {{ name }}
                    </div>
                    <div class="xivtooltip-classification xivtooltip-text">
                        {{ actionCategory }}
                    </div>
                    <div class="xivtooltip-area-of-effect">
                        <div class="xivtooltip-aoe xivtooltip-text">
                            Range <span class="xivtooltip-value">{{ range }}y</span>
                        </div>
                        <div class="xivtooltip-aoe xivtooltip-text">
                            Radius <span class="xivtooltip-value">{{ EffectRange }}y</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="xivtooltip-mid">
                <div class="xivtooltip-cooldown">
                    <div class="xivtooltip-c xivtooltip-text">
                        Cast
                    </div>
                    <div class="xivtooltip-c xivtooltip-value">
                        <span v-if="Cast100ms > 0">{{ (Cast100ms / 10).toFixed(2) }}s</span>
                        <span v-else>Instant</span>
                    </div>
                </div>
                <div class="xivtooltip-cooldown">
                    <div class="xivtooltip-c xivtooltip-text">
                        Recast
                    </div>
                    <div class="xivtooltip-c xivtooltip-value">
                        {{ (Recast100ms / 10).toFixed(2) }}s
                    </div>
                </div>
                <div 
                    class="xivtooltip-cooldown xivtooltip-cost" 
                    :style="[PrimaryCostValue === 0 ? { 'visibility': 'hidden' } : {}]"
                >
                    <div class="xivtooltip-c xivtooltip-text">
                        MP Cost
                    </div>
                    <div class="xivtooltip-c xivtooltip-value">
                        {{ PrimaryCostValue * 100 }}
                    </div>
                </div>
            </div>
            <div class="xivtooltip-bottom">
                <!--eslint-disable vue/no-v-html --> 
                <div
                    class="xivtooltip-description xivtooltip-value"
                    v-html="description"
                />
                <!--eslint-enable --> 
                <div class="xivtooltip-acquisition">
                    <div class="xivtooltip-a xivtooltip-text">
                        Acquired
                    </div>
                    <div class="xivtooltip-a xivtooltip-value">
                        <img src=""><span class="xivtooltip-acqlevel">Lv. {{ ClassJobLevel }}</span>
                    </div>
                </div>
                <div class="xivtooltip-acquisition">
                    <div class="xivtooltip-a xivtooltip-text">
                        Affinity
                    </div>
                    <div class="xivtooltip-a xivtooltip-value">
                        {{ classJobCategory }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.xivtooltip-inline {
	cursor: pointer;
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

.xivtooltip-action {
  width: 370px;
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
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(112, 112, 112, .50)), color-stop(10%, #333333)); /* webkit */
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
/* TOP */
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
/* MID */
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
/* BOTTOM */
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
} 
</style>
