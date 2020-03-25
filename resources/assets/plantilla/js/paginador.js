var paginador = { 
    offset: 3,
    getPagesNumber: function(pagination){
        let to = pagination.to;
        let current_page = pagination.current_page;        
        let last_page = pagination.last_page;


        if(!to){
            return [];
        }

        let from = current_page - this.offset;
        if(from < 1){
            from = 1;
        }

        let tos = from + (this.offset * 2);
        if(tos >= last_page){
            tos = last_page;
        }

        let pageArray = [];
        while(from <= tos){
            pageArray.push(from);
            from++;
        }

        return pageArray;
    }
};        