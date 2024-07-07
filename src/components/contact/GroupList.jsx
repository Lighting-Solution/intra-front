import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import CreatePersonalGroup from "./CreatePersonalGroup";
import DepartmentList from "./DepartmentList";
import PersonalGroupList from "./PersonalGroupList";

const GroupList = ({
  id,
  groupList,
  updateContacts,
  departmentList,
  updateGroupList,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState("사내 전체 주소록");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [existingGroupNames, setExistingGroupNames] = useState([]);

  useEffect(() => {
    if (!Array.isArray(groupList)) {
      return;
    }
    const fetchedGroupNames = groupList.map((group) => group.groupName);
    setExistingGroupNames(fetchedGroupNames);
  }, [groupList]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleItemClick = (groupId, titleName, subTitleName, type) => {
    if (groupId === 0 && type === "사내") setSelected("사내 전체 주소록");
    else if (groupId === 0 && type === "개인") setSelected("개인 전체 주소록");
    else setSelected(subTitleName);
    updateContacts(groupId, titleName, subTitleName, type);
  };

  const getButtonStyle = (item) =>
    selected === item ? { color: "rgba(4, 72, 245, 0.999)" } : {};
  const getTextProps = (item) =>
    selected === item ? { style: { fontWeight: "bold" } } : {};

  const openModal = () => {
    setOpenCreateModal(true);
  };

  const closeModal = () => {
    setOpenCreateModal(false);
  };

  const handleCreateGroup = async (groupName) => {
    try {
      const response = await axios.post(
        `http://localhost:9000/api/v1/intranet/contact/personal-group`,
        {
          empId: id,
          personalGroupName: groupName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log("New group created:", data);
        closeModal();
        updateGroupList(); // 그룹 리스트 업데이트
      } else {
        console.error("Failed to create group");
        // 실패 처리 로직
      }
    } catch (error) {
      console.error("Error creating group:", error);
      // 에러 처리 로직
    }
  };

  return (
    <div
      style={{
        height: "100%",
        backgroundColor: "white",
        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)",
        width: "100%",
        border: "1px solid rgba(147, 147, 147, 0.282)",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <Button
        variant="outlined"
        style={{ width: "100%", marginBottom: "10px" }}
        onClick={openModal} // 연락처 추가 버튼 클릭 시 모달 열기
      >
        연락처 추가
      </Button>
      <Typography
        variant="subtitle1"
        style={{ fontWeight: "bold", marginBottom: "10px" }}
      >
        사내 주소록
      </Typography>
      <List>
        <ListItem
          button
          onClick={() =>
            handleItemClick(0, "사내 주소록", "전체 주소록", "사내")
          }
          style={getButtonStyle("사내 전체 주소록")}
        >
          <ListItemText
            primary="전체 주소록"
            primaryTypographyProps={getTextProps("사내 전체 주소록")}
          />
        </ListItem>
        {departmentList &&
          departmentList.length > 0 &&
          departmentList
            .filter((department) => department.departmentId % 100 === 0)
            .map((department) => (
              <DepartmentList
                key={department.departmentId}
                department={department}
                teamList={departmentList.filter(
                  (dept) =>
                    Math.floor(dept.departmentId / 100) ===
                      Math.floor(department.departmentId / 100) &&
                    dept.departmentId % 100 !== 0
                )}
                expanded={expanded}
                handleChange={handleChange}
                handleItemClick={handleItemClick}
                getButtonStyle={getButtonStyle}
                getTextProps={getTextProps}
              />
            ))}
      </List>
      <Typography
        variant="subtitle1"
        style={{
          fontWeight: "bold",
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        개인 주소록
        <IconButton
          style={{ marginLeft: "auto" }}
          onClick={() => console.log("Settings clicked")}
        >
          <SettingsIcon />
        </IconButton>
      </Typography>
      <List>
        <ListItem
          button
          onClick={() =>
            handleItemClick(0, "개인 주소록", "전체 주소록", "개인")
          }
          style={getButtonStyle("개인 전체 주소록")}
        >
          <ListItemText
            primary="전체 주소록"
            primaryTypographyProps={getTextProps("개인 전체 주소록")}
          />
        </ListItem>
        {groupList?.length > 0 &&
          groupList.map((group) => (
            <PersonalGroupList
              key={group.personalGroupId}
              group={group}
              handleItemClick={handleItemClick}
              getButtonStyle={getButtonStyle}
              getTextProps={getTextProps}
            />
          ))}
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{
            marginRight: "8px",
            color: "rgba(0, 0, 0, 0.483)",
            border: "1px solid rgba(0, 0, 0, 0)",
          }}
          onClick={openModal} // 주소록 추가 버튼 클릭 시 모달 열기
        >
          주소록 추가
        </Button>
      </List>

      <Dialog open={openCreateModal} onClose={closeModal}>
        <DialogTitle>주소록 추가</DialogTitle>
        <DialogContent>
          <CreatePersonalGroup
            onCreate={handleCreateGroup} // 그룹 생성 콜백 전달
            onCancel={closeModal}
            id={id}
            existingGroupNames={existingGroupNames}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupList;
