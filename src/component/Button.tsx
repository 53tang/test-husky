import { VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../constants";

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    />
  );
}
