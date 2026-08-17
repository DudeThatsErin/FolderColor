# Changelog

## 1.3.2

- Removed all `!important` declarations from `styles.css`.
- Replaced CSS mask-based icons with Obsidian's built-in `setIcon()` API.
- Removed CSS mask and clip-path usage to satisfy Obsidian CSS compatibility linting.
- Folder, file, and active-file icons now use real Lucide SVG elements and retain color, opacity, and size customization.

## 1.3.1

- Fixed iPad/iOS settings controls jumping back to the top after changing dropdowns or conditional options.
- Settings now rebuild only when a choice actually changes which controls are visible.
- Scroll position is preserved across the few rebuilds that are still necessary.

# Changelog

## 1.3.0

- Added a fully customizable active-file appearance section.
- Added active background color and opacity controls.
- Added independent active left/right/top/bottom borders, widths, styles, colors, opacity, dots, and corner roundness.
- Added active text color, opacity, font family, size, weight, style, decoration, transform, and letter spacing.
- Added an optional dedicated Lucide active-file icon with independent icon, color mode, custom color, opacity, and size.
- Active-file styling can be used independently of the normal row and file-icon settings.

## 1.2.4

- Added a hard reset for right-edge decorations when **Right Side = None**.
- Clears right-edge pseudo-elements on file/folder wrappers and title-content elements, not only the title row.
- Suppresses theme inset-shadow/outline border simulations in border modes while preserving left/top/bottom borders.

## 1.2.0

- Moved all customization into the plugin settings tab.
- Removed the Style Settings dependency and the bundled `@settings` block.
- Kept the plugin plain JavaScript with no build step.

# Changelog

## 1.1.1

- Fixed a faint/hairline right border appearing when only the left border is enabled.
- Disabled edges are now explicitly reset with `!important` so theme border defaults cannot bleed through.

## 1.1.0

- Added Background Only, Borders Only, Background + Borders, and None row styles.
- Added independent background and border color modes, custom colors, and opacity controls.
- Added left, right, top, and bottom border controls with independent widths.
- Added right-side dot mode with adjustable size and inset.
- Added solid, dashed, dotted, and double border styles.
- Added separate left-side and right-side corner roundness controls.
- Added an independent open-folder icon selector. It defaults to the closed-folder icon.
- Added optional Lucide-style file icons with icon, color mode, custom color, opacity, and size controls.
- Preserved 10-color repeating palettes, custom palettes, and unlimited-depth color inheritance.

## 1.0.0

- Initial release.
- Added repeating 10-color folder/file palettes.
- Added custom palette support.
- Added recursive color inheritance.
- Added background and border display modes.
- Added configurable Lucide-style folder icons through Style Settings.
