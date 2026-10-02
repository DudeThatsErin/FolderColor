const { Plugin, PluginSettingTab, Setting, Modal, Notice, TFolder, TFile, FuzzySuggestModal, getIconIds, setIcon } = require('obsidian');

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

const EMOJI_DATA = [
  ['📁','folder','files'],['📂','open folder','files'],['🗂️','card index dividers','files'],
  ['📋','clipboard','files'],['📌','pushpin','files'],['📎','paperclip','files'],
  ['🔗','link','files'],['📝','memo','files'],['✏️','pencil','files'],['🖊️','pen','files'],
  ['📖','open book','files'],['📚','books','files'],['📒','ledger','files'],['📓','notebook','files'],
  ['📔','notebook cover','files'],['📕','closed book','files'],['📗','green book','files'],
  ['📘','blue book','files'],['📙','orange book','files'],['📄','page','files'],['📃','page curl','files'],
  ['🗒️','spiral notepad','files'],['🗓️','spiral calendar','files'],['📆','tear-off calendar','files'],
  ['📅','calendar','files'],['🗑️','wastebasket','files'],['💼','briefcase','files'],
  ['🗃️','card file box','files'],['🗄️','file cabinet','files'],['📥','inbox','files'],
  ['📤','outbox','files'],['📦','package','files'],['🏷️','label','files'],['🔖','bookmark','files'],
  ['🌿','herb','nature'],['🌱','seedling','nature'],['🍀','four leaf clover','nature'],
  ['🌸','cherry blossom','nature'],['🌺','hibiscus','nature'],['🌻','sunflower','nature'],
  ['🌼','blossom','nature'],['🌹','rose','nature'],['🌷','tulip','nature'],
  ['🍁','maple leaf','nature'],['🍂','fallen leaf','nature'],['🍃','leaf fluttering','nature'],
  ['🌲','evergreen tree','nature'],['🌳','deciduous tree','nature'],['🌴','palm tree','nature'],
  ['🌵','cactus','nature'],['🦋','butterfly','nature'],['🐝','honeybee','nature'],
  ['🐉','dragon','nature'],['🦊','fox','nature'],['🐺','wolf','nature'],['🦁','lion','nature'],
  ['⭐','star','nature'],['🌟','glowing star','nature'],['💫','dizzy','nature'],
  ['✨','sparkles','nature'],['🌙','crescent moon','nature'],['🌈','rainbow','nature'],
  ['☀️','sun','nature'],['🌊','wave','nature'],['🔥','fire','nature'],
  ['❄️','snowflake','nature'],['💧','droplet','nature'],['🌍','earth globe','nature'],
  ['⛰️','mountain','nature'],['🏔️','snow capped mountain','nature'],['🌋','volcano','nature'],
  ['💡','light bulb','objects'],['🔑','key','objects'],['🔒','locked','objects'],
  ['🔓','unlocked','objects'],['🔔','bell','objects'],['📢','loudspeaker','objects'],
  ['🎯','direct hit','objects'],['🏆','trophy','objects'],['🥇','gold medal','objects'],
  ['💰','money bag','objects'],['💎','gem stone','objects'],['🔮','crystal ball','objects'],
  ['🧲','magnet','objects'],['🔭','telescope','objects'],['🔬','microscope','objects'],
  ['🎨','artist palette','objects'],['🖼️','framed picture','objects'],
  ['🎵','musical note','objects'],['🎶','musical notes','objects'],['🎸','guitar','objects'],
  ['🎮','video game','objects'],['🕹️','joystick','objects'],['🎲','game die','objects'],
  ['🧩','puzzle piece','objects'],['🏠','house','objects'],['🏡','house garden','objects'],
  ['🏢','office building','objects'],['🏛️','classical building','objects'],
  ['🚀','rocket','objects'],['✈️','airplane','objects'],['🚂','train','objects'],
  ['⚙️','gear','objects'],['🛠️','hammer wrench','objects'],['🔧','wrench','objects'],
  ['🔨','hammer','objects'],['⚗️','alembic','objects'],['🧪','test tube','objects'],
  ['📡','satellite antenna','objects'],['💻','laptop','objects'],['🖥️','desktop computer','objects'],
  ['⌨️','keyboard','objects'],['🖱️','mouse','objects'],['📱','mobile phone','objects'],
  ['🎁','gift','objects'],['🎀','ribbon','objects'],['🎉','party popper','objects'],['🎊','confetti','objects'],
  ['❤️','red heart','symbols'],['🧡','orange heart','symbols'],['💛','yellow heart','symbols'],
  ['💚','green heart','symbols'],['💙','blue heart','symbols'],['💜','purple heart','symbols'],
  ['🖤','black heart','symbols'],['🤍','white heart','symbols'],['💔','broken heart','symbols'],
  ['✅','check mark','symbols'],['❌','cross mark','symbols'],['⚡','lightning','symbols'],
  ['💥','collision','symbols'],['⚠️','warning','symbols'],['🚫','prohibited','symbols'],
  ['🔴','red circle','symbols'],['🟠','orange circle','symbols'],['🟡','yellow circle','symbols'],
  ['🟢','green circle','symbols'],['🔵','blue circle','symbols'],['🟣','purple circle','symbols'],
  ['⚫','black circle','symbols'],['⚪','white circle','symbols'],
  ['🔺','red triangle up','symbols'],['🔻','red triangle down','symbols'],
  ['🔁','repeat','symbols'],['🔀','shuffle','symbols'],['▶️','play','symbols'],
  ['⏸️','pause','symbols'],['⏹️','stop','symbols'],['🔊','loud sound','symbols'],
  ['🔇','muted','symbols'],['📶','signal bars','symbols'],['📍','round pushpin','symbols'],
  ['😀','grinning face','faces'],['😊','smiling face','faces'],['😎','sunglasses','faces'],
  ['🤓','nerd','faces'],['🧐','monocle','faces'],['🤔','thinking','faces'],
  ['💪','muscle','faces'],['👍','thumbs up','faces'],['👎','thumbs down','faces'],
  ['👋','waving hand','faces'],['🤝','handshake','faces'],['🧠','brain','faces'],
  ['👁️','eye','faces'],['🫶','heart hands','faces'],['🙌','raised hands','faces'],
  ['🎭','performing arts','faces'],['🧑‍💻','technologist','faces'],['🧑‍🎨','artist','faces'],
  ['🧑‍🔬','scientist','faces'],['🧑‍🏫','teacher','faces'],['🧙','mage','faces'],
];

