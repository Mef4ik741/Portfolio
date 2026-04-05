export async function getReadmeText(url: string): Promise<string> {
  const res = await fetch(`/api/readme?url=${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error("Failed to fetch readme");
  return await res.text();
}
