# TechFlow App

## Descripción

Aplicación web moderna construida con tecnologías de vanguardia.

## Requisitos del Sistema

- Node.js (versión 16 o superior)
- npm o yarn o pnpm
- Git

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/BrennisC/techflow-app.git
cd techflow-app
```

2. Instala las dependencias:

```bash
cd root-shell
```

```bash
git clone https://github.com/BrennisC/techflow-app.git
cd techflow-app

```

2. Instala las dependencias:

```bash
cd root-shell

yarn install
# para poder correr los scripts de este proyecto
yarn start
```

3. Para poder crear una microfront-end en single-spa ejecuta:

```bash
yarn create single-spa

? Directory for new project root-shell
? Select type to generate single-spa root config
? Which package manager do you want to use? yarn
? Will this project use Typescript? Yes
? Would you like to use single-spa Layout Engine Yes
? Organization name (can use letters, numbers, dash or underscore) techflow
Initialized empty Git repository in C:/practica/techflow-app/root-shell/.git/
```

4. Crear app derivada (microfront-end):

```bash
yarn create single-spa
? Directory for new project apps/mfe-navbar
? Select type to generate single-spa application / parcel
? Which framework do you want to use? react
? Which package manager do you want to use? yarn
? Will this project use Typescript? Yes
? What module format should this microfrontend be bundled to? esm
? Organization name (can use letters, numbers, dash or underscore) techflow
? Project name (can use letters, numbers, dash or underscore) navbar
Initialized empty Git repository in C:/practica/techflow-app/apps/mfe-navbar/.git/

```

5. Para correr la app principal (root-shell):

```bash
yarn start
```

5. Para correr la app principal (app standalone):

```bash
yarn start:standalone
```
