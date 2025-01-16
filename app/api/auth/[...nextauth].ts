import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Implement logic to check if the user is the MP
      return user.email === "mp@example.com"; // Replace with the MP's GitHub email
    },
  },
}); 