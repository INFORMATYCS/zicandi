<table>
    <thead>
    <tr>
        <th style="background-color: #B9C636;">ID</th>
        <th style="background-color: #B9C636;">Total paquete</th>
        <th style="background-color: #B9C636;">ID paquete</th>
        <th style="background-color: #B9C636;">ID orden</th>
        <th style="background-color: #B9C636;">Fecha Venta</th>
        <th style="background-color: #B9C636;">ID publicacion</th>
        <th style="background-color: #B9C636;">ID Variante</th>
        <th style="background-color: #B9C636;">Titulo</th>
        <th style="background-color: #B9C636;">ID Pago</th>
        <th style="background-color: #B9C636;">Fecha Pago</th>
        <th style="background-color: #B9C636;">Monto Pago Cliente</th>        
        <th style="background-color: #B9C636;">Cantidad</th>
        <th style="background-color: #B9C636;">Precio Venta</th>
        <th style="background-color: #B9C636;">Comision</th>
        <th style="background-color: #B9C636;">ISR</th>
        <th style="background-color: #B9C636;">IVA</th>
        <th style="background-color: #B9C636;">Neto</th>
        <th style="background-color: #B9C636;">Precio Compra</th>
        <th style="background-color: #B9C636;">Utilidad</th>
        <th style="background-color: #B9C636;">Utilidad %</th>
        <th style="background-color: #B9C636;">ID Envio</th>
        <th style="background-color: #B9C636;">Nombre Cliente</th>
        <th style="background-color: #B9C636;">Direccion Entrega</th>
        <th style="background-color: #B9C636;">Metodo Envio</th>
        <th style="background-color: #B9C636;">Costo Envio Cliente</th>
        <th style="background-color: #B9C636;">Costo Envio Empresa</th>
        <th style="background-color: #B9C636;">Notas</th>
        <th style="background-color: #B9C636;">Estatus</th>


    </tr>
    </thead>
    <tbody>
    @foreach($ventas as $v)
        <tr>            
            <td>{{ $v->idVentaMeli }}</td> 			
            <td>{{ $v->totalPaquete }}</td>
            <td>{{ $v->idPaqueteMeli }}</td> 
            <td>{{ $v->idOrdenMeli }}</td>         
            <td>{{ $v->fechaVenta }}</td> 
            <td>{{ $v->idPublicacion }}</td> 
            <td>{{ $v->idVariante }}</td> 
            <td>{{ $v->titulo }}</td> 
            <td>{{ $v->idPago }}</td> 
            <td>{{ $v->fechaPago }}</td> 
            <td>{{ $v->montoPagoCliente }}</td> 
            <td>{{ $v->cantidad }}</td> 
            <td>{{ $v->precioVenta }}</td> 
            <td>{{ $v->comision }}</td> 
            <td>{{ $v->isr }}</td> 
            <td>{{ $v->iva }}</td> 
            <td>{{ $v->neto }}</td> 
            <td>{{ $v->ultimoPrecioCompra }}</td> 
            <td>{{ $v->utlMonto }}</td> 
            <td>{{ $v->utlPorcentaje }}</td> 
            <td>{{ $v->idEnvio }}</td>  
            <td>{{ $v->nombreCliente }}</td> 
            <td>{{ $v->direccionEntrega }}</td> 
            <td>{{ $v->metodoEnvio }}</td> 
            <td>{{ $v->costoEnvioCliente }}</td> 
            <td>{{ $v->costoEnvioEmpresa }}</td> 
            <td>{{ $v->nota }}</td> 
            <td>{{ $v->estatusVentaMeli }}</td>
           
        </tr>
    @endforeach
    </tbody>
</table>