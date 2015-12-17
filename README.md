Console choker
==============

[![build status](https://api.travis-ci.org/emyk/console-choker.svg?branch=master)](https://travis-ci.org/emyk/console-choker)

A utility for choking the javascript console. Any suppressed output can be printed when restoring the console.

```js
npm install --save console-choker
```

```js
import consoleChoker from 'console-choker';

consoleChoker.start();

// actions triggering console output

consoleChoker.flush();
```