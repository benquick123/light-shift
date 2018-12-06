var distSum = 0;
var volSum = 0;

function calculateDistances() {
	distSum = 0;
	volSum = 0;
	for (var i = 0; i < object.children.length; i++) {
		object.children[i].location = centerLocation(object.children[i].boundingBox);
		object.children[i].paired = false;
	}
	
	
	var minDist, dist, deltaVol, minDeltaVol;
	
	for (var i = 0; i < blocks.children.length; i++) {
		blockName = blocks.children[i].name.split(".")[0].split("_")[0];
		var blockPosition = new THREE.Vector3(blocks.children[i].position.x, blocks.children[i].position.y, blocks.children[i].position.z);
		blockPosition.y += 4.5;
		
		minDist = Infinity;
		minDeltaVol = Infinity;
		for (var j = 0; j < object.children.length; j++) {
			shapeName = object.children[j].name.split(".")[0].split("_")[0];
			if (!object.children[j].paired && blockName == shapeName) {
				dist = calculateDistance(blockPosition, object.children[j].location);
				if (dist < minDist)
					minDist = dist;
				
				deltaVol = subVolumes(blocks.children[i].boundingBox, object.children[j].boundingBox);
				if (deltaVol < minDeltaVol)
					minDeltaVol = deltaVol;
			}
		}

		distSum += minDist;
		volSum += minDeltaVol;
	}
}

function calculateDistance(pos1, pos2) {
	return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2) + Math.pow(pos1.z - pos2.z, 2));
}

function subVolumes(box1, box2) {
	size1 = new THREE.Vector3();
	size2 = new THREE.Vector3();
	
	size1.x = Math.abs(box1[0].x - box1[1].x);
	size1.y = Math.abs(box1[0].y - box1[1].y);
	size1.z = Math.abs(box1[0].z - box1[1].z);
	var volume1 = size1.x * size1.y * size1.z;

	size2.x = Math.abs(box2[0].x - box2[1].x);
	size2.y = Math.abs(box2[0].y - box2[1].y);
	size2.z = Math.abs(box2[0].z - box2[1].z);
	var volume2 = size2.x * size2.y * size2.z;

	return Math.abs(volume1 - volume2);
}

function centerLocation(boundingBox) {
	var min = boundingBox[0];
	var max = boundingBox[1];
	return new THREE.Vector3(min.x + (max.x-min.x)/2, min.y + (max.y-min.y)/2, min.z + (max.z-min.z)/2);
}