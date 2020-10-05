<table>
    <thead>
    <tr>
        <th style="background-color: #B9C636;">ID</th>
        <th style="background-color: #B9C636;">Variante</th>
        <th style="background-color: #B9C636;">Titulo</th>
        <th style="background-color: #B9C636;">Define</th>
        <th style="background-color: #B9C636;">Precio</th>
        <th style="background-color: #B9C636;">Stock</th>
        <th style="background-color: #B9C636;">Ventas</th>
        <th style="background-color: #B9C636;">Visitas</th>
        <th style="background-color: #B9C636;">Envio Gratis</th>
        <th style="background-color: #B9C636;">Full</th>
        <th style="background-color: #B9C636;">Estatus</th>        
    </tr>
    </thead>
    <tbody>
    @foreach($publicacion as $p)
        <tr>
            <td>{{ $p->id_publicacion_tienda }}</td>
            <td>{{ $p->id_variante_publicacion }}</td>
            <td>{{ $p->titulo }}</td>
            <td>{{ $p->nombre_variante }}</td>
            <td>{{ $p->precio }}</td>
            <td>{{ $p->stock }}</td>
            <td>{{ $p->ventas }}</td>
            <td>{{ $p->visitas }}</td>
            <td>{{ $p->envio_gratis }}</td>
            <td>{{ $p->full }}</td>
            <td>{{ $p->estatus }}</td>            
        </tr>
    @endforeach
    </tbody>
</table>