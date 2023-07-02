import { thumbText } from "@/utils/custom_text";
import { FC } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
interface MetadataProps {
  removeFunc: () => void;
  value: Map<string, string>;
}
const OneMetadataItem: FC<MetadataProps> = ({ removeFunc, value }) => {
  return (
    <div className="relative mx-2 my-1 border-sky-100 w-fit border-[1px] p-4 rounded-xl">
      <AiOutlineMinusCircle
        className="absolute top-[-5px] right-[-5px] bg-white hover:cursor-pointer"
        onClick={() => {
          removeFunc();
        }}
        color="red"
        size={15}
      />
      {Array.from(value.entries()).map(([key, value]) => {
        return <div key={key}>{`${key} : ${thumbText(value)}`}</div>;
      })}
    </div>
  );
};

export default OneMetadataItem;
