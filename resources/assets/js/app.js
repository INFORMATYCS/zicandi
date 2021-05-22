
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('proveedor-component', require('./components/ProveedorComponent.vue'));

Vue.component('producto-component', require('./components/ProductoComponent.vue'));

Vue.component('almacen-component', require('./components/AlmacenComponent.vue'));

Vue.component('compra-component', require('./components/CompraComponent.vue'));

Vue.component('upload-component', require('./components/UploadFileComponent.vue'));

Vue.component('buscador-producto-component', require('./components/BuscadorProductoComponent.vue'));

Vue.component('mercadolibre-component', require('./components/MercadolibreComponent.vue'));

Vue.component('herramientas-component', require('./components/HerramientasComponent.vue'));

Vue.component('cuentatienda-component', require('./components/CuentaTiendaComponent.vue'));

Vue.component('headerzicandi-component', require('./components/HeaderZicandiComponent.vue'));

Vue.component('publicacionestienda-component', require('./components/PublicacionesTiendaComponent.vue'));

Vue.component('asociada-component', require('./components/AsociadaComponent.vue'));

Vue.component('entregas-component', require('./components/EntregasBettComponent.vue'));

Vue.component('ventastienda-component', require('./components/VentasTiendaComponent.vue'));

Vue.component('saldocuentaconta-component', require('./components/SaldoCuentaContaComponent.vue'));

Vue.component('almacenstockproducto-component', require('./components/AlmacenStockProductoComponent.vue'));

Vue.component('enviosfullmeli-component', require('./components/EnviosFullMeliComponent.vue'));

Vue.component('metrica-visor-component', require('./components/MetricasVisorComponent.vue'));

Vue.component('buscar-meli-metrica-component', require('./components/MetricasBuscadorMeliComponent.vue'));




const app = new Vue({
    el: '#app',
    data: {
        oppMenuSeleccion: 0
    }
});
