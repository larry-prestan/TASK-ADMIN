<?php
    //incluimos la conexion//
    include ('./conexion-db.php');

    $tarea = $_POST['tarea'];

    if(isset($tarea) && !empty($tarea)){
        $sql = " SELECT * FROM task WHERE taskname LIKE '%$tarea%' ";
        $res = mysqli_query($conn,$sql);
        $datos = json_encode(mysqli_fetch_all($res));

        echo $datos;
    }

?>