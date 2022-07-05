import { submitEstimation } from "../../service/Estimation/Estimation.js";
import SimplePageLayout from "../templates/SimplePageLayout.js";
import EstimationForm from "../UI/organisms/EstimationForm.js";

const Estimation = (props) => {
  function onSubmit(input) {
    console.log("Input: ", input);
    submitEstimation(input).then((res) => {
      console.log("Response: ", res);
    });
  }

  return (
    <SimplePageLayout>
      <EstimationForm onSubmit={onSubmit} />
    </SimplePageLayout>
  );
};

export default Estimation;
