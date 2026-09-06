import "server-only";

function secret(name: "SANITY_API_READ_TOKEN" | "SANITY_REVALIDATE_SECRET") {
  const value = process.env[name];
  if (!value || value.trim() !== value || /\s/.test(value)) {
    throw new Error(`Missing or invalid server environment variable: ${name}`);
  }
  return value;
}

export function getReadToken() {
  return secret("SANITY_API_READ_TOKEN");
}
export function getWebhookSecret() {
  return secret("SANITY_REVALIDATE_SECRET");
}
