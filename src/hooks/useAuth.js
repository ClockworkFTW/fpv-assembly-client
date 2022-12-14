import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    try {
      const { user } = jwtDecode(token);
      return user;
    } catch (error) {
      console.log(error); // TODO: Remove in prod
    }
  }
};

export default useAuth;
