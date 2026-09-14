Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile((Join-Path $PSScriptRoot "src\assets\NEXO_LVR.png"))

$minX = $bmp.Width
$maxX = 0
$minY = $bmp.Height
$maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        # Check if colored pixel (emblem is gradient pink to purple)
        # R > 150 or B > 150 and not white (G is lower)
        if ($pixel.A -gt 50 -and ($pixel.R -gt 150 -or $pixel.B -gt 150) -and $pixel.G -lt 150) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Colored Emblem Bounds: X: $minX to $maxX (Width: $($maxX - $minX)), Y: $minY to $maxY (Height: $($maxY - $minY))"
$bmp.Dispose()
