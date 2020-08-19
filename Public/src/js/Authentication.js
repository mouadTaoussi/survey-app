import axios from 'axios';
import { connection } from './firebaseConnection';


if (window.location.pathname === "/dashboard" ) {
	// Firebase connection
	const usersAvatar = connection().ref('/usersAvatar');
	// // Update user + add avatar
	// function authentication(){
	// 	alert('it works!!!')
	// }
	// export { authentication };	
}

