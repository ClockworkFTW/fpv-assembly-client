import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="">Home</Link>
      <Link to="/parts">Parts</Link>
      <Link to="/builds">Builds</Link>
      <Link to="/sign-in">Sign In</Link>
      <Link to="/sign-up">Sign Up</Link>
    </div>
  );
};

export default Header;
