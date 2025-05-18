# TypeScript Project Setup – Vite + React + Vitest

This project is configured with:

- **Vite** for fast development and bundling
- **React** for building UI components
- **Vitest** for unit testing
- **TypeScript** with [Project References](https://www.typescriptlang.org/docs/handbook/project-references.html) for a scalable and optimized setup

---

## Project Structure (tsconfig)

```
.
├── tsconfig.json           # Root config that references others
├── tsconfig.app.json       # For React app logic in /src
└── tsconfig.node.json      # For Vite config or Node-related setup
```

---

## tsconfig.json

```json
{
  "compilerOptions": {
    "types": ["vitest"],
    "module": "ESNext",
    "target": "ESNext",
    "jsx": "react-jsx"
  },
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

> This is the **main entry** for the TypeScript compiler.  
> It references the app and node configs for better structure and build performance.

---

## tsconfig.app.json

Used for the `src/` folder and frontend logic:

```json
{
  "compilerOptions": {
    "composite": true,
    "noEmit": false,
    "outDir": "./dist/app"
  },
  "include": ["src"]
}
```

---

## tsconfig.node.json

Used for `vite.config.ts` or other Node-related files:

```json
{
  "compilerOptions": {
    "composite": true,
    "noEmit": false,
    "outDir": "./dist/node"
  },
  "include": ["vite.config.ts"]
}
```

---

## VS Code Tips

- Make sure VS Code is **using the workspace TypeScript version** (click the TS version in the status bar when editing a `.ts` file).
- If you're seeing TypeScript errors in referenced projects, run:

```bash
tsc --build
```

- Restart VS Code if issues persist (it helps recognize `composite` changes).

---

## Build & Dev

Use the following commands (assuming Vite):

```bash
npm run dev       # Start dev server
npm run build     # Build project
npm run test      # Run tests using Vitest
```

---

## Testing with Vitest

Make sure `vitest` and `@vitest/ui` are installed:

```bash
npm install --save-dev vitest @vitest/ui
```

To run tests:

```bash
npx vitest
```

To open the interactive UI:

```bash
npx vitest --ui
```

---

## Notes

- The `composite: true` setting is required for any `tsconfig` that is referenced by another.
- Referenced projects must allow emitting (`noEmit: false`) even if you're not emitting files, to satisfy TypeScript's constraints.

---
