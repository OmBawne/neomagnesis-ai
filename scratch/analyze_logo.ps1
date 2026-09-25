Add-Type -AssemblyName System.Drawing

$imgFile = "C:\Users\HP\.gemini\antigravity-ide\brain\baffcf00-0906-4989-8d43-d3a80ec51612\.user_uploaded\media_1789709268006.jpg"
$bmp = New-Object System.Drawing.Bitmap($imgFile)
Write-Host "Dimensions: $($bmp.Width) x $($bmp.Height)"

# Find the bounding box of the dark container in the bottom center ("WHITE VERSION")
# Background of the dark container is approximately #333333 or similar dark gray.
$minX = 9999; $maxX = 0; $minY = 9999; $maxY = 0;
for ($y = 450; $y -lt 750; $y++) {
    for ($x = 300; $x -lt 650; $x++) {
        $c = $bmp.GetPixel($x, $y)
        # dark box background is around RGB(40..60, 40..60, 40..60)
        if ($c.R -lt 70 -and $c.G -lt 70 -and $c.B -lt 70) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
Write-Host "Dark container bounds: minX=$minX, maxX=$maxX, minY=$minY, maxY=$maxY"

# Let's find the white nucleus loop inside this dark box
$wMinX = 9999; $wMaxX = 0; $wMinY = 9999; $wMaxY = 0;
for ($y = $minY; $y -le $maxY; $y++) {
    for ($x = $minX; $x -le $maxX; $x++) {
        $c = $bmp.GetPixel($x, $y)
        # White mark has high brightness
        if ($c.R -gt 200 -and $c.G -gt 200 -and $c.B -gt 200) {
            if ($x -lt $wMinX) { $wMinX = $x }
            if ($x -gt $wMaxX) { $wMaxX = $x }
            if ($y -lt $wMinY) { $wMinY = $y }
            if ($y -gt $wMaxY) { $wMaxY = $y }
        }
    }
}
Write-Host "White loop bounds: minX=$wMinX, maxX=$wMaxX, minY=$wMinY, maxY=$wMaxY, width=$($wMaxX - $wMinX), height=$($wMaxY - $wMinY)"

# Now find the center full logo: [Mark] Neomagnesis AI
# In the vertical band roughly y=300 to 480, x=350 to 970
$fMinX = 9999; $fMaxX = 0; $fMinY = 9999; $fMaxY = 0;
for ($y = 320; $y -lt 480; $y++) {
    for ($x = 400; $x -lt 970; $x++) {
        $c = $bmp.GetPixel($x, $y)
        # The background is off-white/light gray (~235-245), black text/mark is dark (<100)
        if ($c.R -lt 120 -and $c.G -lt 120 -and $c.B -lt 120) {
            if ($x -lt $fMinX) { $fMinX = $x }
            if ($x -gt $fMaxX) { $fMaxX = $x }
            if ($y -lt $fMinY) { $fMinY = $y }
            if ($y -gt $fMaxY) { $fMaxY = $y }
        }
    }
}
Write-Host "Center full logo bounds: minX=$fMinX, maxX=$fMaxX, minY=$fMinY, maxY=$fMaxY, width=$($fMaxX - $fMinX), height=$($fMaxY - $fMinY)"

# Also find the mark portion of the center full logo:
# The mark is on the left side of this band:
$fmMinX = 9999; $fmMaxX = 0; $fmMinY = 9999; $fmMaxY = 0;
for ($y = 320; $y -lt 480; $y++) {
    for ($x = $fMinX; $x -lt $fMinX + 120; $x++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -lt 120 -and $c.G -lt 120 -and $c.B -lt 120) {
            if ($x -lt $fmMinX) { $fmMinX = $x }
            if ($x -gt $fmMaxX) { $fmMaxX = $x }
            if ($y -lt $fmMinY) { $fmMinY = $y }
            if ($y -gt $fmMaxY) { $fmMaxY = $y }
        }
    }
}
Write-Host "Center mark bounds: minX=$fmMinX, maxX=$fmMaxX, minY=$fmMinY, maxY=$fmMaxY, width=$($fmMaxX - $fmMinX), height=$($fmMaxY - $fmMinY)"

# Top right "THE NUCLEUS LOOP" mark bounds:
# roughly y=100 to 320, x=580 to 860
$trMinX = 9999; $trMaxX = 0; $trMinY = 9999; $trMaxY = 0;
for ($y = 120; $y -lt 320; $y++) {
    for ($x = 580; $x -lt 860; $x++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -lt 120 -and $c.G -lt 120 -and $c.B -lt 120) {
            if ($x -lt $trMinX) { $trMinX = $x }
            if ($x -gt $trMaxX) { $trMaxX = $x }
            if ($y -lt $trMinY) { $trMinY = $y }
            if ($y -gt $trMaxY) { $trMaxY = $y }
        }
    }
}
Write-Host "Top-right large mark bounds: minX=$trMinX, maxX=$trMaxX, minY=$trMinY, maxY=$trMaxY, width=$($trMaxX - $trMinX), height=$($trMaxY - $trMinY)"

$bmp.Dispose()
