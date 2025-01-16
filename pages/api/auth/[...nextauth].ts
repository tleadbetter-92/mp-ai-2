import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

if (!githubClientId || !githubClientSecret) {
  throw new Error('Missing GitHub client ID or secret in environment variables');
}

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("User signed in:", user);
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
}); 