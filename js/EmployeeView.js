var EmployeeView = function(employee) {
 
    this.initialize = function() {
	
		var selfie = this ;
        this.el = $('<div/>');
		this.el.on('click', '.add-location-btn', function(event) { selfie.addLocation(event); });
		this.el.on('click', '.add-contact-btn', function(event) { selfie.addToContacts(event); });
	};
 
    this.initialize();
	
	this.render = function() {
		this.el.html(EmployeeView.template(employee));
		return this;
	};
	
	this.addToContacts = function(event) {
		event.preventDefault();
		console.log('addToContacts');
		if (!navigator.contacts) {
			this.app.showAlert("Contacts API not supported", "Error");
			return;
		}
		var contact = navigator.contacts.create();
		contact.name = {givenName: employee.firstName, familyName: employee.lastName};
		var phoneNumbers = [];
		phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
		phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true); // preferred number
		contact.phoneNumbers = phoneNumbers;
		contact.save();
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
 
 }


EmployeeView.template = Handlebars.compile($("#employee-tpl").html());