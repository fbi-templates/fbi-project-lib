# fbi-project-lib

javascript library template

> This is a fbi project template. If you haven't installed [fbi](https://github.com/AlloyTeam/fbi) yet, use the following command to install.
>
> `$ npm i -g fbi` or `yarn global add fbi`

## Requirements

- `fbi v3.0+`
- `node v7.6+`

## Usage

**1. Add template**

```bash
$ fbi add https://github.com/fbi-templates/fbi-project-lib.git  
```

**2. Create a project**

```bash
$ cd path/to/workspace
$ fbi init -o lib my-lib  
```

**3. Run a task**

```bash
$ fbi <task> [params]
```

others:

**Update template**

```bash
$ fbi up lib  
```

**Update options**

```bash
$ fbi init -o  
```

**Show available tasks**

```bash
$ fbi ls
```

## Tasks

### `watch`

- Description: watch files change and compile.
- Params:
  - `name` `{string}` bundle targets(`./fbi/options.js->builds`)
- Alias: `w`
- Examples:
  - `fbi w`
  - `fbi w --name=target1`
  - `fbi w --name=target1,target2,...`

### `build`

- Description: Build the project on production mode.
- Params:
  - `name` `{string}` bundle targets(`./fbi/options.js->builds`)
- Alias: `p`
- Examples:
  - `fbi p`
  - `fbi p --name=target1`
  - `fbi p --name=target1,target2,...`

## More

- [fbi](https://github.com/AlloyTeam/fbi)
- [Official templates](https://github.com/fbi-templates)
- [fbi documentation](https://neikvon.gitbooks.io/fbi/content/)

## License

[MIT](https://opensource.org/licenses/MIT)

## Changelog

- **2.0.0** (2018.06.28)

  - replace `rollup` with `webpack` 

- **1.0.5** (2018.06.27)

  - add peer dependencies of `eslint-config-standard`

- **1.0.4** (2018.06.27)

  - support 'web worker': `import MyWorker from 'worker!./my-worker.js'`
  - support file copy: `./fbi/options.js->copy`

- **1.0.3** (2018.06.27)

  - support turn on/off `uglify` for each build

- **1.0.2** (2018.06.27)

  - update readme

- **1.0.1** (2018.06.27)

  - add `.editorconfig` file

- **1.0.0** (2018.06.27)
  - init
