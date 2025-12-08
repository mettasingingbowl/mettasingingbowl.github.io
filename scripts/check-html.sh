#!/bin/bash
# Simple HTML structure check - catches missing </style>, </head>, <body> tags
# Usage: ./scripts/check-html.sh [--serve]
#   --serve: test via local HTTP server (more realistic)

errors=0

# HTTP server test mode
if [ "$1" = "--serve" ]; then
  PORT=3869
  
  # Kill any existing server on this port
  fuser -k $PORT/tcp >/dev/null 2>&1
  sleep 0.5
  
  echo "Starting HTTP server on port $PORT..."
  cd bowl
  python3 -m http.server $PORT >/dev/null 2>&1 &
  pid=$!
  sleep 1
  
  # Check if server started
  if ! curl -s "http://localhost:$PORT/" > /dev/null 2>&1; then
    echo "ERROR: Failed to start HTTP server"
    kill $pid 2>/dev/null
    exit 1
  fi
  
  echo "Testing result pages..."
  for file in $(find results -name "*.html"); do
    url="http://localhost:$PORT/$file"
    response=$(curl -s "$url")
    if echo "$response" | grep -q "</body>"; then
      echo "  OK: $file"
    else
      echo "  BROKEN: $file"
      errors=$((errors + 1))
    fi
  done
  
  kill $pid 2>/dev/null
  cd ..
  
  echo ""
  [ $errors -eq 0 ] && echo "All pages OK via HTTP" && exit 0
  echo "Found $errors broken page(s)" && exit 1
fi

# File-based test (default)
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
