#Formatear para linux, ejecutar el siguiente comando: sed -i 's/\r$//' ZicandiBatch.sh
echo "Zicandi Batch para Synology"
cd /opt/lampp/htdocs/xampp-server/zicandi-batch
/opt/lampp/bin/php ZicandiBatchExecutorCliente.php

./run.sh

echo "TERMINADO"