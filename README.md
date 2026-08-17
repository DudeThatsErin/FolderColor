# Folder Color System

A lightweight Obsidian community plugin that styles the File Explorer with configurable folder/file colors, recursive color inheritance, multiple palettes, custom 10-color palettes, and replacement folder icons.

Style Settings plugin is unnecessary and all settings are built into the plugin.

## Features

- 10-color repeating palette system
- Built-in palettes plus a 10-color custom palette
- Unlimited-depth parent color inheritance
- Full-background and accent-border modes
- File Explorer font controls
- Light/dark text color controls
- Replacement folder collapse icons
- Match icon colors to folder colors or use one custom icon color
- Icon opacity and size controls
- Mobile compatible (`isDesktopOnly: false`)

## Required for customization

Install **Style Settings** from Community Plugins. The default appearance still loads without it, but the configuration UI requires Style Settings.

The plugin calls `app.workspace.trigger("parse-style-settings")` on load so Style Settings can parse the `@settings` block in `styles.css`.

## Manual installation for testing

1. Create this folder inside your vault:
   `.obsidian/plugins/folder-colors/`
2. Copy `main.js`, `manifest.json`, and `styles.css` into it.
3. Restart Obsidian or reload the app.
4. Enable **Folder Color System** under **Settings → Community plugins**.
5. Install/enable **Style Settings** and configure Folder Color System from there.
