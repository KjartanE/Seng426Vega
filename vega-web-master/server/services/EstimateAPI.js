import { doGet } from "./HTTPRequestAPI.js";

export function fetchestimates(url, headers) {
  console.log(headers);
  return doGet(url, headers["authorization"]);
}

export function submitestimate(url, headers) {
  console.log(headers);
  console.log(url);
  return doGet(url, headers["authorization"]);
}

