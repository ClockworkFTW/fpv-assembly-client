import { Routes, Route } from "react-router-dom";

import InitializeAuth from "./features/auth/InitializeAuth";
import RequireAuth from "./features/auth/RequireAuth";
import Layout from "./components/Layout";
import Home from "./components/Home";
import SignIn from "./features/auth/SignIn";
import SignUp from "./features/auth/SignUp";
import PartsMenu from "./features/parts/PartsMenu";
import PartsList from "./features/parts/PartsList";
import PartDetails from "./features/parts/PartDetails";
import PartEditor from "./features/parts/PartEditor";

import { userRoles } from "./config";

const App = () => {
  return (
    <Routes>
      <Route element={<InitializeAuth />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="parts">
            <Route index element={<PartsMenu />} />
            <Route path=":partType" element={<PartsList />} />
            <Route path=":partType/:partId" element={<PartDetails />} />
            <Route element={<RequireAuth roles={[userRoles.admin]} />}>
              <Route path="edit/:partId" element={<PartEditor />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
