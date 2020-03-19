@extends('principal')
@section('contenido_main')
    <template v-if="oppMenuSeleccion==0">
        <h1>sdasd asdasd asdad  asdasd  asasdInicio</h1>        
    </template>

    <template v-if="oppMenuSeleccion==1">
        <proveedor-component></proveedor-component>
    </template>

    <template v-if="oppMenuSeleccion==2">
        <h1>Contenido menu 2</h1>
    </template>
    
@endsection