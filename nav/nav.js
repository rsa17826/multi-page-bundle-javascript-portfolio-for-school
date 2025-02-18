;(async function () {
  const a = loadlib("allfuncs")
  await a.bodyload()
  document.body.appendChild(
    a.newelem("nav", {}, [
      a.newelem("img", {
        src: "./imgs/mainlogo.png",
        maxWidth: "20px",
        maxHeight: "20px",
      }),
      a.newelem("a", { innerHTML: "home", href: "/" }),
    ])
  )
})()
