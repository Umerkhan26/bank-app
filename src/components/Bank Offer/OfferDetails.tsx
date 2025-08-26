// // import React from "react";
// // import { BankOffersContainer, BankOffersTitle } from "./bankOffer.styles";

// // const OfferDetails: React.FC = () => {
// //   return (
// //     <BankOffersContainer>
// //       <BankOffersTitle>No Offer Available</BankOffersTitle>
// //     </BankOffersContainer>
// //   );
// // };

// // export default OfferDetails;

// import React from "react";
// import { Table } from "react-bootstrap";
// import { BankOffersContainer, BankOffersTitle } from "./bankOffer.styles";

// const OfferDetails: React.FC = () => {
//   return (
//     <BankOffersContainer>
//       <BankOffersTitle>Bank Offers</BankOffersTitle>

//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Offer Title</th>
//             <th>Description</th>
//             <th>Points Required</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* Empty State */}
//           <tr>
//             <td colSpan={5} style={{ textAlign: "center", color: "gray" }}>
//               No Offer Available
//             </td>
//           </tr>
//         </tbody>
//       </Table>
//     </BankOffersContainer>
//   );
// };

// export default OfferDetails;

import React, { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import { BankOffersContainer, BankOffersTitle } from "./bankOffer.styles";
import { getBankOffersData } from "../../services/bankofferservice";

interface BankOffer {
  _id: string;
  title: string;
  description: string;
  discount: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
}

const OfferDetails: React.FC = () => {
  const [offers, setOffers] = useState<BankOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const data = await getBankOffersData();
        setOffers(data);
      } catch (err) {
        console.error("Failed to load offers", err);
      } finally {
        setLoading(false);
      }
    };
    loadOffers();
  }, []);

  return (
    <BankOffersContainer>
      <BankOffersTitle>Bank Offers</BankOffersTitle>

      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Offer Title</th>
              <th>Description</th>
              <th>Discount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {offers.length > 0 ? (
              offers.map((offer, index) => (
                <tr key={offer._id}>
                  <td>{index + 1}</td>
                  <td>{offer.title}</td>
                  <td>{offer.description}</td>
                  <td>{offer.discount}%</td>
                  <td style={{ color: offer.isActive ? "green" : "red" }}>
                    {offer.isActive ? "Active" : "Inactive"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", color: "gray" }}>
                  No Offer Available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </BankOffersContainer>
  );
};

export default OfferDetails;
