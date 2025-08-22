import React from "react";
import { Table } from "react-bootstrap"; // using react-bootstrap table for nice styling

const NoPromotion: React.FC = () => {
  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        No Promotion Available
      </h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Promotion Title</th>
            <th>Description</th>
            <th>Points Required</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Empty state row */}
          <tr>
            <td colSpan={5} style={{ textAlign: "center", color: "gray" }}>
              No promotions available currently.
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default NoPromotion;
