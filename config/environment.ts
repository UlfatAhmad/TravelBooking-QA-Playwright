import "dotenv/config";

const configuredBaseURL = process.env.BASE_URL?.trim();

if (configuredBaseURL) {
  try {
    new URL(configuredBaseURL);
  } catch {
    throw new Error(
      `Invalid BASE_URL "${configuredBaseURL}". Set BASE_URL to an absolute URL, such as http://127.0.0.1:3000.`
    );
  }
}

export const baseURL = configuredBaseURL || undefined;
