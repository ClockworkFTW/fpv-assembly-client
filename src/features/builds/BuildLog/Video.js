import { useState } from "react";
import { Transforms } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";
import styled from "styled-components";

// Components
import Video from "components/Video";

export const VideoModal = ({ modal, closeModal }) => {
  const editor = useSlateStatic();

  const [url, setUrl] = useState("");

  const insertVideo = () => {
    const video = { type: "video", url, children: [{ text: "" }] };
    const space = { type: "paragraph", children: [{ text: "" }] };
    Transforms.insertNodes(editor, video);
    Transforms.insertNodes(editor, space);
    closeModal();
  };

  if (modal !== "video") return null;

  return (
    <div>
      <VideoModelContent>
        <Video url={url} />
      </VideoModelContent>
      <VideoModalFooter>
        <input
          type="url"
          value={url}
          placeholder="Video URL"
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={insertVideo}>add</button>
      </VideoModalFooter>
    </div>
  );
};

const VideoModelContent = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 4px;
  overflow: hidden;
  background-color: silver;
`;

const VideoModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

export const VideoElement = ({ children, element }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const removeElement = () => Transforms.removeNodes(editor, { at: path });

  return (
    <VideoElementWrapper contentEditable={false}>
      <VideoElementHeader>
        <button onClick={removeElement}>remove</button>
      </VideoElementHeader>
      <VideoElementContainer>
        <Video url={element.url} />
      </VideoElementContainer>
      {children}
    </VideoElementWrapper>
  );
};

const VideoElementWrapper = styled.div`
  display: inline-block;
  width: 33%;
  aspect-ratio: 16/9;
  padding: 10px;
  border-radius: 4px;
  background-color: silver;
`;

const VideoElementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 10px;
`;

const VideoElementContainer = styled.div`
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
`;
