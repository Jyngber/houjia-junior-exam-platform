import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          response = NextResponse.next({ request: { headers: request.headers } });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  if (path.startsWith("/teacher") || path.startsWith("/student")) {
    if (!user) return NextResponse.redirect(new URL("/auth", request.url));

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const isTeacherArea = path.startsWith("/teacher");
    const isTeacher = profile?.role === "teacher" || profile?.role === "admin";

    if (isTeacherArea && !isTeacher) return NextResponse.redirect(new URL("/student", request.url));
    if (!isTeacherArea && isTeacher) return NextResponse.redirect(new URL("/teacher", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/teacher/:path*", "/student/:path*"],
};