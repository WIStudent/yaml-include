# yaml-include
[![npm version](https://badge.fury.io/js/%40wistudent%2Fyaml-include.svg)](https://badge.fury.io/js/%40wistudent%2Fyaml-include)


This package adds the two custom tags `!include` and `extract` to yaml.

## `!include`
`!include path_to_another_yaml_file.yaml` allows you do insert the content of another yaml file into your current yaml file. The path can be an absolute path or relative to the file that contains the `!include` tag.

### Example
file1.yaml
```
contentOfFile2: !include file2.yaml
```
file2.yaml
```
someValue: 42
anotherValue: 'six times nine'
```
out.yaml
```
contentOfFile2:
  someValue: 42
  anotherValue: 'six times nine'
```

## `!extract`
`!extract [obj, key, subkey, subsubkey, ...]` allows you to extract a value from a given yaml object.

### Example
file3.yaml
```
valueWithKeyA0: !extract [{A: ['A0', 'A1', 'A2'], B: ['B0', 'B1', 'B2']}, A, 0]
```
out.yaml
```
valueWithKeyA0: 'A0'
```

## Combining `!extract` and `!include`
Combine `!extract` and `!include` to include arbitrary values from other yaml files

### Example
file4.yaml
```
valueFromFile5: !extract [!include file5.yaml, A, 1]
```
file5.yaml
```
A:
  - 'A0'
  - 'A1'
B:
  - 'B0'
  - 'B1'
```
out.yaml
```
valueFromFile5: 'A1'
```

## Usage
### Command line
```
yaml-include -i file-with-include-extract-tags.yaml -o processed-output-file.yaml
```
The output file argument is optional. If omitted, the resulting yaml will be printed to stdout.

### Library
This package provides two functions to process yaml containing the mentioned tags, `processYaml` and `processYamlFile`

#### `processYaml(yaml: string, workingDir: string): string`
This function expects the yaml that should be processed as first argument and the directory, that will be used to resolve relatives paths in !include tags, as the second argument. It returns the finished yaml.

#### `processYamlFile(path: string): string`
This function works similar to `processYaml`, but instead of taking the yaml directly, it takes a path to a file containing the yaml. Relative `!include` tags will be resolved relative to the file containing the tags.