<table>
    <thead>
    <tr>
        <th style="background-color: #B9C636;">ID Almacen</th>
        <th style="background-color: #B9C636;">Nombre Almacen</th>
        <th style="background-color: #B9C636;">ID Producto</th>
        <th style="background-color: #B9C636;">Codigo</th>
        <th style="background-color: #B9C636;">Nombre</th>
        <th style="background-color: #B9C636;">Ultimo Precio Compra</th>
        <th style="background-color: #B9C636;">Precio Referenciado</th>
        <th style="background-color: #B9C636;">Precio Promedio Compra</th>
        <th style="background-color: #B9C636;">Stock</th>
        <th style="background-color: #B9C636;">Disponible</th>
        <th style="background-color: #B9C636;">Retenido</th>        
    </tr>
    </thead>
    <tbody>
    @foreach($stock as $s)
        <tr>            
            <td>{{ $s->id_almacen }}</td> 			
            <td>{{ $s->nombre_almacen }}</td> 			
            <td>{{ $s->id_producto }}</td>
            <td>{{ $s->codigo }}</td> 
            <td>{{ $s->nombre_producto }}</td>         
            <td>{{ $s->ultimo_precio_compra }}</td> 
            <td>{{ $s->precio_referenciado }}</td> 
            <td>{{ $s->promedio_precio_compra }}</td>                        
            <td>{{ $s->stock }}</td>                        
            <td>{{ $s->disponible }}</td>                        
            <td>{{ $s->retenido }}</td>                                    
        </tr>
    @endforeach
    </tbody>
</table>