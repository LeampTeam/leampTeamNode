var nodemailer = require('nodemailer'); 
var moment = require('moment')


exports.sendEmail = function(from,to,subject,contenido,nombrePdf){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'limpteamventas@gmail.com',
            pass: 'Caseros2663'
        }
    });
    var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: contenido,
        attachments: [{
            filename: 'PedidoRealizado'+moment().unix()+'.pdf',
            path: '/home/rafael/programacionrafa/LeampTeamNode/pdf/'+nombrePdf,
            contentType: 'application/pdf'
          }]
 };
 transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log('mail',error);
        res.status(500).send( err.message);
    } else {
        console.log("Email sent");
        res.status(200).send('Email sent');
    }
});
};