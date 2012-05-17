
  //THIS CODE IS FOR THE DRAGGABLE WIDGET STUFF
  $( ".drg1" ).draggable({
    revert: true,
	drag: function(event, ui) { window.glocludgw = 1; }
  });
  $( ".drg2" ).draggable({
    revert: true,
	drag: function(event, ui) { window.glocludgw = 2; }
  });
  $( ".drg3" ).draggable({
    revert: true,
	drag: function(event, ui) { window.glocludgw = 3; }
  });
  $( ".drg4" ).draggable({
    revert: true,
	drag: function(event, ui) { window.glocludgw = 4; }
  });
  $( ".drg5" ).draggable({
    revert: true,
	drag: function(event, ui) { window.glocludgw = 5; }
  });

  var drpOptions = {
    drop: function(event, ui) {
      //$( "#dialog-form" ).dialog( "open" );
      var testwidget = new DemoWidget();
	  
		switch(window.glocludgw) {
			case 1:
				testwidget = new Widget_BasicInfo();
				break;
			case 2:
				testwidget = new Widget_PresentIllness();
				break;
			case 3:
				testwidget = new Widget_PastMedicalHistory();
				break;
			case 4:
				testwidget = new Widget_Medications();
				break;
			case 5:
				testwidget = new Widget_Allergies();
				break;
		}
      
      //adding the new widget to the proper section
      statman.getStationByName($(this).attr("id")).wmanager.addWidget(testwidget);
      
	    $(this).append( ui.draggable.text() + "<div class='widgetcontainer'>" );
	    //$(this).append(testwidget.name);
	    var i = 0;
	    statman.getStationByName($(this).attr("id")).wmanager.getWidgetByName(testwidget.name).name;
	    var findWidget = statman.getStationByName($(this).attr("id")).wmanager.getWidgetByName(testwidget.name);
	    for(;i < findWidget.fields.length; ++i){
		if (i != 0){
		$(this).append(", " + findWidget.fields[i]);
		}else{
		$(this).append(findWidget.fields[i]);}
	    }
      
      	    $(this).append("</div>" + "<br>");

    }
  };

  $( "#drplist" ).children().droppable( drpOptions );

//THIS CODE IS FOR THE CUSTOM SECTION NAME STUFF
	$(function() {
		// a workaround for a flaw in the demo system (http://dev.jqueryui.com/ticket/4375), ignore!
		$( "#dialog:ui-dialog" ).dialog( "destroy" );

		var name = $( "#name" ),
			//email = $( "#email" ),
			//password = $( "#password" ),
			allFields = $( [] ).add( name ),
			tips = $( ".validateTips" );

		function updateTips( t ) {
			tips
				.text( t )
				.addClass( "ui-state-highlight" );
			setTimeout(function() {
				tips.removeClass( "ui-state-highlight", 1500 );
			}, 500 );
		}

		function checkLength( o, n, min, max ) {
			if ( o.val().length > max || o.val().length < min ) {
				o.addClass( "ui-state-error" );
				updateTips( "Length of " + n + " must be between " +
					min + " and " + max + "." );
				return false;
			} else {
				return true;
			}
		}

		function checkRegexp( o, regexp, n ) {
			if ( !( regexp.test( o.val() ) ) ) {
				o.addClass( "ui-state-error" );
				updateTips( n );
				return false;
			} else {
				return true;
			}
		}

		$( "#dialog-form" ).dialog({
			autoOpen: false,
			height: 300,
			width: 350,
			modal: true,
			buttons: {
				"Create an account": function() {
					var bValid = true;
					allFields.removeClass( "ui-state-error" );

					bValid = bValid && checkLength( name, "username", 3, 16 );


					bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z_])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter." );
					var stationName = name.val();
					if ( bValid ) {
						
						$( this ).dialog( "close" );

						$( "<li id=" + stationName + ">" + stationName + "<hr /></li>" ).droppable( drpOptions ).appendTo( "#drplist" );						
						
						//backend stuff done here
						var newSection = new Station(stationName, new WidgetManager());
						statman.addStation(newSection);
						if(statman != null)
						{
							
							$( "#users tbody" ).append( "<tr>" +
								"<td>" + statman.getStationByName(stationName).name + "</td>" +
							"</tr>" );
						} else
						{
							$( "#users tbody" ).append( "<tr>" +
							"<td> ERROR: SECTION NOT ADDED!</td>" +
							"</tr>" );
						}
					}
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				allFields.val( "" ).removeClass( "ui-state-error" );
			}
		});

		$( "#create-user" )
			.button()
			.click(function() {
				$( "#dialog-form" ).dialog( "open" );
			});
	});