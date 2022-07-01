module.exports = {
    name: "Repetitions MOD",
    section: "Other Stuff",
    meta: {
        version: '2.1.5',
        preciseCheck: true,
        author: '[Tempest - 321400509326032897]',
        authorUrl: 'https://github.com/DBM-Mods/English',
        downloadURL: 'https://github.com/DBM-Mods/English/archive/refs/heads/main.zip',
      },
    
    subtitle: function(data) {
    return `Number of repetitions of "${data.palavra}"`;
    },
    
    variableStorage: function(data, varType) {
            const type = parseInt(data.storage);
            if(type !== varType) return;
            return ([data.varName, 'Number']);
        },
    
    
    fields: ["texto", "palavra", "letra", "acentos", "storage", "varName"],
    
    html: function(isEvent, data) {
        return `
        <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 0.1</div>
        <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
        <span class="dbminputlabel">Text</span>
        <textarea id="texto" placeholder="Enter text here..." rows="5" style="resize:none"></textarea>
        <br>
        <span class="dbminputlabel">Word</span>
        <input id="palavra" type="text" class="round" placeholder="Insert the word here...">
        <br>
        <div style="float:left; width:45%;">
            <span class="dbminputlabel">Ignore capital letters</span>
            <select id="letra" class="round">
                <option value="0" selected>No</option>
                <option value="1">Yes</option>
            </select>
        </div>
        <div style="float:right; width:50%;">
            <span class="dbminputlabel">Ignore accents</span>
            <select id="acentos" class="round">
                <option value="0">No</option>
                <option value="1" selected>Yes</option>
            </select>
        </div>
        <br><br><br>
        <div style="float: left; width: 35%; padding-top: 8px;">
            <span class="dbminputlabel">Result in</span><br>
            <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
            ${data.variables[1]}
            </select>
        </div>
        <div id="varNameContainer" style="float: right; display: none; width: 60%; padding-top: 8px;">
            <span class="dbminputlabel">Variable Name</span><br>
            <input id="varName" class="round" type="text">
        </div><br><br>
        <div style=" float: left; width: 88%; padding-top: 8px;">
            <br>
        </div>`;
    },
    
    init: function() {
        const {glob, document} = this;
    
        glob.variableChange(document.getElementById('storage'), 'varNameContainer');
    },
    
    action: function(cache) {
    
        const data = cache.actions[cache.index];
        var texto = this.evalMessage(data.texto, cache);
        var palavra = this.evalMessage(data.palavra, cache);
        palavra = palavra.toString();
        texto = texto.toString();
        const letra = parseInt(data.letra, 10);
        const acentos = parseInt(data.acentos, 10);
        let regex;

        switch(letra) {
            case 0:
                if(acentos == 0) {
                    const comAcentos = "ÄÅÁÂÀÃĀĂĄāăąäáâàãÉÊËÈĖĘĚĔĒėęěĕēéêëèÍÎÏÌİĮĪıįīíîïìÖÓÔÒÕŐŌőōöóôòõÜÚÛŲŰŮŪųűůūüúûùÇĆČçćčÑŇŅŃñňņńŸÝÿýŹŻŽźżžŁĽĻĹłľļĺĶķĢĞģğĎďŚŠŞśšşŤȚŢťțţŔŘŕř";
                    const semAcentos = "AAAAAAAAAaaaaaaaaEEEEEEEEEeeeeeeeeeIIIIIIIiiiiiiiOOOOOOOoooooooUUUUUUUuuuuuuuuCCCcccNNNNnnnnYYyyZZZzzzLLLLllllKkGGggDdSSSsssTTTtttRRrr";
                    for(var i = 0; i < comAcentos.length; i++) {
                        texto = texto.replaceAll(comAcentos[i], semAcentos[i]);
                    }
                }
                regex = new RegExp(palavra, "gi");
                break;
            case 1:
                if(acentos == 0) {
                    const comAcentos = "āăąäáâàãėęěĕēéêëèıįīíîïìőōöóôòõųűůūüúûùçćčñňņńÿýźżžłľļĺķģğďśšşťțţŕř";
                    const semAcentos = "aaaaaaaaeeeeeeeeeiiiiiiiooooooouuuuuuuucccnnnnyyzzzllllkggdssstttrr";
                    for(var i = 0; i < comAcentos.length; i++) {
                        texto = texto.replaceAll(comAcentos[i], semAcentos[i]);
                    }
                }
                regex = new RegExp(palavra, "g");
                break;
        }

        result = (texto.match(regex) || []).length;
    
        if(result !== undefined) {
            const storage = parseInt(data.storage);
            const varName = this.evalMessage(data.varName, cache);
            this.storeValue(result, storage, varName, cache);
        }
        this.callNextAction(cache);
    },
    
    mod: function(DBM) {
    }
    
    };
    