// import React, { useEffect, useState } from "react";
// import { fetchAllAdditionalItems } from "../../services/additionalItems";
// import { useNavigate } from "react-router-dom";
// import {
//   PremiumCard,
//   PremiumImage,
//   PremiumContent,
//   ApplyButton,
//   PremiumListContainer,
//   PremiumImageBox,
//   PremiumContainer,
//   Title,
//   PremiumPoints,
//   PremiumTitle,
//   PremiumDescription,
//   HeaderContainer,
//   ViewMoreButton,
//   ShimmerWrapper,
//   ShimmerCard,
//   ErrorMessage,
// } from "./additionalItems.styles";

// interface AdditionalItem {
//   _id: string;
//   id: string;
//   title: string;
//   image_url: string;
//   points_required: string;
//   buttonText?: string;
//   description: string;
//   qty?: number | null;
// }

// const AdditionalItems: React.FC = () => {
//   const [itemsData, setItemsData] = useState<AdditionalItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const handleApply = (id: string) => {
//     navigate(`/additional-item/${id}`);
//   };

//   const handleViewMore = () => {
//     navigate("/additional-items-list");
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await fetchAllAdditionalItems();

//         const items = response.data?.data || [];
//         setItemsData(items);
//       } catch (err: any) {
//         console.error("Error fetching additional items:", err);
//         setError(err.message || "An unexpected error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <PremiumContainer>
//         <HeaderContainer>
//           <Title>Additional Items</Title>
//         </HeaderContainer>
//         <ShimmerWrapper>
//           {[1, 2, 3].map((i) => (
//             <ShimmerCard key={i} />
//           ))}
//         </ShimmerWrapper>
//       </PremiumContainer>
//     );
//   }

//   if (error) {
//     return (
//       <PremiumContainer>
//         <HeaderContainer>
//           <Title>Additional Items</Title>
//         </HeaderContainer>
//         <ErrorMessage>
//           Error: {error}
//           <button
//             onClick={() => window.location.reload()}
//             style={{
//               marginLeft: "10px",
//               padding: "5px 10px",
//               backgroundColor: "#ef4444",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             Retry
//           </button>
//         </ErrorMessage>
//       </PremiumContainer>
//     );
//   }

//   return (
//     <PremiumContainer>
//       <HeaderContainer>
//         <Title>Additional Items</Title>
//         {itemsData.length > 3 && (
//           <ViewMoreButton onClick={handleViewMore}>View More</ViewMoreButton>
//         )}
//       </HeaderContainer>

//       <PremiumListContainer>
//         {itemsData.slice(0, 3).map((item) => (
//           <PremiumCard key={item._id}>
//             <PremiumImageBox>
//               <PremiumImage
//                 src={item.image_url}
//                 alt={item.title}
//                 onError={(e) => {
//                   (e.target as HTMLImageElement).src = "/default-image.jpg";
//                 }}
//               />
//             </PremiumImageBox>

//             <PremiumContent>
//               <PremiumPoints>{item.points_required} points</PremiumPoints>
//               <PremiumTitle>{item.title}</PremiumTitle>
//               <PremiumDescription>{item.description}</PremiumDescription>
//               <div
//                 style={{
//                   marginBottom: "10px",
//                   fontSize: "15px",
//                   fontWeight: "500",
//                 }}
//               >
//                 Qty: {item.qty ?? "Unlimited"}
//               </div>
//               {item.qty === 0 ? (
//                 <div style={{ color: "red", fontWeight: "bold" }}>
//                   Out of Stock
//                 </div>
//               ) : (
//                 <ApplyButton onClick={() => handleApply(item._id || item.id)}>
//                   {item.buttonText || "Redeem"}
//                 </ApplyButton>
//               )}
//             </PremiumContent>
//           </PremiumCard>
//         ))}
//       </PremiumListContainer>

//       {itemsData.length === 0 && !loading && (
//         <div style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}>
//           No additional items available at the moment.
//         </div>
//       )}
//     </PremiumContainer>
//   );
// };

// export default AdditionalItems;

import React, { useEffect, useState } from "react";
import { fetchAllAdditionalItems } from "../../services/additionalItems";
import { useNavigate } from "react-router-dom";
import {
  PremiumCard,
  PremiumImage,
  PremiumContent,
  //   ApplyButton,
  PremiumContainer,
  //   Title,
  PremiumPoints,
  PremiumTitle,
  //   PremiumDescription,
  ShimmerWrapper,
  ShimmerCard,
  // ErrorMessage,
} from "./additionalItems.styles";

interface AdditionalItem {
  _id: string;
  id: string;
  title: string;
  image_url: string;
  points_required: string;
  buttonText?: string;
  description: string;
  qty?: number | null;
}

const AdditionalItems: React.FC = () => {
  const [itemsData, setItemsData] = useState<AdditionalItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleApply = (id: string) => {
    navigate(`/additional-item/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchAllAdditionalItems();
        const items = response.data?.data || [];
        setItemsData(items);
      } catch (err: any) {
        console.error("Error fetching additional items:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <PremiumContainer>
        {/* <Title>Additional Items</Title> */}
        <ShimmerWrapper>
          {[1, 2, 3].map((i) => (
            <ShimmerCard key={i} />
          ))}
        </ShimmerWrapper>
      </PremiumContainer>
    );
  }

  if (error) {
    return null;
  }

  const item = itemsData[0];

  if (itemsData.length === 0) {
    return null;
  }

  return (
    <PremiumContainer>
      {/* <Title>Additional Items</Title> */}
      <PremiumCard
        onClick={() => handleApply(item._id || item.id)}
        style={{ cursor: "pointer" }}
      >
        <PremiumImage
          src={item.image_url}
          alt={item.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/default-image.jpg";
          }}
        />
        <PremiumContent>
          <PremiumPoints>{item.points_required} Points</PremiumPoints>
          <PremiumTitle>{item.title}</PremiumTitle>
          {/* <PremiumDescription>{item.description}</PremiumDescription> */}
          {item.qty === 0 ? (
            <div style={{ color: "red", fontWeight: "bold" }}>Out of Stock</div>
          ) : // <ApplyButton>{item.buttonText || "Redeem"}</ApplyButton>
          null}
        </PremiumContent>
      </PremiumCard>
    </PremiumContainer>
  );
};

export default AdditionalItems;
