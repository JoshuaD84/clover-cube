<?php include 'header.php'; ?>

<div id="anatomy-cube" class="cube-demo center big">
	<script>
		showCube( "", "The Clover Cube" );
	</script>
	<a style="display: block; text-align: center" href="javascript:void(0)" onclick="lattices['anatomy-cube'].showAllColors()">Reset Colors</a>
</div>
	
<ul>
	<li><strong><a href="javascript:void(0)" onmouseover="lattices['anatomy-cube'].showOnlyCenters();">Centers</a></strong><ul>
			<li>There are twelve centers.</li>
			<li>Each center has two colors.</li>
			<li>Each color has four centers.</li>
			<li>No two centers have the same colors.</li>
			<li>Centers can't move relative to each other. They have a fixed position.</li>
			<li>However, centers can rotate.</li>
		</ul>
	</li>
	<li>
		<strong><a href="javascript:void(0)" onmouseover="lattices['anatomy-cube'].showOnlyFaces();">Faces</a></strong>
		<ul>
			<li>There twenty-four faces.</li>
			<li>Each face has only one color.</li>
			<li>Each color has four faces.</li>
			<li>That means ther are four faces in each color that look identical.</li>
			<li>Every face is shared by two centers.</li>
		</ul>
	</li>
	<li>
		<strong><a href="javascript:void(0)" onmouseover="lattices['anatomy-cube'].showOnlyCorners();">Corners</a></strong>
		<ul>
			<li>There are eight corners.</li>
			<li>Each corner has three colors.</li>
			<li>Each color has four corners.</li>
			<li>No corners have the same three colors.</li>
			<li>Every corner is shared by three centers.</li>
		</ul>
	</li>
	<li>
		<strong>Rotations</strong>
		<ul>
			<li>Every rotation happens around a center.</li>
			<li>Each rotation has three orientations.</li>
			<li>When a center rotates, it always brings two corners and four faces with it.</li>
			<li>Sometimes, you can't rotate a certain center. You'll have to align the nearby centers to allow for the rotation.</li>
		</ul>
	</li>
</ul>

















