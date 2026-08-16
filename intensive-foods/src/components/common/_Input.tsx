import { forwardRef, type InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
  labelPlacement?: "top" | "bottom";
  error?: FieldError;
}

function Input(
  { label, icon, labelPlacement = "top", error, ...rest }: Props,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <div className="mb-3">
      {labelPlacement === "top" && (
        <label className="form-label">
          {icon && <i className={icon} />} {label}
        </label>
      )}
      <input ref={ref} className="form-control" {...rest} />
      {labelPlacement === "bottom" && (
        <label className="form-label">
          {icon && <i className={icon} />}
          {label}
        </label>
      )}
      {error && <p className="text-danger">{error.message}</p>}
    </div>
  );
}

export default forwardRef(Input);
