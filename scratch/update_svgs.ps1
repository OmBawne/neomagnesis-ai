Add-Type -AssemblyName System.Drawing

$mark = [System.Drawing.Bitmap]::FromFile("c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\brand\nucleus-mark-black.png")
Write-Host "Mark size: $($mark.Width) x $($mark.Height)"

# Let's inspect the SVG we can create. Since SVG can embed the high-res PNG directly as base64 or render clean paths:
$bytes = [System.IO.File]::ReadAllBytes("c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\brand\nucleus-mark-white.png")
$b64White = [Convert]::ToBase64String($bytes)

$bytesBlack = [System.IO.File]::ReadAllBytes("c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\brand\nucleus-mark-black.png")
$b64Black = [Convert]::ToBase64String($bytesBlack)

$bytesFullWhite = [System.IO.File]::ReadAllBytes("c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\brand\neomagnesis-full-white.png")
$b64FullWhite = [Convert]::ToBase64String($bytesFullWhite)

$bytesFullBlack = [System.IO.File]::ReadAllBytes("c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\brand\neomagnesis-full-black.png")
$b64FullBlack = [Convert]::ToBase64String($bytesFullBlack)

# Create icon.svg with white mark
$iconSvg = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 $($mark.Width) $($mark.Height)" width="100%" height="100%" fill="none">
  <image href="data:image/png;base64,$b64White" width="$($mark.Width)" height="$($mark.Height)" />
</svg>
"@
[System.IO.File]::WriteAllText("c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\icon.svg", $iconSvg)

# Create logo-light.svg (dark logo for light backgrounds)
$logoLightSvg = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 581 140" width="100%" height="100%" fill="none">
  <image href="data:image/png;base64,$b64FullBlack" width="581" height="140" />
</svg>
"@
[System.IO.File]::WriteAllText("c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\logo-light.svg", $logoLightSvg)

# Create logo-dark.svg and logo.svg (white logo for dark backgrounds)
$logoDarkSvg = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 581 140" width="100%" height="100%" fill="none">
  <image href="data:image/png;base64,$b64FullWhite" width="581" height="140" />
</svg>
"@
[System.IO.File]::WriteAllText("c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\logo-dark.svg", $logoDarkSvg)
[System.IO.File]::WriteAllText("c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\logo.svg", $logoDarkSvg)

$mark.Dispose()
Write-Host "Updated icon.svg, logo-dark.svg, logo-light.svg, logo.svg"
