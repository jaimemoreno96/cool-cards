export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  cANCEL = "cancel",
}

interface ButtonProps {
  buttonType: ButtonType;
  label: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}
const Button = ({ buttonType, label, type }: ButtonProps) => {
  let bgColor = "";
  if (buttonType === ButtonType.PRIMARY) {
    bgColor = "bg-primary-main";
  }
  return (
    <button
      type={type}
      className={`${bgColor} text-white w-max m-auto px-6 py-2 rounded text-sm font-normal`}>
      {label}
    </button>
  );
};
export default Button;
