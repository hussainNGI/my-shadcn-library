# React Shadcn Theme - Ready Project (Vite)

This project is a ready-to-run React (Vite) starter demonstrating:
- Multiple color themes (blue, green, rose, violet, amber, emerald, cyan, gray)
- Light / Dark variants for each theme
- Theme dropdown + dark/light switch with persistence
- Demo dashboard page showing components adapting to themes

IMPORTANT NOTE:
This environment cannot install npm packages or fetch `shadcn/ui` during ZIP creation.
To add the official **shadcn/ui** components locally (recommended), follow these steps after extracting the ZIP:

1. Install dependencies:
   npm install

2. Initialize shadcn UI (this will download and scaffold official components):
   npx shadcn-ui@latest init

   Follow the prompts. Choose your components (Button, Card, DropdownMenu, Switch, etc.)
   After that, you can replace the placeholder components in `src/components/ui/` with the official ones.

3. Start dev server:
   npm run dev

If you want, I can provide the exact replacement code snippets for shadcn components to paste in after running the init command.
