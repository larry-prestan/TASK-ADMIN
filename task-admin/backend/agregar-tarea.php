<?php
    //incluimos la conexion//
    include ('./conexion-db.php');

    //recibionos los datos del formulario//
    $nombretarea = $_POST['tarea'];
    $descripciontarea = $_POST['descripcion-tarea'];

    //verificamos si la tarea ya esta creada//
    if(!empty($nombretarea)){
        $sql1 = " SELECT * FROM task WHERE taskname = '$nombretarea' ";
        $res1 = mysqli_query($conn,$sql1);
        $row = mysqli_num_rows($res1);
        if($row==1){
            echo "existente";
        }else{
            $sql2 = " INSERT INTO task (taskname,taskdescription) VALUES ('$nombretarea','$descripciontarea') ";
            $res2 = mysqli_query($conn,$sql2);
            echo $res2;
        }
    }else{
        echo "datos incompletos";
    }
?>