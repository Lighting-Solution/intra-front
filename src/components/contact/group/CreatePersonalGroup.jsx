import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";

const CreatePersonalGroup = ({ onCreate, onCancel, existingGroupNames }) => {
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    console.log("Existing Group Names: ", existingGroupNames);
  }, [existingGroupNames]);

  const handleCreate = () => {
    const trimmedGroupName = groupName.trim().toLowerCase();
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
    onCreate(trimmedGroupName); // 그룹 추가 콜백 호출
  };

  return (
    <div>
      <TextField
        label="주소록 이름"
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
