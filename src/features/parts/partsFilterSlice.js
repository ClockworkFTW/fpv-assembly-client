import { createSlice } from "@reduxjs/toolkit";

import { partTypes } from "../../config";

const initializeRange = (parts, prop) =>
  parts.reduce((range, part) => {
    if (!range) {
      return {
        minLimit: part[prop],
        maxLimit: part[prop],
        minValue: part[prop],
        maxValue: part[prop],
      };
    } else {
      const minLimit =
        part[prop] < range.minLimit ? part[prop] : range.minLimit;
      const maxLimit =
        part[prop] > range.maxLimit ? part[prop] : range.maxLimit;

      return { minLimit, maxLimit, minValue: minLimit, maxValue: maxLimit };
    }
  }, null);

const partsFilterSlice = createSlice({
  name: "partsFilter",
  initialState: null,
  reducers: {
    initializePartsFilter: (state, action) => {
      const { parts, partType } = action.payload;

      let filter = { weight: initializeRange(parts, "weight") };

      switch (partType) {
        case partTypes.motor:
          filter.kv = initializeRange(parts, "kv");
          filter.motorDiameter = initializeRange(parts, "motorDiameter");
          filter.motorHeight = initializeRange(parts, "motorHeight");
          filter.shaftDiameter = initializeRange(parts, "shaftDiameter");
          filter.motorMountWidth = initializeRange(parts, "motorMountWidth");
          filter.motorMountLength = initializeRange(parts, "motorMountLength");
          break;
        case partTypes.frame:
          // TODO: Add props
          break;
        case partTypes.battery:
          // TODO: Add props
          break;
        case partTypes.radioReceiver:
          // TODO: Add props
          break;
        case partTypes.videoCamera:
          // TODO: Add props
          break;
        case partTypes.videoAntenna:
          // TODO: Add props
          break;
        case partTypes.videoTransmitter:
          // TODO: Add props
          break;
        case partTypes.flightController:
          // TODO: Add props
          break;
        case partTypes.electronicSpeedController:
          // TODO: Add props
          break;
        default:
          filter = null;
          break;
      }

      return filter;
    },
    setRange: (state, action) => {
      const { prop, minValue, maxValue } = action.payload;
      state[prop] = { ...state[prop], minValue, maxValue };
    },
  },
});

export const { initializePartsFilter, setRange } = partsFilterSlice.actions;

export default partsFilterSlice.reducer;
