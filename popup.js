var dealTitle = 'Candidat WTTJ';

var pipedriveApiBaseUrl = 'https://api.pipedrive.com/v1';
var request = window.superagent;

function createOrUpdatePipedrivePerson(method, url, data, cb) {
  var personId;
  request[method](url)
  .send(data)
  .end(function(err, res) {
    if (res.ok && res.body.success) {
      personId = res.body.data.id;
      if (method == 'put')
        console.log('Person with id ' + personId + ' updated');
      else if (method == 'post')
        console.log('Person added to pipedrive with id ' + personId);
      cb(personId);
    } else {
      console.log('Oh no! error creating or updateing user ' + res.text)
    }

  });

}

function addDealToPipedriveStage(personId, cb) {

  var title = dealTitle;
  var stageId = pipedriveStageId;
  var data = {
    stage_id: stageId,
    title: title,
    status: 'open',
    person_id: personId
  };

  request.post(pipedriveApiBaseUrl + '/deals?api_token=' + pipedriveApiToken)
  .send(data)
  .end(function(err, res){
    if (res.ok && res.body.success) {
      var dealId = res.body.data.id;
      console.log('Deal ' + dealId + 'added to stage ' + stageId)
      cb(dealId);
    } else {
      console.log('Oh no! error ' + res.text);
    }
  });
}

function addContact(contact, cb) {

  var personId, createUpdateUrl;

  if (!contact.fullname)
    return;
  var data = {
    name: contact.fullname,
    email: contact.email,
    phone: contact.phone
  };

  var personFindUrl = pipedriveApiBaseUrl + '/persons/find?term=' + data.name + '&api_token=' + pipedriveApiToken;

  request.get(personFindUrl)
  .end(function(err, res) {
    if (res.ok && res.body.data && res.body.data.length > 0) {
      console.log('Person already existing, upating');
      personId = res.body.data[0].id;
      createUpdateUrl = pipedriveApiBaseUrl + '/persons/' + personId + '?api_token=' + pipedriveApiToken;
      createOrUpdatePipedrivePerson('put', createUpdateUrl, data, cb);
    } else {
      createUpdateUrl = pipedriveApiBaseUrl + '/persons?api_token=' + pipedriveApiToken;
      createOrUpdatePipedrivePerson('post', createUpdateUrl, data, cb);
    }

  })
}

function createDealWithForCandidate(candidateInfos) {
  addContact(candidateInfos, function(personId){
    addDealToPipedriveStage(personId, function(dealId) {
      var url = pipedriveCRMUrl + '/deal/' + dealId;
      changeButtonToLink(url, 'deal');
    });
  });
}


function changeButtonToLink(url, type) {
  document.getElementById('button-' + type).style.display = "none";
  document.getElementById('link-' + type).style.display = '';
  document.getElementById('link-' + type).href = url;
}

function createContact(candidateInfos) {
  addContact(candidateInfos, function(personId){
    var url = pipedriveCRMUrl + '/person/' + personId;
    changeButtonToLink(url, 'contact');
  });
}
//
function renderProfile(candidate) {
  for (var property in candidate) {
    document.getElementById(property).textContent = candidate[property];
  }
}

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getCandidateInfo") {
    // console.log('request.source', request.source);
    // console.log('pipedriveApiToken', pipedriveApiToken);
    renderProfile(request.source);
    dealTitle = request.source.jobTitle;
    // add click listeners
    document.getElementById("button-contact")
      .addEventListener("click", function() {createContact(request.source)});
    document.getElementById("button-deal")
      .addEventListener("click", function() {createDealWithForCandidate(request.source)});
  }
});



function onWindowLoad() {

  chrome.tabs.executeScript(null, {
    file: "getCandidateInfo.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    // if (chrome.runtime.lastError) {
    //   message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    // }
  });

}

window.onload = onWindowLoad;
