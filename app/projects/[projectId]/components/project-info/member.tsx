import { UserDtoType } from "@/app/projects/types/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MemberProps {
  member: UserDtoType;
}

const Member = ({ member }: MemberProps) => {
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={member.image || ""} alt={member.name} />
      <AvatarFallback>{member.name[0]}{member.name.split(" ")[1][0]}</AvatarFallback>
    </Avatar>
  );
};

export default Member;
