function setupEnviroment() {
	var plane, wallGeometry, floorGeometry;
    

	wallGeometry = new THREE.PlaneBufferGeometry(40, 9);
	floorGeometry = new THREE.PlaneBufferGeometry(40, 40);
	
	plane = new THREE.Mesh(wallGeometry, lightWallMaterial);
	plane.position.z = -20;
	plane.receiveShadow = true;
	planes.add(plane);

	plane = new THREE.Mesh(wallGeometry, lightWallMaterial);
	plane.position.z = 20;
	plane.rotation.y = Math.PI;
	plane.receiveShadow = true;
	planes.add(plane);

	plane = new THREE.Mesh(wallGeometry, lightWallMaterial);
	plane.position.x = 20;
	plane.rotation.y = -Math.PI/2;
	plane.receiveShadow = true;
	planes.add(plane);

	plane = new THREE.Mesh(wallGeometry, lightWallMaterial);
	plane.position.x = -20;
	plane.rotation.y = Math.PI/2;
	plane.receiveShadow = true;
	planes.add(plane);

	plane = new THREE.Mesh(floorGeometry, lightFloorMaterial);
	plane.position.y = -4.5;
	plane.rotation.x = -Math.PI/2;
	plane.receiveShadow = true;
	planes.add(plane);

	plane = new THREE.Mesh(floorGeometry, lightFloorMaterial);
	plane.position.y = 4.5;
	plane.rotation.x = Math.PI/2;
	plane.receiveShadow = true;
	planes.add(plane);
	scene.add(planes);

	var light = new THREE.AmbientLight(0x404040);
	scene.add(light);
	/*
	light = new THREE.DirectionalLight( 0x808080, 0.5 );
	light.position.set(20, 4.5, -20);
	scene.add(light );
	*/
	light = new THREE.PointLight( 0x808080, 0.5 );
	light.position.set(0,0,0);
	scene.add(light );

	light = new THREE.SpotLight(0x010101, 60, 50);
	light.position.set(0, 5.5, 20);
	//light.castShadow = true;
	light.shadowCameraNear = 1;
	light.shadowCameraFar = camera.far;
	light.shadowCameraFov = 100;
	scene.add(light);

	light = new THREE.SpotLight(0x010101, 60, 50);
	light.position.set(20, 5.5, 0);
	//light.castShadow = true;
	light.shadowCameraNear = 1;
	light.shadowCameraFar = camera.far;
	light.shadowCameraFov = 100;
	scene.add(light);

	light = new THREE.SpotLight(0x010101, 60, 50);
	light.position.set(0, 5.5, -20);
	//light.castShadow = true;
	light.shadowCameraNear = 1;
	light.shadowCameraFar = camera.far;
	light.shadowCameraFov = 100;
	scene.add(light);

	light = new THREE.SpotLight(0x010101, 60, 50);
	light.position.set(-20, 5.5, 0);
	//light.castShadow = true;
	light.shadowCameraNear = 1;
	light.shadowCameraFar = camera.far;
	light.shadowCameraFov = 100;
	scene.add(light);

	light = new THREE.SpotLight(0x010101, 60, 50);
	light.position.set(0, 8, 0);
	light.castShadow = true;
	light.shadowCameraNear = 1;
	light.shadowCameraFar = camera.far;
	light.shadowCameraFov = 150;
	scene.add(light);

	light = new THREE.SpotLight(0x030303, 60, 50);
	light.position.set(0, -0.1, 0);
	light.castShadow = false;
	scene.add(light);

	var geometry = new THREE.BoxGeometry( 2, 0.5, 1 );
    material = new THREE.MeshBasicMaterial( { color: 0xeeeeee } );
    lightCube = new THREE.Mesh( geometry, material );
    lightCube.position.x = 0;
    lightCube.position.z = 0;
    lightCube.position.y = 4.25;
    scene.add (lightCube);
}



function materialFromTexture(image, repX, repY, color) {
	var texture = THREE.ImageUtils.loadTexture(image);
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(repX, repY);

	return new THREE.MeshPhongMaterial({map: texture, shiness: 100, ambient: color});
}