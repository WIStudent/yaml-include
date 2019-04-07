import {processYaml, processYamlFile} from '../src/process';
import {readFileSync} from 'fs';
import {resolve} from 'path';

const projectRoot = resolve(__dirname, '../');

describe('process', () => {
    test('processYaml', () => {
        // Given
        const yaml = readFileSync(resolve(projectRoot, 'test/yaml-files/file1.yml'), 'utf8');
        const workingDir = resolve(projectRoot, 'test/yaml-files');
        const expectedYaml = readFileSync(resolve(projectRoot, 'test/yaml-files/expected.yml'), 'utf8');
        // When
        const processed = processYaml(yaml, workingDir);
        // Then
        expect(processed).toEqual(expectedYaml);
    });

    test('processYamlFile', () => {
        const path = resolve(projectRoot, 'test/yaml-files/file1.yml');
        const expectedYaml = readFileSync(resolve(projectRoot, 'test/yaml-files/expected.yml'), 'utf8');
        // When
        const processed = processYamlFile(path);
        // Then
        expect(processed).toEqual(expectedYaml);
    })
});
