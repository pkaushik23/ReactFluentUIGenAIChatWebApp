# ReactFluentStarter
Starter project for starting front end development with React and Fluent Ui library.


- [Setup Steps using VITE](#Steps)
- [Add Fluent Library](#Fluent)
- [VITE Instruction](#VITE_Instruction)

## <a id="Steps"></a>Steps
- Using VITE to start the react project.

    - Command:  ```_npm create vite@latest_```
    - Choose Project Name
    - Choose FWK as ```React```
    - Choose variant as ```TypeScript + SWC```


```
  npm install
  npm run dev
```

---------

# <a id="Fluent"></a>Add Fluent ###
https://react.fluentui.dev/?path=/docs/concepts-developer-quick-start--page
- ```npm i @fluentui/react-components```

-------------
-------------

# <a id="VITE_Instruction"></a>React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

-----------
## Trail

1. Integrate FluentUI
2. Enable Routing
3. useNavigateHook




