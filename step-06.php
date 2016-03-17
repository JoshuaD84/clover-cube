<?php include 'header.php'; ?>
<div class="cube-box">
	<div id="finish-layer" class="cube-demo">
		<script>
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			colorInfo.show = 	[ 
										"R1", "R2", "R3", "R4", 
										"W3", "W4", 
										"G1", "G4", 
										"Y1", "Y2",
										"B2", "B3", 
										"BW", "RW", "BR", "GR", "GW", "RY", "BY", "GY",
										"GRW", "BRW", "BRY", "GRY"
									];
			showCube( "", "Finish Layer", colorInfo );
		</script>
	</div>
</div>
<p>Ok, now we have to finish the bottom layer (like in the cube above).</p>
<p>It's easier if you flip the cube over at this point, switching what you think of as "top".  Put the clover you just finished as the bottom, and work from there. You'll have better visibility.</p>
<p>Up to this point in the tutorial, we've been working on the orange side. I'm going to switch it and have the work we've done be on the red side instead, because we want the unfinished part to be on top and in front of us.</p>
<p>We do the exact same thing twice in this step: in the top layer, pair up the corner with its two faces, and then rotate it into place.</p>

<p>Here's an example of the first corner:</p>

<div class="cube-box">
	<div id="finish-layer-ex-1" class="cube-demo">
		<script>
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			colorInfo.show = 	[ 
										"R1", "R2", "R3", "R4", 
										"W4", 
										"G4", 
										"Y1", "Y2",
										"B2", "B3", 
										"BW", "RW", "BR", "GR",  "RY", "BY", "GY",
										"BRW", "BRY", "GRY"
									];
			showCube( "OY, BW, OW, OB, OY, OW, BO, OW, BW", "First Corner", colorInfo );
		</script>
	</div>
</div>

<p>And here's an example of the second corner:</p>

<div class="cube-box">
	<div id="finish-layer-ex-2" class="cube-demo">
		<script>
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			colorInfo.show = 	[ 
										"R1", "R2", "R3", "R4", 
										"W3", "W4", 
										"G1", "G4", 
										"Y1", "Y2",
										"B2", "B3", 
										"BW", "RW", "BR", "GR", "GW", "RY", "BY", "GY",
										"BRW", "BRY", "GRY", "GRW"
									];
			showCube( "BO, OY, GO, OW, GW, GO, GW, GO, OW, GW", "Second Corner", colorInfo );
		</script>
	</div>
</div>
