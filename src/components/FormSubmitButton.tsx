"use client";
import { Loader2Icon } from "lucide-react";
import React from "react";

type FormSubmitButtonProps = {
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function FormSubmitButton({
  isLoading,
  children,
  ...props
}: FormSubmitButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading}
      className={`${
        props.className
      } ${"flex flex-row items-center justify-center gap-1 rounded-lg border-2 p-2 text-white"} ${
        isLoading
          ? "bg-slate-600 hover:cursor-not-allowed"
          : "bg-primary hover:bg-primary/90"
      }`}
    >
      {children}{" "}
      {isLoading && (
        <span>
          <Loader2Icon className="animate-spin" size={16} />
        </span>
      )}
    </button>
  );
}
