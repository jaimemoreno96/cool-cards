import Image from "next/image";
import logo from "@/app/assets/img/cool-cards-logo.png";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="w-full h-screen flex items-center justify-center bg-neutral-magnolia">
      <div className="max-w-md min-w-96 mobile:w-full flex flex-col p-4 rounded-md bg-white">
        <Image
          src={logo}
          className="m-auto"
          width={200}
          height={200}
          alt="logo"
        />
        {children}
      </div>
    </main>
  );
};
export default AuthLayout;
