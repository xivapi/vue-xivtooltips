# Vue-XIVTooltips

Vuejs components for visualizing data from [XIVAPI](https://xivapi.com/)

## Prerequisites

* Vue
* Vuex

## Example

```html
<ActionFetch :id="188" name="Sacred Soil"/>
```

## Components

### ActionFetch

ActionFetch will use a local store to organize all the Action IDs into as few requests to xivapi as possible. There are a few different ways to cutomize how the tooltip is displayed.

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| name | String | '' | Name to display for the tooltip |
| id   | Integer | 0 | The id to fetch from xivapi |
| lang | String | 'en' | The language to use. <br/>Options:<ul><li>en</li><li>fr</li><li>de</li><li>ja</li></ul> |
| embedded | Boolean | false | Chooses to embed the tooltip directly instead of making a tooltip on hover |

### ActionTooltip

ActionTooltip is used by the ActionFetch component to display the results from xivapi.

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| lang | String | 'en' | The language to use. <br/>Options:<ul><li>en</li><li>fr</li><li>de</li><li>ja</li></ul> |
| Icon | String | '' | Path to the image to display. Will be prepended by `https://xivapi.com/` |
| Name | String | '' |  Name of the action |
| Cast100ms | Number | 0 | Number of 100 ms intervals required to cast the spell |
| Recast100ms | Number | 0 | Number of 100 ms intervals required for the spell to come off cooldown |
| Name_en | String | '' | Name of the action in English |
| Name_fr | String | '' | Name of the action in French |
| Name_de | String | '' | Name of the action in German |
| Name_ja | String | '' | Name of the action in Japanese |
| Description_en | String | '' | Description of the action in English |
| Description_fr | String | '' | Description of the action in French |
| Description_de | String | '' | Description of the action in German |
| Description_ja | String | '' | Description of the action in Japanese |
| Range | Number | 0 | The range of the action |
| EffectRange | Number | 0 | The effective range of the action |
| ClassJobLevel | Number | 0 | Level at which the action is gained |
| PrimaryCostValue | Number | 0 | Cost of the spell |
| ActionCategory | Object | `{ Name_en: '', Name_fr: '', Name_de: '', Name_ja: '' }` | Category that the action belongs to, with translations |
| ClassJobCategory | Object | `{ Name_en: '', Name_fr: '', Name_de: '', Name_ja: '' }` | The class or job to which the ability belongs |
