import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DepartmentList = ({
  department,
  teamList,
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
        <Typography style={{ fontWeight: "bold" }}>
          {department.departmentName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List component="div" disablePadding>
          {teamList.map((team) => (
            <ListItem
              button
              key={team.departmentId}
              onClick={() =>
                handleItemClick(
                  team.departmentId,
                  department.departmentName,
                  team.departmentName,
                  "사내"
                )
              }
              style={getButtonStyle(team.departmentName)}
            >
              <ListItemText
                primary={team.departmentName}
                primaryTypographyProps={getTextProps(team.departmentName)}
              />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default DepartmentList;
