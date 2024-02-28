import Image from "next/image";

export default async function AuthButton() {
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-12 ">
      <Image
        src="/logo.png"
        width={125.2}
        height={91.6}
        alt="Picture of the author"
      />
      <Image
        src="/hello.webp"
        width={500}
        height={500}
        alt="Picture of the author"
      />
      <p className="text-9xl font-semibold">Spark royalty</p>
    </div>
  );
}
