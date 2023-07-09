import { OneTicket } from "@/domain/OneTicket";
interface OneTicketThumbProps {
  value: OneTicket;
}
function OneTicketThumb({ value }: OneTicketThumbProps) {
  return (
    <div className="relative mx-2 my-1 border-sky-100 w-fit border-[1px] p-4 rounded-xl">
      <div> id : {value.id}</div>
      <div> 가격 : {value.price}</div>
      <div> 좌석 : {value.seat}</div>
      <div> 최소출석일수 : {value.minimum_attendance}</div>
      <div> 티켓 발급 상태 : {value.ticket_is_used ? "발급" : "미발급"}</div>
    </div>
  );
}

export default OneTicketThumb;
