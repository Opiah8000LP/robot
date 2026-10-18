# RDWEEB

A personal site built as a floating 3D menu: plain HTML, CSS and JavaScript, no frameworks, no build step, nothing to install.

It starts almost empty. The tabs, labels and structure are all there; the writing, pictures and music are yours to add.

## Running it

Open the folder in a terminal and start a small local server (opening `index.html` directly can block the data files):

```
python3 -m http.server 8000
```

then go to http://localhost:8000. VS Code's Live Server extension does the same job.

## Putting it online (GitHub Pages)

1. Make a repository and upload everything in this folder.
2. Settings → Pages → deploy from the `main` branch, root folder.
3. After a minute it's live at `https://<your-name>.github.io/<repo>/`.

## Adding your content

There's no editor on the site; you edit text files. `data/HOW-TO-EDIT.md` explains it with copy-paste examples for every kind of block. In short:

* `data/sections/*.js` — one file per tab. Type between the quotes, save, refresh.
* `data/site.js` — your name, the list of tabs, optional sounds and background.
* `data/playlist.js` — the music player's playlist.
* To hide a block, delete it or add `hidden: true`. To reorder, move it.
* Typing `<Secret&4>` shows a black bar four characters wide. Only the number is stored, so the censored word can't be recovered from the site.

## File names

Lowercase, no spaces, dashes between words.

| What | Folder | Example |
|---|---|---|
| Tab icons | `icons/` | `identity.svg` (one per tab id: home, identity, personality, worldview, interests, creative, growth, social, future, years, facts) |
| Music | `music/` | `01-song-name.mp3` |
| Track covers | `covers/` | `01-song-name.jpg` |
| Pictures | `images/<tab id>/` | `images/creative/cat-drawing.png` |
| Year pictures | `images/years/<year>/` | `images/years/2026/trip-01.jpg` |
| Interface sounds (optional) | `sfx/` | `click.mp3`, `hover.mp3`, `open.mp3`, `close.mp3`, `enter.mp3` |
| Background photo (optional) | `backgrounds/` | `bg-light.jpg`, then point to it in `data/site.js` |

In the data files you only type the file name (`cat-drawing.png`); the site already knows the folder. Icons are best as SVG in one solid colour. Without an icon a tab shows two letters instead.

The loading screen checks every track in the playlist and tells you if one is missing. Sound only starts after the "Tap to enter" tap because browsers don't allow it before.

## The letter to your future self

Open `tools/seal-letter.html` on your own computer (through the local server, e.g. http://localhost:8000/tools/seal-letter.html). Write the letter, choose a date, seal it, download the file it gives you, and replace `data/letter.sealed.js` with it. That's all that ever goes on GitHub.

How it stays private: the letter is encrypted with timelock encryption (tlock on the public drand network). The key doesn't exist until the unlock time, so until then nobody can read it, including you.

What to know:

* It needs an internet connection to seal and to open.
* After the date, anyone who visits can open it. It's a time lock, not a password.
* It can't be edited. To change it, seal a new one.
* It relies on drand staying online.
* Keep your own copy of the text if you want one; once sealed you can't read it back yet.

## What static hosting can't do

* The site can't save anything itself; every change is a file you edit and commit.
* Everything in the repository is public. Use the censor trick for names, and don't commit anything you want hidden.
* Settings (theme, text size, volume) are remembered per visitor in their own browser.

## If it breaks

* Stuck on the loading screen: it names the file it couldn't load. After an edit that's nearly always a missing comma or quote in that file.
* Changed something and nothing happened: do a hard refresh (Ctrl+Shift+R).

## Layout

```
index.html           the page
css/                 styles (colours live only in tokens.css)
js/core/             store, settings, router, search, nav, sounds
js/ui/               blocks, dashboard, player, letter, dialogs, the 3D stage
js/loader.js         loading screen
data/                site.js, playlist.js, letter.sealed.js, sections/*.js, HOW-TO-EDIT.md
tools/               seal-letter.html
vendor/              the time-lock library
icons/ images/ music/ covers/ sfx/ backgrounds/ fonts/   your files
```

Keyboard: press `?` on the site for the shortcut list. `/` searches, `[` and `]` change tab, `S` is settings.
