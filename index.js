#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const CONSOLE = '!!console!!';

const ERROR = chalk.bold.red;
const WARNING = chalk.keyword('orange');
const FILE = chalk.bold.blue;
const DIRECTORY = chalk.bold.green;

const UPLINE = '|';
const BASEDIR = '├──';
const SUBDIR = '└──';
const SPACE = ' ';
const DOUBLE_SPACE = '  ';

if (process.argv.length > 4) {
  console.log(ERROR('Error too many arguments'));
} else if (process.argv.length === 4) {
  generateText(process.argv[2], process.argv[3]);
} else if (process.argv.length === 3) {
  generateText(process.argv[2], CONSOLE);
} else {
  generateText(process.cwd(), CONSOLE);
}

function generateText(directory, location, depth = 0) {
  const stats = fs.lstatSync(directory);
  if (stats.isFile()) {
    console.log(FILE(printDir(directory, depth, true)));
  } else {
    console.log(DIRECTORY(printDir(directory, depth)));
    const files = fs.readdirSync(directory);
    let dir = directory.split('/');
    if (dir[dir.length - 1] != 'node_modules' && dir[dir.length - 1].substr(0, 1) != '.') {
      files.forEach(val => {
        generateText(path.join(directory, val), location, depth + 1);
      });
    }
  }
}

function printDir(directory, depth, isFile = false) {
  let truncatedDir = directory.split('/');
  truncatedDir = truncatedDir[truncatedDir.length - 1];
  if (isFile) {
    if (depth === 0) {
      return `${BASEDIR} ${truncatedDir}`;
    } else {
      let str = UPLINE;
      for (let i = 0; i < depth; i++) {
        str += DOUBLE_SPACE + DOUBLE_SPACE;
      }
      return `${str}${BASEDIR} ${truncatedDir}`;
    }
  } else {
    if (depth === 0) {
      let dir = directory.split('/');
      return dir[dir.length - 1];
    } else {
      let str = UPLINE;
      for (let i = 0; i < depth; i++) {
        str += DOUBLE_SPACE + DOUBLE_SPACE;
      }
      return `${str}${SUBDIR} ${truncatedDir}`;
    }
  }
}
