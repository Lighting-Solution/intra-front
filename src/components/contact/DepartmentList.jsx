import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DepartmentList = ({
  department,
  groupDTOList,
  expanded,
  handleChange,
  handleItemClick,
  getButtonStyle,
  getTextProps,
}) => {
  return (
    <Accordion
      expanded={expanded === department.departmentId}
      onChange={handleChange(department.departmentId)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${department.departmentId}-content`}
        id={`panel${department.departmentId}-header`}
      >
        <Typography style={{ fontWeight: 'bold' }}>
          {department.departmentName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List component='div' disablePadding>
          {groupDTOList
            .filter((group) => group.departmentId === department.departmentId)
            .map((group) => (
              <ListItem
                button
                key={group.personalGroupId}
                onClick={() =>
                  handleItemClick(
                    group.personalGroupName,
                    group.personalGroupId,
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
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default DepartmentList;
