<?php
  if(isset($_POST["save"]) && !empty($_POST["save"])){
    saveToFile();
  }

  function saveToFile($stringToSave){
    $object = new StdClass();
    $object->date_modified = time();
    $object->content = $stringToSave;
    $jsonString = json_endcode($object);
    if(file_put_contents("database.txt", $jsonString)){
        echo "success";
    }
 ?>
