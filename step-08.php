<?php include 'header.php'; ?>

<div class="cube-box">
	<div id="center-corner-orient" class="cube-demo">
		<script>
			//Change blue to orange
			//change orange to white
			//change white to {BG}
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			colorInfo.show = [ "O1", "O2", "O3", "O4", "OW", "GO", "BO", "OY", "W1", "W2", "W3", "W4" ];
			showCube( "OW-1, GO-2, OW, GO2, OW1, OW-2, BO2, OW, BO-2, OW-1", "Flip One Center", colorInfo );
		</script>
	</div>
	<div id="flip-centers" class="cube-demo">
		<script>
			//Change blue to orange
			//change orange to white
			//change white to {BG}
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			colorInfo.show = [ "O1", "O2", "O3", "O4", "OW", "GO", "BO", "OY" ];
			showCube( "OW, OB, OY, OG, OW, OB, OY, OG, OW, OB, OY, OG", "Flip Four Centers", colorInfo );
		</script>
	</div>
</div>
