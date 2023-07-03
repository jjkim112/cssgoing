'use client';
import MetadataTextInput from './MetadataTextInput';
import { FC, useState } from 'react';

type TextInputs = {
  id: number;
  title: string;
  value: string;
};

interface MetadataInputProps {
  addNftFunc: (metadata: Map<string, string>) => void;
}

const MetadataInput: FC<MetadataInputProps> = ({ addNftFunc }) => {
  const [textInputs, setTextInputs] = useState<TextInputs[]>([]);
  const [nextId, setNextId] = useState(1);
  const [titleTemp, setTitleTemp] = useState('');

  const initWholeVariable = () => {
    setTitleTemp('');
  };

  const handleAddInput = () => {
    if (titleTemp !== '') {
      setTextInputs([
        ...textInputs,
        { id: nextId, title: titleTemp, value: '' },
      ]);
      setNextId(nextId + 1);
      setTitleTemp('');
    }
  };

  const handleMinusInput = (id: number) => {
    setTextInputs((prevInputs) => {
      let temp: TextInputs[] = [];
      for (let index = 0; index < prevInputs.length; index++) {
        const element = prevInputs[index];
        if (element.id !== id) {
          temp.push(element);
        }
      }
      return temp;
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const updatedTextInputs = textInputs.map((textInput) =>
      textInput.id === id
        ? { ...textInput, value: event.target.value }
        : textInput
    );
    setTextInputs(updatedTextInputs);
  };

  const onChangeTempTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleTemp(event.target.value);
  };

  const addOneNft = () => {
    console.log('제출된 텍스트:', textInputs);
    let tempMap: Map<string, string> = new Map();
    for (let index = 0; index < textInputs.length; index++) {
      const element = textInputs[index];
      tempMap.set(element.title, element.value);
    }
    addNftFunc(tempMap);
    initWholeVariable();
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 items-center">
        {textInputs.map((textInput, i) => (
          <MetadataTextInput
            id={textInput.id}
            title={textInput.title}
            value={textInput.value}
            onChange={handleInputChange}
            onMinus={handleMinusInput}
          />
        ))}
        <div className="flex my-2 items-center">
          <input
            className="w-20 h-8 border-[1px] border-gray-500 rounded-lg px-1 text-black hover:border-red-500"
            id="title-input"
            type="text"
            value={titleTemp}
            onChange={onChangeTempTitle}
          />
          <button
            className="mx-4 border-[1px] border-gray-500 text-gray-500 text-[15px] rounded-2xl grow hover:bg-gray-100"
            type="button"
            onClick={handleAddInput}
          >
            개별정보 추가 +
          </button>
        </div>
      </div>

      <button
        className="self-end border-[1px] border-red-300 rounded-2xl px-4 py-1 hover:bg-gray-100"
        type="button"
        onClick={addOneNft}
      >
        NFT 추가
      </button>
    </div>
  );
};

interface OneInputFormProps {
  title: string;
  setFunc: (a: string) => void;
}
const OneInputForm: FC<OneInputFormProps> = ({ title, setFunc }) => {
  return <div></div>;
};

export default MetadataInput;
