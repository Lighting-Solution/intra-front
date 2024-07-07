import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import GroupList from "../../components/contact/GroupList";
import MainList from "../../components/contact/MainList";

function Contact() {
  const [title, setTitle] = useState({
    groupId: 0,
    titleName: "사내 주소록",
    subTitleName: "전체 주소록",
    type: "사내", // 사내, 부서, 개인
  });
  const [data, setData] = useState({
    groupDTOList: [],
    empDTOList: [],
    departmentDTOList: [],
  });

  const fetchContacts = async (groupId, type, id) => {
    let response;
    try {
      switch (type) {
        case "사내":
          if (id === 0) {
            response = await axios.get(
              "http://localhost:9000/api/v1/intranet/contact/list/all-emp"
            );
          } else {
            response = await axios.get(
              `http://localhost:9000/api/v1/intranet/contact/list/group-emp/${id}`
            );
          }
          break;
        case "개인":
          if (id === 0) {
            response = await axios.get(
              `http://localhost:9000/api/v1/intranet/contact/list/all-contact/${groupId}`
            );
          } else {
            response = await axios.get(
              `http://localhost:9000/api/v1/intranet/contact/list/group-contact/${id}`
            );
          }
          break;
        default:
          console.error("Invalid type");
          setData((prev) => ({
            ...prev,
            empDTOList: [],
          }));
          setTitle((prev) => ({
            ...prev,
            subTitleName: `${
              type === "사내" ? "전체 주소록" : "개인 주소록"
            } (0)`,
          }));
          return;
      }

      if (response.data.length === 0) {
        setData((prev) => ({
          ...prev,
          empDTOList: [],
        }));
        setTitle((prev) => ({
          ...prev,
          subTitleName: `${
            type === "사내" ? "전체 주소록" : "개인 주소록"
          } (0)`,
        }));
      } else {
        setData((prev) => ({
          ...prev,
          empDTOList: response.data,
        }));
        setTitle((prev) => ({
          ...prev,
          subTitleName: `${prev.subTitleName.split(" (")[0]} (${
            response.data.length
          })`,
        }));
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setData((prev) => ({
        ...prev,
        empDTOList: [],
      }));
      setTitle((prev) => ({
        ...prev,
        subTitleName: `${type === "사내" ? "전체 주소록" : "개인 주소록"} (0)`,
      }));
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/v1/intranet/contact/list/all/1"
        );
        setData(response.data);
        fetchContacts(0, "사내", 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData((prev) => ({
          ...prev,
          empDTOList: [],
        }));
      }
    }
    fetchData();
  }, []);

  return (
    <Container
      maxWidth="xl"
      style={{
        height: "100vh",
        display: "flex",
        maxWidth: "100%",
      }}
    >
      <div style={{ width: "20%", marginRight: "10px" }}>
        <GroupList
          setTitle={setTitle}
          setSubTitle={(subTitle) =>
            setTitle((prev) => ({ ...prev, subTitle }))
          }
          setGroupId={(groupId, type, id) => {
            setTitle((prev) => ({ ...prev, groupId }));
            fetchContacts(groupId, type, id);
          }}
          departmentDTOList={data.departmentDTOList}
          groupDTOList={data.groupDTOList}
        />
      </div>
      <div style={{ width: "80%" }}>
        <MainList title={title} empDTOList={data.empDTOList} />
      </div>
    </Container>
  );
}

export default Contact;
