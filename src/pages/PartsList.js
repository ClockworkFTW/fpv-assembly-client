import BuildStats from "../features/builds/BuildEditor/BuildStats";
import PartsFilter from "../features/parts/PartsFilter";
import PartsList from "../features/parts/PartsList";

const PartsListPage = () => (
  <div>
    <BuildStats />
    <PartsFilter />
    <PartsList />
  </div>
);

export default PartsListPage;
