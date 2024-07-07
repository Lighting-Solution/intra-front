import { ListItem, ListItemText } from "@mui/material";
import React from "react";

const PersonalGroupList = ({
  group,
  handleItemClick,
  getButtonStyle,
  getTextProps,
}) => {
  return (
    <ListItem
      button
      onClick={() =>
        handleItemClick(
          group.personalGroupId,
          "개인 주소록",
          group.personalGroupName,
          "개인"
        )
      }
      style={getButtonStyle(group.personalGroupName)}
    >
      <ListItemText
        primary={group.personalGroupName}
        primaryTypographyProps={getTextProps(group.personalGroupName)}
      />
    </ListItem>
  );
};

export default PersonalGroupList;
