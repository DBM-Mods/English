module.exports = {
  name: "Move Role MOD",
  section: "Role Control",
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/English',
    downloadURL: 'https://github.com/DBM-Mods/English/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    return `${presets.getRoleText(data.storage, data.varName)} move to position "${data.posicao}"`;
  },

  fields: ["storage", "varName", "posicao", "iffalse", "iffalseVal"],

  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

<role-input dropdownLabel="Role" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></role-input>
<br><br><br>

<span class="dbminputlabel">Position</span><br>
    <input id="posicao" class="round" value="0" type="text">
<br>
    <table>
    <tr>
    <td class="xin1"><span class="dbminputlabel">If not moved</span><br>
    <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
    <option value="0" selected>Continue Actions</option>
    <option value="1">Stop action sequence</option>
    <option value="2">Go to action</option>
    <option value="3">Skip next actions</option>
    <option value="4">Go to action anchor</option>
    </select></td>
    <td class="xin2"><div id="iffalseContainer" style="display: none; float: right; width: 100%;"><span id="xinelas" class="dbminputlabel">For</span><br><input id="iffalseVal" class="round" name="actionxinxyla" type="text"></div>
    </td>
    </tr>
    </table>

    <style>
    table{width:100%}
    .xin1{padding:0px 6px 20px 0px;width:50%}
    .xin2{padding:0px 0px 20px 0px;width:50%}
    </style>`;
  },


  init: function () {
    const { glob, document } = this;


    glob.onComparisonChanged = function (event) {
      if (event.value > "1") {
        document.getElementById("iffalseContainer").style.display = null;
      } else {
        document.getElementById("iffalseContainer").style.display = "none";
      }
      if (event.value == "2") {
        document.querySelector("[id='xinelas']").innerText = (`Action number`);
      }
      if (event.value == "3") {
        document.querySelector("[id='xinelas']").innerText = (`Skip Actions`);
      }
      if (event.value == "4") {
        document.querySelector("[id='xinelas']").innerText = (`Anchor name`);
    }
  }

    glob.onComparisonChanged(document.getElementById("iffalse"));
},


  async action(cache) {
    const data = cache.actions[cache.index];
    const role = await this.getRoleFromData(data.storage, data.varName, cache);
    const posicao = this.evalMessage(data.posicao, cache);
    let end

    try {
    await role.setPosition(posicao)
    } catch(err) {
    this.executeResults(false, data, cache);
    end = 2
    } 

    if(end !== 2){
    this.callNextAction(cache)}
  },


  mod() {},
};
