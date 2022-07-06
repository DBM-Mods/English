module.exports = {
  name: "Store Message Info MOD",
  section: "Messaging",
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/English',
    downloadURL: 'https://github.com/DBM-Mods/English/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    const info = [
      "Message Object",
      "Message ID",
      "Message Text",
      "Message Author",
      "Message Channel",
      "Message Timestamp",
      "Message is Pinned",
      "Message is TTS",
      "Message Attachments List",
      "Message Edits",
      "Message Server ID",
      "",
      "Messages Reactions Count",
      "Mentioned Users List",
      "Mentioned Users Count",
      "Message URL",
      "Message Creation Date",
      "Message Content Length",
      "Message Attachments Count",
      "Message Guild",
      "Message Type",
      "Message Webhook ID",
      "Message Embed Object",
      "Embed title",
      "Embed description",
      "Embed URL",
      "Embed color",
      "Embed Timestamp",
      "Embed Thumbnail",
      "Embed Image",
      "Author name in embed",
      "Author URL icon in embed",
      "Author URL in embed",
      "Embed text footer",
      "Footer Icon Embed URL",
      "Embed Field Name",
      "Embed Field Value",
      "Embed Field Inline",
      "Number of Embeds",
      "Number of Fields",
      "Interaction object",
      "Interaction ID",
      "Interaction Name",
      "Interaction Type",
      "Interaction Author ID",
      "Interaction Author Name",
      "Discriminator of the Interaction Author",
      "Interaction Author Tag",
      "Interaction Author Avatar",
      "Total lines",
      "Total components on the line",
      "Component object",
      "Component ID",
      "Component Type",
      "Component Label",
      "Component Style",
      "Component URL",
      "Component is Enabled/Disabled",
      "Component Placeholder",
      "Minimum Menu Values",
      "Maximum Menu Values",
      "Menu Options",
    ];
    return `${presets.getMessageText(data.message, data.varName)} - ${info[parseInt(data.info, 10)]}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Unknown Type";
    switch (info) {
      case 0:
        dataType = "Message";
        break;
      case 1:
        dataType = "Message ID";
        break;
      case 2:
        dataType = "Text";
        break;
      case 3:
        dataType = "Server Member";
        break;
      case 4:
        dataType = "Channel";
        break;
      case 5:
        dataType = "Text";
        break;
      case 6:
      case 7:
        dataType = "Boolean";
        break;
      case 8:
        dataType = "Date";
      case 9:
        dataType = "Messages List";
      case 12:
        dataType = "Number";
        break;
      case 13:
        dataType = "Array";
        break;
      case 14:
        dataType = "Number";
        break;
      case 15:
        dataType = "URL";
        break;
      case 16:
        dataType = "Date";
        break;
      case 17:
      case 18:
        dataType = "Number";
        break;
case 19:
dataType = "Guild";
break;
case 20:
dataType = "Message Type";
break;
case 21:
dataType = "Webhook ID";
break;
case 22:
dataType = "Embed Message";
break;
case 23:
dataType = "Embed Message";
break;
case 24:
dataType = "Embed Message";
break;
case 25:
dataType = "Embed Message";
break;
case 26:
dataType = "Embed Message";
break;
case 27:
dataType = "Embed Message";
break;
case 28:
dataType = "Embed Message";
break;
case 29:
dataType = "Embed Message";
break;
case 30:
dataType = "Embed Message";
break;
case 31:
dataType = "Embed Message";
break;
case 32:
dataType = "Embed Message";
break;
case 33:
dataType = "Embed Message";
break;
case 34:
dataType = "Embed Message";
break;
case 35:
dataType = "Embed Message";
break;
case 36:
dataType = "Embed Message";
break;
case 37:
dataType = "Embed Message";
break;
case 38:
dataType = "Embeds Number";
break;
case 39:
dataType = "Fields Number";
break;
case 40:
dataType = "Interaction";
break;
case 41:
dataType = "Interaction";
break;
case 42:
dataType = "Interaction";
break;
case 43:
dataType = "Interaction";
break;
case 44:
dataType = "Interaction User";
break;
case 45:
dataType = "Interaction User";
break;
case 46:
dataType = "Interaction User";
break;
case 47:
dataType = "Interaction User";
break;
case 48:
dataType = "Interaction User";
break;
case 49:
dataType = "Component";
break;
case 50:
dataType = "Component";
break;
case 51:
dataType = "Component";
break;
case 52:
dataType = "Component";
break;
case 53:
dataType = "Component";
break;
case 54:
dataType = "Component";
break;
case 55:
dataType = "Component";
break;
case 56:
dataType = "Component";
break;
case 57:
dataType = "Component";
break;
case 58:
dataType = "Component";
break;
case 59:
dataType = "Component";
break;
case 60:
dataType = "Component";
break;
case 61:
dataType = "Component";
break;
    }
    return [data.varName2, dataType];
  },

  fields: ["message", "varName", "info", "embednumero", "field", "comp1", "comp2", "storage", "varName2"],


  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 1.4</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

<message-input dropdownLabel="Menssage" selectId="message" variableContainerId="varNameContainer" variableInputId="varName"></message-input>

<br><br><br>

<div style="padding-top: 8px;">
	<span class="dbminputlabel">Information</span><br>
	<select id="info" class="round" onchange="glob.onComparisonChanged(this)">
		<option value="0" selected>Message Object</option>
		<option value="1">Message ID</option>
		<option value="2">Message Text</option>
		<option value="3">Message Author</option>
		<option value="4">Message Channel</option>
		<option value="5">Message Timestamp</option>
		<option value="6">Message is Pinned</option>
    <option value="7">Message is TTS</option>
    <option value="8">Message Attachments List</option>
		<option value="9">Message Edits</option>
		<option value="12">Messages Reactions Count</option>
		<option value="13">Mentioned Users List</option>
		<option value="14">Mentioned Users Count</option>
		<option value="15">Message URL</option>
		<option value="16">Message Creation Date</option>
		<option value="17">Message Content Length</option>
		<option value="18">Message Attachments Count</option>
		<option value="10">Message Server ID</option>
    <option value="19">Message Guild</option>
		<option value="20">Message Type</option>
		<option value="21">Message Webhook ID</option>
    <optgroup label="Interaction Information">
    <option value="40">Interaction Object</options>
    <option value="41">Interaction ID</options>
    <option value="42">Interaction Name</options>
    <option value="43">Interaction Type</options>
    <option value="44">Interaction Author ID</options>
    <option value="45">Interaction Author Name</options>
    <option value="46">Discriminator of the Interaction Author</options>
    <option value="47">Interaction Author Tag</options>
    <option value="48">Interaction Author Avatar</options>
    <optgroup label="Embed information">
    <option value="22">Message Embed Object</option>
    <option value="38">Number of Embeds</options>
    <option value="39">Number of Fields</options>
    <option value="23">Title</options>
    <option value="24">Description</options>
    <option value="25">Url</options>
    <option value="26">Cor</options>
    <option value="27">Timestamp</options>
    <option value="28">Thumbnail</options>
    <option value="29">Imagem</options>
    <option value="30">Author Name</options>
    <option value="31">Author URL Icon</options>
    <option value="32">Author URL</options>
    <option value="33">Footer Text</options>
    <option value="34">Footer Icon URL</options>
    <option value="35">Field Name</options>
    <option value="36">Valor do Field</options>
    <option value="37">Field Inline</options>
    <optgroup label="Component Information">
    <option value="49">Total lines</options>
    <option value="50">Total components on the line</options>
    <option value="51">Component object</options>
    <option value="52">Component ID</options>
    <option value="53">Component Type</options>
    <option value="54">Component Label</options>
    <option value="55">Component Style</options>
    <option value="56">Component URL</options>
    <option value="57">Component is Enabled/Disabled</options>
    <option value="58">Component Placeholder</options>
    <option value="59">Minimum Menu Values</options>
    <option value="60">Maximum Menu Values</options>
    <option value="61">Menu Options</options>
    </optgroup>
	</select>
</div><br><div style="width: 100%;display:none" id="containerxin2">
<table style="width:100%"><tr><td style="padding:5px">
<span class="dbminputlabel">Embed number</span><br>
<input id="embednumero" value="0" class="round" type="text">
<br></td><td style="padding:5px">
<div style="width: 100%;" id="containerxin">
<span class="dbminputlabel">Field number</span><br>
<input id="field" value="0" class="round" type="text">
<br>
</div></td></tr></table></div>
<table style="width:100%">
<tr><td style="padding:5px"><div id="containerxin3">
<span class="dbminputlabel">Line number</span><br>
<input id="comp1" value="0" class="round" type="text">
<br></div></td><td style="padding:5px"><div id="containerxin4">
<span class="dbminputlabel">Component number</span><br>
<input id="comp2" value="0" class="round" type="text">
<br></div>
</td></tr></table></div>

<store-in-variable dropdownLabel="Store in" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
  },


  init() {
    const { glob, document } = this;

    glob.onComparisonChanged = function (event) {
      if (event.value > 21) {
        document.getElementById("containerxin2").style.display = "block";
         document.getElementById("containerxin3").style.display = "none";
         document.getElementById("containerxin4").style.display = "none";
      }
      if (event.value < 22) {
        document.getElementById("containerxin2").style.display = "none";
        document.getElementById("containerxin3").style.display = "none";
        document.getElementById("containerxin4").style.display = "none";
      }
      if (event.value < 35) {
        document.getElementById("containerxin").style.display = "none";
        document.getElementById("containerxin3").style.display = "none";
        document.getElementById("containerxin4").style.display = "none";
      } else {
        document.getElementById("containerxin").style.display = "block";
        document.getElementById("containerxin3").style.display = "none";
        document.getElementById("containerxin4").style.display = "none";
      }
      if (event.value > 37) {
        document.getElementById("containerxin").style.display = "none";
        document.getElementById("containerxin2").style.display = "none";
        document.getElementById("containerxin3").style.display = "none";
        document.getElementById("containerxin4").style.display = "none";
      }
      if (event.value == 39) {
        document.getElementById("containerxin").style.display = "none";
        document.getElementById("containerxin2").style.display = "block";
        document.getElementById("containerxin3").style.display = "none";
        document.getElementById("containerxin4").style.display = "none";
      }
      if (event.value > 50) {
        document.getElementById("containerxin").style.display = "none";
        document.getElementById("containerxin2").style.display = "none";
        document.getElementById("containerxin3").style.display = "block";
        document.getElementById("containerxin4").style.display = "block";
      }
      if (event.value == 50) {
        document.getElementById("containerxin").style.display = "none";
        document.getElementById("containerxin2").style.display = "none";
        document.getElementById("containerxin3").style.display = "block";
        document.getElementById("containerxin4").style.display = "none";
      }
    };

    glob.onComparisonChanged(document.getElementById("info"));



  },

  async action(cache) {
    const data = cache.actions[cache.index];
    let field = this.evalMessage(data.field, cache);
    let embednumero = this.evalMessage(data.embednumero, cache);
    let comp1 = this.evalMessage(data.comp1, cache);
    let comp2 = this.evalMessage(data.comp2, cache);
    const msg = await this.getMessageFromData(data.message, data.varName, cache);

    if (!msg) {
      this.callNextAction(cache);
      return this.callNextAction(cache);
    }

    const info = parseInt(data.info, 10);

    let result;
    switch (info) {
      case 0:
        result = msg;
        break;
      case 1:
        result = msg.id;
        break;
      case 2:
        result = msg.content;
        break;
      case 3:
        result = msg.member ?? msg.author;
        break;
      case 4:
        result = msg.channel;
        break;
      case 5:
        result = msg.createdTimestamp;
        break;
      case 6:
        result = msg.pinned;
        break;
      case 7:
        result = msg.tts;
        break;
      case 8:
        result = [...msg.attachments.values()];
        break;
      case 9:
        result = msg.edits;
        break;
      case 10:
          result = msg.guild.id;
          break;
      case 12:
        result = msg.reactions.cache.size;
        break;
      case 13:
        result = [...msg.mentions.users.values()];
        break;
      case 14:
        result = msg.mentions.users.size;
        break;
      case 15:
        result = msg.url;
        break;
      case 16:
        result = msg.createdAt;
        break;
      case 17:
        result = msg.content.length;
        break;
      case 18:
        result = msg.attachments.size;
        break;
      case 19:
        result = msg.guild;
        break;
      case 20:
        result = msg.type;
        break;
      case 21:
        result = msg.webhookId;
        break;
      case 22:
        if(msg.embeds.length <= embednumero) {
          result = undefined;
        } else {
        result = msg.embeds[embednumero];}
      break;        
        case 23:
          if(msg.embeds.length <= embednumero) {
            result = "";
          } else {
          result = msg.embeds[embednumero].title;}
        break;
        case 24:
          if(msg.embeds.length <= embednumero) {
            result = "";
          } else {
          result = msg.embeds[embednumero].description;}
        break;
        case 25:
          if(msg.embeds.length <= embednumero) {
            result = "";
          } else {
          result = msg.embeds[embednumero].url;}
        break;
        case 26:
          if(msg.embeds.length <= embednumero) {
            result = "";
          } else {
          result = msg.embeds[embednumero].color;}
        break;
        case 27:
          if(msg.embeds.length <= embednumero) {
            result = "";
          } else {
          result = msg.embeds[embednumero].timestamp;}
        break;
        case 28:
          if(msg.embeds.length <= embednumero) {
            result = "";
          } else {
          result = msg.embeds[embednumero].thumbnail.url;}
        break;
        case 29:
          if(msg.embeds.length <= embednumero) {
            result = "";
          } else {
          result = msg.embeds[embednumero].image.url;}
        break;
        case 30:
          if(msg.embeds.length <= embednumero) {
            result = "";
          } else {
          result = msg.embeds[embednumero].author.name;}
        break;
        case 31:
          if(msg.embeds.length <= embednumero) {
            result = "";
          } else {
          result = msg.embeds[embednumero].author.iconURL;}
        break;
        case 32:
          if(msg.embeds.length <= embednumero) {
            result = "";
          } else {
          result = msg.embeds[embednumero].author.url;}
        break;
        case 33:
          if(msg.embeds.length <= embednumero) {
            result = "";
          } else {
          result = msg.embeds[embednumero].footer.text;}
        break;
        case 34:
          if(msg.embeds.length <= embednumero) {
            result = "";
          } else {
          result = msg.embeds[embednumero].footer.iconURL;}
        break;
        case 35:
          if(msg.embeds.length <= embednumero) {
            result = "";
          } else {
            if(msg.embeds[embednumero].fields.length <= field) {
            result = "";}
           else {
          result = msg.embeds[embednumero].fields[field].name;}
        }
        break;
        case 36:
          if(msg.embeds.length <= embednumero) {
            result = "";
          } else {
            if(msg.embeds[embednumero].fields.length <= field) {
            result = "";}
           else {
          result = msg.embeds[embednumero].fields[field].value;}
        }
        break;
        case 37:
          if(msg.embeds.length <= embednumero) {
            result = "";
          } else {
            if(msg.embeds[embednumero].fields.length <= field) {
            result = "";}
           else {
          result = msg.embeds[embednumero].fields[field].inline;}
        }
        break;
        case 38:
          if(msg.embeds.length == undefined) {
            result = 0;
          } else {
          result = msg.embeds.length;}
        break;
        case 39:
          if(msg.embeds.length <= embednumero) {
            result = 0;
          } else {
          result = msg.embeds[embednumero].fields.length}
        break;   
        case 40:
          if(msg.interaction == undefined) {
            result = null;
          } else {
          result = msg.interaction}
        break;
        case 41:
          if(msg.interaction == undefined) {
            result = null;
          } else {
          result = msg.interaction.id}
        break;  
        case 42:
          if(msg.interaction == undefined) {
            result = null;
          } else {
          result = msg.interaction.commandName}
        break;  
        case 43:
          if(msg.interaction == undefined) {
            result = null;
          } else {
          result = msg.interaction.type}
        break;
        case 44:
          if(msg.interaction == undefined) {
            result = null;
          } else {
          result = msg.interaction.user.id}
        break; 
        case 45:
          if(msg.interaction == undefined) {
            result = null;
          } else {
          result = msg.interaction.user.username}
        break; 
        case 46:
          if(msg.interaction == undefined) {
            result = null;
          } else {
          result = msg.interaction.user.discriminator}
        break; 
        case 47:
          if(msg.interaction == undefined) {
            result = null;
          } else {
          result = msg.interaction.user.tag}
        break; 
        case 48:
          if(msg.interaction == undefined) {
            result = null;
          } else {
          result = msg.interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 })}
        break; 

        case 49:
          if(msg.components.length == 0) {
            result = null;
          } else {
          result = msg.components.length}
        break;

        case 50:
         if(msg.components.length == 0) {
            result = null;
          } else {
            if(msg.components.length <= comp1) {
              result = null;
            } else {
          result = msg.components[comp1].components.length}}
        break;
        
        case 51:
          if(msg.components.length == 0) {
            result = null;
          } else {
            if(msg.components.length <= comp1) {
              result = null;
            } else {
          result = msg.components[comp1].components[comp2]}}
        break;    
            
        case 52:
          if(msg.components.length == 0) {
            result = null;
          } else {
            if(msg.components.length <= comp1) {
              result = null;
            } else {
          result = msg.components[comp1].components[comp2].customId}}
        break;

        case 53:
                  if(msg.components.length == 0) {
            result = null;
          } else {
            if(msg.components.length <= comp1) {
              result = null;
            } else {
          result = msg.components[comp1].components[comp2].type}}
        break;

        case 54:
          if(msg.components.length == 0) {
            result = null;
          } else {
            if(msg.components.length <= comp1) {
              result = null;
            } else {
          result = msg.components[comp1].components[comp2].label}}
        break; 

        case 55:
          if(msg.components.length == 0) {
            result = null;
          } else {
            if(msg.components.length <= comp1) {
              result = null;
            } else {
          result = msg.components[comp1].components[comp2].style}}
        break; 

        case 56:
          if(msg.components.length == 0) {
            result = null;
          } else {
            if(msg.components.length <= comp1) {
              result = null;
            } else {
          result = msg.components[comp1].components[comp2].url}}
        break; 

        case 57:
          if(msg.components.length == 0) {
            result = null;
          } else {
            if(msg.components.length <= comp1) {
              result = null;
            } else {
          result = msg.components[comp1].components[comp2].disabled}}
        break;
        
        case 58:
          if(msg.components.length == 0) {
            result = null;
          } else {
            if(msg.components.length <= comp1) {
              result = null;
            } else {
          result = msg.components[comp1].components[comp2].placeholder}}
        break;

        case 59:
          if(msg.components.length == 0) {
            result = null;
          } else {
            if(msg.components.length <= comp1) {
              result = null;
            } else {
          result = msg.components[comp1].components[comp2].minValues}}
        break;

        case 60:
          if(msg.components.length == 0) {
            result = null;
          } else {
            if(msg.components.length <= comp1) {
              result = null;
            } else {
          result = msg.components[comp1].components[comp2].maxValues}}
        break;
        
        case 61:
          if(msg.components.length == 0) {
            result = null;
          } else {
            if(msg.components.length <= comp1) {
              result = null;
            } else {
          result = msg.components[comp1].components[comp2].options}}
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
