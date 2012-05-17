  //THIS CODE IS FOR THE DRAGGABLE WIDGET STUFF
  $( ".uselesswidget-drg" ).draggable({
    revert: true
  });


  var uselesswidgetdrpOptions = {
    drop: function(event, ui) {
      var uselesswidget = new Widget_Useless();
    
    //adding the new widget to the proper section
    statman.getStationByName($(this).attr("id")).wmanager.addWidget(uselesswidget);

    $(this).append( ui.draggable.text() + "<div class='widgetcontainer'>" );
    //$(this).append(uselesswidget.name);
    var i = 0;
    statman.getStationByName($(this).attr("id")).wmanager.getWidgetByName(uselesswidget.name).name;
    var findWidget = statman.getStationByName($(this).attr("id")).wmanager.getWidgetByName(uselesswidget.name);
    $(this).append("<br />");
    for(;i < findWidget.fields.length; ++i){
	$(this).append(findWidget.fields[i]);
	$(this).append("<br />");
    }

    $(this).append("</div>" + "<br>");



    }
  };

  $( "#drplist" ).children().droppable( uselesswidgetdrpOptions );
  
