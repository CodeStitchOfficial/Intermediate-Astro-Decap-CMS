---
title: This kit now uses decapbridge for auth
description: Say goodbye to deprecated Netlify Identity and hello to decapbridge
author: Geoffrey
date: 2025-05-17T16:10:00.000Z
image: "@assets/images/blog/placeholder.jpg"
imageAlt: This post was added via deployed Decap dashboard
isFeatured: true
---

Netlify Identity has been removed, and the kit now uses decapbridge.com. Why?

## Netlify Identity has been deprecated

Netlify Identity service and the underlying GoTrue API are deprecated. While Identity and GoTrue continue to function for sites that currently have them enabled, new Identity or GoTrue configurations are not recommended. While we will keep fixing any major security issues that arise, we will no longer fix bugs in the functionality of Identity or GoTrue.

- For help migrating, existing users can reach out to Support to help you export a list of your users
- For an alternative to Netlify Identity, we suggest using Auth0. Learn more in our Auth0 extension docs.
- For an alternative to GoTrue, we suggest Supabase Auth, which is an actively maintained fork of GoTrue.

Source: https://docs.netlify.com/security/secure-access-to-sites/identity/

## decapbridge is super easy to use

Setting up a token on Github might be a bit scary, and is arguably a bit more complex that toggling Identity on Netlify, but it makes up for it by:

- platform agnostic: you can now host your site anywhere!
- better user management experience compared to Identity

This post was written on the deployed site's Decap dashboard.
