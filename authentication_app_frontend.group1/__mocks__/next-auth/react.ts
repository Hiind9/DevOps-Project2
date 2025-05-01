const useSession = () => ({ data: { user: null }, status: 'unauthenticated' })
const signIn = () => Promise.resolve({ ok: true })
const signOut = () => Promise.resolve({ ok: true })

export { useSession, signIn, signOut } 