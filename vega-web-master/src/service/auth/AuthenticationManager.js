import {doPost} from '../BaseAPI.js';
const API_URL = process.env.API_URL;

export function login(userInfo){
	console.log("In Auth", userInfo);
	return doPost(`http://${API_URL}/api/login`, userInfo);
}