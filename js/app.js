// Selectors
const genMedNumButton = document.querySelector(".button_genMedNum");
const medAppComponent = document.querySelector(".med-app");
const medAppQuantity = document.querySelector(".app__qty-selection-input");
const medAppGenerateButton = document.querySelector(
  ".app__qty-selection-generate"
);
const medAppDataContainer = document.querySelector(".med-app__data");

// Event Listeners
genMedNumButton.addEventListener("click", displayGenMedNumApp);
medAppGenerateButton.addEventListener("click", generateMedicareNumbers);

// Event Handlers
function displayGenMedNumApp() {
  medAppComponent.style.display = "block";
}

function generateMedicareNumbers() {
  medAppDataContainer.innerHTML = "";
  const quantity = medAppQuantity.value;
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
