# How to edit your content

All your content lives in `data/sections/*.js`, one file per tab. Open one in any text editor (Notepad works, VS Code is nicer), type between the quotes, save, refresh the page. That's the whole workflow.

Each file is a list of **blocks**. A block is one heading plus its content. Blocks appear in the order they're written, so **to reorder, cut a block and paste it somewhere else.** To remove one, delete it (or add `hidden: true` to keep it but not show it).

## The few rules

* Text goes between double quotes: `"like this"`.
* Things in a list are separated by commas: `["one", "two", "three"]`. No comma after the last one is also fine.
* For long writing use backticks, and leave an empty line between paragraphs:

  ```js
  text: `First paragraph.

  Second paragraph.`,
  ```
* If the site is stuck on the loading screen after an edit, you have a missing comma, quote or bracket near where you last typed. Undo and look again.
* **Censoring:** write `<Secret&5>` for a black bar five characters wide. Never type the real word.
* Also works in text: `**bold**`, `*italic*`, `[link text](https://example.com)`.

## Block types

Every block has `id` (a unique name with no spaces), `type`, `title`, and optionally `group` (blocks with the same group are listed together in the side menu). The rest depends on the type.

### paragraph: ordinary writing
```js
{ id: "biography", type: "paragraph", title: "Biography", group: "",
  text: `Short version, shown straight away.

Can be several paragraphs.`,
  more: `The long version. Shown after "Read the full version" is clicked. Leave empty if you don't need it.` }
```

### fields: label and value pairs
Rows with an empty value are hidden from visitors.
```js
{ id: "identity-card", type: "fields", title: "Identity card", group: "",
  items: [ { label: "Preferred name", value: "Dweeb" }, { label: "Pronouns", value: "" } ] }
```

### list
```js
{ id: "languages", type: "list", title: "Languages", group: "", ordered: false,
  items: ["English", "Afrikaans"] }
```
`ordered: true` numbers them.

### tags: short labels
```js
{ id: "traits", type: "tags", title: "Traits", group: "", items: ["curious", "stubborn"] }
```

### cards
```js
{ id: "fav-games", type: "cards", title: "Favorite games", group: "",
  items: [ { title: "Game name", subtitle: "Studio or platform", date: "2019-06",
             text: "A sentence or two.", tags: ["rpg"], image: "game.jpg", link: "https://example.com" } ] }
```
Everything except `title` is optional. `date` can be `"2019"`, `"2019-06"` or `"2019-06-14"`. The picture goes in `images/<section id>/` (for example `images/interests/game.jpg`).

### gallery: pictures with captions and a full-size viewer
```js
{ id: "artwork-gallery", type: "gallery", title: "Artwork", group: "",
  items: [ { src: "cat.png", caption: "Cat", date: "2024-05-17", description: "Drawn on the bus." } ] }
```
Pictures go in `images/<section id>/`. Only `src` is required.

### audio: little players for your own clips
```js
{ id: "music-produced", type: "audio", title: "Music I made", group: "",
  items: [ { src: "my-beat.mp3", title: "My beat", description: "Made in an afternoon." } ] }
```
The file goes in `music/`.

### timeline
```js
{ id: "art-history", type: "timeline", title: "Art history", group: "", order: "oldest",
  items: [ { date: "2016", title: "First tablet", text: "What happened." } ] }
```
`order` is `"oldest"`, `"newest"`, or `"manual"` (exactly as written).

### journal: one entry per month
```js
{ id: "monthly-reflections", type: "journal", title: "Monthly reflections", group: "",
  items: [ { month: "2026-10", title: "Optional title", mood: "tired", text: "What the month was like." } ] }
```
Newest month is shown first. To add a month, copy the last entry and change it.

### faq
```js
{ id: "identity-faq", type: "faq", title: "Questions", group: "",
  items: [ { q: "Why Dweeb?", a: "Because." } ] }
```

### stats: big numbers
```js
{ id: "numbers", type: "stats", title: "Numbers", group: "",
  items: [ { label: "Games finished", value: "42", note: "since 2020" } ] }
```

### palette: your colours (the site itself stays black and white)
```js
{ id: "personal-palette", type: "palette", title: "My colours", group: "",
  items: [ { name: "Night", hex: "#101820", note: "" } ] }
```

### quiz
```js
{ id: "know-me-quiz", type: "quiz", title: "How well do you know me?", group: "",
  intro: "Ten questions.",
  questions: [ { q: "Favourite colour?", options: ["Red", "Black", "Blue"], answer: 2, explain: "Obviously." } ],
  results: [ { min: 0, title: "Stranger", text: "Nice to meet you." }, { min: 70, title: "Friend", text: "Good job." } ] }
```
`answer` counts from 1 (so `2` means the second option). A player gets the highest result whose `min` percentage they reach, so always include one with `min: 0`.

### letter
Only used in the Future tab. See the README (it's a separate tool).

## Years (Life Archive)

`data/sections/years.js` has a `pages` list with one entry per year. To add a year, copy the whole 2026 entry, paste it after itself (with a comma), and change `id`, `year` and `title` to the new year. Pictures for it go in `images/years/<year>/`.

The block with id `year-preview` feeds the "This Year In My Life" box on the home tab when it is the current year.

## The home tab

`data/sections/home.js` has:
- `welcome`: the big line at the top (blank gives "Welcome.").
- `box`: the picture box next to it. Put your picture at `images/box.png` and it shows up. Change `image` to use another path, `caption` for a line under it. Click it for a wobble.
- `intro`: your introduction paragraphs. Blank line starts a new paragraph.
- `thisYear` and `recent`: headline, highlights, projects, milestones, achievements.

## Adding a whole new tab

1. Copy any line in `data/site.js` under `sections`, give it a new `id` and `title`.
2. Create `data/sections/<that id>.js`. Easiest is to copy a small one such as `social.js` and change `id` inside it.
3. Optionally add `icons/<that id>.svg`.

To hide a tab, add `hidden: true` to its line in `data/site.js`.

## Music

Edit `data/playlist.js`. The order is the play order.
