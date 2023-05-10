
const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const bodyRef = document.querySelector("body");
let timerId = null;


 

function onBtnColorChange() {
  const color = getRandomHexColor();
  bodyRef.style.backgroundColor = color;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startBtn.addEventListener("click", () => {
    startBtn.disabled = true
    timerId = setInterval(() => onBtnColorChange(), 1000);
    
});


stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  startBtn.disabled = false
});