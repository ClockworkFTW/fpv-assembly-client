import { useState } from "react";

import { partTypes } from "../../../config";
import { partTypeToName } from "../../../util";

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
  const [partType, setPartType] = useState(partTypes.motor);

  const handleOnSubmit = (values) => {
    console.log(values);
  };

  const renderForm = (partType) => {
    switch (partType) {
      case partTypes.motor:
        return (
          <MotorForm partType={partType} handleOnSubmit={handleOnSubmit} />
        );
      case partTypes.frame:
        return (
          <FrameForm partType={partType} handleOnSubmit={handleOnSubmit} />
        );
      case partTypes.battery:
        return (
          <BatteryForm partType={partType} handleOnSubmit={handleOnSubmit} />
        );
      case partTypes.propeller:
        return (
          <PropellerForm partType={partType} handleOnSubmit={handleOnSubmit} />
        );
      case partTypes.radioReceiver:
        return (
          <RadioReceiverForm
            partType={partType}
            handleOnSubmit={handleOnSubmit}
          />
        );
      case partTypes.videoCamera:
        return (
          <VideoCameraForm
            partType={partType}
            handleOnSubmit={handleOnSubmit}
          />
        );
      case partTypes.videoAntenna:
        return (
          <VideoAntennaForm
            partType={partType}
            handleOnSubmit={handleOnSubmit}
          />
        );
      case partTypes.videoTransmitter:
        return (
          <VideoTransmitterForm
            partType={partType}
            handleOnSubmit={handleOnSubmit}
          />
        );
      case partTypes.flightController:
        return (
          <FlightControllerForm
            partType={partType}
            handleOnSubmit={handleOnSubmit}
          />
        );
      case partTypes.electronicSpeedController:
        return (
          <ElectronicSpeedControllerForm
            partType={partType}
            handleOnSubmit={handleOnSubmit}
          />
        );
      default:
        break;
    }
  };

  return (
    <div>
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
      {renderForm(partType)}
    </div>
  );
};

export default PartEditor;
