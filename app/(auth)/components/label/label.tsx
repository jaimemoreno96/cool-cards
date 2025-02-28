interface LabelProps {
  label: string;
  name: string;
}

const Label = ({ label, name }: LabelProps) => {
  return (
    <label
      htmlFor={name}
      className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
      {label}
    </label>
  );
};
export default Label;
