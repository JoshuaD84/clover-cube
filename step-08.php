<?php include 'header.php'; ?>

<p>Now that you have the bottom half solved and all of the faces solved, all you've got left are the remaining four centers and remaining four corners. </p>

<p>First we'll solve the centers. We have two tools for that job, one that flips a single center, and one that flips all four centers:</p>

<div class="cube-box">
	<div id="center-corner-orient" class="cube-demo">
		<script>
			//Change blue to orange
			//change orange to white
			//change white to {BG}
			var colorInfo = {};
			colorInfo.hide = [ "BOW", "BOY", "GOW", "GOY" ];
			showCube( "OW-1, GO-2, OW, GO2, OW-1, BO2, OW, BO-2, OW-1", "Flip One Center", colorInfo );
		</script>
	</div>
	<div id="flip-centers" class="cube-demo">
		<script>
			//Change blue to orange
			//change orange to white
			//change white to {BG}
			var colorInfo = {};
			colorInfo.hide = [ "BOW", "BOY", "GOW", "GOY" ];
			showCube( "OW, OB, OY, OG, OW, OB, OY, OG, OW, OB, OY, OG", "Flip Four Centers", colorInfo );
		</script>
	</div>
</div>

<p>You can combine these two moves to solve any combinations you run into. If you have three wrong, flip all four, and then flip the single one that's still messed up.</p>