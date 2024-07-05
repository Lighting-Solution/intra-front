import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import { useGroup } from './useStatus/useGroup';

const GroupList = () => {
  const { setTitle, setSubTitle, setGroupId } = useGroup();
  const [expanded, setExpanded] = useState('panel1');
  const [selected, setSelected] = useState('전체 주소록');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleItemClick = (item) => {
    setSelected(item);
    // 상태 업데이트
    switch (item) {
      case '전체 주소록':
        setTitle('사내 주소록');
        setSubTitle('전체 주소록 ( 30 )');
        break;
      case '웹 서비스팀':
        setTitle('사내 주소록');
        setSubTitle('전체 주소록 ( 30 )');
        break;
      case '상담 서비스팀':
        setTitle('사내 주소록');
        setSubTitle('전체 주소록 ( 30 )');
        break;
      case '인사팀':
        setTitle('사내 주소록');
        setSubTitle('전체 주소록 ( 30 )');
        break;
      case '회계팀':
        setTitle('사내 주소록');
        setSubTitle('전체 주소록 ( 30 )');
        break;
      case '영업팀':
        setTitle('사내 주소록');
        setSubTitle('전체 주소록 ( 30 )');
        break;
      case '개발 1팀':
        setTitle('사내 주소록');
        setSubTitle('전체 주소록 ( 30 )');
        break;
      case '개발 2팀':
        setTitle('사내 주소록');
        setSubTitle('전체 주소록 ( 30 )');
        break;
      case '설계 1팀':
        setTitle('사내 주소록');
        setSubTitle('전체 주소록 ( 30 )');
        break;
      case '설계 2팀':
        setTitle('사내 주소록');
        setSubTitle('전체 주소록 ( 30 )');
        break;
      case '디자인팀':
        setTitle('사내 주소록');
        setSubTitle('전체 주소록 ( 30 )');
        break;
      case '전체 주소록 개인':
        setTitle('사내 주소록');
        setSubTitle('전체 주소록 ( 30 )');
        break;
      case '친구들':
        setGroupId();
        setTitle('사내 주소록');
        setSubTitle('전체 주소록 ( 30 )');
        break;
      default:
        setTitle('사내 주소록');
        setSubTitle('전체 주소록');
    }
  };

  const getButtonStyle = (item) => {
    return selected === item ? { color: 'rgba(4, 72, 245, 0.999)' } : {};
  };

  const getTextProps = (item) => {
    return selected === item ? { style: { fontWeight: 'bold' } } : {};
  };

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

        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
          style={{
            boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.121)',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography style={{ fontWeight: 'bold' }}>
              서비스 사업부
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List component='div' disablePadding>
              <ListItem
                button
                onClick={() => handleItemClick('웹 서비스팀')}
                style={getButtonStyle('웹 서비스팀')}
              >
                <ListItemText
                  primary='웹 서비스팀'
                  primaryTypographyProps={getTextProps('웹 서비스팀')}
                />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick('상담 서비스팀')}
                style={getButtonStyle('상담 서비스팀')}
              >
                <ListItemText
                  primary='상담 서비스팀'
                  primaryTypographyProps={getTextProps('상담 서비스팀')}
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
          style={{
            boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.121)',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel2a-content'
            id='panel2a-header'
          >
            <Typography style={{ fontWeight: 'bold' }}>관리 지원부</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List component='div' disablePadding>
              <ListItem
                button
                onClick={() => handleItemClick('인사팀')}
                style={getButtonStyle('인사팀')}
              >
                <ListItemText
                  primary='인사팀'
                  primaryTypographyProps={getTextProps('인사팀')}
                />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick('회계팀')}
                style={getButtonStyle('회계팀')}
              >
                <ListItemText
                  primary='회계팀'
                  primaryTypographyProps={getTextProps('회계팀')}
                />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick('영업팀')}
                style={getButtonStyle('영업팀')}
              >
                <ListItemText
                  primary='영업팀'
                  primaryTypographyProps={getTextProps('영업팀')}
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
          style={{
            boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.121)',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel3a-content'
            id='panel3a-header'
          >
            <Typography style={{ fontWeight: 'bold' }}>
              솔루션 개발부
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List component='div' disablePadding>
              <ListItem
                button
                onClick={() => handleItemClick('개발 1팀')}
                style={getButtonStyle('개발 1팀')}
              >
                <ListItemText
                  primary='개발 1팀'
                  primaryTypographyProps={getTextProps('개발 1팀')}
                />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick('개발 2팀')}
                style={getButtonStyle('개발 2팀')}
              >
                <ListItemText
                  primary='개발 2팀'
                  primaryTypographyProps={getTextProps('개발 2팀')}
                />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick('설계 1팀')}
                style={getButtonStyle('설계 1팀')}
              >
                <ListItemText
                  primary='설계 1팀'
                  primaryTypographyProps={getTextProps('설계 1팀')}
                />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick('설계 2팀')}
                style={getButtonStyle('설계 2팀')}
              >
                <ListItemText
                  primary='설계  2팀'
                  primaryTypographyProps={getTextProps('설계 2팀')}
                />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick('디자인팀')}
                style={getButtonStyle('디자인팀')}
              >
                <ListItemText
                  primary='디자인팀'
                  primaryTypographyProps={getTextProps('디자인팀')}
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
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
        <ListItem
          button
          onClick={() => handleItemClick('전체 주소록 개인')}
          style={getButtonStyle('전체 주소록 개인')}
        >
          <ListItemText
            primary='전체 주소록'
            primaryTypographyProps={getTextProps('전체 주소록 개인')}
          />
        </ListItem>

        <ListItem
          button
          onClick={() => handleItemClick('친구들')}
          style={getButtonStyle('친구들')}
        >
          <ListItemText
            primary='친구들'
            primaryTypographyProps={getTextProps('친구들')}
          />
          <Typography
            variant='body2'
            style={{ marginLeft: 'auto', color: 'gray' }}
          >
            12
          </Typography>
        </ListItem>

        <ListItem
          button
          onClick={() => handleItemClick('연락처 주소록 추가')}
          style={getButtonStyle('연락처 주소록 추가')}
        >
          <AddIcon style={{ marginRight: '5px' }} />
          <ListItemText
            primary='연락처 주소록 추가'
            primaryTypographyProps={getTextProps('연락처 주소록 추가')}
          />
        </ListItem>
      </List>
    </div>
  );
};

export default GroupList;
