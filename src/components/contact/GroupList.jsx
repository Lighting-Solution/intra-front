import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

const GroupList = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
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
        <ListItem button>
          <ListItemText primary='전체 주소록' style={{ fontWeight: 'bold' }} />
        </ListItem>

        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
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
              <ListItem button>
                <ListItemText primary='웹 서비스팀' />
              </ListItem>
              <ListItem button>
                <ListItemText primary='상담 서비스팀' />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
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
              <ListItem button>
                <ListItemText primary='인사팀' />
              </ListItem>
              <ListItem button>
                <ListItemText primary='회계팀' />
              </ListItem>
              <ListItem button>
                <ListItemText primary='영업팀' />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
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
              <ListItem button>
                <ListItemText primary='개발 1팀' />
              </ListItem>
              <ListItem button>
                <ListItemText primary='개발 2팀' />
              </ListItem>
              <ListItem button>
                <ListItemText primary='설계 1팀' />
              </ListItem>
              <ListItem button>
                <ListItemText primary='설계 2팀' />
              </ListItem>
              <ListItem button>
                <ListItemText primary='디자인팀' />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </List>

      <Typography
        variant='subtitle1'
        style={{ fontWeight: 'bold', marginTop: '20px' }}
      >
        개인 주소록
      </Typography>

      <List>
        <ListItem button>
          <ListItemText primary='전체 주소록' />
        </ListItem>

        <ListItem button>
          <ListItemText primary='친구들' />
          <Typography
            variant='body2'
            style={{ marginLeft: 'auto', color: 'gray' }}
          >
            12
          </Typography>
        </ListItem>

        <ListItem button>
          <AddIcon style={{ marginRight: '5px' }} />
          <ListItemText primary='연락처 주소록 추가' />
        </ListItem>
      </List>
    </div>
  );
};

export default GroupList;
