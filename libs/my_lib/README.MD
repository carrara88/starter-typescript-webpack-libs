# Project Library my_lib
This is my_lib project library used on main project.

## Compile the library

To compile the library into `libs/my_lib` use the npm script:

```bash
cd libs/my_lib
npm run build
```

## Include the library in your project

To include this library into main `index.ts` use `import * as` statement:

```typescript
import * as my_lib from 'my_lib'
console.log("imported lib: " + my_lib.Factory.info())
let factory = my_lib.Factory.newFactory();
console.log("initialized factory: " + factory.info())
```

## Useful library functions

Assuming you import the library as above (`import * as my_lib from 'my_lib'`), here some useful libary functions:

- my_lib.Factory : include factory object and functions
    - my_lib.Factory.info() : function to get factory library info
    - my_lib.Factory.newFactory() : build new Factory() object
        - my_lib.Factory.newFactory().info()  : build new Factory() object and get factory object info
