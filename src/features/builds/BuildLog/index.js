import { useCallback, useMemo, useState } from "react";
import { Editable, Slate } from "slate-react";
import { withReact } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import isHotkey from "is-hotkey";

// Components
import Modal, { ModalButton } from "features/builds/BuildLog/Modal";
import { MarkButton, BlockButton } from "features/builds/BuildLog/Text";
import { ImageElement, ImageModal } from "features/builds/BuildLog/Image";
import { VideoElement, VideoModal } from "features/builds/BuildLog/Video";

// Config
import { HOTKEYS } from "config/slate";

// Other
import { toggleMark } from "features/builds/BuildLog/Text";

const withEmbeds = (editor) => {
  const { isVoid } = editor;

  editor.isVoid = (element) => {
    if (element.type === "image" || element.type === "video") {
      return true;
    } else {
      return isVoid(element);
    }
  };

  return editor;
};

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const BuildLog = ({ log, images }) => {
  const editor = useMemo(
    () => withEmbeds(withHistory(withReact(createEditor()))),
    []
  );

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const [modal, setModal] = useState(null);

  const listenForHotkey = (event) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };

  return (
    <Slate editor={editor} value={log || initialValue}>
      <div>
        <MarkButton format="bold" icon="bold" />
        <MarkButton format="italic" icon="italic" />
        <MarkButton format="underline" icon="underline" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="h1" />
        <BlockButton format="heading-two" icon="h2" />
        <BlockButton format="block-quote" icon="quote-right" />
        <ModalButton openModal={() => setModal("image")} icon="image" />
        <ModalButton openModal={() => setModal("video")} icon="film" />
        <BlockButton format="numbered-list" icon="list-ol" />
        <BlockButton format="bulleted-list" icon="list-ul" />
        <BlockButton format="left" icon="align-left" />
        <BlockButton format="center" icon="align-center" />
        <BlockButton format="right" icon="align-right" />
        <BlockButton format="justify" icon="align-justify" />
      </div>
      <div>
        <Editable
          autoFocus
          spellCheck
          placeholder="Use this space to record your build log."
          onKeyDown={listenForHotkey}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </div>
      <Modal modal={modal} closeModal={() => setModal(null)}>
        <ImageModal images={images} />
        <VideoModal />
      </Modal>
    </Slate>
  );
};

const Element = (props) => {
  const { attributes, children, element } = props;
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    case "image":
      return (
        <div style={style} {...attributes}>
          <ImageElement children={children} element={element} />
        </div>
      );
    case "video":
      return (
        <div style={style} {...attributes}>
          <VideoElement children={children} element={element} />
        </div>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

export default BuildLog;
