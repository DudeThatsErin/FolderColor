const { Plugin, PluginSettingTab, Setting, setIcon } = require('obsidian');

const PALETTE_OPTIONS = [
  ['palette-pink', 'Pink / Purple'],
  ['palette-blue', 'Blue'],
  ['palette-rainbow', 'Rainbow'],
  ['palette-mono', 'Mono Lavender'],
  ['palette-neon', 'Neon'],
  ['palette-forest', 'Forest'],
  ['palette-frost', 'Frost'],
  ['palette-sakura', 'Sakura'],
  ['palette-ocean', 'Ocean'],
  ['palette-sunset', 'Sunset'],
  ['palette-autumn', 'Autumn'],
  ['palette-candy', 'Candy'],
  ['palette-cyberpunk', 'Cyberpunk'],
  ['palette-earth', 'Earth'],
  ['palette-mint', 'Mint'],
  ['palette-grape', 'Grape'],
  ['palette-midnight', 'Midnight'],
  ['palette-rosegold', 'Rose Gold'],
  ['palette-fire', 'Fire'],
  ['palette-teal', 'Teal'],
  ['palette-lavender', 'Lavender'],
  ['palette-peach', 'Peach'],
  ['palette-berry', 'Berry'],
  ['palette-emerald', 'Emerald'],
  ['palette-desert', 'Desert'],
  ['palette-coffee', 'Coffee'],
  ['palette-ice', 'Ice'],
  ['palette-vaporwave', 'Vaporwave'],
  ['palette-solarized', 'Solarized'],
  ['palette-slate', 'Slate'],
  ['palette-pastel-rainbow', 'Pastel Rainbow'],
  ['palette-flexoki-theme', 'Flexoki'],
  ['palette-minimal-theme', 'Minimal'],
  ['palette-catppuccin-frappe', 'Catppuccin Frappé'],
  ['palette-catppuccin-macchiato', 'Catppuccin Macchiato'],
  ['palette-catppuccin-mocha', 'Catppuccin Mocha'],
  ['palette-things3-theme', 'Things 3'],
  ['palette-custom', 'Custom']
];

const VISUAL_STYLE_OPTIONS = [
  ['appearance-background', 'Background Only'],
  ['appearance-border', 'Borders Only'],
  ['appearance-both', 'Background + Borders'],
  ['appearance-none', 'None']
];

const COLOR_MODE_OPTIONS = [
  ['background-folder-color', 'Match Palette Color'],
  ['background-custom-color', 'Custom Color']
];

const BORDER_COLOR_MODE_OPTIONS = [
  ['border-folder-color', 'Match Palette Color'],
  ['border-custom-color', 'Custom Color']
];

const BORDER_STYLE_OPTIONS = [
  ['border-solid', 'Solid'],
  ['border-dashed', 'Dashed'],
  ['border-dotted', 'Dotted'],
  ['border-double', 'Double']
];

const RIGHT_DECORATION_OPTIONS = [
  ['right-none', 'None'],
  ['right-border', 'Border'],
  ['right-dot', 'Dot']
];

const ICON_OPTIONS = [
  ['folder-icon-default', 'Default Arrow (Chevron)'],
  ['folder-icon-folder', 'Folder'],
  ['folder-icon-folder-open', 'Folder Open'],
  ['folder-icon-archive', 'Archive'],
  ['folder-icon-star', 'Star'],
  ['folder-icon-heart', 'Heart'],
  ['folder-icon-book', 'Book'],
  ['folder-icon-notebook', 'Notebook'],
  ['folder-icon-briefcase', 'Briefcase'],
  ['folder-icon-home', 'Home'],
  ['folder-icon-calendar', 'Calendar'],
  ['folder-icon-clock', 'Clock'],
  ['folder-icon-tag', 'Tag'],
  ['folder-icon-bookmark', 'Bookmark'],
  ['folder-icon-box', 'Box'],
  ['folder-icon-database', 'Database'],
  ['folder-icon-code', 'Code'],
  ['folder-icon-terminal', 'Terminal'],
  ['folder-icon-settings', 'Settings'],
  ['folder-icon-sparkles', 'Sparkles'],
  ['folder-icon-flame', 'Flame'],
  ['folder-icon-zap', 'Zap'],
  ['folder-icon-rocket', 'Rocket'],
  ['folder-icon-camera', 'Camera'],
  ['folder-icon-image', 'Image'],
  ['folder-icon-globe', 'Globe'],
  ['folder-icon-users', 'Users'],
  ['folder-icon-user', 'User'],
  ['folder-icon-file', 'File'],
  ['folder-icon-list', 'List'],
  ['folder-icon-check-square', 'Check Square']
];

const OPEN_ICON_OPTIONS = [
  ['folder-open-icon-same', 'Same as Closed Icon'],
  ...ICON_OPTIONS.filter(([value]) => value !== 'folder-icon-default').map(([value, label]) => [value.replace('folder-icon-', 'folder-open-icon-'), label])
];

const ICON_COLOR_OPTIONS = [
  ['icon-colorful', 'Match Palette Color'],
  ['icon-custom-color', 'Custom Color']
];

const FILE_ICON_OPTIONS = ICON_OPTIONS
  .filter(([value]) => value !== 'folder-icon-default')
  .map(([value, label]) => [value.replace('folder-icon-', 'file-icon-'), label]);

const FILE_ICON_COLOR_OPTIONS = [
  ['file-icon-colorful', 'Match Palette Color'],
  ['file-icon-custom-color', 'Custom Color']
];

const ACTIVE_APPEARANCE_OPTIONS = [
  ['active-appearance-none', 'No Special Background / Borders'],
  ['active-appearance-background', 'Background Only'],
  ['active-appearance-border', 'Borders Only'],
  ['active-appearance-both', 'Background + Borders']
];

const ACTIVE_BG_COLOR_OPTIONS = [
  ['active-bg-row-color', 'Match Palette Color'],
  ['active-bg-custom-color', 'Custom Color']
];

const ACTIVE_BORDER_COLOR_OPTIONS = [
  ['active-border-row-color', 'Match Palette Color'],
  ['active-border-custom-color', 'Custom Color']
];

const ACTIVE_RIGHT_DECORATION_OPTIONS = [
  ['active-right-none', 'None'],
  ['active-right-border', 'Border'],
  ['active-right-dot', 'Dot']
];

const ACTIVE_ICON_OPTIONS = FILE_ICON_OPTIONS.map(([value, label]) => [value.replace('file-icon-', 'active-icon-'), label]);

const ACTIVE_ICON_COLOR_OPTIONS = [
  ['active-icon-row-color', 'Match Palette Color'],
  ['active-icon-text-color', 'Match Active Text Color'],
  ['active-icon-custom-color', 'Custom Color']
];

const FONT_WEIGHT_OPTIONS = [
  ['100', '100 - Thin'], ['200', '200 - Extra Light'], ['300', '300 - Light'],
  ['400', '400 - Normal'], ['500', '500 - Medium'], ['600', '600 - Semi Bold'],
  ['700', '700 - Bold'], ['800', '800 - Extra Bold'], ['900', '900 - Black']
];

const FONT_STYLE_OPTIONS = [
  ['normal', 'Normal'], ['italic', 'Italic'], ['oblique', 'Oblique']
];

const TEXT_DECORATION_OPTIONS = [
  ['none', 'None'], ['underline', 'Underline'], ['line-through', 'Line Through'], ['overline', 'Overline']
];

const TEXT_TRANSFORM_OPTIONS = [
  ['none', 'None'], ['uppercase', 'UPPERCASE'], ['lowercase', 'lowercase'], ['capitalize', 'Capitalize']
];

const FONT_VARIANT_OPTIONS = [
  ['normal', 'Normal'], ['small-caps', 'Small Caps']
];

const CLASS_GROUPS = {
  palette: PALETTE_OPTIONS.map(([value]) => value),
  visualStyle: VISUAL_STYLE_OPTIONS.map(([value]) => value),
  backgroundColorMode: COLOR_MODE_OPTIONS.map(([value]) => value),
  borderColorMode: BORDER_COLOR_MODE_OPTIONS.map(([value]) => value),
  borderLineStyle: BORDER_STYLE_OPTIONS.map(([value]) => value),
  rightDecoration: RIGHT_DECORATION_OPTIONS.map(([value]) => value),
  folderIcon: ICON_OPTIONS.map(([value]) => value),
  folderOpenIcon: OPEN_ICON_OPTIONS.map(([value]) => value),
  folderIconColorMode: ICON_COLOR_OPTIONS.map(([value]) => value),
  fileIcon: FILE_ICON_OPTIONS.map(([value]) => value),
  fileIconColorMode: FILE_ICON_COLOR_OPTIONS.map(([value]) => value),
  activeAppearance: ACTIVE_APPEARANCE_OPTIONS.map(([value]) => value),
  activeBgColorMode: ACTIVE_BG_COLOR_OPTIONS.map(([value]) => value),
  activeBorderColorMode: ACTIVE_BORDER_COLOR_OPTIONS.map(([value]) => value),
  activeBorderLineStyle: BORDER_STYLE_OPTIONS.map(([value]) => `active-${value}`),
  activeRightDecoration: ACTIVE_RIGHT_DECORATION_OPTIONS.map(([value]) => value),
  activeIcon: ACTIVE_ICON_OPTIONS.map(([value]) => value),
  activeIconColorMode: ACTIVE_ICON_COLOR_OPTIONS.map(([value]) => value),
  toggles: [
    'show-left-border', 'show-top-border', 'show-bottom-border', 'inherit-colors', 'show-file-icons', 'explorer-typography',
    'active-folder-typography', 'active-file-typography',
    'active-show-left-border', 'active-show-top-border', 'active-show-bottom-border', 'active-show-icon'
  ]
};

