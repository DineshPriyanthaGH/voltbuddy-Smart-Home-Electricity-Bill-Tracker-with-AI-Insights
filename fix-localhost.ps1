# PowerShell script to fix remaining localhost references
Write-Host "🔧 Fixing remaining localhost references..." -ForegroundColor Yellow

# Get all JS/TS files in frontend that contain localhost:5001
$files = Get-ChildItem -Path "voltbuddy-frontend\app" -Recurse -Include *.js,*.jsx,*.ts,*.tsx | 
    Where-Object { (Get-Content $_.FullName -Raw) -match "localhost:5001" } |
    Where-Object { $_.FullName -notmatch "\.next" }

foreach ($file in $files) {
    Write-Host "📝 Fixing $($file.FullName)" -ForegroundColor Green
    
    # Read file content
    $content = Get-Content $file.FullName -Raw
    
    # Replace localhost URLs
    $content = $content -replace "http://localhost:5001/api", "`${API_BASE_URL}"
    
    # Add API_BASE_URL import if not present
    if ($content -notmatch "API_BASE_URL") {
        # Calculate relative path depth
        $relativePath = $file.FullName -replace ".*voltbuddy-frontend\\app\\", ""
        $depth = ($relativePath -split "\\").Count - 1
        
        $importPath = switch ($depth) {
            1 { "../../config/api" }
            2 { "../../../config/api" }
            3 { "../../../../config/api" }
            default { "../../config/api" }
        }
        
        # Add import after first import line
        $lines = $content -split "`n"
        $importAdded = $false
        for ($i = 0; $i -lt $lines.Count; $i++) {
            if ($lines[$i] -match "^import.*from" -and -not $importAdded) {
                $lines = $lines[0..$i] + "import { API_BASE_URL } from '$importPath';" + $lines[($i+1)..($lines.Count-1)]
                $importAdded = $true
                break
            }
        }
        $content = $lines -join "`n"
    }
    
    # Write back to file
    Set-Content -Path $file.FullName -Value $content -NoNewline
}

Write-Host "✅ All localhost references fixed!" -ForegroundColor Green
