DROP PROCEDURE sp_wLOG;
delimiter //
CREATE PROCEDURE sp_wLOG(IN mensaje VARCHAR(10000), IN tipo VARCHAR(5))
BEGIN    
    insert into log_sp_global(log)values(CONCAT(tipo,": ",mensaje));
   
END;
//
	
delimiter ;