import ActionTooltip from '../components/ActionTooltip.vue';

export default {
  title: 'Example/ActionTooltip',
  component: ActionTooltip,
  argTypes: {
    lang: { control: { type: 'select', options: ['en', 'de', 'fr', 'ja'] } },
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ActionTooltip },
  template: '<ActionTooltip v-bind="$props" />',
});

export const Tooltip = Template.bind({});
Tooltip.args = {
  lang: 'en',
  Icon: '/i/002000/002801.png',
  Name: 'Adloquium',
  Name_en: 'Adloquium',
  Name_de: 'Adloquium',
  Name_fr: 'Traité du réconfort',
  Name_ja: '鼓舞激励の策',
  Cast100ms: 20,
  Recast100ms: 25,
  Description_en: "Restores target's HP.\n\n<span style=\"color:#00cc22;\">Cure Potency:</span> 300\n\n<span style=\"color:#00cc22;\">Additional Effect:</span> Grants <span style=\"color:#ffff66;\">Galvanize</span> to target, nullifying damage equaling 125% of the amount of HP restored. When critical HP is restored, also grants <span style=\"color:#ffff66;\">Catalyze</span>, nullifying damage equaling 125% the amount of HP restored.\n\n<span style=\"color:#00cc22;\">Duration:</span> 30s\n\nEffect cannot be stacked with astrologian's <span style=\"color:#ffff66;\">Nocturnal Field</span>.",
  Description_fr: "Restaure les PV de la cible.\n\n<span style=\"color:#ffff66;\">Puissance:</span> 300\n\n<span style=\"color:#ffff66;\">Effet additionnel:</span> octroie <span style=\"color:#ff7b1a;\">Réconfort</span>, une barrière annulant un montant de dégâts égal à 125% des PV restaurés. Octroie <span style=\"color:#ff7b1a;\">Exhortation</span>, une deuxième barrière identique, si le sort est critique.\n\n<span style=\"color:#ffff66;\">Durée:</span> 30s\n\nNe peut être cumulé avec l'effet Champ nocturne.",
  Description_de: "Du regenerierst LP des Ziels.\n\nHeilpotenzial: 300\n\nZusatzeffekt: Errichtet eine Barriere um das Ziel, die Schaden in der Höhe von 125 % der Heilwirkung absorbiert (<span style=\"color:#ffff66;\">Dynamisierung</span>).\n\nDauer: 30 Sekunden\n\nZusatzeffekt bei kritischem Heilerfolg: Zusätzliche Barriere absorbiert 125 % der Heilwirkung (<span style=\"color:#ffff66;\">Katalyse</span>).\n\nDauer: 30 Sekunden\n\nKann nicht zugleich mit der <span style=\"color:#ff7b1a;\">Nocturnal-Barriere</span> des Astrologen aktiv sein.",
  Description_ja: "対象のＨＰを回復する。　<span style=\"color:#00cc22;\">回復力：</span>300\n\n<span style=\"color:#00cc22;\">追加効果：</span>対象に一定量のダメージを防ぐバリアである<span style=\"color:#ff7b1a;\">「鼓舞」</span>を付与する。\n\n<span style=\"color:#00cc22;\">鼓舞効果：</span>回復量の125％分のダメージを軽減する。\n\n<span style=\"color:#00cc22;\">効果時間：</span>30秒\n\n占星術師のノクターナルフィールド効果とは同時に付与されない。\n\n<span style=\"color:#00cc22;\">追加効果（クリティカル時）：</span>対象に一定量のダメージを防ぐバリアである<span style=\"color:#ff7b1a;\">「激励」</span>を付与する。\n\n<span style=\"color:#00cc22;\">激励効果：</span>回復量の125％分のダメージを軽減する。\n\n<span style=\"color:#00cc22;\">効果時間：</span>30秒",
  Range: 	30,
  ClassJobLevel: 30,
  PrimaryCostValue: 10,
  PrimaryCostType: 3,
  EffectRange: 0,
  ActionCategory: {ID:2,Name:"Spell",Name_de:"Zauber",Name_en:"Spell",Name_fr:"Sort",Name_ja:"魔法"},
  ClassJobCategory: {
    ACN:	0,
    ADV:	0,
    ALC:	0,
    ARC:	0,
    ARM:	0,
    AST:	0,
    BLM:	0,
    BLU:	0,
    BRD:	0,
    BSM:	0,
    BTN:	0,
    CNJ:	0,
    CRP:	0,
    CUL:	0,
    DNC:	0,
    DRG:	0,
    DRK:	0,
    FSH:	0,
    GLA:	0,
    GNB:	0,
    GSM:	0,
    ID:	29,
    LNC:	0,
    LTW:	0,
    MCH:	0,
    MIN:	0,
    MNK:	0,
    MRD:	0,
    NIN:	0,
    Name:	"SCH",
    Name_de:	"GLT",
    Name_en:	"SCH",
    Name_fr:	"ÉRU",
    Name_ja:	"学者",
    PGL:	0,
    PLD:	0,
    RDM:	0,
    ROG:	0,
    SAM:	0,
    SCH:	1,
    SMN:	0,
    THM:	0,
    WAR:	0,
    WHM:	0,
    WVR:	0,
  }
}

// export const Primary = Template.bind({});
// Primary.args = {
//   primary: true,
//   label: 'Button',
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
