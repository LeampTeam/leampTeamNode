$(document).ready(function() {
    var t=  $('#example').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": '/admin/producto/productos',
            
        },
        "columns": [
            
            { "data": "_id" },
            { "data": "code" },
            { "data": "categoria.name" },
            { "data": "description" },
            { "data": "price" },
            { "data": "stock" },
                  
            {"render": function ( data, type, row ) {
                console.log(row);
                if(row.estaEnPuntera=='true'){
                    return '<a type="button" href=/admin/producto/edit/'+row._id+' data-toggle="tooltip" data-placement="top" title="editar" class="btn btn-info"><i class="fas fa-pencil-alt"></i></a>'
                +'<button id="borrar" name='+row._id+' data-toggle="tooltip" data-placement="top" title="eliminar" class="btn btn-danger"><i class="fas fa-trash"></i></button>'
                +'<button name="'+row._id+'" myimg="'+row.img+'" type="button"  class="btn btn-primary imagen "  data-toggle="modal" data-target="#cargaImagen"><i class="fas fa-image"></i></button>'
                +'<a name="'+row._id+'" myimg="'+row.img+'" type="button" data-toggle="tooltip"  title="esta en puntera" data-placement="top" class="btn btn-success disabled" href="/puntera/guardarProductoPuntera/'+row._id+'"><i class="fas fa-share-square"></i></a>'
                }else{
                    return '<a type="button" href=/admin/producto/edit/'+row._id+' data-toggle="tooltip" data-placement="top" title="editar"  class="btn btn-info"><i class="fas fa-pencil-alt"></i></a>'
                +'<button id="borrar" name='+row._id+' data-toggle="tooltip" data-placement="top" title="eliminar" class="btn btn-danger"><i class="fas fa-trash"></i></button>'
                +'<button name="'+row._id+'" myimg="'+row.img+'" type="button" class="btn btn-primary imagen"  data-toggle="modal" data-target="#cargaImagen"><i class="fas fa-image"></i></button>'
                +'<a name="'+row._id+'" myimg="'+row.img+'" type="button" data-toggle="tooltip" title="enviar a puntera" data-placement="top" class="btn btn-success" href="/admin/puntera/guardarProductoPuntera/'+row._id+'"><i class="fas fa-share-square"></i></a>'
                }

                
            
            }
            
        }
        ],
        "columnDefs": [
           
            {
                "targets": 0 ,
                "visible": false,
                "searchable": false
            },
        
        ]
       
    } );
    

    $("#example").on( "click",".imagen" ,function() {
      
        console.log( $( this ).attr('name') );
        $('#productId').val($(  this ).attr('name'))
        var imagen=$(  this).attr('myimg')
      
       
        var html='<img src="http://127.0.0.1:3000/admin/producto/getImageFile/'+imagen +'"/>'
        $('#imagenFoto').html(html)
            
        });
        

        $("#example").on( "click","#borrar" ,function() {
                var id=$(this).attr('name')

            alert('borrar')


            $.get( "http://localhost:3000/admin/producto/delete/"+id, function( data ) {
               window.location.reload()
              });



           

        });
                

} );