module.exports = {

  name: "Timeout Member MOD",
  section: "Member Control",

  subtitle(data, presets) {
    return `${presets.getMemberText(data.member, data.varName)}`;
  },

  meta: {
    version: '2.1.6',
    preciseCheck: false,
    author: '[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/English',
    downloadURL: 'https://github.com/DBM-Mods/English/archive/refs/heads/main.zip',
  },


  fields: ["opcao", "member", "varName", "tempo", "time", "reason"],

  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

    <member-input dropdownLabel="Member" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>

    <br><br><br><br>

    <div style="width: 30%;">
      <span class="dbminputlabel">Option</span>
      <select id="opcao" class="round" onchange="glob.change(this)">
        <option value="0" selected>Set punishment</option>
        <option value="1">Remove punishment</option>
      </select>
    </div>

    <br>
    
    <div id="campo1" style="float: left; width: 45%;">
      <span class="dbminputlabel">Time</span><br>
      <select id="tempo" class="round">
        <option value="0" selected>Seconds</option>
        <option value="1">Months</option>
        <option value="2">Hours</option>
        <option value="3">Days</option>
      </select>
    </div>
    <div id="campo2" style="float: right; width: 50%;">
      <span class="dbminputlabel">Amount</span><br>
      <input id="time" class="round" type="text">
    </div>

    <div id="campo3">
      <br><br><br>
    </div>
    
    <div style="padding-top: 16px;">
      <span class="dbminputlabel">Reason</span><br>
      <textarea id="reason" class="dbm_monospace" rows="5" placeholder="Enter reason here..." style="white-space: nowrap; resize: none;"></textarea>
    </div>`;
  },


  init() {
    glob.change = function(event) {
      if(event.value === "0") {
        document.getElementById("campo1").style.display = "block";
        document.getElementById("campo2").style.display = "block";
        document.getElementById("campo3").style.display = "block";
      } else {
        document.getElementById("campo1").style.display = "none";
        document.getElementById("campo2").style.display = "none";
        document.getElementById("campo3").style.display = "none";
      }
    }

    glob.change(document.getElementById("opcao"));
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const member = await this.getMemberFromData(data.member, data.varName, cache);
    const tempo = parseInt(data.tempo, 10);

    let time = this.evalMessage(data.time, cache);
    if(data.opcao === "0") {
      switch (tempo) {
        case 0: 
        time = time ? Date.now() + time * 1000 : null;
        break;
        case 1: 
        time = time ? Date.now() + time * 60000 : null;
        break;
        case 2:
        time = time ? Date.now() + time * 3600000 : null;
        break;
        case 3:
        time = time ? Date.now() + time * 86400000 : null;
        break;
        default:
        break;
      }
    } else {
      time = time ? Date.now() + 0 : null;
    }
    const reason = this.evalMessage(data.reason, cache);

    if (Array.isArray(member)) {
      this.callListFunc(member, "disableCommunicationUntil", [time, reason])
        .then(() => this.callNextAction(cache))
        .catch((err) => this.displayError(data, cache, err));
    } else if (member?.disableCommunicationUntil) {
      member.disableCommunicationUntil(time, reason)
        .then(() => this.callNextAction(cache))
        .catch((err) => this.displayError(data, cache, err));
    } else {
      this.callNextAction(cache);
    }
  },


  mod() {},
};
