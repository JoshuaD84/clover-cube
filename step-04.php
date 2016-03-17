<?php include 'header.php'; ?>

<div class="cube-box">
	<div id="second-corner" class="cube-demo">
		<script>
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			colorInfo.show = [ "O1", "O2", "W1", "W2", "G3", "B4", "BW", "OW", "BO", "GO", "GW", "GOW", "BOW" ];
			showCube( "", "Add A Second Corner", colorInfo );
		</script>
	</div>
</div>
<p>This step is a lot like the previous step. You solve another corner, three faces, and two centers. (It should share one center with the corner you already solved).</p>
<p>I recommend that you solve for the "top" face first (in the cube above, the green face). This makes things a bit easier.</p>