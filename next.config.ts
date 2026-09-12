import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  // Prefer this project root when a parent directory also has a lockfile
  outputFileTracingRoot: path.join(process.cwd()),
};

export default nextConfig;
