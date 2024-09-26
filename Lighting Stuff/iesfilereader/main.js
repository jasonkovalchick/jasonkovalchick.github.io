import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

const form = document.querySelector('form');
const fileInput = document.querySelector('#file-input');
let fileName = '';
let oldFileName = 'undefined';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const file = fileInput.files[0];
  const reader = new FileReader();
  fileName = file.name;


  reader.onload = () => {
    const fileContents = reader.result;
    localStorage.setItem('fileContents', fileContents);

	console.log('oldfilename'+oldFileName,' newfile' + fileName);

	// check if the file needs parsed again
	if (oldFileName !== fileName) {
		parseFile(fileContents);
	} else {
		if (oldFileName === 'undefined'){
			parseFile(fileContents);
		} else {
		}
	}
	oldFileName = fileName;

	setupScene();
  };

  reader.readAsText(file);

});

function setupScene() {


// scene params
const scene = new THREE.Scene();

const viewer = document.getElementById("3d-viewer");
viewer.innerHTML = '';

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(viewer.offsetWidth, viewer.offsetHeight);
viewer.appendChild(renderer.domElement);

// console.log(viewer.offsetWidth, viewer.offsetHeight);

// init camera
const camera = new THREE.PerspectiveCamera( 65, viewer.offsetWidth / viewer.offsetHeight, 1, 10000 );
scene.add(camera);

//set camera position
camera.position.set(30,30,30);

const controls = new OrbitControls( camera, renderer.domElement );


// create the text for the axis
const loader = new FontLoader();

loader.load('helvetiker_regular.typeface.json', function ( font ) {

	const xText = new TextGeometry( 'X', {
		font: font,
		size: 1,
		height: 0,
	} );

	const xMaterialText = new THREE.MeshBasicMaterial( { color: "#ff0000", } );
	const xTextMesh = new THREE.Mesh( xText, xMaterialText );
	xTextMesh.position.set(5,-0.5,0)
	scene.add(xTextMesh);

	const yText = new TextGeometry( 'Y', {
		font: font,
		size: 1,
		height: 0,
	} );

	const yMaterialText = new THREE.MeshBasicMaterial( { color: "#0000ff", } );
	const yTextMesh = new THREE.Mesh( yText, yMaterialText );
	yTextMesh.position.set(0,-0.5,5.8)
	yTextMesh.rotateY(1.57)
	scene.add(yTextMesh);

	const zText = new TextGeometry( 'Z', {
		font: font,
		size: 1,
		height: 0,
	} );
	
	const zMaterialText = new THREE.MeshBasicMaterial( { color: "#00ff00", } );
	const zTextMesh = new THREE.Mesh( zText, zMaterialText );
	zTextMesh.position.set(-0.5,5,0)
	scene.add(zTextMesh);

} );

// create the spheres for the positive axis directions and add them to the scene
const xAxis = new THREE.SphereGeometry(0.5, 64, 64);
const xAxisMat = new THREE.MeshBasicMaterial( { color: "#ff0000", } );
const xAxisMesh = new THREE.Mesh( xAxis, xAxisMat );
xAxisMesh.position.set(4,0,0);
scene.add(xAxisMesh);

const yAxis = new THREE.SphereGeometry(0.5, 64, 64);
const yAxisMat = new THREE.MeshBasicMaterial( { color: "#00ff00", } );
const yAxisMesh = new THREE.Mesh( yAxis, yAxisMat );
yAxisMesh.position.set(0,4,0);
scene.add(yAxisMesh);

const zAxis = new THREE.SphereGeometry(0.5, 64, 64);
const zAxisMat = new THREE.MeshBasicMaterial( { color: "#0000ff", } );
const zAxisMesh = new THREE.Mesh( zAxis, zAxisMat );
zAxisMesh.position.set(0,0,-4);
scene.add(zAxisMesh);

// create materials for the lines horizonatal and vertical
const lineMatVert = new THREE.LineBasicMaterial( { color: 0xaaff00 } );
const lineMatHort = new THREE.LineBasicMaterial( { color: 0x00ffff } );

// init arrays for points
let pointsVertical = [];
let pointsHorizontal = [];


let i = 0;
// create vertical points array
for (i in cartesianCandelaTable) { // creates the vertical lines
	pointsVertical.push(new THREE.Vector3(cartesianCandelaTable[i][0]/100,cartesianCandelaTable[i][2]/100,cartesianCandelaTable[i][1]/100));
}

// create horizontal points array
let skipInt = 0;
i = 0;
let j = 0;
let value = 0;
for (i = 0; i < verticalAngles.length; i++) {
	j = 0;
	while ((parseInt(i) + parseInt(j * verticalAngles.length)) < parseInt(sphericalCandelaTable.length)) {

		value = (parseInt(i) + parseInt(j * verticalAngles.length))
		pointsHorizontal.push(new THREE.Vector3(cartesianCandelaTable[value][0]/100,cartesianCandelaTable[value][2]/100,cartesianCandelaTable[value][1]/100));

		j += 1;
	}
	i += skipInt;
}

// add vertical and horizontal lines to the scene
const lineVert = new THREE.BufferGeometry().setFromPoints( pointsVertical );
const linesVertical = new THREE.Line( lineVert, lineMatVert );
scene.add(linesVertical);

const lineHort = new THREE.BufferGeometry().setFromPoints( pointsHorizontal );
const linesHorizontal = new THREE.Line( lineHort, lineMatHort );
scene.add(linesHorizontal);

// also scene to be updated with OrbitControls
controls.update();

// start scene and continue updating it
function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );

}

animate();

};
