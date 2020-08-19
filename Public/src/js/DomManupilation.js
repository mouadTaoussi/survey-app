if (window.location.pathname === "/surveyEditor" ) {
	// Tabs feature !!
	const edit_tab = document.querySelector('.edit-tab')
	const responses_tab = document.querySelector('.responses-tab')
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
	const add_new_field = document.querySelector('.add_new_field').addEventListener('click',()=>{

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
		question_input.placeholder = "Which question you wanna write here?";

		// Create the Question attachment files input
		const files_input = document.createElement('div');
		const input = document.createElement('input');
		const label = document.createElement('label');
		files_input.classList.add("custom-file", "files-attachment");
		input.classList.add('custom-file-input');
		input.id = "validatedCustomFile";
		input.type = "file";
		label.classList.add('custom-file-label');
		label.for = "validatedCustomFile";
		label.innerHTML = "Choose files...";
		files_input.appendChild(input);
		files_input.appendChild(label);

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
		add_new_one.classList.add('add-new-option', 'p-2');
		add_new_one.innerHTML = "Add new one +";
		single.appendChild(option_input);
		single.appendChild(delete_input);
		options.appendChild(single);
		options_area.appendChild(options);
		options_area.appendChild(add_new_one);

		// Create Settings
		const question_settings = document.createElement('div');
		question_settings.classList.add('question_settings','p-2');
		question_settings.innerHTML  = `
		<i onclick="deleteField(event)" style="display: inline" class="delete-field mx-2 far fa-trash-alt"></i>
		<select style="display: inline;width: 180px;" class='mx-2 form-control'>
			<option>Multipe Choice</option>
			<option>One Choice</option>
			<option>Short paragraph</option>
		</select>
		`;

		// Wrap them in the container
		container.appendChild(draggable);
		container.appendChild(question_input);
		container.appendChild(files_input);
		container.appendChild(options_area);
		container.appendChild(question_settings);

		// Wrap the container or the new single questions in the current question list
		question_list.appendChild(container);

		// Update the NodeList for the use below
		addoption = document.querySelectorAll('.add-new-option'); /// Static NodeList ! ! !
		list      = document.querySelectorAll('.options-list'); /// Static NodeList ! ! !

		// Call the add new option function to make it updated too with the NodeLists above 
		// whenever the NodeList of the addoption has incremented when the user added one more question field
		addNewOption(addoption,list);

	})

	// Init that function for add new option if the user hasn't added one more question field
	if (addoption.length == 0){
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
}