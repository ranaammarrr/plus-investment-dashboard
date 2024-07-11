import React, { useEffect, useState } from "react";
import { Space, Tag } from "antd";
import { SearchOutlined, EyeOutlined, ArrowLeftOutlined,PaperClipOutlined } from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import { getAllInvoices } from "../../../Redux/Transaction/TransactionAction";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import AppTable, { DataType } from "../../../Components/Table/AppTable";
import InputField from "../../../Components/InputFeild/InputFeild";
import { getAllProperties } from "../../../Redux/PropertyListing/propertyActions";
import { formattedDate } from "../../../Utils/helperFunctions";
import { addPropertyDetail } from "../../../Redux/PropertyListing/listingSlice";
import { link, linkImg } from "../../../Assets/assets";

const CounterOffers: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedProperty, setSelectedProperty] = useState<DataType | null>(
    null
  );
  const [propertyRows, setPropertyRows]= useState<boolean>(true)
  const [propertyId, setPropertyId] = useState(null)

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { users, isLoading } = useAppSelector((state) => state.user);
  // const { transaction } = useAppSelector((state) => state.transaction);
  const { properties } = useAppSelector((state) => state.property);


  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);
  console.log(window.location.origin)
  // let propertyId

  const handlePropertyAction = (id:any)=>{
// propertyId = id;
setPropertyId(id)
setPropertyRows(false)

  }
  const PropertiesWithOfferscolumns = [
    {
      title: "Property Title",
      dataIndex: "propertyTitle",
      key: "propertyTitle",
      width: "25%",
      render: (name: string, record: DataType) => {
        const handlePropertyDetail = (propertyID: string) => {
          navigate("/counter-offers", { state: { propertyID } });

          // Open a new tab with the propertyDetails route and pass propertyID as query parameter
          const url = new URL(`${window.location.origin}/propertyDetails`);
          url.searchParams.set("propertyID", propertyID);
          window.open(url.toString(), "_blank");
        };
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              padding: "5px",
              // cursor: "pointer",
            }}
            // onClick={() => handleNavigateToTimlineFeed()}
          >
            <span>{name}</span>
            {/* <Space size="small"> */}
            <img 
              src={linkImg} alt="" 
              style={{ height:"17px",width:"17px",marginLeft:"5px"}}
              onClick={() => handlePropertyDetail(record.id)}
            />
         

          </div>
        );
      
      },
    },

    // {
    //   title: "",
    //   dataIndex: "1",
    //   key: "1",
    //   // width: "5%",
    //   render: (name: string, record: DataType) => {
    //     const handlePropertyDetail = (propertyID: string) => {
    //       navigate("/propertyDetails", { state: { propertyID } });
    //     };
    //     return (
    //       <div
    //         style={{
    //           display: "flex",
    //           alignItems: "center",
    //           borderRadius: "5px",
    //           padding: "5px",
    //           // cursor: "pointer",
    //         }}
    //         // onClick={() => handleNavigateToTimlineFeed()}
    //       >
    //         <span>{name}</span>
    //         <Space size="small">
    //         <PaperClipOutlined 
    //           style={{ fontSize: 14, marginLeft:10}}
    //           onClick={() => handlePropertyDetail(record.id)}
    //         />
    //       </Space>

    //       </div>
    //     );
    //   },

    // },
    {
      title: "Seller",
      dataIndex: "seller",
      key: "seller",
      width: "25%",
    },
    {
      title: "Published",
      dataIndex: "published",
      key: "published",
      width: "25%",
      sorter: (a: DataType, b: DataType) =>
        new Date(a.published).getTime() - new Date(b.published).getTime(),
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   width: "25%",
    // },

    {
      title: "Action",
      key: "action",
      width: "25%",
      render: (_: any, record: DataType) => {
        
        return (
          <Space size="middle">
            <EyeOutlined
              style={{ fontSize: 24, marginLeft: 6 }}
              onClick={()=>handlePropertyAction(record.id)}
            />
          </Space>
        );
      },
    },
  ];
  const counterOffersColumns = [
    {
      title: "Offer Title",
      dataIndex: "note",
      key: "note",
      width: "20%",
    },
    {
      title: "Offer Amount",
      dataIndex: "offerAmount",
      key: "offerAmount",
      width: "15%",
    },
    { title: "Buyer", dataIndex: "buyer", key: "buyer", width: "15%" },
    {
      title: "Published",
      dataIndex: "startDate",
      key: "startDate",
      width: "20%",
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "10%",
        render: (status: string) => (
          <Tag
          color={
            status == "accepted"
            ? "#386641"
            : status == "pending"
            ? "#f4d35e"
            : status == "rejected"
            ? "#9d0208"
            : "#f4d35e"
          }
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: 12,
            color: "white",
            padding: "2px 4px",
          }}
        >
          {status && status || "pending"}
        </Tag>
        ),
      },

    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_: any, record: DataType) => {
        const handleView = (record: DataType) => {
          dispatch(addPropertyDetail(record))
          navigate("/view-counter-offer");
        };
        return (
          <Space size="middle">
            <EyeOutlined
              style={{ fontSize: 24, marginLeft: 6 }}
              onClick={() => handleView(record)}
            />
          </Space>
        );
      },
    },
  ];


  const sortedProperties = [...properties].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());


  const handleChange = (val: string) => {
    setSearchValue(val);
  };
  const PropertiesWithOffersData =
  searchValue !== ""
    ? sortedProperties
        .filter((property) => property.counterOffers.length > 0) // Filter properties with counterOffers
        .filter((property) =>
          property.name
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )
        .map((property) => ({
          propertyTitle: property.name,
          seller: property.user.name,
          published: formattedDate(property.createdAt),
          id: property._id,
        }))
    : sortedProperties
        .filter((property) => property.counterOffers.length > 0) // Filter properties with counterOffers
        .map((property) => ({
          propertyTitle: property.name,
          seller: property.user.name,
          published: formattedDate(property.createdAt),
          id: property._id,
        }));

  const counterOffersData =
  searchValue !== ""
    ? propertyId ? properties
        .filter((property) => property._id === propertyId) // Filter properties with counterOffers
        .filter((property) =>
          property.name
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )
        .flatMap((property) =>
          property.counterOffers.map((offer: any) => ({
            _id:property._id,
            bathNo: property.bathNo,
            roomNo: property.roomNo,
            price: property.price,
            detail: property.detail,
            type: property.type,
            name: property.name,
            image: property.image,
            offerAmount: parseFloat(offer.counterPrice).toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
                currencyDisplay: "symbol",
                minimumFractionDigits: 0,
              }
            ),
            buyer: property.name,
            buyerId: offer.buyerId,
            sellerId: property.user.id,
            // status: property.status,
            note: offer.note,
            paymentOption: offer.paymentOption,
            terms: offer.terms,
            status:offer.status,
            startDate: formattedDate(offer.startDate),
          }))
        ) : []
    : propertyId  ?  properties
        .filter((property) =>
          property._id === propertyId
        )
        .flatMap((property) =>
          property.counterOffers.map((offer: any) => ({
            _id:property._id,
            bathNo: property.bathNo,
            roomNo: property.roomNo,
            price: property.price,
            detail: property.detail,
            type: property.type,
            name: property.name,
            image: property.image,
            offerAmount: parseFloat(offer.counterPrice).toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
                currencyDisplay: "symbol",
                minimumFractionDigits: 0,
              }
            ),
            buyer: offer.buyerId,
            buyerId: offer.buyerId,
            sellerId: property.user.id,
            // status: property.status,
            note: offer.note,
            paymentOption: offer.paymentOption,
            terms: offer.terms,
            status:offer.status,
            startDate: formattedDate(offer.startDate),
          }))
        ) : []

    const Rows = propertyRows ? PropertiesWithOffersData:  counterOffersData;
    const columns = propertyRows ?  PropertiesWithOfferscolumns : counterOffersColumns
  return (
    <>
    {
      !propertyRows && ( <div
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        padding: "10px",
      }}
      onClick={()=>setPropertyRows(!propertyRows)}
    >
      <ArrowLeftOutlined
        style={{ fontSize: "24px", marginRight: "5px" }}
        onClick={()=>setPropertyRows(!propertyRows)}
      />
      Go Back
    </div>)
    }
    
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "8px",
          // marginTop: "20px",
        }}
      >
        <InputField
          value={searchValue}
          onChangeText={(val) => handleChange(val)}
          placeholder={"Search property"}
          size="large"
          inpuStyles={{ width: "90%" }}
          suffix={<SearchOutlined />}
        />
      </div>
      <AppTable
        dataSource={Rows}
        columns={columns}
        pagination={{ defaultPageSize: 10 }}
      />
      
    </>
  );
};

export default CounterOffers;
