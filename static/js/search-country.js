import { changeTime } from "./index.js";

export default function autocomplete(inp, arr) {
  let currentFocus;
  inp.addEventListener("input", function (e) {
    const { value } = this;
    closeAllLists();
    if (!value) {
      return false;
    }
    currentFocus = -1;
    let a = document.createElement("DIV");
    a.setAttribute("id", `${this.id} autocomplete-list`);
    a.setAttribute("class", "autocomplete-list");
    this.parentNode.appendChild(a);

    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      const b = document.createElement("DIV");
      b.setAttribute("class", "autocomplete-item");
      if (element.label.toUpperCase().search(value.toUpperCase()) === 0) {
        const lengt = value.length;
        const { label, code } = element;
        const html = `
        <strong>${label.substr(0, length)}</strong>${label.substr(length)}
        <input 
          type='hidden' 
          value='${label}' 
          data-code='${code}'
          id='country-selected' />`;
        b.innerHTML = html;
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
          changeTime(this.getElementsByTagName("input")[0]);
        });
        a.appendChild(b);
      }
    }
  });

  inp.addEventListener("keydown", function (e) {
    let x = document.getElementById(`${this.id} autocomplete-list`);
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode === 27) {
      closeAllLists();
    }
    if (e.keyCode === 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode === 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode === 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-list");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
}
