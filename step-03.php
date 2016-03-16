<?php include 'header.php'; ?>

<h2>Step 3: Solve a Corner</h2>
<div class="cube-box">
	<div id="solve-corner-goal" class="cube-demo">
		<script>
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			colorInfo.show = [ "O1", "W2", "B4", "BW", "OW", "BO", "BOW" ];
			showCube ( "", "Solve a Corner", colorInfo );
		</script>
	</div>
	
	<div id="solve-corner" class="cube-demo">
		<script>
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			colorInfo.show = [ "O1", "W2", "B4", "BW", "OW", "BO", "BOW" ];
			showCube( "OY, GW, GO, GR, BW, RW, BW, OW", "Solve a Corner", colorInfo );
		</script>
	</div>
</div>