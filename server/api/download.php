<?php

// Download modules
if(isset($_GET["module"])){

    $module = $_GET["module"];
    $dirPath= __DIR__ . "/../public/modules/glm/$module";
    
    // Create HTML from PHP Template and parameters
    $module_template = $dirPath . "/index.php";
    if(!file_exists($module_template)){
        http_response_code(404);
        echo ("Module PHP template not found.");
        exit;
    }

    // Create ZIP
    $zipName = "$module.zip";
    $zipPath = sys_get_temp_dir() . "/$zipName";
    $zip = new ZipArchive();

    if($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE)){
        
        // traverse the module directory
        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($dirPath), RecursiveIteratorIterator::LEAVES_ONLY
        );
        
        // add each dir in the archive
        foreach($files as $file){
            if(!$file->isDir()){
                $filePath = $file->getRealPath();
                $relativePath = substr($filePath, strlen($dirPath)+1);

                //skip index.php template
                if (str_ends_with($relativePath, 'index.php')) {
                    continue;
                }

                $zip->addFile($filePath,$relativePath);
            }
        }

        // Render HTML from PHP template
        ob_start(); // Output Buffer: says to PHP to remember everything that would be outputted normally
        include $module_template; // include module PHP Template in buffer (with parameters applied)
        $htmlContent = ob_get_clean();
        $zip->addFromString('index.html',$htmlContent); // add rendered HTML file

        $zip->close();

        // compose response
        header("Content-Type: application/zip");
        header("Content-Disposition: attachment; filename='".$zipName."'");
        header("Content-Length: " . filesize($zipPath));
        readfile($zipPath);

        // clean up temp
        unlink($zipPath);
        
        exit;
    }else{
        http_response_code(500);
        echo "Failed to create zip";
    }
    
}

