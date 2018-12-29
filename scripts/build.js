#!/usr/bin/env node
const path = require('path');
const logger = require('./logger');

const {
    cp,
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
    const rootDirName = projectRoot.slice(projectRoot.lastIndexOf(path.sep) + 1, projectRoot.length);
    logger.info(`Working Directory: ${rootDirName}`);
    cd(projectRoot);
}();


void function compileTs() {
    logger.info('compiling project...');
    exec('npm run gcp-build');
}();


void function copyNecessaryFiles() {
    logger.info(`Copying app.yaml, package.json, and package-lock.json to: ${outDir}`);
    const dist = path.join(projectRoot, outDir);

    const appYaml = path.join(projectRoot, 'app.yaml');
    const packageJson = path.join(projectRoot, 'package.json');
    const packageLockJson = path.join(projectRoot, 'package-lock.json');
    cp(appYaml, dist);
    cp(packageJson, dist);
    cp(packageLockJson, dist);
}();
