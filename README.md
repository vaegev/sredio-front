# Untitled2

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Tailwind CSS

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling. Tailwind is a utility-first CSS framework that allows for rapid UI development.

### Configuration

Tailwind CSS is configured in the following files:

- `tailwind.config.js`: Contains the Tailwind configuration, including content paths, theme extensions, and plugins.
- `postcss.config.js`: Configures PostCSS to use Tailwind CSS and Autoprefixer.
- `src/styles.css`: Includes the Tailwind directives (@tailwind base, @tailwind components, @tailwind utilities).

### Usage

You can use Tailwind utility classes directly in your HTML templates. For example:

```html
<div class="p-4 bg-blue-100 rounded-lg shadow-md">
  <h1 class="text-2xl font-bold text-gray-800">Hello, Tailwind!</h1>
  <p class="mt-2 text-gray-600">This is styled using Tailwind CSS utility classes.</p>
</div>
```

For more information on using Tailwind CSS, visit the [Tailwind CSS Documentation](https://tailwindcss.com/docs).

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
