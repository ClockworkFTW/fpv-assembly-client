import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { partTypes } from "../../../config";
import { partTypeToName } from "../../../util";

import {
  selectPartById,
  useCreatePartMutation,
  useUpdatePartMutation,
  useDeletePartMutation,
} from "../partsApiSlice";

import MotorForm from "./MotorForm";
import FrameForm from "./FrameForm";
import BatteryForm from "./BatteryForm";
import PropellerForm from "./PropellerForm";
import RadioReceiverForm from "./RadioReceiverForm";
import VideoCameraForm from "./VideoCameraForm";
import VideoAntennaForm from "./VideoAntennaForm";
import VideoTransmitterForm from "./VideoTransmitterForm";
import FlightControllerForm from "./FlightControllerForm";
import ElectronicSpeedControllerForm from "./ElectronicSpeedControllerForm";

const PartEditor = () => {
  const { partId } = useParams();
  const part = useSelector((state) => selectPartById(state, partId));

  const [partType, setPartType] = useState(part ? part.type : partTypes.motor);

  const [
    createPart,
    { isCreateLoading, isCreateSuccess, isCreateError, createError },
  ] = useCreatePartMutation();

  const [
    updatePart,
    { isUpdateLoading, isUpdateSuccess, isUpdateError, updateError },
  ] = useUpdatePartMutation();

  const [
    deletePart,
    { isDeleteLoading, isDeleteSuccess, isDeleteError, deleteError },
  ] = useDeletePartMutation();

  const handleOnSubmit = (part) => {
    if (partId === "new") {
      createPart(part);
    } else {
      updatePart(part);
    }
  };

  const handleOnDelete = (partId) => {
    deletePart(partId);
  };

  const renderSelect = () =>
    part ? null : (
      <div>
        <label>Type</label>
        <select value={partType} onChange={(e) => setPartType(e.target.value)}>
          {Object.entries(partTypes).map(([key, value]) => (
            <option key={key} value={value}>
              {partTypeToName(value)}
            </option>
          ))}
        </select>
      </div>
    );

  const renderForm = () => {
    switch (partType) {
      case partTypes.motor:
        return (
          <MotorForm
            part={part}
            partType={partType}
            handleOnSubmit={handleOnSubmit}
            handleOnDelete={handleOnDelete}
          />
        );
      case partTypes.frame:
        return (
          <FrameForm
            part={part}
            partType={partType}
            handleOnSubmit={handleOnSubmit}
            handleOnDelete={handleOnDelete}
          />
        );
      case partTypes.battery:
        return (
          <BatteryForm
            part={part}
            partType={partType}
            handleOnSubmit={handleOnSubmit}
            handleOnDelete={handleOnDelete}
          />
        );
      case partTypes.propeller:
        return (
          <PropellerForm
            part={part}
            partType={partType}
            handleOnSubmit={handleOnSubmit}
            handleOnDelete={handleOnDelete}
          />
        );
      case partTypes.radioReceiver:
        return (
          <RadioReceiverForm
            part={part}
            partType={partType}
            handleOnSubmit={handleOnSubmit}
            handleOnDelete={handleOnDelete}
          />
        );
      case partTypes.videoCamera:
        return (
          <VideoCameraForm
            part={part}
            partType={partType}
            handleOnSubmit={handleOnSubmit}
            handleOnDelete={handleOnDelete}
          />
        );
      case partTypes.videoAntenna:
        return (
          <VideoAntennaForm
            part={part}
            partType={partType}
            handleOnSubmit={handleOnSubmit}
            handleOnDelete={handleOnDelete}
          />
        );
      case partTypes.videoTransmitter:
        return (
          <VideoTransmitterForm
            part={part}
            partType={partType}
            handleOnSubmit={handleOnSubmit}
            handleOnDelete={handleOnDelete}
          />
        );
      case partTypes.flightController:
        return (
          <FlightControllerForm
            part={part}
            partType={partType}
            handleOnSubmit={handleOnSubmit}
            handleOnDelete={handleOnDelete}
          />
        );
      case partTypes.electronicSpeedController:
        return (
          <ElectronicSpeedControllerForm
            part={part}
            partType={partType}
            handleOnSubmit={handleOnSubmit}
            handleOnDelete={handleOnDelete}
          />
        );
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Part Editor</h1>
      {renderSelect()}
      {renderForm()}
    </div>
  );
};

export default PartEditor;
