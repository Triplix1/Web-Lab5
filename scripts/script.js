"use strict";

const nav = document.querySelector(".nav");
const second = document.querySelector(".second-column");

let temp = nav.cloneNode(true);

nav.innerHTML = second.innerHTML;
nav.className = second.className;

second.innerHTML = temp.innerHTML;
second.className = temp.className;

second.classList.remove("nav");
second.classList.add("swapped-nav");

nav.classList.remove("second-column");
nav.classList.add("swapped-second-column");

//////////////////////////////////////////////////////////

if (localStorage.getItem("sec_col_bgc") != null) {
  document
    .querySelectorAll(".swapped-nav .menu .list p")
    .forEach((e) =>
      e.setAttribute("style", `color:${localStorage.getItem("sec_col_bgc")}`)
    );
}

/////////////////////////////////////////////////////////

const square = (radius) => {
  return radius ** 2 * Math.PI;
};

const text1 = document.querySelector(".text1");

const text2 = document.querySelector(".text2");

const firstColumn = document.querySelector(".first-column");

const squareResult = document.querySelector("#square__result");

const colText = document.querySelector("#column1__text");

document.querySelector(".text").setAttribute("style", "display:none");

colText.setAttribute("style", "display:none");

let btnSquare = document.createElement("button");
btnSquare.innerText = "Square!";
btnSquare.setAttribute("class", "btn");

let btnMinNum = document.createElement("button");
btnMinNum.innerText = "Min!";
btnMinNum.setAttribute("class", "btn");

let inputRadius = document.createElement("input");
inputRadius.setAttribute("class", "input__radius");
inputRadius.setAttribute("placeholder", "Radius");
inputRadius.setAttribute("type", "text");
inputRadius.style.padding = "3px";

let inputNum = document.createElement("input");
inputNum.setAttribute("type", "number");
inputNum.style = "padding:3px; margin:5px";

firstColumn.insertAdjacentElement("afterbegin", inputNum);

text2.innerHTML = "";

text2.insertAdjacentElement("beforeend", btnSquare);
text2.insertAdjacentElement("beforeend", btnMinNum);

text1.insertAdjacentElement("afterbegin", inputRadius);

btnSquare.addEventListener("click", () => {
  let number = Number(inputRadius.value);
  console.log(number);
  if (number < 0 || isNaN(number)) {
    squareResult.removeAttribute("type");
    firstColumn.insertAdjacentHTML("beforeend", "<p>Input normal number!</p>");
  } else {
    firstColumn.insertAdjacentHTML(
      "beforeend",
      `<p style="font-size:14px">${square(number).toFixed(2)}</p>`
    );
  }
});

btnMinNum.addEventListener("click", () => {
  inputNum.style = "border: 0";
  if (isNaN(inputNum.valueAsNumber)) {
    inputNum.style = "border: 3px solid red; border-radius:3px;";
  } else {
    let min = Math.min(...inputNum.value.split("").filter((i) => !isNaN(i)));
    document.cookie = `min=${min}`;
    alert(min);
  }
});

// window.onbeforeunload = (event) => {
//   event.preventDefault();
//   return confirm(`save: ${document.cookie} ?`);
// };

window.onload = () => {
  inputNum.style.visibility = "hidden";
  btnMinNum.style.visibility = "hidden";
  let savecookies;
  while (savecookies !== "y" && savecookies !== "n") {
    savecookies = prompt(
      `Your cookies: ${document.cookie} , save it (Y/N)`
    ).toLocaleLowerCase();
  }
  if (savecookies === "y") {
    alert(
      `Your cookies: ${document.cookie} , for inputting new min number you should refresh page`
    );
  } else {
    document.cookie = "min=";
    inputNum.style.visibility = "visible";
    btnMinNum.style.visibility = "visible";
  }
};

///////////////////////////////////////////////////////////

window.onselect = selectText;

function selectText() {
  localStorage.setItem("sec_col_bgc", prompt("witch color you whant?"));
  document
    .querySelectorAll(".swapped-nav .menu .list p")
    .forEach((e) =>
      e.setAttribute("style", `color:${localStorage.getItem("sec_col_bgc")}`)
    );
}

