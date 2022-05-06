import { useState, useMemo, useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ACTION_TYPES } from "../const";

function AddAction({ data, id, onInsert }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const insertNode = useCallback(
    (action) => {
      onInsert({ nodeId: id, action });
      handleClose();
    },
    [id, onInsert, handleClose]
  );

  const isShowHandleBottom = useMemo(() => {
    return data?.isShowHandleBottom;
  }, [data]);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} />
      <div style={{ display: "flex", minWidth: 300, justifyContent: "center" }}>
        <button onClick={handleClick}>+ Add Step</button>
      </div>
      {isShowHandleBottom && (
        <Handle type="target" position={Position.Bottom} />
      )}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => insertNode(ACTION_TYPES.MACHINE_TRANSLATION)}>
          Add machine translation
        </MenuItem>
        <MenuItem onClick={() => insertNode(ACTION_TYPES.OCR)}>OCR</MenuItem>
        <MenuItem onClick={() => insertNode(ACTION_TYPES.IF_ELSE)}>
          If/else
        </MenuItem>
      </Menu>
    </div>
  );
}

export default AddAction;
