import express from "express";
import fileUpload from "express-fileupload";
import { fetchestimates, submitestimate } from "../services/EstimateAPI.js";

let router = express();

router.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

router.all("/fetchestimates", (req, res) => {
  console.log("Fetching estimates");
  fetchestimates(
    "http://localhost:8080/venus/estimate/fetchestimates",
    req.headers
  )
    .then((response) => {
      console.log("Response", response);
      res.send(response);
    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.send(error);
    });
});

router.get("/submitestimate", (req, res) => {
  console.log("Request: Submit Estimate");
  const { packageType } = req.query;
  const { companySize } = req.query;
  const { email } = req.query;
  const { alwaysSupport } = req.query;
  const { dataBackup } = req.query;
  const { dataEncryption } = req.query;
  submitestimate(
    `http://localhost:8080/venus/estimate/submitestimate?packageType=${packageType}&companySize=${companySize}&email=${email}&alwaysSupport=${alwaysSupport}&dataBackup=${dataBackup}&dataEncryption=${dataEncryption}`,
    req.headers
  )
    .then((response) => {
      console.log("Response", response);
      res.send(response);
    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.send(error);
    });
});

export default router;
