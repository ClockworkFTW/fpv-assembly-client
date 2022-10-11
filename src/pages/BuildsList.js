import CreateBuildButton from "../features/builds/BuildsList/CreateBuildButton";
import BuildsList from "../features/builds/BuildsList";

const BuildsListPage = () => (
  <div>
    <h1>Builds</h1>
    <CreateBuildButton />
    <BuildsList />
  </div>
);

export default BuildsListPage;
