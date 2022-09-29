import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { setTags } from "./partsFilterSlice";
import { getSearchParams } from "../../../util";

const TagsFilter = ({ prop, tags }) => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

  const handleCheckAll = (checked) => {
    if (!checked) {
      const newTags = Object.entries(tags).reduce(
        (obj, [key]) => ({ ...obj, [key]: key === "All" ? true : false }),
        {}
      );

      dispatch(setTags({ prop, newTags }));

      const { [prop]: x, ...newParams } = getSearchParams(params);

      setParams(newParams);
    }
  };

  const handleCheckTag = (tag, checked) => {
    const newTags = { ...tags, All: true, [tag]: !checked };

    for (const [key, value] of Object.entries(newTags)) {
      if (key !== "All" && value) {
        newTags.All = false;
        break;
      }
    }

    dispatch(setTags({ prop, newTags }));

    let checkedTags = null;

    for (const [key, value] of Object.entries(newTags)) {
      if (key !== "All" && value) {
        if (!checkedTags) {
          checkedTags = key;
        } else {
          checkedTags += `_${key}`;
        }
      }
    }

    if (checkedTags) {
      const newParams = { ...getSearchParams(params), [prop]: checkedTags };
      setParams(newParams);
    } else {
      const { [prop]: x, ...newParams } = getSearchParams(params);
      setParams(newParams);
    }
  };

  return (
    <div>
      <label>{prop}</label>
      <label>
        <input
          type="checkbox"
          checked={tags.All}
          onChange={() => handleCheckAll(tags.All)}
        />
        All
      </label>
      {Object.entries(tags).map(([tag, checked]) =>
        tag === "All" ? null : (
          <label key={tag}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleCheckTag(tag, checked)}
            />
            {tag}
          </label>
        )
      )}
    </div>
  );
};

export default TagsFilter;
