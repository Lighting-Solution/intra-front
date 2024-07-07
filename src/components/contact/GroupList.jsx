import React, { useState } from 'react';
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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import DepartmentList from './DepartmentList';
import PersonalGroupList from './PersonalGroupList';

const GroupList = ({
  setTitle,
  setSubTitle,
  setGroupId,
  departmentDTOList,
  groupDTOList,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState('전체 주소록');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleItemClick = (item, groupId = 0) => {
    setSelected(item);
    setGroupId(groupId);
    setTitle('사내 주소록');
    setSubTitle(`${item}`); // Update count accordingly
  };

  const getButtonStyle = (item) =>
    selected === item ? { color: 'rgba(4, 72, 245, 0.999)' } : {};
  const getTextProps = (item) =>
    selected === item ? { style: { fontWeight: 'bold' } } : {};

  return (
    <div
      style={{
        height: '100%',
        backgroundColor: 'white',
        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        border: '1px solid rgba(147, 147, 147, 0.282)',
        borderRadius: '10px',
        padding: '10px',
      }}
    >
      <Button
        variant='outlined'
        style={{ width: '100%', marginBottom: '10px' }}
      >
        연락처 추가
      </Button>
      <Typography
        variant='subtitle1'
        style={{ fontWeight: 'bold', marginBottom: '10px' }}
      >
        사내 주소록
      </Typography>
      <List>
        <ListItem
          button
          onClick={() => handleItemClick('전체 주소록')}
          style={getButtonStyle('전체 주소록')}
        >
          <ListItemText
            primary='전체 주소록'
            primaryTypographyProps={getTextProps('전체 주소록')}
          />
        </ListItem>
        {departmentDTOList.map((department) => (
          <DepartmentList
            key={department.departmentId}
            department={department}
            groupDTOList={groupDTOList}
            expanded={expanded}
            handleChange={handleChange}
            handleItemClick={handleItemClick}
            getButtonStyle={getButtonStyle}
            getTextProps={getTextProps}
          />
        ))}
      </List>
      <Typography
        variant='subtitle1'
        style={{
          fontWeight: 'bold',
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        개인 주소록
        <IconButton
          style={{ marginLeft: 'auto' }}
          onClick={() => console.log('Settings clicked')}
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
