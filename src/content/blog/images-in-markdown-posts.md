---
title: Images in blog posts
description: How to use images in blog posts
author: Code Stitch
date: 2024-06-08T15:27:34.591Z
image: "@assets/images/blog/placeholder.jpg"
imageAlt: Bathroom
isFeatured: false
---

## An overview

Use standard Markdown `![alt](src)` syntax in your .md files. This syntax works with Astro’s Image Service API to optimize your local images stored in src/ and remote images. Images stored in the public/ folder are never optimized.

```md
# My Markdown Page

<!-- Local image stored in src/assets/ -->
<!-- Use a relative file path or import alias -->

![A starry night sky.](../assets/stars.png)

<!-- Image stored in public/images/ -->
<!-- Use the file path relative to public/ -->

![A starry night sky.](/images/stars.png)

<!-- Remote image on another server -->
<!-- Use the full URL of the image -->

![Astro](https://example.com/images/remote-image.png)
```

The HTML `<img>` tag can also be used to display images stored in public/ or remote images without any image optimization or processing. However, `<img>` is not supported for your local images in src.

The `<Image />` and `<Picture />` components are unavailable in .md files. If you require more control over your image attributes, we recommend using [Astro’s MDX integration](https://docs.astro.build/en/guides/integrations-guide/mdx/) to add support for .mdx file format. MDX allows additional image options available in MDX, including combining components with Markdown syntax.

## Uploading images on the CMS

Images uploaded via the CMS will be stored in `/src`. The kit is configured so that these images are automatically optimized by Astro. More details on [images in content collections](https://docs.astro.build/en/guides/images/#images-in-content-collections)

