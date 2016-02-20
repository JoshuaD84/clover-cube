function showCube( elementId ) {
   var parentElement = document.getElementById ( elementId );

   //TODO: Unhardcode these 4s and figure out how to get the width minus the border width
   var width = parentElement.offsetWidth - 4;
   var height = parentElement.offsetHeight - 4;
         
   var renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true });
   parentElement.appendChild ( renderer.domElement );
   renderer.setSize( width, height );
   
   var scene = new THREE.Scene();
   var camera = new THREE.PerspectiveCamera ( 50, width / height, 0.1, 1000 );

   camera.position.z = 10.5; //move camera back so we can see the cube
   camera.position.y -= 0.5; //offset vertically a bit to make room for controls
   
   var loader = new THREE.ObjectLoader();
   var cubePieces;
      
   loader.load ( 'clover-cube.json', function ( obj ) {
      for ( var i in obj.children ) {
        
         obj.children[i].material.shading = THREE.FlatShading;
			obj.children[i].material.shininess = 0;
			obj.children[i].material.reflectivity = 0;
        
      }  
      cubePieces = obj;
      scene.add ( obj );   

   });
	
	addLights ( scene );
   
   var render = function() {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
      if ( cubePieces ) {
        for ( var i in cubePieces.children ) {
            cubePieces.children[i].rotation.x += 0.005;
            cubePieces.children[i].rotation.y += 0.005;
         }
      }
   };
   render();
}

function addLights ( scene ) {
	var lights = [];

	lights[0] = new THREE.DirectionalLight ( 0xFFFFFF, 0.25 );
	lights[0].position.set ( 0, 1, 0 );
	scene.add ( lights[0] );
	
	lights[1] = new THREE.DirectionalLight ( 0xFFFFFF, 0.25 );
	lights[1].position.set ( 1, 0, 0 );
	scene.add ( lights[1] );
	
	lights[2] = new THREE.DirectionalLight ( 0xFFFFFF, 0.25 );
	lights[2].position.set ( -1, 0, 0 );
	scene.add ( lights[2] );
	
	lights[3] = new THREE.DirectionalLight ( 0xFFFFFF, 0.65 );
	lights[3].position.set ( 0, 0, 1 );
	scene.add ( lights[3] );
	
	lights[4] = new THREE.DirectionalLight ( 0xFFFFFF, 0.25 );
	lights[4].position.set ( 0, -1, 0 );
	scene.add ( lights[4] );
	
	lights[5] = new THREE.AmbientLight( 0x666666 );
   scene.add( lights[5] );
}
