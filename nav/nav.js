;(async function () {
  const a = loadlib("allfuncs")
  await a.bodyload()
  document.body.appendChild(
    a.newelem("nav", {}, [
      a.newelem("img", {
        src: "/multi-page-bundle/imgs/mainlogo.png",
        maxWidth: "20px",
        maxHeight: "20px",
      }),
      a.newelem("a", {
        innerHTML: "home",
        href: "/multi-page-bundle/",
      }),
      a.newelem("a", {
        innerHTML: "ffopen",
        href: "/multi-page-bundle/ffopen/",
      }),
      a.newelem("a", {
        innerHTML: "vid1 site clone",
        href: "/multi-page-bundle/vid1%20site%20clone/",
      }),
      a.newelem("a", {
        innerHTML: "bg color changer",
        href: "/multi-page-bundle/bg color changer/",
      }),
      a.newelem("a", {
        innerHTML: "Palindrome Checker Project",
        href: "/multi-page-bundle/Palindrome Checker Project/",
      }),
    ])
  )
})()
