
$( document ).ready(function() {
      $('.bodyCarro').on('click','.fa-minus',function(e){
         var id=$(this)[0].id

        console.log(id)
        var cantidad=$('#cantidad'+id).val()
        console.log(cantidad)
        if(cantidad>=2){
            cantidad--
            $.post( "http://localhost:3000/agregarCantidad/",{id,cantidad}, function( result ) {
               
            $('#cantidad'+id).val(cantidad)
            console.log($('#precio'+id).html())
            var cantprecio=$('#precio'+id).html().split(" ")
             var cant=parseFloat( cantprecio[1])
             console.log(cant)
             var total=cantidad*cant
            $('#cantidadXproducto'+id).html(cantprecio[0]+" "+total)

               });
           
        }
      })
      $('.bodyCarro').on('click','.fa-plus',function(e){
        
        var id=$(this)[0].id
        var cantidad=$('#cantidad'+id).val()
        if(cantidad>=1){
            cantidad++
            $.post( "http://localhost:3000/agregarCantidad/",{id,cantidad}, function( result ) {
               
                $('#cantidad'+id).val(cantidad)
               console.log($('#precio'+id).html())
               var cantprecio=$('#precio'+id).html().split(" ")
                var cant=parseFloat( cantprecio[1])
                console.log(cant)
                var total=cantidad*cant
               $('#cantidadXproducto'+id).html(cantprecio[0]+" "+total)

               });
          
        }
      })

      $('.bodyCarro').on('click','.eliminarItem',function(e){
        
        var iditemCarro=$(this)[0].id
        console.log(iditemCarro)
        $.get( "http://localhost:3000/borrarItem/"+iditemCarro, function( result ) {
            $('.bodyCarro').empty()
            console.log(result)
            console.log(result.verEnChango)
            var chango=result.verEnChango
            var res="";
             for(var i =0;i<chango.length;i++){
                res+='<div class="itemCarro">'
                    + '<div class="row">'
                    + '<div class="col-4"><i id="'+chango[i].id+'" class="fas fa-minus"></i><input class="cantidad" id="cantidad'+chango[i].id+'" type="number" name="" min="1" max="100" value="'+chango[i].cantidad+'" /><i id="'+chango[i].id+'" class="fas fa-plus"></i></div>'
                    + '<div class="col-5">'
                    + '<h4 style="mergin-left:15px"> <b id="cantidadXproducto'+chango[i].id+'">$ '+chango[i].cantidadXproducto+' </b></h4>'
                    + '</div>'
                    + '<div class="col-3"><button class="btn btn-danger eliminarItem" id="'+chango[i].id+'" style="float:right"><i class="fas fa-times"> </i></button></div>'
                    + '</div>'
                    + '<div class="row fila">'
                    + '<div class="col-3"><img src="admin/producto/getImageFile/'+chango[i].img+'" alt="" width="50px" height="50px" /></div>'
                    + '<div class="col-6">'
                    + '<p style="margin-top: 12px;">'+chango[i].descripcion+'</p>'
                    + '</div>'
                    + '<div class="col-3">'
                    + '<p id="precio'+chango[i].id+'" style="margin-top: 12px;float:left">$ '+chango[i].precio+'</p>'
                    + '</div>'
                    + '</div>'
                    + '</div>'
                    + '<hr/>'
             }

             console.log(res)
                $('.bodyCarro').append(res)
           });
    })

    })