// Node module hook for tools/exam_selftest.mjs: resolves the "@/..." alias to src/ (trying .js .ts .mjs .json and /index.*), so the real
// server modules (examServer, learningGrade, p3PaperBridge) can be imported without Next. Test-only; not used by the app.
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";
const SRC = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src");
export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    const base = path.join(SRC, specifier.slice(2));
    for (const c of [base, base + ".js", base + ".ts", base + ".mjs", base + ".json", path.join(base, "index.ts"), path.join(base, "index.js")]) {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) return next(pathToFileURL(c).href, context);
    }
  }
  if (specifier.startsWith(".") && context.parentURL && !path.extname(specifier)) {
    const base = path.join(path.dirname(fileURLToPath(context.parentURL)), specifier);
    for (const c of [base + ".ts", base + ".js", path.join(base, "index.ts")]) if (fs.existsSync(c)) return next(pathToFileURL(c).href, context);
  }
  return next(specifier, context);
}
import { createRequire } from "node:module";
const ts = createRequire(import.meta.url)("typescript");
export async function load(url, context, next) {
  // .ts files are transpiled with the repo's own TypeScript (type-only imports are elided), as Next does.
  if (url.endsWith(".ts") && url.startsWith("file:")) {
    const src = fs.readFileSync(fileURLToPath(url), "utf8");
    const out = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }, fileName: fileURLToPath(url) });
    return { format: "module", source: out.outputText, shortCircuit: true };
  }
  if (url.endsWith(".json")) return next(url, { ...context, importAttributes: { type: "json" } });
  return next(url, context);
}
