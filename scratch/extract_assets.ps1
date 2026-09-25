Add-Type -AssemblyName System.Drawing

$sourcePath = "C:\Users\HP\.gemini\antigravity-ide\brain\baffcf00-0906-4989-8d43-d3a80ec51612\.user_uploaded\media_1789709268006.jpg"
$bmp = New-Object System.Drawing.Bitmap($sourcePath)

$brandDir = "c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\brand"
if (!(Test-Path $brandDir)) { New-Item -ItemType Directory -Path $brandDir | Out-Null }

$bgL = 243.0

function Extract-Transparent($srcBmp, $x1, $y1, $w, $h, $destFile, $isWhite) {
    $outBmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    for ($y = 0; $y -lt $h; $y++) {
        $srcY = [Math]::Max(0, [Math]::Min($srcBmp.Height - 1, $y1 + $y))
        for ($x = 0; $x -lt $w; $x++) {
            $srcX = [Math]::Max(0, [Math]::Min($srcBmp.Width - 1, $x1 + $x))
            $c = $srcBmp.GetPixel($srcX, $srcY)
            $lum = 0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B
            
            $norm = ($bgL - $lum) / ($bgL - 25.0)
            if ($norm -lt 0.04) { 
                $alpha = 0 
            } elseif ($norm -gt 0.96) { 
                $alpha = 255 
            } else { 
                $alpha = [int]($norm * 255) 
            }
            
            if ($isWhite) {
                # Warm ivory white (#F1EFE8)
                $col = [System.Drawing.Color]::FromArgb($alpha, 241, 239, 232)
            } else {
                # Deep charcoal (#0B0C0E)
                $col = [System.Drawing.Color]::FromArgb($alpha, 11, 12, 14)
            }
            $outBmp.SetPixel($x, $y, $col)
        }
    }
    $outBmp.Save($destFile, [System.Drawing.Imaging.ImageFormat]::Png)
    $outBmp.Dispose()
}

# 1. Top-right standalone Nucleus Loop Mark
$trMinX = 603; $trMaxX = 803; $trMinY = 120; $trMaxY = 306
$pad = 12
$mX = [Math]::Max(0, $trMinX - $pad)
$mY = [Math]::Max(0, $trMinY - $pad)
$mW = [Math]::Min($bmp.Width - $mX, ($trMaxX - $trMinX + 1) + ($pad * 2))
$mH = [Math]::Min($bmp.Height - $mY, ($trMaxY - $trMinY + 1) + ($pad * 2))

Extract-Transparent $bmp $mX $mY $mW $mH "$brandDir\nucleus-mark-black.png" $false
Extract-Transparent $bmp $mX $mY $mW $mH "$brandDir\nucleus-mark-white.png" $true
Write-Host "Created clean nucleus-mark-black.png and nucleus-mark-white.png"

# 2. Center horizontal Logo (mark + wordmark)
$cfMinX = 402; $cfMaxX = 963; $cfMinY = 320; $cfMaxY = 440
$fPadX = 10
$fPadY = 10
$fX = [Math]::Max(0, $cfMinX - $fPadX)
$fY = [Math]::Max(0, $cfMinY - $fPadY)
$fW = [Math]::Min($bmp.Width - $fX, ($cfMaxX - $cfMinX + 1) + ($fPadX * 2))
$fH = [Math]::Min($bmp.Height - $fY, ($cfMaxY - $cfMinY + 1) + ($fPadY * 2))

Extract-Transparent $bmp $fX $fY $fW $fH "$brandDir\neomagnesis-full-black.png" $false
Extract-Transparent $bmp $fX $fY $fW $fH "$brandDir\neomagnesis-full-white.png" $true
Write-Host "Created clean neomagnesis-full-black.png and neomagnesis-full-white.png"

# Save to public/logo.png
Copy-Item "$brandDir\neomagnesis-full-white.png" "c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\logo.png" -Force

