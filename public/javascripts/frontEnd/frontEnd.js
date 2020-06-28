
    
   

//     })
function allowDrop(ev) {
    ev.preventDefault();
    }

    function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log(ev.target)
    }

    function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(data)
    // ev.target.appendChild(document.getElementById(data));
    $.get( "http://localhost:3000/enviarCarroCompra/"+data, function(result) {
        $('.bodyCarro').empty()
        $('.footerCarro').empty()
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
            +  '</div>'
            + '</div>'
            +'</div>'
            +'<hr/>'
         }
         console.log(res)
            $('.bodyCarro').append(res)
           let footercarro="<h4 style='float:left'>Subtotal</h4><h4 style='float:right'><b></b>$ "+result.total+"</h4>";

           $('.footerCarro').append(footercarro)

          
          });


    }

    function dropclick(ev) {
        ev.preventDefault();
        var data = ev.target.id;
        console.log(data)
        // ev.target.appendChild(document.getElementById(data));
        $.get( "http://localhost:3000/enviarCarroCompra/"+data, function(result) {
            $('.bodyCarro').empty()
            $('.footerCarro').empty()
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
               +  '</div>'
               + '</div>'
               +'</div>'
               +'<hr/>'
             }
             console.log(res)
                $('.bodyCarro').html(res)
                let footercarro="<h4 style='float:left'>Subtotal</h4><h4 style='float:right'><b></b>$ "+result.total+"</h4>";

                $('.footerCarro').append(footercarro)
     
              });
    
    
        }
    
      
      

