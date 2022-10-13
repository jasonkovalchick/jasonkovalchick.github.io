document.onload = onLoad();
            
function onLoad() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme == "true") {
        document.documentElement.setAttribute("data-theme", "dark");
        document.getElementById("darkmode-checkbox").checked=true;
        localStorage.setItem("theme","true")

    } else if (savedTheme == "false") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("darkmode-checkbox").checked=false;
        localStorage.setItem("theme","false");
    }

    const savedFont = localStorage.getItem("font-family");
    var r = document.querySelector(':root');
    if (savedFont == "serif") {
        r.style.setProperty('font-family', 'Lora, serif');

    }   else if (savedFont == "sans-serif") {
        r.style.setProperty('font-family', 'Ubuntu, sans-serif');

    }   else if (savedFont == "monospace") {
        r.style.setProperty('font-family', 'Roboto, monospace'); 
    }
    const fontSizeText = localStorage.getItem("font-size");
    var r = document.querySelector(':root');

    if (fontSizeText == "small") {
        r.style.fontSize = "75%";

    }   else if (fontSizeText == "normal") {
        r.style.fontSize = "100%";

    }   else if (fontSizeText == "large") {
        r.style.fontSize = "125%";
    }
};

    var menuOpen = false;

    document.addEventListener("DOMContentLoaded", function(event) {
    var settingsMenu = document.getElementById("settings-menu");
    settingsMenu.onclick = function() {

        // console.log(menuOpen);

        if (menuOpen === false) {

            document.getElementById("settings-cog").style.right = '';
            document.getElementById("settings-cog").setAttribute('aria-hidden', 'false');
            menuOpen = true;
            // console.log("menu is now open")

        } else {

            document.getElementById("settings-cog").style.right = "-1000px";
            document.getElementById("settings-cog").setAttribute('aria-hidden', 'true');
            menuOpen = false;
            // console.log("menu is now closed")
        }
    } 
 });


    document.addEventListener("DOMContentLoaded", function(event) {
    var darkmodeCheckbox = document.getElementById("darkmode-checkbox");
    darkmodeCheckbox.onclick = function() {
        
        const darkmodeState = localStorage.getItem("theme");

        if (darkmodeState == "true") {
            localStorage.setItem("theme","false")
            document.documentElement.setAttribute("data-theme", "light");
        }
        else {
            localStorage.setItem("theme","true")
            document.documentElement.setAttribute("data-theme", "dark");
        }
    } 
 });

    document.getElementById("font-select").onchange = function(){
    const fontValue = document.getElementById("font-select").value;
        // console.log(fontValue);
        var r = document.querySelector(':root');
        if (fontValue == 0) {

            r.style.setProperty('font-family', 'Lora, serif');
            localStorage.setItem("font-family","serif") 

        }   else if (fontValue == 1) {

            r.style.setProperty('font-family', 'Ubunutu, sans-serif');
            localStorage.setItem("font-family","sans-serif")  

        }   else if (fontValue == 2) {

            r.style.setProperty('font-family', 'Roboto, monospace'); 
            localStorage.setItem("font-family","monospace")
        }
    };

    document.getElementById("text-size-select").onchange = function(){
    const textSize = document.getElementById("text-size-select").value;
        // console.log(textSize);
        var r = document.querySelector(':root');
        if (textSize == 1) {

            r.style.fontSize = "75%";
            localStorage.setItem("font-size","small"); 

        }   else if (textSize == 0) {

            r.style.fontSize = "100%";
            localStorage.setItem("font-size","normal"); 

        }   else if (textSize == 2) {

            r.style.fontSize = "125%";
            localStorage.setItem("font-size","large"); 
        }
    };
