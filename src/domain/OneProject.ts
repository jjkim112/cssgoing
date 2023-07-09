import axios from "axios";
import { OneTicket } from "./OneTicket";

export const getVFromAttr: (keyValue: string, attributes: any[]) => any = (
  keyValue,
  attributes
) => {
  return (
    attributes.find((v: any) => {
      return v.trait_type === keyValue;
    })?.value ?? null
  );
};

export class OneProject {
  contract: string;
  title: string;
  description: string;
  imgUrl: string;
  date: string;
  location: string;
  runningTime: string;
  tickets: OneTicket[];

  constructor(
    contract: string,
    title: string,
    description: string,
    imgUrl: string,
    date: string,
    location: string,
    runningTime: string,
    tickets: OneTicket[]
  ) {
    this.contract = contract;
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;
    this.date = date;
    this.location = location;
    this.runningTime = runningTime;
    this.tickets = tickets;
  }

  static fromWebData(webData: any, ticketContractAddress: string): OneProject {
    return {
      contract: ticketContractAddress,
      title: webData.name ?? "",
      description: webData.description ?? "",
      imgUrl:
        webData.image ??
        "https://cdn-icons-png.flaticon.com/512/7693/7693271.png",
      date: getVFromAttr("Date", webData.attributes ?? []) ?? "no data",
      location: getVFromAttr("Location", webData.attributes ?? []) ?? "no data",
      runningTime:
        getVFromAttr("RunningTime", webData.attributes ?? []) ?? "no data",
      tickets: [],
    };
  }
}

// convert 관련 함수는 여기 넣고

// axios 관련 함수는 context에 넣고
