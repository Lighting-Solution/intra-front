import React from 'react';
import ContactList from './ContactList';
import Filter from './Filter';
import ContactFuncBtn from './ContactFuncBtn';

const MainList = ({ title, empDTOList }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        border: '1px solid rgba(147, 147, 147, 0.282)',
        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.221)',
        borderRadius: '10px',
      }}
    >
      <Filter
        title={title.titleName}
        subTitle={title.subTitleName}
        empCount={empDTOList.length}
      />
      <ContactFuncBtn />
      <ContactList empDTOList={empDTOList} />
    </div>
  );
};

export default MainList;
