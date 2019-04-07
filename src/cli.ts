#!/usr/bin/env node
import commander from 'commander';
import {resolve} from 'path';
import {processYaml, processYamlFile} from './process';
import {writeFileSync} from 'fs';


const parseArgs = (): void => {
    commander
        .option('-i --input [path]', 'Input yaml file')
        .option('-o --output <path>', 'Output yaml file')
        .parse(process.argv);
}

const writeToOutputFile = (data: string): void => {
    const absoluteOutputFilePath = resolve(process.cwd(), commander.output);
    writeFileSync(absoluteOutputFilePath, data, 'utf8');
}

const writeToStdout = (data: string): void => {
    process.stdout.write(data);
}

const processInputFile = (): string => {
    const absoluteInputFilePath = resolve(process.cwd(), commander.input);
    return processYamlFile(absoluteInputFilePath);
}

const main = (): void => {
    parseArgs();
    const processedYaml = processInputFile();
    if (commander.output) {
        writeToOutputFile(processedYaml);
    } else {
        writeToStdout(processedYaml);
    }
}

main();
