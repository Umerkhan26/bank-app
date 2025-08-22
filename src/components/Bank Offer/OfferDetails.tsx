// import React from "react";
// import { BankOffersContainer, BankOffersTitle } from "./bankOffer.styles";

// const OfferDetails: React.FC = () => {
//   return (
//     <BankOffersContainer>
//       <BankOffersTitle>No Offer Available</BankOffersTitle>
//     </BankOffersContainer>
//   );
// };

// export default OfferDetails;

import React from "react";
import { Table } from "react-bootstrap";
import { BankOffersContainer, BankOffersTitle } from "./bankOffer.styles";

const OfferDetails: React.FC = () => {
  return (
    <BankOffersContainer>
      <BankOffersTitle>Bank Offers</BankOffersTitle>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Offer Title</th>
            <th>Description</th>
            <th>Points Required</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Empty State */}
          <tr>
            <td colSpan={5} style={{ textAlign: "center", color: "gray" }}>
              No Offer Available
            </td>
          </tr>
        </tbody>
      </Table>
    </BankOffersContainer>
  );
};

export default OfferDetails;
