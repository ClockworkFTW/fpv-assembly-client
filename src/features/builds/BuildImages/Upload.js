import { useContext } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

// API
import { useUploadBuildImagesMutation } from "features/builds/buildsApiSlice";

// Context
import { BuildIdContext } from "pages/BuildEditor";

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

  const { uploadProgress } = useSelector((state) => state);

  return (
    <Container>
      <Button htmlFor="build-image-file-input">
        {uploadProgress && <Progress width={uploadProgress} />}
        <Text>{isLoading ? "Loading..." : "Upload Images"}</Text>
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
  position: relative;
  display: inline-block;

  overflow: hidden;
  border-radius: 4px;
  background-color: silver;
  :hover {
    cursor: pointer;
  }
`;

const Text = styled.div`
  position: relative;
  padding: 8px 16px;
`;

const Progress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: grey;
  width: ${({ width }) => `${width * 100}%`};
`;

const Input = styled.input`
  display: none;
`;

export default Upload;
