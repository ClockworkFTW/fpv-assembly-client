import { Link } from "react-router-dom";

const PartsMenu = () => (
  <div>
    <h1>Parts</h1>
    <ul>
      <li>
        <Link to="/parts/motor">Motors</Link>
      </li>
      <li>
        <Link to="/parts/frame">Frames</Link>
      </li>
      <li>
        <Link to="/parts/battery">Batteries</Link>
      </li>
      <li>
        <Link to="/parts/propeller">Propellers</Link>
      </li>
      <li>
        <Link to="/parts/video-camera">Video Cameras</Link>
      </li>
      <li>
        <Link to="/parts/video-antenna">Video Antenna</Link>
      </li>
      <li>
        <Link to="/parts/video-receiver">Video Receiver</Link>
      </li>
      <li>
        <Link to="/parts/radio-receiver">Radio Receiver</Link>
      </li>
      <li>
        <Link to="/parts/flight-controller">Flight Controllers</Link>
      </li>
      <li>
        <Link to="/parts/electronic-speed-controller">
          Electronic Speed Controllers
        </Link>
      </li>
    </ul>
  </div>
);

export default PartsMenu;
