import { useSlate } from "slate-react";
import { Editor, Transforms, Element as SlateElement } from "slate";
import styled from "styled-components";

// Components
import Icon from "components/Icon";

// Config
import { LIST_TYPES, TEXT_ALIGN_TYPES } from "config/slate";

const isBlockActive = (editor, format, blockType = "type") => {
  const { selection } = editor;

  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (node) =>
        !Editor.isEditor(node) &&
        SlateElement.isElement(node) &&
        node[blockType] === format,
    })
  );

  return !!match;
};

const toggleBlock = (editor, format) => () => {
  const blockType = TEXT_ALIGN_TYPES.includes(format) ? "align" : "type";
  const isActive = isBlockActive(editor, format, blockType);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (node) =>
      !Editor.isEditor(node) &&
      SlateElement.isElement(node) &&
      LIST_TYPES.includes(node.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });

  let newProperties;

  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }

  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  const blockType = TEXT_ALIGN_TYPES.includes(format) ? "align" : "type";
  const isActive = isBlockActive(editor, format, blockType);

  return (
    <Button isActive={isActive} onMouseDown={toggleBlock(editor, format)}>
      <Icon icon={["fas", icon]} />
    </Button>
  );
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);

  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor, format) => () => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);

  return (
    <Button isActive={isActive} onMouseDown={toggleMark(editor, format)}>
      <Icon icon={["fas", icon]} />
    </Button>
  );
};

const Button = styled.div`
  display: inline-block;
  padding: 6px;
  color: ${({ isActive }) => (isActive ? "red" : "silver")};
  :hover {
    cursor: pointer;
    color: ${({ isActive }) => (isActive ? "red" : "black")};
  }
`;
