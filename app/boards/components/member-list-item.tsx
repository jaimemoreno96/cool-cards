import { UserDtoType } from "@/app/projects/types/users";
import { CheckIcon, User } from "lucide-react";
import React, { memo } from "react";

interface MemberListItemProps {
    member: UserDtoType;
    isMemberSelected: (member: UserDtoType) => boolean;
    handleMemberSelect: (member: UserDtoType) => void;
}
const MemberListItem = memo(({ member, isMemberSelected, handleMemberSelect }: MemberListItemProps) => {
  return (
    <div
      className="p-1 cursor-pointer hover:bg-gray-100"
      key={member.id}
      onClick={() => handleMemberSelect(member)}
    >
      {isMemberSelected(member) ? (
        <CheckIcon className="inline-block mr-2 text-green-500" />
      ) : (
        <User className="inline-block mr-2" />
      )}
      <span className="text-xs font-medium">
        {member.name}&nbsp;({member.email})
      </span>
    </div>
  );
});

MemberListItem.displayName = "MemberListItem";


export default MemberListItem;
