<?php include 'header.php'; ?>

<p>This step is relatively straight forward. Your goal is to take the scrambled mess and turn it into a cube. Colors don't matter at all. Just get the thing shaped like a cube, and you've done your job.</p>
<p>This is easier than it might seem. If the puzzle is really messy, you won't have too many choices in moves. Just look for centers you can rotate (you won't be able to rotate every one) and try to clean things up. You'll see that things come together pretty easily.</p>
<p>That being said, eventually you'll probably simplify into a handful of situations, which may be confusing at first. Here's how you solve them: </p>
<div class="cube-box">
	<div id="make-cube-1" class="cube-demo center">
		<script>
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			showCube( "OW-2, BO-1, OW2, BO1", "Make Cube 1", colorInfo );
		</script>
	</div>

	<div id="make-cube-2" class="cube-demo center">
		<script>
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			showCube( "OW1, BO, OW-1",  "Make Cube 2", colorInfo );
		</script>
	</div>
	
	<div id="make-cube-3" class="cube-demo center">
		<script>
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			showCube( "BO-1, GW-1, OW-1, BO1, GW1, BO, GO, OY2, BO1, OY-2, BO-1",  "Make Cube 3", colorInfo );
		</script>
	</div>
</div>