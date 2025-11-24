# NiSen - Quick Start Guide

## 📥 Download & Build APK in 5 Minutes

### What You Need:
- A computer (Mac, Windows, or Linux)
- Android Studio (or just Android SDK)
- Node.js installed

### 🚀 Fastest Way (Expo Cloud Build):

1. **Download this folder** to your computer

2. **Install dependencies:**
   ```bash
   cd mobile
   npm install
   ```

3. **Install Expo CLI globally:**
   ```bash
   npm install -g eas-cli
   ```

4. **Create free Expo account:** https://expo.dev

5. **Login to Expo:**
   ```bash
   npx eas login
   ```

6. **Build APK (cloud):**
   ```bash
   npx eas build --platform android
   ```

7. **Download APK** from the link provided in the console or from https://expo.dev/dashboard

### ✅ Done! You have your APK

---

## 🎯 Alternative: Local Build (Faster but needs more setup)

### If you have Android SDK installed:

```bash
cd mobile
npm install
npm run build:android
```

Your APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

---

## 📱 Install on Your Phone

1. Transfer APK to your Android phone via USB
2. Go to Settings → Security → Enable "Unknown Sources"
3. Open file manager and tap the APK
4. Install and launch NiSen!

---

## 🎨 App Features

✅ Learn Hiragana, Katakana, Kanji
✅ Interactive character grids  
✅ Progress tracking
✅ 6 languages: English, Indonesian, Russian, Mandarin, French, Spanish
✅ 100% offline - no internet needed
✅ Dark mode support
✅ Beautiful Japanese character icon

---

## 🆘 Troubleshooting

**Node.js not found?**
```bash
Download from: https://nodejs.org/
```

**Expo build fails?**
```bash
npm install --force
npx eas build --platform android --local
```

**APK too slow to build?**
Try: `npm run build:android` (requires Android SDK)

---

## 📞 Support

- Expo Docs: https://docs.expo.dev/build/setup/
- React Native: https://reactnative.dev

---

**Happy Learning! 🇯🇵**
