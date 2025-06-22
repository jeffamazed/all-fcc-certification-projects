// DOM

const clockText = document.getElementById("clock");
const dateText = document.getElementById("date");
const quoteText = document.getElementById("quote");
const quoteBtn = document.getElementById("quote-btn");
const validatorBtn = document.getElementById("validator-btn");
const homeBtn = document.getElementById("home-btn");
const validatorWindow = document.getElementById("validator-window");
const userInput = document.getElementById("user-input");
const resultsContainer = document.getElementById("results-div");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");

// Clock and Date

let lastUpdatedDate = "";

const updateClock = () => {
  const dateObj = new Date();
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  const currentDate = `${day}/${month}/${year}`;
 
  clockText.textContent = `${hours}:${minutes}`;
  
  if (currentDate !== lastUpdatedDate) {
    dateText.textContent = currentDate;
    lastUpdatedDate = currentDate;
  }
}
updateClock();
setInterval(updateClock, 1000);

// Quotes

const quoteList = [
  `"Chase dreams, not approval."`,
  `"In silence, we find clarity."`,
  `"Embrace change, or be left behind."`,
  `"Doubt kills more dreams than failure ever will."`,
  `"Courage is fear, but with a plan."`,
  `"Create the life you want, not the one given."`,
  `"Success is earned, not gifted."`,
  `"Failure is just a lesson in disguise."`,
  `"The future belongs to those who believe in action."`,
  `"You are your only limit."`,
];

const randomPick = (array) => {
  const choice = Math.floor(Math.random() * array.length);
  return array[choice];
};

// Telephone Number Validator

const checkUserInput = str => {
  const phoneRegex = /^1?\s?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
  return phoneRegex.test(str);
};

const addResultsHTML = () => {
  const validTelephoneNum = checkUserInput(userInput.value);
  const pEl = document.createElement("p");
  
  if (validTelephoneNum) {
    pEl.textContent = `Valid US number: ${userInput.value}`;
    pEl.style.color = "#006400";
  } else {
    pEl.textContent = `Invalid US number: ${userInput.value}`;
    pEl.style.color = "#8B0000";
    
  }

  pEl.setAttribute("aria-label", `Validation result: ${pEl.textContent}`);
  resultsContainer.prepend(pEl);
};


// Interactivity

validatorBtn.addEventListener("click", () => {
  validatorWindow.classList.remove("hidden");
  validatorWindow.classList.add("visible");
});

homeBtn.addEventListener("click", () => {
  validatorWindow.classList.remove("visible");
  validatorWindow.classList.add("hidden");
});

quoteBtn.addEventListener("click", () => {
  quoteText.classList.remove("visible");
  void quoteText.offsetWidth;
  quoteText.textContent = randomPick(quoteList);
  quoteText.classList.add("visible");
});

checkBtn.addEventListener("click", () => {
  if (!userInput.value.trim()) {
    alert("Please provide a phone number.");
    return;
  }
  addResultsHTML();
  userInput.value = "";
});

clearBtn.addEventListener("click", () => {
  resultsContainer.innerHTML = "";
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkBtn.click();
  }
});