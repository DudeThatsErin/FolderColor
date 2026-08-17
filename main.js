const { Plugin, PluginSettingTab, Setting } = require('obsidian');

const VERSION = '1.3.1';

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
  ['palette-custom', 'Custom']
];

const VISUAL_STYLE_OPTIONS = [
  ['appearance-background', 'Background Only'],
  ['appearance-border', 'Borders Only'],
  ['appearance-both', 'Background + Borders'],
  ['appearance-none', 'None']
];

const COLOR_MODE_OPTIONS = [
  ['background-folder-color', 'Match Folder Colors'],
  ['background-custom-color', 'Custom Color']
];

const BORDER_COLOR_MODE_OPTIONS = [
  ['border-folder-color', 'Match Folder Colors'],
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
  ['folder-icon-default', 'Theme Default Arrow'],
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
  ['icon-colorful', 'Match Folder Colors'],
  ['icon-custom-color', 'Custom Color']
];

const FILE_ICON_OPTIONS = ICON_OPTIONS
  .filter(([value]) => value !== 'folder-icon-default')
  .map(([value, label]) => [value.replace('folder-icon-', 'file-icon-'), label]);

const FILE_ICON_COLOR_OPTIONS = [
  ['file-icon-colorful', 'Match File / Folder Colors'],
  ['file-icon-custom-color', 'Custom Color']
];

const ACTIVE_APPEARANCE_OPTIONS = [
  ['active-appearance-none', 'No Special Background / Borders'],
  ['active-appearance-background', 'Background Only'],
  ['active-appearance-border', 'Borders Only'],
  ['active-appearance-both', 'Background + Borders']
];

const ACTIVE_BG_COLOR_OPTIONS = [
  ['active-bg-row-color', 'Match File / Folder Color'],
  ['active-bg-custom-color', 'Custom Color']
];

const ACTIVE_BORDER_COLOR_OPTIONS = [
  ['active-border-row-color', 'Match File / Folder Color'],
  ['active-border-custom-color', 'Custom Color']
];

const ACTIVE_RIGHT_DECORATION_OPTIONS = [
  ['active-right-none', 'None'],
  ['active-right-border', 'Border'],
  ['active-right-dot', 'Dot']
];

const ACTIVE_ICON_OPTIONS = FILE_ICON_OPTIONS.map(([value, label]) => [value.replace('file-icon-', 'active-icon-'), label]);

const ACTIVE_ICON_COLOR_OPTIONS = [
  ['active-icon-row-color', 'Match File / Folder Color'],
  ['active-icon-text-color', 'Match Active Text Color'],
  ['active-icon-custom-color', 'Custom Color']
];

const ACTIVE_FONT_WEIGHT_OPTIONS = [
  ['100', '100 - Thin'], ['200', '200 - Extra Light'], ['300', '300 - Light'],
  ['400', '400 - Normal'], ['500', '500 - Medium'], ['600', '600 - Semi Bold'],
  ['700', '700 - Bold'], ['800', '800 - Extra Bold'], ['900', '900 - Black']
];

const ACTIVE_FONT_STYLE_OPTIONS = [
  ['normal', 'Normal'], ['italic', 'Italic'], ['oblique', 'Oblique']
];

const ACTIVE_TEXT_DECORATION_OPTIONS = [
  ['none', 'None'], ['underline', 'Underline'], ['line-through', 'Line Through'], ['overline', 'Overline']
];

const ACTIVE_TEXT_TRANSFORM_OPTIONS = [
  ['none', 'None'], ['uppercase', 'UPPERCASE'], ['lowercase', 'lowercase'], ['capitalize', 'Capitalize']
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
    'show-left-border', 'show-top-border', 'show-bottom-border', 'inherit-colors', 'show-file-icons',
    'active-show-left-border', 'active-show-top-border', 'active-show-bottom-border', 'active-show-icon'
  ]
};

const CONTROLLED_CLASSES = Object.values(CLASS_GROUPS).flat();

