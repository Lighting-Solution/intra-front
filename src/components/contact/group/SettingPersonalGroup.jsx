import { MenuItem, Select, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

const SettingPersonalGroup = ({
  onUpdate,
  onDelete,
  onCancel,
  existingGroupNames,
  groupList,
}) => {
  const [groupData, setGroupData] = useState({
    personalGroupId: "",
    personalGroupName: "",
  });

  useEffect(() => {
    if (groupList.length > 0) {
      setGroupData({
        personalGroupId: groupList[0].personalGroupId,
        personalGroupName: groupList[0].personalGroupName,
      });
    }
  }, [groupList]);

  const handleSelectChange = (e) => {
    const selectedGroup = groupList.find(
      (group) => group.personalGroupName === e.target.value
    );
    setGroupData({
      personalGroupId: selectedGroup.personalGroupId,
      personalGroupName: selectedGroup.personalGroupName,
    });
  };

  const handleInputChange = (e) => {
    setGroupData({
      ...groupData,
      personalGroupName: e.target.value,
    });
  };

  const handleUpdate = () => {
    const trimmedGroupName = groupData.personalGroupName.trim().toLowerCase();
    const normalizedExistingGroupNames = existingGroupNames.map((name) =>
      name.toLowerCase()
    );

    if (trimmedGroupName === "") {
      alert("값이 필요합니다.");
      return;
    }
    if (normalizedExistingGroupNames.includes(trimmedGroupName)) {
      alert("이미 존재하는 그룹명입니다.");
      return;
    }
    onUpdate(groupData); // 그룹 추가 콜백 호출
  };

  const handleDelete = () => {
    onDelete(groupData.personalGroupId);
  };

  return (
    <>
      <Select
        labelId="address-book-select-label"
        id="address-book-select"
        value={groupData.personalGroupName}
        onChange={handleSelectChange}
        sx={{ height: "40px", fontSize: "1em" }}
      >
        {groupList.map((group) => (
          <MenuItem value={group.personalGroupName} key={group.personalGroupId}>
            {group.personalGroupName}
          </MenuItem>
        ))}
      </Select>
      <TextField
        fullWidth
        name="personalContactName"
        value={groupData.personalGroupName}
        onChange={handleInputChange}
      />
      <Button onClick={handleUpdate} color="primary">
        수정
      </Button>
      <Button onClick={handleDelete} color="secondary">
        삭제
      </Button>
      <Button onClick={onCancel} color="secondary">
        취소
      </Button>
    </>
  );
};

export default SettingPersonalGroup;
