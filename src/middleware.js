import { NextResponse } from "next/server";

export async function middleware(request) {
  const authToken = request.cookies.get("authToken")?.value;

  // Skip processing if the request is for login or users API
  if (
    request.nextUrl.pathname === "/api/login" ||
    request.nextUrl.pathname === "/api/users"
  ) {
    return NextResponse.next(); // Allow the request to proceed
  }

  const isLoginOrSignup =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  // If the user is logged in and trying to access login/signup, redirect to home
  if (isLoginOrSignup) {
    if (authToken) {
      return NextResponse.redirect(new URL("/profile/user", request.url)); // Redirect to home
    } else {
      return NextResponse.next(); // Allow access to login/signup
    }
  }

  if(request.nextUrl.pathname==="/api/login"){
    return
  }

  // For all other routes, check if user is authenticated
  if (!authToken) {
    // API requests get JSON response on failure
    // if (request.nextUrl.pathname.startsWith("/api")) {
    //   return NextResponse.json({
    //     message: "Access Denied",
    //     success: false,
    //   });
    // }

    // Redirect to login if no authToken for non-API routes
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If authenticated, allow the request to proceed
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
