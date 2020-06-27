var pdf = require('html-pdf');
exports.Pdf=function(contenido,idPedido){
    var options = {
        "format": 'A4',
        "header": {
            "height": "60px"
        },
        "footer": {
            "height": "22mm"
        },
        "base": 'file://Users/midesweb/carpeta_base/pdf/'
       };
    
    pdf.create(contenido,options).toFile('pdf/'+idPedido+'.pdf', function(err, res) {
        if (err){
            console.log(err);
        } else {
            console.log(res);
        }
    });

    
}
