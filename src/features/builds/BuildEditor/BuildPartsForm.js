const BuildParts = ({ parts }) => {
  return parts.map((part) => (
    <div>
      <p>{part.name}</p>
    </div>
  ));
};

export default BuildParts;
