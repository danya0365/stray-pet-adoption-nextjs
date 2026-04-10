# .agents/CONTEXT.md

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Architecture:** **Clean Architecture** (Layered Pattern)
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand (Client Side)
- **Validation:** Zod
- **Database:** Supabase (Infrastructure Layer)

## Core Architecture Pattern
This project strictly follows the **Repository → Presenter → View** pattern to ensure separation of concerns and testability.

### 1. Application Layer (`src/application/`)
- **Repositories (Interfaces):** Defines the data contracts (e.g., `IUserRepository.ts`). This layer does NOT know about the database (Supabase).

### 2. Infrastructure Layer (`src/infrastructure/`)
- **Implementations:** Concrete implementations of repository interfaces.
- **Mock:** Used for development (`MockUserRepository.ts`).
- **Supabase:** Used for production (`SupabaseUserRepository.ts`).

### 3. Domain Layer (`src/domain/`)
- **Entities/Types:** Shared types and business logic entities used across all layers.

### 4. Presentation Layer (`src/presentation/`)
- **Presenters:** Contains business logic and state management for specific pages/features. Receives repositories via **Constructor Injection**.
- **Hooks:** Custom hooks (e.g., `useUserPresenter.ts`) that bridge the Presenter state to React components.
- **Components/Views:** Pure UI components that receive data and actions from the Presenter.

## Folder Structure
```text
├── app/                      # Next.js Route Handlers & Server Page Entry Points
├── src/
│   ├── application/          # Interface Contracts
│   │   └── repositories/     
│   ├── infrastructure/       # Data Access Implementations
│   │   └── repositories/     # (Mock / Supabase)
│   ├── domain/               # Types & Shared Entities
│   └── presentation/         # UI Logic & Components
│       ├── components/       # Views
│       ├── presenters/       # Logic & View Models
│       └── hooks/            # usePresenter hooks
└── public/                   # Static assets
```

## Mandatory Rules (Strict)
- **Mock-First Workflow:** Develop UI with **Mock Repositories** first until the UI is stable before switching to Supabase.
- **Dependency Injection:** Presenters MUST receive repositories via constructor injection. Never import Supabase directly into a Presenter or View.
- **Exports:** Always use **Named Exports**. No default exports for layers within `src/`.
- **Typing:** Always specify **Return Types** for all functions and components.
- **Separation:** `app/` files serve only as entry points; they must inject dependencies into the Presenter and render the View.
