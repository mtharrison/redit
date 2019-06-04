#! /usr/bin/env node

const Chokidar = require('chokidar');
const ChildProcess = require('child_process');
const Fs = require('fs');
const Penseur = require('penseur');
const Tmp = require('tmp');

Tmp.setGracefulCleanup();

const [dbName, tbl, id] = process.argv.slice(2);

const spawn = (bin, args) => {

    return new Promise((resolve) => {

        const proc = ChildProcess.spawn(bin, args, { stdio: 'inherit' });
        proc.on('exit', (code) => resolve(code));
    });
};

const start = async () => {

    const db = new Penseur.Db(dbName, { host: 'localhost', port: 28015 });
    db.table(tbl);
    await db.connect();

    const obj = await db[tbl].get(id);
    if (!obj) {
        console.log('Record not found');
    }
    else {
        const tmp = Tmp.fileSync();
        Fs.writeFileSync(tmp.name, JSON.stringify(obj, null, 2));

        const watcher = Chokidar.watch(tmp.name, { persistent: false, usePolling: true });

        watcher.on('change', async () => {

            console.log('Got a change');

            const contents = Fs.readFileSync(tmp.name);
            const parsed = JSON.parse(contents.toString());
            await db[tbl].insert(parsed, { merge: 'replace' });

            console.log('Wrote update to database');
        });

        const args = process.env.EDITOR.split(' ');
        const code = await spawn(args[0], [...args.slice(1), tmp.name]);
        console.log(`Exited with code ${code}`);
    }

    await db.close();
};

start();
