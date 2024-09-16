#!/bin/bash

# File containing the target URL
echo "GET http://localhost:5500/api/role-access?roleId=bd2d62f9-a688-4259-8651-ac22a2b9795c" > targets.txt

# Initial rate
rate=10000
# Initial step to increase rate
step=10000
# Duration for each test
duration=5s
# Error threshold (in percentage)
error_threshold=0.1

while true; do
    echo ""
    echo "Testing with rate: $rate requests/second"
    
    # Run Vegeta attack and capture output
    output=$(vegeta attack -rate=$rate -duration=$duration -targets=targets.txt | vegeta report -type=text)
    
    # Extract success ratio
    success_ratio=$(echo "$output" | grep "Success.*ratio" | awk '{print $3}' | sed 's/%//')
    error_ratio=$(echo "100 - $success_ratio" | bc)
    
    if (( $(echo "$error_ratio <= $error_threshold" | bc -l) )); then
        echo "$output"
        echo "Error ratio ($error_ratio%) within threshold. Increasing rate."
        rate=$((rate + step))
    else
        echo "Error ratio ($error_ratio%) exceeded threshold. Final successful rate: $((rate - step)) requests/second"
        echo "Full report for the last run:"
        echo "$output"
        break
    fi
done
