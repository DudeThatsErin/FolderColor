const { Plugin, PluginSettingTab, Setting } = require('obsidian');

const STYLE_SETTINGS_ID = 'obsidian-style-settings';

module.exports = class FolderColorSystemPlugin extends Plugin {
  async onload() {
    // Style Settings explicitly asks plugins with @settings blocks in styles.css
    // to trigger this event after the plugin loads.
    this.app.workspace.trigger('parse-style-settings');

    this.addSettingTab(new FolderColorSystemSettingTab(this.app, this));
  }
};

class FolderColorSystemSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Folder Color System' });
    containerEl.createEl('p', {
      text: 'All customization is handled by the Style Settings community plugin.'
    });

    new Setting(containerEl)
      .setName('Style Settings')
      .setDesc('Install or open Style Settings to customize palettes, inheritance, folder icons, icon colors, opacity, sizing, typography, and display mode.')
      .addButton((button) => {
        button
          .setButtonText('Get / Open Style Settings')
          .setCta()
          .onClick(() => {
            window.open(`obsidian://show-plugin?id=${STYLE_SETTINGS_ID}`);
          });
      });
  }
}
