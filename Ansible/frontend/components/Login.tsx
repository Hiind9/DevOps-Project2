"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

const page = () => {
  const handleOauthClick = (authProvider: string) => {
    console.log("clicked on:", authProvider);
  };

  return (
    <div className="space-y-5 bg-white p-10 rounded-lg  drop-shadow-lg mb-3">
      <h1 className="text-6xl font-semibold drop-shadow-lg text-center">
        Login
      </h1>

      {/* credentials options */}
      <LoginForm />


      {/* divider */}
      <div className="flex items-center gap-3">
        <Separator className="w-[190px]" />
        <p className="text-black/70">or</p>
        <Separator className="w-[190px]" />
      </div>



      {/* register route */}
      <p className="text-center">
        Don't have an account,{" "}
        <Link
          className="text-blue-500 hover:underline underline-offset-4 cursor-pointer"
          href={"/register"}
        >
          Register.
        </Link>
      </p>
    </div>
  );
};

export default page;
