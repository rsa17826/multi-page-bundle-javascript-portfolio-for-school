;(async function () {
  debugger
  const a = loadlib("allfuncs")
  await a.bodyload()
  log(1111)
  document.body.appendChild(
    a.newelem(
      "div",
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
      [a.newelem("p", { innerHTML: "test" })]
    )
  )
})
