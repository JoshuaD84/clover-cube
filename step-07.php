<?php include 'header.php'; ?>

<div class="cube-box">
	<div id="finish-layer-ex-2" class="cube-demo">
		<script>
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "W", "Y" ];
			colorInfo.show = 	[ 
										"W1", "W2", "W3", "W4", 
										"G1", "G2", "G3", "G4", 
										"Y1", "Y2", "Y3", "Y4",
										"B1", "B2", "B3", "B4",
										"O1", "O2", "O3", "O4",
										"BW", "RW", "BR", "GR", "GW", "RY", "BY", "GY",
										"BRW", "BRY", "GRY", "GRW"
									];
			showCube( "BO, OW, GO, OY, BO", "Finish Clovers", colorInfo );
		</script>
	</div>
</div>

<p>The goal here is to finish placing the remaining 12 faces.</p>
<p>Solve the "top" color last. Work on the four side colors first, and the top color will fall into place by itself.</p>
<p>If you try to solve the top first, you'll end up working around it, making things a lot harder.</p>
