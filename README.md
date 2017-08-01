# WTTJ 2 Pipedrive Chrome Extension

Parse WelcomeKit page, get candidate name, email and phone. Then send it to pipedrive (either as new contact or new deal).

## How to use it:

### Get Pipedrive infos

You will need

  * API token
    * RTFM [https://support.pipedrive.com/hc/en-us/articles/207344545](https://support.pipedrive.com/hc/en-us/articles/207344545)
  * Pipeline id of where you want to add deals
    * Go to pipedrive and find the id in the pipedrive url: `https://<company>.pipedrive.com/pipeline/<pipelineId>`
  * Your pipedrive CRM url, usually `https://<company>.pipedrive.com`
  * Pipeline stage id of where you want to add deals
    * Go to a deal in the correct stage
    * right click + inspect
    * Go to the network tab & refresh the page
    * Filter the requests by typing 'deal' in the filter field
    * One of the request should be like `<dealId_same_as_url_of_deal_page>?session_token=XXXXX`
    * Click on that request, and go to the preview tab
    * In data, find the stage_id number

### Clone the project

    cd projects
    git clone git@github.com:ToucanToco/wttj2pipedrive.git


### Fill the infos

Duplicate the `pipedriveToken.js.dist` as `pipedriveToken.js` and fill the infos.

    cd projects/wttj2pipedrive
    cp pipedriveToken.js.dist pipedriveToken.js

:warning: Do not commit the `pipedriveToken.js` file or you will be flogged.

Once the infos are filled, your `pipedriveToken.js` file should look something like this:


```javascript
var pipedriveApiToken = '12f3123123faeazrfdsdfser123123123q';
var pipedrivePipelineId = 3;
var pipedriveStageId = 10;
var pipedriveCRMUrl = 'https://toucantoco.pipedrive.com';
```

### Install it

* Go to `chrome://extensions`
* Make sure the developer mode checkbox is checked.
* Click the `Load unpacked extension` button
* Load the folder where you cloned the project.

[Check out Google Chrome's guide if this is not clear](https://developer.chrome.com/extensions/getstarted#unpacked)


### Package it

> Optional step!

Try the extension, if it works, you might want to package it and use the package version instead, so that you don't need to activate the extension when you restart chrome (not sure if that's still the case). [Follow Google's intruction for packaging](https://developer.chrome.com/extensions/packaging)

Then use the created `.crx` file and drag and drop it into chrome. Deactivate the unpacked extension and make sure the packed one is activated


### Use it !

When on a welcome to the jungle candidate appliction popup, click the extension!
