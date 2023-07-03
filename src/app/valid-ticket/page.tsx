import '@/app/valid-ticket/valid_ticket.css';
import ProjectThumbCompound from '@/compounds/ProjectThumbCompound';
export default function validTicket() {
  return (
    <div className="valid_con ">
      <div className="flex flex-col inner">
        <div className="valid_title">유효 티켓 페이지</div>
        <ProjectThumbCompound></ProjectThumbCompound>
      </div>
    </div>
  );
}
