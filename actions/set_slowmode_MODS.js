module.exports = {
  name: 'Set Slowmode MOD',
  section: 'Channel Control',
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/English',
    downloadURL: 'https://github.com/DBM-Mods/English/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    return `${presets.getChannelText(data.Canal, data.varName)} : ${data.segundos} segundos`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage2, 10) !== varType) return;
    return [data.varName2, 'Channel'];
  },

  fields: ['Canal', 'varName', 'varName2', 'segundos', 'reason'],

  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

<div style="padding-top: 8px;">
<channel-input dropdownLabel="Channel" selectId="Canal" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>

  <div id="varNameContainer" style="display: none; padding-left: 5%; float: left; width: 65%;">
  <span class="dbminputlabel">Variable name</span><br>
    <input id="varName" class="round" type="text" list="variableList"><br>
  </div>
</div><br><br><br>
<div style="padding-top: 8px;">
  <div style="float: left; width: 100%;" padding-top: 16px;">
  <span class="dbminputlabel">Time in seconds</span><br>
    <input id="segundos" class="round" type="text" steps="5"><br>
    <span class="dbminputlabel">Reason</span><br>
    <input id="reason" class="round" type="text" placeholder="Optional"><br>
  </div>
</div>
  <div id="varNameContainer2" style="display: none; padding-left: 5%; float: left; width: 65%;">
  <span class="dbminputlabel">Variable name</span><br>
    <input id="varName2" class="round" type="text">
  </div>`;
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const channel = await this.getChannelFromData(data.Canal, data.varName, cache);
    const segundos = this.evalMessage(data.segundos, cache);
    const reason = this.evalMessage(data.reason, cache);
    channel.setRateLimitPerUser(segundos, reason);
    this.callNextAction(cache);
  },

  mod() {},
};
