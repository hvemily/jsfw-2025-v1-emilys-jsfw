# TypeScript + React + Vite Project – Course Assignment Documentation

This project is part of a course assignment and includes all required elements such as:

- A TypeScript setup with strict type checking
- Project references using `tsconfig.json`, `tsconfig.app.json`, and `tsconfig.node.json`
- Vite as the development server and bundler
- React for building the user interface
- Vitest for testing
- A `vite.config.ts` file as part of the build and development setup

---

## Assignment Requirements Checklist

| Feature                       | Included | Details                                                         |
| ----------------------------- | -------- | --------------------------------------------------------------- |
| TypeScript project references | ✅       | `composite: true` and `noEmit: false` in all `tsconfig` files   |
| React with JSX support        | ✅       | Configured with `jsx: react-jsx`                                |
| Vite integration              | ✅       | Uses `vite.config.ts` and Vite scripts                          |
| Vitest configured             | ✅       | Includes `types: ["vitest"]` and example setup                  |
| Proper folder structure       | ✅       | Separated app and node config with clean build output           |
| Source files in `src/`        | ✅       | Defined via `include: ["src"]`                                  |
| Strict linting and typing     | ✅       | `strict`, `noUnusedLocals`, `noUncheckedSideEffectImports` etc. |

---

## Technologies Used

- **TypeScript** – typed JavaScript for scalable apps
- **React** – component-based frontend framework
- **Vite** – lightning-fast dev server and build tool
- **Vitest** – lightweight test runner for Vite projects

---

## Project Structure (tsconfig)

```txt
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

> Main entry file for TypeScript with project references enabled.

---

## tsconfig.app.json

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

## Getting Started

```bash
npm install      # Install dependencies
npm run dev      # Start Vite dev server
npm run build    # Build the project
npm run test     # Run tests with Vitest
```

---

## Testing with Vitest

```bash
npm install --save-dev vitest @vitest/ui
npx vitest        # Run tests
npx vitest --ui   # Interactive test UI
```

---

## Notes

- Referenced tsconfigs must include `composite: true` and cannot use `noEmit: true`
- `outDir` is necessary when using composite projects
- Use `tsc --build` if you're working with multiple tsconfigs to compile all references

---
