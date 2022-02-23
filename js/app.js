/* ====================================================
MENU
=====================================================*/
// Selectors
const genMedNumButton = document.querySelector(".button_genMedNum");
const genPassButton = document.querySelector(".button_genPass");
const genTestPatButton = document.querySelector(".button_genTestPat");
const medAppComponent = document.querySelector(".med-app");
const passComponent = document.querySelector(".pass-app");
const testPatComponent = document.querySelector(".test-pat-app");

// Event Listeners
genMedNumButton.addEventListener("click", displayGenMedNumApp);
genPassButton.addEventListener("click", displayPassApp);
genTestPatButton.addEventListener("click", displayTestPatApp);

// Event Handlers
function displayGenMedNumApp() {
  resetPassApp();
  medAppComponent.style.display = "block";
  genMedNumButton.classList.add("menu__button--active");
  genPassButton.classList.remove("menu__button--active");
  testPatComponent.style.display = "none";
  genTestPatButton.classList.remove("menu__button--active");
}

function displayPassApp() {
  resetGenMedApp();
  genMedNumButton.classList.remove("menu__button--active");
  passComponent.style.display = "block";
  genPassButton.classList.add("menu__button--active");
  testPatComponent.style.display = "none";
  genTestPatButton.classList.remove("menu__button--active");
}

function displayTestPatApp() {
  medAppComponent.style.display = "none";
  genMedNumButton.classList.remove("menu__button--active");
  passComponent.style.display = "none";
  genPassButton.classList.remove("menu__button--active");
  testPatComponent.style.display = "block";
  genTestPatButton.classList.add("menu__button--active");
}

  
  
/* ====================================================
GENERATE MEDICARE NUMBERS APP
=====================================================*/
// Selectors
const medAppQuantity = document.querySelector(".app__qty-selection-input");
const medAppGenerateButton = document.querySelector(
  ".app__qty-selection-generate"
);
const medAppDataContainer = document.querySelector(".med-app__data");

// Event Listeners
medAppGenerateButton.addEventListener("click", generateMedicareNumbers);
    
// Event Handlers
function generateMedicareNumbers() {
  medAppDataContainer.innerHTML = "";
  const quantity = medAppQuantity.value;
  if (quantity < 1 || quantity > 100) {
    window.alert("JS ERROR: The number has to be between 1 and 100. Try again.");
    medAppQuantity.value = "";
    medAppDataContainer.style.display = "none";
    return;
  }
  medAppDataContainer.style.display = "block";
  for (let index = 0; index < quantity; index++) {
    const newP = document.createElement("p");
    const node = document.createTextNode(
      index + 1 + ") " + randomMedicareNumber()
      );
      newP.appendChild(node);
      newP.className = "med-app__data-string";
      medAppDataContainer.appendChild(newP);
  }  
}

// Functions
function randomMedicareNumber() {
  let sum = Math.floor(Math.random() * 5) + 2;
  const weights = [1, 3, 7, 9, 1, 3, 7, 9];
  let num = [sum];
  for (let i = 0; i < 7; i++) {
    let n = Math.floor(Math.random() * 10);
    sum += n * weights[i + 1];
    num.push(n);
  }
  num.push(sum % 10);
  return num.join("") + "1-1";
}

function resetGenMedApp() {
  medAppComponent.style.display = "none";
  medAppDataContainer.style.display = "none";
  medAppDataContainer.innerHTML = "";
  medAppQuantity.value = "";
}



/* ====================================================
GENERATE PASSWORD APP
=====================================================*/
//Data
const smallCapsArray = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const capsArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const numbersArray = ["0","1","2","3","4","5","6","7","8","9"];
const specialArray = ["~","`","!","@","#","$","%","^","&","*","(",")","-","+","=","[","{","]","}",";",":",",","<",".",">","?"];
let passwordArray = [];

// Selectors
const numCharacters = document.querySelector(".pass-app__qty-selection-input");
const passAppGenerateButton = document.querySelector(
  ".pass-app__qty-selection-generate");
const passAppDataContainer = document.querySelector(".pass-app__data");
const smallCapsCheck = document.querySelector("#smallCaps");
const capsCheck = document.querySelector("#caps");
const numbersCheck = document.querySelector("#numbers");
const specialCheck = document.querySelector("#special");

// Event Listeners
passAppGenerateButton.addEventListener("click", generatePassword);

// Event Handlers
function generatePassword() {
  passAppDataContainer.innerHTML = "";
  if(validateCheckboxes() === false) {
    window.alert("JS ERROR: You need to select at least one character type to include in your password. Try again.");
    passAppDataContainer.style.display = "none";
    return;
  }
  const characters = numCharacters.value;
  if (characters < 1 || characters > 32) {
    window.alert("JS ERROR: The number of characters has to be between 1 and 32. Try again.");
    numCharacters.value = "";
    passAppDataContainer.style.display = "none";
    return;
  }
  passAppDataContainer.style.display = "block";
  assemblePasswordArray();
  let password = "";
  for (let index = 0; index < characters; index++) {
    password += passwordArray[getRandomInteger(1,passwordArray.length)];
  }
  const newP = document.createElement("p");
  const node = document.createTextNode(password);
  newP.appendChild(node);
  newP.className = "pass-app__data-string";
  passAppDataContainer.appendChild(newP);
  passwordArray = [];
}

// Functions
function assemblePasswordArray() {
  if (smallCapsCheck.checked) {
    smallCapsArray.forEach(element => {
      passwordArray.push(element);
    });
  }
  if (capsCheck.checked) {
    capsArray.forEach(element => {
      passwordArray.push(element);
    });
  }
  if (numbersCheck.checked) {
    numbersArray.forEach(element => {
      passwordArray.push(element);
    });
  }
  if (specialCheck.checked) {
    specialArray.forEach(element => {
      passwordArray.push(element);
    });
  }
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function validateCheckboxes () {
  if (
    smallCapsCheck.checked === false &&
    capsCheck.checked === false &&
    numbersCheck.checked === false &&
    specialCheck.checked === false
  ) {
    return false;
  }
}

function resetPassApp() {
  passComponent.style.display = "none";
  passAppDataContainer.style.display = "none";
  passAppDataContainer.innerHTML = "";
  numCharacters.value = "";
  smallCapsCheck.checked = true;
  capsCheck.checked = true;
  numbersCheck.checked = true;
  specialCheck.checked = true;
}