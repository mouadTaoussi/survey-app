
if (window.location.pathname === "/surveyEditor" || window.location.pathname === "/dashboard") {

	// Show side menu for smaller devices
	document.querySelectorAll('#toggle-side-menu').forEach((toogle)=>{
		toogle.addEventListener('click',()=>{
			console.log('it works!');
			const sideMenu = document.querySelector('.sidebar-smaller-devices');

			if (sideMenu.classList.contains('show-sidebar')) {
				sideMenu.classList.add('hide-sidebar');
				sideMenu.classList.remove('show-sidebar');
			}
			else if (sideMenu.classList.contains('hide-sidebar')) {
				sideMenu.classList.add('show-sidebar');
				sideMenu.classList.remove('hide-sidebar');
			}

		})

	})
}

// Run those scripts at /dashboard
if ( window.location.pathname === "/dashboard" ){
	// Show dropdown in the Dashboard
	window.showDropdown = function (event) {
		console.log(event.path[1].children[3])
		if(event.path[1].children[3].classList.contains('display-none') && !event.path[1].children[3].classList.contains('display-block')) {
			event.path[1].children[3].classList.add('display-block')
			event.path[1].children[3].classList.remove('display-none')
		}else {
			event.path[1].children[3].classList.add('display-none')
			event.path[1].children[3].classList.remove('display-block')
		}
	}
	// Display Themes
	function darkTheme(){
		// Change the vars of the css
	}
	function lightTheme(){
		// Change the vars of the css
	}
}


// Run those scripts at /privacyPolicy and / and / 
// console.log('RAN')
if ( window.location.pathname === "/" || window.location.pathname === "/privacyPolicy" || window.location.pathname === "/docs" ){
	// Show menu ON smaller devices
	document.querySelector('.hamburger-menu').addEventListener('click',()=>{
		console.log('it works!')
		const menu = document.querySelector('.menu_content_for_smaller_devices');

		// Check the menu transform
		if (menu.classList.contains('scale')){

			// unDisplay the menu content
			menu.classList.add('un-scale')
			menu.classList.remove('scale')
		}
		else if (menu.classList.contains('un-scale')){

			// Display the menu content
			menu.classList.add('scale')
			menu.classList.remove('un-scale')
		}
	})
}

