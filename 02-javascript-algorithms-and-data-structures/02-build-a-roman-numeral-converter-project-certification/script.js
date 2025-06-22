// Constants

const numberInput = document.getElementById("number");
const convertButton = document.getElementById("convert-btn");
const infoButton = document.getElementById("info-btn");
const output = document.getElementById("output");
const infoBox = document.getElementById("info-container");

// Data

const romanNumerals = [
  { numeral: "M", value: 1000 },
  { numeral: "CM", value: 900 },
  { numeral: "D", value: 500 },
  { numeral: "CD", value: 400 },
  { numeral: "C", value: 100 },
  { numeral: "XC", value: 90 },
  { numeral: "L", value: 50 },
  { numeral: "XL", value: 40 },
  { numeral: "X", value: 10 },
  { numeral: "IX", value: 9 },
  { numeral: "V", value: 5 },
  { numeral: "IV", value: 4 },
  { numeral: "I", value: 1 }
];

// Functions

const arabicToRoman = (input) => {
  let result = ""
  for (const { numeral, value } of romanNumerals) {
    while (input >= value) {
      input -= value;
      result += numeral;
    }
  }
  return result;
};

const checkUserInput = () => {
  const rawInput = numberInput.value;
  const inputInt = parseInt(numberInput.value);
  const outputContainer = output.parentElement;

  output.parentElement.classList.remove("error");

  if (!inputInt || /e/i.test(rawInput)) {
    output.textContent = "Please enter a valid number.";
    outputContainer.classList.add("error");
    numberInput.value = "";
    return;
  } 
  
  if (inputInt <= 0) {
    output.textContent = "Please enter a number greater than or equal to 1.";
    outputContainer.classList.add("error");
    numberInput.value = "";
    return;
  }
  
  if (inputInt >= 4000) {
    output.textContent = "Please enter a number less than or equal to 3999.";
    outputContainer.classList.add("error");
    numberInput.value = "";
    return;
  } 

  output.textContent = arabicToRoman(inputInt);
  numberInput.value = "";
};

// Interactivity



convertButton.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});

infoButton.addEventListener("mouseenter", () => {
  infoBox.classList.remove("hidden");
});

infoButton.addEventListener("mouseleave", () => {
  infoBox.classList.add("hidden");
});
