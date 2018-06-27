# fbi-project-lib

javascript library template

> This is a fbi project template. If you haven't installed [fbi](https://github.com/AlloyTeam/fbi) yet, use the following command to install.
>
> `$ npm i -g fbi` or `yarn global add fbi`

## Requirements

- `fbi v3.0+`
- `node v7.6+`

## Usage

**Add the template**

```bash
$ fbi add https://github.com/fbi-templates/fbi-project-lib.git  
```

**Create a project**

```bash
$ cd path/to/workspace
$ fbi init -o lib my-lib  
```

**Show available tasks**

```bash
$ fbi ls
```

**Run a task**

```bash
$ fbi <task> [params]
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

- **1.0.1** (2018.06.27)
  - add `.editorconfig` file

- **1.0.0** (2018.06.27)
  - init
