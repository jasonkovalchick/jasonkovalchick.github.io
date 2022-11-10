let ConvertStringToHTML = function (str) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, 'text/html');
    return doc.body;
 };

document.onload = onLoad();
            
function onLoad() {

fetch("/blog/extraheader.txt")
.then(response => response.text())
.then((extraBox) => {

    newExtraBox = ConvertStringToHTML(extraBox);

    var oldExtraBox = document.getElementById('extra-box');

    // console.log(oldExtraBox);
    oldExtraBox.innerHTML = newExtraBox.innerHTML;

    // console.log(extraBox);  
})

fetch("/blog/settings-menu.txt")
.then(response => response.text())
.then((settingsMenu) => {

    newSettingsMenu = ConvertStringToHTML(settingsMenu);

    var oldSettingsMenu = document.getElementById('settings-menu');

    // console.log(oldExtraBox);
    oldSettingsMenu.innerHTML = newSettingsMenu.innerHTML;

    // console.log(oldSettingsMenu);  

    // document.getElementById('settings-menu').appendChild(newSettingsMenu);

    // document.getElementById('settings-menu').innerHTML = newSettingsMenu;

    // console.log(document.getElementById('settings-menu').innerHTML);

})

};






