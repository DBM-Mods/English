module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Send Message",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Messaging",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    let text = "";
    if (data.message) {
      text = `"${data.message.replace(/[\n\r]+/, " ↲ ")}"`;
    } else if (data.embeds?.length > 0) {
      text = `${data.embeds.length} Embeds`;
    } else if (data.attachments?.length > 0) {
      text = `${data.attachments.length} Attachments`;
    } else if (data.buttons?.length > 0 || data.selectMenus?.length > 0) {
      text = `${data.buttons.length} Buttons and ${data.selectMenus.length} Selects`;
    } else if (data.editMessage && data.editMessage !== "0") {
      if (data.editMessage === "intUpdate") {
        text = "Message Options -  Edit Interaction"
      } else {
        text = `Message Options - ${presets.getVariableText(data.editMessage, data.editMessageVarName)}`;
      }
    } else {
      text = `Nothing (might cause error)`;
    }
    if (data.dontSend) {
      return `Store Data: ${text}`;
    }
    if (data.descriptioncolor == undefined) {
      data.descriptioncolor = "#ffffff"
    }
    if (data.storagewebhook > "0") {
      return `Send Webhook: ${data.varwebhook}`;
    }
    return data.description
      ? `<font color="${data.descriptioncolor}">${data.description}</font>`
      : `<font color="${data.descriptioncolor}">${presets.getSendReplyTargetText(data.channel, data.varName)}: ${text}</font>`
  },

  //---------------------------------------------------------------------
  // Action Storage Function
  //
  // Stores the relevant variable info for the editor.
  //---------------------------------------------------------------------

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName2, data.dontSend ? "Message Options" : "Message"];
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  //
  // Helps check for updates and provides info if a custom mod.
  // If this is a third-party mod, please set "author" and "authorUrl".
  //
  // It's highly recommended "preciseCheck" is set to false for third-party mods.
  // This will make it so the patch version (0.0.X) is not checked.
  //---------------------------------------------------------------------

  meta: {
    version: "2.1.6",
    preciseCheck: false,
    author: "[Modified por XinXyla - 172782058396057602]<br>[Tempest - 321400509326032897]",
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/English/archive/refs/heads/main.zip',
  },

  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action. These fields are customized
  // by creating elements with corresponding IDs in the HTML. These
  // are also the names of the fields stored in the action's JSON data.
  //---------------------------------------------------------------------

  fields: [
    "channel",
    "varName",
    "message",
    "buttons",
    "selectMenus",
    "attachments",
    "embeds",
    "reply",
    "ephemeral",
    "tts",
    "overwrite",
    "dontSend",
    "editMessage",
    "editMessageVarName",
    "storage",
    "varName2",
    "iffalse",
    "iffalseVal",
    "descriptioncolor",
    "description",
    "storagewebhook",
    "varwebhook",
    "webhookname",
    "webhookavatar",
    "messageoff",
    "mentions",
  ],

  //---------------------------------------------------------------------
  // Command HTML
  //
  // This function returns a string containing the HTML used for
  // editing actions.
  //
  // The "isEvent" parameter will be true if this action is being used
  // for an event. Due to their nature, events lack certain information,
  // so edit the HTML to reflect this.
  //---------------------------------------------------------------------

  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 2.0</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

    <div style="width:100%" id="xin2"><send-reply-target-input dropdownLabel="Send to" selectId="channel" variableInputId="varName"></send-reply-target-input>
    <br><br><br>
