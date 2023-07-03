'use client';
import MetadataInput from '@/components/Project/create/MetadataInput';
import OneMetadataItem from '@/components/Project/create/OneMetadataItem';
import TitleWithInput from '@/components/Project/create/TitleWithInput';
import { useState } from 'react';

const NAME_TITLE = 'title';
const NAME_DESCRIPTION = 'description';
const NAME_IMGURL = 'img-url';

type NftMetaData = Map<string, string>;

const ProjectCreatePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const [출석카운트, set출석카운트] = useState('');
  const [metadataList, setMetadataList] = useState<NftMetaData[]>([
    new Map([
      ['seat', '1A'],
      ['price', '100'],
      ['min-count', '2'],
      ['sale-rate', '15'],
    ]),
  ]);

  const addNewProject = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(title);
    console.log(description);
    console.log(imgUrl);
    console.log(출석카운트);
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
              title="* Description : "
              placeholder="Description 입력"
              onInputChange={setDescription}
            />
            <TitleWithInput
              title="* 공통 imgUrl : "
              placeholder="Image Url 입력"
              onInputChange={setImgUrl}
            />

            <TitleWithInput
              title="* 출석 일수 "
              placeholder="출석 일수 입력"
              onInputChange={set출석카운트}
            />
          </div>

          <div className="text-[20px] self-start font-bold mt-8 mb-4">
            NFT 개별 정보
          </div>
          <MetadataInput
            addNftFunc={(metadata: Map<string, string>) => {
              setMetadataList((prevList) => {
                let temp: NftMetaData[] = [...prevList];
                temp.push(metadata);
                return temp;
              });
            }}
          />
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
