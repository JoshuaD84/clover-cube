function showCube( elementId ) {
		
   var parentElement = document.getElementById ( elementId );

   //TODO: Unhardcode these 4s and figure out how to get the width minus the border width
   var width = parentElement.offsetWidth - 4;
   var height = parentElement.offsetHeight - 4;
         
   var renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true });
   parentElement.appendChild ( renderer.domElement );
   renderer.setSize( width, height );
   
   var scene = new THREE.Scene();
	scene.updateMatrixWorld ( true );

	var camera = new THREE.PerspectiveCamera ( 45, width / height, 0.1, 1000 );
   camera.position.z = 14.5; //move camera back so we can see the cube
   camera.position.y -= 0.5; //offset vertically a bit to make room for controls
	
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
	controls.enableDamping = true;
	controls.dampingFactor = 0.75;
			   
   var loader = new THREE.ObjectLoader();
   var blocks;
   var centerRY;
	
   loader.load ( 'clover-cube.json', function ( parsedModels ) {
      for ( var i in parsedModels.children ) {
        
         parsedModels.children[i].material.shading = THREE.FlatShading;
			parsedModels.children[i].material.shininess = 15;
			parsedModels.children[i].material.reflectivity = 25;	
			
			parsedModels.children[i].updateMatrix();
			parsedModels.children[i].geometry.applyMatrix( parsedModels.children[i].matrix );
			parsedModels.children[i].position.set( 0, 0, 0 );
			parsedModels.children[i].rotation.set( 0, 0, 0 );
			parsedModels.children[i].scale.set( 1, 1, 1 );
			parsedModels.children[i].updateMatrix();
	
      }  
		
		blocks = parseBlocks ( parsedModels );
		
		scene.add ( parsedModels );      
   });
	
	addLights ( scene );
	   
   var render = function() {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
      
   };
   render();
	
	count = 0;
	
	increments = [];
	increments [ 0 ] =  Math.PI * .39086; //TODO: I just did this with trial and error. It's close, but not perfect. 
	increments [ 2 ] = increments [ 0 ];
	increments [ 1 ] = Math.PI - increments [ 0 ] * 2;
	
	parent.onkeypress = function(event) { //TODO: parent isn't right, doesnt allow multiple embeds. 
		if ( count < 2 ) {
			rotate( blocks.centers [ "BO" ],  increments [ count % 3 ] );

			count++;
			
			if ( count == 2 ) {
				dummy = new THREE.Object3D();
				
				scene.remove ( scene.getObjectById ( blocks.corners [ "BOY" ].id ) );
				
				moveFace ( blocks, "O1", "OY", "OW" );
				moveFace ( blocks, "O2", "OW", "BY" );
						 
				moveFace ( blocks, "B1", "BW", "OY" );
						 
				moveCorner ( blocks, "BOW", "OW", "OY" );
				moveCorner ( blocks, "BOW", "BW", "BY" );
						 
				moveCorner ( blocks, "BOY", "OY", "OW" );
				moveCorner ( blocks, "BOY", "BY", "BW" );
				count = 3;
			}
		
		} else if ( count < 5 ) {
			rotate( blocks.centers [ "OW" ],  increments [ count % 3 ] );

			count++;
			
			if ( count == 5 ) {
				
				//Remove O4
				var index = blocks.centers [ "GO" ].children.indexOf ( blocks.faces [ "O4" ] );
				if ( index == -1 ) alert ( "no Josh" );
				blocks.centers [ "GO" ].children.splice ( index, 1 );
	
				//Add O1
				blocks.centers [ "GO" ].children.push ( blocks.faces [ "O1" ] ) ;
				
				//Remove GOW
				var index = blocks.centers [ "GO" ].children.indexOf ( blocks.corners [ "GOW" ] );
				if ( index == -1 ) alert ( "no Josh" );
				blocks.centers [ "GO" ].children.splice ( index, 1 );
				
				//Add BOY
				blocks.centers [ "GO" ].children.push ( blocks.corners [ "BOY" ] ) ;
				
				count = 6;
			}
		
		} else { 
			rotate( blocks.centers [ "GO" ],  increments [ count % 3 ] );
			count ++;
		}
	}
}