</div><div id="xin3"><div style="float: left; width: 35%">
<span class="dbminputlabel">Send to</span><br>
<select class="round">
<option value="0" selected>Webhook</option>
</select>
</div>
<br><br><br>
</div>
<div style="width:100%">
<tab-system style="margin-top: 20px;">


  <tab label="Text" icon="align left">
    <div style="padding: 8px;">
      <textarea id="message" class="dbm_monospace" rows="9" placeholder="Insert message here..." style="height: calc(100vh - 309px); white-space: nowrap;"></textarea>
    </div>
  </tab>


  <tab label="Embeds" icon="book image">
    <div style="padding: 8px;">

      <dialog-list id="embeds" fields='["title", "url", "color", "colorrandom", "timestamp", "timestampper", "imageUrl", "thumbUrl", "description", "fields", "author", "authorUrl", "authorIcon", "footerText", "footerIconUrl"]' dialogTitle="Embed Info" dialogWidth="540" dialogHeight="460" listLabel="Embeds" listStyle="height: calc(100vh - 350px);" itemName="Embed" itemCols="1" itemHeight="30px;" itemTextFunction="data.title + ' - ' + data.description" itemStyle="text-align: left; line-height: 30px;">
        <div style="padding: 16px 16px 0px 16px;">

          <tab-system>

            <tab label="General" icon="certificate">
              <div style="padding: 8px">
                <div style="float: left; width: calc(50% - 12px);">
                  <span class="dbminputlabel">Title</span><br>
                  <input id="title" class="round" type="text">

                  <br>

                  <span class="dbminputlabel">Cor</span><div style="float:right;margin-top:-5px"><dbm-checkbox id="colorrandom" label="Random"></dbm-checkbox></div><br>
                  <table style="width:100%"><tr><td><input id="color" name="actionxinxyla" class="round" type="text" placeholder="Leave blank for default..."><td>
                  <td style="width:40px;text-align:center;padding:4px"><a id="btr1" style="cursor:pointer" onclick="(function(){
                     document.getElementById('color').type = 'color'
                    document.getElementById('btr1').style.display = 'none';
                    document.getElementById('btr2').style.display = 'block';
                    })()"><button class="tiny compact ui icon button">Color</button></a><a id="btr2" style="cursor:pointer;display:none" onclick="(function(){
                      document.getElementById('color').type = 'text';
                      document.getElementById('btr1').style.display = 'block';
                      document.getElementById('btr2').style.display = 'none';
                      })()"><button class="tiny compact ui icon button">Text</button></a><td></tr></table>
                </div>
                
                

                <div style="float: right; width: calc(50% - 12px);">
                  <span class="dbminputlabel">URL</span><br>
                  <input id="url" class="round" type="text" placeholder="Leave blank for none...">

                  <br>

                  <span class="dbminputlabel">Timestamp</span><div style="float:right;margin-top:-5px"><dbm-checkbox id="timestamp" label="Yes" checked></dbm-checkbox></div><br>
                  <input id="timestampper" class="round" type="text" placeholder="Leave blank for current">
                </div>

                <br><br><br><br><br><br><br>

                <hr class="subtlebar">

                <br>

                <span class="dbminputlabel">Imagem URL / Attachment name</span><br>
                <input id="imageUrl" class="round" type="text" placeholder="Leave blank for none, image.png or an http link">

                <br>

                <span class="dbminputlabel">Thumbnail URL / Attachment name</span><br>
                <input id="thumbUrl" class="round" type="text" placeholder="Leave blank for none, image.png or an http link">
              </div>
            </tab>

            <tab label="Description" icon="file image">
              <div style="padding: 8px">
                <textarea id="description" class="dbm_monospace" rows="10" placeholder="Enter description here..." style="height: calc(100vh - 149px); white-space: nowrap; resize: none;"></textarea>
                </div>
            </tab>

            <tab label="Fields" icon="list">
              <div style="padding: 8px">
                <dialog-list id="fields" fields='["name", "value", "inline", "val1", "val2", "comparar", "formula"]' dialogTitle="Field Info" dialogWidth="540" dialogHeight="500" listLabel="Fields" listStyle="height: calc(100vh - 190px);" itemName="Field" itemCols="1" itemHeight="30px;" itemTextFunction="data.name + '<br>' + data.value" itemStyle="text-align: left; line-height: 30px;">
                  <div style="padding: 16px;">
                  

                  <div style="padding-top: 8px;">

                  <table style="width:100%"><tr><td>
                    <span class="dbminputlabel">Value A</span><br>
                    <input id="val1" class="round" type="text">
                    </td>
                    <td>
                    <span class="dbminputlabel">Comparator</span><br>
                    <select id="comparar" class="round">
                    <option value="0">Value A - Exists</option>
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
                    <option value="16">Value A has accents?</option>
                    <option value="17">Includes the words ["a" , "b" , "c"]</option>
                    <option value="18">Equals the words ["a" , "b" , "c"]</option>
                    <option value="19">Is Value A an even number?</option>
                    <option value="20">Is Value A an odd number?</option>
                    <option value="21">Is Value A a number?</option>
                    <option value="24">Is Value A a text?</option>
                    <option value="23">Is Value A an image URL?</option>
                    <option value="25">Is Value A a URL?</option>
                  </select>
                   </td>
                    <td>
                    <span class="dbminputlabel">Value B</span><br>
                    <input id="val2" class="round" type="text">
                    </td>
                    </tr></table>

                  <br>
                  <span class="dbminputlabel">Display</span><br>
                  <select id="formula" class="round">
                  <option value="0" selected>Always display the field</option>
                  <option value="1">Display field only if false</option>
                  <option value="2">Display field only if true</option>
                </select>

                    </div>
   
                <br>

                    <div style="float: left; width: calc(50% - 12px);">
                      <span class="dbminputlabel">Field Name</span><br>
                      <input id="name" class="round" type="text">
                    </div>
                    
                    <div style="float: right; width: calc(50% - 12px);">
                      <span class="dbminputlabel">In line?</span><br>
                      <select id="inline" class="round">
                        <option value="true">Yes</option>
                        <option value="false" selected>No</option>
                      </select>
                    </div>

                    <br><br><br>

                    <span class="dbminputlabel">Field Valor</span><br>
                    <textarea id="value" class="dbm_monospace" rows="7" placeholder="Enter Field text here..." style="height: calc(100vh - 320px); white-space: nowrap;"></textarea>

                  </div>
                </dialog-list>
              </div>
            </tab>

            <tab label="Autor" icon="user circle">
              <div style="padding: 8px">
                <span class="dbminputlabel">Author Text</span><br>
                <input id="author" class="round" type="text" placeholder="Leave blank for none....">

                <br>

                <span class="dbminputlabel">Author URL</span><br>
                <input id="authorUrl" class="round" type="text" placeholder="Leave blank for none...">

                <br>

                <span class="dbminputlabel">Author Icon URL</span><br>
                <input id="authorIcon" class="round" type="text" placeholder="Leave blank for none...">
              </div>
            </tab>

            <tab label="Footer" icon="map outline">
              <div style="padding: 8px;">
                <span class="dbminputlabel">Footer Icon URL</span><br>
                <input id="footerIconUrl" class="round" type="text" placeholder="Leave blank for none...">

                <br>

                <span class="dbminputlabel">Footer Text</span><br>
                <textarea id="footerText" class="dbm_monospace" rows="10" placeholder="Leave blank for none..." style="height: calc(100vh - 234px); white-space: nowrap; resize: none;"></textarea>
              </div>
            </tab>

          </tab-system>

        </div>
      </dialog-list>

    </div>
  </tab>

  <tab label="Buttons" icon="clone">
  <div style="padding: 16px;text-align:center"id="xin4n">Webhook does not support Buttons</div>
    <div style="padding: 8px;" id="xin4">

      <dialog-list id="buttons" fields='["name", "typeper", "type", "id", "row", "url", "emoji", "disabled", "mode", "time", "actions"]' dialogTitle="Button Info" dialogWidth="600" dialogHeight="700" listLabel="Buttons" listStyle="height: calc(100vh - 350px);" itemName="Button" itemCols="4" itemHeight="40px;" itemTextFunction="data.name" itemStyle="text-align: center; line-height: 40px;">
        <div style="padding: 16px;">
          <div style="width: calc(50%); float: left;">
            <span class="dbminputlabel">Name</span>
            <input id="name" class="round" type="text">

            <br>

          <table style="width:100%"><tr><td id="bxin1">
            <span class="dbminputlabel">Type / Menu</span><div style="float:right;margin-top:-5px"><a style="cursor:pointer" onclick="(function(){
              document.getElementById('bxin1').style.display = 'none';
              document.getElementById('bxin2').style.display = 'block';
             })()"><button class="tiny compact ui icon button">Text</button></a></div><br>
            <select id="type" class="round">
              <option value="PRIMARY" selected>PRIMARY (Blurple)</option>
              <option value="SECONDARY">SECONDARY (Grey)</option>
              <option value="SUCCESS">SUCCESS (Green)</option>
              <option value="DANGER">DANGER (Red)</option>
              <option value="LINK">LINK (Grey)</option>
            </select></td><td id="bxin2" style="display:none"><span class="dbminputlabel">Type / Variable</span><div style="float:right;margin-top:-5px"><a style="cursor:pointer" onclick="(function(){
              document.getElementById('bxin2').style.display = 'none';
              document.getElementById('bxin1').style.display = 'block';
               })()"><button class="tiny compact ui icon button">Selects</button></a></div><br><input placeholder="Leave blank to use the menu" id="typeper" class="round" type="text"></td></tr></table>


            <br>

            <span class="dbminputlabel">Link URL</span>
            <input id="url" placeholder="Leave blank for none..." class="round" type="text">

            <br>

            <span class="dbminputlabel">
            Action response mode
              <help-icon type="ACTION_RESPONSE_MODE"></help-icon>
            </span><br>
            <select id="mode" class="round">
              <option value="PERSONAL">Once, Command User Only</option>
              <option value="PUBLIC">Once, Anyone Can Use</option>
              <option value="MULTIPERSONAL">Multi, Command User Only</option>
              <option value="MULTI" selected>Multi, Anyone Can Use</option>
              <option value="PERSISTENT">Persistent</option>
            </select>
          </div>
          <div style="width: calc(50% - 12px); float: right;">
            <span class="dbminputlabel">Unique ID</span>
            <input id="id" placeholder="Deixe em branco para gerar automaticamente..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Action Row (1 - 5)</span>
            <input id="row" placeholder="Leave blank for default..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Emoji</span>
            <input id="emoji" placeholder="Leave blank for none..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Temporary Time-Limit (Miliseconds)</span>
            <input id="time" placeholder="60000" class="round" type="text">
          </div>

          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

          <action-list-input mode="BUTTON" id="actions" height="calc(100vh - 460px)"></action-list-input>

        </div>
      </dialog-list>

    </div>
  </tab>


  <tab label="Selects" icon="list alternate">
  <div style="padding: 16px;text-align:center"id="xin5n">Webhook does not support Selects</div>
    <div style="padding: 8px;" id="xin5">

      <dialog-list id="selectMenus" fields='["placeholder", "id", "tempVarName", "row", "min", "max", "mode", "time", "options", "actions"]' dialogTitle="Select Menu Info" dialogWidth="800" dialogHeight="700" listLabel="Selects" listStyle="height: calc(100vh - 350px);" itemName="Select Menu" itemCols="1" itemHeight="40px;" itemTextFunction="data.placeholder + '<br>' + data.options" itemStyle="text-align: left; line-height: 40px;">
        <div style="padding: 16px;">
          <div style="width: calc(33% - 16px); float: left; margin-right: 16px;">
            <span class="dbminputlabel">Placeholder</span>
            <input id="placeholder" class="round" type="text">

            <br>

            <span class="dbminputlabel">Temp Variable Name</span>
            <input id="tempVarName" placeholder="Stores the selected value..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Minimum Select Number</span>
            <input id="min" class="round" type="text" value="1">

            <br>

            <span class="dbminputlabel">
            Action Response Mode
              <help-icon type="ACTION_RESPONSE_MODE"></help-icon>
            </span><br>
            <select id="mode" class="round">
            <option value="PERSONAL">Once, Command User Only</option>
            <option value="PUBLIC">Once, Anyone Can Use</option>
            <option value="MULTIPERSONAL">Multi, Command User Only</option>
            <option value="MULTI" selected>Multi, Anyone Can Use</option>
            <option value="PERSISTENT">Persistent</option>
            </select>
          </div>
          <div style="width: calc(33% - 16px); float: left; margin-right: 16px;">
            <span class="dbminputlabel">Unique ID</span>
            <input id="id" placeholder="Leave blank to auto-generate..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Action Row (1 - 5)</span>
            <input id="row" placeholder="Leave blank for default..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Maximum Select Number</span>
            <input id="max" class="round" type="text" value="1">

            <br>

            <span class="dbminputlabel">Temporary Time-Limit (Miliseconds)</span>
            <input id="time" placeholder="60000" class="round" type="text">
          </div>
          <div style="width: calc(34% - 8px); height: 300px; float: left; margin-left: 8px;">

            <dialog-list id="options" fields='["label", "description", "value", "emoji", "default"]' dialogTitle="Select Menu Option Info" dialogWidth="360" dialogHeight="440" listLabel="Options" listStyle="height: 210px;" itemName="Option" itemCols="1" itemHeight="20px;" itemTextFunction="data.label" itemStyle="text-align: left; line-height: 20px;">
              <div style="padding: 16px;">
                <span class="dbminputlabel">Name</span>
                <input id="label" class="round" type="text">

                <br>

                <span class="dbminputlabel">Description</span>
                <input id="description" class="round" type="text">

                <br>

                <span class="dbminputlabel">Value</span>
                <input id="value" placeholder="The text passed to the temp variable..." class="round" type="text">

                <br>

                <span class="dbminputlabel">Emoji</span>
                <input id="emoji" placeholder="Leave blank for none..." class="round" type="text">

                <br>

                <span class="dbminputlabel">Default Selected</span><br>
                <select id="default" class="round">
                  <option value="true">Yes</option>
                  <option value="false" selected>No</option>
                </select>
              </div>
            </dialog-list>

          </div>

          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

          <action-list-input mode="SELECT" id="actions" height="calc(100vh - 460px)">
            <script class="setupTempVars">
              const elem = document.getElementById("tempVarName");
              if(elem?.value) {
                tempVars.push([elem.value, "Text"]);
              }
            </script>
          </action-list-input>

        </div>
      </dialog-list>

    </div>
  </tab>


  <tab label="Files" icon="file image">
    <div style="padding: 8px;">

      <dialog-list id="attachments" fields='["tipo", "url", "canvasvar", "canvasnome", "compress", "name", "spoiler"]' dialogTitle="Informação do Anexo" dialogWidth="400" dialogHeight="480" listLabel="Files" listStyle="height: calc(100vh - 350px);" itemName="File" itemCols="1" itemHeight="30px;" itemTextFunction="glob.formatItem(data)" itemStyle="text-align: left; line-height: 30px;">
        <div style="padding: 16px;" onmouseover="(function(){

          var aselect = document.getElementById('tipo');
            var avalue = aselect.options[aselect.selectedIndex].value
        
          if (avalue == 0) {
              document.getElementById('xinxyla1').style.display = 'none';
              document.getElementById('xinxyla2').style.display = 'block';
              document.getElementById('xinxyla3').style.display = 'block';
        }
        if (avalue == 1) {
          document.getElementById('xinxyla2').style.display = 'none';
          document.getElementById('xinxyla1').style.display = 'block';
          document.getElementById('xinxyla3').style.display = 'block';
    }   
    
    if (avalue == 2) {
      document.getElementById('xinxyla2').style.display = 'none';
      document.getElementById('xinxyla1').style.display = 'block';
      document.getElementById('xinxyla3').style.display = 'none';
    } 

        
        })()">

        <span class="dbminputlabel">Tipo de Anexo</span>
        <select id="tipo" class="round" onchange="(function(){

          var aselect = document.getElementById('tipo');
            var avalue = aselect.options[aselect.selectedIndex].value
        
            if (avalue == 0) {
              document.getElementById('xinxyla1').style.display = 'none';
              document.getElementById('xinxyla2').style.display = 'block';
              document.getElementById('xinxyla3').style.display = 'block';
        }
        if (avalue == 1) {
          document.getElementById('xinxyla2').style.display = 'none';
          document.getElementById('xinxyla1').style.display = 'block';
          document.getElementById('xinxyla3').style.display = 'block';
    }   
    
    if (avalue == 2) {
      document.getElementById('xinxyla2').style.display = 'none';
      document.getElementById('xinxyla1').style.display = 'block';
      document.getElementById('xinxyla3').style.display = 'none';
    }      
        
        })()">>
          <option value="0">Attachment Local/Web URL</option>
          <option value="1">Canvas</option>
          <option value="2">DBM Images</option>
        </select>
        <br><div id="xinxyla2">
          <span class="dbminputlabel">Attachment Local/Web URL</span>
          <input id="url" class="round" type="text" value="resources/">

          <br></div>
          <div id="xinxyla1">
          <span class="dbminputlabel">Variable Type</span><br>
    <select id="canvasvar" class="round">
      ${data.variables[1]}
    </select>
