# redit

No-faff editing of rethinkdb documents in your $EDITOR of choice

__Vim__
```
export EDITOR=vim
npx @mtharrison/redit [db] [table] [id]

# make your changes and they'll be written to the db in real time
```

__VSCode__
```
export EDITOR="code -w -n"
npx @mtharrison/redit [db] [table] [id]

# make your changes and they'll be written to the db in real time
```

