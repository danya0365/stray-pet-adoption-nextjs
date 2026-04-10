# iOS 26 Liquid Glass Design System

This document defines the high-fidelity design standards for the **Stray Pet Adoption** project. It combines iOS 26 aesthetics with high-performance glassmorphism and smooth motion.

## 1. Color Palette

Primary tokens are defined in [theme.css](file:///Users/marosdeeuma/stray-pet-adoption-nextjs/public/styles/theme.css).

| Token | Hex | Tailwind Class |
|-------|-----|----------------|
| Blue (Main) | `#007AFF` | `bg-ios-blue` |
| Indigo | `#5E5CE6` | `bg-ios-indigo` |
| Teal | `#30D5C8` | `bg-ios-teal` |
| Red | `#FF3B30` | `bg-ios-red` |
| Green | `#34C759` | `bg-ios-green` |
| Orange | `#FF9500` | `bg-ios-orange` |

## 2. Glassmorphism Spec

Managed via CSS variables in `theme.css`.

| Layer | Blur | Saturation | Shadow | Use Case |
|-------|------|------------|--------|----------|
| **Thin** | 24px | 1.8 | Subtle | Default background elements |
| **Elevated** | 32px | 2.0 | Deep | Primary cards, Menus |
| **Thick** | 40px | 2.2 | Intense | Sidebars, Toolbars |

## 3. Typography

Fonts defined in [base.css](file:///Users/marosdeeuma/stray-pet-adoption-nextjs/public/styles/base.css).

- **Primary (Display)**: `DM Sans` (High tracking-tight, Bold)
- **Primary (Thai)**: `Noto Sans Thai`
- **Mono**: `DM Mono` (Data labels, small secondary info)

## 4. Components & Utilities

- **`.glass`**: Standard glass container.
- **`.pressable`**: Haptic-like interaction using scale 0.98 and shadow reduction.
- **`.btn-ios`**: iOS standard button geometry with consistent padding.
- **`.badge-ios`**: Status indicator with a pulsating dot.

## 5. Animation Principles

| Animation | Timing | Feel |
|-----------|--------|------|
| `breathe` | 4s / Sine | Living, organic pulse |
| `float-in`| 0.8s / Spring | Elegant page entry |
| `dataFlow` | 3s / Linear | Background data activity |

---

> [!IMPORTANT]
> Always check for the `dark` class variant in each component. Liquid Glass needs different opacities (higher contrast in light, more blur in dark) to maintain the premium feel.
