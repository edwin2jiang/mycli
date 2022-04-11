#! /usr/bin/env node

const program = require('commander');
const fs = require('fs');
const { type } = require('os');
const path = require('path');

const dir = process.cwd()

program
    .version(require('../package.json').version)
    .usage('<path> [options]')
    .parse(process.argv);

if (program.args.length === 0) {
    console.log('No path specified');
    process.exit()
}

// console.log(program.args);

const filename = program.args[0];

// read the file
console.log('read it, ', path.join(process.cwd(), filename));

const filePath = path.join(process.cwd(), filename);

function createFileByRoute(routes, prefix = '') {
    for (let route of routes) {
        // console.log(route)

        if (route.children) {
            if (!fs.existsSync(path.join(dir, 'pages', prefix, route.name))) {
                fs.mkdirSync(path.join(dir, 'pages', prefix, route.name));
            }
            createFileByRoute(route.children, path.join(prefix, route.name));
        } // 递归调用

        if (!fs.existsSync(path.join(dir, 'pages', prefix, route.name + '.vue'))) {
            console.log('create file: ', path.join(dir, 'pages', prefix, route.name + '.vue'));
            fs.writeFileSync(path.join(dir, 'pages', prefix, route.name + '.vue'),
                `<script>\n\n</script>\n\n<template><div>${path.join(prefix, route.name + '.vue')}</div></template>\n\n<style scoped lang="scss">\n\n</style>`);
        }
    }
}

if (fs.existsSync(filePath)) {
    // convert js-object to json-string
    const { routes } = require(filePath)
    // 检测是否存在pages目录
    if (!fs.existsSync(path.join(dir, 'pages'))) {
        fs.mkdirSync(path.join(dir, 'pages'));
    }
    createFileByRoute(routes)
    console.log('all done');
}
else {
    console.log('file not found');
}