import {Type, Schema, load, dump} from 'js-yaml';
import {resolve, dirname} from 'path'
import {readFileSync} from 'fs';

class IncludeType extends Type {
    private workingDir: string;
    constructor(workingDir: string) {
        super('!include', {
            kind: 'scalar',
            construct: (data) => {
                const absolutePath = resolve(this.workingDir, data)
                const loadedYaml = readFileSync(absolutePath, 'utf8');
                const nextWorkingDir = dirname(absolutePath);
                return load(loadedYaml, {schema: createSchema(nextWorkingDir)})
            }
        });
        this.workingDir = workingDir;
    }
}

class ExtractType extends Type {
    constructor() {
        super('!extract', {
            kind: 'sequence',
            construct: ([obj, ...keys]) => {
                return keys.reduce((acc: any, key: string|number) => {
                    return acc[key];
                }, obj)
            }
        })
    }
}

const createSchema = (workingDir: string) =>
    Schema.create([
        new IncludeType(workingDir),
        new ExtractType()
    ]);


/**
 * Process yaml
 * @param yaml 
 * @param workingDir An absolute path that is used to resolve relative paths in !include tags inside the passed yaml
 * @returns The processed yaml
 */
export const processYaml = (yaml: string, workingDir: string): string =>
    dump(load(yaml, {schema: createSchema(workingDir)}));

/**
 * Process yaml file
 * @param path Absolute path to the yaml file that should be processed
 * @returns The processed yaml
 */
export const processYamlFile = (path: string): string =>
    processYaml(readFileSync(path, 'utf8'), dirname(path))
