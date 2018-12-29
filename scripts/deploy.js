#!/usr/bin/env node
const path = require('path');
const logger = require('./logger');

const {
    cd,
    exec
} = require('shelljs');

const {
    compilerOptions: {
        outDir
    }
} = require('../tsconfig.json');

const projectRoot = path.join(__dirname, '..');


void function setWorkingDirectory() {
    const workingDir = path.join(projectRoot, outDir);
    logger.info(`Working Directory: ${workingDir}`);
    cd(projectRoot);
}();


void function deployToGoogleCloudAppEngine() {
    exec('npm run deploy', {}, (c, stdout, stderr) => {
        logger.info(stdout);
        if (c !== 0) {
            logger.error(stderr);
        }
    });
}();
