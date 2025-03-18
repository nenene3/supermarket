import { ComponentPropsWithoutRef, FormEvent, type ReactNode } from "react";

type Props = {
  onSave: (val: unknown) => void;
} & ComponentPropsWithoutRef<"form">;

const Form = ({ children, onSave, ...props }: Props) => {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const data = Object.fromEntries(formdata);
    onSave(data);
  }

  return (
    <form onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
};

export default Form;
