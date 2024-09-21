import { NextResponse } from "next/server";

export async function middleware(request) {
  const authToken = request.cookies.get("authToken")?.value;
  if (
    request.nextUrl.pathname === "/api/login" ||
    request.nextUrl.pathname === "/api/users"
  ) {
    return;
  }

  const notAccessPathUserLogin =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  if (notAccessPathUserLogin) {
    if (authToken) {
      return NextResponse.redirect(new URL("/profile/user", request.url));
    }
  } else {
    if (!authToken) {
      if(request.nextUrl.pathname.startsWith("/api")){
        return NextResponse.json({
          message:"Access Denied",
          success:false
        })
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/add-task",
    "/show-task",
    "/profile/:path*",
    "/app/:path*",
  ],
};