const CONTROLLED_CLASSES = Object.values(CLASS_GROUPS).flat();

const CSS_VARIABLES = [
  '--background-opacity', '--background-custom-color-dark', '--background-custom-color-light',
  '--border-opacity', '--border-custom-color-dark', '--border-custom-color-light',
  '--left-border-width', '--right-border-width', '--top-border-width', '--bottom-border-width',
  '--left-border-radius', '--right-border-radius', '--right-dot-size', '--right-dot-offset', '--font-size',
  '--font-family', '--font-weight', '--font-style', '--text-decoration', '--text-transform', '--font-variant',
  '--letter-spacing', '--word-spacing', '--line-height', '--text-color-dark', '--text-color-light',
  '--active-folder-text-color-dark', '--active-folder-text-color-light', '--active-folder-text-opacity',
  '--active-folder-font-size', '--active-folder-font-family', '--active-folder-font-weight', '--active-folder-font-style',
  '--active-folder-text-decoration', '--active-folder-text-transform', '--active-folder-font-variant',
  '--active-folder-letter-spacing', '--active-folder-word-spacing', '--active-folder-line-height',
  '--folder-icon-color-dark', '--folder-icon-color-light', '--folder-icon-opacity', '--folder-icon-size', '--folder-icon-stroke-width',
  '--file-icon-color-dark', '--file-icon-color-light', '--file-icon-opacity', '--file-icon-size', '--file-icon-stroke-width',
  '--active-bg-custom-color-dark', '--active-bg-custom-color-light', '--active-bg-opacity',
  '--active-border-custom-color-dark', '--active-border-custom-color-light', '--active-border-opacity',
  '--active-left-border-width', '--active-right-border-width', '--active-top-border-width', '--active-bottom-border-width',
  '--active-left-border-radius', '--active-right-border-radius', '--active-right-dot-size', '--active-right-dot-offset',
  '--active-text-color-dark', '--active-text-color-light', '--active-text-opacity', '--active-font-size', '--active-font-family', '--active-font-weight',
  '--active-font-style', '--active-text-decoration', '--active-text-transform', '--active-font-variant',
  '--active-letter-spacing', '--active-word-spacing', '--active-line-height',
  '--active-icon-color-dark', '--active-icon-color-light', '--active-icon-opacity', '--active-icon-size', '--active-icon-stroke-width',
  ...Array.from({ length: 10 }, (_, index) => `--folder-color-custom-dark-${index + 1}`),
  ...Array.from({ length: 10 }, (_, index) => `--folder-color-custom-light-${index + 1}`),
  '--background-custom-color-value', '--border-custom-color-value', '--folder-icon-color', '--file-icon-color',
  '--active-bg-custom-color', '--active-border-custom-color', '--active-text-color', '--active-icon-color', '--fcs-icon-stroke-width',
  ...Array.from({ length: 10 }, (_, index) => `--folder-color-custom-${index + 1}`)
];

const DEFAULT_SETTINGS = {
  settingsSchemaVersion: 4,
  palette: 'palette-pink',
  customColorsDark: ['#ff6b9d', '#ff8e72', '#ffc66d', '#e5d66f', '#7ed6a5', '#65d6ce', '#72c7ff', '#8fa7ff', '#b895ff', '#e38cff'],
  customColorsLight: ['#ff6b9d', '#ff8e72', '#ffc66d', '#e5d66f', '#7ed6a5', '#65d6ce', '#72c7ff', '#8fa7ff', '#b895ff', '#e38cff'],

  visualStyle: 'appearance-background',
  backgroundColorMode: 'background-folder-color',
  backgroundCustomColorDark: '#7f6aa8',
  backgroundCustomColorLight: '#7f6aa8',
  backgroundOpacity: 0.75,

  borderColorMode: 'border-folder-color',
  borderCustomColorDark: '#d8d8d8',
  borderCustomColorLight: '#d8d8d8',
  borderOpacity: 1,
  borderLineStyle: 'border-solid',
  showLeftBorder: true,
  leftBorderWidth: 4,
  rightDecoration: 'right-none',
  rightBorderWidth: 4,
  rightDotSize: 7,
  rightDotOffset: 8,
  showTopBorder: false,
  topBorderWidth: 1,
  showBottomBorder: false,
  bottomBorderWidth: 1,
  leftBorderRadius: 8,
  rightBorderRadius: 8,

  inheritColors: false,
  fontSize: 14,
  fontFamily: 'inherit',
  customizeExplorerTypography: false,
  fontWeight: '400',
  fontStyle: 'normal',
  textDecoration: 'none',
  textTransform: 'none',
  fontVariant: 'normal',
  letterSpacing: 0,
  wordSpacing: 0,
  lineHeight: 1.4,
  textColorDark: '#ffffff',
  textColorLight: '#000000',

  activeFolderTypography: false,
  activeFolderTextColorDark: '#ffffff',
  activeFolderTextColorLight: '#000000',
  activeFolderTextOpacity: 1,
  activeFolderFontSize: 14,
  activeFolderFontFamily: 'inherit',
  activeFolderFontWeight: '600',
  activeFolderFontStyle: 'normal',
  activeFolderTextDecoration: 'none',
  activeFolderTextTransform: 'none',
  activeFolderFontVariant: 'normal',
  activeFolderLetterSpacing: 0,
  activeFolderWordSpacing: 0,
  activeFolderLineHeight: 1.4,

  folderIcon: 'folder-icon-folder',
  folderOpenIcon: 'folder-open-icon-same',
  folderIconColorMode: 'icon-colorful',
  folderIconColorDark: '#ffffff',
  folderIconColorLight: '#000000',
  folderIconOpacity: 1,
  folderIconSize: 16,
  folderIconThickness: 1.5,

  showFileIcons: false,
  fileIcon: 'file-icon-file',
  fileIconColorMode: 'file-icon-colorful',
  fileIconColorDark: '#ffffff',
  fileIconColorLight: '#000000',
  fileIconOpacity: 1,
  fileIconSize: 14,
  fileIconThickness: 1.5,

  activeAppearance: 'active-appearance-none',
  activeBackgroundColorMode: 'active-bg-custom-color',
  activeBackgroundColorDark: '#7f6aa8',
  activeBackgroundColorLight: '#7f6aa8',
  activeBackgroundOpacity: 0.35,
  activeBorderColorMode: 'active-border-custom-color',
  activeBorderColorDark: '#ffffff',
  activeBorderColorLight: '#000000',
  activeBorderOpacity: 1,
  activeBorderLineStyle: 'border-solid',
  activeShowLeftBorder: false,
  activeLeftBorderWidth: 4,
  activeRightDecoration: 'active-right-none',
  activeRightBorderWidth: 4,
  activeRightDotSize: 7,
  activeRightDotOffset: 8,
  activeShowTopBorder: false,
  activeTopBorderWidth: 1,
  activeShowBottomBorder: false,
  activeBottomBorderWidth: 1,
  activeLeftBorderRadius: 8,
  activeRightBorderRadius: 8,
  activeFileTypography: true,
  activeTextColorDark: '#ffffff',
  activeTextColorLight: '#000000',
  activeTextOpacity: 1,
  activeFontSize: 14,
  activeFontFamily: 'inherit',
  activeFontWeight: '700',
  activeFontStyle: 'normal',
  activeTextDecoration: 'none',
  activeTextTransform: 'none',
  activeFontVariant: 'normal',
  activeLetterSpacing: 0,
  activeWordSpacing: 0,
  activeLineHeight: 1.4,
  activeShowIcon: false,
  activeIcon: 'active-icon-file',
  activeIconColorMode: 'active-icon-text-color',
  activeIconColorDark: '#ffffff',
  activeIconColorLight: '#000000',
  activeIconOpacity: 1,
  activeIconSize: 14,
  activeIconThickness: 1.5
};

