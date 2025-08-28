// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { getStores } from "../../services/store";
// import L, { LatLngExpression } from "leaflet";
// import ClipLoader from "react-spinners/ClipLoader"; // Import ClipLoader

// import logoIcon from "../../assets/bank_al_falah2.webp";

// // ✅ Define custom icon correctly
// const customIcon = L.icon({
//   iconUrl: logoIcon,
//   iconSize: [30, 30],
//   iconAnchor: [20, 40],
//   popupAnchor: [0, -40],
// });

// interface StoreType {
//   id: string;
//   name: string;
//   latitude: number | null;
//   longitude: number | null;
// }

// const Store: React.FC = () => {
//   const [stores, setStores] = useState<StoreType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchStores = async () => {
//       try {
//         const storesData = await getStores();
//         console.log("Fetched Stores:", storesData);
//         setStores(storesData);
//       } catch (err) {
//         console.error("Error fetching stores:", err);
//         setError("Failed to load stores");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStores();
//   }, []);

//   if (loading)
//     return (
//       <div
//         style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
//       >
//         <ClipLoader color="#333" size={40} />
//       </div>
//     );

//   if (error) return <p>{error}</p>;

//   const validStores = stores.filter(
//     (store) => store.latitude !== null && store.longitude !== null
//   );

//   const defaultCenter: LatLngExpression = validStores.length
//     ? [validStores[0].latitude!, validStores[0].longitude!]
//     : [0, 0];

//   return (
//     <MapContainer
//       center={defaultCenter}
//       zoom={10}
//       style={{ height: "500px", width: "100%" }}
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       {validStores.map((store) => (
//         <Marker
//           key={store.id}
//           position={[store.latitude!, store.longitude!] as LatLngExpression}
//           icon={customIcon}
//         >
//           <Popup>
//             <div>
//               <h3>{store.name}</h3>
//               <p>
//                 <a
//                   href={`https://www.google.com/maps?q=${store.latitude},${store.longitude}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{
//                     textDecoration: "none",
//                     color: "blue",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   📍 Open Location: {store.latitude}, {store.longitude}
//                 </a>
//               </p>
//             </div>
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default Store;

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getStores } from "../../services/store";
import L, { LatLngExpression } from "leaflet";
import ClipLoader from "react-spinners/ClipLoader";

import logoIcon from "../../assets/Png/BANKS CURVED LOGO-09.png";
import { useParams } from "react-router-dom";

const customIcon = L.icon({
  iconUrl: logoIcon,
  iconSize: [30, 30],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

interface StoreType {
  id: string;
  name: string;
  latitude: number | null;
  longitude: number | null;
}

const Store: React.FC = () => {
  const { storeId } = useParams<{ storeId?: string }>();
  const [stores, setStores] = useState<StoreType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<StoreType | null>(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const storesData = await getStores();
        setStores(storesData);

        // If storeId exists, find the selected store; otherwise, reset selection
        if (storeId) {
          const store = storesData.find((s: StoreType) => s.id === storeId);
          setSelectedStore(store || null);
        } else {
          setSelectedStore(null);
        }
      } catch (err) {
        setError("Failed to load stores");
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [storeId]);

  if (loading)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <ClipLoader color="#333" size={40} />
      </div>
    );

  if (error) return <p>{error}</p>;

  const defaultCenter: LatLngExpression = selectedStore
    ? [selectedStore.latitude!, selectedStore.longitude!]
    : stores.length
    ? [stores[0].latitude!, stores[0].longitude!]
    : [0, 0];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={10}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {selectedStore ? (
        <Marker
          key={selectedStore.id}
          position={
            [
              selectedStore.latitude!,
              selectedStore.longitude!,
            ] as LatLngExpression
          }
          icon={customIcon}
        >
          <Popup>
            <h3>{selectedStore.name}</h3>
            <p>
              <a
                href={`https://www.google.com/maps?q=${selectedStore.latitude},${selectedStore.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "blue",
                  fontWeight: "bold",
                }}
              >
                📍 Open Location: {selectedStore.latitude},{" "}
                {selectedStore.longitude}
              </a>
            </p>
          </Popup>
        </Marker>
      ) : (
        stores.map((store) => (
          <Marker
            key={store.id}
            position={[store.latitude!, store.longitude!] as LatLngExpression}
            icon={customIcon}
          >
            <Popup>
              <h3>{store.name}</h3>
              <p>
                <a
                  href={`https://www.google.com/maps?q=${store.latitude},${store.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "blue",
                    fontWeight: "bold",
                  }}
                >
                  📍 Open Location: {store.latitude}, {store.longitude}
                </a>
              </p>
            </Popup>
          </Marker>
        ))
      )}
    </MapContainer>
  );
};

export default Store;
