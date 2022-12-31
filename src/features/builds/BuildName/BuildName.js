import { useContext, useEffect, useMemo, useState } from "react";
import AutosizeInput from "react-input-autosize";
import debounce from "lodash.debounce";

// API
import { useUpdateBuildMutation } from "features/builds/buildsApiSlice";

// Context
import { BuildIdContext } from "pages/BuildEditor";

// Styles
import * as style from "features/builds/BuildName/BuildName.style";

const BuildName = ({ name }) => {
  const buildId = useContext(BuildIdContext);

  const [updateName, { isLoading }] = useUpdateBuildMutation();

  const debounceUpdateName = useMemo(
    () =>
      debounce((value) => {
        const data = { name: value };
        updateName({ buildId, data });
      }, 1000),
    []
  );

  const [text, setText] = useState(name);

  const onChange = (e) => {
    setText(e.target.value);
    debounceUpdateName(e.target.value);
  };

  useEffect(() => {
    return () => {
      debounceUpdateName.cancel();
    };
  }, [debounceUpdateName]);

  return (
    <AutosizeInput
      placeholder="Build Name"
      placeholderIsMinWidth
      value={text}
      onChange={onChange}
      disabled={isLoading}
      style={style.container}
      inputStyle={style.input}
    />
  );
};

export default BuildName;
