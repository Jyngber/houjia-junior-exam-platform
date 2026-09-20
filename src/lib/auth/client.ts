import { createClient } from "@/lib/supabase/client";

export async function signIn(email: string, password: string) {
  return createClient().auth.signInWithPassword({ email, password });
}

export async function signUp(email: string, password: string, displayName: string, role: "teacher" | "student") {
  return createClient().auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName, role } },
  });
}

export async function signOut() {
  return createClient().auth.signOut();
}

export async function getCurrentUser() {
  const { data, error } = await createClient().auth.getUser();
  if (error) return null;
  return data.user;
}

export async function getCurrentProfile() {
  const user = await getCurrentUser();
  if (!user) return null;
  const { data } = await createClient().from("profiles").select("*").eq("id", user.id).single();
  return data;
}