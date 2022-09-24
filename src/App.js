import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home";
import SignIn from "./features/auth/SignIn";
import SignUp from "./features/auth/SignUp";
import PartsMenu from "./features/parts/PartsMenu";
import PartsList from "./features/parts/PartsList";
import PartEditor from "./features/parts/PartEditor";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="parts">
          <Route index element={<PartsMenu />} />
          <Route path=":partType" element={<PartsList />} />
          <Route path=":partId" element={<PartEditor />} />
          <Route path="new" element={<PartEditor />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
