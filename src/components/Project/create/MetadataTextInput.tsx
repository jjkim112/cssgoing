import React from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";

type TextInputProps = {
  id: number;
  title: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void;
  onMinus: (id: number) => void;
};

const MetadataTextInput: React.FC<TextInputProps> = ({
  id,
  title,
  value,
  onChange,
  onMinus,
}) => {
  return (
    <div className="flex my-2 items-center" key={id}>
      <AiOutlineMinusCircle
        className="hover:cursor-pointer mr-2"
        size={20}
        color="red"
        onClick={() => {
          onMinus(id);
        }}
      />
      <div className="text-[16px]">{title}</div>
      <input
        className="mx-4 border-[1px] border-black rounded-2xl py-1 px-2 grow"
        id={`text-input${id}`}
        type="text"
        value={value}
        onChange={(event) => onChange(event, id)}
      />
    </div>
  );
};

export default MetadataTextInput;
