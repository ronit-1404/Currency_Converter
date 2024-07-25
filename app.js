// const BASE_URL =
//   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


// const dropdowns = document.querySelectorAll(".dropdown select");
// const btn = document.querySelector("form button");
// const fromCurr = document.querySelector(".from select");
// const toCurr = document.querySelector(".to select");
// const msg = document.querySelector(".msg");


// for (let select of dropdowns) {
//   for (let currCode in countryList) {
//     let newOption = document.createElement("option");
//     newOption.innerText = currCode;
//     newOption.value = currCode;
//     if (select.name === "from" && currCode === "USD") {
//       newOption.selected = "selected";
//     } else if (select.name === "to" && currCode === "INR") {
//       newOption.selected = "selected";
//     }
//     select.append(newOption);
//   }

//   select.addEventListener("change", (evt) => {
//     updateFlag(evt.target);
//   });
// }

// const updateFlag = (element) => {
//     let currCode = element.value;
//     let countrycode  = countryList[currCode];
//     let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
//     let img = element.parentElement.querySelector("img");
//     img.src = newsrc;
//   }
 
//   btn.addEventListener("click", async (evt) => {
//     evt.preventDefault();
//     let amount  = document.querySelector(".amount input");
//     let amtval = amount.value;
//     if(amtval === "" || amtval < 1){
//       amtval = 1;
//       amount.value = "1";
//     }

//    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//    let response = await fetch(URL);
//    let data = await response.json();
//    let rate = data[toCurr.value.toLowerCase()]
  

//    let finalAmount = amtval*rate;

//    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
//   });

//new code
const Base_Url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evnt) => {
    updateFlag(evnt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evnt) => {
  evnt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const fromCurrency = fromCurr.value.toLowerCase();
  const toCurrency = toCurr.value.toLowerCase();
  const URL = `${Base_Url}/${fromCurrency}.json`;

  try {
    let response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let data = await response.json();

    // Ensure the correct data structure is accessed
    let rate;
    if (data[toCurrency]) {
      rate = data[toCurrency];
    } else if (data[toCurrency] !== undefined) {
      rate = data[toCurrency];
    } else {
      console.error("Currency data not found in the response");
      msg.innerText = "Currency data not available.";
      return;
    }

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
  } catch (error) {
    console.error("Error fetching or processing data: ", error);
    msg.innerText = "Error fetching exchange rate.";
  }
});

