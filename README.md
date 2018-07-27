# StoryPage

A page builder using the [GutenbergJS](https://github.com/front/gutenberg-js) editor package (forked to hardcode some details making it easier to develop with).

`npm install` to install dependences
`npm start` to run the app

## Table of contents

* [Deployment](#deployment)
* [Global variables](#global-variables)
  * [API Request](#api-request)
  * [url](#url)
* [Store](#store)
* [StoryPage Blocks and Components](#storypage-blocks-and-components)
  * [Row block](#row-block)
  * [Section block](#section-block)
  * [Post block](#post-block)
  * [PostsPanel component](#postspanel-component)

## Deployment

After pull from remote, run `npm install` to install dependences if there are new and finally `npm run build`.

[↑ Go up to Table of contents](#table-of-contents)

## Global variables

### API Request

Gutenberg JS requires `wp.apiRequest` to handle with editor operations, ex: to get categories, to save a page/post, to delete a page/post, etc.

As Storypage is a ReactJs app, we decided to simplify the process using a store to handle with this actions. We are using **FakeRest** and **sinon** packages to simulate xmlhttp requests and get theirs responses to send them as `wp.apiRequest` returns.

[↑ Go up to Table of contents](#table-of-contents)

### url

We implemented `wp.url.addQueryArgs` to we handle with those paths, according our router:

`pages/new` - Route where editor will be displayed for a new page/post
`pages/[page_id]` - Route for page/post preview
`pages/[page_id]/preview` - Route for page/post preview
`pages/[page_id]/edit` - Route for editing a page/post with editor

[↑ Go up to Table of contents](#table-of-contents)

## Store

As we don't have a real API, our data is stored at **localStorage**. The **Clear localStorage** button in frontpage will delete the current *storypage* object in your browser localStorage and re-populate it with data (posts, media, categories and authors) from Minerva WP API.

[↑ Go up to Table of contents](#table-of-contents)

## StoryPage Blocks and Components

The StoryPage library contains a bunch of blocks and components to complement and simplify your Gutenberg experience.

[↑ Go up to Table of contents](#table-of-contents)

### Row block

Rows work like columns but they could be slipt in spots with different widths.

[↑ Go up to Table of contents](#table-of-contents)

### Section block

**Section** is a row with just one column. You can add blocks inside and add classes to style that section.

[↑ Go up to Table of contents](#table-of-contents)

### Post block

The **Post Block** is another kind of blocks created by **StoryPage** which is composed by a cover image and a title.

We are trying to provide new types of blocks: **auto posts** and **hand-picked posts** which are experimental for now. Theose blocks are dynamic and the render must be implemented server-side.

[↑ Go up to Table of contents](#table-of-contents)

### PostsPanel component

The **Posts Panel** is a pnael which was added to Document tab in sidebar and contains a list of posts which could be filtered by category and/or searched be name. Posts can be added to your page as (Post block)[#post-block] by drag and drop.

[↑ Go up to Table of contents](#table-of-contents)
