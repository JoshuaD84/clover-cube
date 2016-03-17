<?php include 'header.php'; ?>

<div id="intro-cube" class="cube-demo center big">
	<script>
		showCube( 
			//Step 1
			"BY-2, RW2, GR1, YG-2, " + 
			"BO-1, GW-1, OW-1, BO1, GW1, BO, GO, OY2, BO1, OY-2, BO-1, " +
			//Step 2 goes here
			//Step 3
			"OY, GW, GO, GR, BW, RW, BW, OW, " + 
			//Step 4 goes here
			//Step 5 goes here
			//Step 6 goes here
			//Step 7 goes here
			//Step 8: Flip one center
			"OW-1, GO-2, OW, GO2, OW-1, BO2, OW, BO-2, OW-1, " + 
			//Step 9: Position Corneers
			"OB, OW, OB, OY, OB, OW, OB, OY, " + 
			//Step 10: rotate corners
			"BO, OW, OY-3, GO, OW-3, OY, BO, OW, OY-3, GO, OW-3, OY", 
			"The Clover Cube" 
		);
	</script>
</div>
<h2>About the Clover Cube</h2>
<p>The Clover Cube is a 3-dimensional rotation puzzle. It's similar to the Rubik's Cube, but has a completely unique solution.</p>

<p>The one I own is produced by the company LanLan under the name "Four-Leaf-Clover Magic Cube."</p>

<p>Maria got me this puzzle for my 32nd birthday. Sometimes, I'm still a kid. I was so excited to have a new toy to play with.<p>

<p>If you already know how to solve a rubik's cube, you'll notice that my solution (and the layout of this tutorial) is similar in approach to the <a rel="nofollow" href="http://lar5.com/cube/" target="_blank">Petrus Method</a>. Thanks to Lars for teaching me how to solve a rubik's cube so many years ago.</p>

<p>Also, if you already know how to solve a rubik's cube, I think you should try to figure out how to solve this yourself. It's definitely doable, and is very rewarding.</p>

<p>This is a solution to the puzzle that I initially developed over the period of two weeks. I will continue to hone this tutorial as I find new and interesting tools, but there's more than enough here to solve every problem you might run into.</p>

<p><strong>This tutorial requires a modern browser and javascript enabled.</strong> It uses WebGL (via three.js) to render the cubes, so an old browser probably won't work. I know that facebook's mobile browser doesn't currently work.</p>

<h2>Version</h2>
We are currently on version 0.8 of this tutorial, last updated on 3/16/2016.