//Psuedocode:

/*
Rotate 1st increment:
	2/4 centers: remove corner that we share
		 -Which two neighbors? 
	4/4 neighbor centers: remove face that we share
	2/4 centers: Add a face
		 -Same 'which two neighbors?' as above
		 -Which face? 
	
Rotate 2nd increment:
	all neighbors: lose all pieces that we share 
	2/4 neighbors: gain a corner and a face 
		-which neighbor?
		-which corner?
		-which face?
	
Rotate 3rd increment:
	2/4 neighbors: gain a corner
		-which corner
		-which neighbor
	all neighbors: lose all faces that we share 
	all neighbors: gain a face
		-which face? 

*/

function rotate ( center, distance ) {
	var axis = center.axis;
	center.model.rotateOnAxis ( axis, distance );
	applyStatesToMatrixDirectly ( center.model );
	
	for ( var stickerIndex in center.stickers ) {
		center.stickers[stickerIndex].rotateOnAxis ( axis, distance  );
		applyStatesToMatrixDirectly ( center.stickers[stickerIndex] );
	}
	
	for ( var childIndex in center.children ) {
		center.children[childIndex].model.rotateOnAxis ( axis, distance );
		applyStatesToMatrixDirectly ( center.children[childIndex].model );
		
		for ( var childStickerIndex in center.children[childIndex].stickers ) {
			center.children[childIndex].stickers[childStickerIndex].rotateOnAxis ( axis, distance );
			applyStatesToMatrixDirectly ( center.children[childIndex].stickers[childStickerIndex] );
		}
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

function moveFace ( blocks, child, oldParent, newParent ) {
	var index = blocks.centers [ oldParent ].children.indexOf ( blocks.faces [ child ] );
	if ( index == -1 ) alert ( child + " index of " + oldParent + ": " + index );
	blocks.centers [ oldParent ].children.splice ( index, 1 );
	blocks.centers [ newParent ].children.push ( blocks.faces [ child ] );
}

function moveCorner ( blocks, child, oldParent, newParent ) {
	var index = blocks.centers [ oldParent ].children.indexOf ( blocks.corners [ child ] );
	blocks.centers [ oldParent ].children.splice ( index, 1 );
	blocks.centers [ newParent ].children.push ( blocks.corners [ child ] );
}

function parseBlocks ( cubePieces ) {
	colors = [ "B", "G", "O", "R", "W", "Y" ];
	colorVectors = {};
	colorVectors["B"] = new THREE.Vector3 (  0,  0,  1 ); 
	colorVectors["G"] = new THREE.Vector3 (  0,  0, -1 ); 
	colorVectors["O"] = new THREE.Vector3 (  0,  1,  0 ); 
	colorVectors["R"] = new THREE.Vector3 (  0, -1,  0 ); 
	colorVectors["W"] = new THREE.Vector3 ( -1,  0 , 0 ); 
	colorVectors["Y"] = new THREE.Vector3 (  1,  0,  0 );

	opposedColors = {};
	opposedColors [ "B" ] = "G";
	opposedColors [ "G" ] = "B";
	opposedColors [ "O" ] = "R";
	opposedColors [ "R" ] = "O";
	opposedColors [ "W" ] = "Y";
	opposedColors [ "Y" ] = "W";
	
	corners = {};
	centers = {};
	faces = {};
	
	for ( var aIndex in colors ) {
		a = colors [ aIndex ];
					
		for ( i = 1; i <= 4; i++ ) {
			faceName = a + "" + i;
			faces [ faceName ] = {};
			faces [ faceName ].name = faceName;
			faces [ faceName ].model = cubePieces.getObjectByName ( "Clover " + faceName );
			faces [ faceName ].stickers = [];
			faces [ faceName ].stickers.push ( cubePieces.getObjectByName ( "Sticker - Clover " + faceName ) );
		}
			
		for ( var bIndex in colors ) {
			b = colors [ bIndex ];
			if ( a == b || opposedColors [ a ] == b )  continue;
			
			centerName = a + b;
			centerName = centerName.split("").sort().join("");
			
			centers [ centerName ] = {};	
			centers [ centerName ].name = centerName;			
			centers [ centerName ].model = cubePieces.getObjectByName ( "Center " + centerName );
			centers [ centerName ].stickers = [];
			centers [ centerName ].stickers.push ( cubePieces.getObjectByName ( "Sticker - Center " + centerName + " - " + a ) );
			centers [ centerName ].stickers.push ( cubePieces.getObjectByName ( "Sticker - Center " + centerName + " - " + b ) );
			
			var axis = new THREE.Vector3(0, 0, 0);
			axis.addVectors ( colorVectors [ a ], colorVectors [ b ]  );
			axis.normalize();
			centers [ centerName ].axis = axis;
			
			for ( var cIndex in colors ) {
				c = colors [ cIndex ];
				if ( a == c || opposedColors [ a ] == c )  continue;
				if ( b == c || opposedColors [ b ] == c )  continue;
				
				cornerName = a + b + c;
				cornerName = cornerName.split("").sort().join("");
					
				if ( typeof corners [cornerName] == 'undefined' ) {
					corners [ cornerName ] = {};
					corners [ cornerName ].name = cornerName;
					
					nameStub = "Corner " + cornerName;
					corners [ cornerName ].model = cubePieces.getObjectByName ( nameStub );
					corners [ cornerName ].stickers = [];
					
					nameStub = "Sticker - " + nameStub + " - ";
					corners [ cornerName ].stickers = [];
					corners [ cornerName ].stickers.push ( cubePieces.getObjectByName ( nameStub + a ) );
					corners [ cornerName ].stickers.push ( cubePieces.getObjectByName ( nameStub + b ) );
					corners [ cornerName ].stickers.push ( cubePieces.getObjectByName ( nameStub + c ) );
				}
			}
		}
	}
	

	centers [ "BO" ].children = [];
	centers [ "BO" ].children.push ( corners [ "BOW" ] );
	centers [ "BO" ].children.push ( corners [ "BOY" ] );
	centers [ "BO" ].children.push ( faces [ "O1" ] );
	centers [ "BO" ].children.push ( faces [ "O2" ] );
	centers [ "BO" ].children.push ( faces [ "B1" ] );
	centers [ "BO" ].children.push ( faces [ "B2" ] );
		
	centers [ "BW" ].children = [];
	centers [ "BW" ].children.push ( corners [ "BOW" ] );
	centers [ "BW" ].children.push ( corners [ "BRW" ] );
	centers [ "BW" ].children.push ( faces [ "W2" ] );
	centers [ "BW" ].children.push ( faces [ "W4" ] );
	centers [ "BW" ].children.push ( faces [ "B1" ] );
	centers [ "BW" ].children.push ( faces [ "B3" ] );
	
	centers [ "BY" ].children = [];
	centers [ "BY" ].children.push ( corners [ "BOY" ] );
	centers [ "BY" ].children.push ( corners [ "BRY" ] );
	centers [ "BY" ].children.push ( faces [ "Y1" ] );
	centers [ "BY" ].children.push ( faces [ "Y3" ] );
	centers [ "BY" ].children.push ( faces [ "B2" ] );
	centers [ "BY" ].children.push ( faces [ "B4" ] );
	
	
	
	centers [ "BR" ].children = [];
	centers [ "BR" ].children.push ( corners [ "BRY" ] );
	centers [ "BR" ].children.push ( corners [ "BRW" ] );
	centers [ "BR" ].children.push ( faces [ "R3" ] );
	centers [ "BR" ].children.push ( faces [ "R4" ] );
	centers [ "BR" ].children.push ( faces [ "B3" ] );
	centers [ "BR" ].children.push ( faces [ "B4" ] );
	
	
	
	
	centers [ "GO" ].children = [];
	centers [ "GO" ].children.push ( corners [ "GOY" ] );
	centers [ "GO" ].children.push ( corners [ "GOW" ] );
	centers [ "GO" ].children.push ( faces [ "O3" ] );
	centers [ "GO" ].children.push ( faces [ "O4" ] );
	centers [ "GO" ].children.push ( faces [ "G1" ] );
	centers [ "GO" ].children.push ( faces [ "G2" ] );
	
	
	
	centers [ "GW" ].children = [];
	centers [ "GW" ].children.push ( corners [ "GOW" ] );
	centers [ "GW" ].children.push ( corners [ "GRW" ] );
	centers [ "GW" ].children.push ( faces [ "G2" ] );
	centers [ "GW" ].children.push ( faces [ "G4" ] );
	centers [ "GW" ].children.push ( faces [ "W1" ] );
	centers [ "GW" ].children.push ( faces [ "W3" ] );
	
	
	centers [ "GY" ].children = [];
	centers [ "GY" ].children.push ( corners [ "GOY" ] );
	centers [ "GY" ].children.push ( corners [ "GRY" ] );
	centers [ "GY" ].children.push ( faces [ "Y2" ] );
	centers [ "GY" ].children.push ( faces [ "Y4" ] );
	centers [ "GY" ].children.push ( faces [ "G1" ] );
	centers [ "GY" ].children.push ( faces [ "G3" ] );
	
	centers [ "RY" ].children = [];
	centers [ "RY" ].children.push ( corners [ "BRY" ] );
	centers [ "RY" ].children.push ( corners [ "GRY" ] );
	centers [ "RY" ].children.push ( faces [ "Y3" ] );
	centers [ "RY" ].children.push ( faces [ "Y4" ] );
	centers [ "RY" ].children.push ( faces [ "R3" ] );
	centers [ "RY" ].children.push ( faces [ "R1" ] );
	
	
	centers [ "RW" ].children = [];
	centers [ "RW" ].children.push ( corners [ "BRW" ] );
	centers [ "RW" ].children.push ( corners [ "GRW" ] );
	centers [ "RW" ].children.push ( faces [ "W3" ] );
	centers [ "RW" ].children.push ( faces [ "W4" ] );
	centers [ "RW" ].children.push ( faces [ "R2" ] );
	centers [ "RW" ].children.push ( faces [ "R4" ] );
	
	
	centers [ "GR" ].children = [];
	centers [ "GR" ].children.push ( corners [ "GRW" ] );
	centers [ "GR" ].children.push ( corners [ "GRY" ] );
	centers [ "GR" ].children.push ( faces [ "R1" ] );
	centers [ "GR" ].children.push ( faces [ "R2" ] );
	centers [ "GR" ].children.push ( faces [ "G3" ] );
	centers [ "GR" ].children.push ( faces [ "G4" ] );
	
	
	
	
	centers [ "OY" ].children = [];
	centers [ "OY" ].children.push ( corners [ "GOY" ] );
	centers [ "OY" ].children.push ( corners [ "BOY" ] );
	centers [ "OY" ].children.push ( faces [ "O1" ] );
	centers [ "OY" ].children.push ( faces [ "O3" ] );
	centers [ "OY" ].children.push ( faces [ "Y1" ] );
	centers [ "OY" ].children.push ( faces [ "Y2" ] );
	
	centers [ "OW" ].children = [];
	centers [ "OW" ].children.push ( corners [ "GOW" ] );
	centers [ "OW" ].children.push ( corners [ "BOW" ] );
	centers [ "OW" ].children.push ( faces [ "O2" ] );
	centers [ "OW" ].children.push ( faces [ "O4" ] );
	centers [ "OW" ].children.push ( faces [ "W1" ] );
	centers [ "OW" ].children.push ( faces [ "W2" ] );
 
	retMe = {};
	retMe.faces = faces;
	retMe.centers = centers;
	retMe.corners = corners;
	return retMe;
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
	                                       
	lights[3] = new THREE.DirectionalLight ( 0xFFFFFF, 0.25 );
	lights[3].position.set ( 0, 0, 1 );  
	scene.add ( lights[3] );             
	                                     
	lights[4] = new THREE.DirectionalLight ( 0xFFFFFF, 0.25 );
	lights[4].position.set ( 0, -1, 0 );
	scene.add ( lights[4] );
	
	lights[5] = new THREE.AmbientLight( 0xAAAAAA );
   scene.add( lights[5] );
}
