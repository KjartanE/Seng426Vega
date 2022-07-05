import { useContext } from "react";
import { UserContext } from "../../auth/UserProvider.js";
import { submitEstimation } from "../../service/Estimation/Estimation.js";
import SimplePageLayout from "../templates/SimplePageLayout.js";
import EstimationForm from "../UI/organisms/EstimationForm.js";
import EstimationRequestTable from "../UI/organisms/EstimationRequestTable.js";

const Estimation = (props) => {
  const { user } = useContext(UserContext);

  var estimationTable;

  var estimationForm;

  if (user.role == "ROLE_ADMIN") {
    estimationTable = <EstimationRequestTable />;
  }

  if (user.role == "ROLE_STAFF") {
    estimationForm = <EstimationForm onSubmit={onSubmit} />;
  }

  function onSubmit(input) {
    console.log("Input: ", input);
    console.log("token: ", user.jwt);
    submitEstimation(input, user.jwt).then((res) => {
      console.log("Response: ", res);
      if (res === "SUCCESS") {
        alert("Successfully submitted estimation");
      }
    });
  }

  return (
    <SimplePageLayout>
      {estimationForm}
      {estimationTable}
    </SimplePageLayout>
  );
};

export default Estimation;
