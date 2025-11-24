# Building NiSen APK

This guide will help you build the APK file for the NiSen app.

## Option 1: Using Expo Build Service (Recommended - Cloud Build)

### Prerequisites:
- Expo account (free at https://expo.dev)
- EAS CLI installed: `npm install -g eas-cli`

### Steps:

1. **Authenticate with Expo:**
   ```bash
   cd mobile
   npx eas-cli login
   ```

2. **Create an Expo Project (if needed):**
   ```bash
   npx eas-cli project:init
   ```

3. **Build APK:**
   ```bash
   npx eas build --platform android --local
   ```

   Or for a cloud build:
   ```bash
   npx eas build --platform android
   ```

4. **Download APK:**
   The APK will be available at the URL provided in the build output, or find it in your EAS dashboard at https://expo.dev/projects

---

## Option 2: Local Build with React Native CLI

### Prerequisites:
- Android Studio installed
- Android SDK set up
- Node.js v18+

### Steps:

1. **Install dependencies:**
   ```bash
   cd mobile
   npm install
   npm install -g react-native-cli
   ```

2. **Build APK:**
   ```bash
   npm run build:android
   ```

   Or use React Native directly:
   ```bash
   npx react-native run-android --mode=release
   ```

3. **APK Location:**
   The APK will be at:
   ```
   mobile/android/app/build/outputs/apk/release/app-release.apk
   ```

---

## Option 3: Using Expo Go (Quick Testing)

### For Testing Only:

1. **Install Expo Go on your Android phone** from Google Play Store

2. **Start development server:**
   ```bash
   cd mobile
   npm start
   ```

3. **Scan QR code with Expo Go app**

---

## Option 4: Using Dockerized Build (Advanced)

If you want a containerized build environment, use the provided Dockerfile setup.

---

## Troubleshooting

### Build Fails with Dependency Issues:
```bash
cd mobile
npm install --force
npm run build:android
```

### APK Too Large:
Consider enabling ProGuard/R8 in `android/app/build.gradle`

### KeyStore Issues:
The build system will auto-generate a keystore for debug builds.

---

## Next Steps

1. Transfer the APK to your Android device via USB
2. Enable "Unknown Sources" in Android Security Settings
3. Open the APK file and install
4. Launch "NiSen" app!

---

**Need Help?**
- Expo Docs: https://docs.expo.dev/build/setup/
- React Native Docs: https://reactnative.dev/docs/android-setup
