# PMDT Kit

### What is `kit`?

Kit is a boilerplate that uses [Cayo](https://github.com/matthew-ia/cayo), and a collection of scripts that add custom configuration on top of Cayo. Kit is crafted to contain the ultimate toolchain for any PMDT projects: 
- rich content pages for marketing,
- smaller content assets such homepage hero and banner components,
- multi-page projects,
- and even prototyping UX enhancements.

Kit comes with a few features such as reusable components, a template that pulls in the appropriate site's global stylesheet, and dynamic handling of asset paths for dev and prod.

## Getting Started

Start a new project using this template repo:

1. Install `kit`
    1. Using the GitHub CLI to create a new repo from this template repo on your machine (recommended):

        Create a new repo using the template:

        ```shell
        gh repo create pm-destech/my-project --template pm-destech/kit --private
        ```
        
        Next, clone the new repo to your machine: 
        
        ```shell
        gh repo clone pm-destech/my-project my-project
        ```
    2. Using GitHub ([github.com/pm-destech/kit](https://github.com/pm-destech/kit/tree/next)) to create a new repo from this template repo: Click the `Use this template` button, and follow the steps to create a new project. Afterward, clone the project like normal.
    3. Using `gh clone` or `git clone`:
        If you don't want to create a remote repo in the process, you can of course just clone. `gh clone` works well since you don't need the URL, but good 'ole `git clone` is just fine too. When cloning, you will need to also clean the git history, else you can easily push your changes to the `pm-destech/kit` repo by mistake. 

        Assuming you're already in a new directory to clone into (i.e., you've already `mkdir my-project` and `cd my-project`—this is important for the clone and subsequent git commands):

        **gh clone**
        ```shell
        gh repo clone pm-destech/kit . && rm -fr .git && git init && git add -A && git commit -m 'initial (from kit)'
        ```
        **git clone**
        ```shell
        git clone https://github.com/pm-destech/kit.git . && rm -fr .git && git init && git add -A && git commit -m 'initial (from kit)'
        ```
2. Once installed on your local machine, `cd my-project` and then run `npm i`
3. Configure `kit` and `cayo` for your project. See [Kit Config](#kit-config) for more details.
4. Run `npm run dev` and start coding!

Generally, it is recommended to read the [Cayo docs](https://github.com/matthew-ia/cayo#readme) before using Kit, as most of the project structure within Kit is determined by Cayo.

## Kit Config
A `kit` project has three config files:
- `kit.config.js` – this is for the main `kit` configuration. These options mostly deal with managing paths that are needed for production output.
- `cayo.config.js` – the config file for Cayo. There are some required configuration options to ensure Cayo works as expected for `kit` projects. See [Cayo Config](#cayo-config) for more details. This file is where Cayo, Vite, and Rollup options should go.
- `svelte.config.js` – the Svelte config, which gets passed to `cayo.config.js`. This is set up as a separate config file, even though Cayo consumes it, to make use of some Svelte for VS Code (extension) features that aren't supported in `cayo.config.js`. It is recommended to put all Svelte-specific config options into this file, such as `svelte-preprocess` options.

**Kit Options**

- [`site`](#site)
- [`base`](#base`)
- [`title`](#title)
- [`env`](#env)
- [`mode`](#mode)

---

### `site`
- **Required**
- Type: `string`
- Default: `undefined`
– Accepted values: `'pmus'`, `'pmuk'`, `'g4us'`, `'g4uk'`

The site code of the site your project for. This can be accessed using `process.env.KIT_SITE` for things like conditional rendering. This is used to render the correct global stylesheet in dev for the appropiate site.

> **Note**
> Eventually this value will be able to be set more dynamcially to be used in more complicated scenarios, such as for building for both 'pmus' and 'pmuk' at the same time, but with different data (URLs, copy, etc.) For now, you can achieve similar functionality by manually changing this site option value and re-running dev or build (and modifying your project to condtionally render certain data depending on the value of process.env.KIT_SITE).

---

### `base`
- **Required**
- Type: `string`
- Default: `undefined`

The base path that will be prepended to static asset URLs in production. This can be accessed using `process.env.KIT_BASE`.

---

### `title`
- Type: `string`
- Default: `'kit'`

The title of the dev site. This can be accessed using `process.env.KIT_TITLE`. Note: the usefulness of this is only really at the browser level during dev—you'll see this used in the page title by default on any page. The default page title is configured in `__template.svelte`. You typically won't want to render a `<title>` element in prod, and by default, this is only used within the development mode condition of the default template.

---

### `env`
- Type: `object`
- Default: `undefined`

Define project-specific environment variables that you can access in your components. All keys of the `env` object and their values get mapped to process environment variables. The keys will be converted to `SCREAMING_SNAKE_CASE` and prepended with `KIT_APP_`.

For example, say you have this in `kit.config.js`:

```js
export default {
  // ...
  env: { 
    foo: 'bar'
  }
}
```

Then `process.env.KIT_APP_FOO` will be accessible in your code:

```svelte
<!-- Some component -->
<p>foo is {process.env.KIT_APP_FOO}</p>
<!-- <p>foo is bar</p> -->
```

As with any environement variables, the values can only be strings (else they will be stringifed for you).

---

### `mode`
- Type: `string`
- Default: `undefined`

The environment mode. Run in `development` or `production` mode. By default, this is set to match `process.env.NODE_ENV`, but if defined it will override `NODE_ENV`. This can be accessed using `process.env.KIT_ENV`. This is mostly helpful for debugging.

---

## Kit Environment Variables

There are a few environment variables configured by Kit's config script, most of which are derived from the defined values in `kit.config.js`:

- `KIT_VERSION` = Kit NPM package version
- `KIT_TITLE` = `config.title`
- `KIT_ENV` = `config.mode` or `process.env.NODE_ENV` if mode is not set
- `KIT_SITE` = `config.site`
- `KIT_BASE` = `config.base` with a trailing slash
- `KIT_ASSETS` = `'/'` for dev; the same value as `KIT_BASE` for prod

## Template 

The template file is a Cayo feature, but is configured by default to conditionally render a development-friendly wrapper _only_ in dev, and _no_ wrapper for prod. Read more about [Cayo Template files](https://github.com/matthew-ia/cayo/#template-file).

See [`__template.svelte`](./src/__template.svelte).

### Global Styles

If you need Global Styles, it is recommended to include them within the template file, rather than importing the stylesheet into an entry file (like Vite would have you do).

```svelte
<!-- __template.svelte -->
<style lang="scss">
  /* Import your global stylehseet the Sass way */
  @import './styles/style.scss';
</style>
```

## Components

`lib/components`

### Image

Renders a picture element based on the passed asset URL. Mostly works to replace the pm-planter `picture` component, which similarly expects a "mobile" file to exist, that has the same URL and extension but with a `-m` at the end of the filename. E.g., `some.png` and `some-m.png` will be used as responsive image sources for the output `<picture>` element. See [`src/lib/components/Image.svelte`](./src/lib/components/Image.svelte).

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| className | null | string | custom class added to the image element. |
| src | null | string | src attribute value for the image element. |
| title | null | string | title attribute value of the image element. |
| width | null | string | width attribute value of the image element. |
| height | null | string | height attribute value of the image element. |
| loading | null | string | loading attribute value of the image element. |
| srcset | null | string | srcset attribute value of the image element. |
| picture | true | boolean | When true, a picture element will be rendered to manage mobile / desktop images. |
| processSrc | true | boolean | When true, the src attribute will be processed by kit in order to append the proper path based on the kit config. |

### Wistia
Renders a Wistia video embed by media ID.

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| id | `null` | string | Wistia media id |
| aspectRatio | `null` | string | Aspect ratio of the video. Must use a colon as a separator (e.g. 16:9). |
| responsiveMedia | `null` | object | Object representation of desktop and mobile media data |

**Usage Examples**

While normally you can use `id` and `aspectRatio` standalone props for a single video:
```svelte
<Wistia id="123jdv" aspectRatio="12:5"  />
```
We can also use the `responsiveMedia` prop to render a desktop _and_ mobile embed at the same time. (In this case, even if the `id` and `aspectRatio` props are passed, they will be not be used if the `responsiveMedia` prop is not falsey.)
```svelte
<script>
  let responsiveMedia = {
    desktop: {
      id: '123jdv',
      aspectRatio: '12:5',
    },
    mobile: {
      id: 'kdc456',
      aspectRatio: '4:5',
    },
  }
</script>
<Wistia {responsiveMedia} />
```

### Overlay
Used to quickly create an overlay on top of a background image.

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| href | `null` | string | If present, wraps entire Overlay in <a/> with passed href value. |
| homePageHero | `false` | boolean | If true, adds mb-4 md-mb-5 classes to add margin bottom to preserve the homepage spacing. |

#### Slots

The default slot is for the content of the overlay. The `background` slot is for the background element, such as an image or video. For example:

```
<Overlay>
  <Image src="sweater.jpg" slot="background" />
  <div>
    <h1>Men's Sweaters</h1>
    <a href="/c/men/tops/sweaters">Shop Now<>
  </div>
</Overlay>
```

### GlobalStyles

Renders the correct global stylesheet based on the [`site`](#site) config option. See [`src/lib/components/dev/GlobalStyles.svelte`](./src/lib/components/dev/GlobalStyles.svelte).

### SearchStyles
Renders the correct global styles for the PLP view of the Sitecontainer Layout component.

## Layout Components
`lib/components/layout`

### SiteContainer
Creates layout markup for both PM Homepage and PM PLP pages. Uses styles from `PLPStyles.svelte` for the PLP layout. `FakeNav.cayo.svelte` is used inside of this component to render an emulation of the global nav and how much space it takes up.

| Prop | Default | Value | Desc |
| --- | --- | --- | --- |
| nav | `true` | boolean | If true, renders the `KitNav` component. |
| layout | `null` | string | Valid values: `'home'`, `'plp'`. Emulates either the Homepage or a PLP layout. |
| plpOptions | `{ fill: 5, filterOpen: false }` | object | Options applicable for the PLP layout. `fill` controls how many product tiles fill the PLP layout. `filterOpen` controls open state of the Filter Panel placeholder. |

| Slot | Desc|
| --- | --- |
| hero | Places content full-width at the top of the container when `type` is `'home'` |
| plp-hero | Places content in the "PLP Hero" region of container when `type` is `'home'` |
| plp-content-tile | Places content in position 1 of the PLP grid |

#### Usage Examples

Default (no layout adjustments):
```svelte
<SiteContainer>
  <div class="some-page" />
</SiteContainer>
```

Homepage Hero:
```svelte
<SiteContainer layout="home">
  <Hero slot="hero" />
  <Banner slot="banner" />
</SiteContainer>
```

PLP Content:
```svelte
<SiteContainer layout="plp">
  <Hero slot="plp-hero" />
  <ContentTile slot="plp-content-tile" />
</SiteContainer>
```

## Helpers

`lib/helpers`

Helpers are utiltiies that make developing content for SFCC easier.

### asset
Turns regular URL strings into staticlink URLs with the project path preprended (SFCC-friendly). See [`src/lib/helpers/asset.js`](./src/lib/helpers/asset.js).

Usage:
```svelte
<script>
  import asset from '$helpers/asset.js';
</script>

<img src="{asset('some.png')}">
```
Output:

```svelte
<!-- Development (for Vite) -->
<img src="/some.png?$staticlink$">
<!-- Production (for SFCC) -->
<img src="project/path/some.png?$staticlink$">
```

Also processes around URL Params, that will work in SFCC:
```svelte
<!-- Source -->
<img src="{asset('some.png?foo=bar')}">
<!-- Prod Output -->
<img src="project/path/some.png?$staticlink$?foo=bar">
```

### url
Utility for generating Saleforce URL Function links to pages, categories, and products. This is just a JS wrapper for the SFCC URL Function format `$url(<pipeline>, <key>, '<value>')$`, so this should be used _in place of_ the typical SFCC URL functions in your markup. See [`src/lib/helpers/url.js`](./src/lib/helpers/url.js).

Usage:

```svelte
<script>
  import url from '$helpers/url.js';
</script>

<a href="{url('page', 'contact-us')}">Contact Us</a>
<a href="{url('category', 'men-bottoms-pants')}">Shop Pants</a>
<a href="{url('product', 'mf23eb66')}">Shop EB66 Pant</a>
```

Output:

```svelte
<a href="$url('Page-Show', 'cid', 'contact-us')$">Contact Us</a>
<a href="$url('Search-Show', 'cgid', 'men-bottoms-pants')$">Shop Pants</a>
<a href="$url('Product-Show', 'pid', 'mf23eb66')$">Shop EB66 Pants</a>
```

### filterByKey
Filters and transforms data structures based on a specified key (supports objects and arrays). It recursively traverses the input data looking for the provided key. If the specified key is found at a particular level, the function merges the key's value into the result object, simplifying the data structure. If the key is not found, no transformation is made and the existing structure remains.

#### Transformation
```js
// Input
export default {
  title: {
    us: 'Sweater',
    uk: 'Jumper'
  },
  products: {
    us: ['me0a123'],
    uk: ['me0b456'],
  },
  carousel: [
	  'image1.jpg',
    'image2.jpg',
    'image3.jpg'
  ]
}

const data = filterByKey('us');

// Output: 
{
	title: 'Sweater',
	products: ['me0a123'],
  carousel: [
	  'image1.jpg',
    'image2.jpg',
    'image3.jpg'
  ]
}
```

#### Usage Example

```svelte
<!-- src/pages/us.svelte -->
<script>
  import context from '$lib/context';
  import filterByKey from '$lib/helpers/filterByKey.js';
  import MyContent from '$components/MyContent.svelte';

  const data = filterByKey('us', context);
</script>

<MyContent {...data}/>

<!-- src/pages/uk.svelte -->
<script>
  import context from '$lib/context';
  import filterByKey from '$lib/helpers/filterByKey.js';
  import MyContent from '$components/MyContent.svelte';

  const data = filterByKey('uk', context);
</script>

<MyContent {...data}/>
```

## URLs
Kit handles developmenet and production URL paths for static assets (JS, CSS, images, etc.)
  - For images, this is interwoven into `asset`, so anytime the `asset` function is used, the output URL will include the project's correct asset directory
  - For generated assets like JS and CSS, this is handled in `cayo.config.js`, specifically via a Vite experimental feature that allows you to manipulate the output URLs for these generated assets. See [Cayo Config](#cayo-config) for more details.

## Styles

### Convert px to rem: `sp()` and `rem()`

You can use scale-independent pixels (sp) if you want to easily use a pixel size in rems, without having to do the math. This is primarily useful for font sizes, which we want to scale to the user's browser font size and zoom scaling.

```scss
// Assuming 1rem == 16px
// Your styles: 
p {
  font-size: sp(16); // 16px in rems
}
// Output CSS: 
p {
  font-size: 1rem;
}

// It will also handle stripping units from the input, such as if you happen to use px
// Your code:
h1 {
  font-size: sp(20px);
}
// Output CSS:
h1 {
  font-size: 1.25rem;
}
```

`sp()` is an alias for `rem()`. For example, `rem(10)` just converts 10px to rems (.625rem, if 1rem = 16px).

```scss
// The following are equivalent, and output 10px in rems (.625rem):
p {
  font-size: sp(10px);
}
p {
  font-size: sp(10); // units get ignored either way
}
p {
  font-size: rem(10);
}
p {
  font-size: .625rem; 
}
```
### Font Imports
`styles/fonts` houses all of the fonts that are imported remotely (mostly from adobe fonts). Each font has a respective web project in the Adobe Web Font manager for creative cloud. All of the fonts in this folder are then imported into `styles/tokens/_typography.scss` for use inside of your project. This folder and it's respective tokens will grow as we add more.

```scss
// Library
$font-caslon: "ltc-caslon-pro", $font-palatino;
$font-mina: 'mina', $font-palatino;
$font-proxima: 'proxima-nova', $font-helvetica;
```

## Cayo Config

Kit comes with some pre-configured options within `cayo.config.js`. Some of these are required for `kit` to function properly: 

1. Rollup Plugin `replace`: String replacement for asset paths, particularly in the `asset.js` helper.
2. Vite experimental `renderBuiltUrl`: prepend the correct asset path for bundled assets, output by Vite

`cayo.config.js` should not need to be reconfigured for a new project except for a few optional settings.

```js
// cayo.config.js
export default {
  // Some preferential config options...
  // ...
  // Required for kit to work as expected
  vite: {
    rollupOptions: {
      plugins: [
        // Alias config not necessarily required, but recommended to keep or extend
        alias({
          entries: [
            { find: '$lib', replacement: './src/lib' },
            { find: '$components', replacement: './src/components' },
          ]
        }),
        // 1. Required to dynamically prepend the correct asset path during dev and prod
        replace({
          '__ASSETS__': process.env.KIT_ASSETS,
        }),
      ],
    },
    // 2. Required to prepend the correct asset path during prod for bundled assets like JS and CSS
    experimental: kit.mode === 'production' ? {
      // https://vitejs.dev/guide/build.html#advanced-base-options
      // renderBuiltUrl(filename: string, { hostId, hostType, type }: { hostId: string, hostType: 'js' | 'css' | 'html', type: 'public' | 'asset' }) {
      renderBuiltUrl(filename, { hostId, hostType, type }) {
        if (type === 'asset') {
          return `${process.env.KIT_ASSETS}${filename}?$staticlink$`;
        }
      }
    } : null,
  },

}
```