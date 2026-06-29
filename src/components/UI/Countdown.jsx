import { useCountdown } from "../../hooks/useCountdown";

const Countdown = ({ expiryDate, className = "de_countdown" }) => {
  const countdown = useCountdown(expiryDate);

  if (expiryDate == null) {
    return null;
  }

  return <div className={className}>{countdown}</div>;
};

export default Countdown;
