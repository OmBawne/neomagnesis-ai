Add-Type -AssemblyName System.Drawing

$srcBlack = "c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\brand\nucleus-mark-black.png"
$srcWhite = "c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\brand\nucleus-mark-white.png"

$bmpBlack = [System.Drawing.Bitmap]::FromFile($srcBlack)

# Function to create a clean, crisp, centered favicon of exact dimensions
function Create-CrispFavicon($srcImg, $size, $destPath) {
    $canvas = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($canvas)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    # Padding: ~10% for crisp edge fit
    $pad = [int]($size * 0.08)
    $drawSize = $size - ($pad * 2)

    # Center proportionally
    $aspect = $srcImg.Width / $srcImg.Height
    if ($aspect -ge 1.0) {
        $w = $drawSize
        $h = [int]($drawSize / $aspect)
    } else {
        $h = $drawSize
        $w = [int]($drawSize * $aspect)
    }
    $x = [int](($size - $w) / 2)
    $y = [int](($size - $h) / 2)

    $g.DrawImage($srcImg, $x, $y, $w, $h)
    $g.Dispose()

    $canvas.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    return $canvas
}

# Generate 16x16, 32x32, 48x48, 192x192
$fav16 = Create-CrispFavicon $bmpBlack 16 "c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\favicon-16x16.png"
$fav32 = Create-CrispFavicon $bmpBlack 32 "c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\favicon-32x32.png"
$fav48 = Create-CrispFavicon $bmpBlack 48 "c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\favicon-48x48.png"
$fav192 = Create-CrispFavicon $bmpBlack 192 "c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\icon.png"
Copy-Item "c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\icon.png" "c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\app\icon.png" -Force

# Create standard ICO from 32x32
$iconPtr = $fav32.GetHicon()
$ico = [System.Drawing.Icon]::FromHandle($iconPtr)
$fs = New-Object System.IO.FileStream("c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\favicon.ico", [System.IO.FileMode]::Create)
$ico.Save($fs)
$fs.Close()
$ico.Dispose()

$fav16.Dispose()
$fav32.Dispose()
$fav48.Dispose()
$fav192.Dispose()
$bmpBlack.Dispose()

# Also create adaptive SVG favicon supporting light and dark browser tabs
$bytesBlack = [System.IO.File]::ReadAllBytes("c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\favicon-48x48.png")
$b64Dark = [Convert]::ToBase64String($bytesBlack)

$bytesWhite = [System.IO.File]::ReadAllBytes("c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\brand\nucleus-mark-white.png")
$b64White = [Convert]::ToBase64String($bytesWhite)

$svgContent = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="100%" height="100%">
  <style>
    .fav-dark { display: block; }
    .fav-light { display: none; }
    @media (prefers-color-scheme: dark) {
      .fav-dark { display: none; }
      .fav-light { display: block; }
    }
  </style>
  <g class="fav-dark">
    <image href="data:image/png;base64,$b64Dark" width="48" height="48" />
  </g>
  <g class="fav-light">
    <image href="data:image/png;base64,$b64White" x="4" y="4" width="40" height="40" />
  </g>
</svg>
"@
[System.IO.File]::WriteAllText("c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\icon.svg", $svgContent)

Write-Host "Favicons generated successfully with dark logo variant!"
