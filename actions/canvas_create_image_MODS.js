module.exports = {
  name: 'Canvas Create Image MOD',
  section: 'Image Editing',
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/English',
    downloadURL: 'https://github.com/DBM-Mods/English/archive/refs/heads/main.zip',
  },

  subtitle (data) {
    return `${data.url}`
  },

  variableStorage (data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    return ([data.varName, 'Image'])
  },

  fields: ['url', 'width', 'height', 'iffalse', 'iffalseVal', 'storage', 'varName'],

  html (isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Version 0.2</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
<div>
  <span class="dbminputlabel">Local/Web URL</span><br>
  <input id="url" class="round" type="text" value="resources/"><br>
</div>

<div>
  <div style="float: left; width: 50%;padding:0px 5px 0px 0px">
  <span class="dbminputlabel">Width (px or %)</span><br>
    <input id="width" class="round" type="text" placeholder="Leave blank for default" value="100%"><br>
  </div>
  <div style="float: right; width: 50%;padding:0px">
  <span class="dbminputlabel">Height (px or %)</span><br>
    <input id="height" class="round" type="text" placeholder="Leave blank for default" value="100%"><br>
  </div>
</div>
<br>

<div style="padding-top: 8px;">
<div style="float: left; width: 38%">
<span class="dbminputlabel">If the image fails</span><br>
<select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
<option value="0" selected>Continue Actions</option>
<option value="1">Stop action sequence</option>
<option value="2">Go to action</option>
<option value="3">Skip next actions</option>
<option value="4">Go to action anchor</option>
</select>
</div>

<div id="iffalseContainer" style="display: none; float: right; width: 60%;"><span id="xinelas" class="dbminputlabel">Para</span><br><input id="iffalseVal" class="round" name="actionxinxyla" type="text"></div>
</div>
<br><br><br><br><br><br>
<div>
  <div style="float: left; width: 38%;">
  <span class="dbminputlabel">Store in</span><br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; width: 60%;">
  <span class="dbminputlabel">Variable Name</span><br>
    <input id="varName" class="round" type="text"><br>
  </div>
</div>`
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

  async action (cache) {
    const data = cache.actions[cache.index]
    const Canvas = require('canvas')
    try {
    await Canvas.loadImage(this.evalMessage(data.url, cache)).then((image) => {
      var scalex = this.evalMessage(data.width, cache)
      var scaley = this.evalMessage(data.height, cache)
      if(scalex == ''){scalex = "100%"}
      if(scaley == ''){scaley = "100%"}
      let imagew = image.width
      let imageh = image.height
      let scalew = 1
      let scaleh = 1
      scale(scalex, scaley)
      const canvas = Canvas.createCanvas(imagew, imageh)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0, imagew, imageh)
      const result = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
      const varName = this.evalMessage(data.varName, cache)
      const storage = parseInt(data.storage)
      this.storeValue(result, storage, varName, cache)
      this.callNextAction(cache)

      function scale (w, h) {
        if (w.endsWith('%')) {
          const percent = w.replace('%', '')
          scalew = parseInt(percent) / 100
        } else {
          scalew = parseInt(w) / imagew
        }
        if (h.endsWith('%')) {
          const percent = h.replace('%', '')
          scaleh = parseInt(percent) / 100
        } else {
          scaleh = parseInt(h) / imageh
        }
        imagew *= scalew
        imageh *= scaleh
      }

    })}
    catch (err) {this.executeResults(false, data, cache)}

  
  },

  mod () {}
}
