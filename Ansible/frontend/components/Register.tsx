"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import RegisterForm from "./RegisterForm";

const page = () => {

  const handleOauthClick = (authProvider: string) => {
    console.log("clicked on:", authProvider);
  };

  return (
    <div className="space-y-5 bg-white p-10 rounded-lg  drop-shadow-lg mt-12">
      <h1 className="text-6xl font-semibold drop-shadow-lg text-center">
        Sign up
      </h1>

      <RegisterForm />

      <div className="flex items-center gap-3">
        <Separator className="w-[190px]" />
        <p className="text-black/70">or</p>
        <Separator className="w-[190px]" />
      </div>


      <p className="text-center">
        Already have an account,&nbsp;
        <Link
          className="text-blue-500 hover:underline underline-offset-4 cursor-pointer"
          href={"/login"}
        >
          Login.
        </Link>
      </p>
    </div>
  );
};

export default page;
