<?php include 'header.php'; ?>

<p>There are two basic moves to rotate the corners without affecting any other pieces. They are very similar, and they both rotate two corners that are next to each other.</p>
<p>The first solves them when the top color is pointing "outward", and the second solves them when the top colors are pointing in the same direction:</p>
<div class="cube-box">
	<div id="rotate-corners-1" class="cube-demo">
		<script>showCube( "BO, OW, OY-3, GO, OW-3, OY, BO, OW, OY-3, GO, OW-3, OY", "Rotate Corners 1" )</script>
	</div>
	
	<div id="rotate-corners-2" class="cube-demo">
		<script>showCube( "OW, OY-3, GO, OW-3, OY, BO, OW, OY-3, GO, OW-3, OY, BO", "Rotate Corners 2" )</script>
	</div>
</div>
<p>As you can see, the moves are the same, except the second skips the first rotation (and does it at the end instead).</p>

<p>These basic moves sometimes need to be combined to 
<div class="cube-box" style="clear: both">
	<div id="rotate-corners-3" class="cube-demo">
		<script>
			showCube( 
				"BO, OW, OY-3, GO, OW-3, OY, BO,   OW, OY-3, GO, OY, " + 
				"BO, OG-3, OY, BO-3, OG, OW-3, BO, OG-3, OY, BO-3, OG",
				"Rotate Corners 3" 
			)
		</script>
	</div>
	
	<div id="rotate-corners-4" class="cube-demo">
		<script>
			showCube( 
				"BO, OW, OY-3, GO, OW-3, OY, BO, OW, OY-3, GO, OW-3, OY, " + 
				"BO, GO-3, OY, BO-3, GO, OW, BO, GO-3, OY, BO-3, GO, OW",
				"Rotate Corners 4" 
			)
		</script>
	</div>
</div>