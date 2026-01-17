# 🎯 Project Structure - Quick Reference Guide

## Where to Find Things

### Layout Components
**Location**: `src/page/`
- `Header.tsx` - Main header/navigation
- `Footer.tsx` - Footer section
- `Hero.tsx` - Hero section
- `ThemeButton.tsx` - Theme toggle

### Reusable UI Components
**Location**: `src/pkg/ui/`
- `Separator.tsx` - Divider component (horizontal/vertical)

*Future additions*:
- `Button.tsx` - Reusable button
- `Card.tsx` - Card component
- `Modal.tsx` - Modal dialog

### Search Features
**Location**: `src/pkg/search/`
- `Search.tsx` - Main search box
- `Results.tsx` - Results display
- `Result.tsx` - Single result item
- `Labs.tsx` - Filter/preferences (in `labs/` subfolder)

### Feature Pages
**Location**: `src/pages/`
- `daily/` - Daily reports page
- `ai/` - AI features page
- `writer/` - Writer/editor page
- `kjv/` - Bible KJV page
- `read/` - Reading page
- `number/` - Number games page
- `root/` - Home page
- `login/` - Login page

### Feature Components
**Location**: `src/pkg/`
- `ai/` - AI-related components
- `bible/` - Bible-specific components
- `writer/` - Writer/editor components
- `firebase/` - Firebase auth/services
- `hooks/` - Custom React hooks
- `button/` - Button components
- `docs/` - Documentation components
- `link/` - Link components
- `voice/` - Voice components

### State Management
**Location**: `src/app/`
- Redux store configuration
- Redux slices (cache, chat, reader, writer, etc.)
- Jotai atoms (in component folders)

### Assets
**Location**: `src/assets/`
- Static files (favicons, images, etc.)

---

## Importing Components

### Import UI Components
```tsx
import Separator from "../../pkg/ui/Separator";
```

### Import Search Components
```tsx
// From anywhere:
import Search from "../pkg/search/Search";
import Results from "../pkg/search/Results";
import Labs from "../pkg/search/labs/Labs";

// Or use barrel file (from page folder):
import { Search, Labs } from "./search";
```

### Import Custom Hooks
```tsx
import { useCustomHook } from "../../pkg/hooks/useCustomHook";
```

### Import Feature Components
```tsx
import AiComponent from "../../pkg/ai/AiComponent";
import WriterComponent from "../../pkg/writer/WriterComponent";
```

---

## Adding New Components

### Generic UI Component (Reusable)
1. Create in `src/pkg/ui/ComponentName.tsx`
2. Import from `../../pkg/ui/ComponentName` (or relative path)
3. Example:
   ```tsx
   // src/pkg/ui/Badge.tsx
   const Badge = ({ children, variant = "default" }) => {
     return <span className={`badge badge-${variant}`}>{children}</span>;
   };
   export default Badge;
   ```

### Feature Component (Feature-specific)
1. Create folder in `src/pkg/featureName/`
2. Add component files and related atoms
3. Example:
   ```tsx
   // src/pkg/analytics/Analytics.tsx
   // src/pkg/analytics/utils.ts
   // src/pkg/analytics/atoms.ts
   ```

### Page Component
1. Create in `src/pages/featureName/`
2. Can use components from `src/pkg/`
3. Example:
   ```tsx
   // src/pages/dashboard/Dashboard.tsx
   ```

### Layout Component (Page structure)
1. Create in `src/page/`
2. Used in main page layout
3. Example:
   ```tsx
   // src/page/Sidebar.tsx
   ```

---

## Common Import Patterns

### From Page Layout
```tsx
import Search from "../pkg/search/Search";           // To pkg
import Motion from "./Motion";                       // Same level
import { navigateWT } from "../pkg/hooks/useTransitionNavigation";  // To pkg hooks
```

### From Pkg Components
```tsx
import Separator from "../ui/Separator";             // Sibling folder
import { useCustom } from "../hooks/useCustom";      // Sibling folder
import Search from "../search/Search";               // Sibling folder
```

### From Pages
```tsx
import Page from "../../page/Page";                  // To page layout
import { useCustom } from "../../pkg/hooks";         // To pkg
```

---

## Project Guidelines

### ✅ DO
- Put reusable components in `pkg/`
- Group related components in folders
- Use barrel files (`index.ts`) for cleaner imports
- Create custom hooks in `pkg/hooks/`
- Keep component files focused and small
- Use TypeScript types for all props

### ❌ DON'T
- Mix page layout code with component code
- Create components directly in `page/` (unless it's layout-specific)
- Put page-specific components in `pkg/`
- Create scattered components in root `pkg/`
- Import from deeply nested paths (use relative imports)
- Make components do too much

---

## File Naming Conventions

- **Components**: `ComponentName.tsx` (PascalCase)
- **Hooks**: `useHookName.ts` (camelCase with `use` prefix)
- **Utilities**: `utilityName.ts` (camelCase)
- **Types**: `types.ts` or `ComponentName.types.ts`
- **Atoms**: `atomName.ts` (camelCase)
- **Styles**: `styles.css` or inline Tailwind

---

## Troubleshooting

### "Module not found" errors
1. Check the actual file path
2. Use relative imports (`../`) correctly
3. Verify file extension (.tsx, .ts, not missing)
4. Check spelling and casing (case-sensitive on Linux)

### "Cannot find component"
1. Check if component is exported
2. Verify import path (relative vs absolute)
3. Check if component is in correct folder
4. Look at similar components for pattern

### Circular dependency issues
1. Move shared code to utilities
2. Use atoms for state instead of props
3. Restructure imports to follow hierarchy

---

## Resources

- **TypeScript**: For type safety
- **Radix UI**: For accessible components
- **Tailwind CSS**: For styling
- **Jotai**: For lightweight state (local UI state)
- **Redux**: For global state (app-wide data)
- **React Router**: For navigation

---

## Questions?

Check the documentation files:
- `RESTRUCTURING_COMPLETE.md` - Full overview
- `BEFORE_AFTER_COMPARISON.md` - Visual comparison
- `REORGANIZATION_SUMMARY.md` - Detailed changes
