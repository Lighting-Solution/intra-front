import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import DepartmentList from "./DepartmentList";
import PersonalGroupList from "./PersonalGroupList";

const GroupList = ({
  setTitle,
  setSubTitle,
  setGroupId,
  departmentDTOList,
  groupDTOList,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState("전체 주소록");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleItemClick = (item, type, groupId = 0) => {
    setSelected(item);
    if (type === "사내" && groupId === 0) {
      setGroupId(groupId, type, 0); // 사내 전체 주소록
    } else if (type === "개인" && groupId === 0) {
      setGroupId(groupId, type, 0); // 개인 전체 주소록
    } else if (type === "부서") {
      setGroupId(groupId, type, groupId); // 사내 부서별
    } else if (type === "개인") {
      setGroupId(groupId, type, groupId); // 개인 그룹별
    }
    setTitle({
      groupId,
      titleName: type === "사내" ? "사내 주소록" : "개인 주소록",
      subTitleName: item,
      type,
    });
  };

  const getButtonStyle = (item) =>
    selected === item ? { color: "rgba(4, 72, 245, 0.999)" } : {};
  const getTextProps = (item) =>
    selected === item ? { style: { fontWeight: "bold" } } : {};

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
          onClick={() => handleItemClick("전체 주소록", "사내", 0)}
          style={getButtonStyle("전체 주소록")}
        >
          <ListItemText
            primary="전체 주소록"
            primaryTypographyProps={getTextProps("전체 주소록")}
          />
        </ListItem>
        {departmentDTOList
          .filter((department) => department.departmentId % 100 === 0)
          .map((department) => (
            <DepartmentList
              key={department.departmentId}
              department={department}
              teamDTOList={departmentDTOList.filter(
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
        <PersonalGroupList
          groupDTOList={groupDTOList}
          handleItemClick={handleItemClick}
          getButtonStyle={getButtonStyle}
          getTextProps={getTextProps}
        />
      </List>
    </div>
  );
};

export default GroupList;
