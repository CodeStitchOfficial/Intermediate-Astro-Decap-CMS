<h3 align="center">Intermediate Astro kit - Decap CMS</h3>

  <p align="center">
    This intermediate kit includes a pre-configured Astro setup, along with five pages filled with CodeStitch components. Everything is ready to go right from the start, offering a fantastic introduction to the advantages of a Static Site Generator, complete with LESS preprocessing and a blog powered by Decap CMS. This kit also leverages the power of a few Astro tools such as, but not limited to, Content Collections, View Transitions, Astro components, scoped styling and scripting etc.
    <br/>
    <br/>
    <a href="https://intermediate-astro-kit-decap-cms.netlify.app" target="_blank">View Live Result</a>
  </p>

  <p align="center">
    Created and maintained by <a href="https://github.com/BuckyBuck135" target="_blank">BuckyBuck135</a>
  </p>

## Table of Contents

- [Overview](#overview)
- [Getting Started](#gettingStarted)
  - [Removing Demo Content](#removingDemoContent)
  - [Removing Decap CMS](#removingDecapCms)
  - [Exploring the Codebase with CodeTour](#exploringWithCodeTour)
- [Prerequisites](#prerequisites)
- [Features](#features)
- [Project Tree](#projectTree)
  - [Root Files and Folders](#rootFilesAndFolders)
- [Customizing Your Site](#customizingYourSite)
  - [Working with Components](#workingWithComponents)
  - [Adding & Customizing Pages](#addingCustomizingPages)
  - [Navigation System](#navigationSystem)
  - [Styling Your Site](#stylingYourSite)
  - [SEO & Metadata](#seoMetadata)
  - [Images Optimization](#imagesOptimization)
  - [Content Management & Blog](#contentManagement)
  - [Scripts & Event Handling](#scriptsEventHandling)
  - [Sitemap Configuration](#sitemapConfiguration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)
- [Conclusion](#conclusion)

<a name="overview"></a>

## Overview

This intermediate kit includes a pre-configured <a href="https://www.astro.build">Astro</a> environment, which
allows for repeated components, centralized data and greater room to scale as your clients grow. The kit runs the latest major Astro version, v5. On top of this, a blog has been provided through [Decap CMS](https://decapcms.org/) to allow your clients to manage their content on their own.

### TL;DR - Quick Start

1. Create from template

```bash
npm create astro@latest -- --template CodeStitchOfficial/Intermediate-Astro-Decap-CMS
```

2. Install and run

```bash
npm install && npm run dev
```

3. Configure your site
   Edit src/data/client.ts with your business info
   Edit public/admin/config.yml for CMS settings

4. Deploy
   Push to GitHub → Deploy on Netlify → Configure DecapBridge

### Key Files to Know:

- `src/data/client.ts` - Site configuration
- `src/data/navData.json` - Navigation structure
- `src/styles/root.less` - Design tokens
- `public/admin/config.yml` - CMS configuration

[Read full documentation below](#gettingStarted) or explore with [CodeTour](#exploringWithCodeTour).

<a name="gettingStarted"></a>

## Getting Started

There are two ways you can bootstrap your starter kit:

### Using the Github template

1. At the top right of the GitHub Repository, click the green _Use this template_ button,
   then click _Create a new repository_.
2. Follow the instructions to create a new repository, using this repo as a template.
3. When created, clone the repository to your local machine.
4. Run `npm install` to install all dependencies.
5. Run `npm run dev` to start the project and spin up a development server on `localhost:4321`

### Using the CLI

1. Run this to initialize a new project from this template:

```sh
npm create astro@latest -- --template CodeStitchOfficial/Intermediate-Astro-Decap-CMS
```

2. Choose a name for your project.
3. Change into the newly created project directory.
4. Run `npm install` to install all dependencies.
5. Run `npm run dev` to start the project and spin up a development server on `localhost:4321`

<a name="removingDemoContent"></a>

### Removing Demo Content

If you want a clean slate to build your own site from scratch, you can remove all showcase/demo UI content while keeping the blog and Decap CMS functionality intact.

**Run the script:**

```bash
npm run remove-demo
```

**What gets removed:**

- Demo pages (about, contact, projects, reviews)
- Demo components (Hero, Services, Gallery, CTA, etc.)
- Demo images (keeps placeholder.jpg)

**What stays:**

- Blog system and Decap CMS
- Core infrastructure (BaseLayout, Header, Footer, navigation)
- All functionality and utilities

Files are moved to `scripts/deleted/` for backup.

<a name="removingDecapCms"></a>

### Removing Decap CMS

If you don't need a CMS for your project, you can easily remove Decap CMS using the included removal script.

**Run the script:**

```bash
npm run remove-decap
```

The script will ask for confirmation and whether you want to remove blog content too:

- Choose **yes** to completely remove blog functionality
- Choose **no** to keep blog files for local Content Collections (without Decap)

**What gets removed:**

- CMS admin dashboard (`public/admin/`, `src/pages/admin.astro`)
- Optionally: Blog content, layouts, pages, and components

Files are moved to `scripts/deleted/` for backup.

<a name="exploringWithCodeTour"></a>

### Exploring the Codebase with CodeTour

This template includes 8 interactive CodeTour walkthroughs to help you quickly understand the codebase architecture and start customizing your site. These tours guide you through key concepts, file locations, and best practices.

#### How to Use

1. **Install the CodeTour extension** in VS Code from the [marketplace](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour)
2. **View all tours**: Find the CODETOUR tab in your Explorer, or Open Command Palette (Ctrl/Cmd+Shift+P) → "CodeTour: View Tours"
3. **Start a tour**: Click on any tour from the list
4. **Navigate**: Use arrow buttons or keyboard shortcuts to move through steps

Tours are independent and can be taken in any order. Each tour includes precise file locations, line numbers, and clear explanations to help you understand how everything works together.

<a name="prerequisites"></a>

## Prerequisites

Only the vanilla web technologies are _required_ before using this kit, with some familiarity with Astro and React-style Components and props also recommended, but not essential. A lot of the leg-work for the non-vanilla technologies has been done for you. If you would like to read up on some of these things, we recommend the following resources:

1. [Astro's Documentation](https://docs.astro.build/en/getting-started/)
2. [Astro Crash Course in 20 Minutes!](https://www.youtube.com/watch?v=zrPVTf761OI)
3. [Decap CMS' docs](https://decapcms.org/docs/intro/) can also be found should you wish to extend the CMS beyond what's in this kit

<a name="features"></a>

## Features

- Runs on Astro v5
- Decap CMS integration with blog
- SEO-ready with Open Graph, Twitter Cards, and JSON-LD structured data
- Astro's View Transitions
- Components, props, and scoped styles
- Astro's built-in `<Picture />` component for image optimization
- Content Collections with image validation
- Accessible dropdown menus and navigation
- Dark mode
- [CodeStitch](https://codestitch.app/) HTML and CSS blocks

This kit ships the following packages:

- [Astro Icon](https://www.astroicon.dev/) - Astro Icon is a straightforward icon system for the Astro framework.
- [Autoprefixer](https://www.npmjs.com/package/autoprefixer) - PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use. It is recommended by Google and used in Twitter and Alibaba.
- [LESS](https://www.npmjs.com/package/less) - Less makes a few convenient additions to the CSS language, but you can also simply write standard CSS if you wish.

<a name="projectTree"></a>

## Project Tree

```
.
├── .tours/                     # Interactive CodeTour guides
│   ├── getting-started.json
│   ├── component-composition.json
│   ├── decap-cms-blog-setup.json
│   ├── image-optimization.json
│   ├── navigation-system.json
│   ├── styling-dark-mode.json
│   ├── content-collections.json
│   └── deployment-checklist.json
├── public/                     # Static assets (unprocessed)
│   ├── admin/
│   │   └── config.yml          # Decap CMS configuration
│   ├── assets/
│   │   ├── favicons/
│   │   ├── fonts/
│   │   └── images/             # Static images (unoptimized)
│   ├── _redirects
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── images/             # Optimized by Astro
│   │       └── blog/
│   ├── components/             # Component-per-folder pattern
│   │   ├── Banner/
│   │   │   └── Banner.astro
│   │   ├── CTA/
│   │   │   ├── CTASimple.astro
│   │   │   └── CTAArtDirection.astro
│   │   ├── Header/             # Dual header system
│   │   │   ├── DynamicHeader.astro  # Default (data-driven)
│   │   │   └── StaticHeader.astro   # Alternative (hardcoded)
│   │   ├── Hero/
│   │   │   └── Hero.astro
│   │   ├── Meta/               # SEO component
│   │   │   └── Meta.astro
│   │   └── ...
│   ├── content/
│   │   └── blog/
│   ├── content.config.ts
│   ├── data/                   # Site configuration
│   │   ├── client.ts           # Business & site data
│   │   └── navData.json        # Navigation structure
│   ├── icons/                  # SVGs for Icon component
│   ├── js/
│   │   ├── blogPostingSchema.js   # BlogPosting JSON-LD
│   │   ├── localBusinessSchema.js # LocalBusiness JSON-LD
│   │   ├── nav.js
│   │   └── utils.js
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── BlogPostLayout.astro
│   │   └── ...
│   ├── pages/
│   │   ├── blog/
│   │   ├── projects/
│   │   └── ...
│   └── styles/
│       ├── root.less           # Base styles
│   │   └── ...
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

<a name="rootFilesAndFolders"></a>

### Root Files and Folders

#### `public/*`

The `public/` directory is for files and assets in your project that do not need to be processed during Astro's build process. The files in this folder will be copied into the build folder untouched, and then your site will be built.

This behavior makes `public/` ideal for common assets like images and fonts, or special files such as`_redirects` and `robots.txt`.

- \_redirects - To configure redirects. Read more on <a href="https://docs.netlify.com/routing/redirects/">Netlify</a>
- content/ - Data to render pages from, such as the blog.
- robots.txt - Instructions for site crawlers. Learn more, and generate your own, <a href="https://en.ryte.com/free-tools/robots-txt-generator/">here</a>

You can place CSS and JavaScript in your public/ directory, but be aware that those files will not be bundled or optimized in your final build.

##### `public/admin`

This folder contains `config/yml`, which is where Decap CMS configuration options lives. [More information about options in Decap docs](https://decapcms.org/docs/configuration-options/)

#### `src/*`

The `src/` folder is where most of your project source code lives. This includes:

- Pages
- Layouts
- Astro components
- UI framework components (React, etc.)
- Styles (CSS, LESS)
- Markdown

##### `src/assets`

Contains all assets you want optimized by Astro (such as assets used in `<Picture />` components for example).

Images uploaded on the CMS will be stored in `src/assets/images/blog`

##### `src/components`

Components are reusable units of code for your HTML pages. These could be Astro components, or UI framework components like React or Vue. It is common to group and organize all of your project components together in this folder.

##### `src/content`

The src/content/ directory is reserved to store content collections organised in folders (e.g. `src/content/blog`) containing `.md` files, and an optional `config.ts` collections configuration file. No other files are allowed inside this folder.

##### `src/data`

This directory contains data files that are accessible within any template throughout the project.

**`client.ts`** - Site configuration.

**`navData.json`** - Navigation structure. See more in the [Navigation System section](#navigationViaNavData)

##### `src/icons`

SVGs used by the <Icon /> component **must** be placed in this folder.

##### `src/layouts`

Layouts are Astro components that define the UI structure shared by one or more pages. The `BaseLayout.astro` file acts as a giant wrapper for each individual page, where the content is injected through the `<slot /> `component.

##### `src/js`

Contains helper functions.

##### `src/pages`

Pages are a special kind of component used to create new pages on your site. A page can be an Astro component, or a Markdown file that represents some page of content for your site.

##### `src/styles`

It is a common convention to store your CSS, Less or Sass files in a `src/styles` directory.

#### `package.json` and `package-lock.json`

The project's manifest. Standard NodeJS package files, containing the dependencies needed for the project to work.

#### `node_modules/*`

Created after you run `npm install`. This directory contains the code for all the dependencies that power this kit. It comes as standard with any NodeJS-powered project, much like the `package.json` and `package-lock.json` files. You can safely ignore this directory in your day-to-day work.

#### `dist/`

Created after running `npm build`. This will hold the final build of your site.

#### `astro.config.mjs`

An Astro configuration file. It's already set up for you, but you can extend it with integrations to use, build options, server options, and more.

#### `tsconfig.json`

A TypeScript configuration file. Optional. Includes TypeScript configuration options for your Astro project. Some features (like imports aliases `@assets/`) aren't fully supported in the editor without a tsconfig.json file.

<a name="customizingYourSite"></a>

## Customizing Your Site

This section covers everything you need to make this template your own. Whether you're making small tweaks or completely rebuilding the site, you'll find guidance on customizing components, pages, styling, SEO, images, and content management.

<a name="workingWithComponents"></a>

### Component Architecture

This template is opinionated and uses a **component-per-folder** pattern.

#### Folder Structure

Each component lives in its own folder:

```
src/components/
├── Hero/
│   └── Hero.astro
├── Services/
│   └── Services.astro
├── CTA/
│   └── CTASimple.astro
│   └── CTAComplex.astro
└── Footer/
    └── Subscribe.astro
    └── Footer.astro
```

Components sharing a common theme or use can be grouped together.

#### Using Components

Components are used throughout your pages by importing and including them:

```astro
---
import Hero from '@components/Hero/Hero.astro';
import Services from '@components/Services/Services.astro';
---

<Hero />
<Services />
```

#### Customizing Components

To customize a component, open the component file and edit the HTML, content, or styles directly. For example, to change the Hero text, edit `src/components/Hero/Hero.astro`.

#### Replacing with CodeStitch Sections

To replace a component with a different CodeStitch section:

1. Browse [codestitch.app](https://codestitch.app/) and select a stitch
2. Copy the HTML, CSS, and any JavaScript
3. Paste into the existing component file (or create a new one)
4. Update any image paths and component references
5. Add the component to your page

This keeps components organized and easy to find.

<a name="addingCustomizingPages"></a>

### Adding & Customizing Pages

Adding new pages is straightforward:

1. **Use the template** - Copy `src/pages/_template.astro` as a starting point
2. **Create your page** - Add a new file to `src/pages/` (e.g., `services.astro`)
3. **Add to navigation** - Include it in `src/data/navData.json` (if using the DynamicHeader component)

**Basic page structure:**

```astro
---
// Import components you need
import BaseLayout from '@layouts/BaseLayout.astro';
import Hero from '@components/Hero/Hero.astro';
---

<BaseLayout
  title="Page Title"
  description="Page description for meta tags"
>
  <Hero />
  <!-- Add more components -->
</BaseLayout>
```

**Creating sub-pages:**

Create a folder under `src/pages/` and add `.astro` files inside:

```
src/pages/
├── services/
│   ├── consulting.astro
│   └── development.astro
```

Update `navData.json` to add the parent page with a `children` array - the navigation will automatically create a dropdown menu. See `src/pages/projects/` for an example.

<a name="navigationSystem"></a>

### Navigation System

This template provides **two Header component options** to suit different workflows:

#### 1. DynamicHeader (Default) - `src/components/Header/DynamicHeader.astro`

The header navigation is powered by the `navData.json` file, making it easy to manage navigation without editing component code.

**How it works:**

- Each page in the navigation is an item with a `key` property (page title to be displayed) and a `url` property (include a trailing slash)
- To add subpages, populate the `children` array with page objects (containing a `key` and `url` property)
- If a page has a populated `children` array, a dropdown menu will be automatically created
- Uses helper functions from `src/js/utils.js` (`isCurrentPage()`, `getDropdownId()`) for cleaner code
- Navigation links render in the order they're declared

#### 2. StaticHeader - `src/components/Header/StaticHeader.astro`

A hardcoded navigation option that's copy/paste friendly from CodeStitch.

#### Using a New CodeStitch Header

If you want to use a different header design from the CodeStitch library, here's the process:

1. **Browse and select** a header stitch from [codestitch.app](https://codestitch.app/)
2. **Create a new component** file in `src/components/Header/` (e.g., `CustomHeader.astro`)
3. **Copy the HTML** from CodeStitch and paste it into your component between the `---` frontmatter and the `<style>` tag
4. **Copy the LESS/CSS** from CodeStitch and paste it into the component's `<style lang="less">` tag
5. **Copy the JavaScript** from CodeStitch and paste it into `src/js/nav.js`, wrapped with `document.addEventListener('astro:page-load', () => {})` for View Transitions compatibility
6. **Update imports and paths:**
   - Replace image paths with Icon components where appropriate
   - Import and add `<DarkModeToggle />` if your design includes dark mode
   - Update any hardcoded URLs to use your actual routes
7. **Update BaseLayout.astro** to import your new header component
8. **Optional:** To make your custom header work with `navData.json`, replace the static navigation list with the `.cs-ul-wrapper` pattern shown below

#### Making a CodeStitch Header Work with navData.json

If you want your custom CodeStitch header to use data-driven navigation, replace the navigation list in your stitch with this wrapper:

```JSX
<div class="cs-ul-wrapper" id="cs-ul-wrapper">
  <ul id="cs-expanded" class="cs-ul">
    {navData.map((entry) => (
      <li
        class:list={[
          "cs-li",
          { "cs-dropdown": entry.children?.length > 0 },
        ]}
      >
        {entry.children?.length > 0 ? (
          // If entry has children in navData.json, create a button and a dropdown icon
          <button
            id={getDropdownId(entry.key)}
            aria-expanded="false"
            aria-haspopup="menu"
            class:list={[
              "cs-li-link cs-dropdown-toggle",
              { "cs-active": Astro.url.pathname.includes(entry.url)},
            ]}
          >
            {entry.key}
            <Icon name="mdi--caret" class="cs-drop-icon" />
          </button>
        ) : (
          // If entry does not have children in navData.json, create an anchor
          <a
            href={entry.url}
            class:list={[
              "cs-li-link",
              { "cs-active": Astro.url.pathname === entry.url },
            ]}
            aria-current={isCurrentPage(Astro.url.pathname, entry.url)}
          >
            {entry.key}
          </a>
        )}

        {entry.children?.length > 0 && (
          // If entry has children in navData.json, create a drop down menu
          <ul class="cs-drop-ul" aria-labelledby={getDropdownId(entry.key)}>
            {entry.children.map((child) => (
              <li class="cs-drop-li">
                <a
                  href={child.url}
                  class="cs-li-link cs-drop-link"
                  aria-current={isCurrentPage(Astro.url.pathname, child.url)}
                >
                  {child.key}
                </a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
</div>
```

Don't forget to import the helper functions in your component's frontmatter:

```javascript
import { isCurrentPage, getDropdownId } from "@js/utils.js";
import navData from "@data/navData.json";
```

#### Manual Active State Management

If you prefer to manage active states manually without `navData.json`, you can use this approach:

```JSX
<li class="cs-li">
  <a href="/about/" class:list={["cs-li-link", {"cs-active": "/about/" === Astro.url.pathname }]}>About</a>
</li>
```

In this case, if the page slug is "about", the `.cs-active` class will be applied. You can adjust the page slug value to whatever you require ("blog", "/", "services", etc).

For dropdowns, use a similar approach on the parent dropdown's class attribute, checking if any of the child pages are active:

```JSX
<li class="nav-link cs-li cs-dropdown">
  <span class:list={["cs-li-link nav-link",
    { 'cs-active': '/annapolis-custom-closets/' === Astro.url.pathname },
    { 'cs-active': '/bowie-custom-closets/' === Astro.url.pathname },
    { 'cs-active': '/severna-park-custom-closets/' === Astro.url.pathname },
    { 'cs-active': '/odenton-custom-closets/' === Astro.url.pathname },
  ]}>
    Areas Served
    <img class="cs-drop-icon" src="/assets/images/down.svg" alt="dropdown icon" width="15" height="15" decoding="async" aria-hidden="true">
  </span>
  <ul class="cs-drop-ul">
    <li class="cs-drop-li">
      <a href="/annapolis-custom-closets/" class="cs-drop-link">Annapolis</a>
    </li>
    <li class="cs-drop-li">
      <a href="/bowie-custom-closets/" class="cs-drop-link">Bowie</a>
    </li>
    <li class="cs-drop-li">
      <a href="/severna-park-custom-closets/" class="cs-drop-link">Severna Park</a>
    </li>
    <li class="cs-drop-li">
      <a href="/odenton-custom-closets/" class="cs-drop-link">Odenton</a>
    </li>
  </ul>
</li>
```

In the above example, we're checking if the active page slug matches any of the listed options and applying the `.cs-active` style to the parent if it does.

<a name="stylingYourSite"></a>

### Styling Your Site

#### CSS Variables

Customize site-wide colors, fonts and other properties in `src/styles/root.less`:

```less
:root {
	--primary: #aff425;
	--primaryLight: #7aa329;
	--secondary: #ffba43;
	--bodyTextColor: #4e4b66;
	--bodyTextColorWhite: #fafbfc;
	// ... more variables
}
```

#### Dark Mode

All dark mode styles are consolidated in `src/styles/dark.less` for easy maintenance.

Dark mode is managed by DarkModeToggle.astro and persisted in BaseLayout.

#### Scoped Component Styles

Components use scoped `<style>` tags:

```astro
<section id="hero">
  <h1>Welcome</h1>
</section>

<style lang="less">
  #hero {
    padding: 4rem 1rem;
    h1 {
      font-size: 3rem;
    }
  }
</style>
```

You can also create an external stylesheet and import it in the frontmatter, or in BaseLayout for a global stylesheet.

<a name="seoMetadata"></a>

### SEO & Metadata

#### Centralized SEO Configuration

SEO data is centralized in `src/data/client.ts`, providing a single source of truth for all metadata, structured data, and social sharing settings across your site.

#### Meta Component (`src/components/Meta/Meta.astro`)

The template uses a dedicated Meta component for comprehensive SEO coverage, automatically included in BaseLayout.

**Features:**

- Open Graph tags (title, description, image, locale, site name)
- Twitter Cards (summary_large_image)
- JSON-LD structured data (LocalBusiness for all pages)
- Automatic social image handling with fallback
- Enhanced meta tags for articles (author, published/modified dates)

**Social Image Strategy:**

- Pages with heroImage: Uses provided image (optimized to 1200x600 webp)
- Pages without heroImage: Falls back to `/assets/social.jpg`
- Blog posts: Automatically uses post's featured image

#### BaseLayout Props

BaseLayout accepts simple props with sensible defaults from `client.ts`:

```typescript
interface Props {
	title?: string; // Page title (defaults to SITE.title)
	description?: string; // Meta description (defaults to SITE.description)
	heroImage?: HeroImage; // Optional social sharing image
}
```

**Basic page (uses defaults from client.ts):**

```astro
<BaseLayout
  title="About Us"
  description="Learn about our company"
>
  <!-- Page content -->
</BaseLayout>
```

**Page with social image:**

```astro
---
import heroImage from "@assets/images/hero.jpg";
import { getImage } from "astro:assets";
const optimizedImage = await getImage({ src: heroImage, format: "webp" });
---

<BaseLayout
  title="Projects"
  description="Our portfolio"
  heroImage={optimizedImage}
>
  <!-- Page content -->
</BaseLayout>
```

#### Extending SEO Metadata

##### Adding Custom Open Graph Tags

Edit `src/components/Meta/Meta.astro` to add properties like article publish dates, Twitter-specific metadata, or additional schema.org types.

##### Adding Custom JSON-LD Structured Data

The template automatically generates LocalBusiness (all pages) and BlogPosting (blog posts) schemas. To add custom JSON-LD on specific pages, use the **schema slot** - no component modifications needed!

**Approach 1: Inline Schema**

Add custom JSON-LD directly in any page:

```astro
<BaseLayout title="FAQ" description="Frequently asked questions">
  <script slot="schema" is:inline type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "What services do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer consulting and development services."
        }
      }]
    }
  </script>

  <!-- Page content -->
</BaseLayout>
```

**Approach 2: Reusable Schema Functions**

For schemas used across multiple pages, create helper functions following the existing pattern (`localBusinessSchema.js`, `blogPostingSchema.js`):

```javascript
// src/js/faqSchema.js
import { SITE } from "@data/client";

export function getFAQSchema(faqs) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	};
}
```

Usage in page:

```astro
---
import { getFAQSchema } from "@js/faqSchema";
const faqSchema = getFAQSchema(faqData);
---

<BaseLayout title="FAQ" description="Frequently asked questions">
  <script slot="schema" is:inline type="application/ld+json" set:html={JSON.stringify(faqSchema)} />

  <!-- Page content -->
</BaseLayout>
```

**Multiple Schemas:** You can add multiple `<script slot="schema">` tags - each will be rendered in the `<head>`.

See [schema.org](https://schema.org) for available types and properties.

#### Configuring Social Images

Create a default social sharing image at `public/assets/social.jpg` (1200x600px recommended). This will be used for pages without a specific heroImage.

For page-specific social images, pass a heroImage to BaseLayout as shown above.

#### JSON-LD Structured Data

This template automatically generates JSON-LD structured data for SEO:

**LocalBusiness Schema** (on all pages):

- Automatically uses data from `src/data/client.ts`
- Includes business name, address, phone, email, social media
- Generated by `src/js/localBusinessSchema.js`
- Included via Meta component in BaseLayout

**BlogPosting Schema** (on blog posts):

- Automatically generated for blog articles
- Includes title, author, published date, image
- Generated by `src/js/blogPostingSchema.js`
- Included via schema slot in BlogPostLayout
- Improves search engine rich results

**Customizing Your Schema:**

Edit `src/data/client.ts` to configure your business information. All schema data pulls from this centralized configuration file.

<a name="imagesOptimization"></a>

### Images Optimization

This kit uses Astro's built-in image optimization. **Images must be stored in `src/assets/` and used with `<Picture />` or `<Image />` components** to be optimized.

#### Responsive Images by Default

This template is configured in `astro.config.mjs` with `layout: 'constrained'` as the default. This means:

- `srcset` and `sizes` attributes are automatically generated based on image dimensions
- Images are responsive without manual configuration
- `width` and `height` are optional for images in `src/` as they are automatically inferred, but can be used to resize the images.

#### Using the Picture component

```astro
---
import { Picture } from "astro:assets";
import heroImage from "@assets/images/hero.jpg";
---

<Picture
  src={heroImage}
  alt="Description"
  width={400}
  formats={['avif', 'webp']}
  priority
  pictureAttributes={{ class: "cs-picture" }}
/>
```

#### Image component properties

- `formats` - Output formats (e.g., `['avif', 'webp']`)
- `priority` - Automatically sets optimal `loading`, `decoding`, and `fetchpriority` for above-the-fold images
- `width` / `height` - Define the dimensions to use for the image.
- `layout` - Defaults to `'constrained'` (responsive). Other options: `'fixed'`, `'full-width'`

#### Social Sharing Images

When you pass a `heroImage` to BaseLayout, it's automatically:

- Optimized for social sharing (1200x600)
- Used in Open Graph tags
- Preloaded for performance

```astro
---
import heroImage from "@assets/images/hero.jpg";
import { getImage } from "astro:assets";
const optimizedImage = await getImage({ src: heroImage, format: "webp" });
---

<BaseLayout
  title="Projects"
  description="Our portfolio"
  heroImage={optimizedImage}
>
  <!-- content -->
</BaseLayout>
```

#### Image Preloading

This template automatically preloads hero images for optimal performance.

**How it works:**

When you pass a `heroImage` to BaseLayout, the Meta component automatically:

1. Generates a preload `<link>` tag in the `<head>`
2. Sets `fetchpriority="high"` for above-the-fold images
3. Ensures the hero image loads before other resources

**Example:**

In your page:

```astro
---
import heroImage from "@assets/images/hero.jpg";
import { getImage } from "astro:assets";
const optimizedImage = await getImage({ src: heroImage, format: "webp" });
---

<BaseLayout heroImage={optimizedImage}>
  <Hero />
</BaseLayout>
```

In the rendered HTML `<head>`:

```html
<link rel="preload" as="image" href="/optimized-hero.webp" fetchpriority="high" />
```

**When to use preloading:**

- Hero/banner images visible immediately on page load
- Critical brand assets (logos, etc.)
- Above-the-fold content

**When NOT to preload:**

- Below-the-fold images (use lazy loading instead)
- Multiple images (preload only 1-2 critical resources per page)
- Small icons or decorative images

#### Built-in Astro components: `<Image />` and `<Picture />`

This kit demonstrates the use of the built-in `<Picture />` component, [for which you can read the documentation here](https://docs.astro.build/en/guides/images/#picture-). However, not all native HTML `<picture>` elements from CodeStitch blocks have been replaced with Astro's `<Picture />` components. CodeStich users will have to decide which one they want to use:

- CodeStich blocks already have fully-functionning `<picture>` elements that perform very well. However, the developper will have to do a time-consumming job with resizing and reformatting assets.
- Astro's `<Picture />` components must be manually written to replace stitches. On the other hand, they automatically process and optimize assets, which allows the developper to skip the resizing and reformatting preparation work.

#### Custom Picture component

Astro provides two built-in components that you can use to display and optimize your images.

- The <Picture> component allows you to display responsive images and work with different formats and sizes.
- The <Image> component will optimize your images and allow you to pass in different formats and quality properties.

If you want to replicate the `<picture>` elements with multiple `srcset` found in many Stitches, you can use our custom `<CSPicture />` component located in `/src/Components/TemplateComponents`.

It uses <a href="https://docs.astro.build/en/recipes/build-custom-img-component/">Astro's `getImage()` function</a> to create a custom image component that displays different source images based on media queries.

> Note: the component will automatically convert your .jpg files to .webp!

```JSX

---
// Import the component and all the images you want to use with it
import CSPicture from "@components/TemplateComponents/CSPicture.astro";
import mobileImage from "@assets/images/construction-m.jpg"
import desktopImage from "@assets/images/cabinets2.jpg"
import fallbackImage from "@assets/images/cabinets2.jpg"
---

  <CSPicture
    mobileImgUrl={mobileImage}
    mobileMediaWidth="600px"
    desktopImgUrl={desktopImage}
    desktopMediaWidth="601px"
    fallbackImgUrl={fallbackImage}
    alt=""
  />
```

It is currently set up to

1. accept 3 images (mobile, desktop and fallback) that can be not only different sizes, crops but also completely different assets, as demnnstrated here.
2. accept mobile and desktop media width if you want to adjust these sizes on a case by case basis.

You can of course adjust the sizes of attributes baased on your customization's needs directly in the component.

<a name="contentManagement"></a>

### Content Management & Blog

#### Configuring the CMS

In `public/admin/`, you'll find a `config.yml` file which contains the configuration for the blog. While this project is set up to work with a blog out of the box, you are welcome to make changes using
<a href="https://decapcms.org/docs/add-to-your-site/#configuration">Decap CMS'</a> documentation.

Blog content lives in `/src/content/blog` in the form of markdown files, with a front matter similar to that of the pages. MDX files can also be used if you want to include JSX components. The title, description, and tags are defined in the frontmatter of the markdown. The permalink will be the same as the file name.

Files uploaded through the dashboard's media library will be stored in `src/assets/images/blog` so that they can be accessed and optimised by Astro components if you wish.

You can access the blog via navigating to the `/admin` path on the deployed site and entering your decapbridge admin credentials. All blog content can be easily created, updated and deleted via this admin panel, and is the very system that your clients can use to manage their website without your involvement.

Everything on the blog should be fairly intuitive, but feel free to experiment with using this panel first. With this kit, you can add _featured_ to the comma-separated list of tags to have them show up as so in the frontend.

#### Styling the Decap preview pane

This template includes custom styles for the Decap CMS preview pane, so that blog posts in the admin dashboard look similar to the live site.

**How it works:**

- The preview styles are defined in `public/admin/decap-preview-styles.css`.
- The CMS preview script in `src/pages/admin.astro`:
  - pulls the props from the collection
  - creates the DOM elements
  - registers these elements and styles for the preview panel to use

**How to update or customize:**

- Edit `public/admin/decap-preview-styles.css` and the preview pane script in `src/pages/admin.astro` to match your site's branding or layout changes.
- Use Decap's documentation on [customizing the preview pane](https://decapcms.org/docs/customization/)

**Notes**

- The style sheet must be a CSS file
- The style sheet does not support nested CSS.

##### Adding local backend

If you want to be able to access the Decap dashboard in order to make content changes, you need to enable some local backend settings.

1. in `public/admin/config.yml`
   Add the local_backend setting

```diff
+ local_backend: true
```

2. in `package.json`
   We need to be able to run a local decap server in parallel to our astro dev. In order to do so, we need to:

a. install some packages and update the scripts. Run:
`npm install npm-run-all --save-dev`
`npm install decap-server`

b. update the scripts

```diff
"scripts": {
"astro": "astro dev",
+ "decap": "npx decap-server",
+ "dev": "npm-run-all --parallel astro decap",
},
```

Now, when `npm run dev` is run, a proxy server for the CMS is spun up on `localhost:8081`. That can often mean you run into errors if `localhost:8080` is already taken, so look out for that. You can locally access the blog via navigating to the `/admin` path (e.g. `http://localhost:4321/admin`). While running the local dev server, you won't need to login to access the admin dashboard.

#### Astro Content Collections

In `/src/content`, you will see a `config.ts` file. This is where you can configure [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/). This step is **not necessary** to run the blog with Decap CMS, but it will supercharge your Astro pages and content. Collections help to

- organize your documents,
- validate your frontmatter,
- provide automatic TypeScript type-safety for all of your content,
- use Astro's `<Image />` and `<Picture />` components with user-uplaoded images via the CMS.

This template already has Content Collections configured for immediate use of the blog content, but you could use them to power up the Portfolio or Gallery for example.

Content Collections can also be used on content that is not created via the CMS.

<a name="scriptsEventHandling"></a>

### Scripts & Event Handling

You can add interactivity to your Astro components using standard HTML `<script>` tags. This allows you to send JavaScript to run in the browser and add functionality to your Astro components.

#### Using `<script>` in Astro

This kit uses scripts in two different ways:

1. Imported from `src/`

Astro will build, optimize, and add these scripts to the page for you.

> `async` and `defer` attributes are unnecessary. Indeed, the processed script will be injected into your page's <head> with `type="module"` and module scripts are always deferred automatically.

For example, `nav.js` lives in `src/` and is used in `Baselayout.astro` like so:

`<script src="@js/nav.js"></script>`

2. Scoped to the component

Another way to use scripts in Astro is to use them directly in the component. For example, the `FAQ.astro` component uses a `<script>` tag to toggle the FAQ elements on and off. This script doesn't need to be executed on every page, so it is best scoped to its component.

This being said, this particular script could also well be imported from `src/` as seen above, and it would work too.

#### Using scripts with `<ViewTransitions />` enabled

When you add view transitions to an existing Astro project, some of your scripts may no longer re-run after page navigation like they did with full-page browser refreshes.

The <ViewTransition /> router fires a number of events on the document during navigation. These events provide hooks into the lifecycle of navigation, allowing you to do things like show indicators that a new page is loading, override default behavior, and restore state as navigation is completing.

In this kit, both the nav and FAQ scripts use the `astro:page-load` wrapper. You can use this event to run code on every page navigation, for example to set up event listeners that would otherwise be lost during navigation.

```js
<script>
  document.addEventListener('astro:page-load', () => {
    // This runs on first page load and after every navigation.
    setupStuff(); // e.g. add event listeners
  });
</script>
```

For an in-depth explanation, please refer <a href="https://docs.astro.build/en/guides/view-transitions/#script-behavior-with-view-transitions">to the documentation.

<a name="sitemapConfiguration"></a>

### Sitemap Configuration

This template includes automatic sitemap generation using <a href="https://docs.astro.build/en/guides/integrations-guide/sitemap/">`@astrojs/sitemap`</a>. The sitemap helps search engines better crawl and index your site.

#### Features

- Automatically generates `sitemap-index.xml` and `sitemap-0.xml`
- Excludes admin routes from indexing
- No manual XML creation needed

#### Configuration

The sitemap is pre-configured in `astro.config.mjs`. Here's what's included:

```js
import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: "https://yourwebsite.com", // Replace with your site URL
	integrations: [
		sitemap({
			filter: (page) => !page.includes("/admin"),
			changefreq: "weekly",
			priority: 0.7,
		}),
	],
});
```

> Note: Make sure to replace `https://yourwebsite.com` with your actual site URL in `astro.config.mjs` and `robots.txt`.

Fore more configuration options, read the [full Astro Sitemap documentation](https://docs.astro.build/en/guides/integrations-guide/sitemap/)

<a name="deployment"></a>

## Deployment

> [!IMPORTANT]
> This kit now uses decapbridge.com for its authentication solution. If you still use Netlify Identity, please refer to [the unmaintained Netlify Identity branch](https://github.com/CodeStitchOfficial/Intermediate-Astro-Decap-CMS/tree/deprecated---using-Netlify-Identity)

### Pre-Deployment Checklist

Before deploying, ensure you've configured:

1. **Site URLs** - Update in:

   - `astro.config.mjs` - `site` property
   - `src/data/client.ts` - `SITE.url`
   - `public/robots.txt` - Sitemap URL

2. **Business Information** - Update `src/data/client.ts`:

   - Company name, address, phone
   - Email and opening hours
   - Social media links

3. **Favicons** - Replace default favicons in `public/assets/favicons/`

   - Use https://realfavicongenerator.net/

4. **Default Social Image** - Create `public/assets/social.jpg` (1200x600px recommended)

5. **Decap CMS Configuration** - Update `public/admin/config.yml`:

   - Repository name
   - Site URL
   - DecapBridge settings

6. **Test JSON-LD and Social Sharing** - Validate before deploying:

**JSON-LD Validation:**

1. Build locally: `npm run build && npm run preview`
2. View page source and copy the JSON-LD script (inside `<script type="application/ld+json">`)
3. Validate at https://validator.schema.org/
4. Test with Google Rich Results: https://search.google.com/test/rich-results

**Social Sharing:**

- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

### Setting Up Decap CMS with DecapBridge

> [!TIP]
> If you are updating your kit from Netlify Identity to decapbridge.com:
>
> 1. Login to your Netlify account
> 2. Navigate to Projects/Your-Site
> 3. Navigate to Project Configuration/Identity and delete the Netlify Identity instance. This will delete your users as well. They will have to be re-created in decapbridge later.
> 4. In /src/pages/admin.astro, delete the Netlify Identity script

#### On decapbridge.com:

1. Make sure that your repo is on Github and your site is deployed (doesn't have to be Netlify) before moving on to the next step.
2. Navigate to https://decapbridge.com/ and create an account. It's free.
3. Navigate to the dashboard and Create New Site. You see this screen:

![decapbridge.com dashboard](public/assets/readme-images/decapbridge-dashboard.png)

Fill in the 3 input fields:

- Github repository: it has to be in a `user-or-org/repository-name` format. e.g. `BuckyBuck135/testing-decapbridge`
- Github access token.
  To create a personal access token in GitHub, follow these steps:

  1. Log into your Github account.
  2. Click on your profile picture (top right) (not the repository profile), and click the "Settings" link.
  3. Scroll down and click the "Developer Settings" link.
  4. Click the GitHub "Personal access tokens" link and choose `fine-grained tokens`
  5. Click the "Generate new token" button and provide your password again if required.
  6. Provide a name for the GitHub personal access token in the "Note" field.
  7. Set the access token's "expiration" timeout to "No expiration."
  8. Set the "Repository access" to the desired repository only.
  9. Set the "Permissions / Repository permissions" to **read-write access** for this repository's **Contents** and **Pull requests. (**This is needed by DecapCMS to read your markdown, and write new content via Pull Requests.)
  10. Click "Generate token.", double check the permissions and click the Generate Token button
  11. **Make sure to copy your GitHub Personal Access Token now as you will not be able to see this again.**

      ![The Permissions settings](public/assets/readme-images/github-permissions.png)

  12. Double check your permissions before generating the token. It must have read and write access to Contents and Pull Requests.

- Decap CMS URL: provide the (deployed) URL of the Decap CMS dashboard. e.g [`https://testing-decapbridge.netlify.app/admin/#/`](https://testing-decapbridge.netlify.app/admin/#/)

#### In your project:

1. In `/public/admin/config.yml`, edit the `backend` Decap config to paste in the snippet provided by the [DecapBridge.com](http://DecapBridge.com) dashboard. It should look something like this:

```yaml
# Use DecapBridge auth (required)
backend:
  name: git-gateway
  repo: BuckyBuck135/testing-decapbridge # provided by decapbridge
  branch: main
  identity_url: https://auth.decapbridge.com/sites/5605bbe7-08f2-4ce5-bce2-7d97def08bed # provided by decapbridge
  gateway_url: https://gateway.decapbridge.com # provided by decapbridge

  # Quickly see who did what (optional)
  commit_messages:
    create: Create {{collection}} "{{slug}}" - {{author-name}} <{{author-login}}> via DecapBridge
    update: Update {{collection}} "{{slug}}" - {{author-name}} <{{author-login}}> via DecapBridge
    delete: Delete {{collection}} "{{slug}}" - {{author-name}} <{{author-login}}> via DecapBridge
    uploadMedia: Upload "{{path}}" - {{author-name}} <{{author-login}}> via DecapBridge
    deleteMedia: Delete "{{path}}" - {{author-name}} <{{author-login}}> via DecapBridge
    openAuthoring: Message {{message}} - {{author-name}} <{{author-login}}> via DecapBridge

# Better Decap + Bridge logo (optional)
logo_url: https://decapbridge.com/decapcms-with-bridge.svg

# Add site links in DecapCMS (optional)
site_url: https://testing-decapbridge.netlify.app
```

2. Push changes to the repo and test the authentication system. As the admin of the site, your login credentials to access the Decap dashboard are the same as your decapbridge.com credentials.
3. Invite your client from your decapbridge dashboard. This will create a decapbridge collaborator account for them. From there, they will be able to access their Decap dashboard, reset their password etc.

### Netlify Build Cache Optimization

This project is optimized for Netlify deployment with build caching enabled via `netlify-plugin-cache`.

**Important Notes:**

- **First deployment** will be slower as it establishes the cache
- **Subsequent deployments** will be significantly faster

**Cache Management:**

If you need to clear the cache (e.g., after major dependency updates or content collection errors):

1. Go to Netlify Dashboard → Site Settings → Build & deploy
2. Click "Clear cache and retry deploy"
3. Or add `[skip cache]` to your commit message

**When to clear the cache:**

- After major dependency updates
- If you encounter "Cannot find module" errors with content collections
- After restructuring content files or renaming content collections

The cache configuration is already set up in `netlify.toml` at the project root.

<a name="contributing"></a>

## Contributing

If you're interested in helping, you can contribute in several ways:

1. Reporting and Fixing Issues: Feel free to use the issue tracker to report bugs or request features.
2. Submitting Pull Requests: If you've fixed a bug or added a new feature, submit a pull request with a clear description of your changes.
3. Providing Feedback: Share your thoughts on the project's current features and suggest improvements.

Check [open issues](https://github.com/CodeStitchOfficial/Intermediate-Astro-Decap-CMS/issues) and submit PRs.

<a name="acknowledgments"></a>

## Acknowledgments

The author would like to acknowledge:

- [Cedar Studios](https://github.com/cedar-studios) - Their [Intermediate-Astro-Kit-LESS](https://github.com/cedar-studios/Intermediate-Astro-Kit-LESS/tree/master) is the base of this template, which aims to improve on a few issues such as a breaking update to Astro v.4 due to outdated `astro-netlify-cms` integration.
- [CodeStitch](https://codestitch.app/) - Some of their free stitches were used in this template.
- [Decapbridge.com] - Powers the interactions between Decap and the Github repo. Visit [Decapbridge Discord](<(https://discord.com/channels/1257728522361901219/1257728681380417600)>) and their [open-sources repos](https://github.com/decapbridge) for more information and support.

<a name="conclusion"></a>

## Conclusion

I hope that this kit will prove useful to you. If you have any questions or would like to connect, feel free to reach out on [Twitter](https://twitter.com/BuckyBuck135) or at `buckybuck` on Discord.

Happy coding!
**_Geoffrey_**
