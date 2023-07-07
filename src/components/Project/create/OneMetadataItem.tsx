import { FC } from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai';
interface MetadataProps {
  removeFunc: () => void;
  value: JsonObject;
}
type AttributeSet = {
  trait_type: string;
  value: string;
};

type JsonObject = {
  imgUrl: string;
  title: string;
  description: string;
  attributes: AttributeSet[];
};
const JsonKey: string[] = ['좌석', '가격', '출석 일수', '시간', '장소', '날짜'];
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
      {value.attributes.map((v, i) => {
        return <div key={i}>{`${v.trait_type} : ${v.value}`}</div>;
      })}
    </div>
  );
};

export default OneMetadataItem;
