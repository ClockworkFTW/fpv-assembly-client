import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Editable, Slate } from "slate-react";
import { withReact } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import debounce from "lodash.debounce";
import isHotkey from "is-hotkey";
import dayjs from "dayjs";

// API
import { useUpdateBuildMutation } from "../buildsApiSlice";

// Components
import Image from "components/Image";
import Video from "components/Video";
import EmbedModal, { ModalButton } from "features/builds/BuildLog/EmbedModal";
import ImagePicker from "features/builds/BuildLog/EmbedModal/ImagePicker";
import VideoPicker from "features/builds/BuildLog/EmbedModal/VideoPicker";
import { MarkButton, BlockButton } from "features/builds/BuildLog/Text";
import EmbedElement from "features/builds/BuildLog/EmbedElement";

// Config
import { HOTKEYS } from "config/slate";

// Context
import { BuildIdContext } from "pages/BuildEditor";

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

const BuildLog = ({ log, images }) => {
  const buildId = useContext(BuildIdContext);

  const editor = useMemo(
    () => withEmbeds(withHistory(withReact(createEditor()))),
    []
  );

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const listenForHotkey = (event) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };

  const [updateBuildLog, { isLoading, isSuccess }] = useUpdateBuildMutation();
  const [updatedAt, setUpdatedAt] = useState(null);

  const onChange = (log) => {
    updateBuildLog({ buildId, data: { log } });
  };

  useEffect(() => {
    if (isSuccess) {
      setUpdatedAt(dayjs().format("h:mm A"));
    }
  }, [isSuccess]);

  const debouncedOnChange = useMemo(() => debounce(onChange, 1000), []);

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  const [modal, setModal] = useState(null);

  const openModal = (modalType) => () => setModal(modalType);
  const closeModal = () => setModal(null);

  return (
    <Slate editor={editor} value={log} onChange={debouncedOnChange}>
      <div>
        <MarkButton format="bold" icon="bold" />
        <MarkButton format="italic" icon="italic" />
        <MarkButton format="underline" icon="underline" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="h1" />
        <BlockButton format="heading-two" icon="h2" />
        <BlockButton format="block-quote" icon="quote-right" />
        <ModalButton openModal={openModal("image")} icon="image" />
        <ModalButton openModal={openModal("video")} icon="film" />
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
      {isLoading ? "Saving..." : updatedAt ? `Autosaved at ${updatedAt}` : null}
      <EmbedModal modal={modal} closeModal={closeModal}>
        <ImagePicker images={images} />
        <VideoPicker />
      </EmbedModal>
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
      return <EmbedElement {...props} embed={<Image url={element.url} />} />;

    case "video":
      return <EmbedElement {...props} embed={<Video url={element.url} />} />;

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
