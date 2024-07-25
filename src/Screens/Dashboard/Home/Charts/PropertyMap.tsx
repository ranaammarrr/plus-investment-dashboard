// import React, { useEffect } from "react";
// import ReactDOM from "react-dom";
// import {
//   MapsComponent,
//   Inject,
//   ILoadedEventArgs,
//   MapsTheme,
//   LayersDirective,
//   LayerDirective,
//   MarkersDirective,
//   MarkerDirective,
//   Marker,
//   Legend,
//   Zoom,
//   MapsTooltip,
// } from "@syncfusion/ej2-react-maps";
// import { Browser } from "@syncfusion/ej2-base";
// import * as data from "../map-data/dataSource.json";
// import * as worldMap from "../map-data/worldMap.json";
// import { Card, Layout, Typography } from "antd";
// import "antd/dist/reset.css";
// import { useAppDispatch, useAppSelector } from "../../../../Hooks/reduxHook";
// import { getAllProperties } from "../../../../Redux/PropertyListing/propertyActions";
// import { location, logo } from "../../../../Assets/assets";
// import { Line } from "react-chartjs-2";
// // import './PropertyMap.css'; // Custom CSS for Ant Design and other styles

// const { Content } = Layout;
// const { Title } = Typography;

// interface DataPoint {
//   latitude: any;
//   longitude: any;
//   name: string;
// }

// const dataSource: any = data;
// const worldMapData: any = worldMap;

// const SAMPLE_CSS = `
//     .control-fluid {
//         padding: 0px !important;
//     }`;

// const markers: DataPoint[] = [
//   {
//     name: "North America",
//     latitude: 59.88893689676585,
//     longitude: -109.3359375,
//   },
//   {
//     name: "South America",
//     latitude: -6.64607562172573,
//     longitude: -55.54687499999999,
//   },
// ];

// const PropertyMap: React.FC = () => {
//   const { properties } = useAppSelector((state) => state.property);

//   const dispatch = useAppDispatch();

//   const onMapsLoad = (args: ILoadedEventArgs): void => {
//     let maps = document.getElementById("maps");
//     if (maps) {
//       maps.setAttribute("title", "");
//     }
//   };
//   useEffect(() => {
//     dispatch(getAllProperties());
//   }, []);

//   const load = (args: ILoadedEventArgs): void => {};

//   //   let propertyMarkers: DataPoint[] = [];

//   const propertyMarkers: DataPoint[] =
//     properties?.length > 0
//       ? properties.map((property: any) => ({
//           latitude: property.location.lat,
//           longitude: property.location.lng,
//           name: property.name,
//         }))
//       : [];

//   return (
//     <>
//       <Card
//         style={{
//           marginTop: "20px",
//           backgroundColor: "#F9FAFB",
//           height: "500px",
//           width: "100%",
//           boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
//         }}
//       >
//         <Layout>
//           {/* <Content style={{ padding: '20px 50px' }}> */}
//           {properties && properties.length > 0 ? (
//             <div>
//               <MapsComponent
//                 id="maps"
//                 loaded={onMapsLoad}
//                 load={load}
//                 zoomSettings={{ enable: false }}
//                 legendSettings={{ visible: true }}

//               >
//                 <Inject services={[Marker, Legend, MapsTooltip]} />
//                 <LayersDirective>
//                   <LayerDirective
//                     shapeData={worldMapData}
//                     shapePropertyPath="continent"
//                     shapeDataPath="continent"
//                     dataSource={dataSource}
//                     shapeSettings={{ colorValuePath: "color" }}
//                     >
//                     <MarkersDirective>
//                       <MarkerDirective
//                         visible={true}
//                         template='<div style="font-size: 12px;color:#666666;text-shadow: 0px 1px 1px black;font-weight: 500;width:50px">{{:name}}</div>'
//                         animationDuration={0}
//                         dataSource={markers}
//                         />
//                       <MarkerDirective
//                         visible={true}
//                         shape="Image"
//                         imageUrl={location}
//                         height={20}
//                         width={20}
//                         animationDuration={0}
//                         tooltipSettings={{ visible: true, valuePath: "name" }}
//                         dataSource={propertyMarkers}
//                         />
//                     </MarkersDirective>
//                   </LayerDirective>
//                 </LayersDirective>
//               </MapsComponent>
//             </div>
//           ) : (
//             [] // Add a loading indicator or message
//           )}
//           {/* </Content> */}
//         </Layout>
//       </Card>
//     </>
//   );
// };

// export default PropertyMap;
import React from "react";

function PropertyMap() {
  return <div>PropertyMap</div>;
}

export default PropertyMap;
