$( document ).ready(function() {
    $(document).click(function(){
        $('.searched').hide()
    })
    $('#busquedaProducto').keyup(function(){
        let search=$(this).val()
        let cate=$('#categ').val()
       
        
        if(search.length>2){
        
        $.post( "http://127.0.0.1:3000/admin/producto/getProductosPuntera",{search, cate}, function( data ) {
 
         console.log(data)
         
         let dropD=''
         let prod=data.producto
         if(prod.length>0){
 
         for(let i=0;i<prod.length;i++){
             if(prod[i].estaEnPuntera=='true'){
                dropD+='<a class="dropdown-item disabled" href="http://127.0.0.1:3000/admin/puntera/guardarProductoPuntera/'+prod[i]._id+'">'+prod[i].code +'    '+prod[i].description+'</a>'
             }else{
                dropD+='<a class="dropdown-item" href="http://127.0.0.1:3000/admin/puntera/guardarProductoPuntera/'+prod[i]._id+'">'+prod[i].code +'    '+prod[i].description+'</a>'
             }
            
         }
            $('.searched').html(dropD)
            $('.searched').show()
         }else{
            $('.searched').html('No se encontro ningun registro')
            $('.searched').show()
         }
        
       });
     }
    })

})