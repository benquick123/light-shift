function clickProcess ( event ) {
    if (conEnable ){    // NI PRESEKANEGA PREDMETA 
        if (currentIntersected != null && currentIntersected.isManipulated){
            currentIntersected.material.emissive.setHex( 0x404040 );
            if(soundEnabled) release.play();
            currentIntersected.isManipulated = false;
            activeManipulation = false;
        }               // PRESEKAN PREDMET JE
        else if (currentIntersected != null && currentIntersected.isSelected && !activeManipulation && light){
            currentIntersected.isManipulated = true;
            currentIntersected.boundingBox = calculateBoundingBox(currentIntersected);
            if(soundEnabled) lock.play();
            currentIntersected.material.emissive.setHex( 0x606060 );
            activeManipulation = true;
        }

    }
    else {
		element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
		element.requestPointerLock();
    }
};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.updateProjectionMatrix();
}

function pointerlockchange ( event ) {
	if (!menu)
		conEnable = ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element );
    if (conEnable)
        document.getElementById('crosshair').style.display = 'block';
    else {
        document.getElementById('crosshair').style.display = 'none';
        paused();
    }
};

function mouseWheelHandler (event){
    //console.log(event.wheelDelta);
    if (currentIntersected != null && currentIntersected.isManipulated){      
        var heading =new THREE.Vector3(currentIntersected.position.x - yawObject.position.x,currentIntersected.position.y - yawObject.position.y,currentIntersected.position.z - yawObject.position.z);
        heading.x *= event.wheelDelta *  0.001 * fineAdjustment;
        heading.y *= event.wheelDelta *  0.001 * fineAdjustment;
        heading.z *= event.wheelDelta *  0.001 * fineAdjustment;


        //              NEW OBJECT POSITION ON MOUSE WHEEL ROTATION
        currentIntersected.position.x += heading.x;
        currentIntersected.position.y += heading.y;
        currentIntersected.position.z += heading.z;
        

    }
}

function onMouseMove ( event ) {
    if (conEnable){ 
        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        yawObject.rotation.y -= movementX * 0.001;
        pitchObject.rotation.x -= movementY * 0.001; 

        SumRadYaw -= movementX * 0.001;

        if (currentIntersected != null && currentIntersected.isManipulated){      
            var radius =  Math.sqrt(Math.pow(yawObject.position.x-currentIntersected.position.x,2)+Math.pow(yawObject.position.z-currentIntersected.position.z,2)) ;

            //              NEW OBJECT POSITION
            currentIntersected.position.x = yawObject.position.x + (-radius) * Math.sin(SumRadYaw);
            currentIntersected.position.z = yawObject.position.z + (-radius) * Math.cos(SumRadYaw);
            currentIntersected.position.y =  radius * Math.sin(pitchObject.rotation.x);
            //currentIntersected.boundingBox = calculateBoundingBox(currentIntersected);
        }
2
        pitchObject.rotation.x = Math.max( - Math.PI / 2, Math.min( Math.PI / 2, pitchObject.rotation.x ) );
    }
};

function onKeyDown ( event ) {
    switch ( event.keyCode ) {
        case 87: // w
            moveForward = true;
            break;

        case 65: // a
            moveLeft = true; 
            break;

        case 83: // s
            moveBackward = true;
            break;

        case 68: // d
            moveRight = true;
            break;

        case 89: // y
            spinX = true;
            break;81

        case 88: // x
            spinY = true;
            break;
        case 67: // c
            spinZ = true;
            break;
        case 32: // space
            changeLight = true;
            break;
        case 16: // shift
            spinDir = -1;
            break;
        case 70: // f
            if (fineAdjustment == 1) { 
                fineAdjustment = 0.1;
                document.getElementById("fineTuning").innerHTML = "Fine Tuning: ON";
            }
            else {
                fineAdjustment = 1;
                document.getElementById("fineTuning").innerHTML = "Fine Tuning: OFF";
            }
            break;
			
		case 46: //delete
			finalMenu();
			break;
    }
};

function onKeyUp  ( event ) {
    switch( event.keyCode ) {
        case 87: // w
            moveForward = false;
            break;

        case 65: // a
            moveLeft = false;
            break;

        case 83: // a
            moveBackward = false;
            break;

        case 68: // d
            moveRight = false;
            break;
        case 89: // y
            spinX = false;
            break;81

        case 88: // x
            spinY = false;
            break;
        case 67: // c
            spinZ = false;
            break;
        case 16: // shift
            spinDir = 1;
            break;

    }
  };