# 3. Apple touch icon & Icon
$appleIcon = New-Object System.Drawing.Bitmap(180, 180, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($appleIcon)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 11, 13, 12))
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$r = 38
$rect = New-Object System.Drawing.Rectangle(0, 0, 180, 180)
$d = $r * 2
$path.AddArc($rect.X, $rect.Y, $d, $d, 180, 90)
$path.AddArc($rect.X + $rect.Width - $d, $rect.Y, $d, $d, 270, 90)
$path.AddArc($rect.X + $rect.Width - $d, $rect.Y + $rect.Height - $d, $d, $d, 0, 90)
$path.AddArc($rect.X, $rect.Y + $rect.Height - $d, $d, $d, 90, 90)
$path.CloseFigure()
$g.FillPath($brush, $path)

$pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 40, 44, 42), 2)
$g.DrawPath($pen, $path)

$markWhiteBmp = [System.Drawing.Bitmap]::FromFile("$brandDir\nucleus-mark-white.png")
$g.DrawImage($markWhiteBmp, 32, 32, 116, 116)
$g.Dispose()
$pen.Dispose()
$brush.Dispose()

$appleIcon.Save("c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\apple-touch-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$appleIcon.Save("c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\icon.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Favicon 32x32
$fav32 = New-Object System.Drawing.Bitmap(32, 32, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g32 = [System.Drawing.Graphics]::FromImage($fav32)
$g32.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g32.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g32.DrawImage($appleIcon, 0, 0, 32, 32)
$g32.Dispose()
$fav32.Save("c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\favicon-32x32.png", [System.Drawing.Imaging.ImageFormat]::Png)
$fav32.Save("c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\favicon.ico", [System.Drawing.Imaging.ImageFormat]::Icon)
$fav32.Dispose()
$appleIcon.Dispose()
$markWhiteBmp.Dispose()
Write-Host "Created clean favicon and apple-touch-icon"

# 4. OpenGraph 1200x630 & Twitter 1200x600
$ogBmp = New-Object System.Drawing.Bitmap(1200, 630, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$ogG = [System.Drawing.Graphics]::FromImage($ogBmp)
$ogG.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$ogG.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

$ogBgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 10, 11, 13))
$ogG.FillRectangle($ogBgBrush, 0, 0, 1200, 630)
$ogBgBrush.Dispose()

$ogPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 34, 38, 36), 2)
$ogG.DrawRectangle($ogPen, 1, 1, 1198, 628)
$ogPen.Dispose()

$whiteMark = [System.Drawing.Bitmap]::FromFile("$brandDir\nucleus-mark-white.png")
$ogG.DrawImage($whiteMark, 490, 120, 220, 204)
$whiteMark.Dispose()

$titleFont = New-Object System.Drawing.Font("Segoe UI", 42, [System.Drawing.FontStyle]::Bold)
$titleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 241, 239, 232))
$format = New-Object System.Drawing.StringFormat
$format.Alignment = [System.Drawing.StringAlignment]::Center
$ogG.DrawString("NEOMAGNESIS AI", $titleFont, $titleBrush, 600, 360, $format)

$subFont = New-Object System.Drawing.Font("Segoe UI", 21, [System.Drawing.FontStyle]::Regular)
$subBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 168, 172, 165))
$ogG.DrawString("Local-First Agentic AI Operating System", $subFont, $subBrush, 600, 440, $format)

$badgeFont = New-Object System.Drawing.Font("Segoe UI", 13, [System.Drawing.FontStyle]::Bold)
$badgeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 201, 137, 74))
$ogG.DrawString("EARLY ACCESS PREVIEW", $badgeFont, $badgeBrush, 600, 500, $format)

$titleFont.Dispose()
$titleBrush.Dispose()
$subFont.Dispose()
$subBrush.Dispose()
$badgeFont.Dispose()
$badgeBrush.Dispose()
$format.Dispose()
$ogG.Dispose()

$ogBmp.Save("c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\og-image.png", [System.Drawing.Imaging.ImageFormat]::Png)
$ogBmp.Save("c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\public\twitter-image.png", [System.Drawing.Imaging.ImageFormat]::Png)
$ogBmp.Dispose()
Write-Host "Created clean og-image.png and twitter-image.png"

$bmp.Dispose()
Write-Host "DONE: ALL ASSETS CREATED SUCCESSFULLY."
