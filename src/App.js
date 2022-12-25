import { Routes, Route } from "react-router-dom";

// Pages
import Home from "pages/Home";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import PartsList from "pages/PartsList";
import PartDetails from "pages/PartDetails";
import PartEditor from "pages/PartEditor";
import BuildsList from "pages/BuildsList";
import BuildDetails from "pages/BuildDetails";
import BuildEditor from "pages/BuildEditor";
import NotFound from "pages/NotFound";

// Components
import Layout from "components/Layout";
import RequireAuth from "features/auth/RequireAuth";
import InitializeAuth from "features/auth/InitializeAuth";

// Config
import { userRoles } from "config";
const { user, admin } = userRoles;

const App = () => {
  return (
    <Routes>
      <Route element={<InitializeAuth />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="parts">
            <Route path=":partType" element={<PartsList />} />
            <Route path=":partType/:partId" element={<PartDetails />} />
            <Route element={<RequireAuth roles={[admin]} />}>
              <Route path="edit/:partId" element={<PartEditor />} />
            </Route>
          </Route>
          <Route path="builds">
            <Route index element={<BuildsList />} />
            <Route path=":buildId" element={<BuildDetails />} />
            <Route element={<RequireAuth roles={[user, admin]} />}>
              <Route path="edit/:buildId" element={<BuildEditor />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
