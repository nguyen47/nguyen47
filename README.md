# Personal site — Nguyen Hoang

Hugo site containing resume and project portfolio. Built with the
[Blowfish](https://blowfish.page/) theme, deployed to GitHub Pages.

## Setup

```bash
# 1. Clone with the theme submodule
git clone --recurse-submodules https://github.com/nguyen47/nguyen47.github.io.git
# (already cloned? run: git submodule update --init --recursive)

# 2. Run locally — needs Hugo extended 0.164.0 or newer
hugo server -D

# 3. Deploy — push to main; GitHub Actions builds and publishes to Pages
git push origin main
```

## Before first publish

| Where | What | Action |
|---|---|---|
| `static/files/` | CV PDF | Drop `nguyen-hoang-cv.pdf` here — the resume page links to it and the link 404s until it exists |
| `config/_default/hugo.toml` | `baseURL` | Set to your custom domain if you point one at the site |
| `assets/img/avatar.jpg` | Headshot | Optional. Add the file, then uncomment `image` under `[params.author]` in `languages.en.toml` |

## Repo settings

The repo must be named `nguyen47.github.io` — that is what makes GitHub Pages
serve the site at the domain root. Any other name is a *project* repo and gets
published under a `/<repo>/` subpath instead.

Settings → Pages → Source → **GitHub Actions**.

The workflow passes `--baseURL` from the Pages configuration, so the value in
`hugo.toml` is only used for local builds. Internal links use `{{< ref >}}` and
the `staticref` shortcode so the site works from a subpath as well as from a
domain root.

## Structure

```
config/_default/
  hugo.toml         baseURL, taxonomies, outputs
  languages.en.toml site title, description, author identity and social links
  menus.en.toml     header and footer navigation
  params.toml       theme behaviour
content/
  _index.md         homepage (rendered under the profile header)
  about.md
  resume.md
  projects/         portfolio entries — one file per project
  posts/            writing
layouts/shortcodes/
  staticref.html    resolves static/ paths against baseURL
static/files/       CV PDF and other downloads
themes/blowfish/    theme, tracked as a git submodule
```

## Adding a project

Copy any file in `content/projects/` and update the front matter. `weight`
controls ordering on the Projects page — enterprise work is 1–9, personal
builds 10+. Set `summary` to the same text as `description` so the entry reads
well in list views.

## Updating the theme

```bash
git submodule update --remote themes/blowfish
```

Theme options are documented at <https://blowfish.page/docs/configuration/>.
Never edit files under `themes/blowfish/` — override them by placing a file at
the same path under `layouts/` instead.
