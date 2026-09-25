# Test Home Page
Write-Host "1. Testing GET / ..."
$resHome = Invoke-WebRequest -Uri "http://localhost:3005" -UseBasicParsing
Write-Host "Home Status: $($resHome.StatusCode), Length: $($resHome.Content.Length)"

# Test Early Access Registration
Write-Host "`n2. Testing POST /api/early-access (New registration) ..."
$body1 = @{
    name = "Elena Rostova"
    username = "erostova"
    email = "elena.test@neomagnesis.local"
} | ConvertTo-Json

$resReg = Invoke-RestMethod -Uri "http://localhost:3005/api/early-access" -Method Post -Body $body1 -ContentType "application/json"
Write-Host "Registration Response: $($resReg | ConvertTo-Json)"

# Test Duplicate Email Prevention
Write-Host "`n3. Testing Duplicate Email Prevention ..."
try {
    $resDupEmail = Invoke-RestMethod -Uri "http://localhost:3005/api/early-access" -Method Post -Body $body1 -ContentType "application/json"
    Write-Host "Unexpected Success on Dup Email"
} catch {
    Write-Host "Expected Duplicate Email Rejection: $($_.Exception.Message)"
}

# Test Duplicate Username Prevention
Write-Host "`n4. Testing Duplicate Username Prevention ..."
$body2 = @{
    name = "Different Person"
    username = "erostova"
    email = "different@neomagnesis.local"
} | ConvertTo-Json
try {
    $resDupUser = Invoke-RestMethod -Uri "http://localhost:3005/api/early-access" -Method Post -Body $body2 -ContentType "application/json"
    Write-Host "Unexpected Success on Dup Username"
} catch {
    Write-Host "Expected Duplicate Username Rejection: $($_.Exception.Message)"
}

# Test CSV contents
Write-Host "`n5. Current CSV Rows:"
Get-Content "c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\data\early-access-registrations.csv"

# Test Delete Registration Flow
Write-Host "`n6. Testing POST /api/delete-registration ..."
$delBody = @{
    email = "elena.test@neomagnesis.local"
} | ConvertTo-Json
$resDel = Invoke-RestMethod -Uri "http://localhost:3005/api/delete-registration" -Method Post -Body $delBody -ContentType "application/json"
Write-Host "Delete Response: $($resDel | ConvertTo-Json)"

# Verify CSV after deletion
Write-Host "`n7. CSV Rows after deletion (should NOT contain elena):"
Get-Content "c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\data\early-access-registrations.csv"

Write-Host "`nAll automated backend checks completed."
