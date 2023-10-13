@extends('principal')
@section('contenido_main')
    <template v-if="oppMenuSeleccion==0">
        <h3>Nunduva - MeLi</h3>
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

    <template v-if="oppMenuSeleccion==11">
        <compra-component></compra-component>
    </template>

    <template v-if="oppMenuSeleccion==12">
        <herramientas-component></herramientas-component>
    </template>

    <template v-if="oppMenuSeleccion==13">
        <cuentatienda-component></cuentatienda-component>
    </template>    

    <template v-if="oppMenuSeleccion==14">
        <publicacionestienda-component></publicacionestienda-component>
    </template>        

    <template v-if="oppMenuSeleccion==15">
        <asociada-component></asociada-component>
    </template>
    <template v-if="oppMenuSeleccion==16">
        <entregas-component></entregas-component>
    </template>

    <template v-if="oppMenuSeleccion==17">
        <ventastienda-component></ventastienda-component>
    </template>

    <template v-if="oppMenuSeleccion==18">
        <saldocuentaconta-component></saldocuentaconta-component>
    </template>

    <template v-if="oppMenuSeleccion==19">
        <almacenstockproducto-component></almacenstockproducto-component>
    </template>

    <template v-if="oppMenuSeleccion==20">
        <enviosfullmeli-component></enviosfullmeli-component>
    </template>

    <template v-if="oppMenuSeleccion==21">
        <metrica-visor-component></metrica-visor-component>
    </template>

    <template v-if="oppMenuSeleccion==22">
        <buscar-meli-metrica-component></buscar-meli-metrica-component>
    </template>

    <template v-if="oppMenuSeleccion==90">
        <mercadolibre-component></mercadolibre-component>
    </template>

    
    


    
    
@endsection


@section('header_conecta_tienda')    
    <headerzicandi-component></headerzicandi-component>
@endsection