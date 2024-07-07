import React from "react";
import ContactList from "./ContactList";
import Filter from "./Filter";
import ContactFuncBtn from "./ContactFuncBtn";

const deleteContacts = () => {};

const designateContactGroup = () => {};

const copyContactGroup = () => {};

const MainList = ({ titleName, subTitleName, contactList, groupId }) => {
  const [selected, setSelected] = React.useState([]);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid rgba(147, 147, 147, 0.282)",
        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.221)",
        borderRadius: "10px",
      }}
    >
      <Filter
        title={titleName}
        subTitle={subTitleName}
        empCount={contactList.length}
      />
      <ContactFuncBtn
        deleteContacts={deleteContacts}
        designateContactGroup={designateContactGroup}
        copyContactGroup={copyContactGroup}
      />
      <ContactList
        contactList={contactList}
        selectedState={{ selected, setSelected }}
      />
    </div>
  );
};

export default MainList;
