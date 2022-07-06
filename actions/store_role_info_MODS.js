module.exports = {


  name: "Store Role Info MOD",
  section: "Role Control",
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/English',
    downloadURL: 'https://github.com/DBM-Mods/English/archive/refs/heads/main.zip',
    },

  subtitle(data, presets) {
    const info = [
      "Role Object",
      "Role ID",
      "Role Name",
      "Role Color",
      "Role Position",
      "Role Timestamp",
      "Role Is Mentionable?",
      "Role Is Separate?",
      "Role Is Manageable?",
      "Role Members List",
      "Role Created at",
      "Role Permissions",
      "Role Members Amount",
      "Role Icon",
      "Role Tag",
      "Role Server",
      "Role Server ID",
      "Role Is Editable?",
      "Role Members List ID",
    ];
    return `${presets.getRoleText(data.role, data.varName)} - ${info[parseInt(data.info, 10)]} to (${data.varName2})`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Unknown Type";
    switch (info) {
      case 0:
        dataType = "Role";
        break;
      case 1:
        dataType = "Role ID";
        break;
      case 2:
        dataType = "Text";
        break;
      case 3:
        dataType = "Color";
        break;
      case 4:
        dataType = "Number";
        break;
      case 5:
        dataType = "Timestamp";
        break;
      case 6:
      case 7:
        dataType = "Boolean";
        break;
      case 8:
        dataType = "Boolean";
        break;
      case 9:
        dataType = "Member List";
        break;
      case 10:
        dataType = "Date";
        break;
      case 11:
      case 12:
        dataType = "Number";
        break;
      case 13:
        dataType = "Image URL";
        break;
      case 14:
        dataType = "Object";
        break;
      case 15:
        dataType = "Server";
        break;
      case 16:
        dataType = "Server ID";
        break;
      case 17:
        dataType = "Boolean";
        break;
      case 18:
        dataType = "List";
        break;
    }
    return [data.varName2, dataType];
  },


  fields: ["role", "varName", "info", "storage", "varName2"],


  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 0.4</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
<role-input dropdownLabel="Source Role" selectId="role" variableContainerId="varNameContainer" variableInputId="varName"></role-input>
<br><br><br>
<div style="padding-top: 8px;">
	<span class="dbminputlabel">Information</span><br>
	<select id="info" class="round">
    <optgroup label="Role Information">
		<option value="0" selected>Role - Object</option>
		<option value="1">Role ID</option>
		<option value="2">Role Name</option>
		<option value="3">Role Color</option>
		<option value="4">Role Position</option>
    <option value="14">Role Tag</option>
    <option value="13">Role Icon</option>
    <option value="12">Role Members Amount</option>
    </optgroup>
    <optgroup label="Role Conditions">
		<option value="6">Role Is Mentionable?</option>
		<option value="17">Role Is Editable?</option>
    <option value="7">Role Is Separate?</option>
    <option value="8">Role Is Manageable?</option>
    </optgroup>
    <optgroup label="Role Dates">
		<option value="5">Role Timestamp</option>
    <option value="10">Role Created at</option>
    </optgroup>
    <optgroup label="Information">
    <option value="15">Role Server</option>
    <option value="16">Role Server ID</option>
    </optgroup>
    <optgroup label="Role Information in Lists">
    <option value="9">Role Members List</option>
    <option value="18">Role Members List ID</option>
    <option value="11">Role Permissions</option>
    </optgroup>
	</select>
</div>
<br>
<store-in-variable dropdownLabel="Store in" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
  },



  init() {},


  async action(cache) {
    const data = cache.actions[cache.index];
    const targetRole = await this.getRoleFromData(data.role, data.varName, cache);
    const info = parseInt(data.info, 10);
    if (!targetRole) {
      this.callNextAction(cache);
      return;
    }
    let result;
    switch (info) {
      case 0:
        result = targetRole;
        break;
      case 1:
        result = targetRole.id;
        break;
      case 2:
        result = targetRole.name;
        break;
      case 3:
        result = targetRole.hexColor;
        break;
      case 4:
        result = targetRole.position;
        break;
      case 5:
        result = targetRole.createdTimestamp;
        break;
      case 6:
        result = targetRole.mentionable;
        break;
      case 7:
        result = targetRole.hoist;
        break;
      case 8:
        result = targetRole.managed;
        break;
      case 9:
        result = [...targetRole.members.values()];
        break;
      case 10:
        result = targetRole.createdAt;
        break;
      case 11:
        result = targetRole.permissions.toArray().join(', ').replace(/_/g, ' ').toLowerCase();
        break;
      case 12:
        result = targetRole.members.size;
        break;
      case 13:
        result = targetRole.iconURL({ dynamic: true, format: "png", size: 4096 });
        break;
      case 14:
        result = targetRole.tags;
        break;
      case 15:
        result = targetRole.guild;
        break;
      case 16:
        result = targetRole.guild.id;
        break;
      case 17:
        result = targetRole.editable;
        break;
      case 18:
        result = [...targetRole.members.keys()];
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