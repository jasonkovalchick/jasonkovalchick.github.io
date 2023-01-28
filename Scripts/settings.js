document.onload = onLoad();

function onLoad() {

    let ConvertStringToHTML = function (str) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(str, 'text/html');
        return doc.body;
     };

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

    const savedTheme = localStorage.getItem("theme");
    var r = document.querySelector(':root');

    if (savedTheme == "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme","dark");
    } else if (savedTheme == "light") {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme","light");
    } else if (savedTheme == "sepia") {
        document.documentElement.setAttribute("data-theme", "sepia");
        localStorage.setItem("theme","sepia");
    }

    const savedFont = localStorage.getItem("font-family");

    if (savedFont == "serif") {
        r.style.setProperty('font-family', 'Lora, serif');

    }   else if (savedFont == "sans-serif") {
        r.style.setProperty('font-family', 'Ubuntu, sans-serif');

    }   else if (savedFont == "monospace") {
        r.style.setProperty('font-family', 'Roboto, monospace'); 
    }
    const fontSizeText = localStorage.getItem("font-size");

    if (fontSizeText == "small") {
        r.style.fontSize = "75%";

    }   else if (fontSizeText == "normal") {
        r.style.fontSize = "100%";

    }   else if (fontSizeText == "large") {
        r.style.fontSize = "125%";
    }

    const pageWidth = localStorage.getItem("page-width");
    let isMobile = window.matchMedia("only screen and (max-width: 480px)").matches;
    console.log(isMobile);

    if (isMobile == "true") {
        if (pageWidth == "small") {
            r.style.setProperty("--moblie-desktop-width",'10%');

        }   else if (pageWidth == "normal") {
            r.style.setProperty("--moblie-desktop-width",'17.5%');

        }   else if (pageWidth == "large") {
            r.style.setProperty("--moblie-desktop-width",'25%');
        }

    }
};
//     var menuOpen = false;

//     document.addEventListener("DOMContentLoaded", function(event) {
//     var settingsMenu = document.getElementById("settings-cog");
//     settingsMenu.onclick = function() {

//         // console.log(menuOpen);

//         if (menuOpen === false) {

//             document.getElementById("settings-menu").style.visibility = 'visible';
//             document.getElementById("settings-menu").setAttribute('aria-hidden', 'false');
//             menuOpen = true;
//             // console.log("menu is now open")

//         } else {

//             document.getElementById("settings-menu").style.visibility = 'hidden';
//             document.getElementById("settings-menu").setAttribute('aria-hidden', 'true');
//             menuOpen = false;
//             // console.log("menu is now closed")
//         }
//     } 
//  });

var menuOpen = false;

function openMenu() {
    if (menuOpen === false) {
        document.getElementById("settings-menu").style.visibility = 'visible';
        document.getElementById("settings-menu").setAttribute('aria-hidden', 'false');
        menuOpen = true;        
    } else {

        document.getElementById("settings-menu").style.visibility = 'hidden';
        document.getElementById("settings-menu").setAttribute('aria-hidden', 'true');
        menuOpen = false;
        // console.log("menu is now closed")
    }
}



var r = document.documentElement;

function themeSelect(value) {
    // console.log("is running")
    if (value == 1) {
        localStorage.setItem("theme","dark")
        document.documentElement.setAttribute("data-theme", "dark");
    } else if (value == 0) {
        localStorage.setItem("theme","light")
        document.documentElement.setAttribute("data-theme", "light");
    } else if (value == 2) {
        localStorage.setItem("theme","sepia")
        document.documentElement.setAttribute("data-theme", "sepia");
    }
}

function fontSelect(value) {
    // console.log(getElementById("root"));
    // var r = document.documentElement;
    if (value == 0) {
        r.style.setProperty('font-family', 'Lora, serif');
        localStorage.setItem("font-family","serif") 
    }   else if (value == 1) {
        r.style.setProperty('font-family', 'Ubunutu, sans-serif');
        localStorage.setItem("font-family","sans-serif")  
    }   else if (value == 2) {
        r.style.setProperty('font-family', 'Roboto, monospace'); 
        localStorage.setItem("font-family","monospace")
    }
}

function fontSizeSelect(value) {
    // var r = document.documentElement;
    if (value == 1) {
        r.style.fontSize = "75%";
        localStorage.setItem("font-size","small"); 
    }   else if (value == 0) {
        r.style.fontSize = "100%";
        localStorage.setItem("font-size","normal"); 
    }   else if (value == 2) {
        r.style.fontSize = "125%";
        localStorage.setItem("font-size","large"); 
    }
}

function pageWidthSelect(value) {
    // var r = document.documentElement;
    if (value == 1) {
        r.style.setProperty("--moblie-desktop-width","10%");
        localStorage.setItem("page-width","small"); 
    }   else if (value == 0) {
        r.style.setProperty("--moblie-desktop-width","17.5%");
        localStorage.setItem("page-width","normal"); 
    }   else if (value == 2) {
        r.style.setProperty("--moblie-desktop-width",'25%');
        localStorage.setItem("page-width","large"); 
    }
}

function copyToClip() {

    let url = window.location.href;
    navigator.clipboard.writeText(url);

    let button = document.getElementById("copy-to-clip");

};

function openToTwitter() {
    let url = window.location.href;
    let title = document.getElementById("post-title").textContent;

    window.open("https://twitter.com/intent/tweet?text="+title+"&url="+url, '_blank').focus();
}