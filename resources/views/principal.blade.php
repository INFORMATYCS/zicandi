<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Administra ventas y compras tiendas en linea">
    <meta name="author" content="nunduva.com">
    <meta name="keyword" content="Sistema ventas Laravel Vue Js, Sistema compras Laravel Vue Js">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="shortcut icon" href="img/favicon.png">
    <title>ZICANDI</title>
    <!-- Hoja de estilo -->
    <link href="css/zicandi.css" rel="stylesheet">    
</head>

<body class="app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden">
    <div id="app">
        <header class="app-header navbar">
            <button class="navbar-toggler mobile-sidebar-toggler d-lg-none mr-auto" type="button">
            <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#"></a>
            <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button">
            <span class="navbar-toggler-icon"></span>
            </button>
            <ul class="nav navbar-nav d-md-down-none">
                <li class="nav-item px-3">
                    <a class="nav-link" href="#">Escritorio</a>
                </li>
                <li class="nav-item px-3">
                    <a class="nav-link" href="#">Configuraciones</a>
                </li>
            </ul>
            <ul class="nav navbar-nav ml-auto">
                <li class="nav-item">
                    <span class="badge badge-pill badge-warning" @click="oppMenuSeleccion=90">Conectado MELI</span>                    
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                        <img src="img/avatars/6.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
                        <span class="d-md-down-none">admin </span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                        <div class="dropdown-header text-center">
                            <strong>Cuenta</strong>
                        </div>
                        <a class="dropdown-item" href="#"><i class="fa fa-user"></i> Perfil</a>
                        <a class="dropdown-item" href="#"><i class="fa fa-lock"></i> Cerrar sesión</a>
                    </div>
                </li>
            </ul>
        </header>

        <div class="app-body">
            <!-- Inyecta menu -->
            @include('frames.contenido_menu')

            <!-- Contenido Principal -->
            @yield('contenido_main')

            <!-- /Fin del contenido principal -->
        </div>

    </div> <!-- Fin App-->

    <footer class="app-footer">
        <span><a href="http://www.incanatoit.com/">Zicandi - Eclipse</a> &copy; 2020</span>
        <span class="ml-auto">Desarrollado por Nunduva IT</span>
    </footer>

    <!-- JS -->
    <script src="js/app.js"></script>    
    <script src="js/zicandi.js"></script>    

</body>

</html>