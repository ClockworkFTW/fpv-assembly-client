import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { partTypes } from "../../../config";
import { partTypeToName } from "../../../util";

import {
  useGetPartQuery,
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
  const navigate = useNavigate();

  const { partId } = useParams();

  const { part } = useGetPartQuery(partId, {
    selectFromResult: ({ data }) => ({
      part: partId === "new" ? null : data,
    }),
  });

  const [partType, setPartType] = useState(part ? part.type : partTypes.motor);

  const [
    createPart,
    {
      data: createdData,
      isLoading: isCreateLoading,
      isSuccess: isCreateSuccess,
      isError: isCreateError,
      error: createError,
    },
  ] = useCreatePartMutation();

  useEffect(() => {
    if (isCreateSuccess) {
      const { id, type } = createdData.part;
      navigate(`/parts/${type}/${id}`);
    }
  }, [isCreateSuccess, createdData, navigate]);

  const [
    updatePart,
    {
      data: updatedData,
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdatePartMutation();

  useEffect(() => {
    if (isUpdateSuccess) {
      const { id, type } = updatedData.part;
      navigate(`/parts/${type}/${id}`);
    }
  }, [isUpdateSuccess, updatedData, navigate]);

  const [
    deletePart,
    {
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeletePartMutation();

  useEffect(() => {
    if (isDeleteSuccess) {
      navigate(`/parts/${partType}`);
    }
  }, [partType, isDeleteSuccess, navigate]);

  const handleOnSubmit = (part) => {
    if (partId === "new") {
      createPart(part);
    } else {
      updatePart({ part, partId });
    }
  };

  const renderLoader = () =>
    isCreateLoading || isUpdateLoading || isDeleteLoading ? (
      <p>Loading...</p>
    ) : null;

  const renderError = () =>
    isCreateError || isUpdateError || isDeleteError ? (
      <div>
        {isCreateError && <p>{createError?.data?.message}</p>}
        {isUpdateError && <p>{updateError?.data?.message}</p>}
        {isDeleteError && <p>{deleteError?.data?.message}</p>}
      </div>
    ) : null;

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
          />
        );
      case partTypes.frame:
        return (
          <FrameForm
            part={part}
            partType={partType}
            handleOnSubmit={handleOnSubmit}
          />
        );
      case partTypes.battery:
        return (
          <BatteryForm
            part={part}
            partType={partType}
            handleOnSubmit={handleOnSubmit}
          />
        );
      case partTypes.propeller:
        return (
          <PropellerForm
            part={part}
            partType={partType}
            handleOnSubmit={handleOnSubmit}
          />
        );
      case partTypes.radioReceiver:
        return (
          <RadioReceiverForm
            part={part}
            partType={partType}
            handleOnSubmit={handleOnSubmit}
          />
        );
      case partTypes.videoCamera:
        return (
          <VideoCameraForm
            part={part}
            partType={partType}
            handleOnSubmit={handleOnSubmit}
          />
        );
      case partTypes.videoAntenna:
        return (
          <VideoAntennaForm
            part={part}
            partType={partType}
            handleOnSubmit={handleOnSubmit}
          />
        );
      case partTypes.videoTransmitter:
        return (
          <VideoTransmitterForm
            part={part}
            partType={partType}
            handleOnSubmit={handleOnSubmit}
          />
        );
      case partTypes.flightController:
        return (
          <FlightControllerForm
            part={part}
            partType={partType}
            handleOnSubmit={handleOnSubmit}
          />
        );
      case partTypes.electronicSpeedController:
        return (
          <ElectronicSpeedControllerForm
            part={part}
            partType={partType}
            handleOnSubmit={handleOnSubmit}
          />
        );
      default:
        return null;
    }
  };

  const renderDelete = () =>
    partId === "new" ? null : (
      <button onClick={() => deletePart(partId)}>delete</button>
    );

  return (
    <div>
      <h1>Part Editor</h1>
      {renderLoader()}
      {renderError()}
      {renderSelect()}
      {renderForm()}
      {renderDelete()}
    </div>
  );
};

export default PartEditor;
