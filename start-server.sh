#!/bin/bash

cd /Users/namratarategain/Documents/Cursor_Nav_Mobile_App

echo "🛑 Stopping any existing servers..."
lsof -ti :19008 | xargs kill -9 2>/dev/null || true
pkill -f "expo start" 2>/dev/null || true
sleep 2

echo "🧹 Clearing caches..."
rm -rf .expo 2>/dev/null || true
rm -rf node_modules/.cache 2>/dev/null || true

echo "🚀 Starting Expo server on port 19008..."
echo ""
echo "⏳ Please wait 15-20 seconds for the server to start..."
echo "📱 Then open: http://localhost:19008"
echo ""

npx expo start --web --clear --port 19008
