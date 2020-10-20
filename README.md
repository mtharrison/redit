# redit

No-faff editing of rethinkdb documents in your $EDITOR of choice

__Vim__
```
npm install -g redit
export EDITOR=vim
redit [db] [table] [id]

# make your changes and they'll be written to the db in real time
```

__VSCode__
```
npm install -g redit
export EDITOR="code -w -n"
redit [db] [table] [id]

# make your changes and they'll be written to the db in real time
```

