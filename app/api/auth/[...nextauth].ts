import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("Missing GitHub OAuth environment variables");
}

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId,
      clientSecret,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Implement logic to check if the user is the MP
      return user.email === "mp@example.com"; // Replace with the MP's GitHub email
    },
  },
}); 