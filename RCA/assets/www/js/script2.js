var menu_html_rca = '';
var iBody = ''; 
var url_site = 'http://cr-ca.ktp-concept.com';
	
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

	   var bt_add_photos = iBody.find("#bt_add_photos")
	   var bt_add_videos = iBody.find("#bt_add_videos")
	   
	   //console.log("bt_add_photos : " + bt_add_photos.attr('alt'))
			    
	   var id_post = iBody.find("div[id^='post-']").attr('id')
	   console.log("id_post : " + id_post)
			    
	   bt_add_photos.click(function() {
		   getPhoto(pictureSource.PHOTOLIBRARY, id_post); //From Photo Library
	   });
	   bt_add_videos.click(function() {
		   getVideo(pictureSource.PHOTOLIBRARY, id_post);
	   });
	    	    
	   //load menu
	   //
	   if(menu_html_rca == ''){
		   iBody.find('.main-navigation').clone().appendTo('#right-panel');
					
		   $(".main-navigation a").each(function(){
			   if($(this).attr("href") == '/') $(this).attr("href",url_site)
			   if($(this).attr("title") == 'Mon Compte') $(this).attr("href",url_site+"/wp-login.php");
			   $(this).attr("target",'rcaframe');
		   });
					
		   menu_html_rca = 'menu_ok';
	   }
	   
	   $(".main-navigation a").on("click",function(){
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
				if($(this).attr('class') != 'swipebox' &&
				  ($(this).attr('class') != 'nivo-lightbox'){
					showLoading()
				}

				
				
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