// ==UserScript==
// @name         lib:menu
// @version      2
// @description  none
// @run-at       document-start
// @author       You
// @license      GPLv3
// @match        *://*/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJQTFRFAAAAEIijAo2yAI60BYyuF4WaFIifAY6zBI2wB4usGIaZEYigIoiZCIyrE4igG4iYD4mjEomhFoedCoqpDIqnDomlBYyvE4efEYmiDYqlA42xBoytD4mkCYqqGYSUFYidC4qoC4upAo6yCoupDYqmCYur4zowOQAAACZ0Uk5TAO////9vr////1+/D/+/L+/Pf/////+f3///////H4////////+5G91rAAACgUlEQVR4nM2Y22KjIBCGidg1264liZqDadK03X3/V2wNKHMC7MpF/xthHD5mgERAqZhWhfYqH6K+Qf2qNNf625hCoFj9/gblMUi5q5jLkXLCKudgyiRm0FMK82cWJp1fLbV5VmvJbCIc0GCYaFqqlDJgADdBjncqAXYobm1xh72aFMflbysteFfdy2Yi1XGOm5HGBzQ1dq7TzEoxjeNTjQZb7VA3e1c7+ImgasAgQ9+xusNVNZIo5xmOMgihIS2PbCQIiHEUdTvhxCcS/kPomfFI2zHy2PkWmA6aNatIJpKFJyekyy02xh5Y3DI9T4aOT6VhIUrsNTFp1pf79Z4SIIVDegl6IJO6cHiL/GimIZDhgTu/BlYWCQzHMl0zBWT/T3KAhtxOuUB9FtBrpsz0RV4xsjHmW+UCaffcSy/5viMGer0/6HdFNMZBq/vjJL38H9Dqx4Fuy0Em12DbZy+9pGtiDijbglwAehyj11n0tRD3WUBm+lwulE/8h4BuA+iWAQQnteg2Xm63WQLTpnMnpjdge0Mgu/GRPsV4xdjQ94Lfi624fabhDkfUqIKNrM64Q837v8yL0prasepCgrtvw1sJpoqanGEX7b5mQboNW8eawXaWXTMfMGxub472hzWzHSn6Sg2G9+6TAyRruE71s+zAzjWaknoyJCQzwxrghH2k5FDT4eqWunuNxyN9QCGcxVod5oADbYnIUkDTGZEf1xDJnSFteQ3KdsT8zYDMQXcHxsevcLH1TrsABzkNPyA/L7b0jg704viMMlpQI96WsHknCt/3YH0kOEo9zcGkwrFK39ck72rmoehmKqo2RKlilzSy/nJKEV45CT38myJp456fezktHjN5aeMAAAAASUVORK5CYII=
// @grant        none
// @namespace https://greasyfork.org/users/1184528
// @downloadURL https://update.greasyfork.org/scripts/492112/lib%3Amenu.user.js
// @updateURL https://update.greasyfork.org/scripts/492112/lib%3Amenu.meta.js
// ==/UserScript==
JSON.tryparse ??= function (json) {
  try {
    return JSON.parse(json)
  } catch (e) {
    console.warn("JSON.tryparse error", e)
    return undefined
  }
}
// hint button style useroption
;(() => {
  function checkformatofformat(obj) {
    const { condfunc, setformat, testformat, optional } =
      loadlib("strict")
    obj.forEach((obj) =>
      testformat(obj, {
        default: setformat({ type: ["any", "none"] }),
        round: condfunc(({ type }) =>
          setformat({
            type: type == "number" ? ["boolean", "none"] : ["none"],
          })
        ),
        text: condfunc(({ key, type }) =>
          setformat({
            type:
              type == "groupend"
                ? ["none"]
                : key
                ? ["string", "none"]
                : ["string"],
          })
        ),
        key: condfunc(({ text, type }) =>
          setformat({
            type:
              type == "button" ||
              type == "groupend" ||
              type == "groupstart"
                ? ["undefined"]
                : text
                ? ["string", "none"]
                : ["string"],
          })
        ),
        ignorekeycase: condfunc(({ type }) =>
          setformat({
            type: type == "key" ? ["boolean", "none"] : ["undefined"],
          })
        ),
        type: setformat({
          value: [
            "button",
            "boolean",
            "text",
            "number",
            "key",
            "none",
            "select",
            "range",
            "groupstart",
            "groupend",
            //               "color",
            //               "array",
          ],
        }),
        forcelower: condfunc((obj) =>
          setformat({
            value: ["text", "key"].includes(obj.type)
              ? obj.forceupper
                ? [false, undefined]
                : [true, false, undefined]
              : [undefined],
          })
        ),
        forceupper: condfunc((obj) =>
          setformat({
            value: ["text", "key"].includes(obj.type)
              ? obj.forcelower
                ? [false, undefined]
                : [true, false, undefined]
              : [undefined],
          })
        ),
        tab: optional(setformat({ type: "number" })),
        innerstyle: optional(
          setformat(
            {},
            { allowextras: true, extrasformat: { type: ["string"] } }
          )
        ),
        textstyle: optional(
          setformat(
            {},
            { allowextras: true, extrasformat: { type: ["string"] } }
          )
        ),
        buttontext: condfunc((obj) =>
          setformat({
            type: obj.type == "button" ? ["string"] : ["none"],
          })
        ),
        hint: optional(setformat({ type: ["string"] })),
        onclick: condfunc((obj) =>
          setformat({
            type:
              obj.type == "button"
                ? ["function", "asyncfunction"]
                : ["none"],
          })
        ),
        options: condfunc((obj) =>
          setformat({
            type: obj.type == "select" ? ["array"] : ["none"],
          })
        ),
        oncontextmenu: condfunc((obj) =>
          setformat({
            type:
              obj.type == "button"
                ? ["function", "asyncfunction", "none"]
                : ["none"],
          })
        ),
        min: condfunc(({ type }) =>
          setformat({
            type:
              type == "range"
                ? ["number"]
                : type == "number"
                ? ["number", "none"]
                : ["none"],
          })
        ),
        step: condfunc(({ type }) =>
          setformat({
            type:
              type == "range"
                ? ["number"]
                : type == "number"
                ? ["number", "none"]
                : ["none"],
          })
        ),
        max: condfunc(({ type }) =>
          setformat({
            type:
              type == "range"
                ? ["number"]
                : type == "number"
                ? ["number", "none"]
                : ["none"],
          })
        ),
        hinttype: condfunc((obj) =>
          setformat({
            value: "hint" in obj ? ["text", "html"] : [undefined],
          })
        ),
        allowmodifiers: condfunc((obj) =>
          setformat({
            value: obj.type == "key" ? [true, false] : [undefined],
          })
        ),
        keyreturntype: condfunc((obj) =>
          setformat({
            value:
              obj.type == "key" ? ["object", "string"] : [undefined],
          })
        ),
        allowanynumber: condfunc(({ type }) =>
          setformat({
            type:
              type == "range" ? ["boolean", "none"] : ["undefined"],
          })
        ),
      })
    )
  }
  function blockevent(e) {
    if (!e) return
    e.preventDefault?.()
    e.stopPropagation?.()
    e.stopImmediatePropagation?.()
  }
  const a = loadlib("allfuncs")
  const e = loadlib("newelem")
  const userliboptions = loadlib("libloader").savelib(
    "menu",
    class menu {
      #options
      #globalopts
      #format
      #main
      constructor(...args) {
        this.#globalopts = {}
        this.update(...args)
      }
      update(options, format, globalopts = {}) {
        this.#options = options || this.#options
        this.#format = [...(format || this.#format)].map((e) => {
          return { ...e }
        })
        checkformatofformat(this.#format)
        const { setformat, testformat } = loadlib("strict")
        testformat(
          { ...this.#globalopts, ...globalopts },
          {
            noclosebutton: setformat({
              type: ["boolean", "undefined"],
            }),
            onchange: setformat({ type: ["function", "undefined"] }),
            onhide: setformat({ type: ["function", "undefined"] }),
            onshow: setformat({ type: ["function", "undefined"] }),
            position: setformat({
              value: [
                "unset",
                "full screen",
                "top left",
                "top center",
                "top right",
                "center left",
                "center",
                "center right",
                "bottom left",
                "bottom center",
                "bottom right",
              ],
            }),
            dimmeropacity: setformat({ type: ["number", "none"] }),
            cursor: setformat({ type: ["string", "none"] }),
          },
          { functionname: "lib:menu" }
        )
        Object.assign(this.#globalopts, globalopts)
        if (this.#main) {
          this.hide()
          this.show()
        }
      }
      async show() {
        var groupparent = [],
          groupcount = 0
        this.#globalopts.onshow?.()

        if (!document.body) await a().bodyload()
        var options = this.#options
        var format = this.#format
        var onsave = this.#globalopts.onchange
        const globalopts = this.#globalopts
        if (this.#main) this.#main?.remove?.()
        this.#main = undefined
        const closethis = this.hide.bind(this)
        var main = a(document.body).createelem("div", {
          position: "fixed",
          top: "0",
          right: "0",
          zIndex: 99999,
          colorScheme: "dark",
        }).val
        var shadow = a(
          userliboptions.noshadows
            ? main
            : main.attachShadow({ mode: "open" })
        )
        if (this.#globalopts.cursor)
          a(shadow).createelem("style", {
            innerHTML: `
            * {
              cursor: ${this.#globalopts.cursor};
            }
            input[type="number"]::-webkit-inner-spin-button,
            input[type="number"]::-webkit-outer-spin-button{
              cursor:  ${this.#globalopts.cursor};
            }
            `,
          })
        const menupos =
          globalopts.position == "unset"
            ? userliboptions.menuposition1 == "full screen"
              ? "full screen"
              : userliboptions.menuposition1 +
                " " +
                userliboptions.menuposition2
            : globalopts.position
        var dimmeropacity =
          this.#globalopts.dimmeropacity ??
          userliboptions.dimmeropacity
        shadow = shadow
          .createelem("div", {
            backgroundColor: this.#globalopts.noclosebutton
              ? "#0000"
              : `rgba(60, 60, 60, ${dimmeropacity})`,
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            maxHeight: "100vh",
            overflow: "scroll",
            pointerEvents:
              dimmeropacity == 0 || this.#globalopts.noclosebutton
                ? "none"
                : "",
            onclick({ target }) {
              if (this !== target) return
              if (userliboptions.clickoffclosesmenu) closethis()
            },
          })
          .createelem("div", {
            position: "fixed",
            backgroundColor: "#888",
            padding: "10px",
            border: "10px solid #333",
            borderRadius: "10px",
            color: "#ddd",
            pointerEvents: "all",
            width: "fit-content",
            height: "fit-content",
            maxHeight: "calc(100vh - 40px)",
            overflow: "scroll",

            ...(() => {
              if (menupos == "full screen")
                return {
                  top: 0,
                  left: 0,
                  width: "calc(100vw - 40px)",
                  height: "calc(100vh - 40px)",
                }
              var pos = menupos.split(" ")
              var obj = {}
              if (pos.includes("center")) {
                pos = pos.filter((e) => e && e !== "center")
                if (["left", "right"].includes(pos[0])) {
                  obj.top = "50%"
                  obj.translate = "0 -50%"
                } else if (["top", "bottom"].includes(pos[0])) {
                  obj.left = "50%"
                  obj.translate = "-50% 0"
                } else
                  return {
                    top: "50vh",
                    left: "50vw",
                    translate: "-50% -50%",
                  }
              }
              pos.forEach((p, i) => {
                obj[p] = 0
              })
              return obj
            })(),
          })

        var temp = shadow.createelem("div", {
          width: "100%",
          height: "fit-content",
          display: "flex",
          justifyContent: "flex-end",
        })

        if (!this.#globalopts.noclosebutton)
          temp.createelem("button", {
            innerHTML: "x",
            width: "22px",
            height: "22px",
            onclick: closethis,
            color: "#ddd",
          })

        shadow = shadow.val

        format.forEach((f) => {
          var resettodefaultbutton
          var canrunonsavefunction = false
          function modify(f, val) {
            options[f.key] = f.func ? f.func(val) : val
            if (canrunonsavefunction && onsave) onsave(f.key, val)
            if (resettodefaultbutton)
              resettodefaultbutton.style.visibility =
                val == f.default ? "hidden" : "visible"
          }
          if (f.type == "groupend") {
            groupparent.pop()
            groupcount--
            return
          }
          f.text ??= f.key
          f.key ??= f.text
          f.innerstyle ??= {}
          if (!("default" in f)) f.default = options[f.key]
          f.textstyle ??= {}
          //           if (f.type == "groupstart") groupparent = undefined
          //           if (groupparent) {
          f.tab ??= 0
          f.tab += groupcount
          //           }
          var test = (() => {
            if (f.type !== "none" && !f.text)
              throw new Error(
                "object is missing properties text and key"
              )
            if (!f.type)
              throw new Error("object is missing property key")
            switch (f.type) {
              case "button":
                return [
                  e("button", {
                    marginLeft: "4px",
                    innerHTML: f.buttontext,
                    onclick: f.onclick,
                    settovalue: false,
                    oncontextmenu: f.oncontextmenu,
                    ...f.innerstyle,
                    color: "#ddd",
                  }),
                ]
              case "boolean":
                return [
                  e("input", {
                    type: "checkbox",
                    settovalue(val) {
                      modify(f, (this.checked = val))
                    },
                    checked: options[f.key],
                    onclick() {
                      modify(f, this.checked)
                    },
                    ...f.innerstyle,
                  }),
                ]
              case "text":
                return [
                  e("input", {
                    marginLeft: "4px",
                    value: options[f.key],
                    color: "#ddd",
                    settovalue(val) {
                      this.value = val
                      this.onchange()
                    },
                    onchange() {
                      if (f.forcelower)
                        this.value = this.value.toLowerCase()
                      if (f.forceupper)
                        this.value = this.value.toUpperCase()
                      modify(f, this.value)
                    },
                    ...f.innerstyle,
                  }),
                ]
              case "number":
                return [
                  e("input", {
                    marginLeft: "4px",
                    //                     marginLeft: "auto",

                    //                     translate: f.hint ? "" : "-17px",
                    type: "number",
                    value: options[f.key],
                    step: f.step,
                    min: f.min,
                    max: f.max,
                    settovalue(val) {
                      this.value = val
                      this.onchange()
                    },
                    onchange() {
                      var num = Number(this.value)
                      if (f.round) num = Math.round(num)
                      modify(f, num)
                    },
                    ...f.innerstyle,
                  }),
                ]
              case "key":
                function pressed(e = "UNBOUND") {
                  if (a(e).gettype("string").val) {
                    e = e.split("+")
                    var key = e.pop() ?? "+"
                    e = e.map((e) => e.toLowerCase())
                    e = {
                      key,
                      shiftKey: e.includes("shift"),
                      altKey: e.includes("alt"),
                      metaKey: e.includes("meta"),
                      ctrlKey: e.includes("ctrl"),
                    }
                  }
                  var { shiftKey, ctrlKey, metaKey, altKey, key } = e
                  e.key ??= "UNBOUND"
                  if (key == "Unidentified")
                    throw new Error("key is Unidentified", error(e))
                  if (key == " ") key = "Space"
                  blockevent(e)
                  if (f.allowmodifiers) {
                    this.value = ""
                    if (ctrlKey) this.value += "Ctrl+"
                    if (altKey) this.value += "Alt+"
                    if (shiftKey) this.value += "Shift+"
                    if (metaKey) this.value += "Meta+"
                    this.value +=
                      f.ignorekeycase && key.length == 1
                        ? key.toUpperCase()
                        : key
                  } else
                    this.value =
                      f.ignorekeycase && key.length == 1
                        ? key.toUpperCase()
                        : key
                  switch (f.keyreturntype) {
                    case "string":
                      if (f.allowmodifiers) key = this.value
                      modify(
                        f,
                        f.ignorekeycase ? key.toLowerCase() : key
                      )
                      break
                    case "object":
                      if (f.allowmodifiers)
                        modify(f, {
                          shiftKey,
                          ctrlKey,
                          metaKey,
                          altKey,
                          key: f.ignorekeycase
                            ? key.toLowerCase()
                            : key,
                        })
                      else
                        modify(f, {
                          key: f.ignorekeycase
                            ? key.toLowerCase()
                            : key,
                        })
                      break
                    default:
                      throw new Error("invalid key return type")
                  }
                  this.blur()
                }
                var textholder
                return [
                  e(
                    "div",
                    {
                      width: "100px",
                      height: "20px",
                      backgroundColor: "#444",
                      marginLeft: "4px",
                      settovalue(val) {
                        pressed.call(this.onmousedown(), val)
                      },
                      borderRadius: "10px",
                      color: "#ccc",
                      display: "inline-block",
                      overflow: "scroll",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      onmousedown(e) {
                        var lastmd = this.onmousedown
                        this.onmousedown = undefined
                        var _this = this
                        blockevent(e)
                        var mouselisteners = [
                          a(window).listen("mousedown", (e) => {
                            _this.onmousedown = lastmd
                            e.preventDefault()
                            blockevent(e)
                            e.key = "mouse" + e.button
                            pressed.call(temp, e)
                          }),
                          a(window).listen("mouseup", blockevent),
                          a(window).listen("click", blockevent),
                          a(window).listen("contextmenu", blockevent),
                        ]
                        textholder.lastvals = {
                          text: textholder.innerHTML,
                          size: textholder.style.fontSize,
                        }
                        textholder.style.fontSize = "100%"
                        textholder.innerHTML = "press any key"
                        if (e) e.preventDefault()
                        var temp = a(this).createelem("input", {
                          onkeypress: pressed,
                          onkeyup: pressed,
                          onkeydown(e) {
                            e.preventDefault()
                          },
                          width: "0px",
                          height: "0px",
                          opacity: 0,
                          position: "absolute",
                          onblur() {
                            _this.onmousedown = lastmd
                            setTimeout((e) => {
                              mouselisteners.forEach(
                                (mouselistener) =>
                                  a(mouselistener).unlisten()
                              )
                            })
                            textholder.style.fontSize =
                              textholder.lastvals.size
                            textholder.innerHTML =
                              textholder.lastvals.text
                            if (
                              this.value.toLowerCase() == "escape" &&
                              userliboptions.escapeunbindskeypicker
                            )
                              this.value = "UNBOUND"
                            else if (
                              !this.value ||
                              (this.value.toLowerCase() == "escape" &&
                                userliboptions.escapecancelskeypicker)
                            )
                              return this.remove()

                            textholder.style.fontSize =
                              this.value.length > 12
                                ? this.value.length > 16
                                  ? this.value.length > 21
                                    ? "40%"
                                    : "60%"
                                  : "80%"
                                : "100%"
                            textholder.textContent = this.value
                            this.remove()
                          },
                        }).val
                        temp.select()
                        return temp
                      },
                      display: "inline-block",
                    },
                    [
                      (textholder = e("div", {
                        marginLeft: "auto",
                        marginRight: "auto",
                        height: "fit-content",
                        position: "relative",
                        top: "50%",
                        translate: "0 -50%",
                      })),
                    ]
                  ),
                ]
              case "select":
                return [
                  e("select", {
                    marginLeft: "4px",
                    value: options[f.key],
                    options: f.options,
                    settovalue(val) {
                      modify(f, (this.value = val))
                    },
                    onchange() {
                      modify(f, this.value)
                      this.blur()
                    },
                    ...f.innerstyle,
                  }),
                ]
              case "range":
                var textwidth = 12
                // var ts = String(f.max).length * textwidth
                // if (String(f.step).includes(".")) {
                //   ts +=
                //     String(f.step).match(/(?<=\.)\d+$/)[0].length * textwidth
                //   if (
                //     String(f.max).length !==
                //     String(f.max - f.step / f.step).length
                //   ) {
                //     ts -= textwidth
                //   }
                // }
                // if (f.allowanynumber) ts += 10
                var numinp = e("input", {
                  type: f.allowanynumber ? "number" : "text",
                  width: "60px",
                  onfocus() {
                    this.select()
                  },
                  readOnly: !f.allowanynumber,
                  step: f.step ? (f.step < 1 ? f.step : 1) : 1,
                  oninput() {
                    modify(f, Number((rangeinp.value = this.value)))
                  },
                  settovalue(val) {
                    this.value = val
                  },
                })
                var rangeinp = e("input", {
                  marginLeft: "4px",
                  value: options[f.key],
                  type: "range",
                  min: f.min,
                  onfocus() {
                    this.blur()
                  },
                  tabIndex: -1,
                  step: f.step ?? 1,
                  max: f.max,
                  settovalue(val) {
                    numinp.value = this.value
                    modify(f, Number((this.value = val)))
                  },
                  onchange() {
                    numinp.value = this.value
                    modify(f, Number(this.value))
                  },
                  onmouseout() {
                    if (this.display)
                      this.display.style.display = "none"
                  },
                  onmousemove(event) {
                    var rect = event.target.getBoundingClientRect()
                    //                       var x = event.clientX - rect.left
                    //                       var y = event.clientY - rect.top
                    var { w, x, y } = a(this).rect().val
                    var mousex = event.clientX - x
                    if (!this.display)
                      this.display = this.parentElement.appendChild(
                        e("div", {
                          innerHTML: "loading",
                          position: "fixed",
                          pointerEvents: "none",
                          backgroundColor: "#444",
                          borderRadius: "6px",
                          padding: "2px",
                          translate:
                            userliboptions.showrangenumberbelowrange
                              ? "-50% 100%"
                              : "-50% -100%",
                        })
                      )
                    if (userliboptions.keepnumberdisplaysamesize) {
                      var val = String(this.value)
                      while (val.length < String(f.max).length)
                        val = "0" + val
                      this.display.innerHTML = val
                    } else this.display.innerHTML = this.value
                    Object.assign(this.display.style, {
                      top: y + "px",
                      left:
                        x + Math.min(Math.max(mousex, 0), w) + "px",
                      display: "",
                    })
                  },
                  ...f.innerstyle,
                })
                return [rangeinp, numinp]
              case "none":
                return []
              case "groupstart":
                groupcount++
                groupparent.push(
                  e("div", {
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    height: "20px",
                    minHeight: "20px",
                    overflow: "hidden",
                    marginTop: "2px",
                    marginBottom: "2px",
                    //                   marginBottom: "10px",
                    //                   marginTop: "10px",
                    ...f.innerstyle,
                  })
                )
                return []
              default:
                return [
                  e("span", {
                    marginLeft: "4px",
                    innerHTML: `error type:${f.type}, text:${f.text}`,
                  }),
                ]
            }
          })()
          test.unshift(
            e("span", {
              flexGrow: 1,
            })
          )
          var thisrow = e("div", {
            display: "flex",
            alignItems: "center",
          })
          const prevgroupparent = groupparent[groupparent.length - 2]
          const currentgroupparent =
            groupparent[groupparent.length - 1]
          if (currentgroupparent) {
            ;(prevgroupparent || shadow).appendChild(
              currentgroupparent
            )
            currentgroupparent.appendChild(thisrow)
            //             if (f.type !== "groupstart") thisrow.style.display = "none"
          } else shadow.appendChild(thisrow)
          thisrow.appendChild(
            e(
              "label",
              {
                border: "1px solid #aaa",
                borderRadius: "5px",
                paddingLeft: "5px",
                paddingRight: "5px",
                marginTop: "2px",
                marginBottom: "2px",
                innerHTML:
                  f.type == "groupstart"
                    ? `\u02c3 ${f.text}`
                    : f.text,
                marginLeft:
                  (f.tab ?? 0) * userliboptions.tabsize + "px",
                currentgroupparent,
                width: "100%",
                color: f.type == "groupstart" ? "#222" : "#ddd",
                ...f.textstyle,
                onclick:
                  f.type == "groupstart"
                    ? function () {
                        if (
                          this.currentgroupparent.style.height ==
                          "fit-content"
                        ) {
                          this.currentgroupparent.style.height =
                            "20px"
                          this.innerHTML = `\u02c3 ${f.text}`
                        } else {
                          this.currentgroupparent.style.height =
                            "fit-content"
                          this.innerHTML = `\u02c5 ${f.text}`
                        }
                      }
                    : undefined,
              },
              ["boolean"].includes(f.type) ? test : []
            )
          )

          if (!["boolean"].includes(f.type)) {
            test.forEach(thisrow.appendChild.bind(thisrow))
          }

          if (test && f.hint) {
            f.hint = f.hint.trim()
            var showhint = e("div", {
              border: "2px solid #444",
              borderRadius: "100%",
              marginLeft: "4px",
              innerHTML: "?",
              title: f.hint.length < 60 ? f.hint : "show hint",
              width: "10px",
              height: "10px",
              color: "black",
              fontWeight: "bold",
              display: "inline-block",
              textAlign: "center",
              fontSize: "60%",
              onmouseup(e) {
                e.preventDefault()
                var hintbg = a(this.parentElement).createelem("div", {
                  backgroundColor: "#333",
                  position: "fixed",
                  zIndex: 99,
                  backgroundColor: `rgba(60, 60, 60, ${userliboptions.popupdimmeropacity})`,
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  onclick() {
                    this.remove()
                  },
                }).val
                hintbg.focus()
                var closehintbutton = a(
                  userliboptions.noshadows
                    ? hintbg
                    : hintbg.attachShadow({ mode: "open" })
                ).createelem("div", {
                  color: "#000",
                  fontWeight: "normal",
                  marginLeft: "auto",
                  marginRight: "4px",
                  width: "fit-content",
                  padding: "7px",
                  marginRight: "auto",
                  position: "relative",
                  border: "10px solid #444",
                  backgroundColor: "#777",
                  top: "50%",
                  translate: "0 -50%",
                  ...(f.hintcss ?? {}),
                  onclick: blockevent,
                }).val
                a(closehintbutton).createelem("button", {
                  width: "20px",
                  height: "20px",
                  innerHTML: "x",
                })
                switch (f.hinttype) {
                  case "html":
                    closehintbutton.innerHTML = f.hint
                    break
                  case "text":
                    closehintbutton.innerText = f.hint
                    break
                  default:
                    throw new Error("invalid hint type", {
                      hinttype: f.hinttype,
                      obj,
                      format: f,
                    })
                }
                closehintbutton.innerHTML =
                  '<button style="width:20px; height:20px">x</button><br>' +
                  closehintbutton.innerHTML
                a("button").qs(closehintbutton).val.onclick = () =>
                  hintbg.remove()
              },
            })
            thisrow.appendChild(showhint)
          }
          if (userliboptions.alligninputs) test.shift()
          if (
            test?.[0] &&
            test[0]?.settovalue !== false &&
            f.type !== "none"
          ) {
            resettodefaultbutton = e("div", {
              marginLeft: "4px",
              marginRight: "4px",
              innerHTML: "\u21B6" ?? "\u21B0",
              title: "reset to default",
              width: "10px",
              height: "10px",
              color: "black",
              fontWeight: "bold",
              display: "inline-block",
              visiblity: "hidden",
              textAlign: "center",
              fontSize: "100%",
              translate: "0 -50%",
              ...JSON.tryparse(
                userliboptions.resettodefaultbuttonstyle
              ),
              onclick() {
                test.map((e) => e.settovalue(f.default))
              },
            })
            test.forEach((e) => {
              if (e.settovalue) {
                e.settovalue(
                  f.key in options ? options[f.key] : f.default
                )
                if (canrunonsavefunction) onsave()
              } else warn(e)
            })
            canrunonsavefunction = true
            thisrow.appendChild(resettodefaultbutton)
          }
        })
        this.#main = main
      }
      hide() {
        this.#globalopts.onhide?.()
        if (this.#main) this.#main.remove()
        this.#main = undefined
      }
    },
    {
      showrangenumberbelowrange: {
        type: "boolean",
        text: "show range value below the range instead of above it",
        default: false,
      },
      keepnumberdisplaysamesize: {
        type: "boolean",
        text: "force number display to allways have the same number of digits",
        default: false,
      },
      tabsize: { type: "number", default: 10, text: "tab size" },
      escapecancelskeypicker: {
        default: false,
        type: "boolean",
        text: "escape cancels key picker",
      },
      noshadows: {
        default: false,
        type: "boolean",
        text: "don't create shadow doms",
        hint: "only useful to allow eruda to see it",
        hinttype: "text",
      },
      escapeunbindskeypicker: {
        default: true,
        type: "boolean",
        text: "escape unbinds key in key picker",
      },
      resettodefaultbuttonstyle: {
        default: "{}",
        type: "text",
        text: "reset to default button style",
      },
      dimmeropacity: {
        text: "dimmer opacity",
        default: 0.8,
        type: "range",
        min: 0,
        max: 1,
        step: 0.05,
      },
      popupdimmeropacity: {
        text: "popup dimmer opacity",
        default: 0.8,
        type: "range",
        min: 0,
        max: 1,
        step: 0.05,
      },
      menuposition1: {
        text: "menu position",
        default: "top",
        type: "select",
        options: ["top", "center", "bottom", "full screen"],
      },
      menuposition2: {
        text: "menu position",
        default: "right",
        type: "select",
        options: ["left", "center", "right"],
      },
      // aligninputs: {
      //   text: "align inputs",
      //   default: true,
      //   type: "boolean",
      // },
      clickoffclosesmenu: {
        text: "clicking off the menu closes it",
        default: true,
        type: "boolean",
      },
      alligninputs: {
        text: "allign inputs",
        default: true,
        type: "boolean",
      },
    }
  )
})()
