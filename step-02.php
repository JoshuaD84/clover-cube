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
<div class="cube-box">
	<div id="swap-faces-1" class="cube-demo">
		<script>
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			colorInfo.show = [ "O4", "W2" ];
			showCube( "OW-2, BO2, OW, BO-2, OW2", "Fix Face Parity 1", colorInfo );
		</script>
	</div>
	<div id="swap-faces-2" class="cube-demo">
		<script>
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			colorInfo.show = [ "O1", "O2", "O3", "O4", "W1", "W2", "W3", "W4" ];
			showCube( "OW1, BO2, OW3, BO-2, OW2", "Fix Face Parity 2", colorInfo );
		</script>
	</div>
	<div id="swap-faces-3" class="cube-demo">
		<script>
			//Change blue to orange
			//change orange to white
			//change white to {BG}
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			colorInfo.show = [ "O1", "W2" ];
			showCube( "BO, BW2, BO-2, BW, BO2, BW-2, BO", "Fix Face Parity 3", colorInfo );
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
