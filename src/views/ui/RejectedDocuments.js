import React from "react";
import ProjectTables from "../../components/digitalApproval/RejectedTable";
import { Row, Col } from "reactstrap";

const PendingDocuments = () => {
  return (
    <Row>
      <Col lg="12">
        <ProjectTables />
      </Col>
    </Row>
  );
};

export default PendingDocuments;
