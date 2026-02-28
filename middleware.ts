import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// In-memory store for rate limiting
// In production, you should use Redis or similar
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = 50; // requests
const WINDOW_MS = 60 * 1000; // 1 minute in milliseconds

function getClientIp(request: NextRequest): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }
  
  // Fallback to a default (for development)
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record) {
    // First request from this IP
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return false;
  }
  
  if (now > record.resetTime) {
    // Window has passed, reset
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return false;
  }
  
  if (record.count >= RATE_LIMIT) {
    // Rate limit exceeded
    return true;
  }
  
  // Increment count
  record.count++;
  return false;
}

export function middleware(request: NextRequest) {
  // Skip rate limiting for static files
  const pathname = request.nextUrl.pathname;
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/fonts/") ||
    pathname.startsWith("/pngs/") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".woff") ||
    pathname.endsWith(".woff2")
  ) {
    return NextResponse.next();
  }
  
  const ip = getClientIp(request);
  
  if (isRateLimited(ip)) {
    const html = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Слишком много запросов</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: "Futura Medium", Futura, "Trebuchet MS", Arial, sans-serif;
      background: #D9D9D9;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      max-width: 480px;
      width: 100%;
      text-align: center;
    }
    .box {
      border: 4px solid #000;
      background: #fff;
      padding: 48px 32px;
    }
    h1 {
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      margin-bottom: 24px;
    }
    p {
      font-size: 13px;
      line-height: 1.7;
      color: #333;
      letter-spacing: 0.08em;
    }
    .timer {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 2px solid #000;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.15em;
      color: #666;
    }
    a {
      display: inline-block;
      margin-top: 24px;
      color: #000;
      text-decoration: none;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.2em;
      border-bottom: 2px solid #000;
      padding-bottom: 2px;
    }
    a:hover {
      opacity: 0.7;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="box">
      <h1>Много запросов</h1>
      <p>Вы отправили слишком много запросов.<br>Пожалуйста, попробуйте позже.</p>
      <div class="timer">Подождите 60 секунд</div>
      <a href="/">Вернуться на главную</a>
    </div>
  </div>
</body>
</html>`;
    
    return new NextResponse(html, {
      status: 429,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Retry-After": "60",
      },
    });
  }
  
  // Add rate limit headers to response
  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Limit", String(RATE_LIMIT));
  
  return response;
}

// Apply middleware to all routes
export const config = {
  matcher: "/:path*",
};
