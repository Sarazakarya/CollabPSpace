import { Link } from "react-router-dom";
import type { AuthSwitchProps } from "../types/Logintype";

export default function AuthSwitchLink({
  text,
  linkText,
  to,
}: AuthSwitchProps) {
  return (
    <p className="ds-text-sm ds-text-secondary text-center">
      {text}{" "}
      <Link to={to} className="ds-text-brand font-semibold hover:underline">
        {linkText}
      </Link>
    </p>
  );
}
