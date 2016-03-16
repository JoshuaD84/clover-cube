<?php include 'header.php'; ?>

<div id="intro-cube" class="cube-demo center big">
	<script>
		showCube( 
			//Step 1
			"BY-2, RW2, GR1, YG-2, " + 
			"BO-1, GW-1, OW-1, BO1, GW1, BO, GO, OY2, BO1, OY-2, BO-1, " +
			//Step 2 goes here
			//Step 3
			"OY, GW, GO, GR, BW, RW, BW, OW, " + 
			//Step 4 goes here
			//Step 5 goes here
			//Step 6 goes here
			//Step 7 goes here
			//Step 8: Flip one center
			"OW-1, GO-2, OW, GO2, OW-1, BO2, OW, BO-2, OW-1, " + 
			//Step 9: Position Corneers
			"OB, OW, OB, OY, OB, OW, OB, OY, " + 
			//Step 10: rotate corners
			"BO, OW, OY-3, GO, OW-3, OY, BO, OW, OY-3, GO, OW-3, OY", 
			"The Clover Cube" 
		);
	</script>
</div>
<h2>About</h2>
<p>The Clover Cube is a 3-dimensional rotation puzzle. It's similar to the Rubik's Cube, but has a completely unique solution.</p>

<p>The one I have is produced by the company LanLan under the name "Four-Leaf-Clover Magic Cube."</p>

<p>This is a solution to the puzzle that I initially developed over the period of two weeks, and continue to hone.</p>

<p>This tutorial requires a modern browser and javascript enabled. It uses WebGL (via three.js) to render the cubes.</p>
