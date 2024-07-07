import { Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GroupList from '../../components/contact/GroupList';
import MainList from '../../components/contact/MainList';

function Contact() {
  const [title, setTitle] = useState({
    groupId: 0,
    titleName: '사내 주소록',
    subTitleName: '전체 주소록',
  });
  const [data, setData] = useState({
    groupDTOList: [],
    empDTOList: [],
    departmentDTOList: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/contact');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

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
        <GroupList
          setTitle={setTitle}
          setSubTitle={(subTitle) =>
            setTitle((prev) => ({ ...prev, subTitle }))
          }
          setGroupId={(groupId) => setTitle((prev) => ({ ...prev, groupId }))}
          departmentDTOList={data.departmentDTOList}
          groupDTOList={data.groupDTOList}
        />
      </div>
      <div style={{ width: '80%' }}>
        <MainList title={title} empDTOList={data.empDTOList} />
      </div>
    </Container>
  );
}

export default Contact;
