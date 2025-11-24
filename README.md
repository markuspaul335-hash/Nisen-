# NiSen - Nihongo Sensei

An offline Android app for learning Japanese with Hiragana, Katakana, and Kanji.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Expo CLI (`npm install -g expo-cli`)
- Android Studio or Android SDK

### Installation

```bash
cd mobile
npm install
```

### Running

**Start the development server:**
```bash
npm start
```

**Run on Android:**
```bash
npm run android
```

**Run on iOS:**
```bash
npm run ios
```

### Building APK

To build a production APK for Android:

```bash
npm run build:android
```

This requires setting up EAS Build. Follow the Expo documentation for detailed instructions.

## Features

- Learn Hiragana (46 characters)
- Learn Katakana (46 characters)
- Study Kanji (10 essential characters)
- Interactive quizzes
- Progress tracking (offline)
- Multiple language support (English, Indonesian, Russian, Mandarin, French, Spanish)
- Dark mode support
- No internet connection required

## Architecture

- **Frontend**: React Native with Expo
- **Storage**: AsyncStorage for offline persistence
- **Styling**: React Native StyleSheet
- **Translations**: Local JSON-based translation system

## Directory Structure

```
mobile/
├── src/
│   ├── data/          # Japanese character data
│   └── lib/           # Utilities (progress, translations)
├── assets/            # App icons and images
├── App.tsx            # Main app component
├── app.json           # Expo configuration
└── package.json
```

## License

MIT
