// Selectors
const genMedNumButton = document.querySelector(".button_genMedNum");
const genPassButton = document.querySelector(".button_genPass");
const genTestPatButton = document.querySelector(".button_genTestPat");
const medAppComponent = document.querySelector(".med-app");
const passComponent = document.querySelector(".pass-app");
const testPatComponent = document.querySelector(".test-pat-app");
const medAppQuantity = document.querySelector(".app__qty-selection-input");
const medAppGenerateButton = document.querySelector(
  ".app__qty-selection-generate"
);
const medAppDataContainer = document.querySelector(".med-app__data");

// Event Listeners
genMedNumButton.addEventListener("click", displayGenMedNumApp);
genPassButton.addEventListener("click", displayPassApp);
genTestPatButton.addEventListener("click", displayTestPatApp);
medAppGenerateButton.addEventListener("click", generateMedicareNumbers);

// Event Handlers
function displayGenMedNumApp() {
  medAppComponent.style.display = "block";
  genMedNumButton.classList.add("menu__button--active");
  passComponent.style.display = "none";
  genPassButton.classList.remove("menu__button--active");
  testPatComponent.style.display = "none";
  genTestPatButton.classList.remove("menu__button--active");
}

function displayPassApp() {
  medAppComponent.style.display = "none";
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

function generateMedicareNumbers() {
  medAppDataContainer.innerHTML = "";
  const quantity = medAppQuantity.value;
  if (quantity < 1 || quantity > 100) {
    window.alert("JS ERROR: The number has to be between 1 and 100. Try again.");
    medAppQuantity.value = "";
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