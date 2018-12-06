function init(){
	var lastTime = 0;
	var rotateSpeed = 1;
	var xSpeed = 0;
	var ySpeed = 0;
	var camYaw = 0;
	var camPitch = 0;
	var entry = {x:-1,y:-1};
	var canvas = document.getElementById('myCanvas');
	var ctx = c.getContext('2d');

	var currentlyPressedKeys = {};
	document.addEventListener('keyup', handleKeyUp , false);
	document.addEventListener('keydown', handleKeyDown , false);
	document.addEventListener('mousemove', handleMouseMove , false);
	document.addEventListener('pointerlockchange', changeCallback, false);
	document.addEventListener('mozpointerlockchange', changeCallback, false);
	document.addEventListener('webkitpointerlockchange', changeCallback, false);

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	game();
}