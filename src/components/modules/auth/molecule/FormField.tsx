import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import type { FormFieldProps } from "../types/Logintype";


const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    { label, error, startAdornment, endAdornment, id, className, ...rest },
    ref,
  ) => {
    const fieldId = id ?? rest.name;

    return (
      <div className="flex flex-col gap-1.5">
        <fieldset
          className={`min-w-0 rounded-md border px-3 pb-1 ${
            error ? "border-destructive" : "border-input"
          }`}
        >
          <legend className="px-1.5 text-xs font-normal text-gray-400">
            {label}
          </legend>

          <div className="flex items-center gap-2">
            {startAdornment && (
              <span className="shrink-0 text-muted-foreground">
                {startAdornment}
              </span>
            )}

            <Input
              ref={ref}
              id={fieldId}
              aria-invalid={!!error}
              className={`h-9 min-w-0 border-0 bg-transparent px-0 shadow-none outline-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 data-[invalid=true]:border-0 data-[invalid=true]:ring-0 ${
                endAdornment ? "pe-2" : ""
              } ${className ?? ""}`}
              {...rest}
            />

            {endAdornment && (
              <span className="shrink-0 text-muted-foreground">
                {endAdornment}
              </span>
            )}
          </div>
        </fieldset>

        {error && (
          <p role="alert" className="ds-text-xs ds-text-danger">
            {error}
          </p>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";
export default FormField;
