import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      role: string;
      image: string;
      email: string;
      isTwoFactorEnabled: boolean;
    };
  }

  interface User {
    id: string;
  }
}
