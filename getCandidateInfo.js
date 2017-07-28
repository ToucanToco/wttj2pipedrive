// Get Candidate info from wttj
function getCandidateInfo(document_root) {
  var email = document_root.getElementsByClassName('candidate-infos-email')[0].textContent;
  var fullname = document_root.getElementsByClassName('card-header-name')[0].textContent;
  var phone = document_root.getElementsByClassName('candidate-infos-phone')[0].textContent;
  var candidate = {
    fullname: fullname,
    email: email,
    phone: phone
  }
  return candidate;
}

chrome.runtime.sendMessage({
    action: "getCandidateInfo",
    source: getCandidateInfo(document)
});
