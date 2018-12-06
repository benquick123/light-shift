var object = new THREE.Object3D();
var colors = [0xFFFF00, 0x00CC00, 0x0000FF, 0xFF0000, 0x9933FF];
var initPoints = 0;

function loadShapes(fileNum) {
	object.position.set(0, -4.5, 0);
	object.visible = false;
	
	var loadObject = function(objects) {
		var manager = new THREE.LoadingManager();
		manager.onLoad = function () {
			calculateDistances();
			initPoints = ((blocks.children.length * 20) - distSum)*10 + ((blocks.children.length * Math.sqrt(2)) - volSum)*10;
		};
		
		var loader1 = new THREE.OBJLoader(manager);
		for (var i = 0; i < objects.children.length; i++) {
			var child = objects.children[i];
			var material = new THREE.MeshLambertMaterial( { ambient: 0xffffff, specular: 0xffffff, color: 0xffffff, transparent: true } );
			material.opacity = 0.5;
			var geometry = child.geometry;
			
			var shape = new THREE.Mesh(geometry, material);
			shape.name = child.name;
			shape.castShadow = true;

			shape.boundingBox = calculateBoundingBox(shape);
			loader1.load("objects/shapes/" + shape.name.split(".")[0] + ".obj", loadBlock);
			
			object.add(shape);	
		}
	}
	
	var loadBlock = function(objects) {
		var select_color = colors[Math.floor(Math.random() * colors.length)];
		var material = new THREE.MeshLambertMaterial( { ambient: select_color, specular: select_color, color: select_color } );
		var geometry = objects.children[0].geometry;
		
		var shape = new THREE.Mesh(geometry, material);
		shape.name = objects.children[0].name;
		shape.castShadow = true;
		shape.receiveShadow = false;
		
		shape.boundingBox = calculateBoundingBox(shape);

		shape.position.x = Math.random()*32 - 16;
		shape.position.z = Math.random()*32 - 16;
		shape.position.y = Math.random()*4 - 2;

		shape.rotation.x = Math.floor(Math.random()*4) * Math.PI/2;
		shape.rotation.z = Math.floor(Math.random()*4) * Math.PI/2;
		shape.rotation.y = Math.floor(Math.random()*4) * Math.PI/2;

		blocks.add(shape);
	}
	
	var loader = new THREE.OBJLoader();
	loader.load("objects/" + fileNum + ".obj", loadObject);

	scene.add(object);
	scene.add(blocks);
}

function calculateBoundingBox(shape) {
	var bbox = new THREE.Box3().setFromObject(shape);
	var pos = shape.position;
	var min = new THREE.Vector3();
	var max = new THREE.Vector3();
	
	min.x = bbox.min.x - pos.x;
	min.y = bbox.min.y - pos.y;
	min.z = bbox.min.z - pos.z;
	max.x = bbox.max.x - pos.x;
	max.y = bbox.max.y - pos.y;
	max.z = bbox.max.z - pos.z;
	
	//console.log(min.x + ", " + min.y + ", " + min.z + ", " + max.x + ", " + max.y + ", " + max.z);
	return [min, max];
}