'use client';

import OneMetadataItem from '@/components/Project/create/OneMetadataItem';
import TitleWithInput from '@/components/Project/create/TitleWithInput';
import axios from 'axios';
import { useState } from 'react';
const NAME_TITLE = 'title';
const NAME_DESCRIPTION = 'description';
const NAME_IMGURL = 'img-url';

type NftMetaData = Map<string, string>;
type TextInputs = {
  id: number;
  title: string;
  value: string;
};
const ProjectCreatePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const [seat, setSeat] = useState('');
  const [price, setPrice] = useState('');
  const [minimumAttendance, setMinimumAttendance] = useState('');

  const [metadataList, setMetadataList] = useState<NftMetaData[]>([
    new Map([
      ['seat', '1A'],
      ['price', '100'],
      ['minimum_attendance', '2'],
      ['ticket_is_used', 'false'],
    ]),
  ]);

  const [nextId, setNextId] = useState(1);
  const handleAddInput = () => {
    if (!seat) return;
    if (!price) return;
    if (!minimumAttendance) return;

    setMetadataList((prList) => {
      const newData: NftMetaData = new Map([
        ['좌석', seat],
        ['가격', price],
        ['출석 일수', minimumAttendance],
        ['티켓 유무', '미사용'],
      ]);
      return [...prList, newData];
    });
  };

  type PostData = {
    title: string;
    content: string;
  };

  const addNewProject = async (event: React.FormEvent) => {
    event.preventDefault();

    const postData = { title: 'dsa', content: 'dddd' };
    try {
      const response = await axios.post('/api/create-json', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    if (!title) return;
    if (!description) return;
    if (!imgUrl) return;
    if (!time) return;
    if (!location) return;
    if (!date) return;

    console.log(title);
    console.log(description);
    console.log(imgUrl);
    console.log(time);
    console.log(location);
    console.log(date);

    metadataList.map((v, i) => {
      v.forEach((v) => console.log(v));
    });
  };

  return (
    <div className="flex justify-center">
      <div className="inner">
        <div className="bg-white flex flex-col items-stretch mx-10 my-8">
          <div className="text-[20px] self-start font-bold">프로젝트 정보</div>
          <div className="ml-8">
            <TitleWithInput
              title="* 프로젝트명 : "
              placeholder="프로젝트명 입력"
              onInputChange={setTitle}
            />
            <TitleWithInput
              title="* 콘서트 설명 : "
              placeholder="Description 입력"
              onInputChange={setDescription}
            />
            <TitleWithInput
              title="* 공통 imgUrl : "
              placeholder="Image Url 입력"
              onInputChange={setImgUrl}
            />
            <TitleWithInput
              title="* 장소 : "
              placeholder="장소 입력"
              onInputChange={setLocation}
            />
            <TitleWithInput
              title="* 시간 : "
              placeholder="시간 입력(00:00 ~24:00 , 00시부터 24시까지)"
              onInputChange={setTime}
            />
            <TitleWithInput
              title="* 일시 : "
              placeholder="일시 입력(2000-01-01, 2000년01월01일)"
              onInputChange={setDate}
            />
          </div>
          <div className="text-[20px] self-start font-bold mt-8 mb-4">
            NFT 개별 정보
          </div>
          <TitleWithInput
            title="* 가격 : "
            placeholder="가격 입력(원 단위)"
            onInputChange={setPrice}
          />
          <TitleWithInput
            title="* 좌석 : "
            placeholder="좌석 입력(예시) (A열 1번 ->A-1) ,좌석 없음 등등)"
            onInputChange={setSeat}
          />
          <TitleWithInput
            title="* 출석 일수 : "
            placeholder="출석 최소 일수 입력"
            onInputChange={setMinimumAttendance}
          />
          <button
            className="mx-4 border-[1px] border-gray-500 text-gray-500 text-[15px] rounded-2xl grow hover:bg-gray-100"
            type="button"
            onClick={handleAddInput}
          >
            개별정보 추가 +
          </button>
          <div className="text-[12px] mt-8 mb-4">
            개수 : {metadataList.length}개
          </div>
          <div className="flex flex-wrap">
            {metadataList
              .concat()
              .reverse()
              .map((v, i) => (
                <OneMetadataItem
                  key={i}
                  removeFunc={() => {
                    setMetadataList((prevList) => {
                      let temp: NftMetaData[] = [];
                      for (let index = 0; index < prevList.length; index++) {
                        const element = prevList[index];
                        if (prevList.length - index - 1 !== i) {
                          temp.push(element);
                        }
                      }
                      return temp;
                    });
                  }}
                  value={v}
                />
              ))}
          </div>
          <div
            className="flex justify-center items-center my-4 border-[1px] border-black w-full h-8 rounded-full hover:cursor-pointer hover:bg-red-300"
            onClick={addNewProject}
          >
            제출
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreatePage;
