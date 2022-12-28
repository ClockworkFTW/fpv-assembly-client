import { cloneElement, isValidElement } from "react";
import pluralize from "pluralize";

export const partTypeToName = (partType, makePlural) => {
  let words = partType.split("-");

  words = words.map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase());

  if (makePlural) {
    words[words.length - 1] = pluralize(words[words.length - 1]);
  }

  return words.join(" ");
};

export const sleep = (delay) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

const addPropsToReactElement = (element, props) => {
  if (isValidElement(element)) {
    return cloneElement(element, props);
  }
  return element;
};

export const addPropsToChildren = (children, props) => {
  if (!Array.isArray(children)) {
    return addPropsToReactElement(children, props);
  }
  return children.map((childElement, i) =>
    addPropsToReactElement(childElement, { ...props, key: i })
  );
};
