#!/bin/bash

# Fix remaining localhost references
echo "🔧 Fixing remaining localhost references..."

# Find all files with localhost:5001 (excluding .next, node_modules, .git)
files=$(grep -r "localhost:5001" voltbuddy-frontend/app/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" | grep -v ".next" | cut -d: -f1 | sort -u)

for file in $files; do
    echo "📝 Fixing $file"
    # Replace localhost:5001 with production URL
    sed -i 's|http://localhost:5001/api|${API_BASE_URL}|g' "$file" || true
    
    # Add import for API_BASE_URL if not present
    if ! grep -q "API_BASE_URL" "$file"; then
        # Calculate relative path to config
        depth=$(echo "$file" | tr -cd '/' | wc -c)
        if [ $depth -eq 3 ]; then  # app/page.js
            import_path="../../config/api"
        elif [ $depth -eq 4 ]; then  # app/subdir/page.js
            import_path="../../../config/api"
        elif [ $depth -eq 5 ]; then  # app/subdir/components/page.js
            import_path="../../../../config/api"
        else
            import_path="../../config/api"
        fi
        
        # Add import after existing imports
        sed -i "/^import.*from/a import { API_BASE_URL } from '$import_path';" "$file" || true
    fi
done

echo "✅ All localhost references fixed!"
