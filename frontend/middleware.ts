import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";

interface DecodedToken {
  exp: number;
  id: string;
  email: string;
}

interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
  };
}

export function middleware(request: AuthenticatedRequest) {
  let token = request.cookies.get("access")?.value;
  let isLoggedIn = false;

  if (token) {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const { exp, id, email } = decodedToken;
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime < exp) {
        isLoggedIn = true;
        request.user = {
          id,
          email,
        };
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  if (isLoggedIn && request.nextUrl.pathname.includes("/login")) {
    return NextResponse.rewrite(new URL("/dashboard", request.url));
  }
  if (!isLoggedIn && request.nextUrl.pathname.includes("/dashboard")) {
    return NextResponse.rewrite(new URL("/login", request.url));
  }
}
