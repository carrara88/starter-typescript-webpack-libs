# starter-typescript-webpack-libs

## Step 1: Setting Up the Development Environment

First, we'll create a new project folder and initialize it with npm, Node.js's package manager.

This step sets up the groundwork for managing our project's dependencies.

```bash
mkdir starter-typescript-webpack-libs
cd starter-typescript-webpack-libs
```

## Step 2: Installing Dependencies

Next, we install TypeScript, Webpack, and other necessary development tools.

TypeScript is a superset of JavaScript that allows for static typing, while Webpack is a powerful module bundler that helps in bundling your assets, scripts, images, and styles.

```bash
npm init -y
npm install typescript webpack webpack-cli ts-loader html-webpack-plugin webpack-dev-server
copy-webpack-plugin --save-dev
```



## Step 3: Configuring `package.json`

To streamline our development workflow, we'll add custom scripts to our `package.json`.
These scripts will allow us to start a development server, compile our project in development mode, and build our project for production with simple commands.

Configure `package.json`:

```json
{
  "main": "dist/bundle.js",
  "private": true,
  "scripts": {
    "dev": "webpack serve --mode=development --open",
    "start": "webpack serve --mode=production --open",
    "build": "webpack --mode=production"
  }
}
```

## Step 4: Init TypeScript and Webpack

After installing the necessary tools, we'll set up TypeScript and Webpack. 

This involves creating configuration files that define how our TypeScript code is compiled and how our project is bundled.

```bash
npx tsc --init
```

## Step 5: Configuring TypeScript
In the `tsconfig.json` file, the `baseUrl` and `paths` options work together to set up custom module resolution paths. 
This is particularly useful in large projects to simplify imports and manage dependencies more efficiently.

- `baseUrl`: This option sets the base directory relative to which path mappings specified in paths are resolved. If `baseUrl` is set to `.`, it means that the base directory is the same as the directory containing the `tsconfig.json` file.

- `paths`: This option, used in conjunction with `baseUrl`, allows you to define aliases for various directories or set up specific paths for modules. For example, if you have a libs directory that contains custom libraries, you can map it so that TypeScript knows where to look for these modules when they are imported in your code. The `"*": ["node_modules/*", "libs/*"]` mapping tells TypeScript that it can look in both node_modules and libs directories for modules that are imported anywhere in your project.

Edit TypeScript configuration file `tsconfig.json` importing path `libs/*` to compiler as custom node module:

```json
{
  "compilerOptions": {
    "target": "es2016", /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "module": "commonjs", /* Specify what module code is generated. */
    "esModuleInterop": true, /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "forceConsistentCasingInFileNames": true, /* Ensure that casing is correct in imports. */
    "strict": true, /* Enable all strict type-checking options. */
    "skipLibCheck": true, /* Skip type checking all .d.ts files. */
    "baseUrl": ".",
    "paths": {
      "*": ["node_modules/*", "libs/*"]
    }
  },
  
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "**/*.spec.ts"
  ]
}
```

## Step 6: Configuring Webpack

Create `webpack.config.js`

```bash
touch webpack.config.js
```

Now, edit `webpack.config.js` in the root of your project and input the following configuration:

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: 'development', // 'production'
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'libs')],
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9001,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new CopyWebpackPlugin({
        patterns: [
            { from: 'assets', to: 'assets', force: true },
        ],
      })
  ],
};
```

## Step 7: Organizing the Project Structure

Organizing your project's directory structure is crucial for maintainability and scalability. We'll set up a basic structure with a source directory for our TypeScript code, a distribution directory for the bundled output, and an HTML file to serve our project.

```bash
mkdir src
mkdir assets
mkdir libs
touch src/index.ts assets/styles.css index.html
```

Edit `index.html` and `assets/styles.css` as follows:

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>starter-typescript-webpack-libs</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>

</body>
</html>
```

```css
/* assets/styles.css */
body { 
    font: 11px helvetica neue, helvetica, arial, sans-serif;
}
```

Edit `src/index.ts` as follow:

```typescript
/* src/index.ts */
document.addEventListener('DOMContentLoaded', function () {
  document.body.innerHTML = "starter-typescript-webpack-libs project is compiled";
});
```

## Step 8: Custom project libraries `/libs/*`

Each library within the libs/ directory can be developed, built, and managed somewhat independently. This modular setup allows for a clear separation of concerns, making it easier to develop, debug, and maintain different parts of your application. For instance, if you have a custom diagram library and a utility library within libs/, each can have its own package.json, dependencies, and build scripts. This modularity promotes reusability and can significantly speed up development in projects that consist of multiple, loosely coupled components.


Create all project libraries under `libs/*` like `libs/<my-node-lib>`.
You can create an indipendent typescript library project with custom `libs/<my-node-lib>/package.json`:

```json
{
  "name": "<my-node-lib>",
  "main": "dist/index.js",
  "scripts": {
    "dev":"npx tsc -w",
    "start":"npx tsc",
    "build": "npx tsc"
  },
  "devDependencies": {
    "typescript": "^5.3.3"
  }
}

```

