import { createSlice } from "@reduxjs/toolkit";
import { getSearchParams } from "../../util";
import { partTypes } from "../../config";

const initializeRange = (prop, parts) => {
  const params = getSearchParams(new URLSearchParams(window.location.search));

  return parts.reduce((range, part) => {
    let minLimit, maxLimit, minValue, maxValue;

    if (!range) {
      minLimit = part[prop];
      maxLimit = part[prop];
      minValue = params[prop] ? Number(params[prop].split("_")[0]) : part[prop];
      maxValue = params[prop] ? Number(params[prop].split("_")[1]) : part[prop];
    } else {
      minLimit = part[prop] < range.minLimit ? part[prop] : range.minLimit;
      maxLimit = part[prop] > range.maxLimit ? part[prop] : range.maxLimit;
      minValue = params[prop] ? range.minValue : minLimit;
      maxValue = params[prop] ? range.maxValue : maxLimit;
    }

    return { minLimit, maxLimit, minValue, maxValue };
  }, null);
};

const initializeTags = (prop, parts) => {
  const params = getSearchParams(new URLSearchParams(window.location.search));
  const checked = params[prop] ? params[prop].split("_") : [];

  return parts.reduce(
    (tags, part) => {
      return { ...tags, [part[prop]]: checked.includes(part[prop]) };
    },
    { All: !checked.length }
  );
};

const partsFilterSlice = createSlice({
  name: "partsFilter",
  initialState: null,
  reducers: {
    initializePartsFilter: (state, action) => {
      const { parts, partType } = action.payload;

      let filter = {
        manufacturer: initializeTags("manufacturer", parts),
        weight: initializeRange("weight", parts),
      };

      switch (partType) {
        case partTypes.motor:
          filter.kv = initializeRange("kv", parts);
          filter.motorDiameter = initializeRange("motorDiameter", parts);
          filter.motorHeight = initializeRange("motorHeight", parts);
          filter.shaftDiameter = initializeRange("shaftDiameter", parts);
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
    setTags: (state, action) => {
      const { prop, newTags } = action.payload;
      state[prop] = newTags;
    },
    setRange: (state, action) => {
      const { prop, minValue, maxValue } = action.payload;
      state[prop] = { ...state[prop], minValue, maxValue };
    },
  },
});

export const { initializePartsFilter, setTags, setRange } =
  partsFilterSlice.actions;

export default partsFilterSlice.reducer;
