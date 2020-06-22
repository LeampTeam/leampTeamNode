$( document ).ready(function() {
    
    $( "#customSwitch1" ).change(function() {
        let val= $(this).is(':checked')
        console.log(val)
        if(val){
            $(".categoria").show()
        }else{
            $(".categoria").hide()
        }
      });

      let val= $("#customSwitch1").is(':checked')
      console.log(val)
      if(val){
          $(".categoria").show()
      }else{
          $(".categoria").hide()
      }

     
      
      

});