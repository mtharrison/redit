# redit

No-faff editing of rethinkdb documents in your $EDITOR of choice

__Vim__
```
export EDITOR=vim
npx @mtharrison/redit [db] [table] [id - optional]

# make your changes and they'll be written to the db in real time
```

__VSCode__
```
export EDITOR="code -w -n"
npx @mtharrison/redit [db] [table] [id - optional]

# make your changes and they'll be written to the db in real time
```

**Caution:** If you omit the `id` parameter your editor will be opened in a directory containing a file per record of your chosen table. This can be useful but beware doing this for very large tables as it will first download all the records to your local machine.
