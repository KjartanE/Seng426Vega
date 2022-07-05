import { doGet, doPost } from "../BaseAPI.js";

export function submitEstimation(estimation) {
  return doPost("http://localhost:8000/api/estimation", estimation);
}

export function getEstimations() {
  return doGet("http://localhost:8000/api/estimations");
}
