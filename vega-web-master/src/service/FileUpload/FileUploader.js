import {doPostFile, doGet} from '../BaseAPI.js';
const API_URL = process.env.API_URL;


export function fileUploader(fileInfo, token){
	console.log("In File Uploader", token);
	return doPostFile(`http://${API_URL}/api/venus/upload`, fileInfo, token);
}

export function fetchFiles(token){
	console.log("fetchFiles", token);
	return doGet(`http://${API_URL}/api/venus/listfiles`, token)
}

export function fetchData(name, token){
	return doGet(`http://${API_URL}/api/venus/fetchcontent?name=`+name, token)
}