import React from "react";
import "./Buttons.css";

// Define os tipos das propriedades aceitas pelo botão
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary";
}

// Componente do Botão
export const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  onClick,
  disabled,
  className,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${className || ""}`}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
