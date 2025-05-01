import NextAuth from 'next-auth';
import credentialProvider from 'next-auth/providers/credentials';

export const { handlers, auth, signOut, signIn } = NextAuth({
  providers: [
    credentialProvider({
      name: "credentials",
      
      credentials: {
        email: {
          label: "email",
          type: 'email',
        },
        password: {
          label: "password",
          type: "password",
        },
      },

      authorize: async (credentials) => {
        let user = null;

        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // check if the user exist or not using prisma
        // const user = await prisma.user.findUnique({
        //   where: {
        //     email: credentials.email
        //   }
        // })

        if (!user) return null;

       

        return user;
      }
    })
  ]
});