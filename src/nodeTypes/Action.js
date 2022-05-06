import { useMemo } from "react";
import { Handle, Position } from "react-flow-renderer";
import { MdFlashOn, MdMoreVert } from "react-icons/md";
import { ACTION_TYPES } from "../const";

function getTypeLabel(type) {
  switch (type) {
    case ACTION_TYPES.MACHINE_TRANSLATION:
      return "Machine Transation";
    case ACTION_TYPES.OCR:
      return "OCR";
    default:
      return "Machine Transation";
  }
}

function ActionNode({ data }) {
  const isShowHandleTop = useMemo(() => {
    return data?.isShowHandleTop;
  }, [data]);

  return (
    <div className="text-updater-node">
      {isShowHandleTop && <Handle type="target" position={Position.Top} />}
      <div
        style={{
          minWidth: 300,
          border: `1px solid gray`,
          padding: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>ACTION</div>
        <div
          style={{
            padding: 14,
            border: `1px solid gray`,
            borderRadius: 4,
            marginTop: 8,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MdFlashOn style={{ marginRight: 3 }} />
            When:{" "}
            <strong style={{ marginLeft: 3 }}>
              {" "}
              {getTypeLabel(data?.type)}
            </strong>
          </div>

          <MdMoreVert />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default ActionNode;
