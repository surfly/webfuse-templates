# What does this extension do?

## Summary 
This extension catches console messaging and writes it to the audit log. This can help with async support without needing to request a har file or screenshare the logs live

## Components 

### manifest.json
Specify the type of logs to send in the log_type variable

### content.js
Catches messages and sends them to the Audit log. Contains a method to send regular console message inside the active session also. 

## Key Settings
None

## Required Apps
Audit Log