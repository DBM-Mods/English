module.exports = {
  name: "Store interaction Info MOD",
  section: 'Other Stuff',
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/English',
    downloadURL: 'https://github.com/DBM-Mods/English/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    const info = [
      "Object of the interaction",
      "Interaction ID",
      "Author language",
      "Interaction type",
      "Interaction token",
      "Interaction channel",
      "Interaction channel ID",
      "Object > Interaction Options",
    ];
    return `${info[parseInt(data.info, 10)]}`;
  },


  variableStorage: function(data, varType) {
    const type = parseInt(data.storage);
    const prse2 = parseInt(data.info);
    const info2 = ['Object','ID', 'Language','Type','Token','Channel','Channel ID','Object > Options'];
    if(type !== varType) return;
    return ([data.varName2, info2[prse2]]);
},


  fields: ["info", "storage", "varName2"],

  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

    <div>
<div style="padding-top: 8px;">
	<span class="dbminputlabel">information</span><br>
	<select id="info" class="round">
  <option value="0 selected">Object of the interaction</option>
  <option value="1">Interaction ID</option>
  <option value="2">Author language</option>
  <option value="3">Interaction type</option>
  <option value="4">Interaction token</option>
  <option value="5">Interaction channelo</option>
  <option value="6">Interaction channel ID</option>
  <option value="7">Object > Interaction Options</option>
	</select>
</div>

<br>

<div style="float: left; width: 35%; padding-top: 8px;">
<span class="dbminputlabel">Store in</span><br>
		<select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
		${data.variables[0]}
		</select>
	</div>
	<div id="varNameContainer" style="float: right; display: none; width: 60%; padding-top: 8px;">
  <span class="dbminputlabel">Variable name</span><br>
		<input id="varName2" class="round" type="text">
	</div>`;
  },

  init: function() {
    const {glob, document} = this;
  
    glob.variableChange(document.getElementById('storage'), 'varNameContainer');
  },


  async action(cache) {
    const data = cache.actions[cache.index];
    const interaction = cache.interaction;
    const info = parseInt(data.info, 10);

    let result;
    switch (info) {
      case 0:
        result = interaction;
        break;
      case 1:
        result = interaction.id;
        break;
      case 2:
        result = interaction.locale;
        break;
      case 3:
        result = interaction.type;
        break;
        case 4:
        result = interaction.token;
        break;
        case 5:
        result = interaction.channel;
        break;
        case 6:
          result = interaction.channel.id;
          break;
        case 7:
        result = interaction.options._hoistedOptions;
        break;
      default:
        break;
    }
    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName2 = this.evalMessage(data.varName2, cache);
      this.storeValue(result, storage, varName2, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
