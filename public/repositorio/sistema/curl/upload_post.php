<?php
/*Directorio a guardar el archivo */
$directorySave = "../../entrada/log_batch/";

/*se obtiene el archivo a guardar mediante la variable que enviamos por el post, en este caso data*/
$fileSave = $directorySave . date("dmY").basename($_FILES["data"]["name"]);

/*se valida que existe el archivo*/
if (file_exists($fileSave))
{
     /*Se elimina archi si existe*/
     unlink($fileSave);
}

/*Se valida tamaño del archivo*/
if ($_FILES["data"]["size"] > 2000000)
{
    echo "Max size of file is reached: FAIL";
}

/*movemos el arcvho a la ruta mencionada anteriormente, allí se va a guaradr el archivo con la exptensión que heos pedido*/
if (move_uploaded_file($_FILES["data"]["tmp_name"], $fileSave))
{
    echo date("dmY").basename($_FILES["data"]["name"]); 
}
else
{
    echo "FAIL"; 
}