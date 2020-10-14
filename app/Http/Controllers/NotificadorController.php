<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Config;
Use Exception;
Use Log;

use App\BatchProceso;

class NotificadorController extends Controller
{
    /**
     * Envia correo generico
     *
     * @return \Illuminate\Http\Response
     */
    public function mailTerminoBatch(Request $request){        
        try{
            
            $log = $request->log;

            $handle = fopen(Config::get('zicandi.repositorio.entrada.log_batch').$log, "r");
            $content = fread($handle, filesize(Config::get('zicandi.repositorio.entrada.log_batch').$log));
            fclose($handle);
            $encoded_content = chunk_split(base64_encode($content));

            //Limite Email
			$semi_rand = md5(time()); 
			$mime_boundary = "==Multipart_Boundary_x{$semi_rand}x"; 


            $batchProceso = BatchProceso::where('estatus','=','A')        
            ->orderBy('id_batch_proceso', 'asc')
            ->get();

            $salida = array();
            $htmlTablaProcesos='<table><tr><th>ID</th><th>Proceso</th><th>Descripcion</th></tr>';
            foreach($batchProceso as $t){

                $id_batch_proceso = $t->id_batch_proceso;
                $php = $t->archivo_php;
                $descripcion = $t->descripcion;
                
                $htmlTablaProcesos.= '<tr><td>'.$id_batch_proceso.'</td><td>'.$php.'</td><td>'.$descripcion.'</td></tr>';

            } 
            $htmlTablaProcesos.='</table>';

            $html='
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>Notificacion BATCH</title>
              </head>
              <body>
                <H2>Termino exitoso del proceso BATCH</H2>
                '.$htmlTablaProcesos.'
                <p>
                    <table><tr><th>Fecha operacion:</th><td>'.date("d/m/Y").'</td></tr></table>
                </p>
              </body>
            </html>';


            // Varios destinatarios
            $para  = 'evert.nicolas@gmail.com' . ', '; // atención a la coma
            $para .= 'nunduva.mx@gmail.com';

            // título
            $título = 'Procesamiento Batch '.date("d/m/Y");

            // mensaje
            $mensaje =  $html;

			$headers = "De: zincandi@nunduva.com"." <Zicandi>";
            //Encabezados para archivo adjunto 
			$headers .= "\nMIME-Version: 1.0\n" . "Content-Type: multipart/mixed;\n" . " boundary=\"{$mime_boundary}\""; 

			//límite multiparte
			$message = "--{$mime_boundary}\n" . "Content-Type: text/html; charset=\"UTF-8\"\n" .
			"Content-Transfer-Encoding: 7bit\n\n" . $mensaje . "\n\n"; 
			
			//preparación de archivo
			
			$message .= "--{$mime_boundary}\n";			
			$data = $encoded_content;
			$message .= "Content-Type: application/octet-stream; name=\"".basename($log)."\"\n" . 
			"Content-Description: ".basename($log)."\n" .
			"Content-Disposition: attachment;\n" . " filename=\"".basename($log)."\"; size=".filesize(Config::get('zicandi.repositorio.entrada.log_batch').$log).";\n" . 
			"Content-Transfer-Encoding: base64\n\n" . $data . "\n\n";
			
			$message .= "--{$mime_boundary}--";
			$returnpath = "-f" . "zincandi@nunduva.com";


			$mail = @mail($para, $título, $message, $headers, $returnpath); 


            return [ 'xstatus'=>true];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    
}
