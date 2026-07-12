import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schema } from "./sanity/schemaTypes";
import { apiVersion, dataset, projectId } from "./src/lib/sanity/env";

export default defineConfig({
  name: "shubhkamna-events",
  title: "Shubhkamna Events",
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
