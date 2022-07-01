import {doPostFile, doGet} from '../BaseAPI.js';

const API_URL = process.env.API_URL;

export function fetchuser(token){
	return doGet(`http://${API_URL}/api/venus/admin/getusers`, token)
}

export function enableAccount(username,token){
	return doGet(`http://${API_URL}/api/venus/admin/enableuser?enable=true&username=`+username, token)	
}

export function changeAccountRole(username, role, token){
	return doGet(`http://${API_URL}/api/venus/admin/changerole?username=`+username+`&role=`+role, token)
}