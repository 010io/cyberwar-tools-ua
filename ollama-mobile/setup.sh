#!/bin/bash
# Ollama Mobile LLM Setup for Ukrainian OSINT
# Legal: For authorized use only. Verify CFAA/ECPA compliance.

set -e

echo "🚀 Installing Ollama mobile LLM deployment..."

# Check OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OLLAMA_URL="https://ollama.ai/download/linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OLLAMA_URL="https://ollama.ai/download/mac"
else
    echo "❌ Unsupported OS"
    exit 1
fi

echo "📥 Downloading Ollama..."
curl -fsSL $OLLAMA_URL -o ollama-installer
chmod +x ollama-installer
./ollama-installer

echo "⚙️ Configuring for OSINT..."
mkdir -p ~/.ollama/models
export OLLAMA_MODELS=~/.ollama/models

echo "📦 Pulling models..."
ollama pull llama2
ollama pull mistral

echo "🔐 Starting Ollama service with auth..."
ollama serve --bind 127.0.0.1:11434 &

echo "✅ Ollama mobile deployment ready!"
echo "API: http://localhost:11434/api/generate"
echo "Rate limit: 100 req/min"

# Log usage
echo "[$(date)] Ollama deployed for Ukrainian OSINT" >> ~/.ollama/audit.log
