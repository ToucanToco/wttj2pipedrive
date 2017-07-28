// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// /**
//  * @param {string} searchTerm - Search term for Google Image search.
//  * @param {function(string,number,number)} callback - Called when an image has
//  *   been found. The callback gets the URL, width and height of the image.
//  * @param {function(string)} errorCallback - Called when the image is not found.
//  *   The callback gets a string that describes the failure reason.
//  */
// function getImageUrl(searchTerm, callback, errorCallback) {
//   // Google image search - 100 searches per day.
//   // https://developers.google.com/image-search/
//   var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
//     '?v=1.0&q=' + encodeURIComponent(searchTerm);
//   var x = new XMLHttpRequest();
//   x.open('GET', searchUrl);
//   // The Google image search API responds with JSON, so let Chrome parse it.
//   x.responseType = 'json';
//   x.onload = function() {
//     // Parse and process the response from Google Image Search.
//     var response = x.response;
//     if (!response || !response.responseData || !response.responseData.results ||
//         response.responseData.results.length === 0) {
//       errorCallback('No response from Google Image search!');
//       return;
//     }
//     var firstResult = response.responseData.results[0];
//     // Take the thumbnail instead of the full image to get an approximately
//     // consistent image size.
//     var imageUrl = firstResult.tbUrl;
//     var width = parseInt(firstResult.tbWidth);
//     var height = parseInt(firstResult.tbHeight);
//     console.assert(
//         typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
//         'Unexpected respose from the Google Image Search API!');
//     callback(imageUrl, width, height);
//   };
//   x.onerror = function() {
//     errorCallback('Network error.');
//   };
//   x.send();
// }

// sophie

function renderProfile(candidate) {
  for (var property in candidate) {
    document.getElementById(property).textContent = candidate[property];
  }
}

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getCandidateInfo") {
    console.log('request.source', request.source);
    console.log('pipedriveApiToken', pipedriveApiToken);
    renderProfile(request.source);
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
// sophie
