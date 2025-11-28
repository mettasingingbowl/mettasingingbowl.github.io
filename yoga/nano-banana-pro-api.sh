#!/bin/bash

: "${GEMINI_API_KEY:?Environment variable GEMINI_API_KEY is required}"
PROMPT="${1:-A cute cartoon cat wearing a chef hat}"
OUTPUT="${2:-output_$(date +%s).jpg}"

curl -s -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"contents\": [{
      \"parts\": [
        {\"text\": \"$PROMPT\"}
      ]
    }],
    \"generationConfig\": {
      \"responseModalities\": [\"TEXT\", \"IMAGE\"]
    }
  }" | jq -r '.candidates[0].content.parts[] | select(.inlineData) | .inlineData.data' | base64 --decode > "$OUTPUT"

echo "Saved: $OUTPUT"