const CSS_VARIABLES = [
  '--background-opacity', '--background-custom-color-value', '--border-opacity',
  '--border-custom-color-value', '--left-border-width', '--right-border-width',
  '--top-border-width', '--bottom-border-width', '--left-border-radius',
  '--right-border-radius', '--right-dot-size', '--right-dot-offset', '--font-size',
  '--font-family', '--text-color-dark', '--text-color-light', '--folder-icon-color',
  '--folder-icon-opacity', '--folder-icon-size', '--file-icon-color',
  '--file-icon-opacity', '--file-icon-size',
  '--active-bg-custom-color', '--active-bg-opacity', '--active-border-custom-color', '--active-border-opacity',
  '--active-left-border-width', '--active-right-border-width', '--active-top-border-width', '--active-bottom-border-width',
  '--active-left-border-radius', '--active-right-border-radius', '--active-right-dot-size', '--active-right-dot-offset',
  '--active-text-color', '--active-text-opacity', '--active-font-size', '--active-font-family', '--active-font-weight',
  '--active-font-style', '--active-text-decoration', '--active-text-transform', '--active-letter-spacing',
  '--active-icon-color', '--active-icon-opacity', '--active-icon-size',
  '--folder-color-custom-1', '--folder-color-custom-2', '--folder-color-custom-3',
  '--folder-color-custom-4', '--folder-color-custom-5', '--folder-color-custom-6',
  '--folder-color-custom-7', '--folder-color-custom-8', '--folder-color-custom-9',
  '--folder-color-custom-10'
];

