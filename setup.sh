#!/bin/bash

echo "🚀 DevSprint Setup Script"
echo "========================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🎉 Setup complete!"
    echo ""
    echo "To start the development server, run:"
    echo "  npm run dev"
    echo ""
    echo "Then open http://localhost:3000 in your browser"
else
    echo ""
    echo "❌ Failed to install dependencies"
    echo "Please check the error messages above"
    exit 1
fi
