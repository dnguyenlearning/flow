import React, { useMemo } from "react";
import { Handle, Position } from "react-flow-renderer";
import { MdFlashOn, MdMoreVert } from "react-icons/md";
import { TRIGGER_TYPES } from "../const";

function getTypeLabel(type) {
  switch (type) {
    case TRIGGER_TYPES.RECORD_UPDATED:
      return "Record updated";
    default:
      return "Record created";
  }
}

function TriggerNode({ data }) {
  const isShowHandleTop = useMemo(() => {
    return data?.isShowHandleTop;
  }, [data]);

  return (
    <div>
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
        <div>TRIGGER</div>
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

export default TriggerNode;
