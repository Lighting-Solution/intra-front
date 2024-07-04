import { Container, Grid } from '@mui/material';
import React from 'react';
import GroupList from '../../components/contact/GroupList';
import MainList from '../../components/contact/MainList';

function Contact(props) {
  return (
    <Container
      maxWidth='xl'
      style={{
        height: '100vh',
        display: 'flex',
        maxWidth: '100%',
      }}
    >
      <div style={{ width: '20%', marginRight: '10px' }}>
        <GroupList />
      </div>
      <div style={{ width: '80%' }}>
        <MainList />
      </div>
    </Container>
  );
}

export default Contact;
