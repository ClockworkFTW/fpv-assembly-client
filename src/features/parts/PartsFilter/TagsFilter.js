import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const TagsFilter = ({ prop, label, initialValue }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(initialValue);

  const handleCheckAll = (checked) => {
    if (checked) return;

    const tags = Object.entries(value).reduce(
      (obj, [key]) => ({ ...obj, [key]: key === "All" ? true : false }),
      {}
    );

    setValue(tags);
    updateSearchParams(tags);
  };

  const handleCheckTag = (tag, checked) => {
    const tags = { ...value, All: true, [tag]: !checked };

    for (const [key, value] of Object.entries(tags)) {
      if (key !== "All" && value) {
        tags.All = false;
        break;
      }
    }

    setValue(tags);
    updateSearchParams(tags);
  };

  const updateSearchParams = (tags) => {
    const checkedTags = [];

    Object.entries(tags).forEach(([tag, checked]) => {
      if (checked && tag !== "All") {
        checkedTags.push(tag);
      }
    });

    if (checkedTags.length) {
      if (searchParams.has(prop)) {
        searchParams.set(prop, `["${checkedTags.join('","')}"]`);
      } else {
        searchParams.append(prop, `["${checkedTags.join('","')}"]`);
      }
    } else {
      searchParams.delete(prop);
    }

    setSearchParams(searchParams);
  };

  return (
    <div>
      <p>{label}</p>
      <ul>
        <li>
          <label>
            <input
              type="checkbox"
              checked={value.All}
              onChange={() => handleCheckAll(value.All)}
            />
            All
          </label>
        </li>
        {Object.entries(value).map(([tag, checked]) =>
          tag === "All" ? null : (
            <li key={tag}>
              <label>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleCheckTag(tag, checked)}
                />
                {tag}
              </label>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default TagsFilter;
