# Vue-XIVTooltips

## Introduction

Vue-XIVTooltips is a project with the goal of providing a concise and straigthforward way of visualizing data from [XIVAPI](https://xivapi.com/) as easily readable tooltips that are modeled after the in-game tooltips of Final Fantasy XIV.
It's built on the foundations of [Vue](https://vuejs.org/) and [Vuex](https://vuex.vuejs.org/) and can be used to provide tooltips for a website in html.

## Installation
**Requirements**

Both nodejs and yarnpkg are required to build the application:
* [nodejs](https://nodejs.org/en/)
* [yarnpkg](https://yarnpkg.com/)

Further installation:

If all requirements are installed, you can proceed. To build XIVTooltips, open the command line of your choice, navigate to the XIVTooltips directory and execute `yarn build` for production usage or `yarn build:dev` for developer usage.

After a successful build, you can proceed.

## How to use

**In a website**

First of all you need to include the following .css files into the head of the html:

```html
<link href="https://fonts.googleapis.com/css?family=Mada:400,500&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Pathway+Gothic+One&display=swap" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../dist/vue-xivtooltips.css" />
```
And the following scripts into the body:

```html
<script src="https://unpkg.com/vue@2.6.11/dist/vue.js"></script>
<script src="https://unpkg.com/vuex@3.0.1/dist/vuex.js"></script>
<script src="https://unpkg.com/axios/dist/axios.js"></script>
<script src="../dist/vue-xivtooltips.js"></script>
```
In addition, this script is required:

```html
<script>
    Vue.use(Vuex)
    Vue.use(VueXIVTooltips, {
        webTemplateOnly: true,
    })
    let vm = new Vue({
        el: '#content',
    })
</script>
```

The general structure of calling tooltips in html is as follows:
```html
<ActionFetch :id="188" name="Sacred Soil"/>
```
`<ActionFetch :id="xxx" name="yyy"/>` with xxx being the ID of the tooltip/skill being called, and yyy being the full and correctly capitalized name. Those two arguments can be swapped at will.

Another example:
```html
<h1>ActionFetch (with lookup)</h1>
<ActionFetch name="Asylum" :id="3569"></ActionFetch>
<ActionFetch name="Jugular Rip" :id="16156"></ActionFetch>
```
would end up looking like this (mousing over Jugular Rip):

![Mouseover Example Picture](https://raw.githubusercontent.com/Nonowazu/vue-xivtooltips/master/example/preview.png)

To get the Standalone Icon with no text somewhat visible at the bottom of the above picture, the name is simply omitted like follows:
```html
<h1>Standalone Icon (with lookup)</h1>
<ActionFetch :id="12345"></ActionFetch>
```

The third option is embedding the tooltip itself, which is done via:

```html
<h1>Embedded (with lookup)</h1>
<ActionFetch :id="63" embedded></ActionFetch>
```

Additional optional attributes can be found in the docs folder under components.md.

An example html-script can be found under /examples/demo.html .

## Further documentation

* [GitHub of Vue-XIVTooltips](https://github.com/nonowazu/vue-xivtooltips)
