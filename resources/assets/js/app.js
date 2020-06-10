
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



const app = new Vue({
    el: '#app',
    data: {
        oppMenuSeleccion: 0
    }
});
