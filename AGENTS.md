<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Patterns & Skills
This project uses project-specific patterns and skills to ensure consistency.

- **Primary Context:** Read [INIT_PROJECT.md](file:///Users/marosdeeuma/stray-pet-adoption-nextjs/INIT_PROJECT.md) for Tech Stack and Step-by-Step execution status.
- **Requirements:** Refer to [FEATURE.md](file:///Users/marosdeeuma/stray-pet-adoption-nextjs/FEATURE.md) for the project roadmap and logic.
- **Agent Skills:** Located in [`.agents/skills/`](file:///Users/marosdeeuma/stray-pet-adoption-nextjs/.agents/skills/).
- **Rule:** Before starting any work (especially creating components, repositories, or pages), you **MUST** check the `.agents/skills/` directory. 
- **Instruction:** If a relevant `SKILL.md` exists for your task, you must read and follow its instructions exactly as documented.

- **Clean Architecture**: Always follow the [Domain -> Application -> Infrastructure -> Presentation] flow.
    - Use `src/domain/Result.ts` for all business logic returns.
    - Use `src/infrastructure/BaseRepository.ts` for data sourcing.
- **UI State**: Use **Zustand** for global transient states.
    - Call `toast.success()` or `toast.error()` for user feedback.
- **Design System**: Strictly use tokens in `theme.css` and classes in `components.css`.
