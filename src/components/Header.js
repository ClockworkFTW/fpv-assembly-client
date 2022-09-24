import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/">FPV Assembly</Link>
      <Link to="/parts">Parts</Link>
      <Link to="/parts/new">Create Part</Link>
      <Link to="/builds">Builds</Link>
      <Link to="/sign-in">Sign In</Link>
      <Link to="/sign-up">Sign Up</Link>
    </div>
  );
};

export default Header;
