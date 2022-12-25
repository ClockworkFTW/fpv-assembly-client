import CountUp from "react-countup";

// Hooks
import usePrevious from "hooks/usePrevious";

const Counter = ({ value }) => {
  const start = usePrevious(value);
  return <CountUp start={start || 0} end={value} />;
};

export default Counter;
