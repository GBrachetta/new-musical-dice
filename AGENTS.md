<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Working preferences

- Before editing files, briefly explain the changes you plan to make and why. Keep the scope small and communicate material changes in direction before proceeding.
- Keep work agile and economical: use focused reads and checks, avoid unnecessary tool calls or repeated verification, and do not delegate to additional agents unless requested.
- Check available account usage limits before substantial work and before expanding into a lengthy task. Warn the user when remaining limits are low or the planned work may consume a significant share. Exact consumption cannot be predicted or guaranteed; say when usage information is unavailable. Never purchase credits or change plans without explicit authorization.
- Let the user inspect the running app visually and report feedback. Do not create standalone HTML previews, visual inspection harnesses, or automated screenshot/browser inspection workflows unless explicitly requested. Normal app builds, linting, and type checks are fine.
