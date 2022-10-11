const BuildParts = ({ parts }) => {
  const sortedParts = parts.slice();
  sortedParts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <ul>
      {sortedParts.map((part) => (
        <li key={part.id}>{part.name}</li>
      ))}
    </ul>
  );
};
export default BuildParts;
