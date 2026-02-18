#!/bin/bash

echo "🔍 Checking port 19008 status..."
echo ""

# Check if port 19008 is in use
echo "1. Checking if port 19008 is in use:"
lsof -i :19008 2>/dev/null || echo "   Port 19008 is NOT in use"
echo ""

# Check for Expo processes
echo "2. Checking for Expo processes:"
ps aux | grep -i "expo start" | grep -v grep || echo "   No Expo processes found"
echo ""

# Check for Node processes on port 19008
echo "3. Checking for Node processes on port 19008:"
netstat -an | grep 19008 || echo "   No processes found on port 19008"
echo ""

# Check what's listening on common Expo ports
echo "4. Checking common Expo ports:"
for port in 19000 19001 19002 8081 19008; do
  result=$(lsof -i :$port 2>/dev/null)
  if [ ! -z "$result" ]; then
    echo "   Port $port is in use:"
    echo "$result" | head -3
  fi
done
echo ""

# Check if we can connect to localhost:19008
echo "5. Testing connection to localhost:19008:"
curl -s -o /dev/null -w "   HTTP Status: %{http_code}\n" http://localhost:19008 2>/dev/null || echo "   Cannot connect to localhost:19008"
echo ""

echo "✅ Port check complete!"
