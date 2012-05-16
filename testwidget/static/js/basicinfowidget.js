
  //THIS CODE IS FOR THE DRAGGABLE BASIC WIDGET STFF
  $( ".basicinfowidget-drg" ).draggable({
    revert: true
  });
  
  
  var widgetbasicinfodrpOptions = {
    drop: function(event, ui) {

      //$( "#widgetbasicinfo-dialog" ).dialog( "open" );
      

      var testwidget = new DemoWidget();


      $(this).append( ui.draggable.text() + "<div class='widgetcontainer'>WOO WIDGET" );
      $(this).append(testwidget.name);
      var i = 0;
      for(;i < testwidget.fields.length; ++i){
      	$(this).append(testwidget.fields[i]);
      }


      $(this).append("</div>" + "<br>");
    }
  };

  $( "#drplist" ).children().droppable( widgetbasicinfodrpOptions );
  
  
$(function() {		
	
	$( "#widgetbasicinfo-dialog" ).dialog({
			autoOpen: false,
			resizable: false,
			height:140,
			modal: true,
			buttons: {
				"Delete all items": function() {
					$( this ).dialog( "close" );
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			}
	});
	
	$( "#add-patient" )
	.button()
	.click(function() {
		$( "#widgetbasicinfo-dialog" ).dialog( "open" );
	});
});