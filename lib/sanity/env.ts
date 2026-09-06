export type Environment = Readonly<Record<string, string | undefined>>;

function required(env: Environment, name: string) {
  const value = env[name]?.trim();
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export function validatePublicEnvironment(env: Environment) {
  const projectId = required(env, "NEXT_PUBLIC_SANITY_PROJECT_ID");
  const dataset = required(env, "NEXT_PUBLIC_SANITY_DATASET");
  const studioUrl = required(env, "NEXT_PUBLIC_SANITY_STUDIO_URL");
  if (!/^[a-z0-9]+$/.test(projectId))
    throw new Error("Invalid NEXT_PUBLIC_SANITY_PROJECT_ID");
  if (!/^[a-z0-9][a-z0-9_-]*$/.test(dataset))
    throw new Error("Invalid NEXT_PUBLIC_SANITY_DATASET");
  let url: URL;
  try {
    url = new URL(studioUrl);
  } catch {
    throw new Error("Invalid NEXT_PUBLIC_SANITY_STUDIO_URL");
  }
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if (
    (url.protocol !== "https:" && !(local && url.protocol === "http:")) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "NEXT_PUBLIC_SANITY_STUDIO_URL must be HTTPS (HTTP allowed on localhost), without credentials, query or fragment",
    );
  }
  return { projectId, dataset, studioUrl: url.href.replace(/\/$/, "") };
}

// Explicit accesses are required for Next.js to inline public variables.
// Validation is lazy: the local adapter does not require CMS credentials.
export function getPublicEnvironment() {
  return validatePublicEnvironment({
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_STUDIO_URL: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  });
}
