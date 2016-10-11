# Generate Release notes from GitHub repositories

[![Build Status](https://travis-ci.org/joaopapereira/release_notes.svg?branch=master)](https://travis-ci.org/joaopapereira/release_notes?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

This application allow the user to generate a release note using all the
PRs for a specific repository since a specific date.

# Features:

1. Collect all PR's since a specific date
1. Check if the title of the PR
  1. If can find a title similar to
    * Closes testing/test#10
    * Closes #10
    1. Try to retrieve the Issues associated with that PR and uses the Issue Title as the title
  2. If not uses the title of the PR
2. List all the changes

# Warning:
The application is not using GitHub token, so you can only do 60 Request/Hour

# Thank You

The code was created based on the starter kit: https://github.com/davezuko/react-redux-starter-kit
