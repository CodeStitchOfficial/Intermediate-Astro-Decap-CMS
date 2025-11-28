# Changelog

## 3.0.0 - Major Architecture Update

### Astro Best Practices Implementation

- Split large monolithic pages using modular, componentized UI sections
- Components follow the frontmatter / template / script / style pattern
- Component-per-folder organization for better maintainability
- Added reusable components: Banner, CSPicture, Hero, Reviews, Services, SideBySide, Testimonials

### Asset & Image Optimization

- Optimized images using Astro's `<Picture />` component with WebP support and art direction
- SVG icons now use `astro-icon` with `<Icon />` component for better performance
- Restructured assets with dedicated folders (blog, gallery, projects, services, testimonials)
- Moved all relevant assets from public to src for optimal bundling

### SEO Improvements

- New Meta component and updated client.ts for centralized SEO management
- Dynamic JSON-LD schema generation
- Added social sharing image

### Navigation & Accessibility

- Accessible navigation with WCAG-compliant keyboard support
- Fixed skip link functionality
- Two Header components to choose from, whether you like dynamic or static syntax.

### Developer Experience

- Added 8 VS Code tours for onboarding (getting started, component composition, content collections, Decap CMS, deployment, image optimization, navigation)
- New cleanup scripts for starting fresh:
  - `npm run remove-decap` - Removes Decap CMS, blog layouts, content collections, and related components
  - `npm run remove-demo` - Removes demo pages (about, contact, reviews, projects) and demo components
- Added `_template.astro` page for easier scaffolding
- Better organized frontmatter across pages

### Build & Deployment

- Added Netlify cache plugin for faster builds
- Updated Astro to v5.16.2

### Breaking Changes

- Component import paths changed due to folder restructuring
- Asset paths updated (moved to src/assets organization)
- Meta tags logic moved to Meta, from BaseLayout

---

## 2.2.4

### Minor changes

