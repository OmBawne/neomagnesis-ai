# Test API routes directly by calling server logic
Add-Type -AssemblyName System.Net.Http

Write-Host "Verifying CSV registration logic..."
$csvPath = "c:\Users\HP\OneDrive\Desktop\Neomagnesis AI landing page\data\early-access-registrations.csv"
Get-Content $csvPath
