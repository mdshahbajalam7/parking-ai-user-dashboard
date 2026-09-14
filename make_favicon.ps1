Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "src\assets\NEXO_LVR.png"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

# Emblem bounds
$embX = 239
$embY = 25
$embW = 375
$embH = 186

# Crop rectangle
$cropRect = New-Object System.Drawing.Rectangle($embX, $embY, $embW, $embH)
$cropped = $bmp.Clone($cropRect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Create 256x256 square favicon
$targetSize = 256
$faviconBmp = New-Object System.Drawing.Bitmap($targetSize, $targetSize)
$g = [System.Drawing.Graphics]::FromImage($faviconBmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear([System.Drawing.Color]::Transparent)

# Fit emblem inside with padding (e.g. padding 16px)
$padding = 16
$availW = $targetSize - ($padding * 2)
$availH = $targetSize - ($padding * 2)

$scale = [Math]::Min($availW / $embW, $availH / $embH)
$destW = [int]($embW * $scale)
$destH = [int]($embH * $scale)
$destX = [int](($targetSize - $destW) / 2)
$destY = [int](($targetSize - $destH) / 2)

$destRect = New-Object System.Drawing.Rectangle($destX, $destY, $destW, $destH)
$g.DrawImage($cropped, $destRect, 0, 0, $embW, $embH, [System.Drawing.GraphicsUnit]::Pixel)

$faviconPngPath = Join-Path $PSScriptRoot "favicon.png"
$faviconBmp.Save($faviconPngPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Convert to Base64 for embedding in favicon.svg as well
$ms = New-Object System.IO.MemoryStream
$faviconBmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
$base64Png = [Convert]::ToBase64String($ms.ToArray())
$ms.Dispose()

$g.Dispose()
$faviconBmp.Dispose()
$cropped.Dispose()
$bmp.Dispose()

# Create clean favicon.svg embedding this exact emblem
$svgContent = @"
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 256 256">
  <image href="data:image/png;base64,$base64Png" width="256" height="256" />
</svg>
"@

$faviconSvgPath = Join-Path $PSScriptRoot "favicon.svg"
[System.IO.File]::WriteAllText($faviconSvgPath, $svgContent)

# Also create public/favicon.ico or public/favicon.svg if public directory is needed
if (-not (Test-Path (Join-Path $PSScriptRoot "public"))) {
    New-Item -ItemType Directory -Path (Join-Path $PSScriptRoot "public") | Out-Null
}
Copy-Item $faviconPngPath (Join-Path $PSScriptRoot "public\favicon.png")
Copy-Item $faviconSvgPath (Join-Path $PSScriptRoot "public\favicon.svg")

Write-Host "Favicon generated successfully at: $faviconPngPath and $faviconSvgPath"
