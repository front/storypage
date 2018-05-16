# StoryPage

A page builder using the [Gutenberg](https://github.com/front/gutenberg) editor (forked to hardcode some details making it easier to develop with).

`npm install` to install dependences
`npm start` to run the app

## Core

### API Request

Gutenberg requires `wp.apiRequest` to handle with editor operations, ex: to get categories, to save a page/post, to delete a page/post, etc.

As Storypage is a ReactJs app, we decided to simplify the process using a store to handle with this actions. We are using **FakeRest** and **sinon** packages to simulate xmlhttp requests and get theirs responses to send them as `wp.apiRequest` returns.

### URL

We implemented `wp.url.addQueryArgs` to we handle with those 3 paths, according our router:

`pages/new` - Route where editor will be displayed for a new page/post
`pages/[page_id]` - Route for page/post preview
`pages/[page_id]/edit` - Route for editing a page/post with editor

## Store

As we don't have a real API, our data is stored at **localStorage**.

### Actions

### Reducer

### Selectors
