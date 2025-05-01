'use client';

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode,
  mode?: 'modal' | 'redirect',
  asChild?: boolean
}

const LoginButton:React.FC<LoginButtonProps> = ({children, mode = 'redirect', asChild}) => {
  const router = useRouter();
  
  const handleClick = () => {
    router.push('/login')
  }
  
  if (mode === 'modal') {
    return (
      <span className="bg-black p-2 bred">TODO: Implement modal component!</span>
    )
  }

  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  )
}

export default LoginButton;