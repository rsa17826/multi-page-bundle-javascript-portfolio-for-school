;(async function () {
  if (!window.loadlib) {
    alert("include allfuncs first")
  }
  if (location.hash == "#nonav") {
    return
  }
  const a = loadlib("allfuncs")
  var colorPicker, colorPickerDisplay
  const elems = a.newelem("nav", {}, [
    a.newelem("style", {
      innerHTML: `
* { font-family: initial }
body,
nav {
  width: 100vw;
  height: fit-content;
  max-height: 20px !important;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: var(--main-darker);
  border-bottom: 2px solid var(--main-light);
  padding: 7px;
  gap: 5px;
}
nav > * {
  color: var(--main-light);
  text-shadow: 0px 0px 10px var(--text-shadow-color);
}

input[type="color"] {
  display: none;
}

.color-label {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid var(--main-lightish);
  cursor: pointer;
  background-color: var(--root-color);
  display: inline-block;
  box-shadow: 0px 0px 10px var(--text-shadow-color);
}

nav > a {
  color: var(--main-lighter);
}
`,
    }),
    a.newelem("img", {
      src: "/multi-page-bundle-javascript-portfolio-for-school/imgs/mainlogo.png",
      maxWidth: "15px",
      maxHeight: "15px",
      alt: "favicon",
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
    a.newelem("a", {
      innerHTML: "custom start page",
      href: "/multi-page-bundle-javascript-portfolio-for-school/custom start page/",
    }),
    a.newelem("a", {
      innerHTML: "Build a Pok&eacute;mon Search App Project",
      href: "/multi-page-bundle-javascript-portfolio-for-school/Build a Pok\u00E9mon Search App Project/",
    }),
    a.newelem("a", {
      innerHTML: "Build a Cash Register Project",
      href: "/multi-page-bundle-javascript-portfolio-for-school/Build a Cash Register Project/",
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
      "#36393f".getPropertyValue("--root-color").trim()
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
  a.createelem(document.body, "style", {
    innerHTML: `body, head {
      margin-top: 45px;
    }`,
  })
  a.createelem(document.body, "div", {})
    .attachShadow({
      mode: "open",
    })
    .appendChild(elems)

  // not currently working yet

  // class CustomDropdown extends HTMLElement {
  //   constructor() {
  //     super()
  //     this.attachShadow({ mode: "open" }) // Attach shadow DOM
  //     this.shadowRoot.innerHTML = `
  //             <style>
  //                 :host {
  //                     transition-behavior: allow-discrete;
  //                     display: flex;
  //                     cursor: pointer;
  //                     margin: 10px 0;
  //                     width:fit-content;
  //                     padding: 10px;
  //                     padding-right: 30px;
  //                     background-color: #000000;
  //                     border: 1px solid #ccc;
  //                     border-radius: 5px;
  //                     position: relative;
  //                 }
  //                 .content {
  //                     display: none;
  //                     padding: 10px;
  //                     background-color: #aaa;
  //                     border: 1px solid #ccc;
  //                     border-radius: 5px;
  //                     margin-top: 5px;
  //                 }
  //                 .arrow {
  //                     position: absolute;
  //                     right: 10px;
  //                     top: 50%;
  //                     transform: translateY(-50%);
  //                     transition: transform 0.3s;
  //                 }
  //                 .expanded .arrow {
  //                     transform: translateY(-50%) rotate(180deg);
  //                 }
  //                 .dropdown.expanded + .content{
  //                 display:inline block;
  //                 position:absolute;
  //                 z-index:15;
  //                 }
  //             </style>
  //             <div class="dropdown">
  //                 <span>${this.getAttribute("text")}</span>
  //                 <span class="arrow">&darr;</span>
  //             </div>
  //                 <slot class="content"></slot>
  //         `
  //     this.content = this.shadowRoot.querySelector(".content")
  //     this.arrow = this.shadowRoot.querySelector(".arrow")
  //     this.dropdown = this.shadowRoot.querySelector(".dropdown")
  //     a.listen(this.dropdown, ["mousedown", "mouseup"], (e) => {
  //       e.preventDefault()
  //     })
  //     a.listen(document.body, "click", (e) => {
  //       if (e.target == this) {
  //         return
  //       }
  //       this.dropdown.classList.remove("expanded")
  //     })
  //     a.listen(this.dropdown, "click", (e) => {
  //       e.preventDefault()
  //       this.dropdown.classList.toggle("expanded")
  //     })
  //   }
  // }
  // customElements.define("dropdown-", CustomDropdown)
})()
