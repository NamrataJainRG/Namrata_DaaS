# Navigator Mobile App

A modern React Native mobile app built with Expo, featuring a beautiful overview page with statistics, charts, and quick actions.

## Features

- 📊 **Overview Dashboard** - Comprehensive overview with key metrics
- 📈 **Interactive Charts** - Weekly performance visualization
- 🎨 **Modern UI** - Beautiful gradient cards and smooth animations
- ⚡ **Quick Actions** - Easy access to common features
- 📱 **Responsive Design** - Optimized for both iOS and Android

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (optional, but recommended)
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the Expo development server:
```bash
npm start
```

3. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your physical device

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser

## Project Structure

```
├── App.js                 # Main app component with navigation
├── index.js               # Entry point
├── screens/
│   └── OverviewScreen.js  # Overview page component
├── app.json              # Expo configuration
└── package.json          # Dependencies
```

## Technologies Used

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **React Native Chart Kit** - Chart visualization
- **Expo Linear Gradient** - Gradient effects
- **React Native Vector Icons** - Icon library

## Customization

The overview page includes:
- Stats cards with gradient backgrounds
- Weekly performance chart
- Quick action buttons
- Recent activity feed

You can easily customize colors, data, and layout by editing `screens/OverviewScreen.js`.

## License

MIT
