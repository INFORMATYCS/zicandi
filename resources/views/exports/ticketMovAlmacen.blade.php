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

        .circulo {
            width: 10px;
            height: 10px;
            -moz-border-radius: 50%;
            -webkit-border-radius: 50%;
            border-radius: 50%;
            background: #5cb85c;
        }
    </style>
</head>
@php
$totalIngresos = 0;
$totalRetiros = 0;
$total = 0;

$totalIngresosPiezas = 0;
$totalRetirosPiezas = 0;
$totalPiezas = 0;
@endphp

<body>
    <div class="ticket centrado">
        <h1>RESUMEN MOVIMIENTO</h1>
        <h1>ALMACEN</h1>
        <p>&nbsp;</p>
        <h2>MARSELLA</h2>
        <h2>{{$datos["fecha"]}}</h2>
        <p>&nbsp;</p>
        <h1>{{$datos["loteReferencia"]}}</h1>
        <p>&nbsp;</p>

        @foreach ($datos["tabla"] as $value)
        <table width=100%;>            
            <tbody>                
                    <tr>
                        <td class="izq"><strong>{{$value->codigo}}</strong></td>
                        <td colspan="2" class="producto">{{$value->nombre}}</td>                        
                    </tr>
                    <tr>
                        <td class="izq"><h2>{{$value->ubicacion}}</h2></td>
                        <td class="producto"><strong>{{$value->cantidad}}</strong></td>          
                        <td class="precio">{{$value->stock}}</td>                                      
                    </tr>                
            </tbody>            
        </table>
        <hr>

        @php
            if($value->tipo_movimiento=="RET"){
                $totalRetiros++;
                $totalRetirosPiezas+=$value->cantidad*-1;
            }else{
                $totalIngresos++;
                $totalIngresosPiezas+=$value->cantidad;
            }

            $total++;            
        @endphp
        @endforeach
        
        <p>&nbsp;</p>        
        <p class="centrado"><strong>.::RESUMEN::.</strong></p>
        <table width=100%;>
            <tr>
                <td class="centrado">Retiros</td>
                <td class="centrado">Ingresos</td>
                <td class="centrado">Total</td>
            </tr>
            <tr>
                <td class="centrado">{{$totalRetiros}}</td>
                <td class="centrado">{{$totalIngresos}}</td>
                <td class="centrado">{{$total}}</td>
            </tr>
            <tr>
                <td class="centrado">{{$totalRetirosPiezas}}</td>
                <td class="centrado">{{$totalIngresosPiezas}}</td>
                <td class="centrado">{{$totalIngresosPiezas + $totalRetirosPiezas}}</td>
            </tr>
        </table>        
        <p></p>
    </div>
</body>

</html>