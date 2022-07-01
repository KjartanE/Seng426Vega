import { doGet, doPost } from "../BaseAPI.js";

export function submitEstimation(estimation) {
  return doPost("http://localhost:8000/api/submitestimate/", estimation);
}

export function getEstimations() {
  return doGet("http://localhost:8000/api/fetchestimates");
}
