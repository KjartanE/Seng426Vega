import { doGet, doSubmitEstimation } from "../BaseAPI.js";

export function submitEstimation(estimate, token) {
  console.log("SUBMITTING ESTIMATION", estimate);
  return doSubmitEstimation(
    `http://localhost:8000/api/estimate/submitestimate?packageType=${estimate.packageType}&companySize=${estimate.companySize}&email=${estimate.email}&alwaysSupport=${estimate.alwaysSupport}&dataBackup=${estimate.dataBackup}&dataEncryption=${estimate.dataEncryption}`,
    token
  );
}

export function getEstimates(token) {
  console.log("GOT A TOKEN HERE: ", token);
  return doGet("http://localhost:8000/api/estimate/fetchestimates", token);
}
