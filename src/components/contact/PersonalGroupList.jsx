import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const PersonalGroupList = ({
  groupDTOList,
  handleItemClick,
  getButtonStyle,
  getTextProps,
}) => {
  return (
    <>
      <ListItem
        button
        onClick={() => handleItemClick("전체 주소록", "개인", 0)}
        style={getButtonStyle("전체 주소록")}
      >
        <ListItemText
          primary="전체 주소록"
          primaryTypographyProps={getTextProps("전체 주소록")}
        />
      </ListItem>
      {groupDTOList.map((group) => (
        <ListItem
          button
          key={group.personalGroupId}
          onClick={() =>
            handleItemClick(
              group.personalGroupName,
              "개인",
              group.personalGroupId
            )
          }
          style={getButtonStyle(group.personalGroupName)}
        >
          <ListItemText
            primary={group.personalGroupName}
            primaryTypographyProps={getTextProps(group.personalGroupName)}
          />
        </ListItem>
      ))}
    </>
  );
};

export default PersonalGroupList;