const EMOJI_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'files', label: '📁 Files' },
  { id: 'nature', label: '🌿 Nature' },
  { id: 'objects', label: '💡 Objects' },
  { id: 'symbols', label: '❤️ Symbols' },
  { id: 'faces', label: '😀 People' },
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
  ...Array.from({ length: 12 }, (_, index) => `--folder-color-custom-dark-${index + 1}`),
  ...Array.from({ length: 12 }, (_, index) => `--folder-color-custom-light-${index + 1}`),
  '--background-custom-color-value', '--border-custom-color-value', '--folder-icon-color', '--file-icon-color',
  '--active-bg-custom-color', '--active-border-custom-color', '--active-text-color', '--active-icon-color', '--fcs-icon-stroke-width',
  ...Array.from({ length: 12 }, (_, index) => `--folder-color-custom-${index + 1}`)
];

const DEFAULT_SETTINGS = {
  settingsSchemaVersion: 5,
  palette: 'palette-pink',
  customColorsDark: ['#ff6b9d', '#ff8e72', '#ffc66d', '#e5d66f', '#7ed6a5', '#65d6ce', '#72c7ff', '#8fa7ff', '#b895ff', '#e38cff', '#f87171', '#34d399'],
  customColorsLight: ['#ff6b9d', '#ff8e72', '#ffc66d', '#e5d66f', '#7ed6a5', '#65d6ce', '#72c7ff', '#8fa7ff', '#b895ff', '#e38cff', '#f87171', '#34d399'],
  // Path -> hex colour, or null when that folder and its contents should stay uncoloured.
  folderColorOverrides: {},
  folderIconOverrides: {},
  fileColorOverrides: {},
  fileIconOverrides: {},
  folderTextColorOverrides: {},
  fileTextColorOverrides: {},
  customIcons: ['', '', '', '', '', '', '', '', '', '', '', ''],
  folderIconEmoji: '',
  fileIconEmoji: '',
  activeIconEmoji: '',

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

function resolveOverrideIcon(value) {
  if (!value || typeof value !== 'string') return null;
  if (value.startsWith('lucide:')) return { type: 'lucide', name: value.slice(7) };
  return { type: 'emoji', value };
}

function parseColorOverride(override) {
  if (override === null) return { noColor: true, color: null, inherit: true, keepBorder: false };
  if (typeof override === 'string') return { noColor: false, color: override, inherit: false, keepBorder: false };
  if (override && typeof override === 'object') {
    if (override.noColor) return { noColor: true, color: null, inherit: Boolean(override.inherit !== false), keepBorder: Boolean(override.keepBorder) };
    return { noColor: false, color: override.color || null, inherit: Boolean(override.inherit), keepBorder: false };
  }
  return { noColor: false, color: null, inherit: false, keepBorder: false };
}

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
  if (!migrated.folderColorOverrides || typeof migrated.folderColorOverrides !== 'object' || Array.isArray(migrated.folderColorOverrides)) {
    migrated.folderColorOverrides = {};
  }
  if (!migrated.folderIconOverrides || typeof migrated.folderIconOverrides !== 'object') migrated.folderIconOverrides = {};
  if (!migrated.fileColorOverrides || typeof migrated.fileColorOverrides !== 'object') migrated.fileColorOverrides = {};
  if (!migrated.fileIconOverrides || typeof migrated.fileIconOverrides !== 'object') migrated.fileIconOverrides = {};
  if (!migrated.folderTextColorOverrides || typeof migrated.folderTextColorOverrides !== 'object') migrated.folderTextColorOverrides = {};
  if (!migrated.fileTextColorOverrides || typeof migrated.fileTextColorOverrides !== 'object') migrated.fileTextColorOverrides = {};
  if (!Array.isArray(migrated.customIcons)) migrated.customIcons = DEFAULT_SETTINGS.customIcons.slice();
  migrated.settingsSchemaVersion = 5;

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
    this.registerEvent(this.app.workspace.on('file-menu', (menu, file) => {
      if (file instanceof TFolder) {
        const override = this.getFolderColorOverride(file.path);
        menu.addSeparator();
        menu.addItem((item) => item.setTitle('Set custom folder color…').setIcon('palette')
          .onClick(() => {
            const parsed = parseColorOverride(override);
            new FolderColorOverrideModal(this, file.path, parsed.color || '#7f6aa8', parsed.inherit).open();
          }));
        menu.addItem((item) => item.setTitle('No color for folder and contents').setIcon('ban').setChecked(parseColorOverride(override).noColor)
          .onClick(() => new NoColorOptionsModal(this.app, this, file.path, override).open()));
        if (override !== undefined) menu.addItem((item) => item.setTitle('Use palette color').setIcon('rotate-ccw')
          .onClick(() => this.clearFolderColorOverride(file.path)));
        menu.addItem((item) => item.setTitle('Set custom folder icon…').setIcon('image')
          .onClick(() => new FolderIconOverrideModal(this, file.path).open()));
        menu.addItem((item) => item.setTitle('Set custom folder text color…').setIcon('type')
          .onClick(() => new FolderTextColorOverrideModal(this, file.path).open()));
      } else if (file instanceof TFile) {
        menu.addSeparator();
        menu.addItem((item) => item.setTitle('Set custom file color…').setIcon('palette')
          .onClick(() => new FileColorOverrideModal(this, file.path).open()));
        menu.addItem((item) => item.setTitle('Set custom file icon…').setIcon('image')
          .onClick(() => new FileIconOverrideModal(this, file.path).open()));
        menu.addItem((item) => item.setTitle('Set custom file text color…').setIcon('type')
          .onClick(() => new FileTextColorOverrideModal(this, file.path).open()));
      }
    }));

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

  getFolderColorOverride(path) {
    const overrides = this.settings?.folderColorOverrides;
    return overrides && Object.prototype.hasOwnProperty.call(overrides, path) ? overrides[path] : undefined;
  }

  async setFolderColorOverride(path, color) {
    if (!path) return;
    if (!this.settings.folderColorOverrides || typeof this.settings.folderColorOverrides !== 'object') this.settings.folderColorOverrides = {};
    this.settings.folderColorOverrides[path] = color;
    await this.saveSettings();
    new Notice(color === null ? `Folder Color System: ${path} and its contents will be uncoloured.` : `Folder Color System: custom colour saved for ${path}.`);
  }

  async clearFolderColorOverride(path) {
    if (!this.settings.folderColorOverrides || !Object.prototype.hasOwnProperty.call(this.settings.folderColorOverrides, path)) return;
    delete this.settings.folderColorOverrides[path];
    await this.saveSettings();
    new Notice(`Folder Color System: ${path} now uses the palette colour.`);
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
      iconEl.classList.remove('fcs-emoji-icon');
      if (iconName.startsWith('emoji:')) {
        iconEl.textContent = iconName.slice(6);
        iconEl.classList.add('fcs-emoji-icon');
        iconEl.dataset.fcsIcon = iconName;
      } else {
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

    this.refreshFolderColorOverrides(explorer);
    this.refreshActiveFolderState(explorer);

    explorer.querySelectorAll('.nav-folder').forEach(folder => {
      const title = folder.querySelector(':scope > .nav-folder-title');
      if (!title) return;
      const collapse = title.querySelector(':scope > .collapse-icon, :scope > .nav-folder-collapse-indicator');
      if (!collapse) return;

      const isCollapsed = folder.classList.contains('is-collapsed');
      if (this.getIconicFolderIcon(folder, title, collapse)) {
        // Iconic owns the collapse element when it supplies a folder icon.
        // Injecting an SVG into that same host makes the plugins race and can
        // leave duplicate icons behind after a folder is toggled.
        collapse.querySelector(':scope > .fcs-folder-icon')?.remove();
        collapse.classList.remove('fcs-has-custom-icon');
        collapse.classList.add('fcs-uses-iconic-icon');
        return;
      }
      collapse.classList.remove('fcs-uses-iconic-icon');

      // Per-folder icon override: walk up to find an inheriting ancestor.
      const folderPath = title?.dataset?.path || folder.dataset?.path;
      let overrideIconStr = null;
      {
        let cur = folder;
        while (cur) {
          const t = cur.querySelector(':scope > .nav-folder-title');
          const p = t?.dataset?.path || cur.dataset?.path;
          const ov = p && this.settings?.folderIconOverrides?.[p];
          if (ov?.icon && (cur === folder || ov.inherit)) { overrideIconStr = ov.icon; break; }
          cur = cur.parentElement?.closest('.nav-folder');
        }
      }
      if (overrideIconStr) {
        const resolved = resolveOverrideIcon(overrideIconStr);
        if (resolved) {
          const iconStr = resolved.type === 'emoji' ? `emoji:${resolved.value}` : resolved.name;
          const iconEl2 = this.setInjectedIcon(collapse, 'fcs-folder-icon', iconStr, 'folder');
          if (iconEl2) collapse.classList.add('fcs-has-custom-icon');
          return;
        }
      }

      let settingValue;
      if (isCollapsed) {
        settingValue = s.folderIcon;
      } else if (s.folderOpenIcon && s.folderOpenIcon !== 'folder-open-icon-same') {
        settingValue = s.folderOpenIcon;
      } else {
        settingValue = s.folderIcon;
      }

      // Global emoji override for folder icons.
      const folderEmojiOverride = s.folderIconEmoji;
      if (folderEmojiOverride) {
        const iconEl2 = this.setInjectedIcon(collapse, 'fcs-folder-icon', `emoji:${folderEmojiOverride}`, 'folder');
        if (iconEl2) collapse.classList.add('fcs-has-custom-icon');
        return;
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

      // Iconic renders file icons in a separate tree-item-icon before the
      // title content. If it owns this row, remove our regular/active icon so
      // the two plugins never display adjacent icons.
      if (this.getIconicFileIcon(title)) {
        existing?.remove();
        content.classList.remove('fcs-has-file-icon');
        return;
      }

      // Per-file icon override.
      const filePath = title?.dataset?.path;
      const fileIconOverride = filePath && this.settings?.fileIconOverrides?.[filePath];
      if (fileIconOverride === null) {
        existing?.remove();
        content.classList.remove('fcs-has-file-icon');
        return;
      }
      if (fileIconOverride?.icon) {
        const resolved = resolveOverrideIcon(fileIconOverride.icon);
        if (resolved) {
          const iconStr = resolved.type === 'emoji' ? `emoji:${resolved.value}` : resolved.name;
          const iconEl = this.setInjectedIcon(content, 'fcs-file-icon', iconStr, 'file');
          if (iconEl) content.classList.add('fcs-has-file-icon');
          else content.classList.remove('fcs-has-file-icon');
          return;
        }
      }

      if (!useActive && !useRegular) {
        existing?.remove();
        content.classList.remove('fcs-has-file-icon');
        return;
      }

      const settingValue = useActive ? s.activeIcon : s.fileIcon;
      const emojiOverride = useActive ? s.activeIconEmoji : s.fileIconEmoji;
      const iconName = emojiOverride ? `emoji:${emojiOverride}` : (iconNameFromSetting(settingValue) || 'file');
      const iconEl = this.setInjectedIcon(content, 'fcs-file-icon', iconName, 'file');
      if (!iconEl) {
        content.classList.remove('fcs-has-file-icon');
        return;
      }
      content.classList.add('fcs-has-file-icon');
      iconEl.classList.toggle('fcs-active-icon', useActive);
    });
  }

  refreshFolderColorOverrides(explorer) {
    const overrides = this.settings?.folderColorOverrides || {};

    // First pass: apply direct overrides only.
    explorer.querySelectorAll('.nav-folder').forEach((folder) => {
      const title = folder.querySelector(':scope > .nav-folder-title');
      const path = title?.dataset?.path || folder.dataset?.path;
      const raw = path && Object.prototype.hasOwnProperty.call(overrides, path) ? overrides[path] : undefined;
      const parsed = parseColorOverride(raw);
      if (!parsed.noColor && parsed.color && hexToRgbString(parsed.color, '') !== '') folder.style.setProperty('--fc', hexToRgbString(parsed.color));
      else folder.style.removeProperty('--fc');
    });

    // Second pass: propagate inherited custom colors to descendant folders.
    explorer.querySelectorAll('.nav-folder').forEach((folder) => {
      const title = folder.querySelector(':scope > .nav-folder-title');
      const path = title?.dataset?.path || folder.dataset?.path;
      const raw = path && Object.prototype.hasOwnProperty.call(overrides, path) ? overrides[path] : undefined;
      const parsed = parseColorOverride(raw);
      if (!parsed.inherit || !parsed.color) return;
      const rgbVal = hexToRgbString(parsed.color, '');
      if (!rgbVal) return;
      folder.querySelectorAll('.nav-folder').forEach((child) => {
        const childTitle = child.querySelector(':scope > .nav-folder-title');
        const childPath = childTitle?.dataset?.path || child.dataset?.path;
        if (childPath && Object.prototype.hasOwnProperty.call(overrides, childPath)) return; // child has its own override
        child.style.setProperty('--fc', rgbVal);
      });
    });

    explorer.querySelectorAll('.nav-folder, .nav-file').forEach((item) => {
      const folder = item.classList.contains('nav-folder') ? item : item.parentElement?.closest('.nav-folder');
      let currentFolder = folder;
      let noColor = false;
      let keepBorder = false;

      // The closest folder override wins. A child can therefore opt back into
      // a custom colour beneath an uncoloured parent.
      while (currentFolder) {
        const title = currentFolder.querySelector(':scope > .nav-folder-title');
        const path = title?.dataset?.path || currentFolder.dataset?.path;
        if (path && Object.prototype.hasOwnProperty.call(overrides, path)) {
          const parsed = parseColorOverride(overrides[path]);
          noColor = parsed.noColor;
          keepBorder = parsed.keepBorder;
          break;
        }
        currentFolder = currentFolder.parentElement?.closest('.nav-folder');
      }

      // Also check direct file color override for fcs-no-color.
      if (!noColor && item.classList.contains('nav-file')) {
        const ft = item.querySelector(':scope > .nav-file-title');
        const fp = ft?.dataset?.path;
        if (fp && Object.prototype.hasOwnProperty.call(this.settings?.fileColorOverrides || {}, fp)) {
          const parsed = parseColorOverride(this.settings.fileColorOverrides[fp]);
          noColor = parsed.noColor;
          keepBorder = parsed.keepBorder;
        }
      }
      item.classList.toggle('fcs-no-color', noColor && !keepBorder);
      item.classList.toggle('fcs-no-color-keep-border', noColor && keepBorder);
    });

    // File color overrides: set --fc directly on .nav-file elements.
    const fileColorOverrides = this.settings?.fileColorOverrides || {};
    explorer.querySelectorAll('.nav-file').forEach((file) => {
      const ft = file.querySelector(':scope > .nav-file-title');
      const fp = ft?.dataset?.path;
      const raw = fp && Object.prototype.hasOwnProperty.call(fileColorOverrides, fp) ? fileColorOverrides[fp] : undefined;
      if (raw === undefined) { file.style.removeProperty('--fc'); return; }
      const parsed = parseColorOverride(raw);
      if (!parsed.noColor && parsed.color && hexToRgbString(parsed.color, '') !== '') file.style.setProperty('--fc', hexToRgbString(parsed.color));
      else file.style.removeProperty('--fc');
    });

    // Folder text color overrides.
    const folderTextOverrides = this.settings?.folderTextColorOverrides || {};
    explorer.querySelectorAll('.nav-folder').forEach((folder) => {
      const title = folder.querySelector(':scope > .nav-folder-title');
      const path = title?.dataset?.path || folder.dataset?.path;
      // Walk up to find an inheriting ancestor text color override.
      let textColor = null;
      {
        let cur = folder;
        while (cur) {
          const t = cur.querySelector(':scope > .nav-folder-title');
          const p = t?.dataset?.path || cur.dataset?.path;
          const ov = p && folderTextOverrides[p];
          if (ov?.color && (cur === folder || ov.inherit)) { textColor = ov.color; break; }
          cur = cur.parentElement?.closest('.nav-folder');
        }
      }
      if (textColor) title?.style.setProperty('--fcs-text', textColor);
      else title?.style.removeProperty('--fcs-text');
    });

    // File text color overrides (own override or inheriting folder ancestor).
    const fileTextOverrides = this.settings?.fileTextColorOverrides || {};
    explorer.querySelectorAll('.nav-file-title').forEach((title) => {
      const fp = title?.dataset?.path;
      const ownOverride = fp && fileTextOverrides[fp];
      if (ownOverride?.color) { title.style.setProperty('--fcs-text', ownOverride.color); return; }
      // Walk up folder ancestors for an inheriting text color.
      let textColor = null;
      let cur = title.parentElement?.closest('.nav-folder');
      while (cur) {
        const t = cur.querySelector(':scope > .nav-folder-title');
        const p = t?.dataset?.path || cur.dataset?.path;
        const ov = p && folderTextOverrides[p];
        if (ov?.color && ov.inherit) { textColor = ov.color; break; }
        cur = cur.parentElement?.closest('.nav-folder');
      }
      if (textColor) title.style.setProperty('--fcs-text', textColor);
      else title.style.removeProperty('--fcs-text');
    });
  }

  getIconicFolderIcon(folder, title, collapse) {
    const iconic = this.getIconicPlugin();
    const path = title?.dataset?.path || folder?.dataset?.path || folder?.querySelector?.('[data-path]')?.dataset?.path;
    const settings = iconic?.settings || iconic?.data || iconic?.plugin?.settings;
    const icon = settings?.fileIcons?.[path]?.icon;

    // Iconic marks the collapse element it has replaced. This DOM check makes
    // the handoff reliable even if Iconic finishes loading after this plugin.
    return (typeof icon === 'string' && icon.length > 0)
      || collapse?.classList?.contains('iconic-icon')
      || Boolean(title?.querySelector?.(':scope > .iconic-sidekick'));
  }

  getIconicFileIcon(title) {
    const iconic = this.getIconicPlugin();
    const path = title?.dataset?.path;
    const settings = iconic?.settings || iconic?.data || iconic?.plugin?.settings;
    const icon = settings?.fileIcons?.[path]?.icon;

    return (typeof icon === 'string' && icon.length > 0)
      || Boolean(title?.querySelector?.(':scope > .tree-item-icon.iconic-icon, :scope > .iconic-sidekick'));
  }

  getIconicPlugin() {
    return this.app.plugins?.getPlugin?.('iconic') || this.app.plugins?.plugins?.iconic;
  }

  removeInjectedIcons() {
    document.querySelectorAll('.fcs-folder-icon, .fcs-file-icon').forEach(el => el.remove());
    document.querySelectorAll('.fcs-has-custom-icon').forEach(el => el.classList.remove('fcs-has-custom-icon'));
    document.querySelectorAll('.fcs-uses-iconic-icon').forEach(el => el.classList.remove('fcs-uses-iconic-icon'));
    document.querySelectorAll('.fcs-has-file-icon').forEach(el => el.classList.remove('fcs-has-file-icon'));
    document.querySelectorAll('.fcs-active-folder').forEach(el => el.classList.remove('fcs-active-folder'));
    document.querySelectorAll('.nav-folder.fcs-no-color, .nav-file.fcs-no-color').forEach((el) => el.classList.remove('fcs-no-color'));
    document.querySelectorAll('.nav-folder.fcs-no-color-keep-border, .nav-file.fcs-no-color-keep-border').forEach((el) => el.classList.remove('fcs-no-color-keep-border'));
    document.querySelectorAll('.nav-folder, .nav-file').forEach((el) => el.style.removeProperty('--fc'));
    document.querySelectorAll('.nav-folder-title, .nav-file-title').forEach((el) => el.style.removeProperty('--fcs-text'));
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

class FolderColorOverrideModal extends Modal {
  constructor(plugin, path, color, inherit = false) { super(plugin.app); this.plugin = plugin; this.path = path; this.color = color; this.inherit = inherit; }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl('h2', { text: 'Custom folder color' });
    contentEl.createEl('p', { text: this.path, cls: 'fcs-folder-color-path' });
    new Setting(contentEl).setName('Color').setDesc('This overrides the palette for this folder only.')
      .addColorPicker((picker) => picker.setValue(this.color).onChange((value) => { this.color = value; }));
    new Setting(contentEl).setName('Apply to folder contents').setDesc('Also applies this color to files and subfolders inside this folder.')
      .addToggle((toggle) => toggle.setValue(this.inherit).onChange((value) => { this.inherit = value; }));
    const buttonSetting = new Setting(contentEl)
      .addButton((button) => button.setButtonText('Cancel').onClick(() => this.close()))
      .addButton((button) => button.setButtonText('Save color').setCta().onClick(async () => {
        const value = this.inherit ? { color: this.color, inherit: true } : this.color;
        await this.plugin.setFolderColorOverride(this.path, value);
        this.close();
      }));
    if (this.plugin.getFolderColorOverride(this.path) !== undefined) {
      buttonSetting.addButton((button) => button.setButtonText('Remove custom color').setWarning().onClick(async () => {
        await this.plugin.clearFolderColorOverride(this.path);
        this.close();
      }));
    }
  }
  onClose() { this.contentEl.empty(); }
}

class IconPickerModal extends Modal {
  constructor(app, currentValue, onSelect) {
    super(app);
    this.currentValue = currentValue || '';
    this.onSelect = onSelect;
    this._emojiCategory = 'all';
    this._emojiSearch = '';
    this._lucideSearch = '';
    this._emojiGridEl = null;
    this._lucideGridEl = null;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('fcs-icon-picker-modal');
    contentEl.createEl('h2', { text: 'Choose an icon' });

    // ── Emoji section ──────────────────────────────────────
    contentEl.createEl('h3', { text: 'Emoji', cls: 'fcs-picker-section-heading' });

    // Category tabs
    const tabBar = contentEl.createDiv({ cls: 'fcs-emoji-tabs' });
    const renderTabs = () => {
      tabBar.empty();
      EMOJI_CATEGORIES.forEach(({ id, label }) => {
        const tab = tabBar.createSpan({ text: label, cls: 'fcs-emoji-tab' });
        if (this._emojiCategory === id) tab.classList.add('is-active');
        tab.addEventListener('click', () => { this._emojiCategory = id; renderTabs(); this._renderEmojis(); });
      });
    };
    renderTabs();

    // Emoji search
    const emojiSearchWrap = contentEl.createDiv({ cls: 'fcs-picker-search-row' });
    const emojiSearchInput = emojiSearchWrap.createEl('input', { type: 'text', placeholder: 'Search emoji…', cls: 'fcs-picker-search' });
    emojiSearchInput.addEventListener('input', () => { this._emojiSearch = emojiSearchInput.value.toLowerCase(); this._renderEmojis(); });

    // Emoji grid
    this._emojiGridEl = contentEl.createDiv({ cls: 'fcs-icon-picker-grid fcs-emoji-grid' });
    this._renderEmojis();

    // ── Lucide section ─────────────────────────────────────
    contentEl.createEl('h3', { text: 'Lucide icons', cls: 'fcs-picker-section-heading' });

    const lucideSearchWrap = contentEl.createDiv({ cls: 'fcs-picker-search-row' });
    const lucideSearchInput = lucideSearchWrap.createEl('input', { type: 'text', placeholder: 'folder, star, heart…', cls: 'fcs-picker-search' });
    lucideSearchInput.addEventListener('input', () => { this._lucideSearch = lucideSearchInput.value.toLowerCase(); this._renderLucide(); });

    this._lucideGridEl = contentEl.createDiv({ cls: 'fcs-icon-picker-grid' });
    this._renderLucide();

    new Setting(contentEl).addButton((btn) => btn.setButtonText('Cancel').onClick(() => this.close()));
  }

  _renderEmojis() {
    if (!this._emojiGridEl) return;
    this._emojiGridEl.empty();
    const filtered = EMOJI_DATA.filter(([emoji, name, cat]) => {
      const catMatch = this._emojiCategory === 'all' || cat === this._emojiCategory;
      const searchMatch = !this._emojiSearch || name.includes(this._emojiSearch) || emoji.includes(this._emojiSearch);
      return catMatch && searchMatch;
    });
    filtered.forEach(([emoji, name]) => {
      const btn = this._emojiGridEl.createDiv({ cls: 'fcs-icon-option fcs-emoji-option' });
      btn.textContent = emoji;
      btn.title = name;
      btn.addEventListener('click', () => { this.onSelect(emoji); this.close(); });
    });
    if (!filtered.length) this._emojiGridEl.createSpan({ text: 'No results', cls: 'fcs-picker-empty' });
  }

  _renderLucide() {
    if (!this._lucideGridEl) return;
    this._lucideGridEl.empty();
    const allIcons = (typeof getIconIds === 'function' ? getIconIds() : []);
    const filtered = this._lucideSearch ? allIcons.filter(id => id.includes(this._lucideSearch)) : allIcons;
    filtered.slice(0, 80).forEach(id => {
      const btn = this._lucideGridEl.createDiv({ cls: 'fcs-icon-option' });
      btn.title = id;
      try { setIcon(btn, id); } catch (_) { btn.textContent = id; }
      btn.addEventListener('click', () => { this.onSelect(`lucide:${id}`); this.close(); });
    });
    if (!filtered.length) this._lucideGridEl.createSpan({ text: 'No results', cls: 'fcs-picker-empty' });
  }

  onClose() { this.contentEl.empty(); }
}

class FolderIconOverrideModal extends Modal {
  constructor(plugin, path) {
    super(plugin.app);
    this.plugin = plugin;
    this.path = path;
    const existing = plugin.settings.folderIconOverrides?.[path];
    this.icon = existing?.icon || '';
    this.inherit = existing?.inherit || false;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl('h2', { text: 'Custom folder icon' });
    contentEl.createEl('p', { text: this.path, cls: 'fcs-folder-color-path' });
    const iconPreview = contentEl.createDiv({ cls: 'fcs-icon-preview' });
    this._renderPreview(iconPreview);
    let pickBtn;
    new Setting(contentEl).setName('Icon').setDesc('Emoji or Lucide icon for this folder.')
      .addButton((btn) => { pickBtn = btn; btn.setButtonText(this.icon ? 'Change icon…' : 'Pick icon…').onClick(() => {
        new IconPickerModal(this.app, this.icon, (val) => { this.icon = val; this._renderPreview(iconPreview); pickBtn.setButtonText('Change icon…'); }).open();
      }); });
    new Setting(contentEl).setName('Apply to folder contents').setDesc('Also applies this icon to subfolders inside this folder.')
      .addToggle((t) => t.setValue(this.inherit).onChange((v) => { this.inherit = v; }));
    const buttonRow = new Setting(contentEl)
      .addButton((btn) => btn.setButtonText('Cancel').onClick(() => this.close()))
      .addButton((btn) => btn.setButtonText('Save icon').setCta().onClick(async () => {
        if (!this.icon) return;
        this.plugin.settings.folderIconOverrides = this.plugin.settings.folderIconOverrides || {};
        this.plugin.settings.folderIconOverrides[this.path] = { icon: this.icon, inherit: this.inherit };
        await this.plugin.saveSettings();
        new Notice(`Folder Color System: icon saved for ${this.path}.`);
        this.close();
      }));
    if (this.plugin.settings.folderIconOverrides?.[this.path]) {
      buttonRow.addButton((btn) => btn.setButtonText('Remove icon').setWarning().onClick(async () => {
        delete this.plugin.settings.folderIconOverrides[this.path];
        await this.plugin.saveSettings();
        this.close();
      }));
    }
  }
  _renderPreview(el) {
    el.empty();
    if (!this.icon) { el.textContent = '(no icon selected)'; return; }
    const resolved = resolveOverrideIcon(this.icon);
    if (!resolved) return;
    if (resolved.type === 'emoji') el.textContent = resolved.value;
    else { try { setIcon(el, resolved.name); } catch (_) { el.textContent = resolved.name; } }
  }
  onClose() { this.contentEl.empty(); }
}

class FileColorOverrideModal extends Modal {
  constructor(plugin, path) {
    super(plugin.app);
    this.plugin = plugin;
    this.path = path;
    const existing = plugin.settings.fileColorOverrides?.[path];
    const parsed = parseColorOverride(existing);
    this.color = parsed.color || '#7f6aa8';
    this.noColor = parsed.noColor;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl('h2', { text: 'Custom file color' });
    contentEl.createEl('p', { text: this.path, cls: 'fcs-folder-color-path' });
    new Setting(contentEl).setName('Color').setDesc('Overrides the palette color for this file row.')
      .addColorPicker((p) => p.setValue(this.color).onChange((v) => { this.color = v; this.noColor = false; }));
    new Setting(contentEl).setName('No color for this file').setDesc('Removes all color from this file row.')
      .addToggle((t) => t.setValue(this.noColor).onChange((v) => { this.noColor = v; }));
    const buttonRow = new Setting(contentEl)
      .addButton((btn) => btn.setButtonText('Cancel').onClick(() => this.close()))
      .addButton((btn) => btn.setButtonText('Save').setCta().onClick(async () => {
        this.plugin.settings.fileColorOverrides = this.plugin.settings.fileColorOverrides || {};
        this.plugin.settings.fileColorOverrides[this.path] = this.noColor ? null : this.color;
        await this.plugin.saveSettings();
        this.close();
      }));
    if (Object.prototype.hasOwnProperty.call(this.plugin.settings.fileColorOverrides || {}, this.path)) {
      buttonRow.addButton((btn) => btn.setButtonText('Remove override').setWarning().onClick(async () => {
        delete this.plugin.settings.fileColorOverrides[this.path];
        await this.plugin.saveSettings();
        this.close();
      }));
    }
  }
  onClose() { this.contentEl.empty(); }
}

class FileIconOverrideModal extends Modal {
  constructor(plugin, path) {
    super(plugin.app);
    this.plugin = plugin;
    this.path = path;
    const existing = plugin.settings.fileIconOverrides?.[path];
    this.icon = (existing && typeof existing === 'object') ? (existing.icon || '') : '';
    this.hidden = existing === null;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl('h2', { text: 'Custom file icon' });
    contentEl.createEl('p', { text: this.path, cls: 'fcs-folder-color-path' });
    const iconPreview = contentEl.createDiv({ cls: 'fcs-icon-preview' });
    this._renderPreview(iconPreview);
    let pickBtn;
    new Setting(contentEl).setName('Icon').setDesc('Emoji or Lucide icon for this file. Overrides the global file icon setting.')
      .addButton((btn) => { pickBtn = btn; btn.setButtonText(this.icon ? 'Change icon…' : 'Pick icon…').onClick(() => {
        new IconPickerModal(this.app, this.icon, (val) => { this.icon = val; this.hidden = false; this._renderPreview(iconPreview); pickBtn.setButtonText('Change icon…'); }).open();
      }); });
    new Setting(contentEl).setName('Hide icon for this file').setDesc('Suppress the icon on this file row, even when file icons are enabled globally.')
      .addToggle((t) => t.setValue(this.hidden).onChange((v) => { this.hidden = v; }));
    const buttonRow = new Setting(contentEl)
      .addButton((btn) => btn.setButtonText('Cancel').onClick(() => this.close()))
      .addButton((btn) => btn.setButtonText('Save').setCta().onClick(async () => {
        this.plugin.settings.fileIconOverrides = this.plugin.settings.fileIconOverrides || {};
        if (this.hidden) { this.plugin.settings.fileIconOverrides[this.path] = null; }
        else if (this.icon) { this.plugin.settings.fileIconOverrides[this.path] = { icon: this.icon }; }
        else { delete this.plugin.settings.fileIconOverrides[this.path]; }
        await this.plugin.saveSettings();
        this.close();
      }));
    if (Object.prototype.hasOwnProperty.call(this.plugin.settings.fileIconOverrides || {}, this.path)) {
      buttonRow.addButton((btn) => btn.setButtonText('Remove override').setWarning().onClick(async () => {
        delete this.plugin.settings.fileIconOverrides[this.path];
        await this.plugin.saveSettings();
        this.close();
      }));
    }
  }
  _renderPreview(el) {
    el.empty();
    if (!this.icon) { el.textContent = '(no icon selected)'; return; }
    const resolved = resolveOverrideIcon(this.icon);
    if (!resolved) return;
    if (resolved.type === 'emoji') el.textContent = resolved.value;
    else { try { setIcon(el, resolved.name); } catch (_) { el.textContent = resolved.name; } }
  }
  onClose() { this.contentEl.empty(); }
}

class FolderTextColorOverrideModal extends Modal {
  constructor(plugin, path) {
    super(plugin.app);
    this.plugin = plugin;
    this.path = path;
    const existing = plugin.settings.folderTextColorOverrides?.[path];
    this.color = existing?.color || '#ffffff';
    this.inherit = existing?.inherit || false;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl('h2', { text: 'Custom folder text color' });
    contentEl.createEl('p', { text: this.path, cls: 'fcs-folder-color-path' });
    new Setting(contentEl).setName('Text color').setDesc('Overrides the text color for this folder name.')
      .addColorPicker((p) => p.setValue(this.color).onChange((v) => { this.color = v; }));
    new Setting(contentEl).setName('Apply to folder contents').setDesc('Also applies this text color to files and subfolders inside this folder.')
      .addToggle((t) => t.setValue(this.inherit).onChange((v) => { this.inherit = v; }));
    const buttonRow = new Setting(contentEl)
      .addButton((btn) => btn.setButtonText('Cancel').onClick(() => this.close()))
      .addButton((btn) => btn.setButtonText('Save').setCta().onClick(async () => {
        this.plugin.settings.folderTextColorOverrides = this.plugin.settings.folderTextColorOverrides || {};
        this.plugin.settings.folderTextColorOverrides[this.path] = { color: this.color, inherit: this.inherit };
        await this.plugin.saveSettings();
        this.close();
      }));
    if (Object.prototype.hasOwnProperty.call(this.plugin.settings.folderTextColorOverrides || {}, this.path)) {
      buttonRow.addButton((btn) => btn.setButtonText('Remove override').setWarning().onClick(async () => {
        delete this.plugin.settings.folderTextColorOverrides[this.path];
        await this.plugin.saveSettings();
        this.close();
      }));
    }
  }
  onClose() { this.contentEl.empty(); }
}

class FileTextColorOverrideModal extends Modal {
  constructor(plugin, path) {
    super(plugin.app);
    this.plugin = plugin;
    this.path = path;
    const existing = plugin.settings.fileTextColorOverrides?.[path];
    this.color = existing?.color || '#ffffff';
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl('h2', { text: 'Custom file text color' });
    contentEl.createEl('p', { text: this.path, cls: 'fcs-folder-color-path' });
    new Setting(contentEl).setName('Text color').setDesc('Overrides the text color for this file name.')
      .addColorPicker((p) => p.setValue(this.color).onChange((v) => { this.color = v; }));
    const buttonRow = new Setting(contentEl)
      .addButton((btn) => btn.setButtonText('Cancel').onClick(() => this.close()))
      .addButton((btn) => btn.setButtonText('Save').setCta().onClick(async () => {
        this.plugin.settings.fileTextColorOverrides = this.plugin.settings.fileTextColorOverrides || {};
        this.plugin.settings.fileTextColorOverrides[this.path] = { color: this.color };
        await this.plugin.saveSettings();
        this.close();
      }));
    if (Object.prototype.hasOwnProperty.call(this.plugin.settings.fileTextColorOverrides || {}, this.path)) {
      buttonRow.addButton((btn) => btn.setButtonText('Remove override').setWarning().onClick(async () => {
        delete this.plugin.settings.fileTextColorOverrides[this.path];
        await this.plugin.saveSettings();
        this.close();
      }));
    }
  }
  onClose() { this.contentEl.empty(); }
}

class NoColorOptionsModal extends Modal {
  constructor(app, plugin, path, currentOverride) {
    super(app);
    this.plugin = plugin;
    this.path = path;
    this.currentOverride = currentOverride;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl('h3', { text: 'No color options' });

    const parsed = parseColorOverride(this.currentOverride);
    let inherit = parsed.noColor ? (parsed.inherit !== false) : true;
    let keepBorder = parsed.keepBorder || false;

    new Setting(contentEl)
      .setName('Apply to folder contents')
      .setDesc('Remove color from all files and subfolders inside this folder.')
      .addToggle((t) => t.setValue(inherit).onChange((v) => { inherit = v; }));

    new Setting(contentEl)
      .setName('Keep border')
      .setDesc('Show folder border even with no background color.')
      .addToggle((t) => t.setValue(keepBorder).onChange((v) => { keepBorder = v; }));

    const buttonRow = new Setting(contentEl);
    buttonRow.addButton((btn) => btn.setButtonText('Save').setCta().onClick(async () => {
      await this.plugin.setFolderColorOverride(this.path, { noColor: true, inherit, keepBorder });
      this.plugin.refreshFolderColorOverrides();
      this.close();
    }));
    buttonRow.addButton((btn) => btn.setButtonText('Cancel').onClick(() => this.close()));
    if (parsed.noColor) {
      buttonRow.addButton((btn) => btn.setButtonText('Remove no-color').setWarning().onClick(async () => {
        try {
          if (this.plugin.settings.folderColorOverrides) {
            delete this.plugin.settings.folderColorOverrides[this.path];
          }
          await this.plugin.saveSettings();
          this.plugin.refreshFolderColorOverrides();
        } catch (e) { console.error('FolderColor: remove no-color error', e); }
        this.close();
      }));
    }
  }
  onClose() { this.contentEl.empty(); }
}

class FolderColorSystemSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
    this.controlResetUpdaters = new Map();
  }

  getSettingDefinitions() {
    // Settings may be re-rendered as conditional rows appear or disappear.
    // Keep only the controls from the current rendered definition set.
    this.controlResetUpdaters.clear();
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
          self.dropdownDef('Color Palette', 'Select the 12-color repeating palette.', 'palette', PALETTE_OPTIONS, ['palette', 'colors'], true),
          ...Array.from({ length: 12 }, (_, i) => [
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
        heading: 'Custom Icons',
        items: [
          {
            name: 'Custom icon slots',
            desc: 'Up to 12 reusable icons (emoji or Lucide) you can reference in other tools. Slots show here so you can manage them in one place.',
            searchTerms: ['custom icons', 'emoji icons', 'lucide icons'],
            render: (setting) => {
              setting.settingEl.style.flexDirection = 'column';
              setting.settingEl.style.alignItems = 'flex-start';
              setting.nameEl.style.marginBottom = '4px';
              setting.controlEl.style.flexWrap = 'wrap';
              setting.controlEl.style.gap = '8px';
              setting.controlEl.style.width = '100%';
              const customIcons = Array.isArray(self.plugin.settings.customIcons) ? self.plugin.settings.customIcons : DEFAULT_SETTINGS.customIcons.slice();
              Array.from({ length: 12 }, (_, i) => {
                const slot = setting.controlEl.createDiv({ cls: 'fcs-custom-icon-slot' });
                slot.style.cssText = 'display:flex;align-items:center;gap:6px;min-width:160px;';
                const label = slot.createSpan({ text: `${i + 1}:` });
                label.style.cssText = 'min-width:20px;font-size:12px;color:var(--text-muted);';
                const preview = slot.createSpan({ cls: 'fcs-icon-preview-small' });
                preview.style.cssText = 'min-width:24px;font-size:18px;display:flex;align-items:center;justify-content:center;';
                const renderPreview = () => {
                  preview.empty();
                  const val = self.plugin.settings.customIcons?.[i] || '';
                  if (!val) { preview.textContent = '—'; return; }
                  const resolved = resolveOverrideIcon(val);
                  if (resolved?.type === 'emoji') preview.textContent = resolved.value;
                  else if (resolved?.type === 'lucide') { try { setIcon(preview, resolved.name); } catch (_) { preview.textContent = resolved.name; } }
                };
                renderPreview();
                const editBtn = slot.createEl('button', { text: 'Edit', cls: 'mod-cta' });
                editBtn.style.cssText = 'font-size:11px;padding:2px 8px;';
                editBtn.addEventListener('click', () => {
                  new IconPickerModal(self.app, self.plugin.settings.customIcons?.[i] || '', async (val) => {
                    if (!Array.isArray(self.plugin.settings.customIcons)) self.plugin.settings.customIcons = DEFAULT_SETTINGS.customIcons.slice();
                    self.plugin.settings.customIcons[i] = val;
                    await self.plugin.saveSettings();
                    renderPreview();
                  }).open();
                });
                const clearBtn = slot.createEl('button', { text: '✕' });
                clearBtn.style.cssText = 'font-size:11px;padding:2px 6px;';
                clearBtn.addEventListener('click', async () => {
                  if (!Array.isArray(self.plugin.settings.customIcons)) self.plugin.settings.customIcons = DEFAULT_SETTINGS.customIcons.slice();
                  self.plugin.settings.customIcons[i] = '';
                  await self.plugin.saveSettings();
                  renderPreview();
                });
              });
            },
          },
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
          self.dropdownDef('Closed Folder Icon', 'Icon shown when a folder is closed. Default Arrow is a single right-pointing chevron. Set Emoji Override below to use an emoji instead.', 'folderIcon', ICON_OPTIONS, ['folder icon', 'closed icon']),
          self.textDef('Closed Folder Icon Emoji Override', 'Enter any emoji to use instead of the Lucide icon above. Leave empty to use the Lucide icon.', 'folderIconEmoji', ['folder emoji', 'folder icon emoji']),
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
          self.toggleDef('Show File Icons', 'Adds an icon to every file row.', 'showFileIcons', ['file icons', 'show icons']),
          self.dropdownDef('File Icon', 'Select a Lucide icon, or set Emoji Override below to use an emoji instead.', 'fileIcon', FILE_ICON_OPTIONS, ['file icon shape']),
          self.textDef('File Icon Emoji Override', 'Enter any emoji to use instead of the Lucide icon above. Leave empty to use the Lucide icon.', 'fileIconEmoji', ['file emoji', 'file icon emoji']),
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
          self.dropdownDef('Active File Icon', 'Select a Lucide icon, or set Emoji Override below to use an emoji instead.', 'activeIcon', ACTIVE_ICON_OPTIONS, ['selected file icon'], false, enabled('activeShowIcon')),
          self.textDef('Active File Icon Emoji Override', 'Enter any emoji to use for the active file icon. Leave empty to use the Lucide icon.', 'activeIconEmoji', ['active emoji', 'active icon emoji']),
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
                  self.syncRenderedControlsToDefaults();
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

  registerControlResetUpdater(key, updateControl) {
    if (typeof updateControl === 'function') {
      this.controlResetUpdaters.set(key, updateControl);
    }
  }

  syncRenderedControlsToDefaults() {
    for (const [key, updateControl] of this.controlResetUpdaters) {
      updateControl(this.getDefault(key));
    }
  }

  // Obsidian Mobile can retain the old visual value in the native control even
  // after the component's setValue() call succeeds. Update that element too so
  // the selected palette, slider position, color swatch, and other controls
  // immediately match the setting we just saved.
  syncNativeControl(setting, type, value) {
    const controlEl = setting?.controlEl;
    if (!controlEl) return;

    if (type === 'dropdown') {
      const select = controlEl.querySelector('select');
      if (select) select.value = String(value);
      return;
    }

    if (type === 'toggle') {
      const input = controlEl.querySelector('input[type="checkbox"]');
      if (input) input.checked = Boolean(value);
      return;
    }

    if (type === 'slider') {
      const input = controlEl.querySelector('input[type="range"]');
      if (input) input.value = String(value);
      return;
    }

    if (type === 'color') {
      const input = controlEl.querySelector('input[type="color"]');
      if (input) input.value = String(value);
      return;
    }

    const input = controlEl.querySelector('input:not([type="checkbox"]):not([type="range"]), textarea');
    if (input) input.value = String(value ?? '');
  }

  addResetButton(setting, key, updateControl) {
    this.registerControlResetUpdater(key, updateControl);
    setting.addExtraButton((button) => {
      button
        .setIcon('rotate-ccw')
        .setTooltip(`Reset ${setting.nameEl?.textContent || 'setting'} to default`)
        .onClick(async () => {
          const defaultValue = this.getDefault(key);
          this.setValue(key, defaultValue);
          await this.plugin.saveSettings();
          updateControl?.(defaultValue);
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
        let dropdownControl;
        setting.addDropdown((dropdown) => {
          dropdownControl = dropdown;
          for (const [value, label] of options) dropdown.addOption(value, label);
          dropdown.setValue(String(this.getValue(key)));
          dropdown.onChange(async (value) => {
            this.setValue(key, value);
            await this.plugin.saveSettings();
            if (refreshOnChange) this.refreshSettingsDom();
          });
        });
        this.addResetButton(setting, key, (value) => {
          dropdownControl?.setValue(String(value));
          this.syncNativeControl(setting, 'dropdown', value);
        });
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
        let toggleControl;
        setting.addToggle((toggle) => {
          toggleControl = toggle;
          toggle.setValue(Boolean(this.getValue(key)));
          toggle.onChange(async (value) => {
            this.setValue(key, value);
            await this.plugin.saveSettings();
            if (refreshOnChange) this.refreshSettingsDom();
          });
        });
        this.addResetButton(setting, key, (value) => {
          toggleControl?.setValue(Boolean(value));
          this.syncNativeControl(setting, 'toggle', value);
        });
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
        let sliderControl;
        setting.addSlider((slider) => {
          sliderControl = slider;
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
        this.addResetButton(setting, key, (value) => {
          sliderControl?.setValue(Number(value));
          valueEl?.setText(`${value}${suffix || ''}`);
          this.syncNativeControl(setting, 'slider', value);
        });
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
        let textControl;
        setting.addText((text) => {
          textControl = text;
          text.setValue(String(this.getValue(key) ?? ''));
          text.onChange(async (value) => {
            this.setValue(key, value || this.getDefault(key));
            await this.plugin.saveSettings();
          });
        });
        this.addResetButton(setting, key, (value) => {
          textControl?.setValue(String(value ?? ''));
          this.syncNativeControl(setting, 'text', value);
        });
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
        let colorControl;
        setting.addColorPicker((picker) => {
          colorControl = picker;
          picker.setValue(this.getValue(key) || this.getDefault(key));
          picker.onChange(async (value) => {
            this.setValue(key, value);
            await this.plugin.saveSettings();
          });
        });
        this.addResetButton(setting, key, (value) => {
          const nextValue = value || this.getDefault(key);
          colorControl?.setValue(nextValue);
          this.syncNativeControl(setting, 'color', nextValue);
        });
      },
    };
  }

  getPalettePath(path) {
    const match = /^(customColorsDark|customColorsLight|customIcons)\.(\d+)$/.exec(path);
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
