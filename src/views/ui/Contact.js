import { Container } from '@mui/material';
import React, { useState } from 'react';
import GroupList from '../../components/contact/GroupList';
import MainList from '../../components/contact/MainList';

function Contact(props) {
  const { title, setTitle } = useState({
    groupId: 0,
    titleName: '사내 주소록',
    subTitleName: '전체 주소록',
  });

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
        <GroupList setTitle={setTitle} setSubTitle={setSubTitle} />
      </div>
      <div style={{ width: '80%' }}>
        <MainList />
      </div>
    </Container>
  );
}

export default Contact;
