;(() => {
  const a = loadlib("allfuncs")
  Object.keys(console).forEach((e) => {
    window[e] = function (...args) {
      var z = []
      let pi = 0
      args.forEach((y) => {
        let rand = `{${pi}}${a.randstr()}`
        while (true) {
          if (a.gettype(y, "promise")) {
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
})()
