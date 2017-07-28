# WTTJ 2 Pipedrive Chrome Extension

Parse WelcomeKit page, get candidate name, email and phone. Then send it to pipedrive (either as new contact or new deal).

## How to use it:

### Get Pipedrive infos

You will need

  * API token
  * Pipeline id of where you want to add deals
  * Pipeline stage id of where you want to add deals

Duplicate the `pipedriveToken.js.dist` as `pipedriveToken.js` and fill the infos.

### Install it

Go to `chrome://extensions`
Make sure the developer mode checkbox is checked.
Click the `Load unpacked extension` button
Load the folder where you cloned the project.

[Check out Google Chrome's guide if this is not clear](https://developer.chrome.com/extensions/getstarted#unpacked)
