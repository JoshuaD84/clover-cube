var lattices = [];

function showCube( moveText, titleText, colorInfo = {}, endSolved = true ) {
 	
   var parentElement = document.currentScript.parentElement;

	var title = document.createElement ( "div" );	
	title.className = "cube-title";
	title.id = parentElement.id  + "-title";
	title.innerHTML = titleText;
	parentElement.appendChild ( title );
	
   var renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
	parentElement.appendChild ( renderer.domElement );
	
	var cubeControls = createControls ( parentElement.id );
	parentElement.appendChild ( cubeControls.parentElement );
	
	var width = parentElement.clientWidth;
   var height = parentElement.clientHeight - title.clientHeight - cubeControls.parentElement.clientHeight - 6; //TODO: Why?
	
   renderer.setSize( width, height );
   
   var scene = new THREE.Scene();
	scene.updateMatrixWorld ( true );

	var camera = new THREE.PerspectiveCamera ( 45, width / height, 0.1, 1000 );
   camera.position.z = 13.5; //move camera back so we can see the cube
	
	var cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
	//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
	cameraControls.enableDamping = true;
	cameraControls.dampingFactor = 0.75;
	cameraControls.enableKeys = false;
	camera.position.x = -8.381782047178634;
	camera.position.y = 5.375814232166432;
	camera.position.z = 9.115719996513208;
	camera.rotation.x = -0.532833886365542;
	camera.rotation.y = -0.6698555225205431;
	camera.rotation.z = -0.35098692002078447;
	   
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
	lights[3] = new THREE.DirectionalLight ( 0xFFFFFF, 0.25 );
	lights[3].position.set ( 0, 0, 1 );  
	scene.add ( lights[3] ); 
	lights[4] = new THREE.DirectionalLight ( 0xFFFFFF, 0.25 );
	lights[4].position.set ( 0, 0, -1 );  
	scene.add ( lights[4] );      	
	lights[5] = new THREE.DirectionalLight ( 0xFFFFFF, 0.25 );
	lights[5].position.set ( 0, -1, 0 );
	scene.add ( lights[5] );
	lights[6] = new THREE.AmbientLight( 0xAAAAAA );
   scene.add( lights[6] );
	
   var loader = new THREE.ObjectLoader();
   var centerRY;
	var lattice;	
	
   loader.load ( '/clover-cube-files/clover-cube.json', function ( parsedModels ) {
      for ( var i in parsedModels.children ) {
         parsedModels.children[i].material.shading = THREE.FlatShading;
			parsedModels.children[i].material.shininess = 15;
			parsedModels.children[i].material.reflectivity = 25;	
			
			applyStatesToMatrixDirectly ( parsedModels.children[i] );
	   }  
		
		lattice = new Lattice( parsedModels, moveText, colorInfo, endSolved, cubeControls );
		lattices [ parentElement.id ] = lattice;
		scene.add ( parsedModels );      
   });
				   
   var render = function() {
		var rotationSpeed = Math.PI * 1/32;
      requestAnimationFrame(render);
      renderer.render(scene, camera);
		if ( lattice == null ) return; //if we haven't loaded everything yet, just chill

		if ( lattice.pendingRotations.length > 0 ) {
			pendingRotation = lattice.pendingRotations [ 0 ];
			
			var negator = pendingRotation.distance < 0 ? -1 : 1;
			
			if ( Math.abs ( pendingRotation.distance ) > rotationSpeed ) {
				for ( var k = 0; k < pendingRotation.blocks.length; k++ ) {
					rotate ( pendingRotation.blocks [ k ], pendingRotation.axis, rotationSpeed * negator );
				}
				
				pendingRotation.distance -= rotationSpeed * negator;
				
			} else {				
				for ( var k = 0; k < pendingRotation.blocks.length; k++ ) {
					rotate ( pendingRotation.blocks [ k ], pendingRotation.axis, pendingRotation.distance );
				}
				
				lattice.pendingRotations.shift(); //remove the 0th element from the array, because we're done with it. 
			}	
		}  
   };
	
   render();
}

function rotate ( block, axis, distance ) {
	block.model.rotateOnAxis ( axis, distance );
	applyStatesToMatrixDirectly ( block.model );
	
	for ( var stickerIndex in block.stickers ) {
		block.stickers[stickerIndex].rotateOnAxis ( axis, distance );
		applyStatesToMatrixDirectly ( block.stickers[stickerIndex] );
	}
}

function applyStatesToMatrixDirectly ( model ) {
	model.updateMatrix();
	model.geometry.applyMatrix( model.matrix );
	model.position.set( 0, 0, 0 );
	model.rotation.set( 0, 0, 0 );
	model.scale.set( 1, 1, 1 )
	model.updateMatrix();
}


function createControls ( elementId ) {
	
	parentElement = document.createElement ( "div" );
	parentElement.className = "cube-controls";
	
	beginningButton = document.createElement ( "button" );
	beginningButton.className = "beginning-button controls-button";
	beginningButton.type ="button";
	beginningButton.id = elementId + "-beginning-button";
	beginningButton.innerHTML = "|<";
	beginningButton.onclick = function() { lattices[elementId].toBeginning(); };
	parentElement.appendChild ( beginningButton );
	
	backOneButton = document.createElement ( "button" );
	backOneButton.className = "back-one-button controls-button";
	backOneButton.type ="button";
	backOneButton.id = elementId + "-back-one-button";
	backOneButton.innerHTML = "<";
	backOneButton.onclick = function() { lattices[elementId].backOne(); };
	parentElement.appendChild ( backOneButton );
	
	moveIndex = document.createElement ( "div" );
	moveIndex.className = "controls-move-index";
	moveIndex.id = elementId + "-move-index";
	moveIndex.innerHTML = " / ";
	parentElement.appendChild ( moveIndex );
	
	forwardOneButton = document.createElement ( "button" );
	forwardOneButton.className = "forward-one-button controls-button";
	forwardOneButton.type ="button";
	forwardOneButton.id = elementId + "-forward-one-button";
	forwardOneButton.innerHTML = ">";
	forwardOneButton.onclick = function() { lattices[elementId].forwardOne(); };
	parentElement.appendChild ( forwardOneButton );
	
	endButton = document.createElement ( "button" );
	endButton.className = "end-button controls-button";
	endButton.type ="button";
	endButton.id = elementId + "-end-button";
	endButton.innerHTML = ">|";
	endButton.onclick = function() { lattices[elementId].toEnd(); };
	parentElement.appendChild ( endButton );

	retMe = {};
	retMe.parentElement = parentElement;
	retMe.beginningButton = beginningButton;
	retMe.backOneButton = backOneButton;
	retMe.moveIndex = moveIndex;
	retMe.forwardOneButton = forwardOneButton;
	retMe.endButton = endButton;
		
	return retMe;
}
	