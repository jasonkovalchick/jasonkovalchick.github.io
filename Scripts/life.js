const colorSolver = document.getElementById("colorSolver");
const background = document.getElementById("background");
const hex = document.getElementById("hex");
const menuInput = document.getElementById("items");

function findColor() {
    let today = new Date()
    let serialDate = document.getElementById("dateInput").value;

    let todayDate = Date.parse(today)-Date.parse(serialDate);
    let deathDate = (80*3.15576e10);

    let hexColor = Math.round((todayDate/deathDate)*(16777215)).toString(16);

    background.style.backgroundColor = `#${hexColor}`;

    menuInput.style.zIndex = "-2";
    hex.innerHTML = `#${hexColor}`;

    console.log(hexColor);
}


colorSolver.addEventListener("click",findColor);

setInterval(findColor,60000);