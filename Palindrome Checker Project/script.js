document.querySelector("#check-btn").onclick = () => {
  if (!document.querySelector("#text-input").value) {
    alert("Please input a value")
    return
  }
  var text = document
    .querySelector("#text-input")
    .value.replaceAll("-", "_")
    .replaceAll("/", "\\")
    .replaceAll("(", ")")
    .replaceAll("[", "]")
    .replaceAll("{", "}")
    .replaceAll(/[_ .,]/g, "")
    .toLowerCase()
  console.log(
    text,
    "______",
    text.split("").toReversed().join(""),
    "_______",
    document.querySelector("#text-input").value
  )
  if (text.split("").reverse().join("") == text) {
    document.querySelector("#result").textContent =
      document.querySelector("#text-input").value + " is a palindrome"
  } else {
    document.querySelector("#result").textContent =
      document.querySelector("#text-input").value +
      " is not a palindrome"
  }
}
