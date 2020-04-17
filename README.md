# YayNay

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Introduction
YayNay is a simple voting app for organizations to hold votes during meetings. It will allow the chairperson to set up votes and allow their members to vote and see the results in real-time. The system will also keep track of all of the votes done in the past. Currently, the main voting method will be a simple yay, nay, or abstain voting but in the future, more voting methods such as STV or D'Hondt will be available for larger elections.

## Update(April 15, 2020)
Decided to get rid of any user system on the platform and decided it to be more question based like When2Meet.

## Current Abilities
1. Create question and place a password on questions before answering.
2. Vote on the questions and see who has voted how.
3. Random John Bercow quotes will appear at the bottom because why not. :man-shrugging:

## Dependencies
1. [LeanCloud](leancloud.app) for object storage, web hosting, and cloud functions. Note that while we’re using the Developer Plan of LeanCloud (which is free), the cloud can only handle 30,000 requests per day. However, this is totally sufficient for the purpose of this app.
2. [Vue.js](vuejs.org) as the front-end framework.
3. [Vue Router](router.vuejs.org) for crunching multiple views into a single-page app.
4. [Vuex](vuex.vuejs.org) for managing global states.
5. [math.js](https://mathjs.org/) for basic math functions such as rounding and random numbers.
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
1. Add some constraint on the voting component. 

## Gratitude
Special thanks to [Fuchen Shi](https://github.com/shifuchen98/) for the basis of this Readme as well as the basic design of this website.
