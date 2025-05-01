import Register from "@/components/Register";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Register'
}

const page = () => {
  return (
    <Register />
  )
}

export default page;