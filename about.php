<?php include 'header.php'; ?>
<p>I wrote this tutorial mostly as an excuse to mess around with WebGL.</p>

<p>Maria got me the puzzle for my birthday in 2016 and I enjoyed unlocking all of its secrets without a tutorial. Once I realized I had a complete solution method, I thought it'd be cool to publish it in a way similar to the <a href="http://lar5.com/cube/" target="_blank" ref="nofollow">Petrus tutorial</a> for the rubiks' cube. That method uses embedded java applets, but because I program in Java a lot, I wanted to try something else. I settled on WebGL via three.js, which is a javascript library.</p>

<p>Interestingly, I didn't realize I needed step 8 until I was a good part of the way through solving this tutorial. Everytime I played with the thing, the faceplates of my center pieces would pop off. So whenver I got to step 8, I assumed it was just an illegal position, and physically removed and rotated the center's faceplate. Eventually I realized it was a legitimate position.</p>

<h2>How It Was Made</h2>

<p>I started by making a model in <a href="https://www.blender.org/" target="_blank" rel="nofollow">blender</a>. I had no previous experience with that tool, so it took some getting used to. The blender stack exchange was helpful, as were a handful of tutorials I found online (and have since lost, so I unfortunately can't give the authors credit).</p>

<p>I spent a little time thinking of how I could possible model each piece, but it looked painful and I didn't think I'd be able to get them to line up neatly without a lot of painstaking work.</p>

<p>Maria brilliantly pointed out the pieces of the cube could be described as the intersection of a handful of spheres with a cube, and that worked wonderfully. She even did the math for me (interestingly: the radius of the sphere equals the length of the side of the cube). You can see some screenshots below of that process (#1 - #6). If I were doing it all over again, I'd have chosen a slightly higher resolution for spheres (make them more round) and I would have taken advantage of mirroring a bit more. In either case, I got over the finish line in a few nights of messing with blender.</p>

<p>Once I had the basic model, I got it rendering in the browser, and slowly built up the code base. Interestingly, each piece of the cube is represented by a darker model that is the shape of the piece, and then 1-3 stickers that sit very close to the piece, but are seperate models. This was necessary to get multiple colors on each block.</p>

<p>I didn't love working with javascript, but I eventually got the hang of it. The dynamic structure makes it a little easier to code up front (you can build the data structures on an as-needed basis) but it also requires that I remember my interfaces. On the whole, I definitely prefer a statically typed langauge like Java, but this was fun.</p>

<h2>Cube Imperfections</h2>

<p>The cube I own (and used for the models) has some obvious imperfections: pieces run into each other when they rotate. I imagine using a slightly different radius would allow for smoother rotations, but I haven't gotten around to calculating the right number.</p>

<h2>Source Code</h2>

<p>The source code for this project is hosted on <a href="https://github.com/JoshuaD84/clover-cube" target="_blank" rel="nofollow">my github page</a>, under the <a href="http://www.gnu.org/licenses/gpl-3.0.html" rel="nofollow" target="_blank">GNU GPL v3.</a></p>

<h2>Progress Screenshots</h2>
<img class="ngg_displayed_gallery mceItem" src="http://www.joshuad.net/nextgen-attach_to_post/preview/id--536" alt="" data-mce-placeholder="1" />