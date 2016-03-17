<?php include 'header.php'; ?>

<div class="cube-box">
	<div id="solve-clover" class="cube-demo">
		<script>
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			colorInfo.show = [ 	"O1", "O2", "O3", "O4", "R1", "R2", "R3", "R4",
										"W1", "W2", "W3", "W4", "Y1", "Y2", "Y3", "Y4", 
										"B1", "B2", "B3", "B4", "G1", "G2", "G3", "G4",
									];
			showCube ( "", "Solve for Clover", colorInfo );
		</script>
	</div>
</div>
<p>Your goal this step is to solve all of the clovers, like in the cube above.</p>
<p><strong>Make sure you solve the clovers on the proper side of the cube.</strong> Look at the center pieces to make sure you've got the correct side. You don't have to worry about the rotation of the center pieces right now, just make sure you get all of the clovers in place.</p>
<p>Handling faces is probably the most challenging part of this puzzle. That's why we do it first, before we have any corners or centers fixed in place. </p>
<p>As long as you do full twists (180 degrees), the faces move in four independent circuits, one for each position on the rotating side (also one for each side of the cube). This means that you need to put one of each color on each circuit.</p>
<p>I start with a single color and get all four faces in place.</p>
<p>Then I pick a second color that's adjacent to the first color, and get all four of those faces in place.</p>
<p>I then do a third color that is adjacent to <strong>both</strong> completed colors. This makes things easier</p>
<p>Finally, I do any fourth color, and then colors 5 and 6 at the same time.</p>
<p>Sometimes you'll have to temporarily break an existing face to get the face you need to the right side. That's OK.</p>
<p>Here are the basic tools you can use (along with 180 degree rotations) to build up the first four colors:</p>
<div class="cube-box">
	<div id="swap-faces-1" class="cube-demo">
		<script>
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			colorInfo.show = [ "O4", "W2" ];
			showCube( "OW-2, BO2, OW, BO-2, OW2", "Swap Two Faces 1", colorInfo );
		</script>
	</div>
	<div id="swap-faces-2" class="cube-demo">
		<script>
			//Change blue to orange
			//change orange to white
			//change white to {BG}
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			colorInfo.show = [ "O1", "W2" ];
			showCube( "BO, BW2, BO-2, BW, BO2, BW-2, BO", "Swap Two Faces 2", colorInfo );
		</script>
	</div>
</div>
<p>And here are the moves you'll need for the final two colors:</p>
<div class="cube-box">	
	<div id="swap-faces-3" class="cube-demo">
		<script>
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			colorInfo.show = [ "O1", "O2", "O3", "O4", "W1", "W2", "W3", "W4" ];
			showCube( "OW1, BO2, OW3, BO-2, OW2", "Fix Face Parity 2", colorInfo );
		</script>
	</div>

	<div id="swap-faces-4" class="cube-demo">
		<script>
			//Change blue to orange
			//change orange to white
			//change white to {BG}
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			colorInfo.show = [ "O1", "O2", "O3", "O4", "W1", "W2", "W3", "W4" ];
			showCube( "OB, WB1, OW2, WB3, OW-2, WB2, OB", "Fix Face Parity 4", colorInfo );
		</script>
	</div>
</div>
<p>Sometimes, you can get a situation where each face is on the right chain, but they're in the wrong order. This tool can help with that:</p>
<div class="cube-box">	
	<div id="face-order" class="cube-demo">
		<script>
			//Change blue to orange
			//change orange to white
			//change white to {BG}
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			colorInfo.show = [ "O1", "O2", "O3", "O4", "W1", "W2", "W3", "W4" ];
			showCube( "OW-2, BO2, OW, BO-2, OW-1", "Fix Face Order", colorInfo );
		</script>
	</div>
</div>
