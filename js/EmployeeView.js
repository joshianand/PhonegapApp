var EmployeeView = function(employee) {
 
    this.initialize = function() {
	
		var selfie = this ;
        this.el = $('<div/>');
		this.el.on('click', '.add-location-btn', function(event) { selfie.addLocation(event); });
		this.el.on('click', '.add-contact-btn', function(event) { selfie.addToContacts(event); });
		this.el.on('click', '.change-pic-btn', function(event) { selfie.changePicture(event); });
	};
 
    this.initialize();
	
	this.render = function() {
		this.el.html(EmployeeView.template(employee));
		return this;
	};
	
	this.addToContacts = function(event) {
		event.preventDefault();
		
		if (!navigator.contacts) {
			app.showAlert("Contacts API not supported", "Error");
			console.log('herer');
			return;
		}
		//console.log(navigator.contacts.save());
		console.log('addToContacts');
		var contact = navigator.contacts.create();
		contact.name = {givenName: employee.firstName, familyName: employee.lastName};
		var phoneNumbers = [];
		phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
		phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true); // preferred number
		contact.phoneNumbers = phoneNumbers;
		contact.save();
		app.showAlert(employee.firstName + " Contacts saved Successfully", "Success");
		return false;
	};
	
	this.addLocation = function(event) {
		event.preventDefault();
		console.log('addLocation');
		navigator.geolocation.getCurrentPosition(
			function(position) {
				$('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
			},
			function() {
				alert('Error getting location');
			});
		return false;
	};
	
	this.changePicture = function(event) {
		event.preventDefault();
		console.log('ChangePicture');
		if(!navigator.camera) {
		
			app.showAlert(" Baaapani Camera Dila nahi ka ?", "Error");
		
		}
		else {
		
			var options =   {   quality: 50,
                        destinationType: Camera.DestinationType.DATA_URL, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                        encodingType: 0     // 0=JPG 1=PNG
                    };
 
			navigator.camera.getPicture(
				function(imageData) {
					$('.employee-image', this.el).attr('src', "data:image/jpeg;base64," + imageData);
				},
				function() {
					app.showAlert('Error taking picture', 'Error');
				},
				options);
		}
		return false;
	};
 }


EmployeeView.template = Handlebars.compile($("#employee-tpl").html());