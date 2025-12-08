#!/bin/bash
# Simple HTML structure check - catches missing </style>, </head>, <body> tags

errors=0

for file in $(find bowl yoga -name "*.html" 2>/dev/null); do
  # Check for basic structure
  if ! grep -q "</head>" "$file"; then
    echo "ERROR: $file - missing </head>"
    errors=$((errors + 1))
  fi
  
  if ! grep -q "<body" "$file"; then
    echo "ERROR: $file - missing <body>"
    errors=$((errors + 1))
  fi
  
  if ! grep -q "</body>" "$file"; then
    echo "ERROR: $file - missing </body>"
    errors=$((errors + 1))
  fi
  
  # Check style tag is properly closed (not JS inside style)
  if grep -q "<style>" "$file" && ! grep -q "</style>" "$file"; then
    echo "ERROR: $file - missing </style>"
    errors=$((errors + 1))
  fi
done

if [ $errors -eq 0 ]; then
  echo "OK - All HTML files have valid structure"
  exit 0
else
  echo ""
  echo "Found $errors error(s)"
  exit 1
fi
