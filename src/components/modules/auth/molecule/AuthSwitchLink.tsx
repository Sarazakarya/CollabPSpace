import { Link } from "react-router-dom";

interface Props {
  text: string;
  linkText: string;
  to: string;
}

export default function AuthSwitchLink({ text, linkText, to }: Props) {
  return (
    <p className="ds-text-sm ds-text-secondary text-center">
      {text}{" "}
      <Link to={to} className="ds-text-brand font-semibold hover:underline">
        {linkText}
      </Link>
    </p>
  );
}
