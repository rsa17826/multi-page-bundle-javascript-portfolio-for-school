// ==UserScript==
// @name         lib:all functions
// @version      10
// @description  none
// @license      GPLv3
// @run-at       document-start
// @author       rssaromeo
// @match        *://*/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJQTFRFAAAAEIijAo2yAI60BYyuF4WaFIifAY6zBI2wB4usGIaZEYigIoiZCIyrE4igG4iYD4mjEomhFoedCoqpDIqnDomlBYyvE4efEYmiDYqlA42xBoytD4mkCYqqGYSUFYidC4qoC4upAo6yCoupDYqmCYur4zowOQAAACZ0Uk5TAO////9vr////1+/D/+/L+/Pf/////+f3///////H4////////+5G91rAAACgUlEQVR4nM2Y22KjIBCGidg1264liZqDadK03X3/V2wNKHMC7MpF/xthHD5mgERAqZhWhfYqH6K+Qf2qNNf625hCoFj9/gblMUi5q5jLkXLCKudgyiRm0FMK82cWJp1fLbV5VmvJbCIc0GCYaFqqlDJgADdBjncqAXYobm1xh72aFMflbysteFfdy2Yi1XGOm5HGBzQ1dq7TzEoxjeNTjQZb7VA3e1c7+ImgasAgQ9+xusNVNZIo5xmOMgihIS2PbCQIiHEUdTvhxCcS/kPomfFI2zHy2PkWmA6aNatIJpKFJyekyy02xh5Y3DI9T4aOT6VhIUrsNTFp1pf79Z4SIIVDegl6IJO6cHiL/GimIZDhgTu/BlYWCQzHMl0zBWT/T3KAhtxOuUB9FtBrpsz0RV4xsjHmW+UCaffcSy/5viMGer0/6HdFNMZBq/vjJL38H9Dqx4Fuy0Em12DbZy+9pGtiDijbglwAehyj11n0tRD3WUBm+lwulE/8h4BuA+iWAQQnteg2Xm63WQLTpnMnpjdge0Mgu/GRPsV4xdjQ94Lfi624fabhDkfUqIKNrM64Q837v8yL0prasepCgrtvw1sJpoqanGEX7b5mQboNW8eawXaWXTMfMGxub472hzWzHSn6Sg2G9+6TAyRruE71s+zAzjWaknoyJCQzwxrghH2k5FDT4eqWunuNxyN9QCGcxVod5oADbYnIUkDTGZEf1xDJnSFteQ3KdsT8zYDMQXcHxsevcLH1TrsABzkNPyA/L7b0jg704viMMlpQI96WsHknCt/3YH0kOEo9zcGkwrFK39ck72rmoehmKqo2RKlilzSy/nJKEV45CT38myJp456fezktHjN5aeMAAAAASUVORK5CYII=
// @grant        none
// @tag lib
// @exclude      /livereload.net\/files\/ffopen\/index.html$/
// @namespace https://greasyfork.org/users/1184528
// @downloadURL https://update.greasyfork.org/scripts/489763/lib%3Aall%20functions.user.js
// @updateURL https://update.greasyfork.org/scripts/489763/lib%3Aall%20functions.meta.js
// ==/UserScript==
;(async function () {
  const { savelib } = loadlib("libloader", "allfuncs.js")
  const proxy_set = new WeakSet()
  const oldproxy = Proxy
  window.Proxy = new Proxy(oldproxy, {
    construct(_target, args) {
      const proxy = new oldproxy(...args)
      proxy_set.add(proxy)
      return proxy
    },
  })
  const isproxy = function (proxy) {
    return proxy_set.has(proxy)
  }
  Object.keys(console).forEach((e) => {
    window[e] = function (...args) {
      var z = []
      let pi = 0
      args.forEach((y) => {
        let rand = `{${pi}}${a().randstr().val}`
        while (true) {
          if (isa(y)) {
            z.push("function_chain >")
            y = y.val
            continue
          } else if (a(y).gettype("promise").val) {
            pi++
            y.then((...args) =>
              window[e]("RESOLVED - " + rand, ...args)
            ).catch((...args) =>
              window[e]("REJECTED - " + rand, ...args)
            )
            y = "PROMISE - " + rand
            continue
          }
          z.push(y)
          break
        }
      })
      console[e](...z)
      return z
    }
  })

  const warn = console.warn.bind(window)
  const log = console.log.bind(window)
  const error = console.error.bind(window)
  const time = console.time.bind(window)
  const timeEnd = console.timeEnd.bind(window)
  // Object.assign(window, console)
  //   if (window.a) error("allfuncs allready exists")
  var getvm = function () {
    const oldBind = Function.prototype.bind
    Function.prototype.bind = function (...args) {
      if (
        args[0] &&
        args[0]?.hasOwnProperty?.("editingTarget") &&
        args[0].hasOwnProperty("runtime")
      ) {
        Function.prototype.bind = oldBind
        savelib("scratch", { vm: args[0] })
      }
      return oldBind.apply(this, args)
    }
  }
  getvm()

  function isa(inp1) {
    return (
      inp1?.[Math.random()]?.name === "function_chain" ||
      inp1?.name === "function_chain"
    )
  }

  function noa(inp1) {
    return isa(inp1) ? inp1.val : inp1
  }
  const blank = {}
  const isstrict = {}
  const ischaining = {}

  function a(inp1, ic, temparr) {
    if (ic !== ischaining) {
      temparr = []
    }
    inp1 = noa(inp1)
    return new Proxy(
      {},
      {
        set(_obj, _prop, _val) {},
        get(_obj, prop) {
          if (prop == Symbol.toStringTag) {
            warn(Symbol.toStringTag)
            return "testing"
          }
          if (prop == Symbol.iterator) {
            switch (a(inp1).gettype().val) {
              case "string":
                return function* () {
                  for (var i in inp1.split("")) yield inp1[i]
                }
              case "number":
                return function* () {
                  for (var i in String(inp1).split("")) yield inp1[i]
                }
              case "array":
                return function* () {
                  for (var i in inp1) yield inp1[i]
                }
              case "object":
                return function* () {
                  for (var i in Object.entries(inp1)) yield inp1[i]
                }
              default:
                return function* () {
                  yield inp1
                }
            }
          }
          if (prop == Symbol.toPrimitive) {
            return function (hint) {
              switch (hint) {
                case "number":
                  if (Number(inp1) != inp1)
                    error(`"${inp1}" is not a number or is nan`, inp1)
                  return Number(inp1)
                case "string":
                  if (a(inp1).gettype(["array", "object"]).val)
                    return JSON.stringify(inp1)
                  return String(inp1)
                case "default":
                  if (a(inp1).gettype("string").val)
                    if (String(Number(inp1)) == inp1)
                      return Number(inp1)
                    else return String(inp1)
                  if (a(inp1).gettype(["array", "object"]).val)
                    return JSON.stringify(inp1)
                  if (a(inp1).gettype(["undefined", "null", "nan"]))
                    return String(inp1)
              }
              error(prop, hint)
              return hint
            }
          }
          if (typeof prop == "symbol") log(prop)
          if (
            ["end", "out", "ret", "done", "value", "val"].includes(
              prop
            )
          ) {
            if (temparr.length) {
              var x = [...temparr]
              temparr = []
              return x
            }
            return inp1
          }

          if (prop == "allfuncs")
            return new Proxy(allfuncs, {
              set(_a, s) {
                throw new Error(
                  `you can't overwrite property "${s}" on "allfuncs".
if you are trying to add a new function
use allfuncs.new(function_name, function, tags)`
                )
              },
              deleteProperty(_a, s) {
                throw new Error(
                  `you can't delete property "${s}" on "allfuncs".`
                )
              },
            })
          if (prop == "push")
            return new Proxy(
              {},
              {
                get(_a, s) {
                  temparr.push(inp1[s])
                  return a(inp1, ischaining, temparr)
                },
              }
            )
          if (prop == "get")
            return new Proxy(
              {},
              {
                get(_a, s) {
                  return a(inp1[s], ischaining, temparr)
                },
              }
            )
          if (prop == "set")
            return new Proxy(
              {},
              {
                get(_a, s) {
                  return function (val) {
                    inp1[s] = val
                    return a(inp1, ischaining, temparr)
                  }
                },
              }
            )
          if (prop == "run")
            return new Proxy(
              {},
              {
                get(_a, s) {
                  if (s == "same") {
                    return new Proxy(
                      {},
                      {
                        get(_a, s) {
                          return function (...args) {
                            var inp = inp1
                            inp1[s](...args)
                            return a(inp, ischaining, temparr)
                          }
                        },
                      }
                    )
                  } else
                    return function (...args) {
                      return a(inp1[s](...args), ischaining, temparr)
                    }
                },
              }
            )
          const { gettype } = allfuncs
          const function_chain = function (...rest) {
            if (gettype(allfuncs[prop]) !== "function")
              if (!gettype(inp1, ["undefined", "null", "nan"]))
                if (
                  gettype(
                    Object.getPrototypeOf(inp1)[prop],
                    "function"
                  )
                )
                  return a(
                    Object.getPrototypeOf(inp1)[prop].call(
                      inp1,
                      ...rest
                    )
                  )
                else throw new Error(`"${prop}" is not a function`)
            var inps = inp1 === blank ? rest : [inp1, ...rest]
            var ret = allfuncs[prop](...inps)
            if (
              gettype(ret, "array") &&
              inp1?.strictargs?.[0] === isstrict &&
              ret?.strictargs?.[0] !== isstrict
            )
              switch (inp1.strictargs[1]) {
                case "object":
                  ret = strictobj(
                    inp1.strictargs[2],
                    inp1.strictargs[3],
                    ret,
                    inp1.strictargs[5]
                  )
                  break
                case "array":
                  ret = strictarr(
                    inp1.strictargs[2],
                    inp1.strictargs[3],
                    ret,
                    inp1.strictargs[5]
                  )
                  break
              }
            return a(ret)
          }
          var temp = {}
          Object.assign(temp, allfuncs[prop]?.function ?? {})
          Object.assign(temp, allfuncs[prop])
          Object.keys(temp).forEach((e) => {
            let func = temp[e]
            function_chain[e] = function (...args) {
              return a(func(...args))
            }
          })

          if (gettype(allfuncs[prop], "function"))
            function_chain.inputs = getprops(allfuncs[prop])
          function_chain.same = function (...args) {
            var inp = inp1
            a(inp1, ischaining, temparr)[prop](...args)
            return a(inp, ischaining, temparr)
          }
          function_chain.run = function (obj) {
            var m = [...function_chain.inputs]
            m = m.vars.map((e, i) =>
              i == 0
                ? e.var in obj
                  ? obj[e.var]
                  : inp1 == blank
                  ? undefined
                  : inp1
                : obj[e.var]
            )
            var ret = allfuncs[prop](...m)
            if (inp1?.strictargs[0] === isstrict)
              switch (inp1.strictargs[1]) {
                case "object":
                  ret = strictobj(
                    inp1.strictargs[2],
                    inp1.strictargs[3],
                    ret,
                    inp1.strictargs[5]
                  )
                  break
                case "array":
                  ret = strictarr(
                    inp1.strictargs[2],
                    inp1.strictargs[3],
                    ret,
                    inp1.strictargs[5]
                  )
                  break
              }
            var shouldret = getprops(allfuncs[prop]).return
            if (
              shouldret
                .split("|")
                .find((type) => type == "any" || type == gettype(ret))
            )
              return a(ret)
            throw new Error(
              `the function "${prop}" returned a type of "${gettype(
                ret
              )}",\nwhich doesn't match type of "${shouldret}"`
            )
          }
          return function_chain
        },
      }
    )
  }

  function expandederror( //error
    obj //object
  ) {
    error(obj)
    return Error(obj.message)
  }
  const strictfunction = function (
    //any
    func, //function|class
    name, //string|none
    notrequired //boolean|none
  ) {
    if (notrequired) {
      if (getprops(func).broken) {
        warn("the function is missing type data")
        return func
      }
    } else {
      if (getprops(func).broken) {
        error(getprops(func))
        throw new Error(
          `the function doesn't have the required type data`
        )
      }
    }
    var temp = function (...args) {
      var vars = getprops(func).vars
      if (
        vars.filter(
          (e) =>
            !(
              e.type.includes("?") ||
              e.type.split("|").includes("none") ||
              e.type.split("|").includes("undefined")
            )
        ).length > args.length
      ) {
        error(
          `function [${
            Object.getPrototypeOf(func).name || name || "unknown"
          }] - requires ${
            vars.filter((e) => !e.type.includes("?")).length
          } arguments but only found ${args.length}`
        )
      }
      vars.length = args.length
      vars.map(function (thing, index) {
        if (thing.type) {
          if (index > args.length - 1) {
            if (
              thing.type.includes("?") ||
              thing.type.includes("none")
            )
              return true
            throw expandederror({
              message: `function [${
                Object.getPrototypeOf(func).name || name || "unknown"
              }] - input "${thing.var}" is not optional`,
              function_name:
                Object.getPrototypeOf(func).name || name || "unknown",
              function: func,
              values: args,
              function_string: String(func),
            })
          }
          if (
            thing.type.split("|").includes("array") &&
            a(args[index]).gettype("htmlcollection").val
          ) {
            args[index] = [...args[index]]
          }
          if (
            thing.type
              .split("|")
              .find(
                (type) =>
                  (!!args[index] === true && type == "true") ||
                  (!!args[index] === false && type == "false") ||
                  (a(args[index]).gettype([
                    "null",
                    "undefined",
                    "nan",
                  ]).val &&
                    type == "none") ||
                  type == "any" ||
                  a(args[index]).gettype(type).val
              )
          )
            return true
          else if (
            thing.type.split("|").includes("elements") &&
            a(args[index]).toelem().gettype("array").val
          ) {
            args[index] = a(args[index]).toelem().val
            if (
              thing.type.split("|").includes("element") &&
              args[index].length === 1
            )
              args[index] = args[index][0]
            return true
          } else if (
            thing.type.split("|").includes("element") &&
            a(args[index]).toelem(true).gettype("element").val
          )
            args[index] = a(args[index]).toelem(true).val
          if (
            thing.type.split("|").includes("element") &&
            a(args[index]).toelem(true).gettype("element").val
          ) {
            args[index] = a(args[index]).toelem(true).val
            return true
          } else {
            throw expandederror({
              message: `function [${
                Object.getPrototypeOf(func).name || name || "unknown"
              }] - in "${thing.var}", the input of "${
                args[index]
              }" is a type of "${
                a(args[index]).gettype().val
              }", which doesn't match required type of "${
                thing.type
              }"`,
              function_name:
                Object.getPrototypeOf(func).name || name || "unknown",
              function: func,
              function_string: String(func),
            })
          }
        } else return true
      })
      var shouldret = getprops(func).return
      if (a(func).gettype("function").val) {
        var ret = func(
          ...args //...getprops(func).vars.map((_e, index) => args[index])
        )
      } else {
        var ret = new func(...args)
      }
      // if (args[0]?.strictargs?.[0] === isstrict)
      //   switch (args[0].strictargs[1]) {
      //     case "object":
      //       ret = strictobj(
      //         args[0].strictargs[2],
      //         args[0].strictargs[3],
      //         ret,
      //         args[0].strictargs[5]
      //       )
      //       break
      //     case "array":
      //       ret = strictarr(
      //         args[0].strictargs[2],
      //         args[0].strictargs[3],
      //         ret,
      //         args[0].strictargs[5]
      //       )
      //       break
      //   }
      if (
        shouldret
          .split("|")
          .find(
            (type) =>
              (!!ret === true && type == "true") ||
              (!!ret === false && type == "false") ||
              (["null", "undefined", "nan"].includes(
                a(ret).gettype().val
              ) &&
                type == "none") ||
              type == "any" ||
              a(ret).gettype(type).val
          )
      )
        return ret
      throw expandederror({
        message: `the function [${
          Object.getPrototypeOf(func).name || name || "unknown"
        }] returned a type of "${
          a(ret).gettype().val
        }", which doesn't match type of "${shouldret}"`,
        function_name:
          Object.getPrototypeOf(func).name || name || "unknown",
        function: func,
        function_string: String(func),
      })
    }
    temp.function = func
    return temp
  }
  const getprops = (function () {
    var cache = {}
    return function (
      //array
      func //function
    ) {
      var test = String(func).match(/\(([^]*)/)[1]
      if (cache[test]) return cache[test]

      var arr = []
      var x
      test = test
        .replaceAll(/\\./g, "")
        .replaceAll(/`[^]*?(?<!\\)`/g, "")
        .replaceAll(/'.*?(?<!\\)'/g, "")
        .replaceAll(/".*?(?<!\\)"/g, "")
        .replaceAll(
          /(\/\/).*|\/\*[^]*?\*(?<!\\)\//g,
          function (e, a) {
            arr.push(
              a
                ? e.replace("//", "")
                : e.replace(/^\/\*/, "").replace(/\*\/$/, "")
            )
            return `\u1111${arr.length - 1}\u1111`
          }
        )
        .replaceAll(/\/.*?(?<!\\)\//g)
      var prevtest = test
      while (prevtest.match(/(?<![\]})])[{\[(]/)) {
        test = prevtest
        x = prevtest.match(/(?<![\]})].*?)[{\[(]/)
        if (!x) break
        var count = 0
        var i = 0
        var start = x.index
        var end = x.index
        while (i++ < 40) {
          if (/[\[{(]/.test(x[0])) count++
          else count--
          if (count == 0) break
          test = test.slice(x.index + 1)
          x = test.match(/[{\[(\])}]/)
          end += x.index + 1
        }
        prevtest =
          prevtest.slice(0, start) +
          "<><><>" +
          prevtest.slice(end + 1)
      }
      var fualtyreturn = false
      var temp = {
        return: arr[0],
        vars: [
          ...[
            ...prevtest
              .match(/[^]*?(?=\))/)[0]
              .matchAll(
                /(?<=(?:,|^)[^=]*)([a-zA-Z_$][\da-zA-Z_$]*)(?:(?:[^](?![a-zA-Z_$][\da-zA-Z_$].*,|,.*[a-zA-Z_$][\da-zA-Z_$]))*?(?:\s*=\s*)?[^\u1111]*\u1111(\d+)\u1111)?/g
              ),
          ].map((e, _i) => {
            if (e[2] == 0) fualtyreturn = true
            return {
              var: e[1],
              type: arr[e[2]],
            }
          }),
        ],
      }
      if (fualtyreturn) temp.return = undefined
      temp.broken = false
      if (temp.return == undefined) temp.broken = true
      temp.vars.forEach((e) => {
        if (e.type === undefined) temp.broken = true
      })
      // temp.return||='any'
      // temp.broken
      // temp.vars = temp.vars.map(e=>{return{...e, type:e.type||'any'}})
      cache[String(func).match(/\(([^]*)/)[1]] = temp
      return temp
    }
  })()
  const allfuncs = {
    new(name, func, folder) {
      if (this[name]) {
        name += Math.random()
        error(name)
      }
      this[name] =
        name == "gettype" || name == "toelem"
          ? func
          : strictfunction(func, name, true)
      var arr = getprops(func)
      arr = [
        ...arr.vars,
        {
          return: arr.return,
        },
      ]
      if (
        arr
          .map((e) => e.type || e?.return)
          .filter((e) => typeof e !== "string").length
      )
        warn(name)
      this[name].help = arr
      this[name].function = func
      this[name].table = function () {
        var x = getprops(this?.function || allfuncs[name].function)
        var arr = {}
        x.vars.forEach((e) => {
          arr = {
            ...arr,
            ...{
              [e.var]: e.type,
            },
          }
        })
        table({
          ...arr,
          broken: x.broken,
          return: x.return,
        })
      }
      if (!folder) folder = "unknown"
      if (folder.includes("/")) folder = folder.split("/")
      else if (typeof folder == "string") folder = [folder]
      folder.forEach((folder) => {
        if (!this.folders) this.folders = {}
        if (!this.folders[folder]) this.folders[folder] = {}
        this.folders[folder][name] = func
        this.folders[folder][name].help = arr
      })
      this[name].folders = folder
      Object.defineProperty(a, "length", {
        //new
        //folders
        value: Object.keys(allfuncs).length - 2,
      })
      return this[name]
    },
  }
  class tween {
    #from
    #to
    #time
    #delay
    #loopondone
    #reverseondone
    #updatefunc = []
    #donefunc = []
    #active = 0
    #firstfrom
    #firstto
    constructor(
      //object
      from, //number
      to, //number
      time, //number
      delay, //number
      loopondone, //boolean|none
      reverseondone, //boolean|none
      ignorefocusloss //boolean|none
    ) {
      if (typeof from == "number") {
        this.#from = from
        this.#to = to
        this.#time = time
        this.#delay = delay
        this.#loopondone = loopondone
        this.#reverseondone = reverseondone
      } else if (typeof from == "object") {
        a(from).foreach(function (key, value) {
          this["#" + key] = value
        })
      }
      this.restart = this.restart
      this.onchange = this.onchange
      this.ondone = this.ondone
      this.#firstfrom = this.#from
      this.#firstto = this.#to
      const top = this
      if (!ignorefocusloss) {
        a(window).listen("blur", function () {
          if (!top.paused) top.paused = 1
        })
        a(window).listen("focus", function () {
          if (top.paused === 1) top.paused = false
        })
      }
      if (this.#loopondone) this.#reverseondone = false
      this.#updatefunc = []
      this.#donefunc = []
      this.#go()
    }
    restart() {
      this.#from = this.#firstfrom
      this.#to = this.#firstto
      this.#go()
    }
    async #go() {
      this.#active++
      var lastactive = this.#active
      var from = this.#from
      var to = this.#to
      var time = this.#time
      var delay = this.#delay || 30
      this.out = this.#from
      var i = 0
      var last = Date.now()
      var dt = 0
      while (i < time) {
        if (lastactive !== this.#active) return
        await a(() => !this.paused).waituntil().val
        a(() => this.#updatefunc.forEach((e) => e(this.out))).ignore()
        last = Date.now()
        var lastwait = delay - dt
        var dt = await a(lastwait).wait().val
        dt = Date.now() - last
        i += dt
        dt -= lastwait
        if (lastactive !== this.#active) return
        this.out = a(i).rerange(0, time, from, to).val
      }
      if (lastactive !== this.#active) return
      this.out = to
      a(() => this.#updatefunc.forEach((e) => e(this.out))).ignore()
      a(() => this.#donefunc.forEach((e) => e())).ignore()
      if (lastactive !== this.#active) return
      if (this.#reverseondone) {
        this.#flip()
        this.#go()
      }
      if (this.#loopondone) this.#go()
    }
    #flip() {
      var x = this.#from
      this.#from = this.#to
      this.#to = x
    }
    onchange(func) {
      this.#updatefunc.push(func)
    }
    ondone(func) {
      this.#donefunc.push(func)
    }
    destroy() {
      this.#active = null
      this.paused = false
      this.#updatefunc = undefined
      this.#donefunc = undefined
      var top = this
      a(this).foreach(function (a) {
        delete top[a]
      })
    }
  }

  allfuncs.new("tween", tween, "time", false)
  allfuncs.new(
    "foreach",
    function (
      //none
      arr, //array|object|any
      func //function
    ) {
      var type = a(arr).gettype().val
      if (type == "array") arr.forEach(func)
      else if (type == "object") {
        Reflect.ownKeys(arr).forEach((e, i) => {
          func(e, arr[e], i)
        })
      } else {
        ;[arr].forEach(func)
      }
    },
    "array",
    true
  )
  allfuncs.new(
    "sendevent",
    function (
      //element
      element, //element
      eventName //string
    ) {
      function extend(destination, source) {
        for (var property in source)
          destination[property] = source[property]
        return destination
      }

      var eventMatchers = {
        HTMLEvents:
          /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
        MouseEvents:
          /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/,
      }
      var defaultOptions = {
        pointerX: 0,
        pointerY: 0,
        button: 0,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        bubbles: true,
        cancelable: true,
      }
      var options = extend(defaultOptions, arguments[2] || {})
      var oEvent,
        eventType = null

      for (var name in eventMatchers) {
        if (eventMatchers[name].test(eventName)) {
          eventType = name
          break
        }
      }

      if (!eventType)
        throw new SyntaxError(
          "Only HTMLEvents and MouseEvents interfaces are supported"
        )

      if (document.createEvent) {
        oEvent = document.createEvent(eventType)
        if (eventType == "HTMLEvents") {
          oEvent.initEvent(
            eventName,
            options.bubbles,
            options.cancelable
          )
        } else {
          oEvent.initMouseEvent(
            eventName,
            options.bubbles,
            options.cancelable,
            document.defaultView,
            options.button,
            options.pointerX,
            options.pointerY,
            options.pointerX,
            options.pointerY,
            options.ctrlKey,
            options.altKey,
            options.shiftKey,
            options.metaKey,
            options.button,
            element
          )
        }
        element.dispatchEvent(oEvent)
      } else {
        options.clientX = options.pointerX
        options.clientY = options.pointerY
        var evt = document.createEventObject()
        oEvent = extend(evt, options)
        element.fireEvent("on" + eventName, oEvent)
      }
      return element
    },
    "element/event/automation"
  )
  allfuncs.new(
    "ignore",
    function (
      //any
      func, //function
      senderr, //boolean|none
      ...args //any|none
    ) {
      try {
        return func(...args)
      } catch (e) {
        return senderr ? e.message : undefined
      }
    },
    "error",
    true
  )
  allfuncs.new(
    "wait",
    function (
      //promise
      ms //number
    ) {
      return new Promise(function (a) {
        var last = Date.now()
        setTimeout(() => a(Date.now() - last - ms), ms)
      })
    },
    "time",
    true
  )
  allfuncs.new(
    "waituntil",
    function (
      //promise
      q, //function
      cb //function|none
    ) {
      return new Promise((resolve) => {
        var last = Date.now()
        // if (!!q()) {
        //   ignore(() => cb(Date.now() - last))
        //   return resolve(Date.now() - last)
        // }
        var int = setInterval(
          function (q, cb) {
            if (!!q()) {
              clearInterval(int)
              a(() => cb(Date.now() - last)).ignore()
              resolve(Date.now() - last)
            }
          },
          0,
          q,
          cb
        )
      })
    },
    "time",
    true
  )
  allfuncs.new(
    "keeponlyone",
    function (
      //array
      arr //array
    ) {
      return [...new Set(arr)]
    },
    "array",
    true
  )
  allfuncs.new(
    "inin",
    function (
      //any
      x, //any
      y, //array
      z //array
    ) {
      return z[y.indexOf(x)]
    },
    "array",
    true
  )
  allfuncs.new(
    "matchall",
    function (
      //array|string
      x, //string
      y //regex
    ) {
      return [...x.matchAll(y)].map((e) =>
        e[1] !== undefined ? [...e] : e[0]
      )
    },
    "regex",
    true
  )
  allfuncs.new(
    "matchany",
    function (
      //boolean
      x, //any
      ...y //any
    ) {
      return y.includes(x)
    },
    "string",
    true
  )
  allfuncs.new(
    "randfrom",
    function (
      //any
      min, //array|number
      max //undefined|number
    ) {
      if (max === undefined)
        return min.length
          ? min[a(0).randfrom(min.length - 1).val]
          : ""
      if (min == max) return min
      if (max) return Math.round(Math.random() * (max - min)) + min
      return min[Math.round(Math.random() * (min.length - 1))]
    },
    "number/array",
    true
  )
  allfuncs.new(
    "unlisten",
    function (
      //array
      data //array
    ) {
      data.forEach((data) =>
        data[0].removeEventListener(data[1], data[2])
      )
      return data
    },
    "event/elem",
    true
  )
  allfuncs.new(
    "listen",
    function (
      //array
      elem, //element
      type, //string|object|array
      cb, //function|array|boolean|undefined
      istrue = false //boolean|undefined
    ) {
      var all = []
      if (a(type).gettype("array").val) {
        var temp = {}
        a(type).foreach((e) => (temp[e] = cb))
        type = temp
      }
      if (a(type).gettype("object").val) {
        istrue = cb
        a(type).foreach(function (type, cb) {
          if (a(type).gettype("string").val)
            type = a(type).matchall(/[a-z]+/g).val
          type.forEach((type) => {
            const newcb = function (...e) {
              cb(...e)
            }
            elem.addEventListener(type, newcb, istrue)
            all.push([elem, type, newcb])
          })
        })
      } else if (a(type).gettype("string").val) {
        type = a(type).matchall(/[a-z]+/g).val
        type.forEach((type) => {
          const newcb = function (e) {
            cb(e, type)
          }
          elem.addEventListener(type, newcb, istrue)
          all.push([elem, type, newcb])
        })
      }
      return all
    },
    "event/elem",
    true
  )
  allfuncs.new(
    "toelem",
    function (
      //element|undefined|array
      elem, //any
      single //boolean|none
    ) {
      if (a(elem).gettype("element").val) return elem
      switch (a(elem).gettype().val) {
        case "string":
          return single ? a(elem).qs().val : a(elem).qsa().val
        case "array":
          return elem.map((elem) => {
            return a(elem).toelem(single).val
          })
        case "object":
          var newobj = {
            ...elem,
          }
          if (single)
            return {
              [Object.keys(newobj)[0]]: a(
                newobj[Object.keys(newobj)[0]]
              ).toelem(single).val,
            }
          a(newobj).foreach(function (a, s) {
            newobj[a] = a(s).toelem().val
          })
          return newobj
        default:
          error(elem, "inside [toelem] - not an element?")
          return undefined
      }
    },
    "elem",
    true
  )
  allfuncs.new(
    "geturlperams",
    function (
      //object
      e = location.href //undefined|string
    ) {
      var arr = {}
      ;[
        ...e.matchAll(/[?&]([^&\s]+?)(?:=([^&\s]*?))?(?=&|$|\s)/g),
      ].forEach((e) => {
        if (e[1].includes("#")) arr["#"] = e[1].match(/#(.*$)/)[1]
        if (e[2].includes("#")) arr["#"] = e[2].match(/#(.*$)/)[1]
        e[1] = e[1].replace(/#.*$/, "")
        e[2] = e[2].replace(/#.*$/, "")
        arr[decodeURIComponent(e[1]).replaceAll("+", " ")] =
          e[2] === undefined
            ? undefined
            : decodeURIComponent(e[2]).replaceAll("+", " ")
      })
      return arr
    },
    "url",
    false
  )
  allfuncs.new(
    "updateurlperam",
    function (
      //string
      key, //string
      value, //string|undefined
      cangoback //undefined|boolean
    ) {
      var g = {
        ...a().geturlperams().val,
        [key]: value,
      }
      var k = ""
      var hash = ""
      a(g).foreach(function (key, value) {
        if (key == "#") return (hash = key + value)
        key = encodeURIComponent(key)
        value = encodeURIComponent(value)
        k += "&" + (value === undefined ? key : key + "=" + value)
      })
      k = k.replace("&", "?")
      k += hash
      cangoback
        ? history.pushState(null, null, k)
        : history.replaceState(null, null, k)
      return key
    },
    "url",
    true
  )
  allfuncs.new(
    "newvarfunc",
    function (
      //undefined
      name, //string
      func, //function
      obj = window //undefined|object
    ) {
      Object.defineProperty(obj, name, {
        configurable: false,
        get() {
          return func.call({})
        },
        set(a) {
          return func.call(a, a, true)
        },
      })
    },
    "var",
    true
  )
  allfuncs.new(
    "rerange",
    function (
      //number
      val, //number
      low1, //number
      high1, //number
      low2, //number
      high2 //number
    ) {
      return ((val - low1) / (high1 - low1)) * (high2 - low2) + low2
    },
    "number",
    false
  )
  allfuncs.new(
    "destring",
    function (
      //any
      inp //string
    ) {
      var out = inp
      if (/^[\-0-9]+$/.test(inp)) return Number(inp)
      if (a((out = JSON.parse(inp))).gettype("array").val) return out
      if (
        a(
          (out = JSON.parse(
            inp.replaceAll("'", '"').replaceAll("`", '"')
          ))
        ).gettype("object").val
      )
        return out
      if (inp == "true") return true
      if (inp == "false") return false
      if (inp == "undefined") return undefined
      if (inp == "NaN") return NaN
      return inp
    },
    "string/parse",
    true
  )
  allfuncs.new(
    "eachelem",
    function (
      //array
      arr1, //array
      cb //function
    ) {
      var arr = []
      var elem = []
      if (a(arr1).gettype("array").val) {
        arr1.foreach((e) => {
          elem = [
            ...elem,
            ...(a(e).gettype("string").val ? a(e).qsa().val : [e]),
          ]
        })
      } else {
        elem = a(arr1).gettype("string").val
          ? a(ar1).qsa().val
          : [arr1]
      }
      elem = elem.filter((e) => {
        return e instanceof Element
      })
      elem.foreach(function (...a) {
        arr.push(cb(...a))
      })
      if (arr.length == 1) arr = arr[0]
      return arr
    },
    "elem",
    true
  )
  allfuncs.new(
    "remove",
    function (
      //array
      arr, //array
      idx, //number|any
      isidx //boolean|undefined
    ) {
      arr = [...arr]
      idx = isidx ? idx : arr.indexOf(idx)
      if (idx < 0 || typeof idx !== "number") return arr
      arr.splice(idx, 1)
      return arr
    },
    "array",
    true
  )
  allfuncs.new(
    "download",
    function (
      //string|file|blob
      data, //string|file|blob
      filename = "temp.txt", //string|undefined
      type, //string|undefined
      isurl //boolean|undefined
    ) {
      var url
      if (isurl) {
        url = data
      } else {
        var file = a(data).gettype("string").val
          ? new Blob([data], {
              type,
            })
          : (data.name ? (filename = data.name) : "", data)
        url = URL.createObjectURL(file)
      }
      a()
        .bodyload()
        .then(() => {
          var link = a(document.body).createelem("a", {
            href: url,
            download: filename,
          }).val
          link.click()
          link.remove()
          if (!isurl) window.URL.revokeObjectURL(url)
        })
      return data
    },
    "file",
    true
  )
  allfuncs.new(
    "idx",
    function (
      //array
      arr, //array|string
      idx //number
    ) {
      return idx >= 0 ? arr[idx] : arr[arr.length + idx]
    },
    "array",
    true
  )
  allfuncs.new(
    "compare",
    function (
      //boolean
      x, //string|any
      y //string|any
    ) {
      return x && y
        ? (typeof x == "string" ? x.toLowerCase() : x) ==
            (typeof y == "string" ? y.toLowerCase() : y)
        : true
    },
    "check",
    true
  )
  allfuncs.new(
    "createelem",
    function (
      //element
      parent, //element|none
      elem, //string
      data = {} //object|undefined
    ) {
      //if (!parent) warn("no parent set", elem, data)
      var type = elem
      var issvg =
        elem == "svg" || parent?.tagName?.toLowerCase?.() == "svg"
      //       warn(issvg, 'issvg', elem, parent, parent?.tagName)
      elem = issvg
        ? document.createElementNS("http://www.w3.org/2000/svg", elem)
        : document.createElement(elem)
      if (data.class)
        data.class.split(" ").forEach((e) => {
          elem.classList.add(e)
        })
      if (data.options && type == "select")
        data.options = data.options.map((e) =>
          a(e).gettype("array").val
            ? a(elem).createelem("option", {
                innerHTML: e[0],
                value: e[1],
              }).val
            : a(elem).createelem("option", {
                innerHTML: e,
                value: e,
              }).val
        )
      if (type == "label" && "for" in data) {
        data.htmlFor = data.for
      }
      Object.assign(elem.style, data)
      if (type == "select") {
        a(data).foreach(function (a, s) {
          elem[a] = s
        })
      } else if (issvg) {
        Object.keys(data).forEach((e) => (elem[e] = data[e]))
      } else {
        Object.assign(elem, data)
      }
      if (typeof parent == "string") parent = a(parent).qs().val
      a(() => parent.appendChild(elem)).ignore()
      return elem
    },
    "elem",
    true
  )
  allfuncs.new(
    "gettype",
    function (
      //string
      thing, //any
      match //undefined|string|array
    ) {
      if (
        !match ||
        (Object.prototype.toString
          .call(match)
          .toLowerCase()
          .match(/^\[[a-z]+ (.+)\]$/)[1] == "string" &&
          !match.includes("|"))
      ) {
        var type = Object.prototype.toString
          .call(thing)
          .toLowerCase()
          .match(/^\[[a-z]+ (.+)\]$/)[1]
        if (type !== "function") if (type == match) return true
        if (match == "normalfunction") return type == "function"
        if (type == "htmldocument" && match == "document") return true
        if (match == "body" && type == "htmlbodyelement") return true
        if (match && new RegExp(`^html${match}element$`).test(type))
          return true
        if (/^html\w+element$/.test(type)) type = "element"
        if (type == "htmldocument") type = "element"
        if (type == "asyncfunction") type = "function"
        if (type == "generatorfunction") type = "function"
        if (type == "regexp") type = "regex"
        if (match == "regexp") match = "regex"
        if (match == "element" && type == "window") return true
        if (match == "element" && type == "shadowroot") return true
        if (match == "event" && /\w+event$/.test(type)) return true
        if (/^(html|svg).*element$/.test(type)) type = "element"
        if (type == "function") {
          type = /^\s*class\s/.test(
            Function.prototype.toString.call(thing)
          )
            ? "class"
            : "function"
        }
        if (match == "none")
          return (
            type == "nan" || type == "undefined" || type == "null"
          )
        try {
          if (type === "number" && isNaN(thing) && match == "nan")
            return true
        } catch (e) {
          error(thing)
        }
        return match ? match === type : type
      } else {
        if (match.includes("|")) match = match.split("|")
        match = [...new Set(match)]
        return match.filter((e) => a(thing).gettype(e).val).length > 0
      }
    },
    "check",
    true
  )
  allfuncs.new(
    "waitforelem",
    async function (
      //promise
      selector //string|array
    ) {
      if (a(selector).gettype("string").val) {
        selector = [selector]
      }
      await a().bodyload()
      var g = false
      return new Promise((resolve) => {
        var observer = new MutationObserver(check)
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          characterData: false,
        })
        check()
        function check() {
          if (g) return
          if (selector.find((selector) => !a(selector).qs().val))
            return
          observer.disconnect()
          resolve(
            selector.length == 1
              ? a(selector[0]).qs().val
              : selector.map((e) => a(e).qs().val)
          )
        }
      })
    },
    "time/elem"
  )
  allfuncs.new(
    "findvar",
    function (
      //any
      obj, //object|element
      findkey, //any
      objectname = "obj", //string
      exact, //boolean
      all //boolean
    ) {
      var vvv = []
      var allarr = []
      var chain = objectname
      var arr = []
      var arr2 = [
        {
          chain,
          value: obj,
        },
      ]
      var visited = []
      var i = 0
      while (arr2.length && i++ < 800) {
        if (
          arr2
            .map((e) => e.chain)
            .join("/")
            .includes("." + findkey + (exact ? "/" : ""))
        ) {
          if (all)
            vvv.push(
              arr2.filter((e) =>
                exact
                  ? e.chain.endsWith("." + findkey)
                  : e.chain.includes("." + findkey)
              )
            )
          else
            return arr2.filter((e) =>
              exact
                ? e.chain.endsWith("." + findkey)
                : e.chain.includes("." + findkey)
            )[0]
        }
        var oldarr2 = [...arr2]
        allarr.push(arr2)
        arr2 = []
        oldarr2.forEach((e) => {
          if (
            a(e.value).gettype("object").val ||
            a(e.value).gettype("element").val
          )
            a(e.value).foreach(function (key, value) {
              if (a(key).gettype().val !== "string")
                return warn(key, a(key).gettype().val)
              var newchain = /^[a-z_][_a-z0-9]*$/i.test(key)
                ? "." + key
                : `["${key.replaceAll('"', '\\"')}"]`
              arr.push(e.chain + newchain)
              if (visited.includes(e.value)) return
              arr2.push({
                chain: e.chain + newchain,
                value,
              })
            })
          visited.push(e.value)
        })
      }
      return vvv.length > 0 ? vvv : allarr
    },
    "debug",
    false
  )
  allfuncs.new(
    "getallvars",
    function () {
      //object
      var obj = {}
      var variables = []
      for (var name in this)
        if (
          !`window self document name location customElements history locationbar menubar personalbar scrollbars statusbar toolbar status closed frames length top opener parent frameElement navigator origin external screen innerWidth innerHeight scrollX pageXOffset scrollY pageYOffset visualViewport screenX screenY outerWidth outerHeight devicePixelRatio clientInformation screenLeft screenTop styleMedia onsearch isSecureContext trustedTypes performance onappinstalled onbeforeinstallprompt crypto indexedDB sessionStorage localStorage onbeforexrselect onabort onbeforeinput onblur oncancel oncanplay oncanplaythrough onchange onclick onclose oncontextlost oncontextmenu oncontextrestored oncuechange ondblclick ondrag ondragend ondragenter ondragleave ondragover ondragstart ondrop ondurationchange onemptied onended onerror onfocus onformdata oninput oninvalid onkeydown onkeypress onkeyup onload onloadeddata onloadedmetadata onloadstart onmousedown onmouseenter onmouseleave onmousemove onmouseout onmouseover onmouseup onmousewheel onpause onplay onplaying onprogress onratechange onreset onresize onscroll onsecuritypolicyviolation onseeked onseeking onselect onslotchange onstalled onsubmit onsuspend ontimeupdate ontoggle onvolumechange onwaiting onwebkitanimationend onwebkitanimationiteration onwebkitanimationstart onwebkittransitionend onwheel onauxclick ongotpointercapture onlostpointercapture onpointerdown onpointermove onpointerrawupdate onpointerup onpointercancel onpointerover onpointerout onpointerenter onpointerleave onselectstart onselectionchange onanimationend onanimationiteration onanimationstart ontransitionrun ontransitionstart ontransitionend ontransitioncancel onafterprint onbeforeprint onbeforeunload onhashchange onlanguagechange onmessage onmessageerror onoffline ononline onpagehide onpageshow onpopstate onrejectionhandled onstorage onunhandledrejection onunload crossOriginIsolated scheduler alert atob blur btoa cancelAnimationFrame cancelIdleCallback captureEvents clearInterval clearTimeout close confirm createImageBitmap fetch find focus getComputedStyle getSelection matchMedia moveBy moveTo open postMessage print prompt queueMicrotask releaseEvents reportError requestAnimationFrame requestIdleCallback resizeBy resizeTo scroll scrollBy scrollTo setInterval setTimeout stop structuredClone webkitCancelAnimationFrame webkitRequestAnimationFrame originAgentCluster navigation webkitStorageInfo speechSynthesis oncontentvisibilityautostatechange openDatabase webkitRequestFileSystem webkitResolveLocalFileSystemURL chrome caches cookieStore ondevicemotion ondeviceorientation ondeviceorientationabsolute launchQueue onbeforematch getDigitalGoodsService getScreenDetails queryLocalFonts showDirectoryPicker showOpenFilePicker showSaveFilePicker TEMPORARY PERSISTENT addEventListener dispatchEvent removeEventListener`
            .split(" ")
            .includes(name)
        )
          variables.push(name)
      variables.forEach((e) => {
        var c = String(a(this[e]).gettype().val)
        if (c === "object") c = "variable"
        if (!obj[c]) obj[c] = []
        obj[c].push(e)
      })
      return obj
    },
    "debug",
    false
  )
  allfuncs.new(
    "newfunc",
    function (
      //undefined
      func1, //string
      func2 //function
    ) {
      eval(`var a = ${func1}
    var s = ${func2}
    ${func1} = function (...args) {
    a.call(this, ...args)
    s(arguments)
    }`)
    },
    "function/jank",
    true
  )
  allfuncs.new(
    "findall",
    function (
      //array
      obj, //object
      objectname = "obj" //string
    ) {
      var chain = objectname
      var arr = []
      var arr2 = [
        {
          chain,
          value: obj,
        },
      ]
      var visited = []
      var i = 0
      while (arr2.length && i++ < 800) {
        var oldarr2 = [...arr2]
        arr2 = []
        oldarr2.forEach((e) => {
          if (a(e.value).gettype("object").val)
            a(e.value).foreach(function (key, value) {
              var newchain = /^[_a-z][_a-z0-9]*$/i.test(key)
                ? "." + key
                : `["${key.replaceAll('"', '\\"')}"]`
              arr.push(e.chain + newchain)
              if (visited.includes(e.value)) return
              log({
                key,
                value,
                chain: e.chain + newchain,
              })
              arr2.push({
                chain: e.chain + newchain,
                value,
              })
            })
          visited.push(e.value)
        })
      }
      return visited
    },
    "debug",
    true
  )
  allfuncs.new(
    "sha",
    function (
      //string
      s = "", //string
      includesymbols //boolean|string
    ) {
      var tab
      if (typeof includesymbols == "string") {
        tab = includesymbols
      } else if (includesymbols) {
        tab =
          "`~\\|[];',./{}:<>?\"!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      } else {
        tab =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      }
      return binb2b64(core_sha1(str2binb(s), s.length * 8))

      function core_sha1(x, len) {
        x[len >> 5] |= 0x80 << (24 - len)
        x[(((len + 64) >> 9) << 4) + 15] = len
        var w = Array(80)
        var a = 1732584193
        var b = -271733879
        var c = -1732584194
        var d = 271733878
        var e = -1009589776
        for (var i = 0; i < x.length; i += 16) {
          var olda = a
          var oldb = b
          var oldc = c
          var oldd = d
          var olde = e
          for (var j = 0; j < 80; j++) {
            if (j < 16) w[j] = x[i + j]
            else
              w[j] = rol(
                w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16],
                1
              )
            var t = safe_add(
              safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
              safe_add(safe_add(e, w[j]), sha1_kt(j))
            )
            e = d
            d = c
            c = rol(b, 30)
            b = a
            a = t
          }
          a = safe_add(a, olda)
          b = safe_add(b, oldb)
          c = safe_add(c, oldc)
          d = safe_add(d, oldd)
          e = safe_add(e, olde)
        }
        return Array(a, b, c, d, e)
      }

      function sha1_ft(t, b, c, d) {
        if (t < 20) return (b & c) | (~b & d)
        if (t < 40) return b ^ c ^ d
        if (t < 60) return (b & c) | (b & d) | (c & d)
        return b ^ c ^ d
      }

      function sha1_kt(t) {
        return t < 20
          ? 1518500249
          : t < 40
          ? 1859775393
          : t < 60
          ? -1894007588
          : -899497514
      }

      function safe_add(x, y) {
        var lsw = (x & 0xffff) + (y & 0xffff)
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
        return (msw << 16) | (lsw & 0xffff)
      }

      function rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt))
      }

      function str2binb(str) {
        var bin = Array()
        var mask = (1 << 8) - 1
        for (var i = 0; i < str.length * 8; i += 8)
          bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << (24 - i)
        return bin
      }

      function binb2b64(binarray) {
        var str = ""
        for (var i = 0; i < binarray.length * 4; i += 3) {
          var triplet =
            (((binarray[i >> 2] >> (8 * (3 - (i % 4)))) & 0xff) <<
              16) |
            (((binarray[(i + 1) >> 2] >> (8 * (3 - ((i + 1) % 4)))) &
              0xff) <<
              8) |
            ((binarray[(i + 2) >> 2] >> (8 * (3 - ((i + 2) % 4)))) &
              0xff)
          for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > binarray.length * 32) str += ""
            else str += tab.charAt((triplet >> (6 * (3 - j))) & 0x3f)
          }
        }
        return str
      }
    },
    "code",
    true
  )
  allfuncs.new(
    "qs",
    function (
      //element|none
      text, //string
      parent = document //element|none
    ) {
      return parent.querySelector(text)
    },
    "elem",
    true
  )
  allfuncs.new(
    "qsa",
    function (
      //array
      text, //string
      parent = document //element|none
    ) {
      return Array.from(parent.querySelectorAll(text))
    },
    "elem",
    true
  )
  allfuncs.new(
    "csspath",
    function (
      //string|array
      el //elements|element
    ) {
      if (a(el).gettype("array").val)
        return a(el).map((e) => a(e).csspath().val)
      if (!(el instanceof Element)) return
      var path = []
      while (el.nodeType === Node.ELEMENT_NODE) {
        var selector = el.nodeName.toLowerCase()
        if (el.id) {
          selector += "#" + el.id
          path.unshift(selector)
          break
        } else {
          var sib = el,
            nth = 1
          while ((sib = sib.previousElementSibling)) {
            if (sib.nodeName.toLowerCase() == selector) nth++
          }
          if (nth != 1) selector += ":nth-of-type(" + nth + ")"
        }
        path.unshift(selector)
        el = el.parentNode
      }
      return path.join(" > ")
    },
    "elem",
    true
  )
  allfuncs.new(
    "fromms",
    function (
      //object
      ms //number
    ) {
      //returns a unix timestamp as an object where "ms" is the unixtimestamp
      ms = Number(ms)
      return {
        years: Math.floor(ms / 1000 / 60 / 60 / 24 / 365),
        days: Math.floor(ms / 1000 / 60 / 60 / 24) % 365,
        hours: Math.floor(ms / 1000 / 60 / 60) % 24,
        mins: Math.floor(ms / 1000 / 60) % 60,
        secs: Math.floor(ms / 1000) % 60,
        ms: Math.floor(ms) % 1000,
      }
    },
    "time",
    true
  )
  allfuncs.new(
    "toms",
    function (
      //number
      { ms = 0, secs = 0, mins = 0, hours = 0, days = 0, years = 0 } //object
    ) {
      return (
        ms +
        secs * 1000 +
        mins * 60000 +
        hours * 3600000 +
        days * 86400000 +
        years * 31560000000
      )
    },
    "time",
    true
  )
  allfuncs.new(
    "rect",
    function (
      //object
      e //element
    ) {
      if (a(e).gettype("string").val) e = a(e).qs().val
      var { x, y, width, height } = e.getBoundingClientRect().toJSON()
      return {
        x,
        y,
        w: width,
        h: height,
      }
    },
    "elem",
    true
  )
  allfuncs.new(
    "setelem",
    function (
      //element
      elem, //element
      data //object
    ) {
      var issvg =
        elem == "svg" || parent?.tagName?.toLowerCase?.() == "svg"
      //       warn(issvg, 'issvg', elem, parent, parent?.tagName)
      if (data.class)
        data.class.split(" ").forEach((e) => {
          elem.classList.add(e)
        })
      if (data.options && elem.tagName.toLowerCase() == "select")
        data.options = data.options.map((e) =>
          a(e).gettype("array").val
            ? a(elem).createelem("option", {
                innerHTML: e[0],
                value: e[1],
              }).val
            : a(elem).createelem("option", {
                innerHTML: e,
                value: e,
              }).val
        )
      if (elem.tagName.toLowerCase() == "label" && "for" in data) {
        data.htmlFor = data.for
      }
      Object.assign(elem.style, data)
      if (elem.tagName.toLowerCase() == "select") {
        a(data).foreach(function (a, s) {
          elem[a] = s
        })
      } else if (issvg) {
        Object.keys(data).forEach((e) => (elem[e] = data[e]))
      } else {
        Object.assign(elem, data)
      }
      return elem
    },
    "elem",
    true
  )
  allfuncs.new(
    "watchvar",
    function (
      //undefined
      varname, //string
      onset, //function
      onget, //function|none
      obj = window //object|window
    ) {
      //creates a new var and runs "onset" on the change of "varname", and "onget" when "varname" is read
      obj = obj || window
      obj[`_${varname}`] = undefined
      obj[`${varname}`] = undefined
      Object.defineProperty(obj, varname, {
        configurable: false,
        get() {
          if (onget) return onget(obj[`_${varname}`])
          return obj[`_${varname}`]
        },
        set(value) {
          if (value === obj[`_${value}`]) {
            return
          }
          var s = onset(value, obj[`_${varname}`])
          if (s) obj[`_${varname}`] = value
        },
      })
    },
    "var/debug",
    true
  )
  allfuncs.new(
    "randomizeorder",
    function (
      //array
      arr //array
    ) {
      arr = [...arr]
      var arr2 = []
      var count = arr.length
      for (var i = 0; i < count; i++) {
        var idx = randfrom(0, arr.length - 1)
        arr2.push(arr[idx])
        arr.splice(idx, 1)
      }
      return arr2
    },
    "array",
    true
  )
  allfuncs.new(
    "constrainvar",
    function (
      //undefined
      varname, //string
      min, //number
      max //number
    ) {
      //creates a new var that can't go beyond the bounds of "min" and "max"
      window[`_${varname}`] = undefined
      window[`${varname}`] = undefined
      Object.defineProperty(window, varname, {
        configurable: false,
        get() {
          return window[`_${varname}`]
        },
        set(value) {
          if (value === window[`_${varname}`]) {
            return
          }
          if (value > max) value = max
          if (value < min) value = min
          window[`_${varname}`] = value
        },
      })
    },
    "var",
    true
  )
  allfuncs.new(
    "isbetween",
    function (
      //boolean
      z, //number
      x, //number
      c //number
    ) {
      //returns true if "z" is between "x" and "c"
      if (x == c) return false
      var big, small
      if (x > c) {
        big = x
        small = c
      } else {
        big = c
        small = x
        return z > big && z < small
      }
    },
    "check",
    true
  )
  allfuncs.new(
    "indexsof",
    function (
      //array
      y, //string
      x //string
    ) {
      var i = 0
      var arr = []
      y.split(x).forEach((e, k) => {
        i += e.length
        arr.push(i + k)
      })
      arr.pop()
      return arr
    },
    "array",
    true
  )
  allfuncs.new(
    "export",
    function () {
      //string
      //saves the data of text inputs and checkboxes
      var s = []
      a("input, textarea")
        .qsa()
        .foreach((e) => {
          s.push({
            path: a(e).csspath().val,
            value: escape(e.value),
            checked: e.checked,
          })
        })
      return JSON.stringify(s)
    },
    "data",
    false
  )
  allfuncs.new(
    "import",
    function (
      //string
      data //string
    ) {
      //loads the data of text inputs and checkboxes
      data.forEach((e) => {
        var s = a(e.path).qs().val
        s.checked = e.checked
        s.value = unescape(e.value)
      })
      return data
    },
    "data",
    true
  )
  allfuncs.new(
    "popup",
    function (
      //window
      data, //string
      x, //number|none
      y, //number|none
      w, //number|none
      h //number|none
    ) {
      //creates a popup window
      if (x || x === 0) {
        x = (screen.width / 100) * x
        y = (screen.height / 100) * y
        w = (screen.width / 100) * w
        h = (screen.height / 100) * h
        var win = open(
          "",
          "",
          `left=${x}, top=${y} width=${w},height=${h}`
        )
        win.document.write(data)
        return win
      } else {
        var win = open("")
        win.document.write(data)
        return win
      }
    },
    "window",
    true
  )
  allfuncs.new(
    "same",
    function (
      //boolean
      ...a //any
    ) {
      if (a.length == 1) a = a[0]
      return (
        [...new Set(a.map((e) => JSON.stringify(e)))].length === 1
      )
    },
    "check",
    true
  )
  allfuncs.new(
    "containsany",
    function (
      //boolean
      arr1, //array|string
      arr2 //array
    ) {
      return !!arr2.find((e) => arr1.includes(e))
    },
    "array"
  )
  allfuncs.new(
    "run",
    function (
      //any
      func, //function
      obj //object
    ) {
      return func(...getprops(func).vars.map((e) => obj[e.var]))
    },
    "function",
    true
  )
  allfuncs.new(
    "getprops",
    function (
      //array|object
      func, //function
      peramsonly /*?|boolean*/
    ) {
      return peramsonly
        ? getprops(func)
            .vars.map((e) => e.var)
            .filter((e) => e)
        : getprops(func)
    },
    "function/parse",
    true
  )
  allfuncs.new(
    "bodyload",
    function () {
      //promise
      return new Promise((resolve) => {
        if (document.body) resolve()
        const int = setInterval(() => {
          if (document.body) resolve(clearInterval(int))
        })
      })
    },
    "elem/time",
    false
  )
  ;(async function () {
    const { bodyload } = allfuncs
    await bodyload()
    //     var optionselem = loadlib("addnewoption", "optionselem")
    // delete localStorage.buttonsheight
    // delete localStorage.buttonswidth
    // delete localStorage.buttonsx
    // delete localStorage.buttonsy
    if (!localStorage.buttonsheight)
      localStorage.buttonsheight = "100px"
    if (!localStorage.buttonswidth)
      localStorage.buttonswidth = "120px"
    var c = document.body
    if (!window.optionselem) {
      c = a(c)
        .createelem("div", {
          position: "fixed",
          top: (Number(localStorage.buttonsy) || 10) + "px",
          left:
            (Number(localStorage.buttonsx) ||
              Number(localStorage.buttonswidth.match(/[0-9]+/)[0]) /
                2) + "px",
          width: 0,
          height: 0,
          zIndex: 999999999999999,
          pointerEvents: "all",
          backgroundColor: "#0000",
        })
        .val.attachShadow({
          mode: "closed",
        })
      window.optionselem = a(c).createelem("div", {
        overflow: "hidden",
        position: "fixed",
        top:
          constrain(
            (Number(localStorage.buttonsy) || 10, 0 + 50 / 2),
            innerHeight - this.clientHeight / 2
          ) + "px",
        left:
          constrain(
            localStorage.buttonswidth,
            0 + this.clientWidth / 2,
            innerWidth - this.clientWidth / 2
          ) + "px",
        zIndex: 999999999999999,
        height: "20px",
        pointerEvents: "all",
        backgroundColor: "#0f09",
        test(e) {
          if (!this.moving && e) return
          if (!e) {
            this.style.translate = "0 0"
            e = {
              clientX: this.getBoundingClientRect().toJSON().x,
              clientY: this.getBoundingClientRect().toJSON().y,
            }
          }
          //          this.style.translate = "-50% -50%"
          this.style.top =
            constrain(
              e.clientY - 10,
              0,
              innerHeight - this.clientHeight
            ) + "px"
          this.style.left =
            constrain(
              e.clientX - this.clientWidth / 2,
              0,
              innerWidth - this.clientWidth
            ) + "px"
          localStorage.buttonsx = e.clientX
          localStorage.buttonsy = e.clientY
        },
        onmouseup() {
          this.moving = false
        },
      }).val
      optionselem.style.left =
        constrain(
          Number(localStorage.buttonswidth) || 0,
          0 + optionselem.clientWidth / 2,
          innerWidth - optionselem.clientWidth / 2
        ) + "px"
      optionselem.style.top =
        constrain(
          Number(localStorage.buttonsy) || 10,
          0 + 50 / 2,
          innerHeight - optionselem.clientHeight / 2
        ) + "px"
      var ismain
      try {
        ismain = window?.parent?.location?.href === location.href
      } catch (e) {
        ismain = false
      }
      a(window.optionselem).createelem("div", {
        backgroundColor: ismain ? "#00f" : "#f00",
        width: "100%",
        height: "20px",
        oncontextmenu(e) {
          e.preventDefault()
          log(window.optionselem)
          if (window.optionselem.style.height === "20px")
            window.optionselem.style.height = "auto"
          else window.optionselem.style.height = "20px"
        },
        onmousedown(e) {
          e.preventDefault()
          if (e.which == 3 || e.button == 2) return
          window.optionselem.moving = true
        },
        onmouseup() {
          window.optionselem.moving = false
        },
      })
    }

    function constrain(inp, max, min) {
      if (min > max) {
        var c = min
        min = max
        max = c
      }
      return Math.min(max, Math.max(min, inp))
    }
    a(window).listen({
      resize() {
        window.optionselem.moving = false
        optionselem.test.call(optionselem)
      },
      blur() {
        window.optionselem.moving = false
      },
      focus() {
        window.optionselem.moving = false
      },
      mousemove(e) {
        optionselem.test.call(optionselem, e)
      },
    })

    function addnewoption( //undefined
      ...z //object|undefined
    ) {
      var zz = z[0]
      // trymatch(zz.host, location.host)
      // trymatch(zz.href, location.n)
      // trymatch(zz.hostname, location.n)
      // trymatch(zz.origin, location.n)
      // trymatch(zz.pathname, location.n)
      var s = a(optionselem).createelem("div", {
        textAlign: "center",
        width: localStorage.buttonswidth,
        minHeight: localStorage.buttonsheight,
        backgroundColor: zz.backgroundColor || "#0000",
      }).val
      a(s).createelem("p", {
        innerHTML: zz.title || " ",
        textAlign: "center",
        color: zz.titlecolor,
      })
      ;[...z].forEach((z, i) => {
        if (i === 0) return
        var elem
        switch (z.type) {
          case "button":
            elem = a(s).createelem("button", {
              id: z.id,
              itemnumber: i,
              index: i,
              innerHTML: z.text,
              onclick: z.onclick,
              textAlign: "center",
            }).val
            break
          case "toggle":
            elem = a(s).createelem("input", {
              id: z.id,
              itemnumber: i,
              index: i,
              type: "checkbox",
              onclick(e) {
                if (this.checked) z.onon?.call?.(this, e)
                else z.onoff?.call?.(this, e)
                z.onclick?.call?.(this, e)
              },
            }).val
            break
          case "select":
            var x = a(s).createelem("select", {
              id: z.id,
              options: z.options,
              index: i,
              itemnumber: i,
              value: z.value,
              onchange: z.onchange,
            }).val
            elem = x
            break
          case "input":
            elem = a(s).createelem("input", {
              id: z.id,
              itemnumber: i,
              index: i,
              width: "90%",
              value: z.value,
              placeholder: z.placeholder,
              onchange(e) {
                z.onchange.call(this, e)
              },
            }).val
            break
          case "p":
            elem = a(s).createelem("p", {
              id: z.id,
              innerHTML: z.text,
            }).val
            break
          case "br":
            elem = a(s).createelem("br", {}).val
            break
          default:
            error(`type not found: "${z.type}"`)
        }
        if (z.id) window[z.id] = elem
      })
    }
    // addnewoption({ title: "asddssa" }, { type: "button" })
    allfuncs.new("addnewoption", addnewoption, "elem", true)
  })()

  allfuncs.new(
    "replacealltext",
    function (
      //string|regex
      pattern, //string|regex
      string, //string
      element = document.body //element|none
    ) {
      ;[
        element,
        ...element.querySelectorAll(
          "*:not(script):not(noscript):not(style)"
        ),
      ].forEach(({ childNodes: [...nodes] }) =>
        nodes
          .filter(({ nodeType }) => nodeType === Node.TEXT_NODE)
          .forEach(
            (textNode) =>
              (textNode.textContent = textNode.textContent.replaceAll(
                pattern,
                string
              ))
          )
      )
      return pattern
    },
    "string",
    true
  )
  allfuncs.new(
    "repeat",
    function (
      //promise|undefined
      func, //function
      count, //number
      delay, //number|none
      instantstart, //boolean|none
      waituntildone //boolean|none
    ) {
      if (delay || waituntildone)
        return new Promise(async (resolve) => {
          if (delay) {
            var extra = 0
            for (var i = 0; i < count; i++) {
              if (instantstart)
                waituntildone ? await func(i) : func(i)
              extra = await a(delay - extra).wait().val
              if (!instantstart)
                waituntildone ? await func(i) : func(i)
            }
            resolve()
          } else
            for (var i = 0; i < count; i++)
              waituntildone ? await func(i) : func(i)
          resolve()
        })
      for (var i = 0; i < count; i++) func(i)
      return
    },
    "repeat",
    true
  )
  allfuncs.new(
    "repeatuntil",
    function (
      //promise
      func, //function
      donecheck, //function
      delay, //number|none
      instantstart, //boolean|none
      waituntildone //boolean|none
    ) {
      return new Promise(async (resolve) => {
        if (delay) {
          var extra = 0
          var i = 0
          while (!donecheck()) {
            i++
            if (instantstart) {
              waituntildone ? await func(i) : func(i)
            }
            extra = await a(delay - extra).wait().val
            if (!instantstart) {
              waituntildone ? await func(i) : func(i)
            }
          }
          resolve()
        } else {
          var i = 0
          while (!donecheck()) {
            i++
            waituntildone ? await func(i) : func(i)
          }
          resolve()
        }
      })
    },
    "repeat",
    true
  )
  // ;(async function () {
  //   const { bodyload } = allfuncs
  //   await bodyload()
  //   const listeners = []
  //   a(document).listen({
  //     dragover(e) {
  //       e.stopPropagation()
  //       e.preventDefault()
  //     },
  //     drop(e) {
  //       e.stopPropagation()
  //       e.preventDefault()
  //       var files = [...e.dataTransfer.files]
  //       listeners.forEach((y) => y[0](y[1] ? files[0] : files))
  //     },
  //   })
  //   allfuncs.new(
  //     "newdrop",
  //     function (
  //       //undefined
  //       func, //function
  //       onlyone //boolean
  //     ) {
  //       listeners.push([func, onlyone])
  //     },
  //     "file"
  //   )
  // })()
  ;(async () => {
    const drops = []
    await a().bodyload()
    a(document.body).listen({
      dragover(e) {
        e.preventDefault()
      },
      async drop(e) {
        e.preventDefault()
        drops.forEach(async ({ types, multi, func, elem }) => {
          if (elem) if (e.target !== elem) return
          if (multi) var ret = []
          for (const item of e.dataTransfer.items) {
            if (item.kind == "file") {
              if (
                types.includes("file") ||
                types.includes("directory")
              ) {
                const entry = await item.getAsFileSystemHandle()
                if (entry.kind === "file" && types.includes("file")) {
                  if (!multi) return func(entry, e)
                  ret.push(entry)
                } else if (
                  entry.kind === "directory" &&
                  types.includes("directory")
                ) {
                  if (!multi) return func(entry, e)
                  ret.push(entry)
                }
              }
            }
          }
          if (multi && ret.length) return func(ret, e)
        })
      },
    })
    allfuncs.new(
      "ondrop",
      function (
        //object
        obj //object
      ) {
        if (!obj.types) obj.types = "all"
        obj.types = a(obj.types).toarray().val
        if (!obj.func) throw new Error('object is missing "func"')
        var oldelem = obj.elem
        if (obj.elem) obj.elem = a(obj.elem).toelem(true).val
        if (obj.elem && !a(obj.elem).gettype("element").val)
          throw new Error(
            `elem is not an elem, ${oldelem} -> ${obj.elem}`
          )
        drops.push(obj)
        return obj
      },
      "file"
    )
  })()

  allfuncs.new(
    "getfolderpath",
    async function (
      //promise
      folder //filesystemdirectoryhandle
    ) {
      async function parsedir(dir, x) {
        if (!x) {
          return [
            {
              name: dir.name,
              inside: await parsedir(dir, true),
              type: "folder",
              handle: dir,
            },
          ]
        } else var arr = []
        for await (const [name, handle] of dir.entries()) {
          arr.push(
            a(handle).gettype("filesystemdirectoryhandle").val
              ? {
                  type: "folder",
                  inside: await parsedir(handle, true),
                  name,
                  handle,
                }
              : { type: "file", handle, name }
          )
        }
        return arr
      }
      return parsedir(folder)
    },
    "file",
    false
  )
  allfuncs.new(
    "getfiles",
    async function (
      //promise
      oldway, //boolean|none
      multiple, //boolean|none
      accept = [], //array|string|none
      options = {} //object|undefined
    ) {
      const supportsFileSystemAccess =
        "showOpenFilePicker" in window &&
        (() => {
          try {
            return window.self === window.top
          } catch {
            return false
          }
        })()
      if (!oldway) {
        if (!supportsFileSystemAccess) throw new Error("no access")
        let fileOrFiles = undefined
        try {
          const handles = await showOpenFilePicker({
            types: [
              {
                accept: {
                  "*/*": accept,
                },
              },
            ],
            multiple,
            ...options,
          })
          if (!multiple) {
            fileOrFiles = handles[0]
          } else {
            fileOrFiles = await Promise.all(handles)
          }
        } catch (err) {
          if (err.name !== "AbortError") {
            error(err.name, err.message)
          }
        }
        return fileOrFiles
      }
      return new Promise(async (resolve) => {
        await a().bodyload().val
        const input = document.createElement("input")
        input.style.display = "none"
        input.type = "file"
        if (accept) input.accept = accept
        document.body.append(input)
        if (multiple) {
          input.multiple = true
        }
        input.addEventListener("change", () => {
          input.remove()
          // if (!input.files) {
          //   return
          // }
          resolve(multiple ? Array.from(input.files) : input.files[0])
        })
        if ("showPicker" in HTMLInputElement.prototype) {
          input.showPicker()
        } else {
          input.click()
        }
      })
    },
    "file",
    true
  )
  allfuncs.new(
    "map",
    function (
      //array|object
      arr, //array|object|any
      func //function
    ) {
      var type = a(arr).gettype().val
      if (type == "array") return arr.map(func)
      else if (type == "object") {
        var temparr = {}
        Reflect.ownKeys(arr).forEach((e, i) => {
          temparr = {
            ...temparr,
            ...func(e, arr[e], i),
          }
        })
        return temparr
      } else {
        return [arr].map(func)
      }
    },
    "array",
    true
  )
  allfuncs.new(
    "find",
    function (
      //any
      arr, //array|object|any
      func //function
    ) {
      var type = a(arr).gettype().val
      if (type == "array") return arr.find(func)
      else if (type == "object") {
        return Reflect.ownKeys(arr).find((e, i) => {
          return func(e, arr[e], i)
        })
      } else {
        return [arr].find(func)
      }
    },
    "array",
    true
  )
  allfuncs.new(
    "filteridx",
    function (
      //array
      arr, //array|any
      func //function
    ) {
      if (a(arr).gettype("object").val) arr = [arr]
      return a(arr)
        .map((e, i) => (func(e, i) ? i : undefined))
        .filter((e) => e !== undefined)
    },
    "array"
  )
  allfuncs.new(
    "filter",
    function (
      //array|object
      arr, //array|object|any
      func //function
    ) {
      var type = a(arr).gettype().val
      if (type == "array") return arr.filter(func)
      else if (type == "object") {
        var temparr = {}
        Reflect.ownKeys(arr).forEach((e, i) => {
          if (func(e, arr[e], i))
            temparr = {
              ...temparr,
              [e]: arr[e],
            }
        })
        return temparr
      } else {
        return [arr].filter(func)
      }
    },
    "array",
    true
  )
  ;(function () {
    var last
    var different = allfuncs.new(
      "unique",
      function () /*object*/ {
        return last || (last = different.new())
      },
      "check",
      false
    )
    different.new = function (name) {
      var $ = new Proxy(
        {},
        {
          get(_a, s) {
            return s == "name" ? name || "different" : $
          },
          set() {
            return $
          },
        }
      )
      return (last = $)
    }
  })()
  allfuncs.new(
    "elif",
    function (
      //any
      cond, //any
      iftrue, //any
      iffalse //any
    ) {
      return cond ? iftrue : iffalse
    },
    "check",
    true
  )
  allfuncs.new(
    "tonumber",
    function (
      //number
      e //any
    ) {
      return Number(e)
    },
    "number/format",
    true
  )
  allfuncs.new(
    "toarray",
    function (
      //array
      e, //any
      split //string|none|undefined
    ) {
      if (a(e).gettype("string").val) {
        if (split) e = e.split(split)
        else return [e]
      }
      return [...e]
    },
    "number/format",
    true
  )
  allfuncs.new(
    "tostring",
    function (
      //string
      e //any
    ) {
      if (["object", "array"].includes(a(e).gettype().val))
        return JSON.stringify(e)
      if (a(e).gettype("element").val) return a(e).csspath().val
      return String(e)
    },
    "string/format",
    true
  )
  allfuncs.new(
    "eval",
    function (
      //any
      a //any
    ) {
      return eval(a)
    },
    "js/eval",
    true
  )
  allfuncs.new(
    "toregex",
    function (
      //regex
      d, //string|array|regex
      s //undefined|string
    ) {
      if (a(d).gettype("array").val) var temp = d
      if (s) var temp = [d, s]
      else if (String(d).match(/^\/(.*)\/(\w*)$/)) {
        var m = String(d).match(/^\/(.*)\/(\w*)$/)
        var temp = [m[1], m[2]]
      } else var temp = [String(d), ""]
      temp[1] = temp[1].toLowerCase()
      if (temp[1].includes("w")) {
        temp[1] = temp[1].replace("w", "")
        temp[0] = `(?<=[^a-z0-9]|^)${temp[0]}(?=[^a-z0-9]|$)`
      }
      return new RegExp(
        temp[0],
        temp[1].replaceAll(/(.)(?=.*\1)/g, "")
      )
    },
    "regex",
    true
  )
  allfuncs.new(
    "isregex",
    function (
      //boolean
      s //string|regex
    ) {
      if (a(s).gettype("regex").val) return true
      return (
        /^\/.*(?<!\\)\/[gimusy]*$/.test(s) && !/^\/\*.*\*\/$/.test(s)
      )
    },
    "check",
    true
  )
  allfuncs.new(
    "ispressed",
    function (
      //boolean
      e /*event*/,
      code //string
    ) {
      code = code.toLowerCase()
      var temp =
        e.shiftKey == code.includes("shift") &&
        e.altKey == code.includes("alt") &&
        e.ctrlKey == code.includes("ctrl") &&
        e.metaKey == code.includes("meta") &&
        e.key.toLowerCase() ==
          code.replaceAll(/alt|ctrl|shift|meta/g, "").trim()
      if (temp && !a) e.preventDefault()
      return temp
    },
    "check/input/event",
    true
  )
  allfuncs.new(
    "controller_vibrate",
    function (
      //number
      pad, //number
      duration = 1000, //number|none
      strongMagnitude = 0, //number|none
      weakMagnitude = 0 //number|none
    ) {
      getpad(pad).vibrationActuator.playEffect("dual-rumble", {
        duration,
        strongMagnitude,
        weakMagnitude,
      })
      return pad
    },
    "controller/haptic",
    true
  )
  allfuncs.new(
    "controller_getbutton",
    function (
      //number
      pad, //number
      button //number|none
    ) {
      return button
        ? getpad(pad).buttons[button].value
        : getpad(pad).buttons.map((e) => e.value)
    },
    "controller/input",
    true
  )
  allfuncs.new(
    "controller_getaxes",
    function (
      //array|number
      pad, //number
      axes //number|none
    ) {
      return axes ? getpad(pad).axes[axes] : getpad(pad).axes
    },
    "controller/input",
    true
  )
  allfuncs.new(
    "controller_exists",
    function (
      //boolean|number
      pad //number|none
    ) {
      return pad === undefined
        ? getpad().filter((e) => e).length
        : !!getpad(pad)
    },
    "controller/check",
    true
  )
  allfuncs.new(
    "runall",
    function (
      //array|function
      funcs, //array|function
      args //array|any
    ) {
      if (!a(args).gettype("array").val) args = [args]
      if (!a(funcs).gettype("array").val) funcs = [funcs]
      funcs.map((func) => func(...args))
      return funcs
    },
    "function"
  )
  allfuncs.new(
    "readfile",
    async function (
      //promise
      file, //file
      type = "Text" //string|none
    ) {
      return new Promise(function (done, error) {
        var f = new FileReader()
        f.onerror = error
        f.onload = () =>
          done(type == "json" ? JSON.parse(f.result) : f.result)
        f["readAs" + (type == "json" ? "Text" : type)](file)
      })
    },
    "file"
  )
  allfuncs.new(
    "writefile",
    async function writefile(
      //promise
      file, //filesystemfilehandle
      text //string
    ) {
      var f = await await file.createWritable()
      await f.write(text)
      await f.close()
      return file
    },
    "file"
  )
  allfuncs.new(
    "getfileperms",
    async function (
      //promise
      fileHandle, //filesystemfilehandle
      readWrite //boolean|none
    ) {
      const options = {}
      if (readWrite) {
        options.mode = "readwrite"
      }
      return (
        (await fileHandle.queryPermission(options)) === "granted" ||
        (await fileHandle.requestPermission(options)) === "granted"
      )
    },
    "file/permission",
    true
  )
  allfuncs.new(
    "indexeddb_set",
    async function (
      //promise
      place, //object
      obj //object
    ) {
      return new Promise((done, error) =>
        place.put(
          obj,
          (e) => done(e),
          (e) => error(e)
        )
      )
    },
    "indexeddb",
    true
  )
  allfuncs.new(
    "indexeddb_get",
    async function (
      //promise
      place, //object
      obj //string
    ) {
      return new Promise((done, error) =>
        place.get(
          obj,
          (e) => done(e),
          (e) => error(e)
        )
      )
    },
    "indexeddb",
    true
  )
  allfuncs.new(
    "indexeddb_getall",
    async function (
      //promise
      place //object
    ) {
      return new Promise((done, error) =>
        place.getAll(
          (e) => done(e),
          (e) => error(e)
        )
      )
    },
    "indexeddb",
    true
  )
  allfuncs.new(
    "indexeddb_clearall",
    async function (
      //promise
      place //object
    ) {
      return new Promise((done, error) =>
        place.clear(
          (e) => done(e),
          (e) => error(e)
        )
      )
    },
    "indexeddb",
    true
  )
  allfuncs.new(
    "indexeddb_remove",
    async function (
      //promise
      place, //object
      obj //string|number
    ) {
      return new Promise((done, error) =>
        place.remove(
          obj,
          (e) => done(e),
          (e) => error(e)
        )
      )
    },
    "indexeddb",
    true
  )
  allfuncs.new(
    "indexeddb_setup",
    async function (
      //promise
      obj //object|none
    ) {
      return new Promise((e) => {
        var x
        obj = {
          dbVersion: 1,
          storeName: "tempstorename",
          keyPath: "id",
          autoIncrement: true,
          ...obj,
          onStoreReady() {
            e(x)
          },
        }
        if (!window.IDBStore) {
          //IDBStore start
          ;(function (p, h, k) {
            "function" === typeof define
              ? define(h)
              : "undefined" !== typeof module && module.exports
              ? (module.exports = h())
              : (k[p] = h())
          })(
            "IDBStore",
            function () {
              function p(a, b) {
                var c, d
                for (c in b)
                  (d = b[c]), d !== u[c] && d !== a[c] && (a[c] = d)
                return a
              }
              var h = function (a) {
                  throw a
                },
                k = function () {},
                r = {
                  storeName: "Store",
                  storePrefix: "IDBWrapper-",
                  dbVersion: 1,
                  keyPath: "id",
                  autoIncrement: !0,
                  onStoreReady: function () {},
                  onError: h,
                  indexes: [],
                  implementationPreference: [
                    "indexedDB",
                    "webkitIndexedDB",
                    "mozIndexedDB",
                    "shimIndexedDB",
                  ],
                },
                q = function (a, b) {
                  "undefined" == typeof b &&
                    "function" == typeof a &&
                    (b = a)
                  "[object Object]" !=
                    Object.prototype.toString.call(a) && (a = {})
                  for (var c in r)
                    this[c] = "undefined" != typeof a[c] ? a[c] : r[c]
                  this.dbName = this.storePrefix + this.storeName
                  this.dbVersion = parseInt(this.dbVersion, 10) || 1
                  b && (this.onStoreReady = b)
                  var d = "object" == typeof window ? window : self
                  this.implementation =
                    this.implementationPreference.filter(function (
                      a
                    ) {
                      return a in d
                    })[0]
                  this.idb = d[this.implementation]
                  this.keyRange =
                    d.IDBKeyRange ||
                    d.webkitIDBKeyRange ||
                    d.mozIDBKeyRange
                  this.consts = {
                    READ_ONLY: "readonly",
                    READ_WRITE: "readwrite",
                    VERSION_CHANGE: "versionchange",
                    NEXT: "next",
                    NEXT_NO_DUPLICATE: "nextunique",
                    PREV: "prev",
                    PREV_NO_DUPLICATE: "prevunique",
                  }
                  this.openDB()
                },
                t = {
                  constructor: q,
                  version: "1.7.2",
                  db: null,
                  dbName: null,
                  dbVersion: null,
                  store: null,
                  storeName: null,
                  storePrefix: null,
                  keyPath: null,
                  autoIncrement: null,
                  indexes: null,
                  implementationPreference: null,
                  implementation: "",
                  onStoreReady: null,
                  onError: null,
                  _insertIdCount: 0,
                  openDB: function () {
                    var a = this.idb.open(
                        this.dbName,
                        this.dbVersion
                      ),
                      b = !1
                    a.onerror = function (a) {
                      var b
                      b =
                        "error" in a.target
                          ? "VersionError" == a.target.error.name
                          : "errorCode" in a.target
                          ? 12 == a.target.errorCode
                          : !1
                      if (b)
                        this.onError(
                          Error(
                            "The version number provided is lower than the existing one."
                          )
                        )
                      else
                        a.target.error
                          ? (a = a.target.error)
                          : ((b =
                              "IndexedDB unknown error occurred when opening DB " +
                              this.dbName +
                              " version " +
                              this.dbVersion),
                            "errorCode" in a.target &&
                              (b +=
                                " with error code " +
                                a.target.errorCode),
                            (a = Error(b))),
                          this.onError(a)
                    }.bind(this)
                    a.onsuccess = function (a) {
                      if (!b)
                        if (this.db) this.onStoreReady()
                        else if (
                          ((this.db = a.target.result),
                          "string" == typeof this.db.version)
                        )
                          this.onError(
                            Error(
                              "The IndexedDB implementation in this browser is outdated. Please upgrade your browser."
                            )
                          )
                        else if (
                          this.db.objectStoreNames.contains(
                            this.storeName
                          )
                        ) {
                          this.store = this.db
                            .transaction(
                              [this.storeName],
                              this.consts.READ_ONLY
                            )
                            .objectStore(this.storeName)
                          var d = Array.prototype.slice.call(
                            this.getIndexList()
                          )
                          this.indexes.forEach(function (a) {
                            var c = a.name
                            if (c)
                              if (
                                (this.normalizeIndexData(a),
                                this.hasIndex(c))
                              ) {
                                var g = this.store.index(c)
                                this.indexComplies(g, a) ||
                                  ((b = !0),
                                  this.onError(
                                    Error(
                                      'Cannot modify index "' +
                                        c +
                                        '" for current version. Please bump version number to ' +
                                        (this.dbVersion + 1) +
                                        "."
                                    )
                                  ))
                                d.splice(d.indexOf(c), 1)
                              } else
                                (b = !0),
                                  this.onError(
                                    Error(
                                      'Cannot create new index "' +
                                        c +
                                        '" for current version. Please bump version number to ' +
                                        (this.dbVersion + 1) +
                                        "."
                                    )
                                  )
                            else
                              (b = !0),
                                this.onError(
                                  Error(
                                    "Cannot create index: No index name given."
                                  )
                                )
                          }, this)
                          d.length &&
                            ((b = !0),
                            this.onError(
                              Error(
                                'Cannot delete index(es) "' +
                                  d.toString() +
                                  '" for current version. Please bump version number to ' +
                                  (this.dbVersion + 1) +
                                  "."
                              )
                            ))
                          b || this.onStoreReady()
                        } else
                          this.onError(
                            Error("Object store couldn't be created.")
                          )
                    }.bind(this)
                    a.onupgradeneeded = function (a) {
                      this.db = a.target.result
                      this.db.objectStoreNames.contains(
                        this.storeName
                      )
                        ? (this.store =
                            a.target.transaction.objectStore(
                              this.storeName
                            ))
                        : ((a = {
                            autoIncrement: this.autoIncrement,
                          }),
                          null !== this.keyPath &&
                            (a.keyPath = this.keyPath),
                          (this.store = this.db.createObjectStore(
                            this.storeName,
                            a
                          )))
                      var d = Array.prototype.slice.call(
                        this.getIndexList()
                      )
                      this.indexes.forEach(function (a) {
                        var c = a.name
                        c ||
                          ((b = !0),
                          this.onError(
                            Error(
                              "Cannot create index: No index name given."
                            )
                          ))
                        this.normalizeIndexData(a)
                        if (this.hasIndex(c)) {
                          var g = this.store.index(c)
                          this.indexComplies(g, a) ||
                            (this.store.deleteIndex(c),
                            this.store.createIndex(c, a.keyPath, {
                              unique: a.unique,
                              multiEntry: a.multiEntry,
                            }))
                          d.splice(d.indexOf(c), 1)
                        } else
                          this.store.createIndex(c, a.keyPath, {
                            unique: a.unique,
                            multiEntry: a.multiEntry,
                          })
                      }, this)
                      d.length &&
                        d.forEach(function (a) {
                          this.store.deleteIndex(a)
                        }, this)
                    }.bind(this)
                  },
                  deleteDatabase: function (a, b) {
                    if (this.idb.deleteDatabase) {
                      this.db.close()
                      var c = this.idb.deleteDatabase(this.dbName)
                      c.onsuccess = a
                      c.onerror = b
                    } else
                      b(
                        Error(
                          "Browser does not support IndexedDB deleteDatabase!"
                        )
                      )
                  },
                  put: function (a, b, c, d) {
                    null !== this.keyPath &&
                      ((d = c), (c = b), (b = a))
                    d || (d = h)
                    c || (c = k)
                    var f = !1,
                      e = null,
                      g = this.db.transaction(
                        [this.storeName],
                        this.consts.READ_WRITE
                      )
                    g.oncomplete = function () {
                      ;(f ? c : d)(e)
                    }
                    g.onabort = d
                    g.onerror = d
                    null !== this.keyPath
                      ? (this._addIdPropertyIfNeeded(b),
                        (a = g.objectStore(this.storeName).put(
                          (() => {
                            function isFilesystemHandle(obj) {
                              // Check if the object is a FilesystemFileHandle or FilesystemDirectoryHandle
                              return (
                                obj &&
                                (obj instanceof
                                  FileSystemFileHandle ||
                                  obj instanceof
                                    FileSystemDirectoryHandle)
                              )
                            }

                            function replaceProxies(obj) {
                              if (isFilesystemHandle(obj)) {
                                return obj // Skip replacing FilesystemFileHandle and FilesystemDirectoryHandle
                              }

                              if (
                                typeof obj !== "object" ||
                                obj === null
                              ) {
                                return obj
                              }

                              if (Array.isArray(obj)) {
                                return obj.map((item) =>
                                  replaceProxies(item)
                                )
                              }

                              const result = {}
                              for (const key in obj) {
                                if (obj.hasOwnProperty(key)) {
                                  result[key] = replaceProxies(
                                    obj[key]
                                  )
                                }
                              }

                              return result
                            }
                            // warn("ghadsgjasdjh", b, replaceProxies(b))
                            // throw ""
                            return replaceProxies(b)
                          })()
                        )))
                      : (a = g.objectStore(this.storeName).put(b, a))
                    a.onsuccess = function (a) {
                      f = !0
                      e = a.target.result
                    }
                    a.onerror = d
                    return g
                  },
                  get: function (a, b, c) {
                    c || (c = h)
                    b || (b = k)
                    var d = !1,
                      f = null,
                      e = this.db.transaction(
                        [this.storeName],
                        this.consts.READ_ONLY
                      )
                    e.oncomplete = function () {
                      ;(d ? b : c)(f)
                    }
                    e.onabort = c
                    e.onerror = c
                    a = e.objectStore(this.storeName).get(a)
                    a.onsuccess = function (a) {
                      d = !0
                      f = a.target.result
                    }
                    a.onerror = c
                    return e
                  },
                  remove: function (a, b, c) {
                    c || (c = h)
                    b || (b = k)
                    var d = !1,
                      f = null,
                      e = this.db.transaction(
                        [this.storeName],
                        this.consts.READ_WRITE
                      )
                    e.oncomplete = function () {
                      ;(d ? b : c)(f)
                    }
                    e.onabort = c
                    e.onerror = c
                    a = e.objectStore(this.storeName)["delete"](a)
                    a.onsuccess = function (a) {
                      d = !0
                      f = a.target.result
                    }
                    a.onerror = c
                    return e
                  },
                  batch: function (a, b, c) {
                    c || (c = h)
                    b || (b = k)
                    if (
                      "[object Array]" !=
                      Object.prototype.toString.call(a)
                    )
                      c(
                        Error(
                          "dataArray argument must be of type Array."
                        )
                      )
                    else if (0 === a.length) return b(!0)
                    var d = a.length,
                      f = !1,
                      e = !1,
                      g = this.db.transaction(
                        [this.storeName],
                        this.consts.READ_WRITE
                      )
                    g.oncomplete = function () {
                      ;(e ? b : c)(e)
                    }
                    g.onabort = c
                    g.onerror = c
                    var l = function () {
                      d--
                      0 !== d || f || (e = f = !0)
                    }
                    a.forEach(function (a) {
                      var b = a.type,
                        d = a.key,
                        e = a.value
                      a = function (a) {
                        g.abort()
                        f || ((f = !0), c(a, b, d))
                      }
                      "remove" == b
                        ? ((e = g
                            .objectStore(this.storeName)
                            ["delete"](d)),
                          (e.onsuccess = l),
                          (e.onerror = a))
                        : "put" == b &&
                          (null !== this.keyPath
                            ? (this._addIdPropertyIfNeeded(e),
                              (e = g
                                .objectStore(this.storeName)
                                .put(e)))
                            : (e = g
                                .objectStore(this.storeName)
                                .put(e, d)),
                          (e.onsuccess = l),
                          (e.onerror = a))
                    }, this)
                    return g
                  },
                  putBatch: function (a, b, c) {
                    a = a.map(function (a) {
                      return { type: "put", value: a }
                    })
                    return this.batch(a, b, c)
                  },
                  upsertBatch: function (a, b, c, d) {
                    "function" == typeof b && ((d = c = b), (b = {}))
                    d || (d = h)
                    c || (c = k)
                    b || (b = {})
                    "[object Array]" !=
                      Object.prototype.toString.call(a) &&
                      d(
                        Error(
                          "dataArray argument must be of type Array."
                        )
                      )
                    var f = b.keyField || this.keyPath,
                      e = a.length,
                      g = !1,
                      l = !1,
                      n = 0,
                      m = this.db.transaction(
                        [this.storeName],
                        this.consts.READ_WRITE
                      )
                    m.oncomplete = function () {
                      l ? c(a) : d(!1)
                    }
                    m.onabort = d
                    m.onerror = d
                    var v = function (b) {
                      a[n++][f] = b.target.result
                      e--
                      0 !== e || g || (l = g = !0)
                    }
                    a.forEach(function (a) {
                      var b = a.key
                      null !== this.keyPath
                        ? (this._addIdPropertyIfNeeded(a),
                          (a = m.objectStore(this.storeName).put(a)))
                        : (a = m
                            .objectStore(this.storeName)
                            .put(a, b))
                      a.onsuccess = v
                      a.onerror = function (a) {
                        m.abort()
                        g || ((g = !0), d(a))
                      }
                    }, this)
                    return m
                  },
                  removeBatch: function (a, b, c) {
                    a = a.map(function (a) {
                      return { type: "remove", key: a }
                    })
                    return this.batch(a, b, c)
                  },
                  getBatch: function (a, b, c, d) {
                    c || (c = h)
                    b || (b = k)
                    d || (d = "sparse")
                    if (
                      "[object Array]" !=
                      Object.prototype.toString.call(a)
                    )
                      c(
                        Error(
                          "keyArray argument must be of type Array."
                        )
                      )
                    else if (0 === a.length) return b([])
                    var f = [],
                      e = a.length,
                      g = !1,
                      l = null,
                      n = this.db.transaction(
                        [this.storeName],
                        this.consts.READ_ONLY
                      )
                    n.oncomplete = function () {
                      ;(g ? b : c)(l)
                    }
                    n.onabort = c
                    n.onerror = c
                    var m = function (a) {
                      a.target.result || "dense" == d
                        ? f.push(a.target.result)
                        : "sparse" == d && f.length++
                      e--
                      0 === e && ((g = !0), (l = f))
                    }
                    a.forEach(function (a) {
                      a = n.objectStore(this.storeName).get(a)
                      a.onsuccess = m
                      a.onerror = function (a) {
                        l = a
                        c(a)
                        n.abort()
                      }
                    }, this)
                    return n
                  },
                  getAll: function (a, b) {
                    b || (b = h)
                    a || (a = k)
                    var c = this.db.transaction(
                        [this.storeName],
                        this.consts.READ_ONLY
                      ),
                      d = c.objectStore(this.storeName)
                    d.getAll
                      ? this._getAllNative(c, d, a, b)
                      : this._getAllCursor(c, d, a, b)
                    return c
                  },
                  _getAllNative: function (a, b, c, d) {
                    var f = !1,
                      e = null
                    a.oncomplete = function () {
                      ;(f ? c : d)(e)
                    }
                    a.onabort = d
                    a.onerror = d
                    a = b.getAll()
                    a.onsuccess = function (a) {
                      f = !0
                      e = a.target.result
                    }
                    a.onerror = d
                  },
                  _getAllCursor: function (a, b, c, d) {
                    var f = [],
                      e = !1,
                      g = null
                    a.oncomplete = function () {
                      ;(e ? c : d)(g)
                    }
                    a.onabort = d
                    a.onerror = d
                    a = b.openCursor()
                    a.onsuccess = function (a) {
                      ;(a = a.target.result)
                        ? (f.push(a.value), a["continue"]())
                        : ((e = !0), (g = f))
                    }
                    a.onError = d
                  },
                  clear: function (a, b) {
                    b || (b = h)
                    a || (a = k)
                    var c = !1,
                      d = null,
                      f = this.db.transaction(
                        [this.storeName],
                        this.consts.READ_WRITE
                      )
                    f.oncomplete = function () {
                      ;(c ? a : b)(d)
                    }
                    f.onabort = b
                    f.onerror = b
                    var e = f.objectStore(this.storeName).clear()
                    e.onsuccess = function (a) {
                      c = !0
                      d = a.target.result
                    }
                    e.onerror = b
                    return f
                  },
                  _addIdPropertyIfNeeded: function (a) {
                    "undefined" == typeof a[this.keyPath] &&
                      (a[this.keyPath] =
                        this._insertIdCount++ + Date.now())
                  },
                  getIndexList: function () {
                    return this.store.indexNames
                  },
                  hasIndex: function (a) {
                    return this.store.indexNames.contains(a)
                  },
                  normalizeIndexData: function (a) {
                    a.keyPath = a.keyPath || a.name
                    a.unique = !!a.unique
                    a.multiEntry = !!a.multiEntry
                  },
                  indexComplies: function (a, b) {
                    return ["keyPath", "unique", "multiEntry"].every(
                      function (c) {
                        if (
                          "multiEntry" == c &&
                          void 0 === a[c] &&
                          !1 === b[c]
                        )
                          return !0
                        if (
                          "keyPath" == c &&
                          "[object Array]" ==
                            Object.prototype.toString.call(b[c])
                        ) {
                          c = b.keyPath
                          var d = a.keyPath
                          if ("string" == typeof d)
                            return c.toString() == d
                          if (
                            ("function" != typeof d.contains &&
                              "function" != typeof d.indexOf) ||
                            d.length !== c.length
                          )
                            return !1
                          for (var f = 0, e = c.length; f < e; f++)
                            if (
                              !(
                                (d.contains && d.contains(c[f])) ||
                                d.indexOf(-1 !== c[f])
                              )
                            )
                              return !1
                          return !0
                        }
                        return b[c] == a[c]
                      }
                    )
                  },
                  iterate: function (a, b) {
                    b = p(
                      {
                        index: null,
                        order: "ASC",
                        autoContinue: !0,
                        filterDuplicates: !1,
                        keyRange: null,
                        writeAccess: !1,
                        onEnd: null,
                        onError: h,
                        limit: Infinity,
                        offset: 0,
                        allowItemRejection: !1,
                      },
                      b || {}
                    )
                    var c =
                      "desc" == b.order.toLowerCase()
                        ? "PREV"
                        : "NEXT"
                    b.filterDuplicates && (c += "_NO_DUPLICATE")
                    var d = !1,
                      f = this.db.transaction(
                        [this.storeName],
                        this.consts[
                          b.writeAccess ? "READ_WRITE" : "READ_ONLY"
                        ]
                      ),
                      e = f.objectStore(this.storeName)
                    b.index && (e = e.index(b.index))
                    var g = 0
                    f.oncomplete = function () {
                      if (d)
                        if (b.onEnd) b.onEnd()
                        else a(null)
                      else b.onError(null)
                    }
                    f.onabort = b.onError
                    f.onerror = b.onError
                    c = e.openCursor(b.keyRange, this.consts[c])
                    c.onerror = b.onError
                    c.onsuccess = function (c) {
                      if ((c = c.target.result))
                        if (b.offset)
                          c.advance(b.offset), (b.offset = 0)
                        else {
                          var e = a(c.value, c, f)
                          ;(b.allowItemRejection && !1 === e) || g++
                          if (b.autoContinue)
                            if (g + b.offset < b.limit)
                              c["continue"]()
                            else d = !0
                        }
                      else d = !0
                    }
                    return f
                  },
                  query: function (a, b) {
                    var c = [],
                      d = 0
                    b = b || {}
                    b.autoContinue = !0
                    b.writeAccess = !1
                    b.allowItemRejection = !!b.filter
                    b.onEnd = function () {
                      a(c, d)
                    }
                    return this.iterate(function (a) {
                      d++
                      var e = b.filter ? b.filter(a) : !0
                      !1 !== e && c.push(a)
                      return e
                    }, b)
                  },
                  count: function (a, b) {
                    b = p({ index: null, keyRange: null }, b || {})
                    var c = b.onError || h,
                      d = !1,
                      f = null,
                      e = this.db.transaction(
                        [this.storeName],
                        this.consts.READ_ONLY
                      )
                    e.oncomplete = function () {
                      ;(d ? a : c)(f)
                    }
                    e.onabort = c
                    e.onerror = c
                    var g = e.objectStore(this.storeName)
                    b.index && (g = g.index(b.index))
                    g = g.count(b.keyRange)
                    g.onsuccess = function (a) {
                      d = !0
                      f = a.target.result
                    }
                    g.onError = c
                    return e
                  },
                  makeKeyRange: function (a) {
                    var b = "undefined" != typeof a.lower,
                      c = "undefined" != typeof a.upper,
                      d = "undefined" != typeof a.only
                    switch (!0) {
                      case d:
                        a = this.keyRange.only(a.only)
                        break
                      case b && c:
                        a = this.keyRange.bound(
                          a.lower,
                          a.upper,
                          a.excludeLower,
                          a.excludeUpper
                        )
                        break
                      case b:
                        a = this.keyRange.lowerBound(
                          a.lower,
                          a.excludeLower
                        )
                        break
                      case c:
                        a = this.keyRange.upperBound(
                          a.upper,
                          a.excludeUpper
                        )
                        break
                      default:
                        throw Error(
                          'Cannot create KeyRange. Provide one or both of "lower" or "upper" value, or an "only" value.'
                        )
                    }
                    return a
                  },
                },
                u = {}
              q.prototype = t
              q.version = t.version
              return q
            },
            this
          )
          //IDBStore end
        }
        x = new IDBStore(obj)
      })
    },
    "indexeddb",
    true
  )
  allfuncs.new(
    "keepsame",
    function (
      //object|any
      thing //object|element
    ) {
      var all = []
      var x = new Proxy(thing, {
        get(_obj, prop) {
          if (prop == "val") return _obj
          if (prop == "all") return all
          if (prop == "func")
            return function (e) {
              all.push(e(thing))
              return x
            }
          return function (...args) {
            try {
              all.push(thing[prop](thing, ...args))
            } catch (e) {
              all.push(thing[prop])
            }
            return x
          }
        },
      })
      return x
    },
    "function",
    true
  )

  allfuncs.new(
    "strictfunction",
    strictfunction,
    "function/typescript",
    true
  )
  allfuncs.new(
    "readfileslow",
    function (
      //undefined
      file, //file
      type = "Text", //string|undefined
      cb1 = (e) => e, //function|undefined
      cb2 = (e) => e //function|undefined
    ) {
      var fileSize = file.size
      var chunkSize = 64 * 1024 * 50 // bytes
      var offset = 0
      var chunkReaderBlock = null
      var arr = []
      var lastidx
      var readEventHandler = function (evt, idx) {
        if (evt.target.error == null) {
          arr.push([idx, evt.target.result])
          cb1(a(arr.length).rerange(0, lastidx, 0, 100).val)
          if (arr.length === lastidx)
            cb2(arr.sort((e) => e[0]).map((e) => e[1]))
        } else {
          return error("Read error: " + evt.target.error)
        }
      }
      chunkReaderBlock = function (_offset, length, _file, idx) {
        var r = new FileReader()
        var blob = _file.slice(_offset, length + _offset)
        const zzz = idx + 1
        r.onload = function (e) {
          readEventHandler(e, zzz - 1)
        }
        r["readAs" + type](blob)
      }
      let idx = 0
      while (offset < fileSize) {
        idx++
        chunkReaderBlock(offset, chunkSize, file, idx)
        offset += chunkSize
      }
      lastidx = idx
    },
    "file"
  )
  allfuncs.new(
    "cbtoasync",
    function (
      //promise
      func, //function
      ...args //any
    ) {
      return new Promise(function (resolve) {
        func(...args, resolve)
      })
    },
    "function"
  )
  allfuncs.new(
    "asynctocb",
    function (
      //undefined
      func, //function
      ...args //any
    ) {
      var cb = args.pop()
      return func(...args).then(cb)
    },
    "function"
  )
  // ;(function () {
  //   const samerand = function () //string
  //   {
  //     return (
  //       lastrand ||
  //       (lastrand = samerand.new(20, {
  //         lower: true,
  //         upper: true,
  //       }))
  //     )
  //   }
  //   allfuncs.new("samerand", samerand, "function/random", false)
  //   var lastrand = ""
  //   samerand.new = (
  //     e = 20,
  //     { lower = true, upper = false, number = false, symbol = false } = {
  //       lower: true,
  //       upper: false,
  //       number: false,
  //       symbol: false,
  //     }
  //   ) => (
  //     (lastrand = ""),
  //     a(
  //       () =>
  //         (lastrand += a(
  //           `${lower ? "asdfghjklzxcvbnmqwertyuiop" : ""}${
  //             upper ? "ASDFGHJKLQWERTYUIOPZXCVBNM" : ""
  //           }${number ? "0123456789" : ""}${
  //             symbol ? ",./;'[]-=\\`~!@#$%^&*()_+|{}:\"<>?" : ""
  //           }`.split("")
  //         ).randfrom().val)
  //     ).repeat(e),
  //     lastrand
  //   )
  // })()
  allfuncs.new(
    "randstr",
    function (
      /*string|input of object:
            {
              lower = true, //boolean|undefined
              upper = false, //boolean|undefined
              number = false, //boolean|undefined
              symbol = false, //boolean|undefined
              length = 20, //number|undefined
            }
            */
      {
        lower = true,
        upper = false,
        number = false,
        symbol = false,
        length = 20,
      } = {
        lower: true,
        upper: false,
        number: false,
        symbol: false,
        length: 20,
      }
    ) {
      var rand = ""
      a(() => {
        rand += a(
          `${lower ? "asdfghjklzxcvbnmqwertyuiop" : ""}${
            upper ? "ASDFGHJKLQWERTYUIOPZXCVBNM" : ""
          }${number ? "0123456789" : ""}${
            symbol ? ",./;'[]-=\\`~!@#$%^&*()_+|{}:\"<>?" : ""
          }`.split("")
        ).randfrom().val
      }).repeat(length)
      return rand
    },
    "random/string"
  )
  allfuncs.new(
    "toplaces",
    function (
      //string
      num, //number|string
      pre, //number|none
      post = 0, //number|undefined
      func = Math.round //function
    ) {
      num = String(num).split(".")
      if (num.length == 1) num.push("")
      if (pre !== undefined) {
        num[0] = num[0].substring(num[0].length - pre, num[0].length)
        while (num[0].length < pre) num[0] = "0" + num[0]
      }
      var temp = num[1].substring(post, post + 1) ?? 0
      num[1] = num[1].substring(0, post)
      while (num[1].length < post) num[1] += "0"
      if (post > 0) {
        temp = func(num[1].at(-1) + "." + temp)
        num[1] = num[1].split("")
        num[1].pop()
        num[1].push(temp)
        num[1] = num[1].join("")
        num = num.join(".")
      } else num = num[0]
      return num
    },
    "number/format",
    true
  )
  allfuncs.new(
    "forcenumlength",
    function (
      //string
      string, //string
      lengths //array|number|object
    ) {
      var i = -1
      if (a(lengths).gettype("object").val) {
        lengths =
          lengths[[...string.matchAll(/\d+(?:\.\d+)?/g)].length]
      }
      if (!lengths) {
        log(string)
        debugger
      }
      return string.replaceAll(/\d+(?:\.\d+)?/g, function (v) {
        i++
        try {
          return a(lengths[i]).gettype("array").val
            ? a(Number(v)).toplaces(lengths[i][0], lengths[i][1]).val
            : a(Number(v)).toplaces(lengths[i], 0).val
        } catch (e) {
          log(string, lengths, i)
          debugger
        }
      })
    },
    "number/format",
    true
  )
  ;(function () {
    var lasttime = Date.now()
    allfuncs.new(
      "tick",
      function () {
        //number
        var time = Date.now() - lasttime
        lasttime = Date.now()
        return time
      },
      "time"
    )
  })()

  allfuncs.new("expandederror", expandederror, "error", true)
  allfuncs.new(
    "fetch",
    async function (
      //promise
      url, //string
      type = "text", //string|none
      ...args //any|undefined
    ) {
      return await (await fetch(url, ...args))[type]()
    },
    "url/web"
  )
  allfuncs.new(
    "copy",
    function (
      //string
      text //string
    ) {
      navigator.clipboard.writeText(text)
      return ""
      try {
        var temp = a(document.body)
          .createelem("textarea", {
            value: text,
            width: 0,
            height: 0,
            position: "fixed",
            top: 0,
            left: 0,
          })
          .run.same.focus()
          .run.same.select()
        document.execCommand("copy")
        temp.run.remove()
      } catch (e) {
        navigator.clipboard.writeText(text)
      }
      return text
    },
    "clipboard"
  )
  // allfuncs.new(
  //   "cache",
  //   (function () {
  //     var cac = {}
  //     function cache( //any
  //       args, //arguments|any
  //       data, //function
  //       notfoundincache //function|undefined
  //     ) {
  //       // if (a(args).gettype(["array", "arguments"]).val)
  //       //   args = [...args].join("\u1111")
  //       args = JSON.stringify(args)
  //       var c = String(arguments.callee.caller).replaceAll(/\s\s+/g, " ").trim()
  //       // log(structuredClone(cac))
  //       if (!cac[c]) cac[c] = {}
  //       if (args in cac[c]) return cac[c][args]
  //       cac[c][args] = data()
  //       if (notfoundincache) notfoundincache(cac[c][args])
  //       return cac[c][args]
  //     }
  //     cache.getall = function () {
  //       return cac
  //     }
  //     cache.setall = function (e) {
  //       return (cac = e)
  //     }
  //     cache.add = function (e) {
  //       return (cac = { ...cac, ...e })
  //     }
  //     cache.clear = function () {
  //       cac = {}
  //     }
  //     return cache
  //   })(),
  //   "data/storage"
  // )

  Object.keys(console).forEach((e) =>
    allfuncs.new(
      e,
      (/*undefined*/ ...z /*any*/) => console[e](...z),
      "console/debug"
    )
  )
  allfuncs.new(
    "replaceall",
    function (
      //string
      text, //string
      regex, //regex|string|array
      replacewith //string|function
    ) {
      return text.replaceAll(
        a(String(a(regex).toregex().val) + "g").toregex().val,
        replacewith
      )
    },
    ""
  )
  allfuncs.new(
    "setrange",
    function (
      //number
      num, //number
      min, //number
      max //number
    ) {
      return num < min ? min : num > max ? max : num
    },
    "number"
  )
  allfuncs.new(
    "isstrict",
    function (
      //boolean
      thing //array|object
    ) {
      return thing?.strictargs?.[0] === isstrict
    },
    "typescript"
  )
  allfuncs.new(
    "runonalltext",
    function (
      //undefined
      func, //function
      ignoretags = ["STYLE", "SCRIPT", "NOSCRIPT"] //array|undefined
    ) {
      // log(String(func))
      a("*").qsa().foreach(repl)
      watch(document.documentElement)
      function watch(elem) {
        new MutationObserver((e) => {
          if (location.href.includes("scratch.mit.edu/projects"))
            return
          ;[...e].forEach((e) => repl(e.target))
          //          ;[...e].forEach((e) => [...e.addedNodes].forEach(repl))
        }).observe(elem, {
          childList: true,
          subtree: true,
          attributes: true,
          characterData: false,
        })
      }

      function repl(node) {
        if (node.shadowRoot) {
          a("*").qsa(node.shadowRoot).foreach(repl)
          watch(node.shadowRoot)
          return repl(node.shadowRoot)
        }
        if (
          ignoretags
            .map((e) => e.toLowerCase())
            .includes(node?.tagName?.toLowerCase?.()) ||
          (node?.matches &&
            ignoretags.find((e) => node?.matches?.(e)))
        )
          return
        var nodes = node?.childNodes
        if (!nodes) return
        for (var i = 0, m = nodes.length; i < m; i++) {
          var n = nodes[i]
          // if (n.textContent.includes("Jul 17, 2021")) log(n, n.textContent)
          //if (ignoretags.map(e=>e.toLowerCase()).includes(n?.tagName?.toLowerCase?.())||(n?.matches&&ignoretags.find(e=>n?.matches?.(e)))) continue
          if (n.nodeType == n.TEXT_NODE) {
            func(n)
          } else {
            repl(n)
          }
        }
      }
    },
    "text/elem"
  )

  allfuncs.new(
    "runonallelems",
    function runonallelems(
      //undefined
      func, //function
      selector = "*", //string|undefined
      ignoretags = [] //array|undefined
    ) {
      new MutationObserver((e) => {
        ;[...e].forEach((e) => repl(e.target))
      }).observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      })
      a(selector).qsa().foreach(repl)
      function repl(elem) {
        if (elem.nodeType === 1) {
          // Check if elem is an element node
          if (elem.shadowRoot) {
            repl(elem.shadowRoot)
            const shadowRootElems =
              elem.shadowRoot.querySelectorAll(selector)
            for (const elem of shadowRootElems) {
              if (!ignoretags.includes(elem.tagName.toLowerCase())) {
                func(elem)
              }
            }
          }

          const elems = elem.querySelectorAll(selector)
          for (const elem of elems) {
            if (!ignoretags.includes(elem.tagName.toLowerCase())) {
              func(elem)
            }
          }
        }
      }
    },
    "elem"
  )
  allfuncs.new(
    "say",
    async function (
      //promise
      text, //string
      vol = 100,
      speed = 3
    ) {
      debugger
      speechSynthesis.cancel()
      speechSynthesis.speak(
        a(new SpeechSynthesisUtterance())
          .set.text(text + " ")
          .set.volume(a(vol).rerange(0, 100, 0, 1).val)
          .set.rate(3)
          // .set.voice(speechSynthesis.getVoices().find(e=>e.name==
          // "Chrome OS UK English 7"))
          .set.lang("en").val
      )
      await a((e) => speechSynthesis.speaking).waituntil()
      await a((e) => !speechSynthesis.speaking).waituntil()
      return undefined
    }
  )
  savelib("allfuncs", a)

  function extras() {
    ;(() => {
      if (!window.showDirectoryPicker) return
      if (!window.showOpenFilePicker) return
      if (!window.showSaveFilePicker) return
      const old = {
        showDirectoryPicker: showDirectoryPicker.bind(window),
        showOpenFilePicker: showOpenFilePicker.bind(window),
        showSaveFilePicker: showSaveFilePicker.bind(window),
      }
      showDirectoryPicker = a(function (
        //promise
        obj = false //object|boolean|undefined
      ) {
        if (obj === true) {
          obj = { mode: "readwrite" }
        } else if (obj === false) {
          obj = { mode: "read" }
        }
        return old.showDirectoryPicker(obj)
      }).strictfunction("showDirectoryPicker").val
      showOpenFilePicker = a(async function (
        //promise
        obj = {}, //object|undefined
        write, //boolean|undefined
        multiple, //boolean|undefined
        types, //array|undefined
        exts, //array|string|undefined
        excludeAcceptAllOption = false //boolean|undefined
      ) {
        if (obj.types && !types) {
          types = obj.types
          delete obj.types
        }
        if (obj.exts && !exts) {
          exts = obj.exts
          delete obj.exts
        }
        if (excludeAcceptAllOption) obj.excludeAcceptAllOption = true
        if (obj.name) obj.suggestedName = obj.name
        if (multiple !== undefined) {
          obj.multiple = multiple
          delete obj.name
        }
        if (exts) {
          obj.types = {
            accept: {
              "*/*": exts,
            },
          }
        }
        if (types) {
          if (!obj.type) obj.type = { accept: {} }
          types.forEach((type) => (obj.type.accept[type] = ["*"]))
        }
        if (obj.multiple) return await old.showOpenFilePicker(obj)
        var x = await old.showOpenFilePicker(obj)
        x = x[0] ?? x
        if (obj.mode == "readwrite" || write)
          if (
            (await x.requestPermission({ mode: "readwrite" })) !==
            "granted"
          )
            throw new Error("user didn't grant write permission")
        return x
      }).strictfunction("showOpenFilePicker").val
      showSaveFilePicker = a(function (
        //promise
        obj = {}, //object|none|string
        multiple = false, //boolean|none
        types, //array|none
        exts, //array|string|none
        excludeAcceptAllOption = false //boolean|undefined
      ) {
        if (typeof obj == "string") obj = { suggestedName: obj }
        if (obj.types && !types) {
          types = obj.types
          delete obj.types
        }
        if (obj.exts && !exts) {
          exts = obj.exts
          delete obj.exts
        }
        if (excludeAcceptAllOption) obj.excludeAcceptAllOption = true
        if (obj.name) obj.suggestedName = obj.name
        if (multiple !== undefined) {
          obj.multiple = multiple
          delete obj.name
        }
        if (exts) {
          obj.types = {
            accept: {
              "*/*": exts,
            },
          }
        }
        if (types) {
          if (!obj.type) obj.type = { accept: {} }
          types.forEach((type) => (obj.type.accept[type] = ["*"]))
        }
        return old.showSaveFilePicker(obj)
      }).strictfunction("showSaveFilePicker").val
    })()
  }
  extras()
  await loadlib("libloader").waitforlib("scratch")
  ;(() => {
    const vm = loadlib("scratch").vm

    allfuncs.new(
      "scratch_gettarget",
      function (
        //object
        sprite //string|none
      ) {
        if (sprite) var x = vm.runtime.getSpriteTargetByName(sprite)
        else var x = vm.runtime.getTargetForStage()
        x.getvar = x.lookupVariableByNameAndType
        return x
      },
      "scratch",
      true
    )
    allfuncs.new(
      "scratch_sendbroadcast",
      function (
        //string
        data //string
      ) {
        vm.runtime.startHats("event_whenbroadcastreceived", {
          BROADCAST_OPTION: data,
        })
        return data
      },
      "scratch",
      true
    )
    allfuncs.new(
      "scratch_canvas",
      function () {
        //element
        return (
          window?.vm?.runtime?.renderer?.canvas ||
          a(
            "#app > div > div.gui_body-wrapper_-N0sA.box_box_2jjDp > div > div.gui_stage-and-target-wrapper_69KBf.box_box_2jjDp > div.stage-wrapper_stage-wrapper_2bejr.box_box_2jjDp > div.stage-wrapper_stage-canvas-wrapper_3ewmd.box_box_2jjDp > div > div.stage_stage_1fD7k.box_box_2jjDp > div:nth-child(1) > canvas"
          ).qs().val ||
          a(
            "#view > div > div.inner > div:nth-child(2) > div.guiPlayer > div.stage-wrapper_stage-wrapper_2bejr.box_box_2jjDp > div.stage-wrapper_stage-canvas-wrapper_3ewmd.box_box_2jjDp > div > div.stage_stage_1fD7k.box_box_2jjDp > div:nth-child(1) > canvas"
          ).qs().val ||
          a(
            "#app > div > div > div > div.gui_body-wrapper_-N0sA.box_box_2jjDp > div > div.gui_stage-and-target-wrapper_69KBf.box_box_2jjDp > div.stage-wrapper_stage-wrapper_2bejr.box_box_2jjDp > div.stage-wrapper_stage-canvas-wrapper_3ewmd.box_box_2jjDp > div > div.stage_stage_1fD7k.box_box_2jjDp > div:nth-child(1) > canvas"
          ).qs().val
        )
      },
      "scratch",
      false
    )
    allfuncs.new(
      "scratch_press",
      function (
        //string
        key //string
      ) {
        if (key == " ") key = "space"
        if (/^[a-z]$/.test(key)) key = key.toUpperCase()
        var index =
          vm.runtime.ioDevices.keyboard._keysPressed.indexOf(key)
        if (index !== -1) {
          vm.runtime.ioDevices.keyboard._keysPressed.splice(index, 1)
        }
        vm.runtime.ioDevices.keyboard._keysPressed.push(key)
        vm.runtime.startHats("event_whenkeypressed", {
          KEY_OPTION: key,
        })
        vm.runtime.startHats("event_whenkeypressed", {
          KEY_OPTION: "any",
        })
        return key
      },
      "scratch"
    )
    allfuncs.new(
      "scratch_unpress",
      function (
        //undefined
        key //string
      ) {
        if (key == " ") key = "space"
        if (/^[a-z]$/.test(key)) key = key.toUpperCase()
        var index =
          vm.runtime.ioDevices.keyboard._keysPressed.indexOf(key)
        if (index !== -1) {
          vm.runtime.ioDevices.keyboard._keysPressed.splice(index, 1)
        }
      },
      "scratch"
    )
    allfuncs.new(
      "scratch_getallkeys",
      function () {
        var m = vm.runtime
        var f = {
          bools: m.targets
            .map((e) => {
              return {
                name: e.sprite.name,
                blocks: Object.values(e.blocks._blocks)
                  .filter((e) => e.opcode === "sensing_keypressed")
                  .map((e) => e.inputs.KEY_OPTION.block),
                otherblocks: e.blocks._blocks,
              }
            })
            .filter((e) => e.blocks.length)
            .map((e) => {
              return {
                name: e.name,
                value: [
                  ...new Set(
                    e.blocks
                      .map((y) => e.otherblocks[y])
                      .map(
                        (e) =>
                          e.fields?.KEY_OPTION?.value ||
                          e.fields?.VALUE?.value ||
                          error(e)
                      )
                  ),
                ],
              }
            }),
          hats: m.targets
            .map((e) => {
              return {
                name: e.name,
                blocks: Object.values(e.blocks)
                  .filter((e) => e.opcode === "event_whenkeypressed")
                  .map((e) => e.fields.KEY_OPTION.value),
              }
            })
            .filter((e) => e.blocks.length),
        }
        f.all = [
          ...f.hats.map((e) => e.blocks).flat(),
          ...f.bools.map((e) => e.value).flat(),
        ]
        f.all = [...new Set(f.all)]
        return f
      },
      "scratch",
      false
    )
  })()
  //log(...Object.keys( allfuncs).map(e=>[e, allfuncs[e].help, allfuncs[e]]||warn(e)))
})()
