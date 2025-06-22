// Constants

const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const resultText = document.getElementById("result");

// Functions

const palindromeCheck = (str) => {
  const cleanStr = str.replace(/[\W_]/g, "").toLowerCase();
  const reversedStr = cleanStr.split("").reverse().join("");
  return cleanStr === reversedStr;
}

// Interactivity

checkButton.addEventListener("click", () => {
  const inputValue = textInput.value.trim();
  if (!inputValue) {
    alert("Please input a value");
    return;
  }
  
  resultText.style.display = "block";
  resultText.innerText = palindromeCheck(inputValue) 
  ? `${inputValue} is a palindrome.` 
  : `${inputValue} is not a palindrome.`;
  setTimeout(() => {
    resultText.style.display = "none";
  }, 5000);
});

textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkButton.click();
  }
});
