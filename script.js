let currentInput = "";
let history = "";
let memory = 0;
let isDeg = true;

const display = document.getElementById("display");
const historyDisplay = document.getElementById("history");
const degRadBtn = document.getElementById("degRad");

function updateDisplay() {
  display.textContent = currentInput || "0";
  historyDisplay.textContent = history;
}

function input(val) {
  currentInput += val;
  updateDisplay();
}

function clearAll() {
  currentInput = "";
  history = "";
  updateDisplay();
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function plusMinus() {
  if (currentInput.startsWith("-")) currentInput = currentInput.slice(1);
  else currentInput = "-" + currentInput;
  updateDisplay();
}

function factorial() {
  let num = parseFloat(currentInput);
  if (num < 0) return;
  let result = 1;
  for (let i = 2; i <= num; i++) result *= i;
  currentInput = result.toString();
  updateDisplay();
}

function sqrt() {
  currentInput = Math.sqrt(parseFloat(currentInput)).toString();
  updateDisplay();
}

function reciprocal() {
  currentInput = (1 / parseFloat(currentInput)).toString();
  updateDisplay();
}

function absValue() {
  currentInput = Math.abs(parseFloat(currentInput)).toString();
  updateDisplay();
}

function exp() {
  currentInput = Math.exp(parseFloat(currentInput)).toString();
  updateDisplay();
}

function log10() {
  currentInput = Math.log10(parseFloat(currentInput)).toString();
  updateDisplay();
}

function logE() {
  currentInput = Math.log(parseFloat(currentInput)).toString();
  updateDisplay();
}

function power() {
  currentInput += "**";
  updateDisplay();
}

function tenPower() {
  currentInput = Math.pow(10, parseFloat(currentInput)).toString();
  updateDisplay();
}

function mod() {
  currentInput += "%";
  updateDisplay();
}

function calculate() {
  try {
    history = currentInput;
    currentInput = eval(currentInput.replace(/π/g, Math.PI).replace(/e/g, Math.E)).toString();
  } catch {
    currentInput = "Erreur";
  }
  updateDisplay();
}

// DEG/RAD toggle
degRadBtn.onclick = () => {
  isDeg = !isDeg;
  degRadBtn.textContent = isDeg ? "DEG" : "RAD";
};

// Mémoire
function clearMemory() { memory = 0; }
function recallMemory() { currentInput = memory.toString(); updateDisplay(); }
function addMemory() { memory += parseFloat(currentInput) || 0; }
function subtractMemory() { memory -= parseFloat(currentInput) || 0; }
function storeMemory() { memory = parseFloat(currentInput) || 0; }
