import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className=" p-16 flex w-full flex-grow items-center justify-center">
      <SignIn />
    </div>
  );
}
