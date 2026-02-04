import MemberListItem from "@/components/member-list/member-list-item";
import { UserDtoType } from "@/app/projects/types/users";

interface MemberListProps {
  members: UserDtoType[];
  isMemberSelected: (member: UserDtoType) => boolean;
  handleMemberSelect: (member: UserDtoType) => void;
}
const MemberList = ({
  members,
  isMemberSelected,
  handleMemberSelect,
}: MemberListProps) => {
  return (
    <div className="absolute z-10 w-full mt-2 bg-white border rounded-md shadow-lg">
      {members.map((member: UserDtoType) => (
        <MemberListItem
          key={member.id}
          member={member}
          isMemberSelected={isMemberSelected}
          handleMemberSelect={handleMemberSelect}
        />
      ))}
    </div>
  );
};

export default MemberList;
