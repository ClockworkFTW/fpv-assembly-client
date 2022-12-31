import { useState } from "react";

// Components
import Video from "components/Video";

// Styles
import * as Styled from "features/builds/BuildLog/EmbedModal/VideoPicker/VideoPicker.style";

const VideoPicker = ({ modal, embedElement }) => {
  const [url, setUrl] = useState("");

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  if (modal !== "video") return null;

  return (
    <div>
      <Styled.Content>
        <Video url={url} />
      </Styled.Content>
      <Styled.Footer>
        <input
          type="url"
          value={url}
          placeholder="Video URL"
          onChange={handleUrlChange}
        />
        <button onClick={embedElement("video", url)}>add</button>
      </Styled.Footer>
    </div>
  );
};

export default VideoPicker;
