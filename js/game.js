//   			init
var lastTime = 0;
var rotateSpeed = 1;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var moveSpeed = 0.012;
var activeIntersect = false;
var activeManipulation = false;
var spinX = false;
var spinY = false;
var spinZ = false;
var currentIntersected;
var light = true;
var changeLight = false;
var spinDir = 1;
var fineAdjustment = 1;
var lightCube; 
var velocity = new THREE.Vector3();
var planes = new THREE.Object3D();
var blocks = new THREE.Object3D();
var SumRadYaw = 0;
var lightWallMaterial = materialFromTexture('textures/light-tile-texture.jpg', 18, 5, 0x555555);
var lightFloorMaterial = materialFromTexture('textures/light-tile-texture.jpg', 18, 18);
var darkWallMaterial = materialFromTexture('textures/dark2-tile-texture.jpg', 18, 5, 0x555555);
var darkFloorMaterial = materialFromTexture('textures/dark2-tile-texture.jpg', 18, 18);
document.getElementById('crosshair').style.display = 'none';
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.001, 1000 );
var raycaster = new THREE.Raycaster();
var conEnable = false;
var element = document.body;

var soundEnabled = true;
var soundOn = new Audio("soundEffects/lightOn.wav");
var soundOff = new Audio("soundEffects/lightOff.wav");
var lock = new Audio("soundEffects/lock.wav");
var release = new Audio("soundEffects/release.wav");

var menu = true;
var mode = ""

var time = 0; 
var countTime = 0;
var counter;

function timer() {
	//console.log(countTime);
	countTime=countTime-0.01;
	document.getElementById("progressBar").setAttribute("style", "width:" + ((20*countTime)/time) + "vw;");
	if (countTime <= 0) {
		clearInterval(counter);
		finalMenu();
		return;
	}
}

var pitchObject = new THREE.Object3D();
pitchObject.add( camera );

var yawObject = new THREE.Object3D();
yawObject.add( pitchObject );
scene.add( yawObject);

var renderer = new THREE.WebGLRenderer(/*{antialias: true}*/);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//   			controls init
document.addEventListener( 'mousemove', onMouseMove, false );
document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );
window.addEventListener( 'resize', onWindowResize, false );

renderer.shadowMapEnabled = true;
// 			starting camera position
yawObject.position.set(0,0,18);
	
setupEnviroment();
animate();

function pointLockerManager(){
	if ( 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document ) {
		document.addEventListener( 'pointerlockchange', pointerlockchange, false );
		document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
		document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
		document.addEventListener( 'click', clickProcess, false );
		document.addEventListener( 'mousewheel', mouseWheelHandler, false);
	}
}