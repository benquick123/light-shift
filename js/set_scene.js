function set_scene() {

	var geometry = new THREE.BoxGeometry( 3, 3, 3 );
	var cube;
	var material;

    for (var i=0;i<10;i++){
    	material = new THREE.MeshLambertMaterial( { color: 0x00ffff } );
    	cube = new THREE.Mesh( geometry, material );
    	cube.position.x = -16 + Math.random() *32;
    	cube.position.z = -16 + Math.random() *32;

    	cube.rotation.x = Math.random() * 20;
    	cube.rotation.y = Math.random() * 20;
        cube.castShadow = true;
        cube.receiveShadow = false;
    	cube.name ="cube"+i;
    	cube.isManipulated = false;
    	cube.isSelected = false;
		blocks.add (cube);
    }


	scene.add( blocks );
};