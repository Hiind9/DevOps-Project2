// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
  },
  usePathname() {
    return ''
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock next-auth
jest.mock('next-auth', () => ({
  auth: () => Promise.resolve({ user: null }),
  signIn: () => Promise.resolve({ ok: true }),
  signOut: () => Promise.resolve({ ok: true }),
  getServerSession: () => Promise.resolve({ user: null }),
  getSession: () => Promise.resolve({ user: null }),
}))

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  useSession: () => ({ data: { user: null }, status: 'unauthenticated' }),
  signIn: () => Promise.resolve({ ok: true }),
  signOut: () => Promise.resolve({ ok: true }),
})) 