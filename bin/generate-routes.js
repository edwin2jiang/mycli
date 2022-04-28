#! /usr/bin/env node

// todo: fix the probelm


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
    console.log('No directory specified (generate-routes pages )');
    process.exit()
}

const folder = path.join(dir, program.args[0]);
let routes = []


function generateRoutes(folder, routes, prefix = '') {
    fs.readdir(folder, (err, files) => {

        files.forEach(file => {
            const name = path.parse(file).name;
            const isDirectory = path.parse(file).ext.length === 0;

            let template = {}

            if (isDirectory) {
                // 去除掉对应的.vue文件
                if (files.indexOf(name + '.vue') !== -1) {
                    files.splice(files.indexOf(name + '.vue'), 1);
                }
                template.path = `/${prefix}/${name}`;
                template.name = name;
                template.children = []
                // console.log(path.join(dir, folder, name), routes)

                console.log('dir', path.join(folder, name))
                routes.push(template)
                generateRoutes(path.join(folder, name), template.children, prefix)

            } else {
                template.path = `/${prefix}/${name}`;
                template.name = name;
                routes.push(template)
            }
        });

    });
}

async function main() {
    await generateRoutes(folder, routes)
    fs.writeFileSync('routes.config.generate.js', `const routes = ${JSON.stringify(routes)}`)
}

main()