////////////////////////////////////////////////////////////

let iterator = 0;

let numberMouseOut = document.querySelector("#numberMouseOut");

let photo = document.querySelectorAll(".photo");

photo.forEach((m) => (m.style = "display:inline-flex; padding:0"));

let mouseOut = () => {
  numberMouseOut.innerHTML = String(++iterator);
};

/////////////////////////////////////////////////////////////

let inputContent = document.createElement("input");
inputContent.style = "padding:4px";
//inputContent.setAttribute("type", "number");

let submitContent = document.createElement("button");
submitContent.style =
  "padding: 8px; background-color: #5aa; margin:10px; border: none; border-radius:2px";
submitContent.innerText = "Add element";

let resetContent = document.createElement("button");
resetContent.style =
  "padding: 8px; background-color: #a6f; margin:10px; border: none; border-radius:2px";
resetContent.innerText = "Reset";

let tableSpace = document.createElement("div");
tableSpace.style = "max-width:90%; margin:auto; overflow-x:auto;display:none";

addContent.style = "width:90%; max-width:90%; justify-self:center";
addContent.insertAdjacentElement("beforeBegin", resetContent);
addContent.insertAdjacentElement("beforeBegin", submitContent);
addContent.insertAdjacentElement("beforeBegin", inputContent);
addContent.insertAdjacentElement("afterend", tableSpace);

let createTable = () => {
  let table = document.createElement("table");
  table.style = "border: 2px solid black; padding:0";
  let firstrow = document.createElement("tr");
  firstrow.style = "border: 2px solid black; padding:0";
  let secondrow = document.createElement("tr");
  secondrow.style = "border: 2px solid black; padding:0";
  let column;
  if (contentList.length == 0) {
    tableSpace.innerHTML = "";
    tableSpace.style.display = "none";
    return;
  }
  for (let i = 0; i < contentList.length; i++) {
    column = document.createElement("td");
    column.style = "border: 2px solid black; margin:0";
    column.innerText = contentList[i];
    if (i % 2 == 0 || contentList.length % 2 == 1) {
      firstrow.insertAdjacentElement("beforeend", column);
    } else {
      secondrow.insertAdjacentElement("beforeend", column);
    }
    table.insertAdjacentElement("afterbegin", secondrow);
    table.insertAdjacentElement("afterbegin", firstrow);
  }
  tableSpace.style.display = "block";
  tableSpace.innerHTML = table.outerHTML;
};

let contentList = JSON.parse(localStorage.getItem("contentlist")) ?? [];
console.log(contentList);
createTable();

submitContent.addEventListener("click", () => {
  if (inputContent.value) {
    contentList.push(inputContent.value);
  }
  localStorage.setItem("contentlist", JSON.stringify(contentList));
  createTable();
});

resetContent.addEventListener("click", () => {
  contentList = [];
  localStorage.setItem("contentlist", JSON.stringify(contentList));
  createTable();
});

////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////

// window.addEventListener("select", () => {
//     inputNum.style = "display:none";
//     btnMinNum.style.display = "none";
//     //   let savecookies = prompt(
//     //     `Your cookies: ${document.cookie}, save it (Y/N)`
//     //   ).toLocaleLowerCase();

//     //   while (savecookies !== "y" || savecookies !== "n") {
//     //     savecookies = prompt(
//     //       `Your cookies: ${document.cookie}, save it (Y/N)`
//     //     ).toLocaleLowerCase();
//     //   }
//     //   if (savecookies === "y") {
//     //     alert(`Your cookies  = ${document.cookie}, press "ok" for unload page`);
//     //   } else {
//     //     document.cookie = "min=";
//     //   }
//     let save = alert(`Your cookies: ${document.cookie}, save it?`);
//     if (save) {
//       alert(`Your cookies  = ${document.cookie}, press "ok" for unload page`);
//     } else {
//       document.cookie = "min=";
//     }
// });
