# Wa!

[![NPM version](https://badge.fury.io/js/wa.png)](http://badge.fury.io/js/wa)
[![David Status](https://david-dm.org/afc163/wa.png)](https://david-dm.org/afc163/wa)

A super convenience watch and upload tool.

Inspired by [wau](https://github.com/sorrycc/wau) and [sshkey](https://github.com/silentcloud/sshkey).

---

## Install

```bash
$ npm install wa -g
```

## Usage

### init the directory

```bash
$ wa init
```

![](https://i.alipayobjects.com/i/localhost/png/201404/2TdpJa1kNB.png)

### start to watch

```bash
$ wa
```

![](https://i.alipayobjects.com/i/localhost/png/201404/2Tdm9rfxIb.png)

### show config

```bash
$ wa info
```

![](https://i.alipayobjects.com/i/localhost/png/201404/2TdnHI3Vif.png)

### customize the ignore files

```bash
$ vi .wa
```

Edit the `ignores` field, which is a collection of `glob expressions`.

```json
{
  "host": "example.com",
  "path": "/path/to/",
  "username": "admin",
  "port": 22,
  "ignores": ["*.css"]
}
```

The wa config file is `.wa` in any directory which you want to watch. There is no global config.
