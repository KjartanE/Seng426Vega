import React, { useContext, useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { UserContext } from "../../../auth/UserProvider";
import { getEstimates } from "../../../service/Estimation/Estimation";

const EstimationRequestTable = () => {
  const [estimates, setEstimates] = React.useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.jwt) {
      getEstimates(user.jwt).then((res) => {
        console.log("RES: ", res);
        setEstimates(res);
      });
    }
  }, [user.jwt]);

  return (
    <Row>
      <h1 className="mt-4">Estimate Requests</h1>
      <Col className="mx-auto mt-4" xs={12}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Package Type</th>
              <th>Company Size</th>
              <th>24/7 Support</th>
              <th>Data Backup</th>
              <th>Data Encryption</th>
              <th>Email</th>
            </tr>
          </thead>
          {estimates.length === 0 && (
            <tbody>
              <tr>
                <td colSpan={7}>No estimates found</td>
              </tr>
            </tbody>
          )}
          <tbody>
            {estimates.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.packageType}</td>
                <td>{item.companySize}</td>
                <td>{item.alwaysSupport ? "Yes" : "No"}</td>
                <td>{item.dataBackup ? "Yes" : "No"}</td>
                <td>{item.dataEncryption ? "Yes" : "No"}</td>
                <td>
                  <a href={"mailto:" + item.email}>
                    <i className="fas fa-envelope">{item.email}</i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};
export default EstimationRequestTable;
