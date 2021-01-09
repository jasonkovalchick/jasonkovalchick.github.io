const colorSolver = document.getElementById("colorSolver");
const background = document.getElementById("background");
const hex = document.getElementById("hex");

function findColor() {
    let serialDate = document.getElementById("dateInput").value;
    let today = new Date()

    let todayDate = Date.parse(today)-Date.parse(serialDate);
    let deathDate = (80*3.15576e10);

    let hexColor = Math.round((todayDate/deathDate)*(16777215)).toString(16);

    background.style.backgroundColor = `#${hexColor}`;

    var menuItems = document.getElementsByClassName("items");
    menuItems[0].parentNode.removeChild(menuItems[0]);

    hex.innerHTML = `#${hexColor}`;

    console.log(hexColor);
}


colorSolver.addEventListener("click",findColor);

setInterval(findColor,60000);