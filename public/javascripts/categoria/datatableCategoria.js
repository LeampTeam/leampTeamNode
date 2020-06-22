$(document).ready(function() {
    var t=  $('#example').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": '/admin/categoria/categorias',
            
        },
        "columns": [
            
            { "data": "_id" },
            { "data": "name" },
                  
            {"render": function ( data, type, row ) {
                return '<a type="button" href=/admin/categoria/edit/'+row._id+' class="btn btn-light"><i class="fas fa-pencil-alt"></i></a>'
                +'<button id="borrar" name='+row._id+' class="btn btn-light"><i class="fas fa-trash"></i></a>'
            }
        }
        ],
        "columnDefs": [
           
            {
                "targets": 0 ,
                "visible": false,
                "searchable": false
            }
            
        ]
       
    } );

    $("#example").on( "click","#borrar" ,function() {
        var id=$(this).attr('name')

    //Modal
    let modal = confirm('Desea borrar el usuario')
    if (modal == true) {
        $.get("http://localhost:3000/admin/fragancia/borrarFragancias/"+id, function( data ) {
            window.location.reload()
           });
           alert ('Se elimino el usuario')
      } else {
            alert ('No se elimino el usuario')
      }

    });    
} );