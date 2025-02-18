;(async function () {
  const a = loadlib("allfuncs")
  await a.bodyload()
  document.body.appendChild(
    a.newelem(
      "nav",
      {
        width: "100vw",
        height: "40px",
        position: "fixed",
        top: "0",
        left: "0",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "red",
      },
      [a.newelem("a", { innerHTML: "home", href: "/" })]
    )
  )
})()