const DEFAULT_SETTINGS = {
  palette: 'palette-pink',
  customColors: ['#ff6b9d', '#ff8e72', '#ffc66d', '#e5d66f', '#7ed6a5', '#65d6ce', '#72c7ff', '#8fa7ff', '#b895ff', '#e38cff'],

  visualStyle: 'appearance-background',
  backgroundColorMode: 'background-folder-color',
  backgroundCustomColor: '#7f6aa8',
  backgroundOpacity: 0.75,

  borderColorMode: 'border-folder-color',
  borderCustomColor: '#d8d8d8',
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
  textColorDark: '#ffffff',
  textColorLight: '#000000',

  folderIcon: 'folder-icon-folder',
  folderOpenIcon: 'folder-open-icon-same',
  folderIconColorMode: 'icon-colorful',
  folderIconColor: '#d8d8d8',
  folderIconOpacity: 1,
  folderIconSize: 16,

  showFileIcons: false,
  fileIcon: 'file-icon-file',
  fileIconColorMode: 'file-icon-colorful',
  fileIconColor: '#d8d8d8',
  fileIconOpacity: 1,
  fileIconSize: 14,

  activeAppearance: 'active-appearance-none',
  activeBackgroundColorMode: 'active-bg-custom-color',
  activeBackgroundColor: '#7f6aa8',
  activeBackgroundOpacity: 0.35,
  activeBorderColorMode: 'active-border-custom-color',
  activeBorderColor: '#ffffff',
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
  activeTextColor: '#ffffff',
  activeTextOpacity: 1,
  activeFontSize: 14,
  activeFontFamily: 'inherit',
  activeFontWeight: '700',
  activeFontStyle: 'normal',
  activeTextDecoration: 'none',
  activeTextTransform: 'none',
  activeLetterSpacing: 0,
  activeShowIcon: false,
  activeIcon: 'active-icon-file',
  activeIconColorMode: 'active-icon-text-color',
  activeIconColor: '#ffffff',
  activeIconOpacity: 1,
  activeIconSize: 14
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

module.exports = class FolderColorSystemPlugin extends Plugin {
  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.applySettings();
    this.addSettingTab(new FolderColorSystemSettingTab(this.app, this));
  }

  onunload() {
    this.clearAppliedSettings();
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.applySettings();
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
    if (s.activeShowLeftBorder) this.addClass('active-show-left-border');
    if (s.activeShowTopBorder) this.addClass('active-show-top-border');
    if (s.activeShowBottomBorder) this.addClass('active-show-bottom-border');
    if (s.activeShowIcon) this.addClass('active-show-icon');

    const customColors = Array.isArray(s.customColors) ? s.customColors : DEFAULT_SETTINGS.customColors;
    customColors.forEach((color, index) => {
      this.setVar(`--folder-color-custom-${index + 1}`, hexToRgbString(color, hexToRgbString(DEFAULT_SETTINGS.customColors[index])));
    });

    this.setVar('--background-custom-color-value', hexToRgbString(s.backgroundCustomColor, '127,106,168'));
    this.setVar('--background-opacity', String(clampNumber(s.backgroundOpacity, 0, 1)));

    this.setVar('--border-custom-color-value', hexToRgbString(s.borderCustomColor, '216,216,216'));
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
    this.setVar('--text-color-dark', s.textColorDark || '#ffffff');
    this.setVar('--text-color-light', s.textColorLight || '#000000');

    this.setVar('--folder-icon-color', hexToRgbString(s.folderIconColor, '216,216,216'));
    this.setVar('--folder-icon-opacity', String(clampNumber(s.folderIconOpacity, 0, 1)));
    this.setVar('--folder-icon-size', `${clampNumber(s.folderIconSize, 4, 80)}px`);

    this.setVar('--file-icon-color', hexToRgbString(s.fileIconColor, '216,216,216'));
    this.setVar('--file-icon-opacity', String(clampNumber(s.fileIconOpacity, 0, 1)));
    this.setVar('--file-icon-size', `${clampNumber(s.fileIconSize, 4, 80)}px`);

    this.setVar('--active-bg-custom-color', hexToRgbString(s.activeBackgroundColor, '127,106,168'));
    this.setVar('--active-bg-opacity', String(clampNumber(s.activeBackgroundOpacity, 0, 1)));
    this.setVar('--active-border-custom-color', hexToRgbString(s.activeBorderColor, '255,255,255'));
    this.setVar('--active-border-opacity', String(clampNumber(s.activeBorderOpacity, 0, 1)));
    this.setVar('--active-left-border-width', `${clampNumber(s.activeLeftBorderWidth, 0, 50)}px`);
    this.setVar('--active-right-border-width', `${clampNumber(s.activeRightBorderWidth, 0, 50)}px`);
    this.setVar('--active-top-border-width', `${clampNumber(s.activeTopBorderWidth, 0, 50)}px`);
    this.setVar('--active-bottom-border-width', `${clampNumber(s.activeBottomBorderWidth, 0, 50)}px`);
    this.setVar('--active-left-border-radius', `${clampNumber(s.activeLeftBorderRadius, 0, 100)}px`);
    this.setVar('--active-right-border-radius', `${clampNumber(s.activeRightBorderRadius, 0, 100)}px`);
    this.setVar('--active-right-dot-size', `${clampNumber(s.activeRightDotSize, 1, 50)}px`);
    this.setVar('--active-right-dot-offset', `${clampNumber(s.activeRightDotOffset, 0, 100)}px`);
    this.setVar('--active-text-color', hexToRgbString(s.activeTextColor, '255,255,255'));
    this.setVar('--active-text-opacity', String(clampNumber(s.activeTextOpacity, 0, 1)));
    this.setVar('--active-font-size', `${clampNumber(s.activeFontSize, 6, 60)}px`);
    this.setVar('--active-font-family', s.activeFontFamily || 'inherit');
    this.setVar('--active-font-weight', String(s.activeFontWeight || '700'));
    this.setVar('--active-font-style', s.activeFontStyle || 'normal');
    this.setVar('--active-text-decoration', s.activeTextDecoration || 'none');
    this.setVar('--active-text-transform', s.activeTextTransform || 'none');
    this.setVar('--active-letter-spacing', `${clampNumber(s.activeLetterSpacing, -5, 20)}px`);
    this.setVar('--active-icon-color', hexToRgbString(s.activeIconColor, '255,255,255'));
    this.setVar('--active-icon-opacity', String(clampNumber(s.activeIconOpacity, 0, 1)));
    this.setVar('--active-icon-size', `${clampNumber(s.activeIconSize, 4, 80)}px`);
  }
};

class FolderColorSystemSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    const s = this.plugin.settings;

    containerEl.empty();
    containerEl.createEl('h2', { text: 'Folder Color System' });
    containerEl.createEl('p', { text: `All settings are built into this plugin. Style Settings is not required. Version ${VERSION}.` });

    this.addSection('Palette');
    this.addDropdown('Color Palette', 'Select the 10-color repeating palette.', 'palette', PALETTE_OPTIONS);

    if (s.palette === 'palette-custom') {
      for (let i = 0; i < 10; i += 1) {
        this.addColor(`Custom Color ${i + 1}`, '', `customColors.${i}`, s.customColors?.[i] || DEFAULT_SETTINGS.customColors[i]);
      }
    } else {
      this.addInfo('Custom colors appear here when Color Palette is set to Custom.');
    }

    this.addSection('Rows');
    this.addDropdown('Row Style', 'Choose background, borders, both, or no row decoration.', 'visualStyle', VISUAL_STYLE_OPTIONS);
    this.addToggle('Inherit Parent Folder Color', 'Nested folders and files inherit their top-level branch color at any depth.', 'inheritColors');
    this.addSlider('File Explorer Font Size', '', 'fontSize', 6, 32, 1, 'px');
    this.addText('File Explorer Font Family', 'Any CSS font-family value. Use inherit to follow your theme.', 'fontFamily');
    this.addColor('File Explorer Text Color (Dark Mode)', '', 'textColorDark', s.textColorDark);
    this.addColor('File Explorer Text Color (Light Mode)', '', 'textColorLight', s.textColorLight);

    this.addSection('Background');
    this.addDropdown('Background Color', '', 'backgroundColorMode', COLOR_MODE_OPTIONS);
    if (s.backgroundColorMode === 'background-custom-color') {
      this.addColor('Custom Background Color', '', 'backgroundCustomColor', s.backgroundCustomColor);
    }
    this.addSlider('Background Opacity', '', 'backgroundOpacity', 0, 1, 0.01, '');

    this.addSection('Borders and right-side marker');
    this.addDropdown('Border Color', '', 'borderColorMode', BORDER_COLOR_MODE_OPTIONS);
    if (s.borderColorMode === 'border-custom-color') {
      this.addColor('Custom Border Color', '', 'borderCustomColor', s.borderCustomColor);
    }
    this.addSlider('Border Opacity', '', 'borderOpacity', 0, 1, 0.01, '');
    this.addDropdown('Border Line Style', '', 'borderLineStyle', BORDER_STYLE_OPTIONS);
    this.addToggle('Show Left Border', '', 'showLeftBorder');
    this.addSlider('Left Border Width', '', 'leftBorderWidth', 0, 20, 1, 'px');
    this.addDropdown('Right Side', 'Hide it, draw a border, or show a dot.', 'rightDecoration', RIGHT_DECORATION_OPTIONS);
    if (s.rightDecoration === 'right-border') {
      this.addSlider('Right Border Width', '', 'rightBorderWidth', 0, 20, 1, 'px');
    }
    if (s.rightDecoration === 'right-dot') {
      this.addSlider('Right Dot Size', '', 'rightDotSize', 1, 30, 1, 'px');
      this.addSlider('Right Dot Inset', '', 'rightDotOffset', 0, 40, 1, 'px');
    }
    this.addToggle('Show Top Border', '', 'showTopBorder');
    this.addSlider('Top Border Width', '', 'topBorderWidth', 0, 20, 1, 'px');
    this.addToggle('Show Bottom Border', '', 'showBottomBorder');
    this.addSlider('Bottom Border Width', '', 'bottomBorderWidth', 0, 20, 1, 'px');
    this.addSlider('Left Side Roundness', 'Controls top-left and bottom-left corners.', 'leftBorderRadius', 0, 40, 1, 'px');
    this.addSlider('Right Side Roundness', 'Controls top-right and bottom-right corners.', 'rightBorderRadius', 0, 40, 1, 'px');

    this.addSection('Folder icons');
    this.addDropdown('Closed Folder Icon', 'Icon shown when a folder is closed.', 'folderIcon', ICON_OPTIONS);
    this.addDropdown('Open Folder Icon', 'Choose a different icon for open folders, or keep the closed-folder icon.', 'folderOpenIcon', OPEN_ICON_OPTIONS);
    this.addDropdown('Folder Icon Color', '', 'folderIconColorMode', ICON_COLOR_OPTIONS);
    if (s.folderIconColorMode === 'icon-custom-color') {
      this.addColor('Custom Folder Icon Color', '', 'folderIconColor', s.folderIconColor);
    }
    this.addSlider('Folder Icon Opacity', '', 'folderIconOpacity', 0, 1, 0.01, '');
    this.addSlider('Folder Icon Size', '', 'folderIconSize', 8, 40, 1, 'px');

    this.addSection('File icons');
    this.addToggle('Show File Icons', 'Adds a Lucide-style icon to every file row.', 'showFileIcons');
    this.addDropdown('File Icon', '', 'fileIcon', FILE_ICON_OPTIONS);
    this.addDropdown('File Icon Color', '', 'fileIconColorMode', FILE_ICON_COLOR_OPTIONS);
    if (s.fileIconColorMode === 'file-icon-custom-color') {
      this.addColor('Custom File Icon Color', '', 'fileIconColor', s.fileIconColor);
    }
    this.addSlider('File Icon Opacity', '', 'fileIconOpacity', 0, 1, 0.01, '');
    this.addSlider('File Icon Size', '', 'fileIconSize', 8, 40, 1, 'px');

    this.addSection('Active file');
    this.addInfo('These settings override the normal row appearance only for the currently active file.');
    this.addDropdown('Active File Style', 'Choose a dedicated background/border treatment for the active file.', 'activeAppearance', ACTIVE_APPEARANCE_OPTIONS);

    if (s.activeAppearance === 'active-appearance-background' || s.activeAppearance === 'active-appearance-both') {
      this.addDropdown('Active Background Color', '', 'activeBackgroundColorMode', ACTIVE_BG_COLOR_OPTIONS);
      if (s.activeBackgroundColorMode === 'active-bg-custom-color') {
        this.addColor('Custom Active Background Color', '', 'activeBackgroundColor', s.activeBackgroundColor);
      }
      this.addSlider('Active Background Opacity', '', 'activeBackgroundOpacity', 0, 1, 0.01, '');
    }

    if (s.activeAppearance === 'active-appearance-border' || s.activeAppearance === 'active-appearance-both') {
      this.addDropdown('Active Border Color', '', 'activeBorderColorMode', ACTIVE_BORDER_COLOR_OPTIONS);
      if (s.activeBorderColorMode === 'active-border-custom-color') {
        this.addColor('Custom Active Border Color', '', 'activeBorderColor', s.activeBorderColor);
      }
      this.addSlider('Active Border Opacity', '', 'activeBorderOpacity', 0, 1, 0.01, '');
      this.addDropdown('Active Border Line Style', '', 'activeBorderLineStyle', BORDER_STYLE_OPTIONS);
      this.addToggle('Active Left Border', '', 'activeShowLeftBorder');
      if (s.activeShowLeftBorder) this.addSlider('Active Left Border Width', '', 'activeLeftBorderWidth', 0, 20, 1, 'px');
      this.addDropdown('Active Right Side', 'Hide it, draw a border, or show a dot.', 'activeRightDecoration', ACTIVE_RIGHT_DECORATION_OPTIONS);
      if (s.activeRightDecoration === 'active-right-border') this.addSlider('Active Right Border Width', '', 'activeRightBorderWidth', 0, 20, 1, 'px');
      if (s.activeRightDecoration === 'active-right-dot') {
        this.addSlider('Active Right Dot Size', '', 'activeRightDotSize', 1, 30, 1, 'px');
        this.addSlider('Active Right Dot Inset', '', 'activeRightDotOffset', 0, 40, 1, 'px');
      }
      this.addToggle('Active Top Border', '', 'activeShowTopBorder');
      if (s.activeShowTopBorder) this.addSlider('Active Top Border Width', '', 'activeTopBorderWidth', 0, 20, 1, 'px');
      this.addToggle('Active Bottom Border', '', 'activeShowBottomBorder');
      if (s.activeShowBottomBorder) this.addSlider('Active Bottom Border Width', '', 'activeBottomBorderWidth', 0, 20, 1, 'px');
    }

    this.addSlider('Active Left Side Roundness', 'Controls the active row top-left and bottom-left corners.', 'activeLeftBorderRadius', 0, 40, 1, 'px');
    this.addSlider('Active Right Side Roundness', 'Controls the active row top-right and bottom-right corners.', 'activeRightBorderRadius', 0, 40, 1, 'px');

    this.addColor('Active Text Color', '', 'activeTextColor', s.activeTextColor);
    this.addSlider('Active Text Opacity', '', 'activeTextOpacity', 0, 1, 0.01, '');
    this.addSlider('Active Font Size', '', 'activeFontSize', 6, 40, 1, 'px');
    this.addText('Active Font Family', 'Any CSS font-family value. Use inherit to follow the normal File Explorer font.', 'activeFontFamily');
    this.addDropdown('Active Font Weight', '', 'activeFontWeight', ACTIVE_FONT_WEIGHT_OPTIONS);
    this.addDropdown('Active Font Style', '', 'activeFontStyle', ACTIVE_FONT_STYLE_OPTIONS);
    this.addDropdown('Active Text Decoration', '', 'activeTextDecoration', ACTIVE_TEXT_DECORATION_OPTIONS);
    this.addDropdown('Active Text Transform', '', 'activeTextTransform', ACTIVE_TEXT_TRANSFORM_OPTIONS);
    this.addSlider('Active Letter Spacing', '', 'activeLetterSpacing', -2, 10, 0.1, 'px');

    this.addToggle('Custom Active File Icon', 'Use a dedicated icon for the active file, even when regular file icons are disabled.', 'activeShowIcon');
    if (s.activeShowIcon) {
      this.addDropdown('Active File Icon', '', 'activeIcon', ACTIVE_ICON_OPTIONS);
      this.addDropdown('Active Icon Color', '', 'activeIconColorMode', ACTIVE_ICON_COLOR_OPTIONS);
      if (s.activeIconColorMode === 'active-icon-custom-color') this.addColor('Custom Active Icon Color', '', 'activeIconColor', s.activeIconColor);
      this.addSlider('Active Icon Opacity', '', 'activeIconOpacity', 0, 1, 0.01, '');
      this.addSlider('Active Icon Size', '', 'activeIconSize', 8, 40, 1, 'px');
    }

    this.addSection('Reset');
    new Setting(containerEl)
      .setName('Reset all settings')
      .setDesc('Restore every Folder Color System setting to its default value.')
      .addButton((button) => {
        button
          .setButtonText('Reset')
          .setWarning()
          .onClick(async () => {
            this.plugin.settings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
            await this.plugin.saveSettings();
            this.refreshPreservingScroll();
          });
      });
  }

  refreshPreservingScroll() {
    /*
     * Rebuilding a PluginSettingTab normally resets the scroll position on
     * iPad/iOS. Some controls need a rebuild because they reveal or hide
     * conditional settings. Capture every scrollable ancestor before the
     * rebuild, then restore those positions after Obsidian has laid the tab
     * out again.
     */
    const scrollTargets = [];
    let el = this.containerEl;

    while (el && el !== document.body) {
      if (typeof el.scrollTop === 'number') {
        scrollTargets.push({
          el,
          top: el.scrollTop,
          left: el.scrollLeft
        });
      }
      el = el.parentElement;
    }

    this.display();

    const restore = () => {
      for (const target of scrollTargets) {
        if (!target.el || !target.el.isConnected) continue;
        target.el.scrollTop = target.top;
        target.el.scrollLeft = target.left;
      }
    };

    // One frame restores the normal case; the second handles iPad/WebKit
    // layout settling after dropdowns change the number of visible controls.
    requestAnimationFrame(() => {
      restore();
      requestAnimationFrame(restore);
    });
  }

  addSection(title) {
    const heading = this.containerEl.createEl('h3', { text: title });
    heading.style.marginTop = '2em';
  }

  addInfo(text) {
    const p = this.containerEl.createEl('p', { text });
    p.style.opacity = '0.75';
    p.style.fontSize = '0.9em';
  }

  addDropdown(name, desc, key, options) {
    new Setting(this.containerEl)
      .setName(name)
      .setDesc(desc)
      .addDropdown((dropdown) => {
        for (const [value, label] of options) dropdown.addOption(value, label);
        dropdown.setValue(this.getValue(key));
        dropdown.onChange(async (value) => {
          this.setValue(key, value);
          await this.plugin.saveSettings();

          // Only rebuild the settings tab when this choice changes which
          // controls are visible. Avoiding needless rebuilds keeps iPad/iOS
          // from jumping the settings pane back to the top.
          const conditionalDropdowns = new Set([
            'palette',
            'backgroundColorMode',
            'borderColorMode',
            'rightDecoration',
            'folderIconColorMode',
            'fileIconColorMode',
            'activeAppearance',
            'activeBackgroundColorMode',
            'activeBorderColorMode',
            'activeRightDecoration',
            'activeIconColorMode'
          ]);

          if (conditionalDropdowns.has(key)) {
            this.refreshPreservingScroll();
          }
        });
      });
  }

  addToggle(name, desc, key) {
    new Setting(this.containerEl)
      .setName(name)
      .setDesc(desc)
      .addToggle((toggle) => {
        toggle.setValue(Boolean(this.getValue(key)));
        toggle.onChange(async (value) => {
          this.setValue(key, value);
          await this.plugin.saveSettings();

          const conditionalToggles = new Set([
            'activeShowLeftBorder',
            'activeShowTopBorder',
            'activeShowBottomBorder',
            'activeShowIcon'
          ]);

          if (conditionalToggles.has(key)) {
            this.refreshPreservingScroll();
          }
        });
      });
  }

  addSlider(name, desc, key, min, max, step, suffix) {
    const setting = new Setting(this.containerEl)
      .setName(name)
      .setDesc(desc);

    let labelEl;
    setting.addSlider((slider) => {
      slider
        .setLimits(min, max, step)
        .setValue(Number(this.getValue(key)))
        .setDynamicTooltip()
        .onChange(async (value) => {
          const rounded = step < 1 ? Number(value.toFixed(2)) : Math.round(value);
          this.setValue(key, rounded);
          if (labelEl) labelEl.setText(`${rounded}${suffix || ''}`);
          await this.plugin.saveSettings();
        });
    });
    setting.addExtraButton((button) => {
      labelEl = button.extraSettingsEl;
      labelEl.setText(`${this.getValue(key)}${suffix || ''}`);
      button.setIcon('reset').setTooltip('Reset to default').onClick(async () => {
        this.setValue(key, this.getDefault(key));
        await this.plugin.saveSettings();
        this.refreshPreservingScroll();
      });
    });
  }

  addText(name, desc, key) {
    new Setting(this.containerEl)
      .setName(name)
      .setDesc(desc)
      .addText((text) => {
        text.setValue(String(this.getValue(key) ?? ''));
        text.onChange(async (value) => {
          this.setValue(key, value || this.getDefault(key));
          await this.plugin.saveSettings();
        });
      });
  }

  addColor(name, desc, key, value) {
    new Setting(this.containerEl)
      .setName(name)
      .setDesc(desc)
      .addColorPicker((picker) => {
        picker.setValue(value || this.getValue(key) || this.getDefault(key));
        picker.onChange(async (newValue) => {
          this.setValue(key, newValue);
          await this.plugin.saveSettings();
        });
      });
  }

  getValue(path) {
    if (path.startsWith('customColors.')) {
      const index = Number(path.split('.')[1]);
      return this.plugin.settings.customColors?.[index] ?? DEFAULT_SETTINGS.customColors[index];
    }
    return this.plugin.settings[path] ?? DEFAULT_SETTINGS[path];
  }

  setValue(path, value) {
    if (path.startsWith('customColors.')) {
      const index = Number(path.split('.')[1]);
      if (!Array.isArray(this.plugin.settings.customColors)) {
        this.plugin.settings.customColors = [...DEFAULT_SETTINGS.customColors];
      }
      this.plugin.settings.customColors[index] = value;
      return;
    }
    this.plugin.settings[path] = value;
  }

  getDefault(path) {
    if (path.startsWith('customColors.')) {
      const index = Number(path.split('.')[1]);
      return DEFAULT_SETTINGS.customColors[index];
    }
    return DEFAULT_SETTINGS[path];
  }
}
