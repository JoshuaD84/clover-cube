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
</div>

<p>The next step is to solve a corner, like in the picture above.</p>
<p>This means you propery postion and orient a corner piece, three faces, and two centers.</p>
<p><strong>From here until the end of the puzzle, you should only need to do 180 degree twists. Don't do any intermediate twists, or you will mess up the face pieces.</strong></p>
<p>We no longer care about the clovers we built in the last step. You can mess them up. As long as you don't do any intermediate twists, they'll be easy to put back together later when we need them.</p>
<p>I usually start by putting the corner where it belong, then adding a face one at a time.</p>
<p>This step can be done mostly with intuition. It might be a good idea to spend a lot of time practicing this one. If you get very familiar with how the pieces move, that will help you with the rest of the puzzle.</p>
<p>Here's an example of what a solution might look like. This was a fortunate positioning of pieces:</p>
<div class="cube-box">
	<div id="solve-corner" class="cube-demo">
		<script>
			var colorInfo = {};
			colorInfo.greyColors = [ "B", "G", "O", "R", "W", "Y" ];
			colorInfo.show = [ "O1", "W2", "B4", "BW", "OW", "BO", "BOW" ];
			showCube( "OY, GW, GO, GR, BW, RW, BW, OW", "Solve a Corner", colorInfo );
		</script>
	</div>
</div>