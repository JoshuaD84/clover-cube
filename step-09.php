<?php include 'header.php'; ?>

<p>Now we have to put the corners into their proper positions. Don't worry about rotating them. We'll do that next. Your only job is to make sure they're in the right <strong>place</strong>.</p>

<p>The moves we have move three corners at a time, either clockwise or counterclockwise: </p>

<div class="cube-box">
	<div id="position-corners-CW" class="cube-demo">
		<script>showCube( "OB, OW, OB, OY, OB, OW, OB, OY", "Position Corners CW" )</script>
	</div>
	<div id="position-corners-CCW" class="cube-demo">
		<script>showCube( "OY, OB, OW, OB, OY, OB, OW, OB", "Position Corners CWW" )</script>
	</div>
</div>

<p>Sometimes, you might have to combine these moves in different positions to solve the issues we have. Here's an example: 

<div class="cube-box">
	<div id="position-corners-CW-CCW" class="cube-demo">
		<script>showCube( "OB, OW, OB, OY, OB, OW, OB, OY, OG, OY, OB, OY, OG, OY, OB, OY", "Position Corners CW/CCW" )</script>
	</div>
</div>
