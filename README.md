# Recipe App — React Native

A cross-platform React Native rebuild of an existing [iOS recipe app](https://github.com/gtm4y5kghx-byte/RecipeApp). The iOS app serves as the source of truth for features, architecture, and business logic. This is a ground-up rebuild, not a wrapper.

## Goals

- **Cross-platform** — single codebase for iOS and Android
- **Architecture parity** — same features and UX as the native iOS app
- **TDD** — test-driven development for business logic and data layer

## Tech Stack

| Layer             | Technology                          |
| ----------------- | ----------------------------------- |
| Framework         | React Native (Expo)                 |
| Language          | TypeScript (strict)                 |
| Styling           | NativeWind (Tailwind)               |
| Navigation        | React Navigation                    |
| Database          | WatermelonDB (SQLite + JSI)         |
| Key-Value Storage | MMKV                                |
| Animations        | Reanimated                          |
| Gestures          | React Native Gesture Handler        |
| Testing           | Jest + React Native Testing Library |

## Getting Started

```bash
npm install
npm run ios       # iOS simulator
npm run android   # Android emulator
npm test          # run tests
```

## Architecture

```
src/
  features/          # feature modules (recipes, meal-plan, shopping-list, etc.)
    [feature]/
      components/
      hooks/
      screens/
  shared/
    components/      # design system (atoms + molecules)
    hooks/
    models/          # TypeScript types + WatermelonDB models
    services/        # API clients, DB access, storage
    utils/
  navigation/        # navigators + route types
  theme/             # color tokens
```

**Pattern:** Screens render components. Hooks manage state and business logic. Services handle data access. Components are presentation-only.

## iOS Source App

The native iOS app this project is migrated from: [RecipeApp](https://github.com/gtm4y5kghx-byte/RecipeApp)

- SwiftUI + SwiftData + MVVM
- Claude API integration for AI-powered recipe suggestions and meal planning