// Run those scripts at /privacyPolicy and / and /
if ( window.location.pathname === "/surveyEditor" || window.location.pathname === "/" ) {
	// Tabs feature !!
	const edit_tab = document.querySelector('.edit-tab');
	const responses_tab = document.querySelector('.responses-tab');

	edit_tab.addEventListener('click',()=>{
		document.querySelector('.survey-editor').style.display = '';
		document.querySelector('.responses').style.display = 'none';
		edit_tab.classList.add('active');
		responses_tab.classList.remove('active');
	})
	responses_tab.addEventListener('click',()=>{
		document.querySelector('.survey-editor').style.display = 'none';
		document.querySelector('.responses').style.display = 'block';
		responses_tab.classList.add('active');
		edit_tab.classList.remove('active');
		// Get results
		window.getResults();  // located in ./Responses.js:7:12
	})

	// Sortable list feature !!
	const question_list = document.querySelectorAll('.single-question');
	question_list.forEach((single)=>{
		single.addEventListener('dragstart',(e)=>{
			single.classList.add('hovered');
		})
		single.addEventListener('dragend',(e)=>{
		 	single.classList.remove('hovered');
		})
		single.addEventListener('dragover',(e)=>{
			single.classList.add('replace');
		})
		single.addEventListener('dragleave',(e)=>{
			single.classList.remove('replace');
		})
	})

	// Add new option 
	var addoption = document.querySelectorAll('.add-new-option');; // NodeList for the use below
	var list = document.querySelectorAll('.options-list');      // NodeList for the use below

	// Add new field !! !! !!
	document.querySelectorAll('.add_new_field').forEach((btn)=>{
		btn.addEventListener('click',()=>{
			// Grab the questions list
			const question_list = document.querySelector('.questions_list');

			// Create container
			const container = document.createElement('div');
			container.classList.add("single-question", "local-card", "local-mt-2", "local-p-2", "local-shadow");

			// Create draggbale button
			const draggable = document.createElement('div');
			draggable.classList.add('dragable'); 
			draggable.innerHTML = "<div></div><div></div><div></div><div></div><div></div><div></div>";

			// Create the Question input 
			const question_input = document.createElement('input');
			question_input.classList.add('form-control', 'mt-2');
			question_input.required;
			question_input.placeholder = "Type your question here";

			// Create the Question attachment files input
		/*	const files_input = document.createElement('div');
			const input = document.createElement('input');
			const label = document.createElement('label');
			files_input.classList.add("custom-file", "files-attachment");
			input.classList.add('custom-file-input');
			input.id = "validatedCustomFile";
			input.type = "file";
			input.onchange = getFile;
			label.classList.add('custom-file-label');
			label.for = "validatedCustomFile";
			label.innerHTML = "Choose files...";
			files_input.appendChild(input);
			files_input.appendChild(label);*/

			// Create options
			const options_area = document.createElement('div');
			const options = document.createElement('ul');
			const single = document.createElement('li');
			const option_input = document.createElement('input');
			const delete_input = document.createElement('i');
			const add_new_one = document.createElement('p');
			options_area.classList.add('options-area');
			options.classList.add('options-list');
			single.classList.add('option-item');
			option_input.classList.add("form-control");
			option_input.type='text';
			option_input.placeholder = "Option";
			delete_input.classList.add('delete-option', 'fas', 'fa-times');
			delete_input.onclick = deleteOption;
			add_new_one.classList.add('add-new-option', 'btn', 'btn-warning', 'btn-sm');
			add_new_one.innerHTML = "add option";
			single.appendChild(option_input);
			single.appendChild(delete_input);
			options.appendChild(single);
			options_area.appendChild(options);
			options_area.appendChild(add_new_one);

			// Create Settings
			const question_settings = document.createElement('div');
			question_settings.classList.add('question_settings');
			question_settings.innerHTML  = `
			<select style="display: inline;width: 180px;" class='form-control'>
				<option>MultipleChoice</option>
				<option>OneChoice</option>
				<option>ShortParagraph</option>
			</select>
			<i onclick="deleteField(event)" style="display: inline" class="delete-field mx-2 far fa-trash-alt"></i>
			`;

			// Create question id
			const question_id = document.createElement('p');
			question_id.style.display = "none";

			// Wrap them in the container
			container.appendChild(draggable);
			container.appendChild(question_input);
			// container.appendChild(files_input);
			container.appendChild(options_area);
			container.appendChild(question_settings);
			container.appendChild(question_id);

			// Wrap the container or the new single questions in the current question list
			question_list.appendChild(container);

			// Update the NodeList for the use below
			addoption = document.querySelectorAll('.add-new-option'); /// Static NodeList ! ! !
			list      = document.querySelectorAll('.options-list'); /// Static NodeList ! ! !

			// Call the add new option function to make it updated too with the NodeLists above 
			// whenever the NodeList of the addoption has incremented when the user added one more question field
			addNewOption(addoption,list);
			window.updateNodeList();
		})
	})

	// Init that function for add new option if the user hasn't added one more question field
	// if (addoption.length == 0){
	// 	addNewOption(addoption,list);	
	// }
	addNewOption(addoption,list);
	
	window.updateNodeList = () => {
		// Update the NodeList for the use below
		addoption = document.querySelectorAll('.add-new-option'); /// Static NodeList ! ! !
		list      = document.querySelectorAll('.options-list'); /// Static NodeList ! ! !

		// Call the add new option function to make it updated too with the NodeLists above 
		// whenever the NodeList of the addoption has incremented when the user added one more question field
		addNewOption(addoption,list);

	}

	function addNewOption(addoption,list){
		for (let i = 0; i < addoption.length; i++) {
		addoption[i].addEventListener('click',()=>{
			// Create new option
		 	const li = document.createElement('li');
		 	const input = document.createElement('input');
		 	const delete_icon = document.createElement('i');
		 	// Put styles and attributes to them
		 	li.classList.add('option-item');
		 	input.type = "text";
		 	input.classList.add('form-control');
		 	input.placeholder = "Option";
		 	delete_icon.classList.add('delete-option','fas','fa-times');
		 	delete_icon.onclick = deleteOption;
		 	// Append option elements to the option
		 	li.appendChild(input);
		 	li.appendChild(delete_icon);
		 	// Append option to the options list
		 	list[i].appendChild(li);
		})
		}		
	}
	/*
		When you run the file over webpack, webpack will try not to litter the global scope 
		and so the function will not be made available globally by default.
		If you want the function to be accessible outside the scope of he JS file,
		you should put it in the global scope.
	*/
	//  Delete option 
	window.deleteOption = (event)=>{
		event.path[1]/*.parentNode*/.remove();
	}

	// Delete field
	window.deleteField = (event)=>{
		event.path[2]/*.parentNode*/.remove();
	}
}