$(function() {

		var namespace_counter = 1;
		var $tab_title_input = $( "#tab_title");
		var $tag_title_input = $( "#tag_title");


		var $header_tab_title_input = $( "#header_tab_title");
		var $header_tag_title_input = $( "#header_tag_title");
		var $body_tab_title_input = $( "#body_tab_title");
		var $body_tag_title_input = $( "#body_tag_title");
		var $doc_name_title_input = $("#doc_name_title");
		var $clinic_name_title_input = $("#clinic_name_title");
		//this list is needed for the header tag adder dialog
		
		//you will have to set this counter each time you come to this page.
		var tab_counter = 0;
		var header_tab_counter = 0;
		var body_tab_counter = 0;
		var $header_tab_selection = $("#header_title_choice");
		var $body_tab_selection = $("#body_title_choice");


		
		//$("#station_title").val(),"station");
		
		//we want this function to return true | false
		//dependent on whether or not the validation passes
		//we take in the type of validation we should do
		//called save_name = { "doc_save" || "section_save" || "tag_save" }
		function isValidSection(text,part)
		{
			//characters must be alpha and have a min of two characters.
			var re = /^[A-Z]{2,}$/i;
			//check to see if it has the name title as all of the other sections...
			//
			var errors = new Array();
			if(!(re.test(text)))
			{
				errors.push("Hey, you need to use a minimum of two alpha characters.");
				errors.push("Just a friendly reminder: No special characters (including spaces)");
			}
			if(part === "station")
			{
				
				if(isSame(text,$(".group h3 a")))
				{
					errors.push("You station title needs to be unique");
				}
			}
			if(part === "tab")
			{
				if(isSame(text,$("#header_tabs ul li a")) || isSame(text,$("#body_tabs ul li a")))
				{
					errors.push("Your section title needs to be unique");
				}
			}
			//you might want to turn this validation part off.
			//what if you have <text> and <text> under different parents...
			//that would be berry bad...
			if(part === "tag")
			{
				$("#header_tabs ul li a").each(function() {
					var possible_matches = collectTags($(this).text());
					for(var i in possible_matches)
					{
						if(text === possible_matches[i]['name'])
						{
							errors.push("Your tag title needs to be unique...thanks");
						}
						
					}
	
					
				});
				$("#body_tabs ul li a").each(function() {
					var possible_matches = collectTags($(this).text());
					for(var i in possible_matches)
					{
						if(text === possible_matches[i]['name'])
						{
							errors.push("Your tag title needs to be unique...thanks");
						}
						
					}
	
					
				});
			}
			return errors;
		}


		//okay you need to collect all of the tags in the header
		//and all of the tags in the body...
		//what are you doing here?
		//okay, you need to go through each tag to check name differences...
		//we have a text vs val() problem here...
		function isSame(texter,lister)
		{
			var the_answer = false;
			lister.each(function() {
				if(texter === ($(this).text()))
				{
					the_answer = true;
				}
			});
			return the_answer;
		}

		
		//create a method that takes in a list of errors and append it into
		//a new errors div.  We need to make it generic for:
		//modals (section,tags) and the basic document information (name,namespace(s)).
		//add_header_section_dialog
		//add_header_tag_dialog
		//add_body_section_dialog
		//add_body_tag_dialog
		function addErrors(area, error_list)
		{
			//remove the old errors div before adding the new one...
			$(".errors").remove().fadeOut();
			area.prepend('<div class = "errors"><ul></ul></div>').fadeIn();
			for(i = 0; i < error_list.length ; i++)
			{
					//var $errors = $(".errors");
					if(!(error_list[i] in error_list))
					{
						$(".errors ul").prepend("<li>" + error_list[i] + "</li>");
					}
			}
		}
		


		//Clean up any attributes (This is old).
		function cleanAttributes(attributes)
		{
			var first_cleaned_attributes = new Array();
			attributes.each(function() 
			{
				if(!($(this).val().length == 0) && !($(this).val() == " "))
				{
					first_cleaned_attributes.push($(this).val());
				}
			});
			return byeDuplicates(first_cleaned_attributes);
		}


		//Utility Function to get rid of duplicates in an array
		function byeDuplicates(arrayer) 
		{
			out=[],obj={};
			for (var i=0;i<arrayer.length;i++) 
			{
				obj[arrayer[i]]=0;
			}
			for (i in obj) 
			{
				out.push(i);
			}
			return out;
		}


		


		/*
		*	LES CONTROLLERS DES TABS
		*
		*/

		//takes in the part (header or body)
		//and add a tab. 
		//you need to address these counters...
		//are they necessary?
		function addTab(part) {
				var tab_title = $header_tab_title_input.val() || $body_tab_title_input.val() || "Tab " + tab_counter;				
				if (part == 'header')
				{
					$header_tabs.tabs( "add", "#tabs-"+ tab_title, tab_title );
					header_tab_counter++;
					
				}
				else
				{
					$body_tabs.tabs( "add", "#tabs-"+ tab_title, tab_title );
					body_tab_counter++;
				}
				$("#add_" + part + "_tag_dialog select").append("<option value= \"" + tab_title + "\">"+ tab_title +"</option>");
			
		}

		
		$( "#add_namespace" )
			.button({ icons: { primary: "ui-icon-plusthick" }})
			.click(function() {

				var x = "<li>" + 
					"<input type=\"text\" name=\"namespace-" + 
					namespace_counter + "\" id=\"namespace\" value=\"\" class=\"text ui-widget-content ui-corner-all\" /\>"+
					"<span class='ui-icon ui-icon-close'>Remove Namespace</span>"+
					"</li>";
				$( ".namespaces fieldset ul" ).append(x);
				namespace_counter++;
			});


		//fudge yeahs.
		//DELETE NAMESPACE
		//section class = "document_container" > div class = "add_documet" > div class="namespaces" > p
		$( ".namespaces li span.ui-icon-close" ).live( "click", function() {
			$( this ).parent().remove();
		});

		
		function collectAll(part)
		{
			var section_stuff = {};
			//each section needs a dictionary of
			$("#"+ part +"_tabs ul li a").each(function() {
				var texter = $(this).text();
				section_stuff[texter] = collectTags(texter);
				
			});
			return section_stuff;
		}

		//the attributes appear to break everything...
		//the tag name is the tag title
		function collectTags(texter)
		{
			var tags = new Array();
			$("#tabs-"+ texter +" #list h1.tag_title").each(function() {
				//I think this is becoming undefined...
				var atties = new Array();
				//create a value array from the li texts (tag attributes).
				$(this).siblings('ul').children().each(function(){
					atties.push($(this).text());
				});
				tags.push({
					"name":$(this).text(),
					"attributes" : atties || [],
					"parent" : getParent($(this)) || "error"});
			});
			return tags;
		}

		//#list with h1:tag_title of tag_title...
		//find it...and then find its parent of parent (ol > #list)
		//if it exists...mark the parents.
		//if not, mark it as root.
		//send in an ol in #tabs-texter...check to see if it has
		//a parent of parent of #list...if it does...store parent of #list h1.tag_title as the parent.
		//return the parent name.
		function getParent(tag)
		{
			var parent_name = tag.parent('div.the_sortables').parent('li#list').parent('ol').parent('li#list');
			//this means that we have a parent...
			//and return the parent's name (tag_name of sort).
			if (parent_name.length > 0)
			{
				return parent_name.children('div.the_sortables').children(' h1.tag_title').text();
			}
			//return the root node...
			else
			{
				return "root";
			}
		}

		//collect the values from the namespaces input
		function collectNamespaces()
		{
			var namespaces = new Array();
			$(".namespaces fieldset ul li input").each(function() {
				namespaces.push($(this).val());
				
			});
			return namespaces;
		}
		//
		//header_tabs > ul > div.tabs-name > ol.sortable > li#list > div.the_sortables > h1.tag_title > ul.attributes
		//> div.button_holder, you want each li#list and you want the tag title, the attributes and the parent node.
			
		// Save The Document Header
		//doc_name_title
		$( "#save_document" )
			.button({ icons: { primary: "ui-icon-disk" }})
			.click(function() {
				var doc_name_input = $doc_name_title_input.val();
				if(!(isValidSection(doc_name_input)))
				{
					addErrors($("#options"),["Hey! You forgot the document name."]);
				}
				//otherwise we add our tab to the header section
				//and close ze box.
				else
				{
					var arraysss = [1,2,3];
					$.ajax({
					  	type: "POST",
						url: location.href,
						//can you send a dict in a dict?
						data: {
							"save":"yes",
							"document_name":doc_name_input,
							"namespaces": collectNamespaces(),
							"header_sections": collectAll("header"),
							"body_sections": collectAll("body")
						}
					});
					
					//I need to send in the data as json I guess
					alert("Hey, you just saved","Hello (TBChanged)");
				}
		});


		
		// Save The Document Header
		$( "#validate_document" )
			.button({ icons: { primary: "ui-icon-clipboard" }})
			.click(function() {
				alert("This document isn't valid","Hello");
			});
		
		

		//somehow we need to delete the li before the div
		//okay got it...what a hacker.
		$("#list div.ui-icon-close").live("click",function()
		{
			$( this ).parent().parent().remove();
		});

		//somehow we need to delete the li before the div
		//okay got it...what a hacker.
		$("#list div.ui-icon-pencil").live("click",function()
		{
			alert("Hey, hook me up to the edit box...");
		});


		$( "#deletion:ui-dialog" ).dialog( "destroy" );
	
		$( "#deletion-confirm" ).dialog({
			resizable: false,
			height:200,
			autoOpen:false,
			modal: true,
			buttons: {
				"Delete Item": function() {
					$.ajax({
						type: "POST",
						dataType: 'json',
						url: "http://127.0.0.1:8000/cda_builder/all_cda.html",
						data: {"delete_document":document_name}
					});
					$( this ).dialog( "close" );
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			}
		});

		//somehow we need to delete the li before the div
		//okay got it...what a hacker.
		$("p.ui-icon-close").live("click",function()
		{
			var document_name = $(this).parent('td').siblings('td#document_name').text();
			$(this).parent().parent().remove();
			$.ajax({
				type: "POST",
				dataType: 'json',
				url: "http://127.0.0.1:8000/cda_builder/all_cda.html",
				data: {"delete_document":document_name}
			});
			
			
		});

		
		$( "#create-clinic" )
			.button({ icons: { primary: "ui-icon-plusthick" }})
			.click(function() {
				location.href = "http://127.0.0.1:8000/cda_builder/add_clinic.html";
				$.ajax({
					type: "POST",
					url: "http://127.0.0.1:8000/cda_builder/add_clinic.html",
					data: {"add_clinic":"yes"}
					});
		});


		function log( message ) {
			$( "<div/\>" ).text( message ).prependTo( "#patient_results" );
			$( "#log" ).scrollTop( 0 );
		}

		//Yup this is my list of searchable patients for JQuery.
		//The team running the patient search will need to remedy this...
		//Sorry everyone!
		var availableTags = [
			"Alex Gainer",
			"Phil Strong",
			"Mary Roth",
			"James Davis",
			"Anthony Masuda",
			"Bob Bobbers",
			"Ryan Ryaners",
			"Paul Paulers",
			"George Georgers",
			"Eric Ericson"
		];

		//Basic autocomplete functionality...
		//the data source is the array above.
		$( ".demo #patients" ).autocomplete({
			source: availableTags,
			minLength: 2,
			select: function( event, ui ) {
				log( ui.item ?
					"Selected: " + ui.item.value :
					"Nothing selected, input was " + this.value );
			}
		});
		
		
		$( ".sortable_widgets" ).sortable();
		$( ".sortable_widgets" ).disableSelection();

		/*
			DRAGGABLE CODE, but Probably going to delete this.
		*/

		$(".dragger").draggable();		
	
		$(".dragger").draggable({
			connectToSortable: ".sortable_widgets",
			helper: "clone",
			revert: "invalid"
		});

		$("ul, li").disableSelection();
		//okay, in this instance.
		//you need to expand the widget size or something...
		//maybe display the form for the specific widget...
		//oh gosh that will be hard...how the heck...
		$( ".drop_zone" ).droppable({
			drop: function( event, ui ) {
				$( this )
					.addClass( "ui-state-highlight" )
					.find( "p" )
						.html( "Dropped!" );
			}
		});
		/*
			END DRAGGABLE CODE, but Probably going to delete this.
		*/

		
		/*********************************************************
			ADD STATION CODE:
			DIALOG BOX,
			BUTTON,
			Function to add station.

		*********************************************************/
		//This method adds a station to the "#stations" div
		//we take in the station title and add the entire setup 
		//for an accordion and connect the accordion as a sortable
		function addStation(title) {
				var x = "<div class=\"group\" id =\"station_"+ title +"\" title =\"station_"+ title +"\"><h3><a href= \"#\">"+ title +
					"</a><span class='ui-icon ui-icon-close'>Remove Station</span></h3><div id=\"sections\"><ul><\/ul></div></div>";
				//Okay, this add the station to the stations ID in add_clinic.html and edit_clinic.html
				$("#add_section_dialog select").append("<option value= \"" + title + "\">"+ title +"</option>");
				//This connect the new group to an accordion and makes it sortable.
				$("#station_"+ title + " #sections" ).tabs();
				$("#stations").append(x).accordion('destroy')
					.accordion({
						collapsible: true,
						header: "> div > h3"
					})
					.sortable({
						axis: "y",
						handle: "h3",
						stop: function( event, ui ) 
						{
							// IE doesn't register the blur when sorting
							// so trigger focusout handlers to remove .ui-state-focus
							ui.item.children( "h3" ).triggerHandler( "focusout" );
						}
				});
		}

		//we need to somehow add some functionality to delete a station...
		//sweet this removes a station
		$( ".group h3 span.ui-icon-close" ).live( "click", function() {
			$(this).parent().parent().remove();
			//we also need to remove this title from the select option thingy in the add_station_dialog box
			//this will pass in the name of the station to a function to remove that specific option
			//from a select box in the section dialog box.
			removeStationOption($(this).parent().parent().find('a').text());
			
		});

		//function removeTabOption(part,tab_name)
		function removeStationOption(station_name)
		{
			$("#station_title_choice option[value=\"" + station_name +"\"]").remove();
		}

		//This is to disable the enter key from submitting the form
		//to the server...this would be bad...
		//button eq 0 is the enter button
		$("#add_station_dialog").keypress(function (event) {
			if (event.keyCode == 13) {
				event.preventDefault();
				$(this).parent()
				   .find("button:eq(0)").trigger("click");
			}
		});

		//This is to disable the enter key from submitting the form
		//to the server...this would be bad...
		//button eq 0 is the enter button
		$("#add_section_dialog").keypress(function (event) {
			if (event.keyCode == 13) {
				event.preventDefault();
				$(this).parent()
				   .find("button:eq(0)").trigger("click");
			}
		});

		
		// modal dialog init: custom buttons and a "close" callback reseting the form inside
		//eventually, you should create a function handler that manages 
		//dialog box creation...this seems a little excessive.
		//there are many simplifications that can be made here...
		var $add_station_dialog = $( "#add_station_dialog" ).dialog({
			autoOpen: false,
			modal: true,
			height:400,
			buttons: {
				Add: function() {
					//do some basic validation
					var errors_list = isValidSection($("#station_title").val(),"station");
					//if we have errors, send errors_list into addErrors(...)
					if(errors_list.length > 0)
					{
						addErrors($(this),errors_list);
					}
					else
					{
						
						addStation($("#station_title").val());
						$( this ).dialog( "close" );
					}
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			open: function() {
				$("#station_title").focus();
			},
			close: function() {
				$(".errors").remove().fadeOut();
				$("#station_title").val("");
			}
		});

		/*********************************************************
			ADD Section CODE:
			DIALOG BOX,
			BUTTON,
			Function to add section.

		*********************************************************/
		
		//This is for adding new sections to each station...
		var $add_section_dialog = $( "#add_section_dialog" ).dialog({
			autoOpen: false,
			modal: true,
			height:400,
			buttons: {
				Add: function() {
					var errors_list = isValidSection($("#section_title").val(),"section");
					//if we have errors, send errors_list into addErrors(...)
					if(errors_list.length > 0)
					{
						addErrors($(this),errors_list);
					}
					else
					{
						addSection($("#section_title").val(),$("#station_title_choice option:selected").val());
						$( this ).dialog( "close" );
					}
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			open: function() {
				$("#section_title").focus();
			},
			close: function() {
				$(".errors").remove().fadeOut();
				$("#section_title").val("");
			}
		});


		//Okay,
		//this method add a section to the corresponding station
		//we pass in the name of the section as "part"
		//and the station_name
		//then we create tabs out of the new section "part"
		//and connect the tabs as sortable items.
		function addSection(part,station_name)
		{
			var $section_tabs = $( "#station_" + station_name +" #sections").tabs({
				tabTemplate:"<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remove Tab</span></li>",
				add: function( event, ui ) {
					//$( ui.panel ).append( "<div>" + "Add some widgets..." + "</div>" );
					var x = $('<div>Boo</div>').attr('class', 'sortable_widgets');
					$( ui.panel ).append( x );
					$(x).sortable({connectWith:'.sortable_widgets'});
				}
			});
			$section_tabs.tabs("add","#tabs-"+ part, part);
			$( "#station_" + station_name +" #sections" ).tabs().find( ".ui-tabs-nav" ).sortable({ axis: "x" });
		}

		/*********************************************************
			END END END			
			ADD Section CODE:
			DIALOG BOX,
			BUTTON,
			Function to add section.

		*********************************************************/
		//when you add the widget in...have the sortable be present...
		//but wrap it into a droppable...
		//maybe have a droppable and then when you put the widget it...
		//you add a sortable div...
		//Yup, this looks ambiguous...but this is our delete function...
		//For applied Widgets...
		//you have to be careful though...we don't want this thing to be
		//deleted from within the widget box...
		//check to see what its parent is???
		//maybe only add the trash can once you have dropped it into a thing...
		$( ".dragger span" ).live( "click", function() {
			$(this).parent().remove();
		});

		//we need to fix this shizzz...
		// close icon: removing the tab on click
		// note: closable tabs gonna be an option in the future - see http://dev.jqueryui.com/ticket/3924
		//this is not work...we need to remedy this
		/*$( "#sections span.ui-icon-close" ).live( "click", function() {
			alert("Hey");
			var index = $( "li", $tabs ).index( $( this ).parent() );
			$tabs.tabs( "remove", index );
		});*/

		$( "#sections span.ui-icon-close" ).live( "click", function() {
			//var index = $( "li", $section_tabs ).index( $( this ).parent() );
			//var tab_name = $( "li a", $section_tabs ).text();
			//$section_tabs.tabs( "remove", index );
			alert("TBD Remove sections");
		});



		//This is for adding new sections to each station...
		var $add_widget_dialog = $( "#add_widget_dialog" ).dialog({
			autoOpen: false,
			modal: true,
			height:800,
			width:800,
			buttons: {
				Add: function() {
					/*var errors_list = isValidSection($("#section_title").val(),"section");
					//if we have errors, send errors_list into addErrors(...)
					if(errors_list.length > 0)
					{
						addErrors($(this),errors_list);
					}
					else
					{
						addSection($("#section_title").val(),$("#station_title_choice option:selected").val());
						$( this ).dialog( "close" );
					}*/
					$( this ).dialog( "close" );
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			open: function() {
				$("#widget_title").focus();
			},
			close: function() {
				//$(".errors").remove().fadeOut();
				//$("#section_title").val("");
			}
		});



		/*
			ALL OF OUR BUTTON CODE
		*/

		//lets work on adding a station
		// addTab button: just opens the dialog
		$( "#add_station_button" )
			.button({ icons: { primary: "ui-icon-circle-plus" }})
			.click(function() {
				$add_station_dialog.dialog( "open" );
		});


		$( "#add_section_button" )
			.button({ icons: { primary: "ui-icon-plusthick" }})
			.click(function() {
				$add_section_dialog.dialog( "open" );
		});


		$( "#add_widget_button" )
			.button({ icons: { primary: "ui-icon-gear" }})
			.click(function() {
				$add_widget_dialog.dialog( "open" );
		});
		
		

		$( "#clinic_save_button" )
			.button({ icons: { primary: "ui-icon-disk" }})
			.click(function() {
				alert("Hello");
		});

		
		
		$( "#clinic_load_button" )
			.button({ icons: { primary: "ui-icon-refresh" }})
			.click(function() {
				var clinic_name = $("#clinic_name_title").val() || "default";
				location.href = "http://127.0.0.1:8000/cda_builder/themes/hr4e/index.html?clinic=" + clinic_name;
				$.ajax({
					type: "POST",
					url: "http://127.0.0.1:8000/cda_builder/themes/hr4e/index.html",
					data: {"load_clinic": "yes"}
				});
		});

		
		$( "#minimize_widgets" )
			.button({ icons: { primary: "ui-icon-carat-2-n-s" }})
			.click(function() {
				if ($(".scroll-pane").is(":visible"))
			{
				$('.scroll-pane').hide('slow', function() {
    					
  				});
			}
			else
			{
				$('#slider').show('fast', function() {
    					
  				});
				$('.scroll-pane').show('slow', function() {
    					
  				});
			}
		});

		/*
			END END END ALL OF OUR BUTTON CODE
		*/

		

		/*
			THIS IS CODE TO MAKE A SCROLLBAR THAT CAN BE RESIZED
		*/

		//scrollpane parts
		var scrollPane = $( ".scroll-pane" ),
			scrollContent = $( ".scroll-content" );
		
		//build slider
		var scrollbar = $( ".scroll-bar" ).slider({
			slide: function( event, ui ) {
				if ( scrollContent.width() > scrollPane.width() ) {
					scrollContent.css( "margin-left", Math.round(
						ui.value / 100 * ( scrollPane.width() - scrollContent.width() )
					) + "px" );
				} else {
					scrollContent.css( "margin-left", 0 );
				}
			}
		});		

		//append icon to handle
		var handleHelper = scrollbar.find( ".ui-slider-handle" )
		.mousedown(function() {
			scrollbar.width( handleHelper.width() );
		})
		.mouseup(function() {
			scrollbar.width( "100%" );
		})
		.append( "<span class='ui-icon ui-icon-grip-dotted-vertical'></span>" )
		.wrap( "<div class='ui-handle-helper-parent'></div>" ).parent();
		
		//change overflow to hidden now that slider handles the scrolling
		scrollPane.css( "overflow", "hidden" );
		
		//size scrollbar and handle proportionally to scroll distance
		function sizeScrollbar() {
			var remainder = scrollContent.width() - scrollPane.width();
			var proportion = remainder / scrollContent.width();
			var handleSize = scrollPane.width() - ( proportion * scrollPane.width() );
			scrollbar.find( ".ui-slider-handle" ).css({
				width: handleSize,
				"margin-left": -handleSize / 2
			});
			handleHelper.width( "" ).width( scrollbar.width() - handleSize );
		}
		
		//reset slider value based on scroll content position
		function resetValue() {
			var remainder = scrollPane.width() - scrollContent.width();
			var leftVal = scrollContent.css( "margin-left" ) === "auto" ? 0 :
				parseInt( scrollContent.css( "margin-left" ) );
			var percentage = Math.round( leftVal / remainder * 100 );
			scrollbar.slider( "value", percentage );
		}
		
		//if the slider is 100% and window gets larger, reveal content
		function reflowContent() {
				var showing = scrollContent.width() + parseInt( scrollContent.css( "margin-left" ), 10 );
				var gap = scrollPane.width() - showing;
				if ( gap > 0 ) {
					scrollContent.css( "margin-left", parseInt( scrollContent.css( "margin-left" ), 10 ) + gap );
				}
		}
		
		//change handle position on window resize
		$( window ).resize(function() {
			resetValue();
			sizeScrollbar();
			reflowContent();
		});
		//init scrollbar size
		setTimeout( sizeScrollbar, 10 );//safari wants a timeout


		/*
			END SCROLLBAR CODE
		*/




	});





	
	

