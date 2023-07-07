'use client';

import OneMetadataItem from '@/components/Project/create/OneMetadataItem';
import TitleWithInput from '@/components/Project/create/TitleWithInput';

import axios from 'axios';
import { useState, useRef } from 'react';
import FormData from 'form-data';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
const pinataJwt = process.env.NEXT_PUBLIC_JWT;

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

const createJson = (
  imgUrl: string,
  title: string,
  description: string,
  date: string,
  location: string,
  seat: string,
  price: string,
  time: string,
  minimum_attendance: string,
  ticket_is_used: string
): JsonObject => ({
  imgUrl,
  title,
  description,
  attributes: [
    {
      trait_type: 'Date',
      value: date,
    },
    {
      trait_type: 'Location',
      value: location,
    },
    {
      trait_type: 'Seat',
      value: seat,
    },
    {
      trait_type: 'Price',
      value: price,
    },
    {
      trait_type: 'RunningTime',
      value: time,
    },
    {
      trait_type: 'ticket_is_used',
      value: ticket_is_used,
    },
    {
      trait_type: 'minimum_attendance',
      value: minimum_attendance,
    },
  ],
});
const ProjectCreatePage = () => {
  const [title, setTitle] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState('');
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [imgUrl, setImgUrl] = useState('');
  const imgUrlRef = useRef<HTMLInputElement>(null);
  const [time, setTime] = useState('');
  const timeRef = useRef<HTMLInputElement>(null);
  const [location, setLocation] = useState('');
  const locationRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState('');
  const dateRef = useRef<HTMLInputElement>(null);

  const [seat, setSeat] = useState('');
  const seatRef = useRef<HTMLInputElement>(null);
  const [price, setPrice] = useState('');
  const priceRef = useRef<HTMLInputElement>(null);
  const [minimumAttendance, setMinimumAttendance] = useState('');
  const minimumAttendanceRef = useRef<HTMLInputElement>(null);

  const [warning, setWarning] = useState<string>('');

  const [notUseJsonArray, setNotUseJsonArray] = useState<JsonObject[]>([]);
  const [useJsonArray, setUseJsonArray] = useState<JsonObject[]>([]);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  // const [count, setCount] = useState<number[]>([]);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleAddInput = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title ||
      !date ||
      !location ||
      !seat ||
      !price ||
      !description ||
      !imgUrl ||
      !time ||
      !minimumAttendance ||
      isNaN(Number(price))
    ) {
      setTimeout(() => {
        if (!title) {
          setWarning('프로젝트 명/제목을 적어 주세요');
          titleRef.current?.focus();
        } else if (!description) {
          setWarning('설명 문구를 적어 주세요');
          descriptionRef.current?.focus();
        } else if (!imgUrl) {
          setWarning('이미지 uri을 적어 주세요');
          imgUrlRef.current?.focus();
        } else if (!location) {
          setWarning('장소을 적어 주세요');
          locationRef.current?.focus();
        } else if (!time) {
          setWarning('시간을 적어 주세요');
          timeRef.current?.focus();
        } else if (!date) {
          setWarning('일정을 적어 주세요');
          dateRef.current?.focus();
        } else if (!price) {
          setWarning('가격을 적어 주세요');
          priceRef.current?.focus();
        } else if (isNaN(Number(price))) {
          priceRef.current?.focus();
          setWarning('가격은 숫자를 입력해주세요');
        } else if (!seat) {
          setWarning('좌석을 적어 주세요');
          seatRef.current?.focus();
        } else if (!minimumAttendance) {
          setWarning('출석 일수를 적어 주세요');
          minimumAttendanceRef.current?.focus();
        }
      }, 0);

      return;
    }

    setWarning('');
    setNotUseJsonArray((prevState) => [
      ...prevState,
      createJson(
        imgUrl,
        title,
        description,
        date,
        location,
        seat,
        price,
        time,
        minimumAttendance,
        'false'
      ),
    ]);
    setUseJsonArray((prevState) => [
      ...prevState,
      createJson(
        imgUrl,
        title,
        description,
        date,
        location,
        seat,
        price,
        time,
        minimumAttendance,
        'true'
      ),
    ]);
  };

  const matadataRemove = (index: number) => {
    setNotUseJsonArray((prevState) => {
      const newArray = [...prevState];
      newArray.splice(index, 1);
      return newArray;
    });
    setUseJsonArray((prevState) => {
      const newArray = [...prevState];
      newArray.splice(index, 1);
      return newArray;
    });
  };

  const addNewProject = async (event: React.FormEvent) => {
    event.preventDefault();

    if (notUseJsonArray.length <= 0) {
      setWarning('NFT정보가 1개 이상은 입력하셔야 합니다.');
      return;
    }

    const jsonToFile = (json: object, filename: string): File => {
      // JSON 객체를 Blob 객체로 변환
      const jsonString = JSON.stringify(json);
      const blob = new Blob([jsonString], { type: 'application/json' });

      // Blob 객체에 파일 이름을 부여하여 File 객체로 변환
      return new File([blob], filename, { type: 'application/json' });
    };
    console.log(notUseJsonArray);
    console.log(useJsonArray);

    const form = new FormData();

    notUseJsonArray.map((v, i) => {
      form.append('file', jsonToFile(v, `${i + 1}.json`), `data/${i + 1}.json`);
    });
    useJsonArray.map((v, i) => {
      form.append(
        'file',
        jsonToFile(v, `${i + 1}_use.json`),
        `data/${i + 1}_use.json`
      );
    });

    form.append('pinataMetadata', JSON.stringify({ name: 'test' }));

    form.append(
      'pinataOptions',
      JSON.stringify({ wrapWithDirectory: false, cidVersion: 0 })
    );

    try {
      const res = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        form,
        {
          maxBodyLength: 'Infinity',
          headers: {
            'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
            Authorization: `Bearer ${pinataJwt}`,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
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
              ref={titleRef}
              onInputChange={setTitle}
            />
            <TitleWithInput
              title="* 콘서트 설명 : "
              placeholder="Description 입력"
              ref={descriptionRef}
              onInputChange={setDescription}
            />
            <TitleWithInput
              title="* 공통 imgUrl : "
              placeholder="Image Url 입력"
              ref={imgUrlRef}
              onInputChange={setImgUrl}
            />
            <TitleWithInput
              title="* 장소 : "
              placeholder="장소 입력"
              ref={locationRef}
              onInputChange={setLocation}
            />
            <TitleWithInput
              title="* 시간 : "
              placeholder="시간 입력(00:00 ~24:00 , 00시부터 24시까지)"
              ref={timeRef}
              onInputChange={setTime}
            />
            <TitleWithInput
              title="* 일시 : "
              placeholder="일시 입력(2000-01-01, 2000년01월01일)"
              ref={dateRef}
              onInputChange={setDate}
            />
          </div>
          <div className="text-[20px] self-start font-bold mt-8 mb-4">
            NFT 개별 정보
          </div>
          <TitleWithInput
            title="* 가격 : "
            placeholder="가격 입력(원 단위)"
            ref={priceRef}
            onInputChange={setPrice}
          />
          <TitleWithInput
            title="* 좌석 : "
            placeholder="좌석 입력(예시) (A열 1번 ->A-1) ,좌석 없음 등등)"
            ref={seatRef}
            onInputChange={setSeat}
          />
          <TitleWithInput
            title="* 출석 일수 : "
            placeholder="출석 최소 일수 입력"
            ref={minimumAttendanceRef}
            onInputChange={setMinimumAttendance}
          />
          <button
            className="mx-4 border-[1px] border-gray-500 text-gray-500 text-[15px] rounded-2xl grow hover:bg-gray-100"
            type="button"
            onClick={handleAddInput}
          >
            개별정보 추가 +
          </button>
          {warning && <p style={{ color: 'red' }}>{warning}</p>}
          <div className="text-[12px] mt-8 mb-4">
            개수 : {notUseJsonArray.length}개
          </div>
          <div className="flex flex-wrap">
            {notUseJsonArray
              .concat()
              .reverse()
              .map((v, i) => (
                <OneMetadataItem
                  key={i}
                  removeFunc={() => {
                    matadataRemove(i);
                  }}
                  value={v}
                />
              ))}
          </div>
          {warning && <p style={{ color: 'red' }}>{warning}</p>}
          <div
            className="flex justify-center items-center my-4 border-[1px] border-black w-full h-8 rounded-full hover:cursor-pointer hover:bg-red-300"
            onClick={handleClickOpen}
          >
            제출
          </div>
          <Dialog open={openDialog} onClose={handleClose}>
            <DialogTitle>NFT 구매</DialogTitle>
            <DialogContent>
              <DialogContentText>
                당신은 {notUseJsonArray.length}개의 퀘스트를 NFT를 생성하게
                됩니다,
              </DialogContentText>

              <DialogContentText>
                <span style={{ color: 'red' }}>내용 및 입력 값을</span> 잘
                확인하고 적어 주시기바랍니다.
                <br />
                <br />
                <br />
                {notUseJsonArray.length <= 0 && (
                  <p style={{ color: 'red' }}>
                    민팅할수 있는 정보가 존재 하지 않습니다.
                  </p>
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>취소</Button>
              <Button onClick={addNewProject}>민팅</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreatePage;
