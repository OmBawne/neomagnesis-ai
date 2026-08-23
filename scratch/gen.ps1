Add-Type -AssemblyName System.Drawing;

function Render-Icon([int]$s, [string]$p) {
    $b = New-Object System.Drawing.Bitmap $s, $s
    $g = [System.Drawing.Graphics]::FromImage($b)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.Clear([System.Drawing.Color]::Transparent)
    
    $sc = $s / 100.0
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    
    $p1 = New-Object System.Drawing.PointF (18*$sc), (18*$sc)
    $p2 = New-Object System.Drawing.PointF (34*$sc), (18*$sc)
    $p3 = New-Object System.Drawing.PointF (82*$sc), (66*$sc)
    $p4 = New-Object System.Drawing.PointF (82*$sc), (18*$sc)
    $p5 = New-Object System.Drawing.PointF (98*$sc), (18*$sc)
    $p6 = New-Object System.Drawing.PointF (98*$sc), (82*$sc)
    $p7 = New-Object System.Drawing.PointF (82*$sc), (82*$sc)
    $p8 = New-Object System.Drawing.PointF (34*$sc), (34*$sc)
    $p9 = New-Object System.Drawing.PointF (34*$sc), (82*$sc)
    $p10 = New-Object System.Drawing.PointF (18*$sc), (82*$sc)
    
    $pts = [System.Drawing.PointF[]]($p1, $p2, $p3, $p4, $p5, $p6, $p7, $p8, $p9, $p10)
    $path.AddPolygon($pts)
    
    $r = New-Object System.Drawing.Rectangle 0, 0, $s, $s
    $br = New-Object System.Drawing.Drawing2D.LinearGradientBrush $r, ([System.Drawing.Color]::FromArgb(255,79,70,229)), ([System.Drawing.Color]::FromArgb(255,139,92,246)), 45
    $g.FillPath($br, $path)
    
    $b.Save($p, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $b.Dispose()
}

function Render-Logo([int]$w, [int]$h, [string]$p) {
    $b = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($b)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.Clear([System.Drawing.Color]::Transparent)
    
    $icSize = 64
    $sc = $icSize / 100.0
    $offY = ($h - $icSize) / 2
    $offX = 10
    
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $p1 = New-Object System.Drawing.PointF ($offX + 18*$sc), ($offY + 18*$sc)
    $p2 = New-Object System.Drawing.PointF ($offX + 34*$sc), ($offY + 18*$sc)
    $p3 = New-Object System.Drawing.PointF ($offX + 82*$sc), ($offY + 66*$sc)
    $p4 = New-Object System.Drawing.PointF ($offX + 82*$sc), ($offY + 18*$sc)
    $p5 = New-Object System.Drawing.PointF ($offX + 98*$sc), ($offY + 18*$sc)
    $p6 = New-Object System.Drawing.PointF ($offX + 98*$sc), ($offY + 82*$sc)
    $p7 = New-Object System.Drawing.PointF ($offX + 82*$sc), ($offY + 82*$sc)
    $p8 = New-Object System.Drawing.PointF ($offX + 34*$sc), ($offY + 34*$sc)
    $p9 = New-Object System.Drawing.PointF ($offX + 34*$sc), ($offY + 82*$sc)
    $p10 = New-Object System.Drawing.PointF ($offX + 18*$sc), ($offY + 82*$sc)
    
    $pts = [System.Drawing.PointF[]]($p1, $p2, $p3, $p4, $p5, $p6, $p7, $p8, $p9, $p10)
    $path.AddPolygon($pts)
    
    $r = New-Object System.Drawing.Rectangle $offX, $offY, $icSize, $icSize
    $br = New-Object System.Drawing.Drawing2D.LinearGradientBrush $r, ([System.Drawing.Color]::FromArgb(255,79,70,229)), ([System.Drawing.Color]::FromArgb(255,139,92,246)), 45
    $g.FillPath($br, $path)
    
    $tX = $offX + $icSize + 16
    $fSize = 22.0
    $fontStyle = [System.Drawing.FontStyle]::Bold
    $font = New-Object System.Drawing.Font 'Segoe UI', ([float]$fSize), $fontStyle
    $tBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
    $g.DrawString('NEOMAGNESIS', $font, $tBrush, ([float]$tX), ([float](($h - $fSize * 1.5) / 2)))
    
    $tMeas = $g.MeasureString('NEOMAGNESIS', $font)
    $aiX = $tX + $tMeas.Width + 8
    $aiH = 26
    $aiW = 38
    $aiY = ($h - $aiH) / 2
    
    $aiR = New-Object System.Drawing.RectangleF $aiX, $aiY, $aiW, $aiH
    $aiBr = New-Object System.Drawing.Drawing2D.LinearGradientBrush $aiR, ([System.Drawing.Color]::FromArgb(255,99,102,241)), ([System.Drawing.Color]::FromArgb(255,139,92,246)), 45
    
    $aiP = New-Object System.Drawing.Drawing2D.GraphicsPath
    $rad = 6
    $aiP.AddArc($aiX, $aiY, $rad*2, $rad*2, 180, 90)
    $aiP.AddArc($aiX + $aiW - $rad*2, $aiY, $rad*2, $rad*2, 270, 90)
    $aiP.AddArc($aiX + $aiW - $rad*2, $aiY + $aiH - $rad*2, $rad*2, $rad*2, 0, 90)
    $aiP.AddArc($aiX, $aiY + $aiH - $rad*2, $rad*2, $rad*2, 90, 90)
    $aiP.CloseFigure()
    $g.FillPath($aiBr, $aiP)
    
    $aiFont = New-Object System.Drawing.Font 'Segoe UI', ([float]11.0), $fontStyle
    $aiFmt = New-Object System.Drawing.StringFormat
    $aiFmt.Alignment = [System.Drawing.StringAlignment]::Center
    $aiFmt.LineAlignment = [System.Drawing.StringAlignment]::Center
    $g.DrawString('AI', $aiFont, $tBrush, $aiR, $aiFmt)
    
    $b.Save($p, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $b.Dispose()
}

Render-Icon 512 'public/icon.png'
Render-Icon 512 'app/icon.png'
Render-Icon 180 'public/apple-touch-icon.png'
Render-Icon 64 'public/favicon.ico'
Render-Logo 420 100 'public/logo.png'
Write-Output 'PNG and ICO assets generated successfully!'