<br>
          <span class="dbminputlabel">Variable Name</span>
          <input id="canvasnome" class="round" type="text" list="variableList">
<br>
<div id="xinxyla3">
          <span class="dbminputlabel">Compression Level</span><br>
          <select id="compress" class="round">
            <option value="0">1</option>
            <option value="1">2</option>
            <option value="2">3</option>
            <option value="3">4</option>
            <option value="4">5</option>
            <option value="5">6</option>
            <option value="6">7</option>
            <option value="7">8</option>
            <option value="8">9</option>
            <option value="9" selected>10</option>
          </select>
          <br></div></div>

          <span class="dbminputlabel">Attachment name</span>
          <input id="name" class="round" type="text" placeholder="Leave blank for default...">

          <br>

          <div style="text-align: center; padding-top: 4px;">
            <dbm-checkbox id="spoiler" label="Make Attachment Spoiler"></dbm-checkbox>
          </div>
        </div>
      </dialog-list>
    </div>
  </tab>


  <tab label="Settings" icon="cogs">
    <div style="padding: 8px;height: calc(100vh - 292px);overflow-y: scroll;overflow-x: hidden;width:100%">
    <div id="xincheck">
    <span class="dbminputlabel">Options</span><br><div style="padding:10px;background:rgba(0,0,0,0.2)">
      <dbm-checkbox id="reply" label="Reply to Interaction if Possible" checked></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="ephemeral" label="Make Reply Private (Ephemeral)"></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="mentions" label="@ Notify members/positions" checked></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="messageoff" label="Add/Replace Text" checked></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="tts" label="Text-to-Speech"></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="overwrite" label="Overwrite Changes"></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="dontSend" label="Don't Send Message"></dbm-checkbox>
      
      </div><br></div>
      
      <div style="width:96%;display:block">
      <div style="padding-bottom: 12px;" id="xin1">
        <retrieve-from-variable allowNone dropdownLabel="Edit Message" selectId="editMessage" variableInputId="editMessageVarName" variableContainerId="editMessageVarNameContainer">
          <option value="intUpdate">Interaction Update</option>
        </retrieve-from-variable>
      

      <br><br><br></div>

   
    <div>
      <div style="float: left; width: 35%">
      <span class="dbminputlabel">Send as Webhook</span><br>
      <select id="storagewebhook" class="round" onchange="glob.onComparisonChanged2(this)">
      <option value="0" selecionado>No</option>
      <option value="1">Temp Variable</option>
      <option value="2">Server Variable</option>
      <option value="3">Global Variable</option>
    </select>
    </div>
    <div id="webhookdiv" style="display: none; float: right; width: 60%;"><span id="ifName" class="dbminputlabel">Variable Name</span><br><input list="variableList" id="varwebhook" class="round" name="actionxinxyla" type="text"></div>
    <div id="webhookdiv2" style="display: none;padding-top: 12px;">
    <br><br><br>
    <span class="dbminputlabel">Webhook name</span><br>
    <input id="webhookname" class="round" type="text" style="width:100%" placeholder="Opcional">
    <br>
    <span class="dbminputlabel">Webhook avatar image URL</span><br>
    <input id="webhookavatar" class="round" type="text" style="width:100%" placeholder="Opcional"><br>
    <hr class="subtlebar" style="margin-top: 4px; margin-bottom: -54px">
    </div>
      <br><br><br>
      <div style="padding-top: 12px">
        <store-in-variable allowNone dropdownLabel="Armazenar em" selectId="storage" variableInputId="varName2" variableContainerId="varNameContainer2"></store-in-variable>
      </div>

      <br><br><br>
      <hr class="subtlebar" style="margin-top: 4px; margin-bottom: 4px">
      <br>
      <div>
      <div style="float: left; width: 35%">
      <span class="dbminputlabel">If the message fails</span><br>
      <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
      <option value="0">Continue Actions</option>
      <option value="1" selected>Stop action sequence</option>
      <option value="2">Go to action</option>
      <option value="3">Skip next actions</option>
      <option value="4">Go to action anchor</option>
    </select>
    </div>
    <div id="iffalseContainer" style="display: none; float: right; width: 60%;"><span id="ifName" class="dbminputlabel">For</span><br><input id="iffalseVal" class="round" name="actionxinxyla" type="text"></div>
      <br><br><br>

      <div style="padding-bottom: 12px;padding-top: 12px">
      <table style="width:100%;"><tr>
      <td><span class="dbminputlabel">Action Description</span><br><input type="text" class="round" id="description" placeholder="Leave empty to remove"></td>
      <td style="padding:0px 0px 0px 10px;width:55px"><span class="dbminputlabel">Color</span><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
      </tr></table>
      </div>

      </div>

    </div>
  </tab>