function hexToRgbString(value, fallback = '0,0,0') {
  if (!value || typeof value !== 'string') return fallback;
  let hex = value.trim();
  if (hex.startsWith('#')) hex = hex.slice(1);
  if (hex.length === 3) {
    hex = hex.split('').map((char) => char + char).join('');
  }
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return fallback;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `${r},${g},${b}`;
}

function clampNumber(value, min, max) {
  const n = Number(value);
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function iconNameFromSetting(value) {
  if (!value || value === 'folder-open-icon-same') return null;
  if (value === 'folder-icon-default') return 'chevron-right';
  let name = value
    .replace(/^folder-open-icon-/, '')
    .replace(/^folder-icon-/, '')
    .replace(/^file-icon-/, '')
    .replace(/^active-icon-/, '');

  // Lucide renamed this icon; Obsidian exposes the current Lucide name.
  if (name === 'check-square') name = 'square-check';
  return name;
}

function migrateSettings(saved) {
  const migrated = Object.assign({}, saved || {});

  const legacyPalette = Array.isArray(migrated.customColors) ? migrated.customColors : null;
  const darkPaletteSource = Array.isArray(migrated.customColorsDark)
    ? migrated.customColorsDark
    : (legacyPalette || (Array.isArray(migrated.customColorsLight) ? migrated.customColorsLight : DEFAULT_SETTINGS.customColorsDark));
  const lightPaletteSource = Array.isArray(migrated.customColorsLight)
    ? migrated.customColorsLight
    : (legacyPalette || (Array.isArray(migrated.customColorsDark) ? migrated.customColorsDark : DEFAULT_SETTINGS.customColorsLight));

  migrated.customColorsDark = DEFAULT_SETTINGS.customColorsDark.map((fallback, index) => darkPaletteSource[index] || fallback);
  migrated.customColorsLight = DEFAULT_SETTINGS.customColorsLight.map((fallback, index) => lightPaletteSource[index] || fallback);

  const colorPairs = [
    ['backgroundCustomColor', 'backgroundCustomColorDark', 'backgroundCustomColorLight'],
    ['borderCustomColor', 'borderCustomColorDark', 'borderCustomColorLight'],
    ['folderIconColor', 'folderIconColorDark', 'folderIconColorLight'],
    ['fileIconColor', 'fileIconColorDark', 'fileIconColorLight'],
    ['activeBackgroundColor', 'activeBackgroundColorDark', 'activeBackgroundColorLight'],
    ['activeBorderColor', 'activeBorderColorDark', 'activeBorderColorLight'],
    ['activeTextColor', 'activeTextColorDark', 'activeTextColorLight'],
    ['activeIconColor', 'activeIconColorDark', 'activeIconColorLight'],
  ];

  for (const [legacyKey, darkKey, lightKey] of colorPairs) {
    const legacyValue = migrated[legacyKey];
    if (!migrated[darkKey]) migrated[darkKey] = legacyValue || migrated[lightKey] || DEFAULT_SETTINGS[darkKey];
    if (!migrated[lightKey]) migrated[lightKey] = legacyValue || migrated[darkKey] || DEFAULT_SETTINGS[lightKey];
    delete migrated[legacyKey];
  }

  const schemaVersion = Number(migrated.settingsSchemaVersion || 1);
  if (schemaVersion < 2) {
    const oldIconDark = '#d8d8d8';
    const oldIconLight = '#666666';
    const migrateOldIconDefaults = (darkKey, lightKey) => {
      const dark = String(migrated[darkKey] || '').toLowerCase();
      const light = String(migrated[lightKey] || '').toLowerCase();
      if (dark === oldIconDark && light === oldIconLight) {
        migrated[darkKey] = '#ffffff';
        migrated[lightKey] = '#000000';
      }
    };
    migrateOldIconDefaults('folderIconColorDark', 'folderIconColorLight');
    migrateOldIconDefaults('fileIconColorDark', 'fileIconColorLight');
  }
  migrated.settingsSchemaVersion = 4;

  delete migrated.customColors;
  return migrated;
}

module.exports = class FolderColorSystemPlugin extends Plugin {
  async onload() {
    this._isUnloading = false;
    this._iconRefreshFrame = null;
    this.settings = Object.assign({}, DEFAULT_SETTINGS, migrateSettings(await this.loadData()));

    this.removeInjectedIcons();
    this.clearAppliedSettings();
    document.body.classList.add('folder-color-system-active');
    this.applySettings();
    this.addSettingTab(new FolderColorSystemSettingTab(this.app, this));

    this.iconObserver = new MutationObserver(() => {
      if (!this._isUnloading) this.scheduleIconRefresh();
    });
    this.iconObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
    this.register(() => this.iconObserver?.disconnect());
    this.scheduleIconRefresh();
  }

  onunload() {
    this._isUnloading = true;
    if (this._iconRefreshFrame !== null) {
      cancelAnimationFrame(this._iconRefreshFrame);
      this._iconRefreshFrame = null;
    }
    this.iconObserver?.disconnect();
    this.removeInjectedIcons();
    document.body.classList.remove('folder-color-system-active');
    this.clearAppliedSettings();
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.applySettings();
    this.scheduleIconRefresh();
  }

  clearAppliedSettings() {
    for (const className of CONTROLLED_CLASSES) {
      document.body.classList.remove(className);
    }
    for (const variable of CSS_VARIABLES) {
      document.body.style.removeProperty(variable);
      document.documentElement.style.removeProperty(variable);
    }
  }

  addClass(className) {
    if (className) document.body.classList.add(className);
  }

  setVar(name, value) {
    document.body.style.setProperty(name, value);
    document.documentElement.style.setProperty(name, value);
  }

  scheduleIconRefresh() {
    if (this._isUnloading || !document.body.classList.contains('folder-color-system-active')) return;
    if (this._iconRefreshFrame !== null) return;
    this._iconRefreshFrame = requestAnimationFrame(() => {
      this._iconRefreshFrame = null;
      if (this._isUnloading || !document.body.classList.contains('folder-color-system-active')) {
        this.removeInjectedIcons();
        return;
      }
      this.refreshExplorerIcons();
    });
  }

  setInjectedIcon(container, className, iconName, fallback) {
    if (!container || !iconName) return null;

    // Keep exactly one plugin-owned icon in each host. Using direct children
    // prevents us from accidentally reusing an icon supplied by a theme or
    // another plugin, and also cleans up duplicates left by a hot reload.
    const injected = Array.from(container.querySelectorAll(`:scope > .${className}`));
    let iconEl = injected.shift() || null;
    injected.forEach((duplicate) => duplicate.remove());

    if (!iconEl) {
      iconEl = document.createElement('span');
      iconEl.className = className;
      iconEl.setAttribute('aria-hidden', 'true');
      container.prepend(iconEl);
    }
    if (iconEl.dataset.fcsIcon !== iconName) {
      iconEl.empty?.();
      if (!iconEl.empty) iconEl.replaceChildren();
      try {
        setIcon(iconEl, iconName);
        iconEl.dataset.fcsIcon = iconName;
      } catch (error) {
        iconEl.replaceChildren();
        try {
          setIcon(iconEl, fallback);
          iconEl.dataset.fcsIcon = fallback;
        } catch (_) {
          iconEl.remove();
          return null;
        }
      }
    }
    return iconEl;
  }

  refreshActiveFolderState(explorer) {
    if (!explorer) return;

    const desired = new Set();
    explorer.querySelectorAll('.nav-file-title.is-active').forEach((activeTitle) => {
      let current = activeTitle.closest('.nav-file');
      while (current) {
        const parentFolder = current.parentElement?.closest('.nav-folder');
        if (!parentFolder) break;
        const parentTitle = parentFolder.querySelector(':scope > .nav-folder-title');
        if (parentTitle) desired.add(parentTitle);
        current = parentFolder;
      }
    });

    explorer.querySelectorAll('.nav-folder-title.fcs-active-folder').forEach((title) => {
      if (!desired.has(title)) title.classList.remove('fcs-active-folder');
    });
    desired.forEach((title) => {
      if (!title.classList.contains('fcs-active-folder')) title.classList.add('fcs-active-folder');
    });
  }

  refreshExplorerIcons() {
    if (this._isUnloading || !document.body.classList.contains('folder-color-system-active')) {
      this.removeInjectedIcons();
      return;
    }
    const s = Object.assign({}, DEFAULT_SETTINGS, this.settings || {});
    const explorer = document.querySelector('.workspace-leaf-content[data-type="file-explorer"]');
    if (!explorer) return;

    this.refreshActiveFolderState(explorer);

    explorer.querySelectorAll('.nav-folder').forEach(folder => {
      const title = folder.querySelector(':scope > .nav-folder-title');
      if (!title) return;
      const collapse = title.querySelector(':scope > .collapse-icon, :scope > .nav-folder-collapse-indicator');
      if (!collapse) return;

      const isCollapsed = folder.classList.contains('is-collapsed');
      if (this.getIconicFolderIcon(title)) {
        // Iconic owns the collapse element when it supplies a folder icon.
        // Injecting an SVG into that same host makes the plugins race and can
        // leave duplicate icons behind after a folder is toggled.
        collapse.querySelector(':scope > .fcs-folder-icon')?.remove();
        collapse.classList.remove('fcs-has-custom-icon');
        collapse.classList.add('fcs-uses-iconic-icon');
        title.classList.add('fcs-uses-iconic-icon');
        return;
      }
      collapse.classList.remove('fcs-uses-iconic-icon');
      title.classList.remove('fcs-uses-iconic-icon');
      let settingValue;
      if (isCollapsed) {
        settingValue = s.folderIcon;
      } else if (s.folderOpenIcon && s.folderOpenIcon !== 'folder-open-icon-same') {
        settingValue = s.folderOpenIcon;
      } else {
        settingValue = s.folderIcon;
      }

      const iconName = iconNameFromSetting(settingValue);
      const existing = collapse.querySelector(':scope > .fcs-folder-icon');
      if (!iconName) {
        existing?.remove();
        collapse.classList.remove('fcs-has-custom-icon');
        return;
      }

      const iconEl = this.setInjectedIcon(collapse, 'fcs-folder-icon', iconName, 'folder');
      if (iconEl) collapse.classList.add('fcs-has-custom-icon');
    });

    explorer.querySelectorAll('.nav-file-title').forEach(title => {
      const content = title.querySelector('.nav-file-title-content');
      if (!content) return;
      const isActive = title.classList.contains('is-active');
      const useActive = isActive && s.activeShowIcon;
      const useRegular = s.showFileIcons;
      const existing = content.querySelector(':scope > .fcs-file-icon');

      if (!useActive && !useRegular) {
        existing?.remove();
        content.classList.remove('fcs-has-file-icon');
        return;
      }

      const settingValue = useActive ? s.activeIcon : s.fileIcon;
      const iconName = iconNameFromSetting(settingValue) || 'file';
      const iconEl = this.setInjectedIcon(content, 'fcs-file-icon', iconName, 'file');
      if (!iconEl) {
        content.classList.remove('fcs-has-file-icon');
        return;
      }
      content.classList.add('fcs-has-file-icon');
      iconEl.classList.toggle('fcs-active-icon', useActive);
    });
  }

  getIconicFolderIcon(title) {
    const iconic = this.app.plugins?.getPlugin?.('iconic') || this.app.plugins?.plugins?.iconic;
    const path = title?.dataset?.path;
    const icon = iconic?.settings?.fileIcons?.[path]?.icon;
    return typeof icon === 'string' && icon.length > 0 ? icon : null;
  }

  removeInjectedIcons() {
    document.querySelectorAll('.fcs-folder-icon, .fcs-file-icon').forEach(el => el.remove());
    document.querySelectorAll('.fcs-has-custom-icon').forEach(el => el.classList.remove('fcs-has-custom-icon'));
    document.querySelectorAll('.fcs-uses-iconic-icon').forEach(el => el.classList.remove('fcs-uses-iconic-icon'));
    document.querySelectorAll('.fcs-has-file-icon').forEach(el => el.classList.remove('fcs-has-file-icon'));
    document.querySelectorAll('.fcs-active-folder').forEach(el => el.classList.remove('fcs-active-folder'));
  }

  applySettings() {
    const s = Object.assign({}, DEFAULT_SETTINGS, this.settings || {});

    for (const className of CONTROLLED_CLASSES) {
      document.body.classList.remove(className);
    }

    this.addClass(s.palette);
    this.addClass(s.visualStyle);
    this.addClass(s.backgroundColorMode);
    this.addClass(s.borderColorMode);
    this.addClass(s.borderLineStyle);
    this.addClass(s.rightDecoration);
    this.addClass(s.folderIcon);
    this.addClass(s.folderOpenIcon);
    this.addClass(s.folderIconColorMode);
    this.addClass(s.fileIcon);
    this.addClass(s.fileIconColorMode);
    this.addClass(s.activeAppearance);
    this.addClass(s.activeBackgroundColorMode);
    this.addClass(s.activeBorderColorMode);
    this.addClass(`active-${s.activeBorderLineStyle}`);
    this.addClass(s.activeRightDecoration);
    this.addClass(s.activeIcon);
    this.addClass(s.activeIconColorMode);

    if (s.showLeftBorder) this.addClass('show-left-border');
    if (s.showTopBorder) this.addClass('show-top-border');
    if (s.showBottomBorder) this.addClass('show-bottom-border');
    if (s.inheritColors) this.addClass('inherit-colors');
    if (s.showFileIcons) this.addClass('show-file-icons');
    if (s.customizeExplorerTypography) this.addClass('explorer-typography');
    if (s.activeFolderTypography) this.addClass('active-folder-typography');
    if (s.activeFileTypography) this.addClass('active-file-typography');
    if (s.activeShowLeftBorder) this.addClass('active-show-left-border');
    if (s.activeShowTopBorder) this.addClass('active-show-top-border');
    if (s.activeShowBottomBorder) this.addClass('active-show-bottom-border');
    if (s.activeShowIcon) this.addClass('active-show-icon');

    const customColorsDark = Array.isArray(s.customColorsDark) ? s.customColorsDark : DEFAULT_SETTINGS.customColorsDark;
    const customColorsLight = Array.isArray(s.customColorsLight) ? s.customColorsLight : DEFAULT_SETTINGS.customColorsLight;
    DEFAULT_SETTINGS.customColorsDark.forEach((fallback, index) => {
      this.setVar(`--folder-color-custom-dark-${index + 1}`, hexToRgbString(customColorsDark[index], hexToRgbString(fallback)));
      this.setVar(`--folder-color-custom-light-${index + 1}`, hexToRgbString(customColorsLight[index], hexToRgbString(DEFAULT_SETTINGS.customColorsLight[index])));
    });

    this.setVar('--background-custom-color-dark', hexToRgbString(s.backgroundCustomColorDark, '127,106,168'));
    this.setVar('--background-custom-color-light', hexToRgbString(s.backgroundCustomColorLight, '127,106,168'));
    this.setVar('--background-opacity', String(clampNumber(s.backgroundOpacity, 0, 1)));

    this.setVar('--border-custom-color-dark', hexToRgbString(s.borderCustomColorDark, '216,216,216'));
    this.setVar('--border-custom-color-light', hexToRgbString(s.borderCustomColorLight, '216,216,216'));
    this.setVar('--border-opacity', String(clampNumber(s.borderOpacity, 0, 1)));
    this.setVar('--left-border-width', `${clampNumber(s.leftBorderWidth, 0, 50)}px`);
    this.setVar('--right-border-width', `${clampNumber(s.rightBorderWidth, 0, 50)}px`);
    this.setVar('--top-border-width', `${clampNumber(s.topBorderWidth, 0, 50)}px`);
    this.setVar('--bottom-border-width', `${clampNumber(s.bottomBorderWidth, 0, 50)}px`);
    this.setVar('--left-border-radius', `${clampNumber(s.leftBorderRadius, 0, 100)}px`);
    this.setVar('--right-border-radius', `${clampNumber(s.rightBorderRadius, 0, 100)}px`);
    this.setVar('--right-dot-size', `${clampNumber(s.rightDotSize, 0, 50)}px`);
    this.setVar('--right-dot-offset', `${clampNumber(s.rightDotOffset, 0, 100)}px`);

    this.setVar('--font-size', `${clampNumber(s.fontSize, 6, 60)}px`);
    this.setVar('--font-family', s.fontFamily || 'inherit');
    this.setVar('--font-weight', s.fontWeight || '400');
    this.setVar('--font-style', s.fontStyle || 'normal');
    this.setVar('--text-decoration', s.textDecoration || 'none');
    this.setVar('--text-transform', s.textTransform || 'none');
    this.setVar('--font-variant', s.fontVariant || 'normal');
    this.setVar('--letter-spacing', `${clampNumber(s.letterSpacing, -5, 20)}px`);
    this.setVar('--word-spacing', `${clampNumber(s.wordSpacing, -10, 40)}px`);
    this.setVar('--line-height', String(clampNumber(s.lineHeight, 0.7, 3)));
    this.setVar('--text-color-dark', s.textColorDark || '#ffffff');
    this.setVar('--text-color-light', s.textColorLight || '#000000');

    this.setVar('--active-folder-text-color-dark', hexToRgbString(s.activeFolderTextColorDark, '255,255,255'));
    this.setVar('--active-folder-text-color-light', hexToRgbString(s.activeFolderTextColorLight, '0,0,0'));
    this.setVar('--active-folder-text-opacity', String(clampNumber(s.activeFolderTextOpacity, 0, 1)));
    this.setVar('--active-folder-font-size', `${clampNumber(s.activeFolderFontSize, 6, 60)}px`);
    this.setVar('--active-folder-font-family', s.activeFolderFontFamily || 'inherit');
    this.setVar('--active-folder-font-weight', s.activeFolderFontWeight || '600');
    this.setVar('--active-folder-font-style', s.activeFolderFontStyle || 'normal');
    this.setVar('--active-folder-text-decoration', s.activeFolderTextDecoration || 'none');
    this.setVar('--active-folder-text-transform', s.activeFolderTextTransform || 'none');
    this.setVar('--active-folder-font-variant', s.activeFolderFontVariant || 'normal');
    this.setVar('--active-folder-letter-spacing', `${clampNumber(s.activeFolderLetterSpacing, -5, 20)}px`);
    this.setVar('--active-folder-word-spacing', `${clampNumber(s.activeFolderWordSpacing, -10, 40)}px`);
    this.setVar('--active-folder-line-height', String(clampNumber(s.activeFolderLineHeight, 0.7, 3)));

    this.setVar('--folder-icon-color-dark', hexToRgbString(s.folderIconColorDark, '255,255,255'));
    this.setVar('--folder-icon-color-light', hexToRgbString(s.folderIconColorLight, '0,0,0'));
    this.setVar('--folder-icon-opacity', String(clampNumber(s.folderIconOpacity, 0, 1)));
    this.setVar('--folder-icon-size', `${clampNumber(s.folderIconSize, 4, 80)}px`);
    this.setVar('--folder-icon-stroke-width', String(clampNumber(s.folderIconThickness, 0.5, 4)));

    this.setVar('--file-icon-color-dark', hexToRgbString(s.fileIconColorDark, '255,255,255'));
    this.setVar('--file-icon-color-light', hexToRgbString(s.fileIconColorLight, '0,0,0'));
    this.setVar('--file-icon-opacity', String(clampNumber(s.fileIconOpacity, 0, 1)));
    this.setVar('--file-icon-size', `${clampNumber(s.fileIconSize, 4, 80)}px`);
    this.setVar('--file-icon-stroke-width', String(clampNumber(s.fileIconThickness, 0.5, 4)));

    this.setVar('--active-bg-custom-color-dark', hexToRgbString(s.activeBackgroundColorDark, '127,106,168'));
    this.setVar('--active-bg-custom-color-light', hexToRgbString(s.activeBackgroundColorLight, '127,106,168'));
    this.setVar('--active-bg-opacity', String(clampNumber(s.activeBackgroundOpacity, 0, 1)));
    this.setVar('--active-border-custom-color-dark', hexToRgbString(s.activeBorderColorDark, '255,255,255'));
    this.setVar('--active-border-custom-color-light', hexToRgbString(s.activeBorderColorLight, '0,0,0'));
    this.setVar('--active-border-opacity', String(clampNumber(s.activeBorderOpacity, 0, 1)));
    this.setVar('--active-left-border-width', `${clampNumber(s.activeLeftBorderWidth, 0, 50)}px`);
    this.setVar('--active-right-border-width', `${clampNumber(s.activeRightBorderWidth, 0, 50)}px`);
    this.setVar('--active-top-border-width', `${clampNumber(s.activeTopBorderWidth, 0, 50)}px`);
    this.setVar('--active-bottom-border-width', `${clampNumber(s.activeBottomBorderWidth, 0, 50)}px`);
    this.setVar('--active-left-border-radius', `${clampNumber(s.activeLeftBorderRadius, 0, 100)}px`);
    this.setVar('--active-right-border-radius', `${clampNumber(s.activeRightBorderRadius, 0, 100)}px`);
    this.setVar('--active-right-dot-size', `${clampNumber(s.activeRightDotSize, 1, 50)}px`);
    this.setVar('--active-right-dot-offset', `${clampNumber(s.activeRightDotOffset, 0, 100)}px`);
    this.setVar('--active-text-color-dark', hexToRgbString(s.activeTextColorDark, '255,255,255'));
    this.setVar('--active-text-color-light', hexToRgbString(s.activeTextColorLight, '0,0,0'));
    this.setVar('--active-text-opacity', String(clampNumber(s.activeTextOpacity, 0, 1)));
    this.setVar('--active-font-size', `${clampNumber(s.activeFontSize, 6, 60)}px`);
    this.setVar('--active-font-family', s.activeFontFamily || 'inherit');
    this.setVar('--active-font-weight', String(s.activeFontWeight || '700'));
    this.setVar('--active-font-style', s.activeFontStyle || 'normal');
    this.setVar('--active-text-decoration', s.activeTextDecoration || 'none');
    this.setVar('--active-text-transform', s.activeTextTransform || 'none');
    this.setVar('--active-font-variant', s.activeFontVariant || 'normal');
    this.setVar('--active-letter-spacing', `${clampNumber(s.activeLetterSpacing, -5, 20)}px`);
    this.setVar('--active-word-spacing', `${clampNumber(s.activeWordSpacing, -10, 40)}px`);
    this.setVar('--active-line-height', String(clampNumber(s.activeLineHeight, 0.7, 3)));
    this.setVar('--active-icon-color-dark', hexToRgbString(s.activeIconColorDark, '255,255,255'));
    this.setVar('--active-icon-color-light', hexToRgbString(s.activeIconColorLight, '0,0,0'));
    this.setVar('--active-icon-opacity', String(clampNumber(s.activeIconOpacity, 0, 1)));
    this.setVar('--active-icon-size', `${clampNumber(s.activeIconSize, 4, 80)}px`);
    this.setVar('--active-icon-stroke-width', String(clampNumber(s.activeIconThickness, 0.5, 4)));
  }
};

class FolderColorSystemSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  getSettingDefinitions() {
    const self = this;
    const s = () => self.plugin.settings;
    const is = (key, value) => () => self.getValue(key) === value;
    const oneOf = (key, values) => () => values.includes(self.getValue(key));
    const enabled = (key) => () => Boolean(self.getValue(key));

    return [
      {
        type: 'group',
        heading: 'Support & Links',
        items: [{
          name: 'Support & links',
          searchable: false,
          render: (setting) => {
            setting.settingEl.addClass('folder-color-support-row');
            setting.nameEl.remove();
            setting.descEl.remove();
            setting.controlEl.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;padding:4px 0;justify-content:flex-start;width:100%';
            [
              { text: '☕ Buy Me a Coffee', href: 'https://buymeacoffee.com/erinskidds', cls: 'support-link coffee-link' },
              { text: '⭐ Star on GitHub', href: 'https://github.com/DudeThatsErin/FolderColor', cls: 'support-link github-link' },
              { text: '🐛 Report Issues', href: 'https://github.com/DudeThatsErin/FolderColor/issues', cls: 'support-link issues-link' },
              { text: '💬 Discord Support', href: 'https://discord.gg/XcJWhE3SEA', cls: 'support-link discord-link' },
            ].forEach(({ text, href, cls }) => {
              const a = setting.controlEl.createEl('a', { text, href });
              a.className = cls;
              a.target = '_blank';
              a.rel = 'noopener noreferrer';
            });
          },
        }],
      },
      {
        type: 'group',
        heading: 'Palette',
        items: [
          self.dropdownDef('Color Palette', 'Select the 10-color repeating palette.', 'palette', PALETTE_OPTIONS, ['palette', 'colors'], true),
          ...Array.from({ length: 10 }, (_, i) => [
            self.colorDef(
              `Custom Palette Color ${i + 1} (Dark Mode)`,
              '',
              `customColorsDark.${i}`,
              [`palette color ${i + 1}`, 'custom palette', 'dark mode palette'],
              is('palette', 'palette-custom')
            ),
            self.colorDef(
              `Custom Palette Color ${i + 1} (Light Mode)`,
              '',
              `customColorsLight.${i}`,
              [`palette color ${i + 1}`, 'custom palette', 'light mode palette'],
              is('palette', 'palette-custom')
            ),
          ]).flat(),
        ],
      },
      {
        type: 'group',
        heading: 'Rows',
        items: [
          self.dropdownDef('Row Style', 'Choose background, borders, both, or no row decoration.', 'visualStyle', VISUAL_STYLE_OPTIONS, ['appearance', 'row appearance']),
          self.toggleDef('Inherit Parent Folder Color', 'Nested folders and files inherit their top-level branch color at any depth.', 'inheritColors', ['inherit color', 'recursive color']),
          self.sliderDef('File Explorer Font Size', '', 'fontSize', 6, 32, 1, 'px', ['font size', 'explorer text size']),
          self.textDef('File Explorer Font Family', 'Any CSS font-family value. Use inherit to follow your theme.', 'fontFamily', ['font family', 'explorer font']),
          self.toggleDef('Customize File Explorer Typography', 'Enable advanced font styling for normal file and folder rows.', 'customizeExplorerTypography', ['font styling', 'explorer typography'], true),
          self.dropdownDef('File Explorer Font Weight', '', 'fontWeight', FONT_WEIGHT_OPTIONS, ['font thickness', 'font weight', 'bold'], false, enabled('customizeExplorerTypography')),
          self.dropdownDef('File Explorer Font Style', '', 'fontStyle', FONT_STYLE_OPTIONS, ['italic', 'oblique'], false, enabled('customizeExplorerTypography')),
          self.dropdownDef('File Explorer Text Decoration', '', 'textDecoration', TEXT_DECORATION_OPTIONS, ['underline', 'line through', 'overline'], false, enabled('customizeExplorerTypography')),
          self.dropdownDef('File Explorer Text Transform', '', 'textTransform', TEXT_TRANSFORM_OPTIONS, ['uppercase', 'lowercase', 'capitalize'], false, enabled('customizeExplorerTypography')),
          self.dropdownDef('File Explorer Font Variant', '', 'fontVariant', FONT_VARIANT_OPTIONS, ['small caps', 'font variant'], false, enabled('customizeExplorerTypography')),
          self.sliderDef('File Explorer Letter Spacing', '', 'letterSpacing', -2, 10, 0.1, 'px', ['tracking', 'letter spacing'], enabled('customizeExplorerTypography')),
          self.sliderDef('File Explorer Word Spacing', '', 'wordSpacing', -5, 20, 0.1, 'px', ['word spacing'], enabled('customizeExplorerTypography')),
          self.sliderDef('File Explorer Line Height', '', 'lineHeight', 0.8, 2.5, 0.05, '', ['line height', 'row text height'], enabled('customizeExplorerTypography')),
          self.colorDef('File Explorer Text Color (Dark Mode)', '', 'textColorDark', ['dark text color', 'dark mode text']),
          self.colorDef('File Explorer Text Color (Light Mode)', '', 'textColorLight', ['light text color', 'light mode text']),
        ],
      },
      {
        type: 'group',
        heading: 'Background',
        items: [
          self.dropdownDef('Background Color', '', 'backgroundColorMode', COLOR_MODE_OPTIONS, ['row background color'], true),
          self.colorDef('Custom Background Color (Dark Mode)', '', 'backgroundCustomColorDark', ['background custom color', 'dark mode background'], is('backgroundColorMode', 'background-custom-color')),
          self.colorDef('Custom Background Color (Light Mode)', '', 'backgroundCustomColorLight', ['background custom color', 'light mode background'], is('backgroundColorMode', 'background-custom-color')),
          self.sliderDef('Background Opacity', '', 'backgroundOpacity', 0, 1, 0.01, '', ['background transparency']),
        ],
      },
      {
        type: 'group',
        heading: 'Borders and right-side marker',
        items: [
          self.dropdownDef('Border Color', '', 'borderColorMode', BORDER_COLOR_MODE_OPTIONS, ['row border color'], true),
          self.colorDef('Custom Border Color (Dark Mode)', '', 'borderCustomColorDark', ['border custom color', 'dark mode border'], is('borderColorMode', 'border-custom-color')),
          self.colorDef('Custom Border Color (Light Mode)', '', 'borderCustomColorLight', ['border custom color', 'light mode border'], is('borderColorMode', 'border-custom-color')),
          self.sliderDef('Border Opacity', '', 'borderOpacity', 0, 1, 0.01, '', ['border transparency']),
          self.dropdownDef('Border Line Style', '', 'borderLineStyle', BORDER_STYLE_OPTIONS, ['border style', 'solid dashed dotted double']),
          self.toggleDef('Show Left Border', '', 'showLeftBorder', ['left border']),
          self.sliderDef('Left Border Width', '', 'leftBorderWidth', 0, 20, 1, 'px', ['left border size']),
          self.dropdownDef('Right Side', 'Hide it, draw a border, or show a dot.', 'rightDecoration', RIGHT_DECORATION_OPTIONS, ['right border', 'right dot', 'right marker'], true),
          self.sliderDef('Right Border Width', '', 'rightBorderWidth', 0, 20, 1, 'px', ['right border size'], is('rightDecoration', 'right-border')),
          self.sliderDef('Right Dot Size', '', 'rightDotSize', 1, 30, 1, 'px', ['right marker size'], is('rightDecoration', 'right-dot')),
          self.sliderDef('Right Dot Inset', '', 'rightDotOffset', 0, 40, 1, 'px', ['right dot offset', 'right marker inset'], is('rightDecoration', 'right-dot')),
          self.toggleDef('Show Top Border', '', 'showTopBorder', ['top border']),
          self.sliderDef('Top Border Width', '', 'topBorderWidth', 0, 20, 1, 'px', ['top border size']),
          self.toggleDef('Show Bottom Border', '', 'showBottomBorder', ['bottom border']),
          self.sliderDef('Bottom Border Width', '', 'bottomBorderWidth', 0, 20, 1, 'px', ['bottom border size']),
          self.sliderDef('Left Side Roundness', 'Controls top-left and bottom-left corners.', 'leftBorderRadius', 0, 40, 1, 'px', ['left radius', 'left corners']),
          self.sliderDef('Right Side Roundness', 'Controls top-right and bottom-right corners.', 'rightBorderRadius', 0, 40, 1, 'px', ['right radius', 'right corners']),
        ],
      },
      {
        type: 'group',
        heading: 'Folder icons',
        items: [
          self.dropdownDef('Closed Folder Icon', 'Icon shown when a folder is closed. Default Arrow is a single right-pointing chevron.', 'folderIcon', ICON_OPTIONS, ['folder icon', 'closed icon']),
          self.dropdownDef('Open Folder Icon', 'Choose a different icon for open folders, or keep the closed-folder icon.', 'folderOpenIcon', OPEN_ICON_OPTIONS, ['open icon', 'expanded folder icon']),
          self.dropdownDef('Folder Icon Color', 'Match Palette Color follows the palette color assigned to each folder row. Choose Custom Color to use the colors below.', 'folderIconColorMode', ICON_COLOR_OPTIONS, ['folder icon color'], true),
          self.colorDef('Folder Icon Custom Color (Dark Mode)', 'Used when Folder Icon Color is set to Custom Color.', 'folderIconColorDark', ['folder icon custom color', 'dark mode folder icon'], is('folderIconColorMode', 'icon-custom-color')),
          self.colorDef('Folder Icon Custom Color (Light Mode)', 'Used when Folder Icon Color is set to Custom Color.', 'folderIconColorLight', ['folder icon custom color', 'light mode folder icon'], is('folderIconColorMode', 'icon-custom-color')),
          self.sliderDef('Folder Icon Opacity', '', 'folderIconOpacity', 0, 1, 0.01, '', ['folder icon transparency']),
          self.sliderDef('Folder Icon Thickness', 'Controls the Lucide stroke width independently from file icons.', 'folderIconThickness', 0.5, 4, 0.1, '', ['folder icon stroke', 'folder icon line width']),
          self.sliderDef('Folder Icon Size', '', 'folderIconSize', 8, 40, 1, 'px', ['folder icon scale']),
        ],
      },
      {
        type: 'group',
        heading: 'File icons',
        items: [
          self.toggleDef('Show File Icons', 'Adds a Lucide-style icon to every file row.', 'showFileIcons', ['file icons', 'show icons']),
          self.dropdownDef('File Icon', '', 'fileIcon', FILE_ICON_OPTIONS, ['file icon shape']),
          self.dropdownDef('File Icon Color', 'Match Palette Color follows the palette color assigned to each file row. Choose Custom Color to use the colors below.', 'fileIconColorMode', FILE_ICON_COLOR_OPTIONS, ['file icon color'], true),
          self.colorDef('File Icon Custom Color (Dark Mode)', 'Used when File Icon Color is set to Custom Color.', 'fileIconColorDark', ['file icon custom color', 'dark mode file icon'], is('fileIconColorMode', 'file-icon-custom-color')),
          self.colorDef('File Icon Custom Color (Light Mode)', 'Used when File Icon Color is set to Custom Color.', 'fileIconColorLight', ['file icon custom color', 'light mode file icon'], is('fileIconColorMode', 'file-icon-custom-color')),
          self.sliderDef('File Icon Opacity', '', 'fileIconOpacity', 0, 1, 0.01, '', ['file icon transparency']),
          self.sliderDef('File Icon Thickness', 'Controls the Lucide stroke width independently from folder icons.', 'fileIconThickness', 0.5, 4, 0.1, '', ['file icon stroke', 'file icon line width']),
          self.sliderDef('File Icon Size', '', 'fileIconSize', 8, 40, 1, 'px', ['file icon scale']),
        ],
      },
      {
        type: 'group',
        heading: 'Active folder',
        items: [
          self.toggleDef('Customize Active Folder Typography', 'Styles every folder in the active file’s folder path.', 'activeFolderTypography', ['active folder font', 'current folder typography'], true),
          self.colorDef('Active Folder Text Color (Dark Mode)', '', 'activeFolderTextColorDark', ['active folder text color', 'dark mode folder text'], enabled('activeFolderTypography')),
          self.colorDef('Active Folder Text Color (Light Mode)', '', 'activeFolderTextColorLight', ['active folder text color', 'light mode folder text'], enabled('activeFolderTypography')),
          self.sliderDef('Active Folder Text Opacity', '', 'activeFolderTextOpacity', 0, 1, 0.01, '', ['active folder transparency'], enabled('activeFolderTypography')),
          self.sliderDef('Active Folder Font Size', '', 'activeFolderFontSize', 6, 40, 1, 'px', ['active folder font size'], enabled('activeFolderTypography')),
          self.textDef('Active Folder Font Family', 'Any CSS font-family value. Use inherit to follow the File Explorer font.', 'activeFolderFontFamily', ['active folder font family'], enabled('activeFolderTypography')),
          self.dropdownDef('Active Folder Font Weight', '', 'activeFolderFontWeight', FONT_WEIGHT_OPTIONS, ['active folder font thickness', 'active folder bold'], false, enabled('activeFolderTypography')),
          self.dropdownDef('Active Folder Font Style', '', 'activeFolderFontStyle', FONT_STYLE_OPTIONS, ['active folder italic', 'active folder oblique'], false, enabled('activeFolderTypography')),
          self.dropdownDef('Active Folder Text Decoration', '', 'activeFolderTextDecoration', TEXT_DECORATION_OPTIONS, ['active folder underline', 'active folder strike'], false, enabled('activeFolderTypography')),
          self.dropdownDef('Active Folder Text Transform', '', 'activeFolderTextTransform', TEXT_TRANSFORM_OPTIONS, ['active folder uppercase', 'active folder capitalize'], false, enabled('activeFolderTypography')),
          self.dropdownDef('Active Folder Font Variant', '', 'activeFolderFontVariant', FONT_VARIANT_OPTIONS, ['active folder small caps'], false, enabled('activeFolderTypography')),
          self.sliderDef('Active Folder Letter Spacing', '', 'activeFolderLetterSpacing', -2, 10, 0.1, 'px', ['active folder tracking'], enabled('activeFolderTypography')),
          self.sliderDef('Active Folder Word Spacing', '', 'activeFolderWordSpacing', -5, 20, 0.1, 'px', ['active folder word spacing'], enabled('activeFolderTypography')),
          self.sliderDef('Active Folder Line Height', '', 'activeFolderLineHeight', 0.8, 2.5, 0.05, '', ['active folder line height'], enabled('activeFolderTypography')),
        ],
      },
      {
        type: 'group',
        heading: 'Active file',
        items: [
          self.dropdownDef('Active File Style', 'Choose a dedicated background/border treatment for the active file.', 'activeAppearance', ACTIVE_APPEARANCE_OPTIONS, ['selected file style', 'current file appearance'], true),
          self.dropdownDef('Active Background Color', '', 'activeBackgroundColorMode', ACTIVE_BG_COLOR_OPTIONS, ['selected background color'], true, oneOf('activeAppearance', ['active-appearance-background', 'active-appearance-both'])),
          self.colorDef('Custom Active Background Color (Dark Mode)', '', 'activeBackgroundColorDark', ['selected custom background', 'dark mode active background'], () => oneOf('activeAppearance', ['active-appearance-background', 'active-appearance-both'])() && is('activeBackgroundColorMode', 'active-bg-custom-color')()),
          self.colorDef('Custom Active Background Color (Light Mode)', '', 'activeBackgroundColorLight', ['selected custom background', 'light mode active background'], () => oneOf('activeAppearance', ['active-appearance-background', 'active-appearance-both'])() && is('activeBackgroundColorMode', 'active-bg-custom-color')()),
          self.sliderDef('Active Background Opacity', '', 'activeBackgroundOpacity', 0, 1, 0.01, '', ['selected background transparency'], oneOf('activeAppearance', ['active-appearance-background', 'active-appearance-both'])),
          self.dropdownDef('Active Border Color', '', 'activeBorderColorMode', ACTIVE_BORDER_COLOR_OPTIONS, ['selected border color'], true, oneOf('activeAppearance', ['active-appearance-border', 'active-appearance-both'])),
          self.colorDef('Custom Active Border Color (Dark Mode)', '', 'activeBorderColorDark', ['selected custom border', 'dark mode active border'], () => oneOf('activeAppearance', ['active-appearance-border', 'active-appearance-both'])() && is('activeBorderColorMode', 'active-border-custom-color')()),
          self.colorDef('Custom Active Border Color (Light Mode)', '', 'activeBorderColorLight', ['selected custom border', 'light mode active border'], () => oneOf('activeAppearance', ['active-appearance-border', 'active-appearance-both'])() && is('activeBorderColorMode', 'active-border-custom-color')()),
          self.sliderDef('Active Border Opacity', '', 'activeBorderOpacity', 0, 1, 0.01, '', ['selected border transparency'], oneOf('activeAppearance', ['active-appearance-border', 'active-appearance-both'])),
          self.dropdownDef('Active Border Line Style', '', 'activeBorderLineStyle', BORDER_STYLE_OPTIONS, ['selected border style'], false, oneOf('activeAppearance', ['active-appearance-border', 'active-appearance-both'])),
          self.toggleDef('Active Left Border', '', 'activeShowLeftBorder', ['selected left border'], true, oneOf('activeAppearance', ['active-appearance-border', 'active-appearance-both'])),
          self.sliderDef('Active Left Border Width', '', 'activeLeftBorderWidth', 0, 20, 1, 'px', ['selected left border size'], () => oneOf('activeAppearance', ['active-appearance-border', 'active-appearance-both'])() && enabled('activeShowLeftBorder')()),
          self.dropdownDef('Active Right Side', 'Hide it, draw a border, or show a dot.', 'activeRightDecoration', ACTIVE_RIGHT_DECORATION_OPTIONS, ['selected right border', 'selected right dot'], true, oneOf('activeAppearance', ['active-appearance-border', 'active-appearance-both'])),
          self.sliderDef('Active Right Border Width', '', 'activeRightBorderWidth', 0, 20, 1, 'px', ['selected right border size'], () => oneOf('activeAppearance', ['active-appearance-border', 'active-appearance-both'])() && is('activeRightDecoration', 'active-right-border')()),
          self.sliderDef('Active Right Dot Size', '', 'activeRightDotSize', 1, 30, 1, 'px', ['selected right marker size'], () => oneOf('activeAppearance', ['active-appearance-border', 'active-appearance-both'])() && is('activeRightDecoration', 'active-right-dot')()),
          self.sliderDef('Active Right Dot Inset', '', 'activeRightDotOffset', 0, 40, 1, 'px', ['selected right dot offset'], () => oneOf('activeAppearance', ['active-appearance-border', 'active-appearance-both'])() && is('activeRightDecoration', 'active-right-dot')()),
          self.toggleDef('Active Top Border', '', 'activeShowTopBorder', ['selected top border'], true, oneOf('activeAppearance', ['active-appearance-border', 'active-appearance-both'])),
          self.sliderDef('Active Top Border Width', '', 'activeTopBorderWidth', 0, 20, 1, 'px', ['selected top border size'], () => oneOf('activeAppearance', ['active-appearance-border', 'active-appearance-both'])() && enabled('activeShowTopBorder')()),
          self.toggleDef('Active Bottom Border', '', 'activeShowBottomBorder', ['selected bottom border'], true, oneOf('activeAppearance', ['active-appearance-border', 'active-appearance-both'])),
          self.sliderDef('Active Bottom Border Width', '', 'activeBottomBorderWidth', 0, 20, 1, 'px', ['selected bottom border size'], () => oneOf('activeAppearance', ['active-appearance-border', 'active-appearance-both'])() && enabled('activeShowBottomBorder')()),
          self.sliderDef('Active Left Side Roundness', 'Controls the active row top-left and bottom-left corners.', 'activeLeftBorderRadius', 0, 40, 1, 'px', ['selected left radius']),
          self.sliderDef('Active Right Side Roundness', 'Controls the active row top-right and bottom-right corners.', 'activeRightBorderRadius', 0, 40, 1, 'px', ['selected right radius']),
          self.toggleDef('Customize Active File Typography', 'Apply dedicated font and text styling to the current active file.', 'activeFileTypography', ['selected file font', 'current file typography'], true),
          self.colorDef('Active Text Color (Dark Mode)', '', 'activeTextColorDark', ['selected text color', 'current file text color', 'dark mode active text'], enabled('activeFileTypography')),
          self.colorDef('Active Text Color (Light Mode)', '', 'activeTextColorLight', ['selected text color', 'current file text color', 'light mode active text'], enabled('activeFileTypography')),
          self.sliderDef('Active Text Opacity', '', 'activeTextOpacity', 0, 1, 0.01, '', ['selected text transparency'], enabled('activeFileTypography')),
          self.sliderDef('Active Font Size', '', 'activeFontSize', 6, 40, 1, 'px', ['selected font size'], enabled('activeFileTypography')),
          self.textDef('Active Font Family', 'Any CSS font-family value. Use inherit to follow the normal File Explorer font.', 'activeFontFamily', ['selected font family'], enabled('activeFileTypography')),
          self.dropdownDef('Active Font Weight', '', 'activeFontWeight', FONT_WEIGHT_OPTIONS, ['selected font weight', 'bold'], false, enabled('activeFileTypography')),
          self.dropdownDef('Active Font Style', '', 'activeFontStyle', FONT_STYLE_OPTIONS, ['selected italic oblique'], false, enabled('activeFileTypography')),
          self.dropdownDef('Active Text Decoration', '', 'activeTextDecoration', TEXT_DECORATION_OPTIONS, ['selected underline strike'], false, enabled('activeFileTypography')),
          self.dropdownDef('Active Text Transform', '', 'activeTextTransform', TEXT_TRANSFORM_OPTIONS, ['selected uppercase lowercase capitalize'], false, enabled('activeFileTypography')),
          self.dropdownDef('Active Font Variant', '', 'activeFontVariant', FONT_VARIANT_OPTIONS, ['selected small caps', 'font variant'], false, enabled('activeFileTypography')),
          self.sliderDef('Active Letter Spacing', '', 'activeLetterSpacing', -2, 10, 0.1, 'px', ['selected letter spacing'], enabled('activeFileTypography')),
          self.sliderDef('Active Word Spacing', '', 'activeWordSpacing', -5, 20, 0.1, 'px', ['selected word spacing'], enabled('activeFileTypography')),
          self.sliderDef('Active Line Height', '', 'activeLineHeight', 0.8, 2.5, 0.05, '', ['selected line height'], enabled('activeFileTypography')),
          self.toggleDef('Custom Active File Icon', 'Use a dedicated icon for the active file, even when regular file icons are disabled.', 'activeShowIcon', ['selected icon', 'current file icon'], true),
          self.dropdownDef('Active File Icon', '', 'activeIcon', ACTIVE_ICON_OPTIONS, ['selected file icon'], false, enabled('activeShowIcon')),
          self.dropdownDef('Active Icon Color', '', 'activeIconColorMode', ACTIVE_ICON_COLOR_OPTIONS, ['selected icon color'], true, enabled('activeShowIcon')),
          self.colorDef('Custom Active Icon Color (Dark Mode)', '', 'activeIconColorDark', ['selected custom icon color', 'dark mode active icon'], () => enabled('activeShowIcon')() && is('activeIconColorMode', 'active-icon-custom-color')()),
          self.colorDef('Custom Active Icon Color (Light Mode)', '', 'activeIconColorLight', ['selected custom icon color', 'light mode active icon'], () => enabled('activeShowIcon')() && is('activeIconColorMode', 'active-icon-custom-color')()),
          self.sliderDef('Active Icon Opacity', '', 'activeIconOpacity', 0, 1, 0.01, '', ['selected icon transparency'], enabled('activeShowIcon')),
          self.sliderDef('Active Icon Thickness', 'Controls the Lucide stroke width for the dedicated active-file icon.', 'activeIconThickness', 0.5, 4, 0.1, '', ['selected icon stroke', 'active icon line width'], enabled('activeShowIcon')),
          self.sliderDef('Active Icon Size', '', 'activeIconSize', 8, 40, 1, 'px', ['selected icon scale'], enabled('activeShowIcon')),
        ],
      },
      {
        type: 'group',
        heading: 'Reset',
        items: [{
          name: 'Reset all settings',
          desc: 'Restore every Folder Color System setting to its default value.',
          aliases: ['defaults', 'reset everything'],
          render: (setting) => {
            setting.addButton((button) => {
              button
                .setButtonText('Reset')
                .setWarning()
                .onClick(async () => {
                  self.plugin.settings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
                  await self.plugin.saveSettings();
                  self.refreshSettingsDom();
                });
            });
          },
        }],
      },
    ];
  }

  refreshSettingsDom() {
    if (typeof this.refreshDomState === 'function') {
      this.refreshDomState();
      return;
    }
    if (typeof this.update === 'function') {
      this.update();
    }
  }

  addResetButton(setting, key) {
    setting.addExtraButton((button) => {
      button
        .setIcon('rotate-ccw')
        .setTooltip(`Reset ${setting.nameEl?.textContent || 'setting'} to default`)
        .onClick(async () => {
          this.setValue(key, this.getDefault(key));
          await this.plugin.saveSettings();
          this.refreshSettingsDom();
        });
    });
    return setting;
  }

  dropdownDef(name, desc, key, options, aliases = [], refreshOnChange = false, visible) {
    return {
      name,
      desc,
      aliases,
      ...(visible ? { visible } : {}),
      render: (setting) => {
        setting.addDropdown((dropdown) => {
          for (const [value, label] of options) dropdown.addOption(value, label);
          dropdown.setValue(String(this.getValue(key)));
          dropdown.onChange(async (value) => {
            this.setValue(key, value);
            await this.plugin.saveSettings();
            if (refreshOnChange) this.refreshSettingsDom();
          });
        });
        this.addResetButton(setting, key);
      },
    };
  }

  toggleDef(name, desc, key, aliases = [], refreshOnChange = false, visible) {
    return {
      name,
      desc,
      aliases,
      ...(visible ? { visible } : {}),
      render: (setting) => {
        setting.addToggle((toggle) => {
          toggle.setValue(Boolean(this.getValue(key)));
          toggle.onChange(async (value) => {
            this.setValue(key, value);
            await this.plugin.saveSettings();
            if (refreshOnChange) this.refreshSettingsDom();
          });
        });
        this.addResetButton(setting, key);
      },
    };
  }

  sliderDef(name, desc, key, min, max, step, suffix, aliases = [], visible) {
    return {
      name,
      desc,
      aliases,
      ...(visible ? { visible } : {}),
      render: (setting) => {
        let valueEl;
        setting.addSlider((slider) => {
          slider
            .setLimits(min, max, step)
            .setValue(Number(this.getValue(key)))
            .setDynamicTooltip()
            .onChange(async (value) => {
              const rounded = step < 1 ? Number(value.toFixed(2)) : Math.round(value);
              this.setValue(key, rounded);
              if (valueEl) valueEl.setText(`${rounded}${suffix || ''}`);
              await this.plugin.saveSettings();
            });
        });
        valueEl = setting.controlEl.createSpan({
          cls: 'fcs-setting-value',
          text: `${this.getValue(key)}${suffix || ''}`,
        });
        this.addResetButton(setting, key);
      },
    };
  }

  textDef(name, desc, key, aliases = [], visible) {
    return {
      name,
      desc,
      aliases,
      ...(visible ? { visible } : {}),
      render: (setting) => {
        setting.addText((text) => {
          text.setValue(String(this.getValue(key) ?? ''));
          text.onChange(async (value) => {
            this.setValue(key, value || this.getDefault(key));
            await this.plugin.saveSettings();
          });
        });
        this.addResetButton(setting, key);
      },
    };
  }

  colorDef(name, desc, key, aliases = [], visible) {
    return {
      name,
      desc,
      aliases,
      ...(visible ? { visible } : {}),
      render: (setting) => {
        setting.addColorPicker((picker) => {
          picker.setValue(this.getValue(key) || this.getDefault(key));
          picker.onChange(async (value) => {
            this.setValue(key, value);
            await this.plugin.saveSettings();
          });
        });
        this.addResetButton(setting, key);
      },
    };
  }

  getPalettePath(path) {
    const match = /^(customColorsDark|customColorsLight)\.(\d+)$/.exec(path);
    if (!match) return null;
    return { key: match[1], index: Number(match[2]) };
  }

  getValue(path) {
    const palettePath = this.getPalettePath(path);
    if (palettePath) {
      const { key, index } = palettePath;
      return this.plugin.settings[key]?.[index] ?? DEFAULT_SETTINGS[key][index];
    }
    return this.plugin.settings[path] ?? DEFAULT_SETTINGS[path];
  }

  setValue(path, value) {
    const palettePath = this.getPalettePath(path);
    if (palettePath) {
      const { key, index } = palettePath;
      if (!Array.isArray(this.plugin.settings[key])) {
        this.plugin.settings[key] = [...DEFAULT_SETTINGS[key]];
      }
      this.plugin.settings[key][index] = value;
      return;
    }
    this.plugin.settings[path] = value;
  }

  getDefault(path) {
    const palettePath = this.getPalettePath(path);
    if (palettePath) {
      const { key, index } = palettePath;
      return DEFAULT_SETTINGS[key][index];
    }
    return DEFAULT_SETTINGS[path];
  }
}
