# PowerShell script to copy files from old project to Next.js project

$sourceRoot = "C:\Users\sinha\Downloads\pixel-shoppe-22-main\pixel-shoppe-22-main\src"
$destRoot = "C:\Users\sinha\Downloads\pixel-shoppe-22-main\nextjs-shopify\src"

# Copy all UI components
Write-Host "Copying UI components..."
$uiSource = Join-Path $sourceRoot "components\ui"
$uiDest = Join-Path $destRoot "components\ui"
New-Item -ItemType Directory -Force -Path $uiDest | Out-Null
Copy-Item -Path "$uiSource\*" -Destination $uiDest -Recurse -Force

# Copy hooks
Write-Host "Copying hooks..."
$hooksSource = Join-Path $sourceRoot "hooks"
$hooksDest = Join-Path $destRoot "hooks"
New-Item -ItemType Directory -Force -Path $hooksDest | Out-Null
Copy-Item -Path "$hooksSource\*" -Destination $hooksDest -Recurse -Force

Write-Host "Files copied successfully!"
