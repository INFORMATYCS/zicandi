# ZICANDI

## Table of Contents
1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Instalacion](#instalacion)
4. [Collaboration](#collaboration)
5. [FAQs](#faqs)

## General Info
Zicandi v1, administra stock

2019 - Creacion proyecto

## Instalacion
***
A continuacion una breve descripcion para realizar la instalacion en un ambiente local:
```
$ git clone https://github.com/INFORMATYCS/zicandi.git
$ cd zicandi
$ composer install
```
Side information: To use the application in a special environment use ```lorem ipsum``` to start

Instalacion de NODE

Importante, al realizar la instalacion activar la siguiente opcion:

Automatically install the necessary tools. Note thah this will also...

```
$ cd zicandi
$ npm install
$ npm run watch

```

#### Creacion del archivo .env
```
$ cp .env.example .env
$ php artisan key:generate
```

Actualizacion.ENV
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=zicandi_bd
DB_USERNAME=root
DB_PASSWORD=
```
#### Base de datos
Creacion de la base de datos:
```
$ mysql -u root -p
$ CREATE DATABASE zicandi_bd CHARACTER SET utf8 COLLATE utf8_spanish_ci;
```

*NOTA: Tambien es posible crearla desde PhpMyAdmin*

Descarga de la BD del ambiente de pruebas (desazica):
```
$ ssh -p 65002 u469753676@151.106.96.201
u469753676@151.106.96.201's password: (password ssh/ftp)

-bash-4.2$ cd public_html/test
-bash-4.2$ mysqldump -u u469753676_desazica -p u469753676_desa_zicandi > migrazica.sql
Enter password: (password bd remota)

-bash-4.2$ exit
logout
Connection to 151.106.96.201 closed.


$wget -O ./migrazica.sql https://informatycs.com/test/migrazica.sql
```

Importar base remota en local:
```
$mysql -u root -p zicandi_bd
Enter password: (password bd local)

MariaDB [zicandi_bd]> source migrazica.sql
```

#### Deploy

http://localhost/zicandi/public/

#### Requerimientos
PHP 7^
node 16.13.0 /soccers-nas/nfs-soccers/software/win/desarrollo/node-v16.13.0-x64.msi



#### Posibles errores
Al ejecutar composer install, si no pudiera ejecutar @php artisan package:discover y obtener el siguiente error: 
> @php artisan package:discover
> 
> In PackageManifest.php line 122:
> 
>   Undefined index: name


Script @php artisan package:discover handling the post-autoload-dump event returned with error code 1

Correccion:
```
$composer update
```
***
