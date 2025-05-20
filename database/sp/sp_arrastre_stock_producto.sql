DROP PROCEDURE sp_arrastre_stock_producto;
delimiter //
CREATE PROCEDURE sp_arrastre_stock_producto(IN p_id_producto INTEGER)
BEGIN    
    DECLARE var_final_sprod INTEGER DEFAULT 0;    
    DECLARE v_ubicacion VARCHAR(50);
    DECLARE v_cantidad DECIMAL(8,2);
    DECLARE v_conteo_ubica INTEGER;
    DECLARE v_id_stock_producto INTEGER;
    DECLARE v_id_almacen INTEGER;
    DECLARE v_cantidad_prod DECIMAL(8,2);
        
    DECLARE cProcesaStockProducto CURSOR FOR     
		select sprod.id_stock_producto, mov.id_almacen, sum(if(mov.tipo_movimiento='ING',mov.cantidad, mov.cantidad*-1)) cantidad 
		from movimiento_almacen mov, stock_producto sprod
		where mov.id_producto = sprod.id_producto
		and mov.id_almacen = sprod.id_almacen
		and mov.id_producto = p_id_producto
		and mov.estatus_movimientos = 'A'
		group by sprod.id_stock_producto, mov.id_almacen;
    
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET var_final_sprod = 1;
    
    SET SQL_SAFE_UPDATES = 0;
    
        
    OPEN cProcesaStockProducto;
	bucle: LOOP

		FETCH cProcesaStockProducto INTO v_id_stock_producto, v_id_almacen, v_cantidad_prod;            

		IF var_final_sprod = 1 THEN
		  LEAVE bucle;
		END IF;                
        
        UPDATE stock_producto SET stock = v_cantidad_prod, disponible = v_cantidad_prod, retenido = 0
        WHERE id_stock_producto = v_id_stock_producto;
        
		        
        BEGIN
			DECLARE var_final INTEGER DEFAULT 0;
            
			DECLARE cProcesa CURSOR FOR 
			select ubicacion, sum(if(tipo_movimiento='ING',cantidad, cantidad*-1)) cantidad from movimiento_almacen
			where id_producto = p_id_producto
            and id_almacen = v_id_almacen
			and estatus_movimientos = 'A'
			group by ubicacion;
            
            DECLARE CONTINUE HANDLER FOR NOT FOUND SET var_final = 1;
        
			OPEN cProcesa;
			bucle2: LOOP

				FETCH cProcesa INTO v_ubicacion, v_cantidad;
				
				IF var_final = 1 THEN
				  LEAVE bucle2;
				END IF;                                                
                
                				
				IF v_cantidad <> 0 THEN								
					select COUNT(*) INTO v_conteo_ubica from cat_ubica_producto
					WHERE codigo = v_ubicacion;                                        
                    
                    IF v_conteo_ubica = 0 THEN
						INSERT INTO cat_ubica_producto(id_cat_ubica_producto, codigo, nombre, xstatus)
                        VALUES(0, v_ubicacion, v_ubicacion, 1);
                    END IF;
                
					SELECT COUNT(*) INTO v_conteo_ubica FROM stock_ubica_producto
					WHERE id_stock_producto = v_id_stock_producto
                    AND codigo_ubica = v_ubicacion
                    AND id_producto = p_id_producto;
                                        
                    IF v_conteo_ubica = 0 THEN
						INSERT INTO stock_ubica_producto(id_stock_ubica_producto, id_stock_producto, id_producto, codigo_ubica, stock)
                        VALUES(0, v_id_stock_producto, p_id_producto, v_ubicacion, v_cantidad);
                    ELSE
						UPDATE stock_ubica_producto SET stock = v_cantidad
                        WHERE id_stock_producto = v_id_stock_producto
                        AND id_producto = p_id_producto
                        AND codigo_ubica = v_ubicacion;
                    END IF;
                ELSE
					UPDATE stock_ubica_producto SET stock = 0
					WHERE id_stock_producto = v_id_stock_producto
					AND id_producto = p_id_producto
					AND codigo_ubica = v_ubicacion;
				END IF;

			END LOOP bucle2;
			CLOSE cProcesa;  
        END;

	END LOOP bucle;
	CLOSE cProcesaStockProducto;      
    
    call sp_wLOG(CONCAT('Se ejecuto arrastre de stock para el ID producto: ',p_id_producto), "INFO");
    
    COMMIT;
END;
//
	
delimiter ;