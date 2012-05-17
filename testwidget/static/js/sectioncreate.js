
  //THIS CODE IS FOR THE DRAGGABLE WIDGET STUFF
  $( ".drg" ).draggable({
    revert: true
  });

  var drpOptions = {
    drop: function(event, ui) {
      var testwidget = new DemoWidget();


      $(this).append( ui.draggable.text() + "<div class='widgetcontainer'>SUP BITCHES" );
      $(this).append(testwidget.name);
      var i = 0;
      for(;i < testwidget.fields.length; ++i){
      	$(this).append(testwidget.fields[i]);
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
				"Create section": function() {
					var bValid = true;
					allFields.removeClass( "ui-state-error" );

					bValid = bValid && checkLength( name, "username", 3, 16 );


					bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z_])+$/i, "Section may consist of a-z, 0-9, underscores, begin with a letter." );
					var test = name.val();
					if ( bValid ) {
						$( "#users tbody" ).append( "<tr>" +
							"<td>" + name.val() + "</td>" +
						"</tr>" );
						$( this ).dialog( "close" );

						//$('#drplist').append("<li>" + test + "<hr /></li>").droppable( drpOptions );
						$( "<li>" + test + "<hr /></li>" ).droppable( drpOptions ).appendTo( "#drplist" );
						//$('div.mynav').append("<div id='mine'>"+mouse+"</div>");
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