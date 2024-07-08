import React from "react";
import EmpContactList from "./Main/EmpContactList/EmpContactList";
import PersonalContactList from "./Main/PersonalContactList/PersonalContactList";
import Filter from "./Main/Filter";
import axios from "axios";

const MainList = ({
  id,
  titleName,
  subTitleName,
  contactList,
  groupId,
  setContactList,
}) => {
  const [empList, setEmpList] = React.useState([]);
  const [personalContactList, setPersonalContactList] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const isPersonalContactList = contactList[0]?.personalContactId !== undefined;

  const searchContact = async (field, text) => {
    let response;
    try {
      if (groupId > 0) {
        const hasPersonalContactId = "PersonalContactId" in contactList;
        response = await axios.get(
          hasPersonalContactId
            ? `http://localhost:9000/api/v1/intranet/contact/list/search?empId=&groupId=${groupId}&departmentId=&filterType=${field}&filterContent=${text}&sortType=&groupType=`
            : `http://localhost:9000/api/v1/intranet/contact/list/search?empId=&groupId=&departmentId=${groupId}&filterType=${field}&filterContent=${text}&sortType=&groupType=`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        if (titleName === "개인 주소록") {
          response = await axios.get(
            `http://localhost:9000/api/v1/intranet/contact/list/search?empId=${id}&groupId=&departmentId=&filterType=${field}&filterContent=${text}&sortType=&groupType=personal`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } else {
          response = await axios.get(
            `http://localhost:9000/api/v1/intranet/contact/list/search?empId=${id}&groupId=&departmentId=&filterType=${field}&filterContent=${text}&sortType=&groupType=company`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
      }
      if (response.status === 200) {
        setContactList(response.data);
        response.data?.personalContactList !== undefined
          ? setEmpList(response.data.EmpList)
          : setPersonalContactList(response.data.personalContactList);
      } else {
        console.error("Failed to search contact");
      }
    } catch (error) {
      console.error("Error search contact:", error);
    }
  };

  const deleteContacts = (contactId) => {};

  const designateContactGroup = (contactIds, groupIds) => {};

  const copyContactGroup = (contactIds, groupId) => {};

  const updateContact = (editContact) => {};

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
        searchContact={searchContact}
      />
      {isPersonalContactList ? (
        <PersonalContactList
          contactList={contactList}
          selectedState={{ selected, setSelected }}
          updateContact={updateContact}
          deleteContacts={deleteContacts}
          designateContactGroup={designateContactGroup}
          copyContactGroup={copyContactGroup}
        />
      ) : (
        <EmpContactList
          contactList={contactList}
          selectedState={{ selected, setSelected }}
          updateContact={updateContact}
          deleteContacts={deleteContacts}
          designateContactGroup={designateContactGroup}
          copyContactGroup={copyContactGroup}
        />
      )}
    </div>
  );
};

export default MainList;
