@extends('principal')
@section('contenido_main')
    <template v-if="oppMenuSeleccion==0">
        <example-component></example-component>
    </template>

    <template v-if="oppMenuSeleccion==1">
        <h1>Contenido menu 1</h1>
    </template>

    <template v-if="oppMenuSeleccion==2">
        <h1>Contenido menu 2</h1>
    </template>
    
@endsection