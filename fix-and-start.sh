#!/bin/bash

# Navigate to project directory
cd /Users/namratarategain/Documents/Cursor_Nav_Mobile_App

echo "🔧 Fixing and starting the app..."

# Kill any existing Expo processes
echo "📛 Stopping existing Expo processes..."
pkill -f "expo start" || true
sleep 2

# Install/update dependencies
echo "📦 Installing dependencies..."
npm install

# Clear Expo cache
echo "🧹 Clearing Expo cache..."
npx expo start --clear --no-dev --minify 2>&1 | head -1 || true
rm -rf .expo || true
rm -rf node_modules/.cache || true

# Clear npm cache
echo "🧹 Clearing npm cache..."
npm cache clean --force || true

# Install @expo/vector-icons explicitly if missing
echo "📦 Ensuring @expo/vector-icons is installed..."
npm install @expo/vector-icons@^13.0.0 --save || true

# Start the server
echo "🚀 Starting Expo server on port 19008..."
echo ""
echo "✅ Server starting... Open http://localhost:19008 in your browser"
echo ""

npx expo start --web --clear --port 19008
