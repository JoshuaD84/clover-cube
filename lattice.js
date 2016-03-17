function Lattice ( models, moveText, colorInfo, endSolved, controls ) {

	this.blocks = parseBlocks ( models );
	this.controls = controls;
	this.moveOrder = parseMoves ( moveText );

	this.updateMoveIndexDisplay = function () {
		this.controls.moveIndex.innerHTML = ( this.nextMoveIndex + 1 ) + " / " + ( this.moveOrder.length + 1 );
	}
					
	this.nextMoveIndex = 0;
	this.updateMoveIndexDisplay ();
		
	this.getCenter = function ( centerName ) {
		centerName = centerName.toUpperCase().split("").sort().join("");
		return this.blocks.centers [ centerName ];
	}
		
	this.cleanFaceNames = function ( centerA, centerB, index ) {
		
		var names;
		
		centerA = centerA.toUpperCase().split("").sort().join("");
			
		if ( centerB == null ) {
			names = [ centerA, "EMPTY" ];
			
		} else {
			centerB = centerB.toUpperCase().split("").sort().join("");		
			names = [ centerA, centerB ];
			names = names.sort();
		}
			
		names [ 2 ] = index;
		
		return names;
	}
			
	this.setFaceAt = function ( centerA, centerB, index, corner ) {
		var names = this.cleanFaceNames ( centerA, centerB, index );
		this.facePositions [ names[ 0 ] ] [ names [ 1 ] ] [ names [ 2 ] ] = corner;
	}
	
	this.getFaceAt = function ( centerA, centerB, index ) {
		var names = this.cleanFaceNames ( centerA, centerB, index );
		return this.facePositions [ names [ 0 ] ] [ names [ 1 ] ] [ names [ 2 ] ];		
	}
		
	this.cleanCornerNames = function ( centerA, centerB, centerC ) {
		centerA = centerA.toUpperCase().split("").sort().join("");
		centerB = centerB.toUpperCase().split("").sort().join("");
		
		var names;
		
		if ( centerC == null ) {
			names = [ centerA, centerB ];
			name = names.sort();
			names [ 2 ] = "EMPTY";
			
		} else {
			centerC = centerC.toUpperCase().split("").sort().join("");		
			names = [ centerA, centerB, centerC ];
			names = names.sort();
		}
		
		return names;
	}
	
	this.setCornerAt = function ( centerA, centerB, centerC, corner ) {
		var names = this.cleanCornerNames ( centerA, centerB, centerC );
		this.cornerPositions [ names[ 0 ] ] [ names [ 1 ] ] [ names [ 2 ] ] = corner;
	}
		
	this.getCornerAt = function ( centerA, centerB, centerC ) {
		var names = this.cleanCornerNames ( centerA, centerB, centerC );
		return this.cornerPositions [ names [ 0 ] ] [ names [ 1 ] ] [ names [ 2 ] ];		
	}
	
	
	this.applyPendingRotationsImmediately = function () {
		while( this.pendingRotations.length > 0 ) {
			pendingRotation = this.pendingRotations [ 0 ];
			
			for ( var k = 0; k < pendingRotation.blocks.length; k++ ) {
				rotate ( pendingRotation.blocks [ k ], pendingRotation.axis, pendingRotation.distance );
			}
			
			this.pendingRotations.shift(); //remove the 0th element from the array, because we're done with it. 
		
		}  
	}
		
	this.toBeginning = function ( ) {
		while ( this.nextMoveIndex > 0 ) {
			this.backOne();
		}
		
		this.applyPendingRotationsImmediately();
	}
	
	this.toEnd = function ( ) {
		while ( this.nextMoveIndex < this.moveOrder.length ) {
			this.forwardOne();
		}
		this.applyPendingRotationsImmediately();
	}

	this.forwardOne = function ( ) {
		if ( this.nextMoveIndex < this.moveOrder.length ) {
			var move = this.moveOrder [ this.nextMoveIndex ];
			var center = this.getCenter ( move.centerName );
			
			this.rotateCenter ( move.centerName, move.increments );
			
			this.nextMoveIndex ++;
			
			this.updateMoveIndexDisplay ();
		}
	}
	
	this.backOne = function ( ) {
		if ( this.nextMoveIndex > 0 ) {
			var move = this.moveOrder [ this.nextMoveIndex - 1 ];
			var center = this.getCenter ( move.centerName );
			this.rotateCenter ( move.centerName, -move.increments );
			this.nextMoveIndex --;
			this.updateMoveIndexDisplay ();
		}
	}

	this.rotateCenter = function ( centerName, rotationSteps ) {
		
		center = this.getCenter ( centerName );
		
		var increments = [];
		increments [ 0 ] =  Math.PI * .39086; //TODO: I just did this with trial and error. It's close, but not perfect. 
		increments [ 2 ] = increments [ 0 ];
		increments [ 1 ] = Math.PI - increments [ 0 ] * 2;
		
		for ( i = 0; i < Math.abs ( rotationSteps ); i++ ) {
			var corners = [];
			corners[ 0 ] = this.getCornerAt ( centerName, center.neighbors [ 0 ], center.neighbors [ 1 ] );
			corners[ 1 ] = this.getCornerAt ( centerName, center.neighbors [ 1 ], null );
			corners[ 2 ] = this.getCornerAt ( centerName, center.neighbors [ 2 ], null );
			corners[ 3 ] = this.getCornerAt ( centerName, center.neighbors [ 2 ], center.neighbors [ 3 ] );
			corners[ 4 ] = this.getCornerAt ( centerName, center.neighbors [ 3 ], null );
			corners[ 5 ] = this.getCornerAt ( centerName, center.neighbors [ 0 ], null );
			
			var faceSetOne = [];
			faceSetOne [ 0 ]  = this.getFaceAt ( centerName, center.neighbors [ 0 ], 0 );
			faceSetOne [ 1 ]  = this.getFaceAt ( centerName, center.neighbors [ 1 ], 1 );  
			faceSetOne [ 2 ]  = this.getFaceAt ( centerName, null, 						 1 );
			faceSetOne [ 3 ]  = this.getFaceAt ( centerName, center.neighbors [ 2 ], 0 );
			faceSetOne [ 4 ]  = this.getFaceAt ( centerName, center.neighbors [ 3 ], 1 );
			faceSetOne [ 5 ]  = this.getFaceAt ( centerName, null, 						 3 );
				
			var faceSetTwo = [];
			faceSetTwo [ 0 ]  = this.getFaceAt ( centerName, center.neighbors [ 1 ], 0 );
			faceSetTwo [ 1 ]  = this.getFaceAt ( centerName, null,						 0 );  
			faceSetTwo [ 2 ]  = this.getFaceAt ( centerName, center.neighbors [ 2 ], 1 );
			faceSetTwo [ 3 ]  = this.getFaceAt ( centerName, center.neighbors [ 3 ], 0 );
			faceSetTwo [ 4 ]  = this.getFaceAt ( centerName, null, 						 2 );
			faceSetTwo [ 5 ]  = this.getFaceAt ( centerName, center.neighbors [ 0 ], 1 );	
			
			var cornerCount = 0;
			var faceCount = 0;
			for ( var k = 0 ; k < corners.length; k++ ) {
				if ( corners [ k ] != null ) cornerCount ++;
			}

			for ( var k = 0 ; k < faceSetOne.length; k++ ) {
				if ( faceSetOne [ k ] != null ) faceCount ++;
			}
		
			for ( var k = 0 ; k < faceSetTwo.length; k++ ) {
				if ( faceSetTwo [ k ] != null ) faceCount ++;
			}
			
			//TODO: Checking for too many corners/faces would be a good thing to do. 
			if ( cornerCount < 2 || faceCount < 4 ) { 
				//TODO: Better error indicator for user. 
				console.log ( "illegal rotation requested, cornerCount: " + cornerCount + ", faceCount: " + faceCount );
				return;
			}
			
			if ( rotationSteps > 0 ) {
				this.setCornerAt ( centerName, center.neighbors [ 0 ], center.neighbors [ 1 ], 	corners [ 5 ] );
				this.setCornerAt ( centerName, center.neighbors [ 1 ], null, 							corners [ 0 ] );
				this.setCornerAt ( centerName, center.neighbors [ 2 ], null, 							corners [ 1 ] );
				this.setCornerAt ( centerName, center.neighbors [ 2 ], center.neighbors [ 3 ], 	corners [ 2 ] );
				this.setCornerAt ( centerName, center.neighbors [ 3 ], null, 							corners [ 3 ] );
				this.setCornerAt ( centerName, center.neighbors [ 0 ], null, 							corners [ 4 ] );
				
				this.setFaceAt ( centerName, center.neighbors [ 0 ], 0, faceSetOne [ 5 ] );
				this.setFaceAt ( centerName, center.neighbors [ 1 ], 1, faceSetOne [ 0 ] );
				this.setFaceAt ( centerName, null, 						  1, faceSetOne [ 1 ] );
				this.setFaceAt ( centerName, center.neighbors [ 2 ], 0, faceSetOne [ 2 ] );
				this.setFaceAt ( centerName, center.neighbors [ 3 ], 1, faceSetOne [ 3 ] );
				this.setFaceAt ( centerName, null, 						  3, faceSetOne [ 4 ] );
				
				this.setFaceAt ( centerName, center.neighbors [ 1 ], 0, faceSetTwo [ 5 ] );
				this.setFaceAt ( centerName, null,						  0, faceSetTwo [ 0 ] );
				this.setFaceAt ( centerName, center.neighbors [ 2 ], 1, faceSetTwo [ 1 ] );
				this.setFaceAt ( centerName, center.neighbors [ 3 ], 0, faceSetTwo [ 2 ] );
				this.setFaceAt ( centerName, null, 						  2, faceSetTwo [ 3 ] );
				this.setFaceAt ( centerName, center.neighbors [ 0 ], 1, faceSetTwo [ 4 ] );	
				
			} else if ( rotationSteps < 0 ) {
				this.setCornerAt ( centerName, center.neighbors [ 0 ], center.neighbors [ 1 ], 	corners [ 1 ] );
				this.setCornerAt ( centerName, center.neighbors [ 1 ], null, 							corners [ 2 ] );
				this.setCornerAt ( centerName, center.neighbors [ 2 ], null, 							corners [ 3 ] );
				this.setCornerAt ( centerName, center.neighbors [ 2 ], center.neighbors [ 3 ], 	corners [ 4 ] );
				this.setCornerAt ( centerName, center.neighbors [ 3 ], null, 							corners [ 5 ] );
				this.setCornerAt ( centerName, center.neighbors [ 0 ], null, 							corners [ 0 ] );
				
				this.setFaceAt ( centerName, center.neighbors [ 0 ], 0, faceSetOne [ 1 ] );
				this.setFaceAt ( centerName, center.neighbors [ 1 ], 1, faceSetOne [ 2 ] );
				this.setFaceAt ( centerName, null, 						  1, faceSetOne [ 3 ] );
				this.setFaceAt ( centerName, center.neighbors [ 2 ], 0, faceSetOne [ 4 ] );
				this.setFaceAt ( centerName, center.neighbors [ 3 ], 1, faceSetOne [ 5 ] );
				this.setFaceAt ( centerName, null, 						  3, faceSetOne [ 0 ] );
				
				this.setFaceAt ( centerName, center.neighbors [ 1 ], 0, faceSetTwo [ 1 ] );
				this.setFaceAt ( centerName, null,						  0, faceSetTwo [ 2 ] );
				this.setFaceAt ( centerName, center.neighbors [ 2 ], 1, faceSetTwo [ 3 ] );
				this.setFaceAt ( centerName, center.neighbors [ 3 ], 0, faceSetTwo [ 4 ] );
				this.setFaceAt ( centerName, null, 						  2, faceSetTwo [ 5 ] );
				this.setFaceAt ( centerName, center.neighbors [ 0 ], 1, faceSetTwo [ 0 ] );	
				
			}
		
		
			rotation = {};
			if ( rotationSteps > 0 ) {
				rotation.distance = increments [ center.rotation % 3 ];
				center.rotation = ( center.rotation + 1 ) % 6;
			} else {
				rotation.distance = -increments [ ( center.rotation + 2 ) % 3 ];
				center.rotation = ( center.rotation + 5 ) % 6;
			}
			rotation.axis = center.axis;
			rotation.blocks = [];
			for ( var k = 0; k < corners.length; k++ ) {
				if ( corners[k] != null ) {
					rotation.blocks.push ( corners [ k ] );
				}
			}
			
			for ( var k = 0; k < faceSetOne.length; k++ ) {
				if ( faceSetOne[k] != null ) {
					rotation.blocks.push ( faceSetOne [ k ] );
				}
				if ( faceSetTwo[k] != null ) {
					rotation.blocks.push ( faceSetTwo [ k ] );
				}
			}
					
			rotation.blocks.push ( center );
			
			this.pendingRotations.push ( rotation );
		}
	}
	
	this.setColors = function ( colorInfo ) {
		if ( colorInfo == undefined ) {
			colorInfo = {};
		}
		
		if ( colorInfo.greyColors == undefined ) {
			colorInfo.greyColors = [];
		}
		
		if ( colorInfo.show == undefined ) {
			colorInfo.show = [];
		}
		
		if ( colorInfo.hide == undefined ) {
			colorInfo.hide = [];
		}
		
		this.colorInfo = colorInfo;
		
		for ( var faceIndex in this.blocks.faces ) {
			this.blocks.faces [ faceIndex ].stickers[0].material = this.blocks.faces [ faceIndex ].stickers[0].colorMaterial;
		}
		
		for ( var centerIndex in this.blocks.centers ) {
			var center = this.blocks.centers [ centerIndex ];
			
			for ( var stickerIndex in center.stickers ) {
				center.stickers[stickerIndex].material = center.stickers[stickerIndex].colorMaterial;
			}
		}
		
		for ( var cornerIndex in this.blocks.corners ) {
			var corner = this.blocks.corners [ cornerIndex ];
			
			for ( var stickerIndex in corner.stickers ) {
				corner.stickers[stickerIndex].material = corner.stickers[stickerIndex].colorMaterial;
			}
		}

		for ( var grayIndex = 0; grayIndex < this.colorInfo.greyColors.length; grayIndex++ ) {
			var color = this.colorInfo.greyColors [ grayIndex ];
			
			for ( var faceIndex = 1 ; faceIndex <= 4; faceIndex ++ ) {
				var faceName = color + "" + faceIndex;
				if ( this.colorInfo.show.indexOf ( faceName ) == -1 ) {
					this.blocks.faces [ faceName ].stickers[0].material = blankMaterial;
				} else {
					this.blocks.faces [ faceName ].stickers[0].material = this.blocks.faces [ faceName ].stickers[0].colorMaterial;
				}
			}
					
			for ( var centerIndex in this.blocks.centers ) {
				if ( this.colorInfo.show.indexOf ( centerIndex ) == -1 ) {
					var sticker = this.blocks.centers [ centerIndex ].stickers [ color ];
					if ( sticker != undefined ) { 
						sticker.material = blankMaterial;
					}
				} else {
					var sticker = this.blocks.centers [ centerIndex ].stickers [ color ];
					if ( sticker != undefined ) { 
						sticker.material = sticker.colorMaterial;
					}
				}
			}
			
			for ( var cornerIndex in this.blocks.corners ) {
				if ( this.colorInfo.show.indexOf ( cornerIndex ) == -1 ) {
					var sticker = this.blocks.corners [ cornerIndex ].stickers [ color ];
					if ( sticker != undefined ) { 
						sticker.material = blankMaterial;
					}
				} else {
					var sticker = this.blocks.corners [ cornerIndex ].stickers [ color ];
					if ( sticker != undefined ) { 
						sticker.material = sticker.colorMaterial;
					}
				}
			}
		}
		
		//Now deal with ones we should specifically hide. 
		for ( var faceIndex = 1 ; faceIndex <= 4 ; faceIndex ++ ) {
			var faceName = color + "" + faceIndex;
			if ( this.colorInfo.hide.indexOf ( faceName ) != -1 ) {
				this.blocks.faces [ faceName ].stickers[0].material = blankMaterial;
			} 
		}		
		
		for ( var centerIndex in this.blocks.centers ) {
			if ( this.colorInfo.hide.indexOf ( centerIndex ) != -1 ) {
				var sticker = this.blocks.centers [ centerIndex ].stickers [ color ];
				if ( sticker != undefined ) { 
					sticker.material = blankMaterial;
				}
			}
		}
		
		for ( var cornerIndex in this.blocks.corners ) {
			if ( this.colorInfo.hide.indexOf ( cornerIndex ) != -1 ) {
				var colors = cornerIndex.split("");
				for ( var colorIndex in colors ) {
					var sticker = this.blocks.corners [ cornerIndex ].stickers [ colors [ colorIndex ] ];
					if ( sticker != undefined ) { 
						sticker.material = blankMaterial;
					} 
				}
			}
		}
	}
	
	this.showAllColors = function ( ) {
		var colorInfo = {};
		colorInfo.greyColors = [];		
		this.setColors ( colorInfo );
	}
	
	this.showOnlyFaces = function ( ) {
		var colorInfo = {};
		colorInfo.greyColors = [ 'B', 'G', 'O', 'R', 'W', 'Y' ];
		colorInfo.show = 	[ 	"B1", "B2", "B3", "B4", "G1", "G2", "G3", "G4", 
									"O1", "O2", "O3", "O4", "R1", "R2", "R3", "R4", 
									"W1", "W2", "W3", "W4", "Y1", "Y2", "Y3", "Y4", 
								];
		
		this.setColors ( colorInfo );
	}
	
		
	this.showOnlyCorners = function ( ) {
		var colorInfo = {};
		colorInfo.greyColors = [ 'B', 'G', 'O', 'R', 'W', 'Y' ];
		colorInfo.show = 	[ 	"BOW", "BOY", "BRW", "BRY", "GOW", "GOY", "GRW", "GRY" ];
		this.setColors ( colorInfo );
	}
	
	this.showOnlyCenters = function ( ) {
		var colorInfo = {};
		colorInfo.greyColors = [ 'B', 'G', 'O', 'R', 'W', 'Y' ];
		colorInfo.show = 	[ "BO", "BR", "BW", "BY", "GO", "GR", "GW", "GY", "OW", "OY", "RW", "RY" ];
		this.setColors ( colorInfo );
	}
	
	this.pendingRotations = [];
	
	this.nameToIndex = [];
	this.indexToName = [];
	this.nameToIndex["BO"] = 0;  this.indexToName [ 0 ]  = "BO";
	this.nameToIndex["BR"] = 1;  this.indexToName [ 1 ]  = "BR";
	this.nameToIndex["BW"] = 2;  this.indexToName [ 2 ]  = "BW";
	this.nameToIndex["BY"] = 3;  this.indexToName [ 3 ]  = "BY";
	this.nameToIndex["GO"] = 4;  this.indexToName [ 4 ]  = "GO";
	this.nameToIndex["GR"] = 5;  this.indexToName [ 5 ]  = "GR";
	this.nameToIndex["GW"] = 6;  this.indexToName [ 6 ]  = "GW";
	this.nameToIndex["GY"] = 7;  this.indexToName [ 7 ]  = "GY";
	this.nameToIndex["OW"] = 8;  this.indexToName [ 8 ]  = "OW";
	this.nameToIndex["OY"] = 9;  this.indexToName [ 9 ]  = "OY";
	this.nameToIndex["RW"] = 10; this.indexToName [ 10 ] = "RW";
	this.nameToIndex["RY"] = 11; this.indexToName [ 11 ] = "RY";
	this.nameToIndex["EMPTY"] = 12; this.indexToName [ 12 ] = "EMPTY";
		
	this.cornerPositions = new Array();
	for ( var i = 0; i < 12; i ++ ) { //all centers
		this.cornerPositions[ this.indexToName [ i ] ] = new Array();
		
		for ( var j = 0; j < 12; j ++ ) { //all centers plus "EMPTY"
			this.cornerPositions[ this.indexToName [ i ] ] [ this.indexToName [ j ] ] = new Array();
		}
	}
	
	for ( var i = 0; i < this.cornerPositions.length; i++ ) {
		for ( var j = 0; j < this.cornerPosition [ i ].length; j++ ) {
			for ( var k = 0; k < 13; k++ ) {
				this.setCornerAt ( this.indexToName ( i ), this.indexToName ( j ), this.indexToName ( k ), null );
			}
		}
	}
	
	this.setCornerAt ( "BO", "BW", "OW",  this.blocks.corners [ "BOW" ] );
	this.setCornerAt ( "BO", "BY", "OY",  this.blocks.corners [ "BOY" ] );
	this.setCornerAt ( "BR", "BY", "RY",  this.blocks.corners [ "BRY" ] );
	this.setCornerAt ( "BR", "BW", "RW",  this.blocks.corners [ "BRW" ] );	
	this.setCornerAt ( "GO", "GW", "OW",  this.blocks.corners [ "GOW" ] );
	this.setCornerAt ( "GO", "GY", "OY",  this.blocks.corners [ "GOY" ] );
	this.setCornerAt ( "GR", "GY", "RY",  this.blocks.corners [ "GRY" ] );
	this.setCornerAt ( "GR", "GW", "RW",  this.blocks.corners [ "GRW" ] );
	
	
	this.facePositions = new Array();
	
	for ( var i = 0; i < 12; i ++ ) { //all centers
		this.facePositions[ this.indexToName [ i ] ] = new Array();
		
		for ( var j = 0; j < 13; j ++ ) { //all centers plus "EMPTY"
			this.facePositions[ this.indexToName [ i ] ] [ this.indexToName [ j ] ] = new Array();
		}
	}
	
	for ( var i = 0; i < this.cornerPositions.length; i++ ) {
		for ( var j = 0; j < this.cornerPosition [ i ].length; j++ ) {
			for ( var k = 0; k < 4; k++ ) {
				this.setCornerAt ( this.indexToName ( i ), this.indexToName ( j ), k, null );
			}
		}
	}
	
	this.setFaceAt ( "BO", "OW", 0, this.blocks.faces [ "O1" ] );
	this.setFaceAt ( "BO", "BW", 0, this.blocks.faces [ "B4" ] );
	this.setFaceAt ( "BO", "BY", 0, this.blocks.faces [ "B1" ] );
	this.setFaceAt ( "BO", "OY", 0, this.blocks.faces [ "O4" ] );
	this.setFaceAt ( "BR", "RY", 0, this.blocks.faces [ "R2" ] ); 
	this.setFaceAt ( "BR", "BY", 0, this.blocks.faces [ "B3" ] ); 
	this.setFaceAt ( "BR", "BW", 0, this.blocks.faces [ "B2" ] ); 
	this.setFaceAt ( "BR", "RW", 0, this.blocks.faces [ "R3" ] ); 
	this.setFaceAt ( "BW", "OW", 0, this.blocks.faces [ "W2" ] );
	this.setFaceAt ( "BW", "RW", 0, this.blocks.faces [ "W4" ] ); 
	this.setFaceAt ( "BY", "OY", 0, this.blocks.faces [ "Y3" ] );
	this.setFaceAt ( "BY", "RY", 0, this.blocks.faces [ "Y1" ] );
	
	this.setFaceAt ( "GO", "OY", 0, this.blocks.faces [ "O3" ] );
	this.setFaceAt ( "GO", "GY", 0, this.blocks.faces [ "G2" ] );
	this.setFaceAt ( "GO", "GW", 0, this.blocks.faces [ "G3" ] );
	this.setFaceAt ( "GO", "OW", 0, this.blocks.faces [ "O2" ] );
	this.setFaceAt ( "GR", "RW", 0, this.blocks.faces [ "R4" ] ); 
	this.setFaceAt ( "GR", "GW", 0, this.blocks.faces [ "G1" ] );
	this.setFaceAt ( "GR", "GY", 0, this.blocks.faces [ "G4" ] );
	this.setFaceAt ( "GR", "RY", 0, this.blocks.faces [ "R1" ] );
	this.setFaceAt ( "GW", "OW", 0, this.blocks.faces [ "W1" ] ); 
	this.setFaceAt ( "GW", "RW", 0, this.blocks.faces [ "W3" ] ); 
	this.setFaceAt ( "GY", "OY", 0, this.blocks.faces [ "Y4" ] );
	this.setFaceAt ( "GY", "RY", 0, this.blocks.faces [ "Y2" ] );
	
	if ( endSolved ) {
		for ( var k = this.moveOrder.length - 1; k >= 0; k -- ) {
			var move = this.moveOrder [ k ];
			this.rotateCenter ( move.centerName, -move.increments );
		}
		
		this.applyPendingRotationsImmediately();
	}
		
	var blankMaterial = new THREE.MeshPhongMaterial();
	blankMaterial.clone ( this.blocks.faces [ "R1" ].stickers[0].material );
	blankMaterial.color.setHex (0x888888);
	
	this.setColors ( colorInfo );
	
	
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
			faces [ faceName ].pendingRotations = [];
			faces [ faceName ].model = cubePieces.getObjectByName ( "Clover " + faceName );
			faces [ faceName ].stickers = [];
			sticker = cubePieces.getObjectByName ( "Sticker - Clover " + faceName );
			sticker.colorMaterial = sticker.material;
			faces [ faceName ].stickers.push ( sticker  );
		}
			
		for ( var bIndex in colors ) {
			b = colors [ bIndex ];
			if ( a == b || opposedColors [ a ] == b )  continue;
			
			centerName = a + b;
			centerName = centerName.split("").sort().join("");
			
			centers [ centerName ] = {};	
			centers [ centerName ].name = centerName;		
			centers [ centerName ].pendingRotations = [];			
			centers [ centerName ].model = cubePieces.getObjectByName ( "Center " + centerName );
			centers [ centerName ].stickers = [];
			centers [ centerName ].stickers [ a ] = cubePieces.getObjectByName ( "Sticker - Center " + centerName + " - " + a );
			centers [ centerName ].stickers [ b ] = cubePieces.getObjectByName ( "Sticker - Center " + centerName + " - " + b );
			
			centers [ centerName ].stickers [ a ].colorMaterial = centers [ centerName ].stickers [ a ].material;
			centers [ centerName ].stickers [ b ].colorMaterial = centers [ centerName ].stickers [ b ].material;
						
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
					corners [ cornerName ].pendingRotations = [];
					
					nameStub = "Corner " + cornerName;
					corners [ cornerName ].model = cubePieces.getObjectByName ( nameStub );
					corners [ cornerName ].stickers = [];
					
					nameStub = "Sticker - " + nameStub + " - ";
					corners [ cornerName ].stickers = [];
					corners [ cornerName ].stickers [ a ] = cubePieces.getObjectByName ( nameStub + a );
					corners [ cornerName ].stickers [ b ] = cubePieces.getObjectByName ( nameStub + b );
					corners [ cornerName ].stickers [ c ] = cubePieces.getObjectByName ( nameStub + c );
					
					corners [ cornerName ].stickers [ a ].colorMaterial = corners [ cornerName ].stickers [ a ].material;
					corners [ cornerName ].stickers [ b ].colorMaterial = corners [ cornerName ].stickers [ b ].material;
					corners [ cornerName ].stickers [ c ].colorMaterial = corners [ cornerName ].stickers [ c ].material;
				}
			}
		}
	}
	
	centers [ "BO" ].rotation = 0;	
	centers [ "BO" ].neighbors = [];
	centers [ "BO" ].neighbors [ 0 ] = "OW";
	centers [ "BO" ].neighbors [ 1 ] = "BW";
	centers [ "BO" ].neighbors [ 2 ] = "BY";
	centers [ "BO" ].neighbors [ 3 ] = "OY";
	
	centers [ "BR" ].rotation = 0;
	centers [ "BR" ].neighbors = [];
	centers [ "BR" ].neighbors [ 0 ] = "RY";
	centers [ "BR" ].neighbors [ 1 ] = "BY";
	centers [ "BR" ].neighbors [ 2 ] = "BW";
	centers [ "BR" ].neighbors [ 3 ] = "RW";
	
	
	centers [ "BY" ].rotation = 0;
	centers [ "BY" ].neighbors = [];
	centers [ "BY" ].neighbors [ 0 ] = "OY";
	centers [ "BY" ].neighbors [ 1 ] = "BO";
	centers [ "BY" ].neighbors [ 2 ] = "BR";
	centers [ "BY" ].neighbors [ 3 ] = "RY";
	
	
	centers [ "BW" ].rotation = 0;
	centers [ "BW" ].neighbors = [];
	centers [ "BW" ].neighbors [ 0 ] = "RW";
	centers [ "BW" ].neighbors [ 1 ] = "BR";
	centers [ "BW" ].neighbors [ 2 ] = "BO";
	centers [ "BW" ].neighbors [ 3 ] = "OW";
	
	
	centers [ "GO" ].rotation = 0;
	centers [ "GO" ].neighbors = [];
	centers [ "GO" ].neighbors [ 0 ] = "OY";
	centers [ "GO" ].neighbors [ 1 ] = "GY";
	centers [ "GO" ].neighbors [ 2 ] = "GW";
	centers [ "GO" ].neighbors [ 3 ] = "OW";
	
	centers [ "GR" ].rotation = 0;
	centers [ "GR" ].neighbors = [];
	centers [ "GR" ].neighbors [ 0 ] = "RW";
	centers [ "GR" ].neighbors [ 1 ] = "GW";
	centers [ "GR" ].neighbors [ 2 ] = "GY";
	centers [ "GR" ].neighbors [ 3 ] = "RY";
	
	centers [ "GY" ].rotation = 0;
	centers [ "GY" ].neighbors = [];
	centers [ "GY" ].neighbors [ 0 ] = "RY";
	centers [ "GY" ].neighbors [ 1 ] = "GR";
	centers [ "GY" ].neighbors [ 2 ] = "GO";
	centers [ "GY" ].neighbors [ 3 ] = "OY";
	
	centers [ "GW" ].rotation = 0;
	centers [ "GW" ].neighbors = [];
	centers [ "GW" ].neighbors [ 0 ] = "OW";
	centers [ "GW" ].neighbors [ 1 ] = "GO";
	centers [ "GW" ].neighbors [ 2 ] = "GR";
	centers [ "GW" ].neighbors [ 3 ] = "RW";
	
	centers [ "OY" ].rotation = 0;
	centers [ "OY" ].neighbors = [];
	centers [ "OY" ].neighbors [ 0 ] = "GY";
	centers [ "OY" ].neighbors [ 1 ] = "GO";
	centers [ "OY" ].neighbors [ 2 ] = "BO";
	centers [ "OY" ].neighbors [ 3 ] = "BY";
	
		
	centers [ "OW" ].rotation = 0;
	centers [ "OW" ].neighbors = [];
	centers [ "OW" ].neighbors [ 0 ] = "BW";
	centers [ "OW" ].neighbors [ 1 ] = "BO";
	centers [ "OW" ].neighbors [ 2 ] = "GO";
	centers [ "OW" ].neighbors [ 3 ] = "GW";

	centers [ "RY" ].rotation = 0;
	centers [ "RY" ].neighbors = [];
	centers [ "RY" ].neighbors [ 0 ] = "BY";
	centers [ "RY" ].neighbors [ 1 ] = "BR";
	centers [ "RY" ].neighbors [ 2 ] = "GR";
	centers [ "RY" ].neighbors [ 3 ] = "GY";
	
	centers [ "RW" ].rotation = 0;	
	centers [ "RW" ].neighbors = [];
	centers [ "RW" ].neighbors [ 0 ] = "GW";
	centers [ "RW" ].neighbors [ 1 ] = "GR";
	centers [ "RW" ].neighbors [ 2 ] = "BR";
	centers [ "RW" ].neighbors [ 3 ] = "BW";
		 
	retMe = {};
	retMe.faces = faces;
	retMe.centers = centers;
	retMe.corners = corners;
	return retMe;
}

function parseMoves ( moveText ) {
	moves = [];
	
	if ( moveText == "" ) return moves;
	
	moveTokens = moveText.split (",");
	
	for ( var i = 0; i < moveTokens.length; i++ ) {
		moveTokens[i] = moveTokens[i].trim();
		
		var center = moveTokens[i].substring ( 0, 2 );
		var inc = moveTokens[i].substring ( 2 );
		if ( inc.length == 0 ) {
			inc = "3";
		}
		
		//TODO: error checking 
		
		moves [ i ] = {};
		moves [ i ].centerName = center;
		moves [ i ].increments = inc;
	}
	
	return moves;
	
}