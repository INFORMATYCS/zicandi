<!DOCTYPE html>
<html>

<head>

    <style>
        * {
            font-size: 12px;
            font-family: 'DejaVu Sans', serif;
        }

        h1 {
            font-size: 18px;
        }

        .ticket {
            margin: 2px;
        }

        td,
        th,
        tr,
        table {            
            border-collapse: collapse;
            margin: 0 auto;
        }

        td.precio {
            text-align: right;
            font-size: 11px;
        }

        td.cantidad {
            font-size: 11px;
        }

        td.producto {
            text-align: center;
        }

        .izq {
            text-align: left;
        }

        th {
            text-align: center;
        }


        .centrado {
            text-align: center;
            align-content: center;
        }

        .ticket {
            width: 280px;
            max-width: 280px;
        }

        img {
            max-width: inherit;
            width: inherit;
        }

        * {
            margin: 0;
            padding: 0;
        }

        .ticket {
            margin: 0;
            padding: 10;
        }

        body {
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="ticket centrado">
        <h1>RESUMEN UBICACION</h1>
        <h1>{{$datos["ubicacion"]}}</h1>
        <p>&nbsp;</p>
        <h2>{{$datos["fecha"]}}</h2>
        
        <p>&nbsp;</p>

        
        <table width=100%;>            
            <tbody>      
            @foreach ($datos["tabla"] as $value)          
                    <tr>
                        <td class="izq"><strong>{{$value->codigo}}</strong></td>
                        <td class="izq">{{substr($value->nombre,0,20)}}</td>   
                        <td class="precio">{{$value->stock}}</td>                                                           
                    </tr>                           
                    <tr>
                        <td class="centrado" colspan="3">.   .   .   .   .   .</td>                        
                    </tr>
            @endforeach
            </tbody>            
        </table>
        

    </div>
</body>

</html>