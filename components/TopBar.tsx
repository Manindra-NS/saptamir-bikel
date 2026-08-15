import Clock from "./Clock";
import ListenerCount from "./ListenerCount";
import SocialLinks from "./SocialLinks";

export default function TopBar() {
  return (
    <>
      <div className="safe-t safe-l fixed z-10">
        <Clock />
      </div>
      <div className="safe-t fixed left-1/2 z-10 -translate-x-1/2">
        <ListenerCount />
      </div>
      <div className="safe-t safe-r fixed z-10">
        <SocialLinks />
      </div>
    </>
  );
}
