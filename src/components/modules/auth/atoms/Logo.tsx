import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 ds-text-primary">
      <span className="ds-title-md">Collabspace</span>
    </Link>
  );
}
