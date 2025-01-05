const os = require('os');
const fs = require('fs');
const path = require('path');

// Create a standardized file path for logs
const logDir = path.join(__dirname, 'logs');
const logFile = path.join(logDir, 'system-info.txt');

// Ensure the logs directory exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Fetch system information
const systemInfo = {
    osType: os.type(),
    totalMemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
    freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`,
    cpuDetails: os.cpus().map((cpu, index) => ({
        core: index + 1,
        model: cpu.model,
        speed: `${cpu.speed} MHz`
    }))
};

// Format the system information as a string
const systemInfoString = `
System Information:
--------------------
OS Type: ${systemInfo.osType}
Total Memory: ${systemInfo.totalMemory}
Free Memory: ${systemInfo.freeMemory}

CPU Details:
------------
${systemInfo.cpuDetails
    .map(cpu => `Core ${cpu.core}: ${cpu.model} @ ${cpu.speed}`)
    .join('\n')}
`;

// Display system information in the console
console.log(systemInfoString);

// Save system information to the log file
fs.writeFileSync(logFile, systemInfoString);

console.log(`System information saved to: ${logFile}`);
