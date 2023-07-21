# Posts App

An Angular 16 app that showcases best practices, from file structure to components and testing.

## Installation

Use npm to install dependencies.

```bash
npm install
```

## Usage

Running the application locally:

```bash
npm start
```

---

Running unit tests

```bash
npm run tests -- --code-coverage
```

## Decisions

- The feature is a separate module of its own. This is done to have a feature level encapsulation of all things required for the feature, such as components, services and modals.
- The state is managed with NgRx and is global. The reason for opting to use a state management library is to enable adding of more functionality easily. From previous commits, you can notice that the state for this app can still be managed with just RxJS subjects, without needing NgRx.
- The shared entities are separated into a module. This now contains components but can also include pipes, directives and models used acorss the application.

- Gotcha: The display of values in the cards is done with a hardcoded order of keys (still typed) since the reasoning behind the order is unclear. It is better to have a defined order rather than iterating over the keys which can be inconsistent between browsers.
