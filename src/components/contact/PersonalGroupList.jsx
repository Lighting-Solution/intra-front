import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const PersonalGroupList = ({
  groupDTOList,
  handleItemClick,
  getButtonStyle,
  getTextProps,
}) => {
  return (
    <>
      {groupDTOList.map((group) => (
        <ListItem
          button
          key={group.personalGroupId}
          onClick={() =>
            handleItemClick(group.personalGroupName, group.personalGroupId)
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
