import { redirect } from "next/navigation";

export function signIn(provider: string) {
  redirect(`/api/auth/${provider}`);
}

export function signOut() {
  redirect("/api/logout");
}

