# Isotope Project Guidelines

## Build & Development Commands
- `npm run dev` - Start development server with Turbo
- `npm run build` - Build production version
- `npm run preview` - Preview production build locally
- `npm run check` - Run linting and type checking
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format:check` - Check formatting with Prettier
- `npm run format:write` - Fix formatting with Prettier
- `npm run typecheck` - Run TypeScript type checking
- `npm run db:generate` - Generate Prisma migrations
- `npm run db:push` - Push schema to database without migrations

## Code Style Guidelines
- **TypeScript**: Use strict typing with proper interfaces/types
- **Imports**: Use type imports with inline-type-imports style
- **Components**: Client components use "use client" directive
- **Error Handling**: Use try/catch with specific error messages
- **Forms**: Use react-hook-form with zod validation
- **Styling**: Use Tailwind CSS with class-variance-authority
- **Architecture**: Follow T3 Stack conventions (Next.js, tRPC, NextAuth, Prisma)
- **Naming**: PascalCase for components/types, camelCase for variables/functions
- **State Management**: Use React hooks for local state, tRPC for server state