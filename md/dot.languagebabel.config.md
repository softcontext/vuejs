For most projects, it is better to configure language-babel via project-based .languagebabel file properties which will override the package settings below.
See ".langeuagebabel Configuration" for more information on this behaviour.

```
{
  "disableWhenNoBabelrcFileInPath":   true,
  "projectRoot":                      true,
  "babelSourcePath":                  "",
  "babelTranspilePath":               "",
  "babelMapsPath":                    "",
  "createMap":                        false,
  "babelMapsAddUrl":                  true,
  "createTargetDirectories":          false,
  "transpileOnSave":                  false,
  "createTranspiledCode":             true,
  "keepFileExtension":                false,
  "suppressSourcePathMessages":       false,
  "suppressTranspileOnSaveMessages":  false
}
```

> Allow Local Override
If set this allows .languagebabel file properties to override the global package settings.

>  On Save
저장 시 트랜스파일링을 작업한다.

> Create Transpiled Code
If enabled together with `Transpile On Save` this will output JavaScript code to a .js file with the same prefix as the original. By using the `Babel Transpile Path` options it is possible to transpile to a different target directory. Not all files are candidates for transpilation as other settings can affect this.

> Disable When No Babelrc File In Path
Disables transpiler if no `.babelrc` files are found in the source file path.

> Suppress Transpile On Save Messages
Suppress all successful save messages. Errors are still notified.

> Suppress Source Path Messages
This is set by default so that when a file is saved that is outside the Babel Source Path directory no message is generated. This is particularly useful when you have mixed ES2015 and ES3-5 environment. ES2015 files can be placed inside a Babel Source Path where they will be transpiled and other files will not pop up annoying messages when being saved.

> Create Map
.map 파일을 생성한다.

> Babel Maps Add Url
If a source map is created using the `Create Map` option this allows a Url reference //# sourceURL=originalBabelSourcefile to be appended to the generated transpiled JavaScript file.

> Project Root ( only present in .languagebabel files)
A `.languagebabel` property that defines this directory is a project root. A project root would contain a node_modules folder with an optional babel-core as well as any plugins required.

> Babel Source Path, Babel Transpile Path and Babel Maps Path
/proj2/babelSource/dirBar/foo.es6 -> /proj2/lib/foo.js,/proj2/lib/foo.js.map
{
  "projectRoot":  true,
  "babelSourcePath": "babelSource/dirBar",
  "babelTranspilePath": "lib",
  "babelMapsPath": "lib"
}

> Create Target Directories
When enabled any target directories that do not exist will be created prior to a transpilation.

> Keep File Extension
Keeps the source filename extension as the target filename extension
