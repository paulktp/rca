var menu_html_rca = '';
var iBody = ''; 
	
$(function() {
		
	$('#rcaframe').ready(function () {
		showLoading()
	});

	$('#rcaframe').load(function(){
        
       iBody = $("#rcaframe").contents().find("body");
	       
		       
	   var mtoggle = iBody.find('h3.menu-toggle');
	   if($(window).width()<600){ mtoggle.css('display','none');}
		       
	   if(navigator.platform.indexOf("iPhone") != -1 || navigator.platform.indexOf("iPod") != -1){}else{}
		        
	   $("#rcaframe").height($(window).height())

	   var unEl = iBody.find("#bt_add_photos")
	   //console.log("unEl : " + unEl.attr('alt'))
			    
	   var id_post = iBody.find("div[id^='post-']").attr('id')
	   console.log("id_post : " + id_post)
			    
	   unEl.click(function() {
		   getPhoto(pictureSource.PHOTOLIBRARY, id_post); //From Photo Library
	   });
	    	    
	   //load menu
	   //
	   if(menu_html_rca == ''){
		   iBody.find('.main-navigation').clone().appendTo('#right-panel');
					
		   $(".main-navigation a.ui-link").each(function(){
			   if($(this).attr("href") == '/') $(this).attr("href","http://cr-ca.ktp-concept.com")
			   if($(this).attr("title") == 'Mon Compte') $(this).attr("href","http://cr-ca.ktp-concept.com/wp-login.php");
			   $(this).attr("target",'rcaframe');
		   });
					
		   menu_html_rca = 'menu_ok';
	   }
	   
	   $(".main-navigation a.ui-link").on("click",function(){
		   if($(this).parent('li').attr('id') == 'menu-item-808'){  //lyceo
			   window.open($(this).attr('href'),'_system');
			   return false;
		   }
		   showLoading()
		   $("#right-panel").panel( "close" );
		});
				
		hideLoading();
				
		iBody.find('a').click(function(){
			var start_link = $(this).attr('href').substring(0,1);
			if(start_link != '#' && start_link != ''){
				if($(this).attr('id') == 'lyceolink'){
					window.open($(this).attr('href'),'_system');
					return false;
				}
				if($(this).attr('class') == 'swipebox'){
					return false;
				}
				
				showLoading()
			}
		})
				
				
	});//end load iframe
		    
	function showLoading(){
		$.mobile.loading("show", {
							text: "Custom loader",
							textVisible: true,
							theme: "a",
							textonly: true,
							html: "Chargement en cours..."
							});
		   }
		   
	function hideLoading(){
		$.mobile.loading( "hide" );	
	}
});	