var nodemailer = require('nodemailer'); 



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
            filename: 'file.pdf',
            path: '/home/rafael/programacionrafa/LeampTeamNode/pdf/'+nombrePdf,
            contentType: 'application/pdf'
          }]
 };
 transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        res.status(500).send( err.message);
    } else {
        console.log("Email sent");
        res.status(200).send('Email sent');
    }
});
};