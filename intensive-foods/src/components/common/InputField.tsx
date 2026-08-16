import {
  forwardRef,
  type InputHTMLAttributes,
  type PropsWithChildren,
} from "react";
import type { FieldError } from "react-hook-form";

export default function InputField({ children }: PropsWithChildren) {
  return <div className="mb-3">{children}</div>;
}

InputField.Label = function Label({ children }: PropsWithChildren) {
  return <label className="form-label">{children}</label>;
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

function Input({ ...rest }: InputProps, ref: React.Ref<HTMLInputElement>) {
  return <input ref={ref} className="form-control" {...rest} />;
}

InputField.Input = forwardRef(Input);

interface ErrorProps {
  error?: FieldError;
}

InputField.Error = function Error({ error }: ErrorProps) {
  return error && <p className="text-danger">{error.message}</p>;
};
