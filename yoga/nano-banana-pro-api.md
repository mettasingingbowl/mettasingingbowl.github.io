# Nano Banana Pro API (Gemini 3 Pro Image)

Google's latest image generation model, released November 20, 2025.

## Model Info

| Model | Name | Features |
|-------|------|----------|
| Nano Banana | `gemini-2.5-flash-image` | Fast, 1024px |
| **Nano Banana Pro** | `gemini-3-pro-image-preview` | Advanced, up to 4K, Thinking Process |

## API Endpoint

```
https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent
```

## Curl Example

```bash
export GEMINI_API_KEY="your-api-key"

curl -s -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{
      "parts": [
        {"text": "Create a cute cartoon cat wearing a chef hat"}
      ]
    }],
    "generationConfig": {
      "responseModalities": ["TEXT", "IMAGE"]
    }
  }' | jq -r '.candidates[0].content.parts[] | select(.inlineData) | .inlineData.data' | base64 --decode > output.jpg
```

## Python Example

```python
from google import genai
from google.genai import types

client = genai.Client()

response = client.models.generate_content(
    model="gemini-3-pro-image-preview",
    contents=["Create a cute cartoon cat wearing a chef hat"],
    config=types.GenerateContentConfig(
        response_modalities=['TEXT', 'IMAGE']
    )
)

for part in response.parts:
    if part.text is not None:
        print(part.text)
    elif part.inline_data is not None:
        image = part.as_image()
        image.save("output.png")
```

## Image Config Options

```python
config=types.GenerateContentConfig(
    response_modalities=['TEXT', 'IMAGE'],
    image_config=types.ImageConfig(
        aspect_ratio="16:9",  # 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9
        image_size="2K"       # 1K, 2K, 4K (Pro only)
    )
)
```

## Aspect Ratios & Resolutions (Nano Banana Pro)

| Aspect | 1K | 2K | 4K |
|--------|----|----|-----|
| 1:1 | 1024x1024 | 2048x2048 | 4096x4096 |
| 16:9 | 1376x768 | 2752x1536 | 5504x3072 |
| 9:16 | 768x1376 | 1536x2752 | 3072x5504 |

## Features

- **Text-to-Image**: Generate images from text prompts
- **Image Editing**: Edit existing images with text prompts
- **Multi-turn Editing**: Conversational image refinement
- **Multi-Image Composition**: Use up to 14 reference images
- **Google Search Grounding**: Real-world knowledge integration
- **Thinking Process**: Model reasons before generating (Pro only)
- **High-Fidelity Text**: Accurate text rendering in images

## Links

- [Official Docs](https://ai.google.dev/gemini-api/docs/image-generation)
- [Get API Key](https://aistudio.google.com/apikey)
