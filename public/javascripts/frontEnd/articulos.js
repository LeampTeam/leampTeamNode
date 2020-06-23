

$( document ).ready(function() {

  // $(document).on('click','.fa-chevron-right',function(){
  //     $(this).removeClass('fa-chevron-right').addClass('fa-chevron-down')
  //  })

  //  $(document).on('click','.fa-chevron-down',function(){
  //    $(this).removeClass('fa-chevron-down').addClass('fa-chevron-right')
  //   })


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

    $('.detalle').click(function(){

     var idart= $(this)[0].id
      $.get( "http://localhost:3000/detalleProducto/"+idart, function( result ) {

        $('.modal-body').empty()

       
        var res="";
        
            // res+='<div class="card" style="width: 25rem;">'
            // +'<img src="admin/producto/getImageFile/'+result.img+'"  alt="...">'
            // +'<div class="card-body">'
            // +'<h3 class="card-title">'+result.name+'</h3>'
            // +'<p class="card-text">'+result.description+'</p>'
            // +'<button id='+result.id+' onclick="dropclick(event)" class="btn btn-primary">Añadir al Carro</button>'
            // +'<h4 style="float:right"><b>$ '+result.price+'</b></h4>'
            // +'</div>'
            // +'</div>'

            res+='<div class="card mb-3" >'
            +'<div class="row no-gutters">'
              +'<div class="col-md-4">'
               + '<img src="admin/producto/getImageFile/'+result.img+'"height=300 width=300 class="card-img" alt="...">'
             + '</div>'
              +'<div class="col-md-8">'
                +'<div class="card-body">'
                  +'<h3 class="card-title">'+result.name+'</h3>'
                 + '<p class="card-text">'+result.description+'</p>'
                 +'<button id='+result.id+' onclick="dropclick(event)" class="btn btn-primary btnModal">Añadir al Carro</button>'
                 +'<h4 style="float:right"><b>$ '+result.price+'</b></h4>'
               + '</div>'
             + '</div>'
           + '</div>'
         + '</div>'

         console.log(res)
            $('.modal-body').append(res)
       });
    })

    $('.modal-body').on('click','.btnModal',function(){
      $('#exampleModal').modal('hide')
    })

})