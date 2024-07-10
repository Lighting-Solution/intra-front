import React, { useEffect, useState } from "react";
import EmpContactList from "./Main/EmpContactList/EmpContactList";
import Filter from "./Main/Filter";
import PersonalContactList from "./Main/PersonalContactList/PersonalContactList";
import GroupSelectContact from "./Main/GroupSelectContact";
import axios from "axios";

const MainList = ({
  type,
  titleName,
  subTitleName,
  contactList,
  groupId,
  setContactList,
  groups,
  onGroupDelete,
}) => {
  const [selected, setSelected] = useState([]);
  const [filteredContactList, setFilteredContactList] = useState(contactList);
  const [openGroupSelect, setOpenGroupSelect] = useState(false);

  useEffect(() => {
    setFilteredContactList(contactList);
  }, [contactList]);

  const isPersonalContactList =
    contactList?.[0]?.personalContactId !== undefined;

  const deleteContacts = async (contactId) => {
    try {
      let response;
      if (selected && selected.length !== 0) {
        response = await axios.delete(
          `http://localhost:9000/api/v1/lighting_solutions/contact/personal-contact`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "1",
            },
            data: { contactId: selected },
          }
        );
      } else {
        response = await axios.delete(
          `http://localhost:9000/api/v1/lighting_solutions/contact/personal-contact`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "1",
            },
            data: { contactId: [contactId] },
          }
        );
      }

      if (response.status === 200) {
        console.log("Contacts deleted successfully");
        await setContactList(groupId, titleName, subTitleName, type);
        setSelected([]);
      } else {
        console.error("Failed to delete contacts");
      }
    } catch (error) {
      console.error("Error deleting contacts:", error);
    }
  };

  const designateContactGroup = async (groupIds) => {
    try {
      const response = await axios.post(
        `http://localhost:9000/api/v1/lighting_solutions/contact/contact-group`,
        { groupId: groupIds, contactId: selected },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "1",
          },
        }
      );

      if (response.status === 200) {
        console.log("Contacts designated successfully");
        await setContactList(groupId, titleName, subTitleName, type);
        setSelected([]);
      } else {
        console.error("Failed to designate contacts");
      }
    } catch (error) {
      console.error("Error designating contacts:", error);
    }
  };

  const updateContact = async (editContact) => {
    try {
      const response = await axios.put(
        `http://localhost:9000/api/v1/lighting_solutions/contact/personal-contact`,
        editContact,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "1",
          },
        }
      );

      if (response.status === 200) {
        console.log("Contact updated successfully");
        await setContactList(groupId, titleName, subTitleName, type);
      } else {
        console.error("Failed to update contact");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleSearch = (field, text) => {
    const lowerText = text.toLowerCase();
    const filteredList = contactList.filter((contact) => {
      if (field === "all") {
        return (
          contact.personalContactName?.toLowerCase().includes(lowerText) ||
          contact.personalContactMP?.toLowerCase().includes(lowerText) ||
          contact.company?.companyName?.toLowerCase().includes(lowerText) ||
          contact.empName?.toLowerCase().includes(lowerText) ||
          contact.empMP?.toLowerCase().includes(lowerText)
        );
      } else if (field === "name") {
        return (
          contact.personalContactName?.toLowerCase().includes(lowerText) ||
          contact.empName?.toLowerCase().includes(lowerText)
        );
      } else if (field === "mp") {
        return (
          contact.personalContactMP?.toLowerCase().includes(lowerText) ||
          contact.empMP?.toLowerCase().includes(lowerText)
        );
      } else if (field === "company") {
        return contact.company?.companyName?.toLowerCase().includes(lowerText);
      }
      return false;
    });
    setFilteredContactList(filteredList);
  };

  const handleOpenGroupSelect = () => {
    if (selected.length === 0) {
      alert("연락처를 선택하여 주세요.");
      return;
    }
    setOpenGroupSelect(true);
  };

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
        onSearch={handleSearch}
      />
      {isPersonalContactList ? (
        <PersonalContactList
          contactList={filteredContactList}
          selectedState={{ selected, setSelected }}
          updateContact={updateContact}
          deleteContacts={deleteContacts}
          designateContactGroup={handleOpenGroupSelect}
          onGroupDelete={onGroupDelete}
          currentGroupId={groupId}
        />
      ) : (
        <EmpContactList
          contactList={filteredContactList}
          selectedState={{ selected, setSelected }}
          updateContact={updateContact}
          deleteContacts={deleteContacts}
          designateContactGroup={handleOpenGroupSelect}
        />
      )}
      <GroupSelectContact
        open={openGroupSelect}
        onClose={() => setOpenGroupSelect(false)}
        groups={groups}
        onConfirm={designateContactGroup}
      />
    </div>
  );
};

export default MainList;
