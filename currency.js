let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let amount = document.querySelector(".value input");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
  for (let code in countryList) {
    let option = document.createElement("option");
    option.value = code;
    option.innerText = code;
    if (select.name === "From" && code === "USD") option.selected = true;
    if (select.name === "To" && code === "PKR") option.selected = true;
    select.append(option);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

// Flag update
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let img = element.parentElement.querySelector("img");
  if (img && countryCode) {
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  }
};

// Convert currencies
const exchangeupdate = async () => {
  let from = fromcurr.value;
  let to = tocurr.value;
  let val = parseFloat(amount.value);

  if (isNaN(val) || val <= 0) {
    msg.innerText = "Enter a valid amount.";
    return;
  }

  const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${val}`;

  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error("API error");

    let data = await response.json();
    if (!data.result) throw new Error("Invalid result");


    let result = data.result;
    msg.innerText = `${val} ${from} = ${result.toFixed(2)} ${to}`;
  } catch (err) {
    msg.innerText = "Conversion failed. Try again later.";
    console.error("Error:", err);
  }
};

// Convert on button click
btn.addEventListener("click", (e) => {
  e.preventDefault();
  exchangeupdate();
});

// Convert on page load
window.addEventListener("load", () => {
  exchangeupdate();
});
