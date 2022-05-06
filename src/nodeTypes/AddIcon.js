import { useCallback, useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import { MdAddCircleOutline } from "react-icons/md";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ACTION_TYPES } from "../const";

function AddIcon({ data, id, onInsert }) {
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
      handleClose();
      onInsert({ nodeId: id, action });
    },
    [id, onInsert, handleClose]
  );

  return (
    <div className="text-updater-node">
      <Handle
        style={{ width: 2, height: 2 }}
        type="target"
        position={Position.Top}
      />
      <div style={{ display: "flex", minWidth: 300, justifyContent: "center" }}>
        <MdAddCircleOutline
          onClick={handleClick}
          style={{ width: 30, height: 30 }}
        />
      </div>
      <Handle
        style={{ width: 2, height: 2 }}
        type="source"
        position={Position.Bottom}
      />

      <Menu
        id="basic-menu-add-icon"
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
        <MenuItem onClick={() => insertNode(ACTION_TYPES.OCR)}>OCR</MenuItem>{" "}
      </Menu>
    </div>
  );
}

export default AddIcon;
