;(async function () {
  if (!window.loadlib) {
    alert("include allfuncs first")
  }
  const a = loadlib("allfuncs")
  var colorPicker, colorPickerDisplay
  const elems = a.newelem("nav", {}, [
    a.newelem("img", {
      src: "/multi-page-bundle-javascript-portfolio-for-school/imgs/mainlogo.png",
      maxWidth: "15px",
      maxHeight: "15px",
    }),
    a.newelem("a", {
      innerHTML: "home",
      href: "/multi-page-bundle-javascript-portfolio-for-school/",
    }),
    a.newelem("a", {
      innerHTML: "ffopen",
      href: "/multi-page-bundle-javascript-portfolio-for-school/ffopen/",
    }),
    a.newelem("a", {
      innerHTML: "vid1 site clone",
      href: "/multi-page-bundle-javascript-portfolio-for-school/vid1%20site%20clone/",
    }),
    a.newelem("a", {
      innerHTML: "bg color changer",
      href: "/multi-page-bundle-javascript-portfolio-for-school/bg color changer/",
    }),
    a.newelem("a", {
      innerHTML: "Palindrome Checker Project",
      href: "/multi-page-bundle-javascript-portfolio-for-school/Palindrome Checker Project/",
    }),
    a.newelem("a", {
      innerHTML: "Build a Roman Numeral Converter Project",
      href: "/multi-page-bundle-javascript-portfolio-for-school/Build a Roman Numeral Converter Project/",
    }),
    a.newelem("a", {
      innerHTML: "Build a Telephone Number Validator Project",
      href: "/multi-page-bundle-javascript-portfolio-for-school/Build a Telephone Number Validator Project/",
    }),
    (colorPicker = a.newelem("input", {
      type: "color",
      id: "colorPicker",
    })),
    (colorPickerDisplay = a.newelem("label", {
      for: "colorPicker",
      class: "color-label",
    })),
  ])
  var defaultColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--root-color")
    .trim()
  setcol(
    localStorage.rootColor ||
      getComputedStyle(document.documentElement)
        .getPropertyValue("--root-color")
        .trim()
  )
  function setcol(col) {
    document.documentElement.style.setProperty(
      "--root-color",
      (colorPicker.value = localStorage.rootColor = col)
    )
  }
  colorPicker.oninput = (event) => setcol(event.target.value)
  colorPickerDisplay.oncontextmenu = (e) => {
    e.preventDefault()
    setcol(defaultColor)
  }
  await a.bodyload()
  document.body.appendChild(elems)
})()
