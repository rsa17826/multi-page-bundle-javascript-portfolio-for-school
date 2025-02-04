// ==UserScript==
// @name         lib:type converter
// @version      1
// @description  none
// @license      GPLv3
// @run-at       document-start
// @author       You
// @match        *://*/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJQTFRFAAAAEIijAo2yAI60BYyuF4WaFIifAY6zBI2wB4usGIaZEYigIoiZCIyrE4igG4iYD4mjEomhFoedCoqpDIqnDomlBYyvE4efEYmiDYqlA42xBoytD4mkCYqqGYSUFYidC4qoC4upAo6yCoupDYqmCYur4zowOQAAACZ0Uk5TAO////9vr////1+/D/+/L+/Pf/////+f3///////H4////////+5G91rAAACgUlEQVR4nM2Y22KjIBCGidg1264liZqDadK03X3/V2wNKHMC7MpF/xthHD5mgERAqZhWhfYqH6K+Qf2qNNf625hCoFj9/gblMUi5q5jLkXLCKudgyiRm0FMK82cWJp1fLbV5VmvJbCIc0GCYaFqqlDJgADdBjncqAXYobm1xh72aFMflbysteFfdy2Yi1XGOm5HGBzQ1dq7TzEoxjeNTjQZb7VA3e1c7+ImgasAgQ9+xusNVNZIo5xmOMgihIS2PbCQIiHEUdTvhxCcS/kPomfFI2zHy2PkWmA6aNatIJpKFJyekyy02xh5Y3DI9T4aOT6VhIUrsNTFp1pf79Z4SIIVDegl6IJO6cHiL/GimIZDhgTu/BlYWCQzHMl0zBWT/T3KAhtxOuUB9FtBrpsz0RV4xsjHmW+UCaffcSy/5viMGer0/6HdFNMZBq/vjJL38H9Dqx4Fuy0Em12DbZy+9pGtiDijbglwAehyj11n0tRD3WUBm+lwulE/8h4BuA+iWAQQnteg2Xm63WQLTpnMnpjdge0Mgu/GRPsV4xdjQ94Lfi624fabhDkfUqIKNrM64Q837v8yL0prasepCgrtvw1sJpoqanGEX7b5mQboNW8eawXaWXTMfMGxub472hzWzHSn6Sg2G9+6TAyRruE71s+zAzjWaknoyJCQzwxrghH2k5FDT4eqWunuNxyN9QCGcxVod5oADbYnIUkDTGZEf1xDJnSFteQ3KdsT8zYDMQXcHxsevcLH1TrsABzkNPyA/L7b0jg704viMMlpQI96WsHknCt/3YH0kOEo9zcGkwrFK39ck72rmoehmKqo2RKlilzSy/nJKEV45CT38myJp456fezktHjN5aeMAAAAASUVORK5CYII=
// @grant        none
// ==/UserScript==
;(() => {
  const a = loadlib("allfuncs")
  const change = {
    "cssstyledeclaration string"(z) {
      return JSON.stringify(settype(z, "object"))
    },
    "regex string"(z) {
      return String(z)
    },
    "regex array"(z) {
      z = String(z).match(/^\/(.*)\/(\w*)$/)
      return [z[1], z[2]]
    },
    "array regex"(z) {
      if (z.length !== 2) throw new Error("arr must be length 2")
      if (!(a(z[0]).gettype("string").val && a(z[1]).gettype("string").val))
        throw new Error("arr must be all strings")
      z[1] = z[1].toLowerCase()
      if (z[1].includes("w")) {
        z[1] = z[1].replace("w", "")
        z[0] = `(?<=[^a-z0-9]|^)${z[0]}(?=[^a-z0-9]|$)`
      }
      return new RegExp(z[0], z[1].replaceAll(/(.)(?=.*\1)/g, ""))
    },
    "string regex"(z) {
      var temp
      if ((temp = String(z).match(/^\/(.*)\/(\w*)$/))) {
        temp = [temp[1], temp[2]]
      } else {
        temp = [String(z), ""]
      }
      return settype(temp, "regex")
    },
    "cssstyledeclaration object"(z) {
      return { ...z }
    },
    async "filesystemdirectoryhandle array"(z) {
      return await a(z).getfolderpath()
    },
    async "filesystemfilehandle file"(z) {
      return await z.getFile()
    },
    async "filesystemfilehandle string aspromise"(z) {
      return await a(await z.getFile()).readfile("Text")
    },
    "date number"(z) {
      return z.getTime()
    },
    "date string"(z) {
      return "" + new Date()
    },
    "set string"(z) {
      return JSON.stringify(settype(z, "array"))
    },
    "number date"(z) {
      return new Date(z)
    },
    "number|function|asyncfunction|generatorfunction string"(z) {
      return String(z)
    },
    "object|array string"(z) {
      return JSON.stringify(z)
    },
    "string number"(z) {
      return Number(z)
    },
    "string array"(z) {
      try {
        var x = JSON.parse(z)
        if (a(x).gettype("array").val) return x
        throw new Error("")
      } catch (e) {
        return [z]
      }
    },
    "nodelist|htmlcollection|set array"(z) {
      return [...z]
    },
    "nodelist|htmlcollection|array set"(z) {
      return new Set(settype(z, "array"))
    },
    "nodelist|htmlcollection|array|set|string blob"(z) {
      z = settype(z, "array")
      if (z.length == 2) return new Blob(...z)
      return new Blob(z, ["text/plain"])
    },
    "nodelist|htmlcollection|array|string|set|blob file"(z) {
      z = settype(z, "array")
      if (z.length == 2) return new File(...z)
      return new File(z, undefined)
    },
    "nodelist|htmlcollection|array|set object"(z) {
      z = settype(z, "array")
      var obj = {}
      z.forEach((e, i) => {
        obj[i] = e
      })
      return obj
    },
    "string object"(z) {
      try {
        var x = JSON.parse(z)
        if (a(x).gettype("object").val) return x
        throw new Error("")
      } catch (e) {
        throw new Error("failed to convert given string to an object")
      }
    },
    "string set"(z) {
      z = settype(z, "array")
      return new Set(z)
    },
    async "blob string aspromise"(z) {
      return await z.text()
    },
    async "file string aspromise"(z) {
      return await a(z).readfile("Text")
    },
    "object array"(z) {
      return Object.entries(z)
    },
    "object set"(z) {
      return new Set(settype(z, "array"))
    },
  }
  function settype(z, getto) {
    const getfrom = a(z).gettype().val
    if (getto === getfrom) return z
    var p
    var x = a(change).find((key, val) => {
      var [from, to, tempp] = key.split(" ")
      from = from.split("|")
      to = to.split("|")
      if (from.includes(getfrom) && to.includes(getto)) {
        p = tempp
        return true
      }
    }).val
    if (!x) throw new Error(`no function to change from ${getfrom} to ${getto}`)
    try {
      x = change[x](z)
    } catch (e) {
      error(`encountered error while changing from ${getfrom} to ${getto}`)
      throw e
    }
    if (a(x).gettype(p == "aspromise" ? "promise" : getto).val) return x
    throw new Error(
      `changing from ${getfrom} to ${getto} returned a type of ${a(x).gettype()}`,
      error(x)
    )
  }
  loadlib("libloader").savelib("type converter", {
    settype,
    checkconversion(z, getto, allowpromise) {
      const getfrom = a(z).gettype().val
      var p = false
      return p
        ? allowpromise
          ? "promise"
          : false
        : !!a(change).find((key, val) => {
            var [from, to, tempp] = key.split(" ")
            from = from.split("|")
            to = to.split("|")
            if (from.includes(getfrom) && to.includes(getto)) {
              p = !!tempp
              return true
            }
          }).val
    },
  })
})()
