var BASEURL = "/Lab4/todo/";

var create = document.getElementById("create");
var view = document.getElementById("view");
var viewAll = document.getElementById("viewAll");
var remove = document.getElementById("remove");
var title = document.getElementById("title");
var request_form = document.getElementById("request_form");
var lab3_id = document.getElementById("lab3_id");
var lab3_message = document.getElementById("lab3_message");
var message = document.getElementById("message");
var data_container = document.getElementById("data_container");

create.onclick = function() {
	//remove the active classes
	view.removeAttribute("class");
	viewAll.removeAttribute("class");
	remove.removeAttribute("class");
	request_form.removeAttribute("class");
	lab3_message.removeAttribute("class");
	
	message.removeAttribute("class");
	message.innerHTML="";
	
	var todo_table = document.getElementById("todo_table");
	if (todo_table) {
		todo_table.removeAttribute("class");
		todo_table.setAttribute("class", "hidden");
		todo_table.innerHTML="";
	}

	//set to active
	create.setAttribute('class','active');
	lab3_message.setAttribute('class','form-control');
	//set title
	title.innerHTML = "Create/Update a To-Do"
}
view.onclick = function() {
	//remove the active classes
	create.removeAttribute("class");
	viewAll.removeAttribute("class");
	remove.removeAttribute("class");
	request_form.removeAttribute("class");
	lab3_message.removeAttribute("class");

	message.removeAttribute("class");
	message.innerHTML="";

	var todo_table = document.getElementById("todo_table");
	if (todo_table) {
		todo_table.removeAttribute("class");
		todo_table.innerHTML="";
	}

	//set to active
	view.setAttribute('class','active');
	//set title
	title.innerHTML = "View a To-Do by ID";
	lab3_message.setAttribute("class", "hidden");
}
viewAll.onclick = function() {
	//remove the active classes
	create.removeAttribute("class");
	view.removeAttribute("class");
	remove.removeAttribute("class");
	request_form.removeAttribute("class");
	lab3_message.removeAttribute("class");
	message.removeAttribute("class");
	message.innerHTML="";
	
	var todo_table = document.getElementById("todo_table");
	if (todo_table) {
		todo_table.removeAttribute("class");
		todo_table.innerHTML="";
	}
	//set to active
	viewAll.setAttribute('class','active');
	//set title
	title.innerHTML = "View All To-Do's";
	request_form.setAttribute("class", "hidden");
	//request
	$.get( BASEURL, function(data) {
		if (data.length > 0) {
			var table = "<table id=\"todo_table\" class=\"table table-bordered table-hover table-sm\">" +
							"<tr>"+
								"<th>id</th>" +
								"<th>message</th>"+
							"</tr>";
			for (i = 0; i < data.length; i++) {
				table += 	"<tr>"+
								"<td>"+data[i].id+"</td>"+
								"<td>"+data[i].message+"</td>"+
							"</tr>";
			}
			table += 	"</table>";
			data_container.innerHTML = table;
		}
	});
}
remove.onclick = function() {
	//remove the active classes
	create.removeAttribute("class");
	view.removeAttribute("class");
	viewAll.removeAttribute("class");
	request_form.removeAttribute("class");
	lab3_message.removeAttribute("class");
	message.removeAttribute("class");
	message.innerHTML="";
	
	var todo_table = document.getElementById("todo_table");
	if (todo_table) {
		todo_table.removeAttribute("class");
		todo_table.setAttribute("class", "hidden");
		todo_table.innerHTML="";
	}

	//set to active
	remove.setAttribute('class','active');

	//set title
	title.innerHTML = "Remove a To-Do by ID";
	lab3_message.setAttribute("class", "hidden");
}
$('#request_form').on('submit', function () {
	var active = document.getElementsByClassName("active")[0].id;
	var payload = {id: lab3_id.value, message: lab3_message.value};
	switch (active) {
		case "create": 	$.get(BASEURL+lab3_id.value, function(data) {
							if (data.id && data.message) {
								$.ajax({
				    				url: BASEURL,
				    				type: 'PUT',
				    				data: payload,
				    				success: function(result) {
					  					message.setAttribute("class", "alert alert-success");
					  					message.innerHTML = "Success";		    				},
									error: function() {
					  					message.setAttribute("class", "alert alert-danger");
					  					message.innerHTML = "Error!";
									}
								});	
							} else {
								$.post(BASEURL, payload, function(data) {
					  				if(data.success) {
					  					message.setAttribute("class", "alert alert-success");
					  					message.innerHTML = "Success";
					  				}else {
					  					message.setAttribute("class", "alert alert-danger");
					  					message.innerHTML = "Error!";
					  				}
								});
							}
						});
						break;
		case "view": 	$.get(BASEURL+lab3_id.value, function(data) {
							if (data.id && data.message) {
								var table = "<table id=\"todo_table\" class=\"table table-bordered table-hover table-sm\">" +
												"<tr>"+
													"<th>id</th>" +
													"<th>message</th>"+
												"</tr>"+
												"<tr>"+
													"<td>"+data.id+"</td>"+
													"<td>"+data.message+"</td>"+
												"</tr>" +
											"</table>";
								data_container.innerHTML = table;
							}
						});
						break;
		case "viewAll": break;
		case "remove": 	$.ajax({
		    				url: BASEURL+lab3_id.value,
		    				type: 'DELETE',
		    				success: function(result) {
			  					message.setAttribute("class", "alert alert-success");
			  					message.innerHTML = "Success";		    				},
							error: function() {
			  					message.setAttribute("class", "alert alert-danger");
			  					message.innerHTML = "Error!";
							}
						});break;
	}
    return false;
});


