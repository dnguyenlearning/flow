import { ACTION_TYPES, TRIGGER_TYPES, NODE_TYPES } from "../const";

export const initialNodes = [
  {
    id: "1",
    type: NODE_TYPES.TRIGGER,
    data: { type: TRIGGER_TYPES.RECORD_CREATED },
    position: { x: 250, y: 25 },
  },
  {
    id: "2",
    type: NODE_TYPES.ADD_ICON,
    data: {},
    position: { x: 250, y: 200 },
  },
  {
    id: "3",
    type: NODE_TYPES.ACTION,
    data: { isShowHandleTop: true, type: ACTION_TYPES.MACHINE_TRANSLATION },
    position: { x: 250, y: 300 },
  },
  {
    id: "4",
    type: NODE_TYPES.ADD_ACTION,
    data: {},
    position: { x: 250, y: 450 },
  },
];
