function animate() {

	requestAnimationFrame( animate );
	var timeNow = new Date().getTime();
  	if (lastTime != 0) {
	    var elapsed = timeNow - lastTime;
	    

	    if (conEnable){				// kontrole kamere
			delta = elapsed * 0.1;
			var cameraOldX = yawObject.position.x;
			var cameraOldZ = yawObject.position.z;


			velocity.x += ( - velocity.x ) * 0.08 * delta;
			velocity.z += ( - velocity.z ) * 0.08 * delta;
			

			if ( moveForward ) velocity.z -= moveSpeed * delta;
			if ( moveBackward ) velocity.z += moveSpeed * delta;

			if ( moveLeft ) velocity.x -= moveSpeed * delta;
			if ( moveRight ) velocity.x += moveSpeed * delta;

			//		ROTACIJA OBJEKTA
			if (currentIntersected != null && currentIntersected.isManipulated && spinX ) currentIntersected.rotation.x += elapsed * 0.0025 * spinDir * fineAdjustment;
			if (currentIntersected != null && currentIntersected.isManipulated && spinY ) currentIntersected.rotation.y += elapsed * 0.0025 * spinDir * fineAdjustment;
			if (currentIntersected != null && currentIntersected.isManipulated && spinZ ) currentIntersected.rotation.z += elapsed * 0.0025 * spinDir * fineAdjustment;
			if (currentIntersected != null && currentIntersected.isManipulated) currentIntersected.boundingBox = calculateBoundingBox(currentIntersected);

			//		PREMIK KAMERA V SMERI POGLEDA
			yawObject.translateX( velocity.x );
			yawObject.translateY( velocity.y ); 
			yawObject.translateZ( velocity.z );

			
			//		DETEKCIJA KOLIZIJ ZA KAMERO
			if ( yawObject.position.x > 19.9 || yawObject.position.x < - 19.9 )
				yawObject.position.x = cameraOldX;
			if ( yawObject.position.z > 19.9 || yawObject.position.z < - 19.9 )
				yawObject.position.z = cameraOldZ;

			// 		TOGGLE LIGHT 
			if (changeLight  && !activeManipulation ){
				if (light){								// LIGHT OFF

					if (soundEnabled) soundOff.play();
					for(var i = 0;i<planes.children.length;i++){
				    	planes.children[i].material = darkWallMaterial;
				    	if (i > 3) planes.children[i].material = darkFloorMaterial;
					}

					lightCube.material = new THREE.MeshBasicMaterial( { color: 0x404040 } );
					object.visible = true;
					blocks.visible = false;
					light = false;

				}
				else {    							// LIGHT ON
					
					if (soundEnabled) soundOn.play();
					for(var i = 0;i<planes.children.length;i++){
				    	planes.children[i].material = lightWallMaterial;
				    	if (i > 3) planes.children[i].material = lightFloorMaterial;
					}
					lightCube.material = new THREE.MeshBasicMaterial( { color: 0xeeeeee } );
					object.visible = false;
					blocks.visible = true;
					light = true;


				}
			}
		    changeLight = false;

			//		PREMIK OBJEKTOV
			if (currentIntersected != null && currentIntersected.isManipulated){
				var objectOldX = currentIntersected.position.x;
				var objectOldY = currentIntersected.position.y;
				var objectOldZ = currentIntersected.position.z;

				var moveX = yawObject.position.x - cameraOldX;
				var moveZ = yawObject.position.z - cameraOldZ;

				currentIntersected.position.x += moveX;
				currentIntersected.position.z += moveZ;

				//				WALL/FLOOR/CEIL COLLISION DETECTION 

				if (currentIntersected.position.x + currentIntersected.boundingBox[1].x > 20 )
					currentIntersected.position.x = 20 - currentIntersected.boundingBox[1].x;
				if (currentIntersected.position.x + currentIntersected.boundingBox[0].x < -20)
					currentIntersected.position.x = -20 - currentIntersected.boundingBox[0].x;

				if (currentIntersected.position.y + currentIntersected.boundingBox[1].y > 4.5)
					currentIntersected.position.y = 4.5 - currentIntersected.boundingBox[1].y;
				if (currentIntersected.position.y + currentIntersected.boundingBox[0].y < -4.5)
					currentIntersected.position.y = -4.5 - currentIntersected.boundingBox[0].y;

				if (currentIntersected.position.z + currentIntersected.boundingBox[1].z > 20 )
					currentIntersected.position.z = 20 - currentIntersected.boundingBox[1].z;
				if (currentIntersected.position.z + currentIntersected.boundingBox[0].z < -20)
					currentIntersected.position.z = -20 - currentIntersected.boundingBox[0].z;


				
			}

	    }

		var vector = new THREE.Vector3();
		var dir = new THREE.Vector3();

		vector.set( 0, 0, - 1 ); // z = - 1 important!
		vector.unproject( camera );
		dir.set( 0, 0, - 1 ).transformDirection( camera.matrixWorld );
		raycaster.set( vector, dir );

		var intersects = raycaster.intersectObjects( blocks.children );
		if (!(currentIntersected != null && currentIntersected.isManipulated))
			if ( intersects.length > 0 ) {
				activeIntersect = true;
				if ( currentIntersected != intersects[ 0 ].object ) {
					if ( currentIntersected ) 
						currentIntersected.material.emissive.setHex( currentIntersected.currentHex );
					currentIntersected = intersects[ 0 ].object;
					currentIntersected.currentHex = currentIntersected.material.emissive.getHex();
					currentIntersected.material.emissive.setHex( 0x404040 );
					currentIntersected.isSelected=true;
				}
			} 
			else {
				if (activeIntersect)
					currentIntersected.isSelected = false;

				activeIntersect = false;
				if ( currentIntersected  ) 
					currentIntersected.material.emissive.setHex( currentIntersected.currentHex );

				if (!activeManipulation)
					currentIntersected = null;
			}


  	}
  	lastTime = timeNow;	
  	
	renderer.render( scene, camera );
};
