@extends('principal')
@section('contenido_main')
    <template v-if="oppMenuSeleccion==0">
        <h1>sdasd asdasd asdad  asdasd  asasdInicio</h1>        
    </template>

    <template v-if="oppMenuSeleccion==1">
        <proveedor-component></proveedor-component>
    </template>

    <template v-if="oppMenuSeleccion==2">
        <producto-component></producto-component>
    </template>

    <template v-if="oppMenuSeleccion==3">
        <almacen-component></almacen-component>
    </template>
    
@endsection