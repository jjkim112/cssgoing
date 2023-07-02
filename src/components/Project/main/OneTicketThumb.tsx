import { TicketType } from "./OneProjectPart";

interface OneTicketThumbProps {
  value: TicketType;
}
function OneTicketThumb({ value }: OneTicketThumbProps) {
  return (
    <div className="relative mx-2 my-1 border-sky-100 w-fit border-[1px] p-4 rounded-xl">
      <div> id : {value.id}</div>
      <div> price : {value.price}</div>
      <div> seat : {value.seat}</div>
      <div> minCount : {value.minCount}</div>
      <div> sale-rate : {value.saleRate}</div>
    </div>
  );
}

export default OneTicketThumb;
