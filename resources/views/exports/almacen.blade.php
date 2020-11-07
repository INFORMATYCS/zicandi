<table>
    <thead>
    <tr>
        <th style="background-color: #B9C636;">Codigo Producto</th>
        <th style="background-color: #B9C636;">Producto</th>
        <th style="background-color: #B9C636;">Ultimo Precio Compra</th>
        <th style="background-color: #B9C636;">ID almacen</th>
        <th style="background-color: #B9C636;">Nombre almacen</th>
        <th style="background-color: #B9C636;">Stock</th>
        <th style="background-color: #B9C636;">Fecha Consulta</th>
    </tr>
    </thead>
    <tbody>
    @foreach($stock as $s)
        <tr>            
            <td>{{ $s->id_producto }}</td> 			
            <td>{{ $s->nombre }}</td>
            <td>{{ $s->ultimo_precio_compra }}</td> 
            <td>{{ $s->id_almacen }}</td>         
            <td>{{ $s->almacen }}</td> 
            <td>{{ $s->stock }}</td> 
            <td>{{ $s->fecha_consulta }}</td>                        
        </tr>
    @endforeach
    </tbody>
</table>