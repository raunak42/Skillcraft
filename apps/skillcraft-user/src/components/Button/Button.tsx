interface ButtonProps {
  text: string;
}

export const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button className="bg-green-500 text-white font-bold py-2 px-3 rounded hover:bg-green-700">
      {text}
    </button>
  );
};
