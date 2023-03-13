const request = new XMLHttpRequest();
const url = "http://realtime.catabus.com/InfoPoint/rest/stopdepartures/get/285";

request.open("GET", url, true);

request.onreadystatechange = function() {
  if (request.readyState === 4 && request.status === 200) {
    const xmlDoc = request.responseXML;
    const departures = xmlDoc.getElementsByTagName("Departure");

    const departureData = [];
    for (let i = 0; i < departures.length; i++) {
      const internalSignDesc = departures[i].getElementsByTagName("InternalSignDesc")[0].textContent;
      const ETA = departures[i].getElementsByTagName("ETA")[0].textContent;
      departureData.push({ InternalSignDesc: internalSignDesc, ETA: ETA });
    }
    console.log(departureData);
  }
};

request.send();













// fetch('http://realtime.catabus.com/InfoPoint/rest/stopdepartures/get/285')


// let jsondata;    
// fetch("http://realtime.catabus.com/InfoPoint/rest/stops/getallstops").then(
//         function(u){ return u.json();}
//       ).then(
//         function(json){
//           jsondata = json;
//         }
//       )


// fetch("http://realtime.catabus.com/InfoPoint/rest/stops/getallstops").then(
// function(u){ return u.json();}
// ).then(
// function(json){
// data_function(json); //calling and passing json to another function data_function
// })


// //another functions
// function data_function(data){
// // let obj = JSON.parse(json);
//     // console.log(obj)
// alert(data[0]); 
// }

// function data_function(obj) {
//     for(let k in obj) {
//         if(obj[k] instanceof Object) {
//             data_function(obj[k]);
//         } else {
//            console.log(obj[k]);
//         };
//     }
//   };

// function data_function(obj) {
//     console.log(Object.keys(obj[1])[1])
// } 
    


// var img = document.createElement("img");
// img.src = "assets/portfoliobg.png";

// var div = document.getElementById("x");
// div.appendChild(img);



  ////// works

//   fetch("http://realtime.catabus.com/InfoPoint/rest/stops/getallstops")
//   .then(response => response.text())
//   .then(data => {
//     const parser = new DOMParser();
//     const xml = parser.parseFromString(data, "text/html");

//     document.getElementById("demo").innerHTML =
//     xml.getElementsByTagName("body")[0].childNodes[0].nodeValue;

//     console.log(xml);
//   })
//   .catch(console.error);

  ////// works


// var text, parser, xmlDoc;

// text = "<bookstore><book>" +
// "<title>Everyday Italian</title>" +
// "<author>Giada De Laurentiis</author>" +
// "<year>2005</year>" +
// "</book></bookstore>";



// var text, parser, xmlDoc;

// text = "<bookstore><book>" +
// "<title>Everyday Italian</title>" +
// "<author>Giada De Laurentiis</author>" +
// "<year>2005</year>" +
// "</book></bookstore>";

// parser = new DOMParser();
// xmlDoc = parser.parseFromString(text,"text/xml");

// document.getElementById("demo").innerHTML =
// xmlDoc.getElementsByTagName("author")[0].childNodes[0].nodeValue;



// fetch('http://realtime.catabus.com/InfoPoint/rest/stopdepartures/get/285')
//     .then(function(data) {
//         parser = new DOMParser();
//         xmlDoc = parser.parseFromString(data,"text/xml");
//         document.getElementById("demo").innerHTML = xmlDoc.getElementsByTagName("Stop")[0].childNodes[0].nodeValue;
//     })
       
//     .then(function(data) {
//         console.log(data);
//     })

// document.getElementById("demo").innerHTML = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;





// document.getElementById("demo").innerHTML =
// xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;


// let xmlDoc = '';
// const parser = new DOMParser()

// let text = fetch('http://realtime.catabus.com/InfoPoint/rest/stops/getallstops')
// xmlDoc = parser.parseFromString(text,"text/xml");

    // .then(function(resp) {
    //     return resp.text();
    // })
    // .then(function(data) {
    //         xmlDoc = parser.parseFromString(data, 'text/xml');
    //     console.log(xmlDoc)
    // })
    
// let parser = new DOMParser();
    

// fetch('http://realtime.catabus.com/InfoPoint/rest/stops/getallstops')
//     .then(function(resp) {
//         return resp.text();
//     })
//     .then(function(data) {
//             // let parser = new DOMParser(),
//             // xml = parser.parseFromString(data, "text/xml");
//             // console.log(xml);
//         document.getElementById("demo").innerHTML =
//         xml.getElementsByTagName("title")[0].childNodes[0].nodeValue;
//     })


    

// fetch('http://realtime.catabus.com/InfoPoint/rest/stopdepartures/get/285')
//     .then(response => response.text())
//         .then((data) => {
//             let parser = new DOMParser(),
//             xml = parser.parseFromString(data, "text/xml");
//             console.log(xml);
//     });


// fetch('http://realtime.catabus.com/InfoPoint/rest/stopdepartures/get/285')
//     .then(function(resp) {
//         return resp.text();
//     })
//     .then(function(data) {
//         console.log(data);
//     })
