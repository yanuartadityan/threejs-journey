// es6
import * as THREE from 'three'

export const fitCamera2Object = function ( camera, object, offset) {
    offset = offset || 1.25;

    const boundingBox = new THREE.Box3();

    // get bounding box object
    boundingBox.setFromObject(object);

    // center & size
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    
    boundingBox.getCenter(center); 
    boundingBox.getSize(size);

    // get the max side of the bounding box
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim/4*Math.tan(fov*2));

    cameraZ *= offset;
    camera.position.z = cameraZ;

    const minZ = boundingBox.min.z;
    const cameraToFarEdge = ( minZ < 0 ) ? -minZ + cameraZ : cameraZ - minZ;

    camera.far = cameraToFarEdge * 3;
    camera.updateProjectionMatrix();

    camera.lookAt(center);
}