With a custom `libs/<my-node-lib>/tsconfig.json`:

```json
{
  "compilerOptions": {
    /* Language and Environment */
    "target": "es2016", /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    /* Modules */
    "module": "commonjs", /* Specify what module code is generated. */
    /* Emit */
    "outDir": "./dist", /* Specify an output folder for all emitted files. */
    /* Interop Constraints */
    "esModuleInterop": true, /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "forceConsistentCasingInFileNames": true, /* Ensure that casing is correct in imports. */
    /* Type Checking */
    "strict": true, /* Enable all strict type-checking options. */
    /* Completeness */
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  }
}
```

An entity `src/lib.Factory.ts` like:

```typescript
/* libs/<my-node-lib>/src/lib.Factory.ts */
export interface Factory { //replace with your library entity
  // here some library functions
}
```

and export library entities on `libs/<my-node-lib>/index.ts` like:

```typescript
/* libs/<my-node-lib>/index.ts */
import * as Factory from './src/lib.factory' // import factory entity

export let MyNodeLib = { 
    Factory // export factory entity
};
```

Also, remember to build your project libraries with:

```bash
cd libs/<my-node-lib>
npm run build       # Build for production
```

## Step 9: First run of the Project

Finally, we'll test our setup by running our project.
This includes starting the development server to preview our project in real-time, compiling our project in development mode to test changes, and building our project for production deployment.

The `package.json` scripts section defines shorthand commands that trigger specific development tasks:

- dev: This script, typically `webpack serve --mode=development --open`, starts a development server and opens the application in a web browser. It's meant for development purposes, enabling features like hot module replacement (HMR) for real-time updates as you modify your code. The --mode=development flag ensures that Webpack compiles the code in development mode, which is faster and includes more helpful debugging information.

- start: Similar to dev, but it's often configured to mimic production environments more closely. This might involve additional optimizations or environment-specific configurations. The `--mode=production` flag compiles the code with optimizations for performance, such as minification and tree shaking, to ensure the application runs efficiently.

- build: This script, webpack `--mode=production`, compiles the application for production deployment. It includes all necessary optimizations to ensure the code is as efficient and compact as possible. The resulting output in the dist directory is ready to be deployed to a production server.


```bash
npm run dev         # Compile in development mode and serve webpack server
npm run start       # Compile in production mode and serve webpack server
npm run build       # Build for production
```

## Step 10: Create custom diagram library

Now we are ready to create our first cutsom project library: the `my_lib` library under `libs/my_lib` project folder.

### Step 10.1: Init library project environment

Create library folder under `libs/my_lib`, init project configurations for npm and typescript, install dependencies:

```bash
mkdir libs/my_lib
cd libs/my_lib
mkdir src
npm init -y
npx tsc --init
touch index.ts src/lib.factory.ts
npm install typescript --save-dev
```

Configure `package.json` 

```json
{
  "name": "my_lib",
  "main": "dist/index.js",
  "scripts": {
    "dev":"npx tsc -w",
    "start":"npx tsc",
    "build": "npx tsc"
  },
  "devDependencies": {
    "typescript": "^5.3.3"
  }
}

```

and `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es2016", /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "module": "commonjs", /* Specify what module code is generated. */
    "outDir": "./dist", /* Specify an output folder for all emitted files. */
    "esModuleInterop": true, /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "forceConsistentCasingInFileNames": true, /* Ensure that casing is correct in imports. */
    "strict": true, /* Enable all strict type-checking options. */
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  }
}
```

### Step 10.2: Create `libs/my_lib/index.ts` and `libs/my_lib/src/lib.factory.ts`

Following suggested pattern, library index `libs/my_lib/index.ts` will be like:

```typescript
/* libs/my_lib/index.ts */
import * as Factory from './src/lib.factory'

export { 
    Factory
};
```

And library entities exposed `src/lib.factory.ts` will be like:

```typescript
// libs/my_lib/src/lib.factory.ts
export function info() {
    return "lib.factory.info()" 
}

export function newFactory() {
    return new Factory();
}

export class Factory {
    public info = ()=>{ return "class Factory.info()" }
}
```

### Step 10.3: Compile your custom library

```bash
cd libs/my_lib
npm run build
```

### Step 10.4: Import custom library into main project

Edit main project `index.ts`and import the library:

```typescript
import * as my_lib from 'my_lib'
let factory = my_lib.Factory.newFactory();

document.addEventListener('DOMContentLoaded', function () {
  document.body.innerHTML = "starter-typescript-webpack-libs project is compiled";
  document.body.innerHTML += " with: " + my_lib.Factory.info();
  document.body.innerHTML += " and initialized Factory: " + factory.info();
  
});


```

## Step 11: Test the Project with custom libraries

Finally, we'll test our setup by running our project.
This includes starting the development server to preview our project in real-time, compiling our project in development mode to test changes, and building our project for production deployment.

```bash
npm run dev         # Compile in development mode and serve webpack server
npm run start       # Compile in production mode and serve webpack server
npm run build       # Build for production
```