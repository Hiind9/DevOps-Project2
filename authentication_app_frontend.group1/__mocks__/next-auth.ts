const auth = () => Promise.resolve({ user: null })
const signIn = () => Promise.resolve({ ok: true })
const signOut = () => Promise.resolve({ ok: true })
const getServerSession = () => Promise.resolve({ user: null })
const getSession = () => Promise.resolve({ user: null })

export { auth, signIn, signOut, getServerSession, getSession } 