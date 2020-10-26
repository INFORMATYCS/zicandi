<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <style>
        h1{
        text-align: center;
        text-transform: uppercase;
        }
        h3{
        text-align: center;
        text-transform: uppercase;
        }
        .contenidoPequeno{
        font-size: 12px;
        }
        .gris{
        background-color: #F2F4F4;
        }
        .amarillo{
        background-color: #FCF3CF;
        }
        

    </style>
    </head>
    <body>
        <h1>{{$datos["titulo"]}}</h1>        

        <table width="100%">
            <tr>
                <th width="90%" align ="left" class="gris">Fecha emision</th>
                <td align="right" class="amarillo">{{$datos["fecha"]}}</td>
            </tr>
            <tr>
                <th width="90%" align ="left" class="gris">Semana</th>
                <td align="right" class="amarillo">{{$datos["semana"]}}</td>
            </tr>
        </table>

        @php
        $totalEfectivo = 0;
        $totalDeposito = 0;
        $totalNoPago = 0;
        $totalPendiente = 0;        
        $total = 0;
        @endphp

        <table width="100%" class="contenidoPequeno">
            <tr>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th colspan="2">Cobro</th>                
                <th colspan="2">Bolsas</th>                
                <th>&nbsp;</th>
                <th>&nbsp;</th>
            </tr>
            <tr>
                <th>Grupo</th>
                <th>Asociada</th>
                <th>Total productos</th>
                <th>Por recibir</th>
                <th>Recibido</th>
                <th>Por entregar</th>
                <th>Recibidas</th>
                <th>Forma de pago</th>
                <th>Estatus</th>
            </tr>
            @foreach ($datos["resumen"] as $value)
            <tr>
                <td style="border:1px solid black;" align="left">{{$value->grupo_entrega}}</td>
                <td style="border:1px solid black;" align="left">{{$value->nombre_asociada}}</td>
                <td style="border:1px solid black;" align="center">{{$value->total_productos}}</td>
                <td style="border:1px solid black;" align="right">${{$value->monto_cobrar}}</td>
                <td style="border:1px solid black;" align="right">${{$value->monto_recibido}}</td>
                <td style="border:1px solid black;" align="center">{{$value->bolsas_entregar}}</td>
                <td style="border:1px solid black;" align="center">{{$value->bolsas_recibir}}</td>
                @if ($value->metodo_pago == "EFE")
                <td style="border:1px solid black;" align="left">EFECTIVO</td>
                @elseif ($value->metodo_pago == "NO")
                <td style="border:1px solid black;" align="left">SIN PAGO</td>
                @elseif ($value->metodo_pago == "DEP")
                <td style="border:1px solid black;" align="left">DEPOSITO</td>
                @else
                <td style="border:1px solid black;" align="left"></td>
                @endif
                
                <td style="border:1px solid black;" align="left">{{$value->estatus}}</td>
            </tr>

            @php
                if($value->estatus=="EN CURSO" || $value->estatus=="POSPONE"){
                    $totalPendiente+=$value->monto_cobrar;
                    $total+=$value->monto_cobrar;
                }else{
                    if($value->metodo_pago == "EFE"){
                        $totalEfectivo+=$value->monto_recibido;
                    }else if($value->metodo_pago == "NO"){
                        $totalNoPago+=$value->monto_recibido;
                    }else if($value->metodo_pago == "DEP"){
                        $totalDeposito+=$value->monto_recibido;
                    }

                    $total+=$value->monto_recibido;
                }
            @endphp
            @endforeach
        </table>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <h3>Distribucion Dinero</h3>
        <h3 class="gris">${{$total}}</h3>
        <table width="100%">
            <tr>
                <th width="25%" align ="center" class="gris">EFECTIVO</th>
                <th width="25%" align ="center" class="gris">DEPOSITO</th>
                <th width="25%" align ="center" class="gris">SIN PAGO</th>
                <th width="25%" align ="center" class="gris">PENDIENTE</th>
            </tr>
            <tr>                
                <td align="right" class="amarillo">${{$totalEfectivo}}</td>
                <td align="right" class="amarillo">${{$totalDeposito}}</td>
                <td align="right" class="amarillo">${{$totalNoPago}}</td>
                <td align="right" class="amarillo">${{$totalPendiente}}</td>
            </tr>
        </table>
        


    </body>
</html>