</tab-system></div>

<style>
xinspace{padding:5px 0px 0px 0px;display:block}
</style>`;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //
  // When the HTML is first applied to the action editor, this code
  // is also run. This helps add modifications or setup reactionary
  // functions for the DOM elements.
  //---------------------------------------------------------------------

  init: function () {
    const { glob, document } = this;


    glob.onComparisonChanged = function (event) {
      if (event.value > "1") {
        document.getElementById("iffalseContainer").style.display = null;
      } else {
        document.getElementById("iffalseContainer").style.display = "none";
      }
    }

    glob.onComparisonChanged(document.getElementById("iffalse"));


    glob.onComparisonChanged2 = function (event) {
      if (event.value > "0") {
        document.getElementById("webhookdiv").style.display = null;
        document.getElementById("webhookdiv2").style.display = null;
        document.getElementById("xincheck").style.display = "none";
        document.getElementById("xin1").style.display = "none";
        document.getElementById("xin2").style.display = "none";
        document.getElementById("xin3").style.display = "block";
        document.getElementById("xin4").style.display = "none";
        document.getElementById("xin5").style.display = "none";
        document.getElementById("xin4n").style.display = null;
        document.getElementById("xin5n").style.display = null;
        const myInput = document.querySelector("#reply")
        myInput.value = false
        const myInput2 = document.querySelector("#dontSend")
        myInput2.value = false
        const myInput3 = document.querySelector("#ephemeral")
        myInput3.value = false
        const myInput4 = document.querySelector("#tts")
        myInput4.value = false
        const myInput5 = document.querySelector("#overwrite")
        myInput5.value = false
        const myInput6 = document.querySelector("#editMessage")
        myInput6.value = 0
        const myInput7 = document.querySelector("#channel")
        myInput7.value = 0
      } else {
        document.getElementById("webhookdiv").style.display = "none";
        document.getElementById("webhookdiv2").style.display = "none";
        document.getElementById("xincheck").style.display = null;
        document.getElementById("xin1").style.display = null;
        document.getElementById("xin2").style.display = "block";
        document.getElementById("xin3").style.display = "none";
        document.getElementById("xin4").style.display = null;
        document.getElementById("xin5").style.display = null;
        document.getElementById("xin4n").style.display = "none";
        document.getElementById("xin5n").style.display = "none";
      }
    }

    glob.onComparisonChanged2(document.getElementById("storagewebhook"));


    glob.formatItem = function (data) {
      let result = '<div style="display: inline-block; width: 200px; padding-left: 8px;">';
      const comp = data.tipo;
      switch (comp) {
        case "0":
          result += "Anexo: " + data.url;
          break;
        case "1":
          result += "Canvas: " + data.canvasnome;
          break;
        case "2":
          result += "DBM Imagens: " + data.canvasnome;
          break;
      }
      result += "</div>";
      return result;
    };

  },
  //---------------------------------------------------------------------
  // Action Editor On Save
  //
  // When the data for the action is saved, this function is called.
  // It provides the ability to modify the final data associated with
  // the action by retrieving it as an argument and returning a modified
  // version through the return value. This can be used to verify the
  // data and fill required entries the user did not.
  //
  // Its inclusion within action mods is optional.
  //---------------------------------------------------------------------

  onSave(data, helpers) {
    // generate unique ids if not provided by user since they are important
    if (Array.isArray(data?.buttons)) {
      for (let i = 0; i < data.buttons.length; i++) {
        if (!data.buttons[i].id) {
          data.buttons[i].id = "msg-button-" + helpers.generateUUID().substring(0, 7);
        }
      }
    }
    if (Array.isArray(data?.selectMenus)) {
      for (let i = 0; i < data.selectMenus.length; i++) {
        if (!data.selectMenus[i].id) {
          data.selectMenus[i].id = "msg-select-" + helpers.generateUUID().substring(0, 7);
        }
      }
    }
    return data;
  },

  //---------------------------------------------------------------------
  // Action Editor On Paste
  //
  // When the data for the action is pasted, this function is called.
  // It provides the ability to modify the final data associated with
  // the action by retrieving it as an argument and returning a modified
  // version through the return value.
  //
  // Its inclusion within action mods is optional.
  //---------------------------------------------------------------------

  onPaste(data, helpers) {
    if (Array.isArray(data?.buttons)) {
      for (let i = 0; i < data.buttons.length; i++) {
        const id = data.buttons[i].id;
        if (!id || id.startsWith("msg-button-")) {
          data.buttons[i].id = "msg-button-" + helpers.generateUUID().substring(0, 7);
        }
      }
    }
    if (Array.isArray(data?.selectMenus)) {
      for (let i = 0; i < data.selectMenus.length; i++) {
        const id = data.selectMenus[i].id;
        if (!id || id.startsWith("msg-select-")) {
          data.selectMenus[i].id = "msg-select-" + helpers.generateUUID().substring(0, 7);
        }
      }
    }
    return data;
  },

  //---------------------------------------------------------------------
  // Action Bot Function
  //
  // This is the function for the action within the Bot's Action class.
  // Keep in mind event calls won't have access to the "msg" parameter,
  // so be sure to provide checks for variable existence.
  //---------------------------------------------------------------------

  async action(cache) {

    const data = cache.actions[cache.index];
    var messageoff = data.messageoff;
    if(messageoff == undefined){messageoff = true}
    const channel = parseInt(data.channel, 10);
    const message = this.evalMessage(data.message, cache);
    const storagewebhook = parseInt(data.storagewebhook)
    const webhookname = this.evalMessage(data.webhookname, cache)
    const webhookavatar = this.evalMessage(data.webhookavatar, cache)
    if (storagewebhook > 0) {
      varwebhook = this.evalMessage(data.varwebhook, cache)
      Mods = this.getMods()
      webhook = Mods.getWebhook(storagewebhook, varwebhook, cache)
    }
    if (data.channel === undefined || message === undefined) {
      return;
    }

    let target = await this.getSendReplyTarget(channel, this.evalMessage(data.varName, cache), cache);

    let messageOptions = {};

    const overwrite = data.overwrite;

    let isEdit = 0;
    if (data.editMessage === "intUpdate") {
      isEdit = 2;
    } else {
      const editMessage = parseInt(data.editMessage, 10);
      if (typeof editMessage === "number" && editMessage >= 0) {
        const editVarName = this.evalMessage(data.editMessageVarName, cache);
        const editObject = this.getVariable(editMessage, editVarName, cache);
        const { Message } = this.getDBM().DiscordJS;
        if (editObject) {
          if (editObject instanceof Message) {
            target = editObject;
            isEdit = 1;
          } else {
            messageOptions = editObject;
          }
        }
      }
    }

    let content;

    if(messageoff == true){
    if (message.length > 0) {
      content = this.evalMessage(message, cache);
    } else {
      content = this.evalMessage("", cache);
    }}


    if (content) {
      if (messageOptions.content && !overwrite) {
        messageOptions.content += content;
      } else {
        messageOptions.content = content;
      }
    }

    if (data.embeds?.length > 0) {
      const { MessageEmbed } = this.getDBM().DiscordJS;

      if (!Array.isArray(messageOptions.embeds) || overwrite) {
        messageOptions.embeds = [];
      }

      const embedDatas = data.embeds;
      for (let i = 0; i < embedDatas.length; i++) {
        const embedData = embedDatas[i];
        const embed = new MessageEmbed();
        if (embedData.title) embed.setTitle(this.evalMessage(embedData.title, cache));
        if (embedData.url) embed.setURL(this.evalMessage(embedData.url, cache));
        if (embedData.color){
          if (embedData.colorrandom == true) {
            embed.setColor("RANDOM");
          } else {
            embed.setColor(this.evalMessage(embedData.color, cache));
          }
        }

        if (embedData.timestamp == "true" || embedData.timestamp == true) {
          if(embedData.timestampper == "" || embedData.timestampper == undefined) {
            embed.setTimestamp()
          } else{
            embed.setTimestamp(parseFloat(this.evalMessage(embedData.timestampper, cache)))
          }
        }

        var imgURL = this.evalMessage(embedData.imageUrl, cache);

        if(imgURL) {
          if(imgURL.toString().startsWith("http")) {
            embed.setImage(imgURL);
          } else {
            embed.setImage("attachment://" + imgURL);
          } 
        }

        var thumb = this.evalMessage(embedData.thumbUrl, cache);

        if(thumb) {
          if(thumb.toString().startsWith("http")) {
            embed.setThumbnail(thumb);
          } else {
            embed.setThumbnail("attachment://" + thumb);
          }
        }

        if (embedData.description) embed.setDescription(this.evalMessage(embedData.description || '\u200B', cache));

        if (embedData.fields?.length > 0) {
          const fields = embedData.fields;
          for (let i = 0; i < fields.length; i++) {
            const f = fields[i];

            val1 = this.evalMessage(f.val1, cache);
            val2 = this.evalMessage(f.val2, cache);
            result = true;

            if(f.formula == "1" || f.formula == "2") {
            const compare = parseInt(f.comparar, 10);
            if (compare !== 6) val2 = this.evalIfPossible(val2, cache);
            switch (compare) {
                case 0:
                  result = val1.toString() !== "undefined";
                  break;
                case 1:
                  result = val1 == val2;
                  break;
                case 2:
                  result = val1 === val2;
                  break;
                case 3:
                  result = parseFloat(val1) < parseFloat(val2);
                  break;
                case 4:
                  result = parseFloat(val1) > parseFloat(val2);
                  break;
                case 5:
                  if (typeof val1?.toString().includes === "function") {
                    result = val1.toString().includes(val2);
                  }
                  break;
                case 6:
                  result = Boolean(val1.toString().match(new RegExp('^' + val2 + '$', 'i')));
                  break;
                case 7:
                  result = Boolean(val1.toString().length > val2);
                  break;
                case 8:
                  result = Boolean(val1.toString().length < val2);
                  break;
                case 9:
                  result = Boolean(val1.toString().length == val2);
                  break;
                case 10:
                  result = val1.toString().startsWith(val2);
                  break;
                case 11:
                  result = val1.toString().endsWith(val2);
                  break;
                case 12:
                  result = Boolean(val1 >= val2);
                  break;
                case 13:
                  result = Boolean(val1 <= val2);
                  break;
                case 14:
                  result = Boolean(val1.toString().match(new RegExp(val2)))
                  break;
                case 16:
                  const conditions = ["Ä","Å","Á","Â","À","Ã","Ā","Ă","Ą","ā","ă","ą","ä","á","â","à","ã","É","Ê","Ë","È","Ė","Ę","Ě","Ĕ","Ē","ė","ę","ě","ĕ","ē","é","ê","ë","è","Í","Î","Ï","Ì","İ","Į","Ī","ı","į","ī","í","î","ï","ì","Ö","Ó","Ô","Ò","Õ","Ő","Ō","ő","ō","ö","ó","ô","ò","õ","Ü","Ú","Û","Ų","Ű","Ů","Ū","ų","ű","ů","ū","ü","ú","û","ù","Ç","Ć","Č","ç","ć","č","Ñ","Ň","Ņ","Ń","ñ","ň","ņ","ń","Ÿ","Ý","ý","Ź","Ż","Ž","ź","ż","ž","Ł","Ľ","Ļ","Ĺ","ł","ľ","ĺ","Ķ","ķ","Ģ","Ğ","ģ","ğ","Ď","ď","Ś","Š","Ş","ś","š","ş","Ť","Ț","Ţ","ť","ț","ţ","Ŕ","Ř","ŕ","ř"]
                  result = conditions.some(el => val1.includes(el));
                  break;
                case 17:
                  const conditionsX = val2
                  result = conditionsX.some(els => val1.includes(els));
                  break;
                case 18:
                  const conditionsZ = val2
                  result = conditionsZ.some(elz => val1 == (elz));
                  break;
                case 19:
                  result = val1 % 2 == 0
                  break;
                case 20:
                  result = val1 % 2 == 1
                  break;
                case 21:
                  result = Boolean(!isNaN(parseFloat(val1.toString().replace(",", "."))));
                  break;
                case 23:
                  const isImageUrl = require('is-image-url');
                  result = isImageUrl(val1);
                  break;
                case 24:
                  result = typeof val1 === "string";
                  break;
                case 25:
                  const isUrl = require("is-url");
                  result = isUrl(val1);
            }
          }
          
          if(f.formula == "1") {
            if(result == false) {
              result = true
            }
          }

          if(result == true){
            embed.addField(this.evalMessage(f.name || '\u200B', cache), this.evalMessage(f.value || '\u200B', cache), f.inline === "true")};
          }
        }

        if (embedData.author) {
          embed.setAuthor({
            name: this.evalMessage(embedData.author, cache),
            iconURL: embedData.authorIcon ? this.evalMessage(embedData.authorIcon, cache) : null,
            url: embedData.authorUrl ? this.evalMessage(embedData.authorUrl, cache) : null,
          });
        }

        if (embedData.footerText) {
          embed.setFooter({
            text: this.evalMessage(embedData.footerText, cache),
            iconURL: embedData.footerIconUrl ? this.evalMessage(embedData.footerIconUrl, cache) : null,
          });
        }

        messageOptions.embeds.push(embed);
      }
    }

    if(data.mentions == false){
    messageOptions.allowedMentions = {};
    messageOptions.allowedMentions.repliedUser = []
    messageOptions.allowedMentions.repliedUser = data.mentions
  }

    let componentsArr = [];
    let awaitResponses = [];

    if (!overwrite && messageOptions.components?.length > 0) {
      componentsArr = messageOptions.components.map(function (comps) {
        return comps.components;
      });
    }

    const defaultTime = 60000;

    if (Array.isArray(data.buttons)) {
      for (let i = 0; i < data.buttons.length; i++) {
        if(!data.buttons[i].name) data.buttons[i].name = "\u200b";
        const button = data.buttons[i];
        if(button.typeper == "" || button.typeper == undefined){
          button.type = this.evalMessage(button.type, cache)
        }else{
          check = this.evalMessage(button.typeper, cache)
          if(check == "PRIMARY" || check == "SECONDARY" || check == "SUCCESS" || check == "DANGER" || check == "LINK"){
          button.type = this.evalMessage(button.typeper, cache)}
        }
        const buttonData = this.generateButton(button, cache);
        this.addButtonToActionRowArray(componentsArr, this.evalMessage(button.row, cache), buttonData, cache);

        if (button.mode !== "PERSISTENT") {
          awaitResponses.push({
            type: "BUTTON",
            time: button.time ? parseInt(this.evalMessage(button.time, cache)) || defaultTime : defaultTime,
            id: this.evalMessage(button.id, cache),
            user: button.mode.endsWith("PERSONAL") ? cache.getUser()?.id : null,
            multi: button.mode.startsWith("MULTI"),
            data: button,
          });
        }
      }
    }

    if (Array.isArray(data.selectMenus)) {
      for (let i = 0; i < data.selectMenus.length; i++) {
        const select = data.selectMenus[i];
        const selectData = this.generateSelectMenu(select, cache);
        this.addSelectToActionRowArray(componentsArr, this.evalMessage(select.row, cache), selectData, cache);

        if (select.mode !== "PERSISTENT") {
          awaitResponses.push({
            type: "SELECT",
            time: select.time ? parseInt(this.evalMessage(select.time, cache)) || defaultTime : defaultTime,
            id: this.evalMessage(select.id, cache),
            user: select.mode.endsWith("PERSONAL") ? cache.getUser()?.id : null,
            multi: select.mode.startsWith("MULTI"),
            data: select,
          });
        }
      }
    }

    if (messageOptions._awaitResponses?.length > 0) {
      if (overwrite && awaitResponses.length > 0) {
        messageOptions._awaitResponses = [];
      } else {
        awaitResponses = messageOptions._awaitResponses.concat(awaitResponses);
      }
    }

    if (componentsArr.length > 0) {
      const newComponents = componentsArr
        .filter((comps) => comps.length > 0)
        .map(function (comps) {
          return {
            type: "ACTION_ROW",
            components: comps,
          };
        });

      messageOptions.components = newComponents;
    }

    if (storagewebhook > 0) {
      if (webhookname !== "") {
        messageOptions.username = webhookname
      }
      if (webhookavatar !== "") {
        messageOptions.avatarURL = await webhookavatar
      }
    }

    if (data.tts) {
      messageOptions.tts = true;
    }



    if (data.attachments?.length > 0) {
      const { Util, MessageAttachment } = this.getDBM().DiscordJS;
      if (!Array.isArray(messageOptions.files) || overwrite) {
        messageOptions.files = [];
      }
      for (let i = 0; i < data.attachments.length; i++) {

        if (data.attachments[i].tipo == "1") {
          const { DiscordJS } = this.getDBM();
          const Canvas = require('canvas')
          const attachment = data.attachments[i];
          const varnamer = this.evalMessage(attachment?.canvasnome, cache);
          const varid = this.evalMessage(attachment?.canvasvar, cache);
          const imagedata = this.getVariable(varid, varnamer, cache)
          if (!imagedata) {
            this.callNextAction(cache)
            return
          }
          const image = new Canvas.Image()
          image.src = imagedata
          const canvas = Canvas.createCanvas(image.width, image.height)
          const ctx = canvas.getContext('2d')
          ctx.drawImage(image, 0, 0, image.width, image.height)
          const buffer = canvas.toBuffer('image/png', { compressionLevel: data.attachments[i].compress })
          const spoiler = !!attachment?.spoiler;
          const name = attachment?.name || (spoiler ? Util.basename("image.png") : undefined);
          const msgAttachment = new MessageAttachment(buffer, name);
          if (spoiler) {
            msgAttachment.setSpoiler(true);
          }
          messageOptions.files.push(msgAttachment);

        }
        if (data.attachments[i].tipo == "2") {
          const { Images } = this.getDBM();
          const attachment = data.attachments[i];
          const varnamer = this.evalMessage(attachment?.canvasnome, cache);
          const varid = this.evalMessage(attachment?.canvasvar, cache);
          const imagedata = this.getVariable(varid, varnamer, cache)
          const spoiler = !!attachment?.spoiler;
          const name = attachment?.name || (spoiler ? Util.basename("image.png") : undefined);
          const buffer = await Images.createBuffer(imagedata)
          const msgAttachment = new MessageAttachment(buffer, name);
          if (spoiler) {
            msgAttachment.setSpoiler(true);
          }
          messageOptions.files.push(msgAttachment);

        }
        if (data.attachments[i].tipo == "0" || data.attachments[i].tipo == undefined) {
          const attachment = data.attachments[i];
          const url = this.evalMessage(attachment?.url, cache);
          if (url) {
            const spoiler = !!attachment?.spoiler;
            const name = attachment?.name || (spoiler ? Util.basename(url) : undefined);
            const msgAttachment = new MessageAttachment(url, name);
            if (spoiler) {
              msgAttachment.setSpoiler(true);
            }
            messageOptions.files.push(msgAttachment);
          }
        }
      }
    }

    let defaultResultMsg = null;
    const onComplete = (resultMsg) => {
      if (defaultResultMsg) {
        resultMsg ??= defaultResultMsg;
      }

      if (resultMsg) {
        const varName2 = this.evalMessage(data.varName2, cache);
        const storage = parseInt(data.storage, 10);
        this.storeValue(resultMsg, storage, varName2, cache);
        this.callNextAction(cache);

        for (let i = 0; i < awaitResponses.length; i++) {
          const response = awaitResponses[i];
          const originalInteraction = cache.interaction?.__originalInteraction ?? cache.interaction;
          const tempVariables = cache.temp || {};
          this.registerTemporaryInteraction(resultMsg.id, response.time, response.id, response.user, response.multi, (interaction) => {
            if (response.data) {
              interaction.__originalInteraction = originalInteraction;
              if (response.type === "BUTTON") {
                this.preformActionsFromInteraction(interaction, response.data, cache.meta, tempVariables);
              } else {
                this.preformActionsFromSelectInteraction(interaction, response.data, cache.meta, tempVariables);
              }
            }
          });
        }
      } else {
        this.callNextAction(cache);
      }
    };

    const isMessageTarget = target instanceof this.getDBM().DiscordJS.Message;

    const sameId = target?.id?.length > 0 && (target?.id ?? "") === cache?.interaction?.channel?.id;
    const sameChannel = channel === 0 || sameId;
    const canReply = !isMessageTarget && cache?.interaction?.replied === false && sameChannel;

    if (data.dontSend) {
      const varName2 = this.evalMessage(data.varName2, cache);
      const storage = parseInt(data.storage, 10);
      messageOptions._awaitResponses = awaitResponses;
      this.storeValue(messageOptions, storage, varName2, cache);
      this.callNextAction(cache);
    }

    else if (Array.isArray(target)) {
      this.callListFunc(target, "send", [messageOptions]).then(onComplete);
    }

    else if (isEdit === 2) {
      let promise = null;

      defaultResultMsg = cache.interaction?.message;

      if (cache.interaction?.replied && cache.interaction?.editReply) {
        promise = cache.interaction.editReply(messageOptions);
      } else if (cache?.interaction?.update) {
        promise = cache.interaction.update(messageOptions);
      } else {
        this.displayError(data, cache, "Send Message -> Message/Options to Edit -> Interaction Update / Could not find interaction to edit");
      }

      if (promise) {
        promise
          .then(onComplete)
          .catch((err) => this.displayError(data, cache, err) || this.executeResults(false, data, cache));
      }
    }

    else if (isEdit === 1 && target?.edit) {
      target
        .edit(messageOptions)
        .then(onComplete)
        .catch((err) => this.displayError(data, cache, err) || this.executeResults(false, data, cache));;
    }

    else if (isMessageTarget && target?.reply) {
      target
        .reply(messageOptions)
        .then(onComplete)
        .catch((err) => this.displayError(data, cache, err) || this.executeResults(false, data, cache));
    }

    else if (data.reply === true && canReply) {
      messageOptions.fetchReply = true;
      if (data.ephemeral === true) {
        messageOptions.ephemeral = true;
      }
      let promise = null;
      if (cache.interaction.deferred) {
        promise = cache.interaction.editReply(messageOptions);
      } else {
        promise = cache.interaction.reply(messageOptions);
      }
      promise.then(onComplete).catch((err) => this.displayError(data, cache, err));
    }


    else if (target?.send) {

      if (storagewebhook > 0) {
        webhook
          .send(messageOptions)
          .then(onComplete)
          .catch((err) => this.displayError(data, cache, err) || this.executeResults(false, data, cache));
      } else {
        target
          .send(messageOptions)
          .then(onComplete)
          .catch((err) => this.displayError(data, cache, err) || this.executeResults(false, data, cache));
      }

    }



    else {
      this.callNextAction(cache);
    }

  },

  //---------------------------------------------------------------------
  // Action Bot Mod Init
  //
  // An optional function for action mods. Upon the bot's initialization,
  // each command/event's actions are iterated through. This is to
  // initialize responses to interactions created within actions
  // (e.g. buttons and select menus for Send Message).
  //
  // If an action provides inputs for more actions within, be sure
  // to call the `this.prepareActions` function to ensure all actions are
  // recursively iterated through.
  //---------------------------------------------------------------------

  modInit(data) {
    if (Array.isArray(data?.buttons)) {
      for (let i = 0; i < data.buttons.length; i++) {
        const button = data.buttons[i];
        if (button.mode === "PERSISTENT") {
          this.registerButtonInteraction(button.id, button);
        }
        this.prepareActions(button.actions);
      }
    }
    if (Array.isArray(data?.selectMenus)) {
      for (let i = 0; i < data.selectMenus.length; i++) {
        const select = data.selectMenus[i];
        if (select.mode === "PERSISTENT") {
          this.registerSelectMenuInteraction(select.id, select);
        }
        this.prepareActions(select.actions);
      }
    }
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //
  // Upon initialization of the bot, this code is run. Using the bot's
  // DBM namespace, one can add/modify existing functions if necessary.
  // In order to reduce conflicts between mods, be sure to alias
  // functions you wish to overwrite.
  //---------------------------------------------------------------------

  mod() { },
};
