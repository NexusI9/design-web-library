<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content=
  "width=device-width, initial-scale=1.0">
  <title>Carousel slider</title>
  <link rel="stylesheet" href="./dist/index.css">
</head>
<body>
  <!--MODULE BEGIN-->
  <div class="glm-slideshow"
     data-transition-type=<?= $_GET["data-transition-type"] ?? "default" ?>
     data-transition-duration=<?= $_GET["data-transition-duration"] ?? "1500" ?>
     data-slide-duration=<?= $_GET["data-slide-duration"] ?? "1500" ?>
     data-mode=<?= $_GET["data-mode"] ?? "automatic" ?>
   >
    
    <img class="glm-slideshow-img" alt=
  "galaxy picture" src="./assets/picture-1.jpg"> <img class=
  "glm-slideshow-img" alt="galaxy picture" src=
  "./assets/picture-2.jpg"></div>
  <script type="module" src="./dist/index.js"></script> 
  <!--MODULE END-->
</body>
</html>
