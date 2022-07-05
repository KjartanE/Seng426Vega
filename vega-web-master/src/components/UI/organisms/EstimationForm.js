import {
  Form,
  Button,
  Row,
  Col,
  ModalTitle,
  Tooltip,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";

const EstimationForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");

  const [packageType, setPackageType] = useState("");
  const [companySize, setCompanySize] = useState(0);
  const [alwaysSupport, setAlwaysSupport] = useState(false);
  const [dataBackup, setDataBackup] = useState(false);
  const [dataEncryption, setDataEncryption] = useState(false);

  const [price, setPrice] = useState(0);

  const submitForm = (evt) => {
    evt.preventDefault();
    console.log("Input: ", {
      email,
      packageType,
      companySize,
      alwaysSupport,
      dataBackup,
      dataEncryption,
      price,
    });
    onSubmit({
      packageType: packageType ? packageType : "N/A",
      email: email ? email : "N/A",
      companySize: companySize ? companySize : "N/A",
      alwaysSupport: alwaysSupport ? alwaysSupport : false,
      dataBackup: dataBackup ? dataBackup : false,
      dataEncryption: dataEncryption ? dataEncryption : false,
    });
  };

  useEffect(() => {
    var monthlyPrice = 0;
    if (packageType === "Basic") {
      monthlyPrice = 0;
    }
    switch (packageType) {
      case "Basic":
        monthlyPrice = 50;
        break;
      case "Small Business":
        monthlyPrice = 100;
        break;
      case "Medium Business":
        monthlyPrice = 200;
        break;
      case "Large Business":
        monthlyPrice = 300;
        break;
      case "Enterprise":
        monthlyPrice = 500;
        break;
    }

    if (companySize > 0) {
      monthlyPrice += companySize * 5;
    }

    if (alwaysSupport) {
      monthlyPrice += 25;
    }

    if (dataBackup) {
      monthlyPrice += 50;
    }

    if (dataEncryption) {
      monthlyPrice += 25;
    }

    setPrice(monthlyPrice);
  }, [packageType, companySize, alwaysSupport, dataBackup, dataEncryption]);

  const renderTooltip = (props) => {
    if (companySize === "0" || companySize === "" || packageType === "") {
      return (
        <Tooltip id="button-tooltip" {...props}>
          Select a package type and company size to submit an estimate
        </Tooltip>
      );
    }
  };

  const getPackagePrice = () => {
    switch (packageType) {
      case "Basic":
        return 50;
        break;
      case "Small Business":
        return 100;
        break;
      case "Medium Business":
        return 200;
        break;
      case "Large Business":
        return 300;
        break;
      case "Enterprise":
        return 500;
        break;
    }
  };

  const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;

  return (
    <Row>
      <Col className="mx-auto" xs={4}>
        <Form>
          <ModalTitle className="mt-4 mb-2">Request an Estimate</ModalTitle>
          <Form.Group className="mb-3">
            <Form.Label>Package Type</Form.Label>
            <Form.Select
              type="text"
              onChange={(e) => setPackageType(e.target.value)}
            >
              <option value="">Select package type</option>
              <option value="Basic">Basic</option>
              <option value="Small Business">Small Business</option>
              <option value="Large Business">Large Business</option>
              <option value="Enterprise">Enterprise</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Company Size (est. number of users)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setCompanySize(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              label="24/7 Support"
              type="checkbox"
              onChange={(e) => setAlwaysSupport(e.target.checked)}
            />
            <Form.Check
              label="Data Backup"
              type="checkbox"
              onChange={(e) => setDataBackup(e.target.checked)}
            />
            <Form.Check
              label="Data Encryption"
              type="checkbox"
              onChange={(e) => {
                setDataEncryption(e.target.checked);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Col>
      <Col xs={5}>
        <ModalTitle className="mt-4 mb-4">Your Estimate</ModalTitle>
        <div className="text-center">
          {price === 0 &&
            packageType === "" &&
            (!companySize || companySize === "0" || companySize === "") &&
            !alwaysSupport &&
            !dataBackup &&
            !dataEncryption && (
              <div>
                <h5>
                  Select from the options on the left to build an estimate.
                </h5>
              </div>
            )}
          {price !== 0 && (
            <h2>
              Monthly Price: <h1>${price}/mo</h1>
            </h2>
          )}
          {packageType !== "" && (
            <h5>
              Package Type: {packageType} (${getPackagePrice()}/mo)
            </h5>
          )}
          {companySize > 0 && (
            <h5>
              Company Size: {companySize} (${companySize * 2}/mo)
            </h5>
          )}
          {alwaysSupport && <h5>24/7 Support ($25/mo)</h5>}
          {dataBackup && <h5>Data Backup ($50/mo)</h5>}
          {dataEncryption && <h5>Data Encryption ($25/mo)</h5>}
        </div>
        <Form onSubmit={submitForm}>
          <Form.Group>
            <Form.Label className="mt-4">
              <i>
                Request an estimation to have an estimator review your
                preferences and contact you regarding advanced options.
              </i>
            </Form.Label>
            <div>
              <ConditionalWrapper
                condition={
                  companySize === "0" ||
                  companySize === "" ||
                  packageType === ""
                }
                wrapper={(children) => (
                  <OverlayTrigger overlay={renderTooltip} placement="bottom">
                    {children}
                  </OverlayTrigger>
                )}
              >
                <div>
                  <Button
                    variant="primary"
                    style={{ width: "100%" }}
                    type="submit"
                    disabled={
                      companySize === "0" ||
                      companySize === "" ||
                      packageType === ""
                    }
                    onClick={submitForm}
                  >
                    Request Estimation
                  </Button>
                </div>
              </ConditionalWrapper>
            </div>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};
export default EstimationForm;
