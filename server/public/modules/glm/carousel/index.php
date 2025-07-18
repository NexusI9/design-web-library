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
  <section class="glm-carousel-wrapper" draggable="false"
     data-curve=<?= $_GET["data-curve"] ?? "\"outward\"" ?>
     data-direction=<?= $_GET["data-direction"] ?? "\"right\"" ?>
     data-picture-width=<?= $_GET["data-picture-width"] ?? "\"340\"" ?>
     data-picture-height=<?= $_GET["data-picture-height"] ?? "\"544\"" ?>
     data-border-radius=<?= $_GET["data-border-radius"] ?? "\"12\"" ?>
     data-border-smooth=<?= $_GET["data-border-smooth"] ?? "\"4\"" ?>
     data-invert-drag=<?= $_GET["data-invert-drag"] ?? "\"false\"" ?>
     data-invert-drag=<?= $_GET["data-speed"] ?? "\"1\"" ?>
     >
    <ul class="glm-carousel-list">
      <li><img class="glm-carousel-picture" src=
      "./assets/thumbnails/sample.jpg" data-full-picture=
      "./assets/sample.jpg" alt="sample picture"></li>
      <li><img class="glm-carousel-picture" src=
      "./assets/thumbnails/sample-2.jpg" data-full-picture=
      "./assets/sample-2.jpg" alt="sample picture"></li>
      <li><img class="glm-carousel-picture" src=
      "./assets/thumbnails/sample-3.jpg" data-full-picture=
      "./assets/sample-3.jpg" alt="sample picture"></li>
      <li><img class="glm-carousel-picture" src=
      "./assets/thumbnails/sample-4.jpg" data-full-picture=
      "./assets/sample-4.jpg" alt="sample picture"></li>
    </ul>
  </section>
  <div class="glm-carousel-viewer">
  <div class="glm-carousel-viewer-close"></div><img src=
  "./assets/sample.jpg" class="glm-carousel-viewer-picture" alt=
  "viewer picture"></div>
  <script type="module" src="./dist/index.js"></script> 
  <!--MODULE END-->
</body>
</html>
