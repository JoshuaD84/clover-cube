<?php include 'header.php'; ?>
<div class="cube-box">
	<div id="finish-layer" class="cube-demo">
		<script>
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			colorInfo.show = 	[ 
										"O1", "O2", "O3", "O4", 
										"W1", "W2", 
										"G3", "G2", 
										"Y3", "Y4",
										"B1", "B4", 
										"BW", "OW", "BO", "GO", "GW", "OY", "BY", "GY",
										"GOW", "BOW", "BOY", "GOY"
									];
			showCube( "", "Finish Layer", colorInfo );
		</script>
	</div>
</div>