<table>
    <thead>
    <tr>        
        <th style="background-color: #B9C636;">Nombre Almacen</th>        
        <th style="background-color: #46FF33;">Codigo</th>
        <th style="background-color: #46FF33;">Nombre</th>
        <th style="background-color: #46FF33;">Ubicacion</th>
        <th style="background-color: #46FF33;">Stock</th>        
    </tr>
    </thead>
    <tbody>
    @foreach($stock as $s)
        <tr>            
            <td>{{ $s->almacen }}</td> 			
            <td>{{ $s->codigo }}</td> 			
            <td>{{ $s->producto }}</td>
            <td>{{ $s->codigo_ubica }}</td> 
            <td>{{ $s->stock }}</td>                                            
        </tr>
    @endforeach
    </tbody>
</table>