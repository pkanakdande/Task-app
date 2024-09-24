import { NextResponse } from "next/server";

export async function middleware(request) {
  const authToken = request.cookies.get("authToken")?.value;

  // Skip processing if the request is for these API endpoints
  if (
    request.nextUrl.pathname === "/api/login" ||
    request.nextUrl.pathname === "/api/users"
  ) {
    return NextResponse.next(); // Allow the request to proceed
  }

  const notAccessPathUserLogin =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  // If the user is logged in and trying to access login/signup pages, redirect to profile
  if (notAccessPathUserLogin) {
    if (authToken) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.next(); // Allow access to login/signup
    }
  }

  // For other routes, check if the user is authenticated
  if (!authToken) {
    if (request.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.json({
        message: "Access Denied",
        success: false,
      });
    }

    // Redirect to login if no authToken
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access to other routes if authenticated
  return NextResponse.next();
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
