module.exports = {

    name: 'Create Timestamp Discord MOD',
    section: 'Other Stuff',
    meta: {
      version: '2.1.5',
      preciseCheck: true,
      author: '[Tempest - 321400509326032897]',
      authorUrl: 'https://github.com/DBM-Mods/English',
      downloadURL: 'https://github.com/DBM-Mods/English/archive/refs/heads/main.zip',
    },


    subtitle: function(data) {
      const info = ['Short time','Too long','Short Date','Long date','Long date with short time','Long date with weekday and short time','Relative'];
      const prse = parseInt(data.saida);
      return `${info[prse]}`;
  },
  
    variableStorage(data, varType) {
      if (parseInt(data.storage, 10) !== varType) return;
      return [data.varName, 'Date'];
    },
  
    fields: ['date', 'saida', 'storage', 'varName'],
  
    html(_isEvent, data) {
      return `
      <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
    <div>
    <span class="dbminputlabel" style="padding-top: 8px;">Date</span><br>
    <input id="date" class="round"; style="width: 100%;" type="text" placeholder="Example: \${new Date}">
  </div>
  <br>
  <div>
    <span class="dbminputlabel">Output</span><br>
    <select id="saida" class="round">
      <option value="0" selected>Short time</option>
      <option value="1">Too long</option>
      <option value="2">Short date</option>
      <option value="3">Long date</option>
      <option value="4">Long date with short time</option>
      <option value="5">Long date with weekday and short time</option>
      <option value="6">Relative</option>
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
    <input id="varName" class="round" type="text">
  </div>`;
    },
  
    init() {
      const { glob, document } = this;
      glob.variableChange(document.getElementById('storage'), 'varNameContainer');
    },
  
    async action(cache) {
        const data = cache.actions[cache.index];
        const moment = require('moment');
        const saida = parseInt(data.saida, 10);
        
        var date = moment(Date.parse(this.evalMessage(data.date, cache))).format("X");

        if(date == "Invalid date") {
            console.error("Action Create Timestamp Discord: Invalid date format!");
            result = "Invalid date format!";
        } else {
            switch (saida) {
                    case 0:
                        result = "<t:" + date + ":t>";
                        break;
                    case 1:
                        result = "<t:" + date + ":T>";
                        break;
                    case 2:
                        result = "<t:" + date + ":d>";
                        break;
                    case 3:
                        result = "<t:" + date + ":D>";
                        break;
                    case 4:
                        result = "<t:" + date + ":f>";
                        break;
                    case 5:
                        result = "<t:" + date + ":F>";
                        break;
                    case 6:
                        result = "<t:" + date + ":R>";
                        break;
            }
        }

        const storage = parseInt(data.storage, 10);
        const varName = this.evalMessage(data.varName, cache);
        this.storeValue(result, storage, varName, cache);

      this.callNextAction(cache);
    },
  
    mod() {},
  };
