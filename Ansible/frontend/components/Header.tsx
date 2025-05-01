import Link from "next/link";
import LoginButton from "./auth/LoginButton";
import { Button } from "./ui/button";
import { FaHome } from "react-icons/fa";

const Header = () => {
  return (
    <nav className="absolute w-full px-20 py-2">
      <div className="flex items-center justify-around px-2 py-1 rounded-xl bg-white/15 shadow-md">
        <Link href={'/'} className="text-3xl flex gap-2 p-3 font-semibold text-white drop-shadow-xl rounded-xl">
          <FaHome size={35}/>
          Home.
        </Link>
        <div>
          <LoginButton>
            <Button variant={'secondary'} size={'lg'}>Sign in</Button>
          </LoginButton>
        </div>
      </div>
    </nav>
  )
};

export default Header;
