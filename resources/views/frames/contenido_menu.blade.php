<div class="sidebar">
    <nav class="sidebar-nav">
        <ul class="nav">
            <li @click="oppMenuSeleccion=0" class="nav-item" href="#">
                <a class="nav-link active" href="main.html"><i class="icon-speedometer"></i> Escritorio</a>
            </li>
            <li class="nav-title">
                M E N U ° P R I N C I P A L
            </li>
            <li class="nav-item nav-dropdown">
                <a class="nav-link nav-dropdown-toggle" href="#"><i class="icon-notebook"></i> Catalogos</a>
                <ul class="nav-dropdown-items">                    
                    <li class="nav-item">
                        <a @click="oppMenuSeleccion=2" class="nav-link" href="#"><i class="icon-bag"></i> Productos</a>
                    </li>
                    <li class="nav-item">
                        <a @click="oppMenuSeleccion=3" class="nav-link" href="#"><i class="icon-bag"></i> Almacenes</a>
                    </li>                    
                </ul>
            </li>
            <li class="nav-item nav-dropdown">
                <a class="nav-link nav-dropdown-toggle" href="#"><i class="icon-wallet"></i> Compras</a>
                <ul class="nav-dropdown-items">
                    <li class="nav-item">
                        <a @click="oppMenuSeleccion=1" class="nav-link" href="#"><i class="icon-bag"></i> Proveedores</a>
                    </li>
                    <li class="nav-item">
                        <a @click="oppMenuSeleccion=11" class="nav-link" href="#"><i class="icon-wallet"></i> Ingresos</a>
                    </li>
                    
                </ul>
            </li>

            <li class="nav-item nav-dropdown">
                <a class="nav-link nav-dropdown-toggle" href="#"><i class="icon-wallet"></i> Tiendas</a>
                <ul class="nav-dropdown-items">
                    <li class="nav-item">
                        <a @click="oppMenuSeleccion=13" class="nav-link" href="#"><i class="icon-bag"></i> Cuentas</a>
                    </li>
                    <li class="nav-item">
                        <a @click="oppMenuSeleccion=14" class="nav-link" href="#"><i class="icon-bag"></i> Publicaciones</a>
                    </li>
                    <li class="nav-item">
                        <a @click="oppMenuSeleccion=17" class="nav-link" href="#"><i class="icon-bag"></i> Ventas</a>
                    </li>
                    
                    
                </ul>
            </li>

            <li class="nav-item nav-dropdown">
                <a class="nav-link nav-dropdown-toggle" href="#"><i class="icon-wallet"></i> Generales</a>
                <ul class="nav-dropdown-items">
                    <li class="nav-item">
                        <a @click="oppMenuSeleccion=12" class="nav-link" href="#"><i class="icon-bag"></i> Herramientas</a>
                    </li>
                    
                    
                </ul>
            </li>


            <li class="nav-item nav-dropdown">
                <a class="nav-link nav-dropdown-toggle" href="#"><i class="icon-wallet"></i> Betterware</a>
                <ul class="nav-dropdown-items">
                    <li class="nav-item">
                        <a @click="oppMenuSeleccion=15" class="nav-link" href="#"><i class="icon-bag"></i> Asociadas</a>
                    </li>
                    <li class="nav-item">
                        <a @click="oppMenuSeleccion=16" class="nav-link" href="#"><i class="icon-bag"></i> Orden Entregas</a>
                    </li>
                    
                    
                </ul>
            </li>

            <li class="nav-item nav-dropdown">
                <a class="nav-link nav-dropdown-toggle" href="#"><i class="icon-wallet"></i> Contabilidad</a>
                <ul class="nav-dropdown-items">
                    <li class="nav-item">
                        <a @click="oppMenuSeleccion=18" class="nav-link" href="#"><i class="icon-bag"></i> Saldos contables</a>
                    </li>
                </ul>
            </li>

            
            <li class="nav-item">
                <a class="nav-link" href="#"><i class="icon-book-open"></i> Ayuda <span class="badge badge-danger">PDF</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#"><i class="icon-info"></i> Acerca de...<span class="badge badge-info">IT</span></a>
            </li>
        </ul>
    </nav>
    <button class="sidebar-minimizer brand-minimizer" type="button"></button>
</div>