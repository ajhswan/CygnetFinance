module.exports = {
    "roots": [
        "./"
    ],
    "testMatch": [
        "**/__tests__/**/*.+(js)",
        "**/?(*.)+(spec|test).+(js)"
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
