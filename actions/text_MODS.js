module.exports = {
  name: 'Text MOD',
  section: 'Other Stuff',
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/English',
    downloadURL: 'https://github.com/DBM-Mods/English/archive/refs/heads/main.zip',
    },

  subtitle(data) {
    return `<font color="${data.color}">${data.text}</font>`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'String'];
  },

  fields: ['text', 'color', 'storage', 'varName'],

  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 0.2</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

    <div style="padding-top: 3px;">
<span class="dbminputlabel">Text</span>
		  <textarea id="text"rows="6" placeholder="Enter text here..." style="width: 99%; font-family: monospace; white-space: nowrap;"></textarea>
	  </div>
	  <div><br>
		  <div style="padding-top: 8px;">
      <div style="width: 24%">
      <span class="dbminputlabel">Color</span><br><input type="color" class="round" id="color">
      </div><br>
		  <div style="float: left; width: 35%;">
		  <span class="dbminputlabel">Store in</span><br>
			  <select id="storage" class="round">
				  ${data.variables[1]}
			  </select>
		  </div>
		  <div id="varNameContainer" style="float: right; width: 60%;">
      <span class="dbminputlabel">Variable name</span><br>
			  <input id="varName" class="round" type="text">
		  </div>
	  </div>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const text = this.evalMessage(data.text, cache);

    if (text !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(text, storage, varName, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
