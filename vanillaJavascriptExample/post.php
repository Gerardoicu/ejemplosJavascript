<?php
$usuario = $_POST['usuario'];
$password = $_POST['password'];
if($usuario === '' ||$password === ''){
    echo json_encode('error');
}
else{
    echo json_encode('Correcto <br> Usuario :'.$usuario.'<br> Password: '.$password);
}
?>