module.exports = {
    "roots": [
        "./"
    ],
    "testMatch": [
        "**/__tests__/**/*.+(js|jsx)",
        "**/?(*.)+(spec|test).+(js|jsx)"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "verbose": true,
    "collectCoverage": true,
    "coverageDirectory": "./coverage",
    "coverageReporters": ["html"],
    "testEnvironment": "node"
}
