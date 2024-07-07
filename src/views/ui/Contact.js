import { Container } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import GroupList from "../../components/contact/GroupList";
import MainList from "../../components/contact/MainList";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate(); // 페이지 이동
  const [id, setId] = useState(2); // PK 값
  const [groupId, setGroupId] = useState(0); // 선택한 그룹 PK
  const [titleName, setTitleName] = useState("사내 주소록"); // 선택한 그룹의 상위 주소록
  const [subTitleName, setSubTitleName] = useState("전체 주소록"); // 선택한 그룹의 하위 주소록

  const [groupList, setGroupList] = useState([]); // 개인 주소록 리스트
  const [departmentList, setDepartmentList] = useState([]); // 사내 주소록 리스트
  const [contactList, setContactList] = useState([]); // 선택한 주소록 연락처 리스트

  const updateGroupList = async () => {
    try {
      const response = axios.get(
        `http://localhost:9000/api/v1/intranet/contact/personal-group/${id}`
      );
      setGroupList(response.data);
    } catch (error) {
      console.error("Error updating group list:", error);
    }
  };

  const fetchContacts = async (groupId, titleName, subTitleName, type) => {
    try {
      let response;
      switch (type) {
        case "사내":
          if (groupId === 0) {
            response = await axios.get(
              "http://localhost:9000/api/v1/intranet/contact/list/all-emp"
            );
          } else {
            response = await axios.get(
              `http://localhost:9000/api/v1/intranet/contact/list/group-emp/${groupId}`
            );
          }
          break;
        case "개인":
          if (groupId === 0) {
            response = await axios.get(
              `http://localhost:9000/api/v1/intranet/contact/list/all-contact/${id}`
            );
          } else {
            response = await axios.get(
              `http://localhost:9000/api/v1/intranet/contact/list/group-contact/${groupId}`
            );
          }
          break;
        default:
          console.error("Invalid type");
          navigate("/contact");
          return;
      }

      console.log("Response data: ", response.data);

      setContactList(response.data);
      setGroupId(groupId);
      setTitleName(titleName);
      setSubTitleName(subTitleName);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/v1/intranet/contact/list/all/${id}`
        );
        console.log("Initial response data: ", response.data);
        setGroupList(response.data.groupDTOList);
        setDepartmentList(response.data.departmentDTOList);
        setContactList(response.data.empList);
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/");
      }
    }
    fetchData();
  }, [navigate]);

  useEffect(() => {
    console.log("ContactList updated: ", contactList);
  }, [contactList]);

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
          id={id}
          groupList={groupList}
          updateContacts={fetchContacts}
          departmentList={departmentList}
          updateGroupList={updateGroupList}
        />
      </div>
      <div style={{ width: "80%" }}>
        <MainList
          titleName={titleName}
          subTitleName={subTitleName}
          contactList={contactList}
          groupId={groupId}
        />
      </div>
    </Container>
  );
}

export default Contact;
