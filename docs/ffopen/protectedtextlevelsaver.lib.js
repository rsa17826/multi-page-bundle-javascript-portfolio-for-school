;(() => {
  //   function randstr({
  //     lower = true,
  //     upper = false,
  //     number = false,
  //     symbol = false,
  //     length = 20,
  //   } = {}) {
  //     var rand = ""
  //     var string = `${lower ? "asdfghjklzxcvbnmqwertyuiop" : ""}${
  //       upper ? "ASDFGHJKLQWERTYUIOPZXCVBNM" : ""
  //     }${number ? "0123456789" : ""}${
  //       symbol ? ",./;'[]-=\\`~!@#$%^&*()_+|{}:\"<>?" : ""
  //     }`.split("")
  //     var i = length
  //     while (i-- > 0) {
  //       rand += randfrom(string)
  //     }
  //     return rand
  //     function randfrom(min, max) {
  //       if (max === undefined)
  //         return min.length ? min[randfrom(0, min.length - 1)] : ""
  //       if (min == max) return min
  //       if (max) return Math.round(Math.random() * (max - min)) + min
  //       return min[Math.round(Math.random() * (min.length - 1))]
  //     }
  //   }
  const a = loadlib("allfuncs", 'protectedtextlevelsaver.lib.js')
  const protectedtextapi = loadlib("protectedtextapi")
  async function checkforupdate(ptext, data) {
    return new Promise(async (done) => {
      setTimeout(async () => {
        if (!ptext) reload()
        var online = await ptext.load()
        var local = JSON.stringify(data)
        if (local !== online) reload()
        else done()
      }, 20)
    })
  }
  var globaloptions = {}
  var setoptions = loadlib("strict").strictfunction(
    function ({
      serverlocation,
      password,
      parent,
      defaultobj,
      formats,
      uploadnewlevel,
    } = {}) {
      Object.assign(globaloptions, {
        serverlocation,
        password,
        parent,
        defaultobj,
        formats,
        uploadnewlevel,
      })
    },
    [
      {
        type: "object",
        inside: [
          { name: "serverlocation", type: "string" },
          { name: "password", type: "string" },
          { name: "parent", type: "element|undefined" },
          { name: "defaultobj", type: "string|undefined" },
          {
            name: "formats",
            type: "array",
            insideextras: {
              type: "object",
              inside: [
                { name: "name", type: "string" },
                { name: "type", value: ["text", "button"] },
                { name: "filter", type: "object|undefined" },
                { name: "nosave", value: [true, false, undefined] },
                { name: "getdata", type: "function|undefined" },
                { name: "buttontext", type: "string|undefined" },
                { name: "onclick", type: "function|undefined" },
              ],
            },
          },
          {
            name: "uploadnewlevel",
            type: "array",
            insideextras: {
              type: "object",
              inside: [
                { name: "name", type: "string" },
                { name: "prompt", type: "string" },
                { name: "trim", value: [true, false, undefined] },
                { name: "required", value: [true, false, undefined] },
                { name: "onenter", type: "function|undefined" },
                { name: "maxlen", type: "number|undefined" },
                { name: "removechars", type: "regex|undefined" },
                { name: "default", type: "string|undefined" },
              ],
            },
          },
        ],
      },
    ],
  )

  var server
  async function mainsetup() {
    if (!(globaloptions.serverlocation && globaloptions.password))
      throw new Error("must set serverlocation and password")
    server = await new protectedtextapi(
      globaloptions.serverlocation,
      globaloptions.password,
    )
  }
  async function addelems() {
    var filtervals = JSON.parse(localStorage.filtervals || "[]")
    var data = JSON.parse((await server.load()) || globaloptions.defaultobj)
    var oldmainparent = a("#protectedtextlevelsavermainparent").qs().val
    var mainparent = globaloptions.parent.appendChild(
      newelem("div", {
        display: "none",
        width: "100%",
        height: "100%",
        position: "relative",
        top: 0,
        left: 0,
        id: "protectedtextlevelsavermainparent",
      }),
    )
    mainparent.appendChild(
      newelem("button", {
        top: "10px",
        position: "fixed",
        innerHTML: "upload new level",
        border: "2px solid #555",
        onclick() {
          createnewlevel(server, data)
        },
      }),
    )
    log(data.levels)
    var tbody, titles
    var maintable = newelem("table", {}, [
      newelem("thead", {}, [
        (titles = newelem(
          "tr",
          {},
          globaloptions.formats.map((format) => {
            return newelem("th", { innerHTML: format.name })
          }),
        )),
        newelem(
          "tr",
          {},
          globaloptions.formats.map((format) => {
            var filter
            if (format.filter)
              filter = newelem(format.filter.multiline ? "textarea" : "input", {
                placeholder: format.filter.placeholder,
                width: "100px",
                value: filtervals.shift(),
                oncontextmenu(e) {
                  e.preventDefault()
                  filters.forEach((e) => {
                    e.elem.value = ""
                  })
                  localStorage.filtervals = JSON.stringify(
                    filters.map(() => ""),
                  )
                  filterlevels()
                },
                onkeyup: filterlevels,
                onfocus() {
                  this.select()
                },
              })
            if (filter) {
              filters.push({
                elem: filter,
                format: format.filter,
                name: format.name,
              })
            }
            return filter ? newelem("th", {}, [filter]) : newelem("th", {})
          }),
        ),
      ]),
      (tbody = newelem("tbody", {})),
    ])
    var templevels = data.levels
    data.levels.forEach((level, i) => {
      var parent = level.parent
        ? maintable.querySelector("#levelid" + level.parent)
        : tbody
      if (!parent) {
        error(level, i, "invalid parent")
        templevels = templevels.filter((e) => e !== level)
        oldmainparent.remove()
        return reload()
      }
      var elem = newelem(
        "tr",
        {
          level,
          id: "levelid" + level.id,
          class: "level " + (level.parent ? "sublevel" : "mainlevel"),
        },
        globaloptions.formats.map((format) => {
          switch (format.type) {
            case "text":
              return newelem("th", {
                innerHTML: format.getdata
                  ? format.getdata(level)
                  : level[format.name],
              })
            case "button":
              var button = newelem("button", {
                innerHTML: format.buttontext,
                onclick: format.onclick,
              })
              Object.assign(button, {
                server,
                levelindex: i,
                level,
                data,
                async checkforupdate() {
                  return await checkforupdate(server, data)
                },
                async updatelevel() {
                  var leveldata = { ...this.level }
                  if (formatfromcommand(leveldata, this.level)) return
                  this.data.levels[this.levelindex] = leveldata
                  await server.save(JSON.stringify(data))
                  // await checkforupdate(server, data)
                  reload()
                },
                async createnewlevel(modifylevel) {
                  return await createnewlevel(server, data, modifylevel)
                },
              })
              return newelem("th", {}, [button])
          }
        }),
      )
      if (level.parent) {
        if (!parent._children)
          parent.appendChild(newelem("thead", {}, [titles.cloneNode(true)]))
        parent._children ??= []
        parent._children.push(level)
      }
      parent.appendChild(elem)
    })
    if (templevels !== data.levels) {
      data.levels = templevels
      server.save(JSON.stringify(data))
    }
    await checkforupdate(server, data)
    mainparent.style.display = ""
    oldmainparent?.remove?.()
    mainparent.appendChild(maintable)
    filterlevels()
    function filterlevels() {
      var vals = filters.map((filter) => filter.elem.value)
      localStorage.filtervals = JSON.stringify(vals)
      var lls = [...document.querySelectorAll(".mainlevel")]
      if (!vals.join("")) return lls.forEach((e) => (e.style.display = ""))
      lls.forEach((e) => {
        if (
          filters.find((filter) => {
            var filterval = filter.elem.value
            if (!filterval.length) return false
            var levelval = e.level[filter.name]
            if (!filter.format.keepcase) {
              filterval = filterval.toLowerCase()
              levelval = levelval.toLowerCase()
            }
            if (levelval.includes(filterval)) return false
            return true
          })
        ) {
          e.style.display = "none"
        } else {
          e.style.display = ""
        }
      })
    }
    function formatfromcommand(leveldata, level = {}) {
      return globaloptions.uploadnewlevel.find((command) => {
        if (command.nosave) return
        var inp =
          prompt(command.prompt, level[command.name] ?? command.default) ??
          command.default ??
          ""
        if (command.trim) inp = inp.trim()
        if (command.maxlen) inp = inp.substring(0, command.maxlen)
        inp = command.onenter ? command.onenter(inp) : inp
        if (!inp) inp = ""
        if (command.removechars) inp = inp.replaceAll(command.removechars, "")
        if (!inp)
          if (command.required) {
            alert(`error setting ${command.name}`)
            return true
          } else return (leveldata[command.name] = command.default)
        leveldata[command.name] = inp
      })
    }
    async function createnewlevel(server, data, modifylevel = (e) => e) {
      await checkforupdate(server, data)
      var leveldata = {}
      if (formatfromcommand(leveldata)) return false
      leveldata.id = a({ lower: true, upper: true, number: true }).randstr().val
      data.levels.push(modifylevel(leveldata))
      await server.save(JSON.stringify(data))
      reload()
      return true
    }
  }
  loadlib("libloader").savelib("protectedtextlevelstorage", {
    checkforupdate,
    addelems,
    setoptions,
    mainsetup,
  })
})()
