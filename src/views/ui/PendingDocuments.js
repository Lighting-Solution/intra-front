import React from "react";
import ProjectTables from "../../components/digitalApproval/PendingTable";
import { Row, Col } from "reactstrap";

const PendingDocuments = () => {
  return (
    <Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* table-1*/}
      {/* --------------------------------------------------------------------------------*/}
      <Col lg="12">
        <ProjectTables />
      </Col>
    </Row>
  );
};

export default PendingDocuments;
