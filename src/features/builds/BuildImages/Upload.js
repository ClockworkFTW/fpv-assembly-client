import { useContext } from "react";
import styled from "styled-components";

// API
import { useUploadBuildImagesMutation } from "../buildsApiSlice";

// Context
import { BuildIdContext } from "../../../pages/BuildEditor";

const Upload = () => {
  const buildId = useContext(BuildIdContext);

  const [uploadBuildImages, { isLoading }] = useUploadBuildImagesMutation();

  const onChange = (event) => {
    const formData = new FormData();

    formData.append("fileCount", event.target.files.length);

    Array.from(event.target.files).forEach((file) => {
      formData.append("build-photo", file);
    });

    uploadBuildImages({ buildId, formData });
  };

  return (
    <Container>
      <Button htmlFor="build-image-file-input">
        {isLoading ? "Loading..." : "Upload Images"}
      </Button>
      <Input
        id="build-image-file-input"
        type="file"
        multiple
        onChange={onChange}
      />
    </Container>
  );
};

const Container = styled.div``;

const Button = styled.label`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: silver;
  :hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  display: none;
`;

export default Upload;