- Added support for custom styles for the Decap CMS preview pane, so that blog posts in the admin dashboard look similar to the live site.
  Thanks @JerHawden for the great work. More info in [PR23](https://github.com/CodeStitchOfficial/Intermediate-Astro-Decap-CMS/pull/23)

See code changes in [47df1c0](4b8f13c743624211118f081d6c6b566f0b8331ee)
See documentation changes in [47df1c0](47df1c02599710c9b669f869166e64633eb0c5d8)

## 2.2.3

### Minor changes

- The `tags` array of strings in the blog config is now a `isFeatured` boolean.

## 2.2.2

### Minor changes

- Support for local_backend in decap config has been removed due to 1. irrelevancy 2.causing bugs
- This means that a local Decap server will not be started anymore upon `npm run dev` and as such you cannot access Decap dashboard from localhost. You can of course still access the Decap dashboard from the deployed site using your decapbridge admin credentials.

## 2.2.1

### Major changes

- Deprecated Netlify Identity has been removed
- Support for the new decapbridge auth system implemented
- Learn how to update in the "Deployment" section of the readme.

## 2.1.1

### Patch changes

- Astro has been upgraded to v.5.7.12
- Fixed Picture import statement. Newer versions of Astro must import `<Image />` and `<Picture />` from "astro:assets"

```diff
- import Picture from "astro/components/Picture.astro"
+ import { Picture } from "astro:assets"
```

## 2.1.0

### Major changes

The blog has received new components and some refactoring.

- Refactored `blog/index.astro`, `blog/[...slug].astro` and `blog.less` to separate concerns, increase readability and reusability.
  - New layouts in `src/layouts`
    - BlogPostLayout is used to wrap an individual blog post in `src/blog/[...slug].astro`
    - `BlogRecentArticles.astro` and `BlogRecentArticlesWithSidebar` are used to wrap recent articles with or without a sidebar widget, and are used in `src/blog/index.astro`
    - Their respective styles are moved from `blog.less` and now scoped to the layout for increased readability and maintainability
  - `blog.less` has been removed
  - `markdown.less` has been created and holds all the styles for markdown content
  - `sidebar.less` has been created and holds the styles for the sidebar widgets, shared across mutiple components.
  - New component: TableOfContents.astro. Is used in a sidebar on the individual posts and allows easy navigation within the article.
- Baselayout now has typed Props and uses an optional preloadedImage prop consumed by: 1. the preload link and 2. the og tags for social sharing.
  For example, the cover image on a blog page passed to Baselayout will be used as the social image
- Removed getOptimizedImage() from @utils and replaced with getImage() function directly in the page
- Created new demo post `images-in-markdown-posts.md` to illustrate using remote and local images in markdown content.

## 2.0.0

### Major changes

- Astro has been upgraded to v5.0

#### What should I do on my fork?

1.  **Upgrade Astro and its dependencies** 1. Run `npx @astrojs/upgrade` in your terminal 2. At the yellow warning, choose “Yes” to continue
    <br>

2.  **Breaking change: Renamed: <ViewTransitions /> component**
    <br> 📢 Reference: https://docs.astro.build/en/guides/upgrade-to/v5/#renamed-viewtransitions--component 1. In `BaseLayout.astro`, replace all occurrences of the `ViewTransitions` import and component with `ClientRouter`

            ```tsx
            // BaseLayout.astro
            - import { ViewTransitions } from 'astro:transitions';
            + import { ClientRouter } from 'astro:transitions';

            <html>
              <head>
                ...
               - <ViewTransitions />
               + <ClientRouter />
              </head>
            </html>
            ```

     <br>

3.  **Breaking Change: Content Collections**
    <br> 📢 Reference: https://docs.astro.build/en/guides/upgrade-to/v5/#updating-existing-collections 1. **Move the content config file**. This file no longer lives within the `src/content/` folder. This file should now exist at `src/content.config.ts`.

        2. **Edit the collection definition**. Your updated collection requires a `loader` which indicates both a folder for the location of your collection (`base`) and a `pattern` defining the collection entry filenames and extensions to match.


            ```tsx
            // src/content.config.ts

             + import { glob } from 'astro/loaders';

            // type: 'content',

            loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),

            ```

        3. **Change references from `slug` to `id`**. Content layer collections do not have a reserved `slug` field. Instead, all updated collections will have an `id`.

            For example:

            ```tsx
            // src/pages/blog/[...post].astro

            export async function getStaticPaths() {
              const posts = await getCollection("blog");
              return posts.map((entry) => ({
                // params: { post: entry.slug },
                params: { post: entry.id },
                props: { post: entry },
              }));
            }
            ```

            > 📢 `CTRL+SHIFT+F` and check for any traces of `.slug`. There shouldn’t be any more.


        4. **Switch to the new `render()` function**. Entries no longer have a `render()` method. Instead, import the `render()` function from `astro:content`.


            ```tsx
            // src/pages/blog/[...post].astro

            import { getCollection, render } from 'astro:content';

            const { Content } = await page.render();
            const { Content } = await render(post);
            ```

            > 📢 Running into `Module '"astro:content"' has no exported member 'render'`?
            > => Restart the dev server



        5. Repeat for every content collection you may have added.

4.  **Breaking change: TypeScript configuration**
    <br> 📢 Reference: https://docs.astro.build/en/guides/upgrade-to/v5/#changed-typescript-configuration 1. Add the following `include` and `exclude` properties to your existing `tsconfig.json`:

    ````
    {
    "extends": "astro/tsconfigs/base",
    "include": [".astro/types.d.ts", "**/*"],
    "exclude": ["dist"]
    }

        ```
    ````

- Ensure that the other packages you may have added are up-to-date and compatible with Astro v5
- Please refer to the [official Upgrade to v5 guide](https://docs.astro.build/en/guides/upgrade-to/v5/) if you run into any issues.

### Minor changes

- Added CHANGELOG.md to keep track of patch changes and setup instructions

## 0.1.0

### Added

- Initial release of Beginner-Astro-v4-LESS template
