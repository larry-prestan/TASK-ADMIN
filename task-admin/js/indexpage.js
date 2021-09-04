$(function() {

    //muestro las tareas ya creadas//
    listartareas();

    //ocultar div de resultados de busqueda//
    $("#lista-busqueda").hide();

    //agregar una tarea//
    $("#boton-agregartarea").click(function(e) {
        let datostarea = $("#form-tarea").serialize();
        $.ajax({
            type: "post",
            url: "./backend/agregar-tarea.php",
            data: datostarea,
            success: function(res) {
                if (res == "datos incompletos") {
                    alert(" NO SE PUDO CREAR LA TAREA, DATOS INCOMPLETOS, PORFAVOR VERIFICAR ");
                } else if (res == "existente") {
                    alert(" TAREA YA EXISTE. INTENTE CREAR UNA NUEVA TAREA ");
                    $("#form-tarea")[0].reset();
                } else if (res == 1) {
                    alert("TAREA CREADA CON EXITO...");
                    $("#datos-tabla").empty();
                    listartareas();
                    $("#form-tarea")[0].reset();
                }
            }
        });
        e.preventDefault();
    });

    //listar tareas agregadas//
    function listartareas() {
        $.ajax({
            type: "get",
            url: "./backend/listar-tareas.php",
            success: function(res) {
                let datostarea = JSON.parse(res);
                tabla = ``;
                datostarea.forEach(dato => {
                    tabla += `
                    <tr>
                        <td>` + dato[0] + `</td>
                        <td>` + dato[1] + `</td>
                        <td>` + dato[2] + `</td>
                    </tr>
                    `;
                });
                $("#datos-tabla").append(tabla);
            }
        });
    }

    //buscar tareas//
    $("#boton-buscartarea").click(function(e) {
        let tarea = $("#nombre-tarea").val();
        $.ajax({
            type: "post",
            url: "./backend/buscar-tarea.php",
            data: { tarea },
            success: function(res) {
                if (res) {
                    let datos = JSON.parse(res);
                    li = ``;
                    datos.forEach(dato => {
                        li += `
                        <li class="list-group-item ml-auto">Tarea: ` + dato[1] + `</li>
                        `;
                    });
                    $('.list-group').append(li);
                    $("#lista-busqueda").show();

                } else {
                    alert(" NO EXISTE ESTE CRITERIO DE BUSQUEDA... ")
                }

            }
        });
        $("#nombre-tarea").val("");
        e.preventDefault();

    });

    //cerrar listado de busqueda//
    $("#boton-salirlistadobusqueda").click(function(e) {
        $('.list-group').empty();
        $("#lista-busqueda").hide();
        $("#nombre-tarea").val("");
        e.preventDefault();

    });

});