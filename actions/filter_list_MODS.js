module.exports = {
  name: 'Filter List MOD',
  section: 'Lists and Loops',
  meta: {
    version: '2.1.6',
    preciseCheck: false,
    author: '[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/English',
    downloadURL: 'https://github.com/DBM-Mods/English/archive/refs/heads/main.zip',
  },

  subtitle(data) {
    const opcao = [
      "Exists",
      "Equal to",
      "Exactly the same",
      "Less than",
      "Bigger then",
      "includes",
      "Regex Matches",
      "The length is greater than",
      "The length is less than",
      "The length is equal to",
      "Starts with",
      "Ends with",
      "greater than or equal to",
      "Less than or equal to",
      "Matches Full Regex",
      `Between ${data.value} and ${data.value2}`,
      "Do you have accents?",
      'Includes the words ["a" , "b" , "c"]',
      'Equals the words ["a" , "b" , "c"]',
      "Is it an even number?",
      "Is it an odd number?",
      "It's a number",
      "Is it a text?",
      "Is it a list?",
      "Is it an image URL?",
      "Is it a URL?"
    ]
    return `${opcao[data.type]}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage2, 10) !== varType) return;
    return ([data.varName2, "List"]);
  },

  fields: ['storage', 'varName', 'type', 'value', 'value2', 'storage2', 'varName2'],

  html(_isEvent, data) {
    return `
  <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 0.1</div>
  <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
  
  <retrieve-from-variable allowSlashParams dropdownLabel="Variable" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>

  <br><br><br>

  <div style="float: left; width: 30%; padding-top: 8px;">
    <span class="dbminputlabel">Filter</span><br>
    <select id="type" class="round" onchange="glob.change(this)">
    <option value="1" selected>Equals</option>
    <option value="2">Exactly the same</option>
    <option value="3">Less than</option>
    <option value="13">Less than or equal to</option>
    <option value="4">Greater than</option>
    <option value="12">Greater than or equal to</option>
    <option value="5">Includes</option>
    <option value="6">Matches Regex</option>
    <option value="14">Matches Full Regex</option>
    <option value="7">Length is greater than</option>
    <option value="8">Length is less than</option>
    <option value="9">Length is equal to</option>
    <option value="10">Starts with</option>
    <option value="11">Ends with</option>
    <option value="15">Between</option>
    <option value="16">Does it have accents?</option>
    <option value="17">Includes the words ["a" , "b" , "c"]</option>
    <option value="18">Equals the words ["a" , "b" , "c"]</option>
    <option value="19">Is it an even number?</option>
    <option value="20">Is it an odd number?</option>
    <option value="21">Is it a number?</option>
    <option value="24">Is it text?</option>
    <option value="22">Is it a list?</option>
    <option value="23">Is this an image URL?</option>
    <option value="25">Is it a URL?</option>
    </select>
  </div>

  <div id="valueDiv" style="float: left; width: 70%; padding-left: 18px;">
    <span class="dbminputlabel">Value to filter</span><br>
    <input id="value" class="round" type="text">
  </div>

  <div id="valueDiv2" style="float: left; width: 35%; padding-left: 18px;">
    <span class="dbminputlabel">AND</span><br>
    <input id="value2" class="round" type="text">
  </div>

  <br><br><br>

  <div style="float: left; width: 35%; padding-top: 8px;">
    <span class="dbminputlabel">Store in</span><br>
    <select id="storage2" class="round">
      ${data.variables[1]}
    </select>
  </div>

  <div id="varNameContainer2" style="float: right; width: 60%; padding-top: 8px;">
    <span class="dbminputlabel">Variable Name</span><br>
    <input id="varName2" class="round" type="text"><br>
  </div><br><br><br>
</div>`;
  },

  init() {
    glob.change = function(event) {
      if(event.value == "0" || event.value == "16" || event.value == "19" || event.value == "20" || event.value == "21" || event.value == "24" || event.value == "22" || event.value == "23" || event.value == "25") {
        document.getElementById("valueDiv").style.display = "none";
        document.getElementById("valueDiv").style.width = "70%";
        document.getElementById("valueDiv2").style.display = "none";
      } else if(event.value == "15") {
        document.getElementById("valueDiv").style.width = "35%";
        document.getElementById("valueDiv2").style.display = "block";
        document.getElementById("valueDiv2").style.display = "block";
      } else {
        document.getElementById("valueDiv").style.display = "block";
        document.getElementById("valueDiv").style.width = "70%";
        document.getElementById("valueDiv2").style.display = "none";
      }
    };

    glob.change(document.getElementById("type"));
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const variable = this.getVariable(storage, varName, cache);
    const value = this.evalMessage(data.value, cache);

      switch (parseInt(data.type, 10)) {
        case 0:
          result = variable.filter((item) => item !== undefined);
          break;
        case 1:
          result = variable.filter((item) => item == value);
          break;
        case 2:
          result = variable.filter((item) => item === value);
          break;
        case 3:
          result = variable.filter((item) => item < value);
          break;
        case 4:
          result = variable.filter((item) => item > value);
          break;
        case 5:
          result = variable.filter((item) => item.toString().includes(value));
          break;
        case 6:
          result = variable.filter((item) => item.toString().match(new RegExp('^' + value + '$', 'i')));
          break;
        case 7:
          result = variable.filter((item) => item.length > value);
          break;
        case 8:
          result = variable.filter((item) => item.length < value);
          break;
        case 9:
          result = variable.filter((item) => item.length == value);
          break;
        case 10:
          result = variable.filter((item) => item.toString().startsWith(value));
          break;
        case 11:
          result = variable.filter((item) => item.toString().endsWith(value));
          break;
        case 12:
          result = variable.filter((item) => item >= value);
          break;
        case 13:
          result = variable.filter((item) => item <= value);
          break;
        case 14:
          result = variable.filter((item) => item.toString().match(new RegExp(value)));
          break;
        case 15:
          const value2 = this.evalMessage(data.value2, cache);
          result = variable.filter((item) => item >= value && item <= value2);
          break;
        case 16:
          const conditions = ["Ä","Å","Á","Â","À","Ã","Ā","Ă","Ą","ā","ă","ą","ä","á","â","à","ã","É","Ê","Ë","È","Ė","Ę","Ě","Ĕ","Ē","ė","ę","ě","ĕ","ē","é","ê","ë","è","Í","Î","Ï","Ì","İ","Į","Ī","ı","į","ī","í","î","ï","ì","Ö","Ó","Ô","Ò","Õ","Ő","Ō","ő","ō","ö","ó","ô","ò","õ","Ü","Ú","Û","Ų","Ű","Ů","Ū","ų","ű","ů","ū","ü","ú","û","ù","Ç","Ć","Č","ç","ć","č","Ñ","Ň","Ņ","Ń","ñ","ň","ņ","ń","Ÿ","Ý","ý","Ź","Ż","Ž","ź","ż","ž","Ł","Ľ","Ļ","Ĺ","ł","ľ","ĺ","Ķ","ķ","Ģ","Ğ","ģ","ğ","Ď","ď","Ś","Š","Ş","ś","š","ş","Ť","Ț","Ţ","ť","ț","ţ","Ŕ","Ř","ŕ","ř"]
          result = variable.filter((item) => conditions.some(el => item.toString().includes(el)));
          break;
        case 17:
          const conditionsX = [...value];
          result = variable.filter((item) => conditionsX.some(els => item.toString().includes(els)));
          break;
        case 18:
          const conditionsZ = [...value];
          result = variable.filter((item) => conditionsZ.some(elz => item == (elz)));
          break;
        case 19:
          result = variable.filter((item) => item % 2 == 0);
          break;
        case 20:
          result = variable.filter((item) => item % 2 == 1);
          break;
        case 21:
          result = variable.filter((item) => isNaN(parseFloat(item.toString().replace(",", "."))) == false);
          break;
        case 22:
          result = variable.filter((item) => Array.isArray(item) == true);
          break;
        case 23:
          const isImageUrl = require('is-image-url');
          result = variable.filter((item) => isImageUrl(item.toString()) == true);
          break;
        case 24:
          result = variable.filter((item) => Boolean(typeof item === "string") == true);
          break;
        case 25:
          const isUrl = require("is-url");
          result = variable.filter((item) => isUrl(item.toString()) == true);
          break;
      }

    if (result !== undefined) {
      const storage2 = parseInt(data.storage2, 10);
      const varName2 = this.evalMessage(data.varName2, cache);
      this.storeValue(result, storage2, varName2, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
