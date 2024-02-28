import Image from "next/image";
import logo from "../../../public/logo.png";

export default async function AuthButton() {
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-12 ">
      <Image
        src={logo}
        width={125.2}
        height={91.6}
        alt="Picture of the author"
      />
      <p className="text-9xl font-semibold">Spark royalty</p>
    </div>
  );
}
