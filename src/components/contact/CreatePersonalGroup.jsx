import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

const CreatePersonalGroup = ({ onCreate, onCancel, existingGroupNames }) => {
  const [groupName, setGroupName] = useState("");

  const handleCreate = () => {
    // 중복 체크 로직 추가
    if (existingGroupNames.includes(groupName)) {
      alert("이미 존재하는 그룹명입니다.");
      return;
    }
    onCreate(groupName); // 그룹 추가 콜백 호출
  };

  return (
    <div>
      <TextField
        label="Group Name"
        variant="outlined"
        fullWidth
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <Button onClick={handleCreate} color="primary">
        생성
      </Button>
      <Button onClick={onCancel} color="secondary">
        취소
      </Button>
    </div>
  );
};

export default CreatePersonalGroup;
