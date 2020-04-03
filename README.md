# YayNay

## Introduction
YayNay is a simple voting app for organizations to hold votes during meetings. It will allow the chairperson to set up votes and allow their members to vote and see the results in real-time. The system will also keep track of all of the votes done in the past. Currently, the main voting method will be a simple yay, nay, or abstain voting but in the future, more voting methods such as STV or D'Hondt will be available for larger elections.

## Current Abilities
1. Logging in and seeing a blank home page. :man_shrugging

## Dependencies
1. [LeanCloud](leancloud.app) for object storage, web hosting, and cloud functions. Note that while we’re using the Developer Plan of LeanCloud (which is free), the cloud can only handle 30,000 requests per day. However, this is totally sufficient for the purpose of this app.
2. [Vue.js](vuejs.org) as the front-end framework.
3. [Vue Router](router.vuejs.org) for crunching multiple views into a single-page app.
4. [Vuex](vuex.vuejs.org) for managing global states.
5. [Font-Awesome](fontawesome.com) for icons.

## Setting up Development Environment

### Installing Dependencies
```sh
npm install
```

The app will automatically compile after dependencies are installed.

### Running Locally

```sh
npm run serve
```

Note that this app doesn’t need LeanCloud’s command line interface to run locally.


## TODO
1. Create home page with a top navigation bar that allows user to go onto user management page and to log-out.
2. Start working on voting pages and changing views depening on user attributes. 
