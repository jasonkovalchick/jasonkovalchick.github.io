let luminaireDetails = {};
let verticalAngles = [];
let horizontalAngles = [];
let candelaTable = [];

let sphericalCandelaTable = [];
let cartesianCandelaTable = [];

function parseFile(contents) {

    luminaireDetails = {};
    verticalAngles = [];
    horizontalAngles = [];
    candelaTable = [];
    
    sphericalCandelaTable = [];
    cartesianCandelaTable = [];
    


    const regex = /\[(.+?)\]\s*(.*)/g; // takes all the items in brackets and splits that from what comes after the bracket
    let matches;
    
    let lineNum = 1; // set the line number to be 1 since the first line is the IESNA designation
    
    const lines = contents.split('\n');

    luminaireDetails['IESNA'] = lines[0].split(/[:\r]/)[1];

    // put all the [] items and their values in a dictionary
    while ((matches = regex.exec(contents)) !== null) {
      const key = matches[1];
      const value = matches[2];
      luminaireDetails[key] = value;

      lineNum += 1;
    }

    // check if their is include or not, here to manage number of lines to skip
    if (lines[lineNum].includes('INCLUDE')) {
        lineNum += 4;

    } else {
        lineNum +=1;
    }

    // add these values to overall dictionary
    let values = lines[lineNum].trim().split(' ');

    luminaireDetails['number of lamps'] = Number(values[0]);
    luminaireDetails['lumens per lamp'] = Number(values[1]);
    luminaireDetails['candela multiplier'] = Number(values[2]);
    luminaireDetails['number of vertical angles'] = Number(values[3]);
    luminaireDetails['number of horizontal angles'] = Number(values[4]);
    luminaireDetails['photometric type'] = Number(values[5]);
    luminaireDetails['units type'] = Number(values[6]);
    luminaireDetails['width'] = Number(values[7]);
    luminaireDetails['length'] = Number(values[9]);
    luminaireDetails['height'] = Number(values[9]);

    lineNum += 1;

    // add these values to overall dictionary
    values = lines[lineNum].trim().split(' ');

    luminaireDetails['ballast factor'] = Number(values[0]);
    luminaireDetails['future use'] = Number(values[1]);
    luminaireDetails['input watts'] = Number(values[2]);

    lineNum += 1;

    const vertCount = luminaireDetails['number of vertical angles'];
    const hortCount = luminaireDetails['number of horizontal angles'];


    // add vertical angles to array
    let vertOneLine = lines[lineNum].trim().split(" ").map(Number).length;

    while (vertOneLine < vertCount+1) {
        verticalAngles = verticalAngles.concat(lines[lineNum].trim().split(" ").map(Number));
        vertOneLine += lines[lineNum+1].trim().split(" ").map(Number).length;
        lineNum += 1;
    }

    // add horizontal angles to array
    let hortOneLine = lines[lineNum].trim().split(" ").map(Number).length; 

    while (hortOneLine < hortCount+1) {
        horizontalAngles = horizontalAngles.concat(lines[lineNum].trim().split(" ").map(Number));
        hortOneLine += lines[lineNum+1].trim().split(" ").map(Number).length;
        lineNum += 1;
    }


    // create array of arrays for candela table
    let j = 0;
    for (i = 0; i < hortCount; i++) {

        let candelaOneLine = lines[lineNum].trim().split(" ").map(Number).length;

        candelaTable[[j]] = [];

        while (candelaOneLine < vertCount+1) {

            candelaTable[[j]] = candelaTable[[j]].concat(lines[lineNum].trim().split(" ").map(Number));

            candelaOneLine += lines[lineNum].trim().split(" ").map(Number).length;

            lineNum += 1;
        }

        j += 1;
    }


candelaTable = [0,1,2,3,4,5,6,7,8];

console.log(horizontalAngles);
console.log(candelaTable);

const lastHorizontalAngle = horizontalAngles.pop();
    if (luminaireDetails['photometric type'] == 1) { 
    // type C photometry
    // if only one horizontal angle and if it is 0 it is completely symmetrical
    // if angles go from 0 to 90, then it is quadrilateral symmetrical
    // if angles go from 0 to 180, then it is symmetrical about the plane
    // if angles go from 0 to 360, then no special symmetry
    
        if (lastHorizontalAngle == 90) {
            for (i=1; i < 3; i++) {
                i = 90*i;
                let j = 0;
                while (j < hortCount) {
                    horizontalAngles.push(horizontalAngles[j]+i);
                    candelaTable.push(candelaTable[[j]])
                    j += 1;
                }
            }

        } 
        
        if (lastHorizontalAngle == 180) {
            console.log('hit')
                let i = 180;
                let j = 0;
                while (j < hortCount) {
                    horizontalAngles.push(horizontalAngles[j]+i);
                    candelaTable.push(candelaTable[[j]])
                    j += 1;
                }
            }
        } 
        
        if (lastHorizontalAngle == 360) {
            // do nothing because no special symmetry

        } else { // type A, B photometry
        // if angles go from 0 to 90, then refect across a vertical reference plane
        // if angles go from -90 to 90, then no special symmetry and exists just in those two quadrants

    }


console.log(horizontalAngles)
console.log(candelaTable)




    // put horizonal, vertical, and candela into one array, [hort, vert, candela]
    for (i=0; i < hortCount; i++) {
        for (j=0; j < vertCount; j++) {

        sphericalCandelaTable.push([horizontalAngles[i],verticalAngles[j],candelaTable[i][j]*luminaireDetails['candela multiplier']]);
        }
    }

    // convert the sphereicalCandelaTable to cartesianCandelaTable [x,y,z]
    for (i=0; i < sphericalCandelaTable.length; i++) {

        let r = sphericalCandelaTable[i][2];
        let hortAngle = sphericalCandelaTable[i][0]*(0.01745329251); // convert horizontal angle to radians
        let vertAngle = sphericalCandelaTable[i][1]*(0.01745329251); // convert vertical angle to radians

        let x = r * Math.sin(vertAngle) * Math.cos(hortAngle);
        let y = r * Math.sin(vertAngle) * Math.sin(hortAngle);
        let z = r * Math.cos(vertAngle);

        cartesianCandelaTable[i] = [Number(x),Number(y),Number(z)]
        // console.log(cartesianCandelaTable);
    }
        // console.log(cartesianCandelaTable);

        const tableBody = document.getElementById('lum-table');
        tableBody.innerHTML = '';
        for (const [key, value] of Object.entries(luminaireDetails)) {
          const row = document.createElement('tr');
          const keyCell = document.createElement('td');
          keyCell.textContent = key;
          const valueCell = document.createElement('td');
          valueCell.textContent = value;
          row.appendChild(keyCell);
          row.appendChild(valueCell);
          tableBody.appendChild(row);
        }

    return cartesianCandelaTable;
};


