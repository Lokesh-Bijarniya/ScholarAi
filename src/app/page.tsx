import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      Hi i am running
      <UserButton/>
    </div>
  );
}
