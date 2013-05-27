
    // Wait for Cordova to connect with the device
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // Cordova is ready to be used!
    //
    function onDeviceReady() {
    	// Now safe to use the Codova API
    	
    	var networkState = checkConnection();
    	//navigator.notification.alert(networkState);
    	 if (networkState == Connection.NONE) {
             //window.location="local/index.html";
    		 navigator.notification.alert('Cette application requiere une connexion internet.');
         } else {
        	// window.location="http://cr-ca.ktp-concept.com/test.html";
        	 
         }
       	 
    	 
    	 //CAMERA
    	 //
    	 pictureSource=navigator.camera.PictureSourceType;
         destinationType=navigator.camera.DestinationType;
         
         id_post = 0;
         
         setTimeout(function() {
        	    navigator.splashscreen.hide();
        	}, 2000);

    	 
    }
    
    function alertDismissed(){
    	
    
    }
  
    
    function checkConnection() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

       
        return networkState;
      
    }
    
    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 
    
    var id_post;		//the post id for media
   
       

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64 encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
      
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI 
      console.log('imageURI : ' + imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');
      var largeImage = document.getElementById('smallImage');
      
      var f=  window.frames['rcaframe'];
      
      var largeImage = f.document.getElementById('smallImage');
      var button = f.document.getElementById('sendphoto');
            
      button.style.display = 'block';
      button.onclick = function() { uploadPhoto(imageURI) };
      
      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source,post_id) {
    	id_post = post_id;
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    // 
    function onFail(message) {
    	navigator.notification.alert('Failed because: ' + message);
    }
    
    
    // Called when a photo is successfully retrieved
    //
    function uploadPhoto(imageURI) {
    	
    	console.log('imageURI : ' + imageURI);
    	console.log('id_post_' + id_post);
    	
    	var options = new FileUploadOptions();
    	options.fileKey="file";
    	options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    	options.mimeType="image/jpeg";
    	var params = new Object();
    	params.id_post = id_post;
    	//params.value2 = "param";
    	options.params = params;
    	options.chunkedMode = false;
    	var ft = new FileTransfer();
    	ft.upload(imageURI, "http://cr-ca.ktp-concept.com/reception.php", win, fail, options);
    }
    
    function win(r) {
    	console.log("Code = " + r.responseCode);
    	console.log("Response = " + r.response);
    	console.log("Sent = " + r.bytesSent);
    	//alert(r.response);
    	navigator.notification.alert("Media correctement envoye !","Message");
    }
    
    function fail(error) {
    	//alert("An error has occurred: Code = " = error.code);
    	console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
        navigator.notification.alert("An error has occurred: Code = " = error.code);
    }
    
   

