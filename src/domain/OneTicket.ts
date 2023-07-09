import { getVFromAttr } from "./OneProject";

export class OneTicket {
  contract: string;
  id: number;
  imgUrl: string;
  isSell: boolean;
  seat: string;
  price: number;
  minimum_attendance: number;
  ticket_is_used: boolean;

  constructor(
    contract: string,
    id: number,
    imgUrl: string,
    isSell: boolean,
    seat: string,
    price: number,
    minimum_attendance: number,
    ticket_is_used: boolean
  ) {
    this.contract = contract;
    this.id = id;
    this.imgUrl = imgUrl;
    this.isSell = isSell;
    this.seat = seat;
    this.price = price;
    this.minimum_attendance = minimum_attendance;
    this.ticket_is_used = ticket_is_used;
  }

  static fromWebData(
    webData: any,
    tAddr: string,
    id: number,
    isSell: boolean,
    isUsed: boolean
  ): OneTicket {
    return {
      contract: tAddr,
      id: id,
      imgUrl:
        webData.image ??
        "https://cdn-icons-png.flaticon.com/512/7693/7693271.png",
      isSell: isSell ?? true,
      seat: getVFromAttr("Seat", webData.attributes ?? []) ?? "no seat",
      price: Number(getVFromAttr("Price", webData.attributes ?? [])) ?? -1,
      minimum_attendance:
        Number(getVFromAttr("minimum_attendance", webData.attributes ?? [])) ??
        -1,
      ticket_is_used: isUsed,
    };
  }
}
