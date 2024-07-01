import React from "react";
import { Menu, MenuItem } from "@mui/material";

const ContextMenu = ({
  contextMenu,
  handleClose,
  handleDelete,
  handlePin,
  isPinned,
}) => {
  return (
    <Menu
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
    >
      <MenuItem onClick={handlePin}>
        {isPinned ? "고정 해제" : "상단 고정"}
      </MenuItem>
      <MenuItem onClick={handleDelete}>삭제</MenuItem>
    </Menu>
  );
};

export default ContextMenu;
