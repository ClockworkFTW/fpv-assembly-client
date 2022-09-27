import { Routes, Route } from "react-router-dom";

import InitCredentials from "./features/auth/InitCredentials";
import Layout from "./components/Layout";
import Home from "./components/Home";
import SignIn from "./features/auth/SignIn";
import SignUp from "./features/auth/SignUp";
import PartsMenu from "./features/parts/PartsMenu";
import PartsList from "./features/parts/PartsList";
import PartEditor from "./features/parts/PartEditor";
import Prefetch from "./features/auth/Prefetch";

const App = () => {
  return (
    <Routes>
      <Route element={<InitCredentials />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route element={<Prefetch />}>
            <Route path="parts">
              <Route index element={<PartsMenu />} />
              <Route path=":partType" element={<PartsList />} />
              <Route path="edit/:partId" element={<PartEditor />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
