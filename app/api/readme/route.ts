import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }

    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid url" }, { status: 400 });
    }

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return NextResponse.json({ error: "Invalid protocol" }, { status: 400 });
    }

    const res = await fetch(parsed.toString(), {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch readme" },
        { status: 502 }
      );
    }

    const text = await res.text();
    const limited = text.length > 200_000 ? text.slice(0, 200_000) : text;

    return new NextResponse(limited, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
      },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "Unexpected error",
        details:
          error && typeof error === "object" && "message" in error
            ? String((error as { message?: unknown }).message)
            : String(error),
      },
      { status: 500 }
    );
  }
}
