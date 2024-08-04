# Svelte 4 and Vue 3 comparison with Astro

This project aims to make a comparison between Svelte 4 and Vue 3 (Single File Components).

## Project Structure

It's a simple and unfinished personal finance tracker app where there are a few client components:

- Sidebar
- Expense Tracker
- Income Tracker
- Total Balance Tracker
- Input field

Remaining parts of the app are Astro components:

- Document
- Header
- Main Content Wrapper
- Footer

The styling has been done with `TailwindCSS` with minimal extension from its default configuration.

## Usage

Package manager used is `pnpm` so, to run the project locally, type the following:

```zsh
pnpm dev
```

You can also lint the entire project using `Eslint` and its plugins to match our used technologies:

```zsh
pnpm lint
```

Same thing goes with formatting, using `Prettier` and its plugins:

```zsh
pnpm format
```

## More Info

> [!WARNING]
> It's an unfinished project and it needs optimization and I didn't use every API those two frameworks have to offer.
> It was a learning experience for `Vue 3`, which I came to reconsider after trying it out on its `Vue 2` version.
> If you have any critique or feedback please open an Issue, I would love to learn more about it.

## Conclusion

Thanks for stepping by!
I think `Vue` approach is pretty unique and works very well with `Typescript`, inferring return types from generics and making the `script setup` tag less bloated with objects and stuff.
I still find `Svelte` much more straightforward when it comes to APIs and DX in general, but I also understand that `Svelte` compiler makes you write a JS-like language and not pure `Javascript`.
I'm excited to see if `Vue Vapor Mode` will enhance its DX and I'm also excited for `Svelte 5` release!
