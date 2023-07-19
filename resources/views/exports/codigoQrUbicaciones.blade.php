<!DOCTYPE html>
<html>

<head>

    <style>
        * {
            font-size: 12px;
            font-family: 'DejaVu Sans', serif;
        }

        td,
        th,
        tr,
        table {            
            border-collapse: collapse;
            margin: 0 auto;
            border-spacing: 0;
        }

        img {
            max-width: inherit;
            width: inherit;
        }

        body {
            margin: 0;
            padding-top: 10px;
        }

    </style>
</head>

<body>    
    <div>
        <table width=100%; style="text-align: center;">            
            <tbody>      
            @foreach ($datos as $value)          
                <tr>
                    <td><img src = "{{$value['path']}}" alt="My Happy SVG"/></td>
                    <td><img src = "{{$value['path']}}" alt="My Happy SVG"/></td>
                    <td><img src = "{{$value['path']}}" alt="My Happy SVG"/></td>
                    <td><img src = "{{$value['path']}}" alt="My Happy SVG"/></td>
                </tr>
                <tr>
                    <td style="font-size: 15px; padding-bottom: 5px;"><strong>{{$value['nombre']}}</strong></td>
                    <td style="font-size: 15px; padding-bottom: 5px;"><strong>{{$value['nombre']}}</strong></td>
                    <td style="font-size: 15px; padding-bottom: 5px;"><strong>{{$value['nombre']}}</strong></td>
                    <td style="font-size: 15px; padding-bottom: 5px;"><strong>{{$value['nombre']}}</strong></td>
                </tr>
            @endforeach
            </tbody>            
        </table>

    </div>
</body>

</html>