<!-- <!DOCTYPE html>
<body>

?php
    if(isset($_GET['total']) && !empty($_GET['total']) && 
    isset($_GET['nombre']) && !empty($_GET['nombre'])){
        $precio = $_POST['total'];
        $descripcion = $_POST['nombre'];
    }
    else{
        echo ('<h1>Error al procesar el pago</h1>');
        exit();
    }
?>
<form>
    ?php
    $key ='5b2e50243b90c07a57848c396e20afdb';
    $privateKey = '08d590039c53b1481b1b259b4adf962f';

    echo '
    <script
        src="https://checkout.epayco.co/checkout.js"
        class="epayco-button"
        data-epayco-key="$key"
        data-epayco-private-key="$privateKey"
        data-epayco-amount="$total"
        data-epayco-name="$nombre"
        data-epayco-description="$nombre"
        data-epayco-currency="cop"
        data-epayco-country="co"
        data-epayco-test="true"
        data-epayco-external="false"
        data-epayco-response="https://localhost/Views/principal/epayco/respuesta.php"
        data-epayco-confirmation="true"
        data-epayco-confirmation="https://localhost/Views/principal/epayco/confirmacion.php ">
    </script>';
    ?>
</form>
    
</body>
</html> -->