styling-common
==============

Common CSS/SASS styling to be shared across Rise Vision apps, widgets and components.

## Build CSS

```bash
gulp build
```

This will do several things in sequence:
1. Delete dist and tmp folder
2. Concat SASS files under each folder in src/scss, and save them in tmp/
3. Translate each newly generated SASS file under tmp/ into CSS, and save them under dist/css
4. Create a minified copy of each CSS file under dist/scss

And the end result is what you see under dist.

## Folder Structure under src/scss

Each folder under SCSS will have its own namesake CSS and minified CSS generated,
whose content will be a concatenation of all files under that folder.

For example, the build process will create rise.css and rise.css.min for folder
src/scss/rise, whose content will be from src/scss/rise/*.scss


## File Order

Continuing with the example above, If you have multiple files under src/scss/rise,
they will be compiled under alphanumerical order. In other words, if you wish to
put the content of specific files at the beginning of the generated CSS file,
prefix the file name with "0_". Prefix the second file with "1_", and so on.
