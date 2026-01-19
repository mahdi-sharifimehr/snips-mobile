# Snips Mobile Assignment

React Native (Expo) implementation of the Snips Home + Feed screens.
This project emphasizes UI fidelity, clean architecture, and smooth UX for list-heavy screens.

## Setup

```bash
npm install
```

## Run

```bash
npm run start
```

Then choose iOS/Android from the Expo CLI.
For a faster local iteration loop, use a simulator or a physical device with Expo Go.

## Tests

```bash
npm test
```

## Lint / Format

```bash
npm run lint
npm run format
```

## Technical Stack

- **React Native via Expo** for fast bootstrap, stable tooling, and easy device testing.
- **Navigation**: `@react-navigation/bottom-tabs` for the primary Home/Feed tab flow.
- **State management**: local UI state + data-fetching hooks (`useHomeData`, `useFeedData`).
  This keeps state close to where it is used and avoids premature global state.
- **Styling**: `StyleSheet` + shared `theme` tokens for consistent typography, spacing, and color.
  Gradients and icons are provided by `expo-linear-gradient` and `@expo/vector-icons`.
- **Media**: `expo-av` for streaming video playback and control on the Feed screen.

## Architecture Notes

- **Screen containers vs views**: the Feed screen separates stateful playback logic
  (`src/containers/FeedCardContainer.tsx`) from a pure UI component
  (`src/components/feed/FeedCardView.tsx`). This improves testability and readability.
- **Hooks + services**: API access lives in `src/services` and is consumed through
  `src/hooks`, keeping screens focused on composition and layout.
- **Component reuse**: home cards and rows are shared across sections for consistent visuals.
- **Performance**: list settings include `getItemLayout`, `removeClippedSubviews`,
  and tuned render batch sizes for smoother scrolling.

## Architecture Decisions

### Why Expo?

- Simplified development workflow and native module integration.
- Over-the-air updates support.
- Fast iteration with hot reload.
- Strong built-in support for common native features.

### Why Hooks + Local State (instead of a global store)?

- The app has two screens with scoped state; keeping state local reduces complexity.
- Data fetching is encapsulated in dedicated hooks for clarity and testability.
- Avoids premature global state until the app truly needs it.

### Why FlatList (for this scope)?

- The data set is moderate and the list is paged for the Feed screen.
- Performance is already tuned with `getItemLayout`, `removeClippedSubviews`,
  and smaller render batches.
- If the app grows, FlashList would be a good upgrade path.

### Why Expo AV (current choice)?

- It is stable and works reliably with the Expo SDK used in this project.
- Supports the streaming use case needed for the Feed screen.
- If the project requires more advanced controls or newer APIs, Expo Video would be
  a good next step.

## API Endpoints

- Home: `https://snips-testing-data.s3.us-east-2.amazonaws.com/homePage.json`
- Feed: `https://snips-testing-data.s3.us-east-2.amazonaws.com/FeedPage1.json`

## Assumptions

- Buttons on the Feed screen are visually mocked per task requirements.
- Only one feed video plays at a time; playback pauses when leaving the Feed tab.
- Some API fields are ignored when not required by the provided Figma design.
