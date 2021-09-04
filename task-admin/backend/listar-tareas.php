<?php
    //incluimos la conexion//
    include ('./conexion-db.php');

    $sql = " SELECT * FROM task ";
    $res = mysqli_query($conn,$sql);
    $datos = json_encode(mysqli_fetch_all($res));
    echo $datos;

?>