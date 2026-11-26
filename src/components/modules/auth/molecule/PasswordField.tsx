import {
  forwardRef,
  useState,
} from "react";
import { Eye, EyeOff } from "@/assets/icons/Icons";
import FormField from "./FormField";
import type { PasswordFieldProps } from "../types/Logintype";



const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label = "Password", startAdornment, error, ...rest }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <FormField
        ref={ref}
        label={label}
        error={error}
        startAdornment={startAdornment}
        type={visible ? "text" : "password"}
        endAdornment={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="ds-text-secondary ds-hover"
          >
            {visible ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        }
        {...rest}
      />
    );
  },
);

PasswordField.displayName = "PasswordField";
export default PasswordField;
