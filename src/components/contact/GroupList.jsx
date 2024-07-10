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
import CreatePersonalGroup from "./group/CreatePersonalGroup";
import DepartmentList from "./group/DepartmentList";
import PersonalGroupList from "./group/PersonalGroupList";
import CreateContact from "./group/CreateContact";
import SettingPersonalGroup from "./group/SettingPersonalGroup";

const GroupList = ({
  id,
  groupList,
  updateContacts,
  departmentList,
  updateGroupList,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState("사내 전체 주소록");
  const [openGroupCreateModal, setOpenGroupCreateModal] = useState(false);
  const [openPersonalCreateModal, setOpenPersonalCreateModal] = useState(false);
  const [openUpdateGroupModal, setOpenSettingGroupModal] = useState(false);
  const [groupNames, setGroupNames] = useState([]);

  useEffect(() => {
    if (Array.isArray(groupList)) {
      const names = groupList.map((group) => group.personalGroupName);
      setGroupNames(names);
    }
  }, [groupList]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleItemClick = (groupId, titleName, subTitleName, type) => {
    setSelected(subTitleName);
    updateContacts(groupId, titleName, subTitleName, type);

    if (type === "개인") {
      updateGroupList();
    }
  };

  const getButtonStyle = (item) =>
    selected === item ? { color: "rgba(4, 72, 245, 0.999)" } : {};
  const getTextProps = (item) =>
    selected === item ? { style: { fontWeight: "bold" } } : {};

  const openGroupModal = () => {
    setOpenGroupCreateModal(true);
  };

  const closeGroupModal = () => {
    setOpenGroupCreateModal(false);
  };

  const openPersonalModal = () => {
    setOpenPersonalCreateModal(true);
  };

  const closePersonalModal = () => {
    setOpenPersonalCreateModal(false);
  };

  const openSettingGroupModal = () => {
    setOpenSettingGroupModal(true);
  };

  const closeSettingGroupModal = () => {
    setOpenSettingGroupModal(false);
  };

  const handleCreateGroup = async (groupName) => {
    try {
      const response = await axios.post(
        `http://localhost:9000/api/v1/lighting_solutions/contact/personal-group`,
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
        closeGroupModal();
        updateGroupList(); // 그룹 리스트 업데이트
      } else {
        console.error("Failed to create group");
      }
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const handleCreateContact = async (contact) => {
    try {
      const response = await axios.post(
        `http://localhost:9000/api/v1/lighting_solutions/contact/personal-contact`,
        contact,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        closePersonalModal();
        updateContacts(0, "개인 주소록", "전체 주소록", "개인");
      } else {
        console.error("Failed to create contact");
      }
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  };

  const handleUpdateGroup = async (groupData) => {
    try {
      const response = await axios.put(
        `
        http://localhost:9000/api/v1/lighting_solutions/contact/personal-group`,
        groupData
      );
      if (response.status === 200) {
        closeSettingGroupModal();
        updateContacts(0, "개인 주소록", "전체 주소록", "개인");
        updateGroupList();
      } else {
        console.error("Failed to update contact");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      const response = await axios.delete(`
        http://localhost:9000/api/v1/lighting_solutions/contact/group/${groupId}`);

      if (response.status === 200) {
        closeSettingGroupModal();
        updateContacts(0, "개인 주소록", "전체 주소록", "개인");
        updateGroupList();
      } else {
        console.error("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
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
        onClick={openPersonalModal}
      >
        개인 연락처 추가
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
                key={`company-${department.departmentId}`}
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
          onClick={openSettingGroupModal}
        >
          <SettingsIcon />
        </IconButton>
      </Typography>
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
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
                key={`personal-${group.personalGroupId}`}
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
            onClick={openGroupModal}
          >
            주소록 추가
          </Button>
        </List>
      </div>

      <Dialog open={openPersonalCreateModal} onClose={closePersonalModal}>
        <DialogTitle>개인 연락처 추가</DialogTitle>
        <DialogContent>
          <CreateContact
            onCreate={handleCreateContact}
            onCancel={closePersonalModal}
            id={id}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openGroupCreateModal} onClose={closeGroupModal}>
        <DialogTitle>개인 주소록 추가</DialogTitle>
        <DialogContent>
          <CreatePersonalGroup
            onCreate={handleCreateGroup}
            onCancel={closeGroupModal}
            existingGroupNames={groupNames}
            id={id}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openUpdateGroupModal} onClose={closeSettingGroupModal}>
        <DialogTitle>주소록 설정</DialogTitle>
        <DialogContent>
          <SettingPersonalGroup
            onUpdate={handleUpdateGroup}
            onDelete={handleDeleteGroup}
            onCancel={closeSettingGroupModal}
            existingGroupNames={groupNames}
            groupList={groupList}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupList;
