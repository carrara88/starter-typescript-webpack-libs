# my_lib Library
This is my_lib library sample package

## Compile the library

Compile the library into `libs/my_lib` with npm script:

```bash
cd libs/my_lib
npm run build
```

## Include the library in your project

Open main `index.ts` and include the library:

```typescript
import * as my_lib from 'my_lib'
console.log("imported lib: " + my_lib.Factory.info())
let factory = my_lib.Factory.newFactory();
console.log("initialized factory: " + factory.info())
```