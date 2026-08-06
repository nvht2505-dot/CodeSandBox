export type Provider =
  | "vercel"
  | "cloudflare"
  | "netlify"
  | "github-pages";

export async function deploy(provider: Provider) {
  return {
    success: true,
    provider,
    status: "queued"
  };
}
