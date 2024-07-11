import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupList from "../../components/contact/GroupList";
import MainList from "../../components/contact/MainList";

function Contact() {
  const navigate = useNavigate(); // 페이지 이동
  const [id, setId] = useState(2); // PK 값
  const [groupId, setGroupId] = useState(0); // 선택한 그룹 PK
  const [titleName, setTitleName] = useState("사내 주소록"); // 선택한 그룹의 상위 주소록
  const [subTitleName, setSubTitleName] = useState("전체 주소록"); // 선택한 그룹의 하위 주소록
  const [type, setType] = useState("사내");

  const [groupList, setGroupList] = useState([]); // 개인 주소록 리스트
  const [departmentList, setDepartmentList] = useState([]); // 사내 주소록 리스트
  const [contactList, setContactList] = useState([]); // 선택한 주소록 연락처 리스트

  const updateGroupList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/lighting_solutions/contact/personal-group/${id}`
      );
      setGroupList(response.data);
    } catch (error) {
      console.error("Error updating group list:", error);
    }
  };

  const fetchContacts = async (groupId, titleName, subTitleName, typeId) => {
    try {
      let response;
      switch (typeId) {
        case "사내":
          setType("사내");
          if (groupId === 0) {
            response = await axios.get(
              "http://localhost:9000/api/v1/lighting_solutions/contact/list/all-emp"
            );
          } else {
            response = await axios.get(
              `http://localhost:9000/api/v1/lighting_solutions/contact/list/group-emp/${groupId}`
            );
          }
          break;
        case "개인":
          setType("개인");
          if (groupId === 0) {
            response = await axios.get(
              `http://localhost:9000/api/v1/lighting_solutions/contact/list/all-contact/${id}`
            );
          } else {
            response = await axios.get(
              `http://localhost:9000/api/v1/lighting_solutions/contact/list/group-contact/${groupId}`
            );
          }
          break;
        default:
          console.error("Invalid type");
          navigate("/contact");
          return;
      }

      setContactList(response.data);
      setGroupId(groupId);
      setTitleName(titleName);
      setSubTitleName(subTitleName);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      navigate("/");
    }
  };

  const handleGroupDelete = async (groupId, contactId) => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/api/v1/lighting_solutions/contact/contact-group`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "1",
          },
          data: { groupId: [groupId], contactId: [contactId] },
        }
      );

      if (response.status === 200) {
        console.log("Group deleted from contact successfully");
        await fetchContacts(0, titleName, subTitleName, type);
      } else {
        console.error("Failed to delete group from contact");
      }
    } catch (error) {
      console.error("Error deleting group from contact:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/v1/lighting_solutions/contact/list/all/${id}`
        );
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
          type={type}
          titleName={titleName}
          subTitleName={subTitleName}
          contactList={contactList}
          setContactList={fetchContacts}
          groupId={groupId}
          groups={groupList}
          onGroupDelete={handleGroupDelete}
        />
      </div>
    </Container>
  );
}

export default Contact;
