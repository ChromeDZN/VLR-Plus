// ==UserScript==
// @name               VLR Plus
// @description        Optimizes VLR.gg for better features
// @author             ChromeDZN
// @version            1.6
// @license            GPL-3.0-or-later
// @namespace          ChromeDZN/Userscripts
// @supportURL         https://chrome.google.com/webstore/detail/vlr%20/mdkhidfehffakccameellfomknpaoahn
// @homepageURL        https://chrome.google.com/webstore/detail/vlr%20/mdkhidfehffakccameellfomknpaoahn
// @updateURL          none
// @downloadURL        none
// @match              *://*.vlr.gg/*
// @grant              none
// @inject-into        content
// @run-at             document-start
// ==/UserScript==


$(document).ready(function () {
  const savedColor = localStorage.getItem("color");
  if (savedColor) {
    document.documentElement.style.setProperty("--color", savedColor);
  }

  $('.team-summary-container-2').children('div').addClass('newsitems');
  $('.player-summary-container-2').children('div').addClass('newsitems');
  $('.team-summary-container-1').children('div:eq(5)').addClass('newsitems');
  $('.team-summary-container-1').children('div:eq(7)').addClass('newsitems');
  $('.player-summary-container-1').children('div:eq(3)').children('a').addClass('newsitems');
  $('.player-summary-container-1').children('div:eq(3)').children('a').removeClass('mod-first');
  $('.player-summary-container-1').children('div:eq(3)').children('a').removeClass('wf-module-item');
  $('.player-summary-container-1').children('div:eq(4)').children('a').addClass('newsitems');
  $('.player-summary-container-1').children('div:eq(4)').children('a').removeClass('mod-first');
  $('.player-summary-container-1').children('div:eq(4)').children('a').removeClass('wf-module-item');

  $('.mod-1 .wf-label').each(function () {
    $(this).next('div').addClass('newsitems');
  });
  $('.search-item').parent().addClass('newsitems');
  // $('.ge-text-light').parent().addClass('newsitems');
  $('.action-container').next().addClass('newsitems');
  $('.event-team').addClass('newsitems');
  $('.fc-flex').parent().parent().removeClass('newsitems')
  $('.mod-leaderboard').children().next('.newsitems').removeClass('newsitems')

  $('.event-subseries-container').children().children().next('.newsitems').removeClass('newsitems')
  $('.newsitems').parent().removeClass('newsitems')
  $('.mod-disc').parent().removeClass('newsitems')
  $('.post-editor').parent().removeClass('newsitems')
  $('.player-stats-filter').removeClass('newsitems')
  $('.action-container').next('div').children('div:odd').css('background', 'rgba(255,255,255,0.1)');
  $('.team-summary-container-1 div').filter(function () {
    return !$(this).html().trim();
  }).remove();
  $('.mod-3 .post-container').filter(function () {
    return !$(this).html().trim();
  }).remove();
});
$(document).ready(function () {
  const forbiddenUrlPrefix = "https://www.vlr.gg/user/";
  var profileName = window.location.pathname.split('/').pop();
  console.log(profileName, 's');
  if (window.location.href.startsWith(forbiddenUrlPrefix)) {
    const name = window.location.href.split("/").pop();
    $('.newsitems .ge-text-light').each(function () {
      var link = $(this).find('a').attr('href');
      var postBody = $(this).next('.post-body').find('p').text();
      var postBody = $(this).children('div:eq(1)').find('p').text();
      $(this).wrap('<a href="' + link + '' + postBody + '"></a>');
      $(this).parent().click(function () {
        localStorage.setItem('name', name);
        localStorage.setItem('postBody', postBody);
        setTimeout(function () {
          localStorage.removeItem('name');
          localStorage.removeItem('postBody');
        }, 10000); // set expiry time to 10 seconds
      });
    });
  }


  else {
    var name = localStorage.getItem('name');
    var postBody = localStorage.getItem('postBody');
    var found = false;
    $('.post-header-author').each(function () {
      var authorName = $(this).text().trim();
      if (authorName.includes(name)) {
        var post = $(this).closest('.post-header').next('.post-body');
        if (post.find('p').text() == (postBody)) {
          $('html, body').animate({
            scrollTop: post.offset().top - 150
          }, 1000);
          localStorage.removeItem('name');
          localStorage.removeItem('postBody');
          found = true;
          return false;
        }
      }
    });
    var name = ""
    var postBody = ""
  }
});
$(document).ready(function() {
  var trophyCount = 0;
  var currentURL = window.location.href;
  var grandslams = [
    '/event/449/valorant-champions-2021',
    '/event/353/valorant-champions-tour-stage-2-masters-reykjav-k',
    '/event/1015/valorant-champions-2022',
    '/event/926/valorant-champions-tour-stage-1-masters-reykjav-k',
    '/event/1014/valorant-champions-tour-stage-2-masters-copenhagen',
    '/event/1188/champions-tour-2023-lock-in-s-o-paulo',
    '/event/1657/valorant-champions-2023',
    '/event/1494/champions-tour-2023-masters-tokyo',
    '/event/466/valorant-champions-tour-stage-3-masters-berlin'
  ];

  if (currentURL.startsWith("https://www.vlr.gg/team")) {
    $(".team-event-item").each(function() {
      var href = $(this).attr("href");
      console.log(href);
      if (grandslams.includes(href)) {
        console.log("Found a grandslam!", href);
        var lastChild = $(this).find(".team-event-item-series").first();
        console.log(lastChild.text());
        if (lastChild.text().includes("1st")) {
          trophyCount++;
        }
      }
    });
    var nextDiv = $('.team-header-country');
    nextDiv.addClass('trophy');
    for (var i = 0; i < trophyCount; i++) {
      nextDiv.append('<div class="trophyIcon"></div>');
    }
  }
  if (currentURL.startsWith("https://www.vlr.gg/player")) {
    $(".player-event-item").each(function() {
      var href = $(this).attr("href");
      console.log(href);
      if (grandslams.includes(href)) {
        console.log("Found a grandslam!", href);
        var lastChild = $(this).find(".ge-text-light").first();
        console.log(lastChild.text());
        if (lastChild.text().includes("1st")) {
          trophyCount++;
        }
      }
    });
    var nextDiv = $('.mod-player').next('div');
    nextDiv.children().last().addClass('trophy');
    nextDiv.children().last().removeClass('ge-text-light');
    // nextDiv.children().last().append(trophyDiv);
    //loop through trophycount and add trophy images
    for (var i = 0; i < trophyCount; i++) {
      nextDiv.children().last().append('<div class="trophyIcon" style="display: inline-block;background-image: url(\'https://img.icons8.com/?size=512&id=uveiovUxXKW2&format=png\');background-size: contain;background-repeat: no-repeat;width: 15px;height: 15px;align-self: flex-end !important;justify-self: flex-end !important;margin-left: 2px !important;position: relative;top: -2px"></div>');
    }
  }

  console.log("Trophy Count: " + trophyCount);
});
// // Get the vote counts for each team (these can be updated dynamically)
// // let team1Votes = 3;
// // let team2Votes = 0;

// // // Calculate the percentage of votes for each team
// // let totalVotes = team1Votes + team2Votes;
// // let team1Percentage = (totalVotes > 0) ? (team1Votes / totalVotes) * 100 : 0;
// // let team2Percentage = (totalVotes > 0) ? (team2Votes / totalVotes) * 100 : 0;

// // // Get the team names
// // let team1Name = $('.mod-1 .wf-title-med').text();
// // let team2Name = $('.mod-2 .wf-title-med').text();

// // // Create the prediction bar elements
// // let bar1 = $('<div>').addClass('prediction-bar');
// // let bar2 = $('<div>').addClass('prediction-bar');

// // bgcolor=getComputedStyle(document.documentElement).getPropertyValue('--color')
// // // Set the background color of each bar based on the percentage of votes
// // bar1.css('background-color', `hsl(${bgcolor}, 70%, ${team1Percentage}%)`);
// // bar2.css('background-color', `hsl(${bgcolor}, 70%, ${team2Percentage}%)`);

// // // Set the width of each bar based on the percentage of votes
// // bar1.css('width', `${team1Percentage}%`);
// // bar2.css('width', `${team2Percentage}%`);

// // // Set the text of each bar to the team name
// // bar1.text(team1Name);
// // bar2.text(team2Name);
// // if (team1Votes > 0) {
// // bar1.text(team1Name + " " + team1Votes + " votes");
// // }
// // if (team2Votes > 0) {
// // bar2.text(team2Name + " " + team2Votes + " votes");
// // }
// // bar1.click(function() {
// //   if (team1Votes == 0) {
// //     team1Votes = 1;
// //     let totalVotes = team1Votes + team2Votes;
// // let team1Percentage = (totalVotes > 0) ? (team1Votes / totalVotes) * 100 : 0;
// // let team2Percentage = (totalVotes > 0) ? (team2Votes / totalVotes) * 100 : 0;
// // bar1.css('width', `${team1Percentage}%`);
// // bar2.css('width', `${team2Percentage}%`);
// // bar1.text(`${team1Name}: ${team1Votes} vote(s), ${team1Percentage.toFixed(1)}%`);
// // bar2.text(`${team2Name}: ${team2Votes} vote(s), ${team2Percentage.toFixed(1)}%`);  }
// //   else{
// //     team1Votes= team1Votes + 1;
// //     let totalVotes = team1Votes + team2Votes;
// // let team1Percentage = (totalVotes > 0) ? (team1Votes / totalVotes) * 100 : 0;
// // let team2Percentage = (totalVotes > 0) ? (team2Votes / totalVotes) * 100 : 0;
// // bar1.css('width', `${team1Percentage}%`);
// // bar2.css('width', `${team2Percentage}%`);
// // bar1.text(`${team1Name}: ${team1Votes} vote(s), ${team1Percentage.toFixed(1)}%`);
// // bar2.text(`${team2Name}: ${team2Votes} vote(s), ${team2Percentage.toFixed(1)}%`);
// //   }
// // });
// // bar2.click(function() {
// //   if (team2Votes == 0) {
// //     team2Votes = 1;
// //     let totalVotes = team1Votes + team2Votes;
// // let team1Percentage = (totalVotes > 0) ? (team1Votes / totalVotes) * 100 : 0;
// // let team2Percentage = (totalVotes > 0) ? (team2Votes / totalVotes) * 100 : 0;
// // bar1.css('width', `${team1Percentage}%`);
// // bar2.css('width', `${team2Percentage}%`);
// // bar1.text(`${team1Name}: ${team1Votes} vote(s), ${team1Percentage.toFixed(1)}%`);
// // bar2.text(`${team2Name}: ${team2Votes} vote(s), ${team2Percentage.toFixed(1)}%`);  }
// //   else{
// //     team2Votes++;
// //     let totalVotes = team1Votes + team2Votes;
// // let team1Percentage = (totalVotes > 0) ? (team1Votes / totalVotes) * 100 : 0;
// // let team2Percentage = (totalVotes > 0) ? (team2Votes / totalVotes) * 100 : 0;
// // bar1.css('width', `${team1Percentage}%`);
// // bar2.css('width', `${team2Percentage}%`);
// // bar1.text(`${team1Name}: ${team1Votes} vote(s), ${team1Percentage.toFixed(1)}%`);
// // bar2.text(`${team2Name}: ${team2Votes} vote(s), ${team2Percentage.toFixed(1)}%`);  }
// // });

// // // Add the bars to the page
// // $('.match-header').append("<div class='prediction-bars'></div>");
// // $('.prediction-bars').append(bar1).append(bar2);
// // //  * 100 : 0;
// // //         bar1.css('width', `${team1Percentage}%`);
// // //         bar2.css('width', `${team2Percentage}%`);
// // //         bar1.text(`${team1Name}: ${totalVotes - team2Votes} vote(s), ${team1Percentage.toFixed(1)}%`);
// // //         bar2.text(`${team2Name}: ${team2Votes} vote(s), ${team2Percentage.toFixed(1)}%`);
// // //         setCookie('team2Votes', team2Votes);
// // //         setCookie('totalVotes', totalVotes);
// // //         // localStorage.setItem('hasVoted', 'true');
// // //     }
// // //     else {
// // //         alert("You have already voted!");
// // //     }
// // // });

// // // function setCookie(name, value, days) {
// // //     let expires = "";
// // //     if (days) {
// // //         let date = new Date();
// // //         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
// // //         expires = "; expires=" + date.toUTCString();
// // //     }
// // //     let path = "; path=" + window.location.pathname; // set path to current page's path
// // //     document.cookie = name + "=" + (value || "")  + expires + path + "; SameSite=Strict; Secure";
// // // }


// // // function getCookie(name) {
// //     const value = `; ${document.cookie}`;
// //     const parts = value.split(`; ${name}=`);
// //     if (parts.length === 2) return parts.pop().split(';').shift();
// // }


// // // Add the bars to the page
// // $('.match-header').append("<div class='prediction-bars'></div>");
// // $('.prediction-bars').append(bar1).append(bar2);
// // $('.prediction-bars').append("<div class='graybars'></div>")
// // $('.graybars').append(bar3).append(bar4);

// // find the second div with class "moment-tz-convert" and get the data-utc-ts attribute

if ($(".match-header").length) {
  const utcTs = $("div.moment-tz-convert:eq(1)").attr("data-utc-ts");
  console.log(utcTs);
  // extract the date from utcTs (in format YYYY-MM-DD)
  const date = utcTs.split(" ")[0];
  console.log(date);
  // get the time from the moment-tz-convert div
  const time = $("div.moment-tz-convert:eq(1)").text().trim();
  console.log(time);
  var hour = parseInt(time.split(':')[0]);
  var minute = time.split(':')[1].split(' ')[0];
  var meridiem = time.split(' ')[1];

  if (meridiem === 'PM' && hour !== 12) {
    hour += 12;
  } else if (meridiem === 'AM' && hour === 12) {
    hour = 0;
  }

  var militaryTime = hour.toString().padStart(2, '0') + ':' + minute;
  // combine the date and time into a single string
  console.log(militaryTime);
  const dateTimeString = `${date} ${militaryTime}`;
  console.log(dateTimeString);
  const datetime = new Date(dateTimeString);

  const year = datetime.getFullYear();
  const month = ('0' + (datetime.getMonth() + 1)).slice(-2);
  const day = ('0' + datetime.getDate()).slice(-2);
  const hours = ('0' + datetime.getHours()).slice(-2);
  const minutes = ('0' + datetime.getMinutes()).slice(-2);
  const seconds = ('0' + datetime.getSeconds()).slice(-2);
  const gametype = $(".match-header-vs-note").text().trim().split("Bo")[1];
  var hoursEnd;
  if (gametype == "1") {
    var hoursEnd = ('0' + (datetime.getHours() + 1)).slice(-2);
  }
  else if (gametype == "3") {
    var hoursEnd = ('0' + (datetime.getHours() + 3)).slice(-2);
  }
  else if (gametype == "5") {
    var hoursEnd = ('0' + (datetime.getHours() + 5)).slice(-2);
    console.log("ded", hoursEnd);
  }
  else {
    var hoursEnd = ('0' + (datetime.getHours() + 1)).slice(-2);
  }
  const startTime = `${year}${month}${day}T${hours}${minutes}${seconds}`;
  const endTime = `${year}${month}${day}T${hoursEnd}${minutes}${seconds}`;
  // get the title, description, and location from the relevant elements
  const title = $(".wf-title-med:eq(0)").text().trim() + " vs " + $(".wf-title-med:eq(1)").text().trim();
  console.log(title);
  const description = $(".match-header-event > div > div:first-child").text().trim();
  console.log(description);
  // build the URL for the Google Calendar link
  const link = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&dates=${startTime}/${endTime}`;
  console.log(link);
  // create a link element
  const btn = $("<a class='calenderbtn' style='background-color: rgb(192, 39, 39);color: white !important;border: none;padding: 15px 10px;font-weight: bold;'></a>");
  btn.attr("href", link);
  btn.attr("target", '_blank');
  btn.text("Add to Google Calendar");
  // Append the link element to the body element of the document
  $(".match-header").append('<div class="clnd" style="display: flex;justify-content: center;width: 100%;margin-top: 20px;"></div>')
  $(".clnd").append(btn);
}
// // $(document).ready(function () {
// //     // Loop through all elements with class "wf-label"
// //     $('.wf-label').each(function () {
// //         // Check if the text content of the element is "Live Streams" after trimming whitespace
// //         if ($(this).text().trim() === "Live Streams") {
// //             // Change the text to "Watch Parties"
// //             $(this).text("Watch Parties");

// //             // Find the first "mod-sidebar" element after this "wf-label" element
// //             var $modSidebar = $(this).nextAll('.mod-sidebar:first');

// //             // Add a new "h1" element with class "wf-label" and "mod-sidebar" after the "mod-sidebar" element
// //             $('<h1>', {
// //                 class: 'wf-label mod-sidebar',
// //                 text: 'Other Streams'
// //             }).insertAfter($modSidebar);
// //         }
// //     });
// // });
if ($('.thread-header-desc').length) {
  if (localStorage.getItem('original_poster')) {
    if (localStorage.getItem('original_poster') === 'on') {
      if ($(".thread-header-desc").text().trim().startsWith("posted in")) {
        var firstAuthor = $('.post-header-author').first().text();
        $('.post-header-author').each(function () {
          if ($(this).text() === firstAuthor) {
            $(this).after('<span class="original" style="background-color: rgb(192, 39, 39);border-radius: 5px !important;margin-right: 10px;padding: 3px 5px;color: white;">OP</span>');
          }
        });
      }
    }
  }
}
// $('.vm-stats-gamesnav').removeClass('noselect');
$.get("https://snippet.host/wjgwkc/raw", function (data) {
  var plusUpdate = $(data);
  $(".js-home-threads").after(data);
});
// Blocked words array

var blockedWords = ["vlr"];
// Check if the URL matches the specified pattern
// Check if the URL matches the specified pattern
if (window.location.href === 'https://www.vlr.gg/settings') {
  // Add a h1 with the "Mute Words" text
  $('<div class="form-label">Mute Words</div>').insertBefore('input[type="submit"]');

  var flexbtn = $('<div id="flexbtn" style="display: flex;flex-wrap:wrap;justify-content: left;gap: 30px;margin: 10px;padding: 10px;border-radius: 5px;cursor: pointer;width: fit-content;margin-top: 20px !important;"><input type="text" id="wordInput"><div id="updateButton" style="display: inline-block;margin-right: 20px;background-color: rgb(192, 39, 39);color: white;padding: 10px 20px;border-radius: 5px;cursor: pointer;width: fit-content;">Update Blocked Words</div></div>');
  flexbtn.insertBefore('input[type="submit"]');
  var updateButton = $('#updateButton');
  var inputField = $('#wordInput');
  // var fkexbtn = $('.flexbtn')
  // $('.flexbtn').appendChild(inputField);
  // fkexbtn.append(updateButton);



  // Get the existing blockedWords array from localStorage or create an empty array
  var blockedWords = JSON.parse(localStorage.getItem('blockedWords')) || [];

  // Update the blockedWords array when the updateButton is clicked
  updateButton.click(function () {
    var newWord = $('#wordInput').val().trim().toLowerCase();
    if (newWord !== '') {
      if (blockedWords.includes(newWord)) {
        alert('You have already blocked this word.');
      } else {
        blockedWords.push(newWord);
        localStorage.setItem('blockedWords', JSON.stringify(blockedWords));
        // $('#words').append('<li>' + newWord + '<div class="removeButton">Remove</div></li>');
        $('#wordInput').val('');
        blockedWordsDiv.find('#words').remove();
        var wordList = $('<ul id="words"></ul>');
        blockedWords.forEach(function (word) {
          var li = $('<li>' + word + '<div class="removeButton" style="background-color: rgb(192, 39, 39);color: white;padding: 10px 20px;border-radius: 5px;cursor: pointer;width: fit-content;">Remove</div></li>');
          li.find('.removeButton').click(function () {
            var removedWord = $(this).parent().text().trim().split('Remove')[0].trim().toLowerCase();
            //loop over blockedWords array and remove the word that was clicked
            blockedWords.forEach(function (word, index) {
              if (word === removedWord) {
                blockedWords.splice(index, 1);
              }
              console.log(word, removedWord);
            });
            console.log('update', blockedWords);
            localStorage.setItem('blockedWords', JSON.stringify(blockedWords));
            $(this).parent().remove();
          });
          wordList.append(li);
        });
        blockedWordsDiv.append(wordList);
      }
    }

  });

  // Add a div for displaying blocked words
  var blockedWordsDiv = $('<div id="blockedWordsDiv"></div>');
  blockedWordsDiv.insertBefore('input[type="submit"]');

  // Get the existing blocked words from localStorage or create an empty array
  var blockedWords = JSON.parse(localStorage.getItem('blockedWords')) || [];

  // Display the blocked words in the blockedWordsDiv
  var wordList = $('<ul id="words"></ul>');
  blockedWords.forEach(function (word) {
    var li = $('<li>' + word + '<div class="removeButton">Remove</div></li>');
    li.find('.removeButton').click(function () {
      var removedWord = $(this).parent().text().trim().split('Remove')[0].trim().toLowerCase();
      //loop over blockedWords array and remove the word that was clicked
      blockedWords.forEach(function (word, index) {
        if (word === removedWord) {
          blockedWords.splice(index, 1);
        }
        console.log(word, removedWord);
      });
      console.log('update', blockedWords);
      localStorage.setItem('blockedWords', JSON.stringify(blockedWords));
      $(this).parent().remove();
    });
    wordList.append(li);
  });
  blockedWordsDiv.append(wordList);
}

var blockedWords = JSON.parse(localStorage.getItem('blockedWords')) || [];

// Check if .post-body is visible
if ($(".post-body").is(":visible")) {

  // Iterate over each paragraph within .post-body
  $(".post-body").each(function () {
    var paragraphText = $(this).text().trim().toLowerCase();
    var words = paragraphText.split(" ");
    // console.log(paragraphText);
    // Iterate over each word in the paragraph
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      var isolatedWord = word.replace(/[^a-zA-Z0-9]/g, "");
      //   console.log(isolatedWord);

      // Check if the word is in the blockedWords array and isolated
      if (blockedWords.includes(isolatedWord)) {
        // Replace the paragraph with the blocked message
        // $(this).children('p:eq(0)').text("Contains blocked word");
        $(this).children('p:eq(0)').hide();
        $(this).append('<p class="blocked">Contains blocked word</p>');
        // add button to toggle content
        $(this).append('<div class="toggle" style="display: inline-block;background-color: rgb(192, 39, 39);color: white;padding: 5px 10px;border-radius: 5px;cursor: pointer;width: fit-content;margin-bottom: 10px !important;">Show Content</div>');
        // add click event to toggle button
        $(this).find('.toggle').click(function () {
          // toggle the content
          $(this).siblings('p').toggle();
          // toggle the button text
          if ($(this).text() === 'Show Content') {
            $(this).text('Hide Content');
          } else {
            $(this).text('Show Content');
          }
        });

        // if ($(this).children('p:eq(0)').is(":visible")) {

        break; // Stop iterating over the remaining words
      }

    }
  });
}

if (window.location.href.indexOf("https://www.vlr.gg/settings") > -1) {
  // URL matches, add title and radio buttons

  var $title = $('<div class="form-label">').text('Original Poster');
  var $onRadio = $('<input>').attr({
    type: 'radio',
    name: 'original_poster',
    value: 'on',
    id: 'original-poster-on'
  });
  var $onLabel = $('<label>').attr('for', 'original-poster-on').text('On');
  var $offRadio = $('<input>').attr({
    type: 'radio',
    name: 'original_poster',
    value: 'off',
    id: 'original-poster-off'
  });
  var $offLabel = $('<label>').attr('for', 'original-poster-off').text('Off');
  var $submitButton = $('input[type="submit"]');

  $title.insertBefore($submitButton);
  $onRadio.add($onLabel).add($offRadio).add($offLabel).insertBefore($submitButton);
  $onRadio.click(function () {
    localStorage.setItem('original_poster', 'on');
  });
  $offRadio.click(function () {
    localStorage.setItem('original_poster', 'off');
  });
  // var sportmode = $('<div class="sportMode">').text('Sport Mode');
  // sportmode.insertBefore($submitButton);
  // sportmode.click(function () {
  //   if (localStorage.getItem('sport_mode') === 'on') {
  //     $('.sportMode').css('background-color', 'red');
  //     localStorage.setItem('sport_mode', 'off');
  //     $('.sporthide').show();
  //   }
  //   else {
  //     $('.sportMode').css('background-color', 'green');
  //     localStorage.setItem('sport_mode', 'on');
  //     $('.sporthide').hide();
  //   }
  //   $('a[href="/threads"]').toggle();
  // });
  // var secretLink = $('<div class="secretLink">').text('Link Preview');
  // secretLink.insertBefore($submitButton);
  // secretLink.click(function () {
  //   if (localStorage.getItem('secret_link') === 'on') {
  //     $('.secretLink').css('background-color', 'red');
  //     localStorage.setItem('secret_link', 'off');
  //   }
  //   else {
  //     $('.secretLink').css('background-color', 'green');
  //     localStorage.setItem('secret_link', 'on');
  //   }
  // });

}
// Check if the URL starts with "https://www.vlr.gg/player"
var url = window.location.href;
// Function to construct the modified URL based on the timespan
function constructModifiedURL(baseUrl, timespan) {
  var modifiedURL;

  if (timespan === "mean30") {
    modifiedURL = baseUrl + "/?timespan=30d";
  } else if (timespan === "mean60") {
    modifiedURL = baseUrl + "/?timespan=60d";
  } else if (timespan === "mean90") {
    modifiedURL = baseUrl + "/?timespan=90d";
  } else if (timespan === "meanAll") {
    modifiedURL = baseUrl + "/?timespan=all";
  }

  return modifiedURL;
}

// Function to create the grid layout for average ratings
function createRatingGrid() {
  // Create the ratingStat div
  var ratingStatDiv = $("<div>").attr("id", "ratingStat").css("display", "grid").css("grid-template-columns", "auto auto auto auto");
  var ratingStatDiv = $("<div id='ratingStat' style='margin-left: 20px !important;display: grid !important;grid-template-columns: 1fr 1fr 1fr 1fr !important;grid-gap: 2px ! important;border: 2px solid rgb(192, 39, 39) !important;padding: 10px !important;'></div>")
  // Create the header row
  var headerRow = $("<div>").css("grid-column", "1 / span 4").text("Average rating");
  ratingStatDiv.append(headerRow);

  // Create the timespan labels row
  ratingStatDiv.append($("<div>").css("grid-column", "1").text("30d"));
  ratingStatDiv.append($("<div>").css("grid-column", "2").text("60d"));
  ratingStatDiv.append($("<div>").css("grid-column", "3").text("90d"));
  ratingStatDiv.append($("<div>").css("grid-column", "4").text("All"));
  // ratingStatDiv.append(ratingStatDiv);


  // Append the ratingStat div to player-header
  $(".player-header").append(ratingStatDiv);
}
// Function to interpolate the hue value based on the mean
function interpolateHue(mean) {
  var hues = {
    "1.35": 270,
    "1.30": 259,
    "1.25": 250,
    "1.20": 228,
    "1.15": 189,
    "1.10": 167,
    "1.05": 146,
    "1.00": 124,
    "0.95": 102,
    "0.90": 80,
    "0.85": 58,
    "0.80": 36,
    "0.75": 15,
    "0.70": -7,
    "0.65": -27,
    "0.60": -30
  };

  var keys = Object.keys(hues);
  var lowerMean, upperMean, lowerHue, upperHue;

  for (var i = 0; i < keys.length - 1; i++) {
    lowerMean = parseFloat(keys[i]);
    upperMean = parseFloat(keys[i + 1]);
    lowerHue = hues[keys[i]];
    upperHue = hues[keys[i + 1]];

    //   if (mean >= lowerMean && mean <= upperMean) {
    var percentage = (mean - lowerMean) / (upperMean - lowerMean);
    return Math.round(lowerHue + percentage * (upperHue - lowerHue) - 50);
    //   }
  }

  // If the mean is outside the defined range, return a default hue value
  return 0; // Adjust this value as per your preference
}


// Function to update the ratings in the grid
function updateRatingsGrid(ratings) {
  // Select the ratingsRow div
  var ratingsRow = $("#ratingsRow");

  // Clear any existing ratings
  ratingsRow.empty();
  var ratingStatDiv = $("#ratingStat")
  //add .wf-card as a class to the ratingStatDiv
  ratingStatDiv.addClass("wf-card");
  ratingStatDiv.addClass("wf-module-item");

  // Add the ratings for each timespan
  ratings.forEach(function (rating, index) {
    //loop overthe ratings and if ratings != 0 then add the rating to the grid
    if (rating != 0) {
      if (isNaN(rating)) {
        var ratingDiv = $("<div>").attr('class', 'color-sq').css("grid-column", index + 1).text('');
      }
      else {
        var ratingDiv = $("<div>").attr('class', 'color-sq').css("grid-column", index + 1).text(rating);
        var hue = interpolateHue(parseFloat(rating));
        ratingDiv.css("background", "hsl(" + hue + ",50%,78%)");
      }
      console.log(hue);
      // Set the background color using the calculated hue value
      ratingStatDiv.append(ratingDiv);
    }
  });
}

// Check if the URL starts with "https://www.vlr.gg/player"
if (url.startsWith("https://www.vlr.gg/player")) {
  // Extract the base URL without the query parameters
  var baseUrl = url.split("?")[0];

  // Define the desired timespans
  var timespans = ["mean30", "mean60", "mean90", "meanAll"];

  // Array to store the means
  var means = [];

  // Create the rating grid layout
  createRatingGrid();
  var ratings = [0, 0, 0, 0]
  // Loop through each timespan and calculate the mean
  timespans.forEach(function (timespan, index) {
    // Construct the modified URL based on the timespan
    var modifiedURL = constructModifiedURL(baseUrl, timespan);

    // Send a GET request to the modified URL

    $.get(modifiedURL, function (data) {
      // Find every 4th td element in mod-table tr
      var tdElements = $(data).find('.mod-table tr td:nth-child(4)');
      var tdCount = $(data).find('.mod-table tr td:nth-child(2) span');
      // Calculate the sum and count of the values
      var numbersArray = [];
      tdCount.each(function () {
        var text = $(this).text();
        var match = /\((\d+)\)/.exec(text);

        if (match) {
          var number = parseInt(match[1]);
          numbersArray.push(number);
        }
      });
      console.log(numbersArray);
      var sum = 0;
      var count = 0;
      var total = 0;
      tdElements.each(function () {
        console.log(tdCount[count]);
        var number = numbersArray[count];
        var value = parseFloat($(this).text());
        if (!isNaN(value)) {
          sum += value * number;
          count++;
          total += number;
        }
      });

      // Calculate the mean
      var mean = sum / total;
      //console log the mean and what timespan it is
      console.log(mean, timespan);

      // Round the mean to 2 decimal places
      var roundedMean = mean.toFixed(2);

      // Push the mean to the means array
      // means.push(roundedMean);    

      // Check if all means have been calculated
      if (timespan === "meanAll") {
        var index = 3;
        //replace ratings[3] with roundedMean
        ratings[3] = roundedMean;
      }
      else if (timespan === "mean90") {
        var index = 2;
        //replace ratings[2] with roundedMean
        ratings[2] = roundedMean;
      }
      else if (timespan === "mean60") {
        var index = 1;
        //replace ratings[1] with roundedMean
        ratings[1] = roundedMean;
      }
      else if (timespan === "mean30") {
        var index = 0;
        //replace ratings[0] with roundedMean
        ratings[0] = roundedMean;
      }
      //update only if done with all 4 timespans

      if (ratings[0] != 0 && ratings[1] != 0 && ratings[2] != 0 && ratings[3] != 0) {
        updateRatingsGrid(ratings);
      }

    });
  });
}




// $(document).ready(function () {
//   var currentURL = window.location.href;

//   if (!currentURL.startsWith("https://www.vlr.gg/events") && !currentURL.startsWith("https://www.vlr.gg/user") && !currentURL.startsWith("https://www.vlr.gg/privacy") && !currentURL.startsWith("https://www.vlr.gg/matches") && !currentURL.startsWith("https://www.vlr.gg/inbox") && !currentURL.startsWith("https://www.vlr.gg/settings") && !currentURL.startsWith("https://www.vlr.gg/stats") && !currentURL.startsWith("https://www.vlr.gg/rankings") && !currentURL.startsWith("https://www.vlr.gg/team") && !currentURL.startsWith("https://www.vlr.gg/player")) {
//     // $(".mod-1:first").addClass("sporthide");
//     $(".noselect").addClass("sporthide");
//     $(".post-container").addClass("sporthide");
//     $(".action-container").addClass("sporthide");
//     $('form[action="/post/add"]').addClass("sporthide");
//   }
//   if (localStorage.getItem('sport_mode') === 'on') {
//     $('.sporthide').hide();
//     $('a[href="/threads"]').hide();
//     $('.mod-user').hide();
//     $('.mod-inbox').hide();
//     $('.sportMode').css('background-color', 'green');
//   }
//   else {
//     $('.sportMode').css('background-color', 'red');
//     $('.sporthide').show();
//     $('a[href="/threads"]').show();
//     $('.mod-user').show();
//     $('.mod-inbox').show();
//   }
//   if (localStorage.getItem('secret_link') === 'on') {
//     $(".secretLink").css("background-color", "green");
//   }
//   else {
//     $(".secretLink").css("background-color", "red");
//   }

// });

$(document).ready(function() {
  $.get("https://snippet.host/zcchqa/raw", function (data) {  
    var emojiIcon = $('<div class="emoji-icon" style="cursor: pointer;font-size: 20px;width: 24px;height: 24px;line-height: 24px;text-align: center;border-radius: 4px;">&#x1F603;</div>');
    var emojiModal = $(data);
    emojiModal.css('display', 'none');
    emojiModal.css('z-index', '999999999999999');
    emojiModal.css('width', '100%');
    emojiModal.css('background-color', 'rgba(123, 123, 123, 0.1)');
    emojiModal.css('backdrop-filter', 'blur(10px)');
    emojiModal.css('border', '1px solid #ddd');
    emojiModal.css('border-radius', '4px');
    emojiModal.css('padding', '8px');
    emojiModal.css('box-shadow', '0 2px 4px rgba(0, 0, 0, 0.1)');
    emojiModal.css('overflow-y', 'scroll');
    emojiModal.css('max-height', '200px');
    


  
    $('.post-editor-header').append(emojiIcon);
    $('.post-editor-header').append(emojiModal);

    $('.emoji-icon').click(function() {
      $(this).next('.emoji-modal').slideToggle();
    });

    $('.emoji-modal').find('.emoji').click(function() {
      var emoji = $(this).attr('alt');
      var input = $(this).parent().parent().next('.post-editor-text');
      var startPos = input.prop('selectionStart');
      var endPos = input.prop('selectionEnd');
      console.log(startPos, endPos);
      var inputValue = input.val();
      var updatedValue = inputValue.substring(0, startPos) + emoji + inputValue.substring(endPos);
      input.val(updatedValue);
      // $(this).parent().hide();
    });
  });
});
$('.reply-btn').click(function() {
  // $('.post-editor-header').each(function() {
  //   var emojiIcon = $('<div class="emoji-icon">&#x1F603;</div>');
  //   var emojiModal = $('<div class="emoji-modal">' +
  //     '<img class="emoji" style="height:23px;width:23px;border-radius: 0px !important;cursor: pointer;margin: 4px;" src="//owcdn.net/img/628addcbd509e.png" alt=":c9;">' +
  //     '<img class="emoji" style="height:23px;width:23px;border-radius: 0px !important;cursor: pointer;margin: 4px;" src="//owcdn.net/img/62a409ad29351.png" alt=":eg;">' +
  //     '<img class="emoji" style="height:23px;width:23px;border-radius: 0px !important;cursor: pointer;margin: 4px;" src="//owcdn.net/img/62875027c8e06.png" alt=":sen;">' +
  //     '</div>');
  //     if ($(this).find('.emoji-icon').length === 0) {
  //   $(this).append(emojiIcon);
  //   $(this).append(emojiModal);
  //     }
    $('.emoji-icon').click(function() {
      $(this).next('.emoji-modal').slideToggle();
    });

    $('.emoji-modal').find('.emoji').click(function() {
      var emoji = $(this).attr('alt');
      var input = $(this).parent().parent().next('.post-editor-text');
      var startPos = input.prop('selectionStart');
      var endPos = input.prop('selectionEnd');
      console.log(startPos, endPos);
      var inputValue = input.val();
      var updatedValue = inputValue.substring(0, startPos) + emoji + inputValue.substring(endPos);
      input.val(updatedValue);
    });
    $('.post-editor-header-preview').click(function() {
      $('.emoji-modal').hide();
      //wait 5 seconds 
      setTimeout(function () {
       $.get("https://snippet.host/ekiscp/raw", function (data) {
        var emojiDictionary = JSON.parse(data);
        $('.post-body').children().each(function() {
          var text = $(this).text();
          console.log(text);
          var matches = text.match(/:([\w-]+);/g);
          
          if (matches) {
            matches.forEach(function(match) {
              var emojiName = match.slice(1, -1); // Remove the leading ":" and trailing ";"
              var emojiUrl = emojiDictionary[emojiName];
              if (emojiUrl) {
                var imageTag = '<img class="emoji" style="height:23px;width:23px;border-radius: 0px !important;cursor: pointer;margin: 4px;" src="' + emojiUrl + '">';
                text = text.replace(match, imageTag);
              }
            });
            
            $(this).html(text);
            $(this).css({
              'display': 'flex',
              'align-items': 'center',
              'flex-wrap': 'wrap'
            });
          
            $(this).children().css('align-self', 'flex-end');
          }
        });
      });
      }, 500);
      });
  // });
});

$(document).ready(function() {
  $.get("https://snippet.host/ekiscp/raw", function (data) {
    var emojiDictionary = JSON.parse(data);

  $('.post-body').children().each(function() {
    var text = $(this).text();
    var matches = text.match(/:([\w-]+);/g);
    
    if (matches) {
      matches.forEach(function(match) {
        var emojiName = match.slice(1, -1); // Remove the leading ":" and trailing ";"
        var emojiUrl = emojiDictionary[emojiName];
        if (emojiUrl) {
          var imageTag = '<img class="emoji" style="height:23px;width:23px;border-radius: 0px !important;cursor: pointer;margin: 4px;" src="' + emojiUrl + '">';
          text = text.replace(match, imageTag);
        }
      });
      
      $(this).html(text);
      $(this).css({
        'display': 'flex',
        'align-items': 'center',
        'flex-wrap': 'wrap'
      });
    
      $(this).children().css('align-self', 'flex-end');
    }
  });
  });
});
$('.post-editor-header-preview').click(function() {
$('.emoji-modal').hide();
//wait 5 seconds 
setTimeout(function () {
  $.get("https://snippet.host/ekiscp/raw", function (data) {
    var emojiDictionary = JSON.parse(data);
  $('.post-body').children().each(function() {
    var text = $(this).text();
    console.log(text);
    var matches = text.match(/:([\w-]+);/g);
    
    if (matches) {
      matches.forEach(function(match) {
        var emojiName = match.slice(1, -1); // Remove the leading ":" and trailing ";"
        var emojiUrl = emojiDictionary[emojiName];
        if (emojiUrl) {
          var imageTag = '<img class="emoji" style="height:23px;width:23px;border-radius: 0px !important;cursor: pointer;margin: 4px;" src="' + emojiUrl + '">';
          text = text.replace(match, imageTag);
        }
      });
      
      $(this).html(text);
      $(this).css({
        'display': 'flex',
        'align-items': 'center',
        'flex-wrap': 'wrap'
      });
    
      $(this).children().css('align-self', 'flex-end');
    }
  });
});
}, 500);
});
$(document).ready(function () {
  document.querySelectorAll('.vlrplus, #ratingStat').forEach(element => {
    element.style.border = '0px solid gray !important';
    element.style.border = '2px solid rgb(192, 39, 39) !important';
});

document.querySelector('.original').style.backgroundColor = 'rgb(192, 39, 39)';
document.querySelector('.original').style.borderRadius = '5px !important';
document.querySelector('.original').style.marginRight = '10px';
document.querySelector('.original').style.padding = '3px 5px';
document.querySelector('.original').style.color = 'white';

document.querySelector('.clnd').style.display = 'flex';
document.querySelector('.clnd').style.justifyContent = 'center';
document.querySelector('.clnd').style.width = '100%';
document.querySelector('.clnd').style.marginTop = '20px';

document.querySelector('.calenderbtn').style.backgroundColor = 'rgb(192, 39, 39)';
document.querySelector('.calenderbtn').style.color = 'white !important';
document.querySelector('.calenderbtn').style.border = 'none';
document.querySelector('.calenderbtn').style.padding = '15px 10px';
document.querySelector('.calenderbtn').style.fontWeight = 'bold';

document.querySelector('.calenderbtn:hover').style.backgroundColor = 'rgba(127, 127, 127, 0.7)';
document.querySelector('.calenderbtn:hover').style.padding = '13px 8px';
document.querySelector('.calenderbtn:hover').style.backdropFilter = 'blur(10px)';
document.querySelector('.calenderbtn:hover').style.border = '2px solid rgb(192, 39, 39) !important';

document.querySelector('.tooltiptextt').style.visibility = 'hidden';
document.querySelector('.tooltiptextt').style.width = '300px';
document.querySelector('.tooltiptextt').style.backgroundColor = '#000';
document.querySelector('.tooltiptextt').style.color = '#fff';
document.querySelector('.tooltiptextt').style.textAlign = 'center';
document.querySelector('.tooltiptextt').style.padding = '5px';
document.querySelector('.tooltiptextt').style.borderRadius = '5px';
document.querySelector('.tooltiptextt').style.position = 'fixed';
document.querySelector('.tooltiptextt').style.zIndex = '1';
document.querySelector('.tooltiptextt').style.bottom = '0';
document.querySelector('.tooltiptextt').style.left = '0';
document.querySelector('.tooltiptextt').style.opacity = '0';
document.querySelector('.tooltiptextt').style.transition = 'opacity 0.3s';
document.querySelector('.tooltiptextt').style.height = '169px !important';
document.querySelector('.tooltiptextt').style.backgroundSize = 'cover';
document.querySelector('.tooltiptextt').style.zIndex = '99999999999999999999999999999999999999999999999999999999999999999';
document.querySelector('.tooltiptextt').style.borderRadius = '0px !important';
document.querySelector('.tooltiptextt').style.borderTopRightRadius = '15px !important';
document.querySelector('.tooltiptextt').style.outline = '2px solid rgb(192, 39, 39) !important';
document.querySelector('.tooltiptextt').style.border = '2px solid black !important';
document.querySelector('.tooltiptextt').style.borderBottom = '0px !important';
document.querySelector('.tooltiptextt').style.borderLeft = '0px !important';

document.querySelector('input[name="original_poster"]').style.display = 'inline-block !important';
document.querySelector('input[name="original_poster"]').style.margin = '10px !important';

document.querySelector('label[for="original-poster-off"]').style.backgroundColor = 'transparent !important';
document.querySelector('label[for="original-poster-on"]').style.backgroundColor = 'transparent !important';

document.querySelectorAll('.sportMode, .secretLink').forEach(element => {
    element.style.backgroundColor = 'red';
    element.style.margin = '20px';
    element.style.padding = '15px';
    element.style.color = 'white !important';
    element.style.width = 'fit-content';
    element.style.cursor = 'pointer';
});

document.querySelector('#ratingStat').style.marginLeft = '20px !important';
document.querySelector('#ratingStat').style.display = 'grid !important';
document.querySelector('#ratingStat').style.gridTemplateColumns = '1fr 1fr 1fr 1fr !important';
document.querySelector('#ratingStat').style.gridGap = '2px !important';
document.querySelector('#ratingStat').style.border = '2px solid rgb(192, 39, 39) !important';
document.querySelector('#ratingStat').style.padding = '10px !important';

document.querySelectorAll('#ratingStat > div').forEach(element => {
    element.style.display = 'flex';
    element.style.flexDirection = 'column';
    element.style.alignItems = 'center';
    element.style.justifyContent = 'center';
    element.style.padding = '0 20px';
});

document.querySelector('#ratingStat > div:first-child').style.fontWeight = 'bold';

document.querySelectorAll('#ratingStat > .color-sq').forEach(element => {
    element.style.color = 'black !important';
});

document.querySelector('.removeButton').style.backgroundColor = 'rgb(192, 39, 39)';
document.querySelector('.removeButton').style.color = 'white';
document.querySelector('.removeButton').style.padding = '10px 20px';
document.querySelector('.removeButton').style.borderRadius = '5px';
document.querySelector('.removeButton').style.cursor = 'pointer';
document.querySelector('.removeButton').style.width = 'fit-content';

document.querySelector('.removeButton:hover').style.backgroundColor = 'rgba(127, 127, 127, 0.7)';
document.querySelector('.removeButton:hover').style.padding = '8px 18px';
document.querySelector('.removeButton:hover').style.backdropFilter = 'blur(10px)';
document.querySelector('.removeButton:hover').style.border = '2px solid rgb(192, 39, 39) !important';

document.querySelectorAll('#words li').forEach(element => {
    element.style.display = 'grid';
    element.style.gridTemplateColumns = '1fr 1fr';
    element.style.padding = '10px 20px';
    element.style.width = 'fit-content';
});

document.querySelectorAll('#words li:nth-child(odd)').forEach(element => {
    element.style.backgroundColor = 'rgba(127, 127, 127, 0.7)';
});

document.querySelectorAll('#words li > *').forEach(element => {
    element.style.fontWeight = 'bold';
    element.style.display = 'flex';
    element.style.alignItems = 'center';
    element.style.justifyContent = 'center';
});

document.querySelector('#words').style.marginTop = '20px';
document.querySelector('#words').style.marginBottom = '20px !important';

document.querySelector('.flexbtn').style.display = 'flex';
document.querySelector('.flexbtn').style.justifyContent = 'left';
document.querySelector('.flexbtn').style.gap = '30px';
document.querySelector('.flexbtn').style.margin = '10px';
document.querySelector('.flexbtn').style.padding = '10px';
document.querySelector('.flexbtn').style.borderRadius = '5px';
document.querySelector('.flexbtn').style.cursor = 'pointer';
document.querySelector('.flexbtn').style.width = 'fit-content';
document.querySelector('.flexbtn').style.marginTop = '20px !important';

document.querySelector('#wordInput').style.display = 'inline-block';
document.querySelector('#wordInput').style.marginRight = '20px';

document.querySelector('#updateButton').style.display = 'inline-block';
document.querySelector('#updateButton').style.marginRight = '20px';
document.querySelector('#updateButton').style.backgroundColor = 'rgb(192, 39, 39)';
document.querySelector('#updateButton').style.color = 'white';
document.querySelector('#updateButton').style.padding = '10px 20px';
document.querySelector('#updateButton').style.borderRadius = '5px';
document.querySelector('#updateButton').style.cursor = 'pointer';
document.querySelector('#updateButton').style.width = 'fit-content';

document.querySelector('#updateButton:hover').style.backgroundColor = 'rgba(127, 127, 127, 0.7)';
document.querySelector('#updateButton:hover').style.padding = '8px 18px';
document.querySelector('#updateButton:hover').style.backdropFilter = 'blur(10px)';
document.querySelector('#updateButton:hover').style.border = '2px solid rgb(192, 39, 39) !important';

document.querySelector('.toggle').style.display = 'inline-block';
document.querySelector('.toggle').style.backgroundColor = 'rgb(192, 39, 39)';
document.querySelector('.toggle').style.color = 'white';
document.querySelector('.toggle').style.padding = '5px 10px';
document.querySelector('.toggle').style.borderRadius = '5px';
document.querySelector('.toggle').style.cursor = 'pointer';
document.querySelector('.toggle').style.width = 'fit-content';
document.querySelector('.toggle').style.marginBottom = '10px !important';

document.querySelector('.toggle:hover').style.backgroundColor = 'rgba(127, 127, 127, 0.7)';
document.querySelector('.toggle:hover').style.padding = '3px 8px';
document.querySelector('.toggle:hover').style.backdropFilter = 'blur(10px)';
document.querySelector('.toggle:hover').style.border = '2px solid rgb(192, 39, 39) !important';

document.querySelector('.trophy > i').style.marginRight = '5px';

document.querySelector('.trophyIcon').style.display = 'inline-block';
document.querySelector('.trophyIcon').style.backgroundImage = 'url("https://img.icons8.com/?size=512&id=uveiovUxXKW2&format=png")';
document.querySelector('.trophyIcon').style.backgroundSize = 'contain';
document.querySelector('.trophyIcon').style.backgroundRepeat = 'no-repeat';
document.querySelector('.trophyIcon').style.width = '15px';
document.querySelector('.trophyIcon').style.height = '15px';
document.querySelector('.trophyIcon').style.alignSelf = 'flex-end !important';
document.querySelector('.trophyIcon').style.justifySelf = 'flex-end !important';
document.querySelector('.trophyIcon').style.marginLeft = '2px !important';
document.querySelector('.trophyIcon').style.position = 'relative';
document.querySelector('.trophyIcon').style.top = '-2px';

document.querySelector('.trophy').style.display = 'flex';
document.querySelector('.trophy').style.backgroundColor = 'transparent !important';
document.querySelector('.trophy').style.alignItems = 'center !important';

document.querySelectorAll('.flag, i').forEach(element => {
    element.style.borderRadius = '0% !important';
});

document.querySelectorAll('.emoji').forEach(element => {
  element.style.width = '23px';
  element.style.height = '23px';
});

document.querySelector('.emoji-dashboard').style.position = 'relative';
document.querySelector('.emoji-dashboard').style.display = 'inline-block';

document.querySelector('.emoji-icon').style.cursor = 'pointer';
document.querySelector('.emoji-icon').style.fontSize = '20px';
document.querySelector('.emoji-icon').style.width = '24px';
document.querySelector('.emoji-icon').style.height = '24px';
document.querySelector('.emoji-icon').style.lineHeight = '24px';
document.querySelector('.emoji-icon').style.textAlign = 'center';
document.querySelector('.emoji-icon').style.borderRadius = '4px';

document.querySelector('.emoji-modal').style.position = 'absolute';
document.querySelector('.emoji-modal').style.zIndex = '999999999999999';
document.querySelector('.emoji-modal').style.top = '34px';
document.querySelector('.emoji-modal').style.right = '0';
document.querySelector('.emoji-modal').style.width = '200px';
document.querySelector('.emoji-modal').style.backgroundColor = 'rgba(123, 123, 123, 0.1)';
document.querySelector('.emoji-modal').style.backdropFilter = 'blur(10px)';
document.querySelector('.emoji-modal').style.border = '1px solid #ddd';
document.querySelector('.emoji-modal').style.borderRadius = '4px';
document.querySelector('.emoji-modal').style.padding = '8px';
document.querySelector('.emoji-modal').style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
document.querySelector('.emoji-modal').style.display = 'none';
document.querySelector('.emoji-modal').style.overflowY = 'scroll';
document.querySelector('.emoji-modal').style.maxHeight = '200px';

document.querySelectorAll('.emoji-modal p').forEach(element => {
  element.style.color = 'rgb(var(--shade))';
  element.style.margin = '10px 0px';
});

document.querySelector('.emoji-modal::-webkit-scrollbar').style.width = '5px';

document.querySelectorAll('.emoji').forEach(element => {
  element.style.borderRadius = '0px !important';
  element.style.cursor = 'pointer';
  element.style.margin = '4px';
});

document.querySelectorAll('.emoji:hover').forEach(element => {
  element.style.opacity = '0.7';
});

document.querySelector('.vlrplus').style.maxHeight = '152px !important';
document.querySelector('.vlrplus').style.overflowY = 'scroll !important';

document.querySelector('.vlrplus::-webkit-scrollbar').style.width = '0px';

});

// console.log($(".mod-user").attr('href').split('/')[2])

// var btn2 = $('<div class="styleToggle">')
// document.getElementsByClassName("header-inner").item(0).appendChild(btn2);
// var styleSheet = document.getElementById("customStylesheet");

// btn2.addEventListener("click", function() {
//   if (styleSheet.disabled) {
//     styleSheet.disabled = false; // enable the stylesheet
//   } else {
//     styleSheet.disabled = true; // disable the stylesheet
//   }
// });
// Look for CSS files in the manifest

// function tr(team, callback) {
//   var currentDate = new Date();
//   var teamName = team.split('/')[5];
//   var teamId = team.match(/team\/(\d+)/)[1];

//   // Subtract one month
//   currentDate.setMonth(currentDate.getMonth() - 2);

//   // Format the date as YYYY-MM-DD
//   var year = currentDate.getFullYear();
//   var month = String(currentDate.getMonth() + 1).padStart(2, '0');
//   var day = String(currentDate.getDate()).padStart(2, '0');
//   var formattedDate = year + '-' + month + '-' + day;

//   // Output the formatted date
//   // console.log(formattedDate);
//   var teamRating = 0;
//   var newUrl = "https://www.vlr.gg/team/stats/" + teamId + "/" + teamName + "/?event_id=all&core_id=all&date_start=" + formattedDate + "&date_end=";
//   // console.log(newUrl);
//   var aUrl = "https://www.vlr.gg/team/matches/" + teamId + "/" + teamName;
//   $.get(aUrl, function (data) {
//     var winrates = $(data).find(".m-item-games");
//     var count = 0;
//     var wins = 0;
//     var loss = 0;
//     var form = 0;
//     // var sbreak = 0;
//     var breakLoop = false;

//     winrates.each(function () {
//       if (breakLoop) {
//         return false; // Exit the each function
//       }

//       score = $(this).find(".m-item-games-result .score").text();
//       var lines = score.split('\n');
//       // console.log(lines);
//       // console.log('-------------------');
//       lines.forEach(function (line) {
//         var scoreMatch = line.match(/\d+-\d+/);

//         if (scoreMatch) {
//           // if (count === 20) {
//           //   breakLoop = true;
//           //   return false; // Exit the forEach function
//           // }
//           var scores = scoreMatch[0].split('-');
//           var score1 = parseInt(scores[0]);
//           var score2 = parseInt(scores[1]);
//           // console.log(score1, score2, line, wins, loss);
//           wins += score1;
//           loss += score2;
//           // form++;
//           // count++;
//           // if (count === 20) {
//           //   breakLoop = true;
//           //   return false; // Exit the forEach function
//           // }
//           if (count === 4) {
//             form = (wins / (loss + wins));
//             // console.log(form, 'form');
//           }
//         }
//       });
//       count++;
//       if (count === 9) {
//         breakLoop = true;
//         // var form = form
//         // console.log(form, 'form', wins, loss);
//         return false; // Exit the forEach function
//       }
//       if (count === 4) {
//         form = (wins / (loss + wins));
//         // console.log(form, 'form');
//       }
//       //if count = 3 make form = wins/wins+loss

//     });
//     // console.log(form, 'form', wins, loss);
//     // form=1
//     var winrate = Math.round(form * ((wins / (wins + loss)) * 4000));
//     // console.log(teamName, winrate, count, wins, loss);
//     // console.log(winrates);
//     // console.log(teamName, winrate, count, wins, loss);
//     callback(winrate);
//   });
//   // return winrate;
//   // var winrate = Math.round((wins / (wins + loss)) * 3000);
// }
// $(document).ready(function () {

//   var teams = [
//     'https://www.vlr.gg/team/2593/fnatic',
//     'https://www.vlr.gg/team/474/team-liquid',
//     'https://www.vlr.gg/team/4915/natus-vincere',
//     'https://www.vlr.gg/team/1184/fut-esports',
//     'https://www.vlr.gg/team/2059/team-vitality',
//     'https://www.vlr.gg/team/397/bbl-esports',
//     'https://www.vlr.gg/team/2304/giants-gaming',
//     'https://www.vlr.gg/team/8877/karmine-corp',
//     'https://www.vlr.gg/team/1001/team-heretics',
//     'https://www.vlr.gg/team/7035/koi',
//     'https://www.vlr.gg/team/188/cloud9',
//     'https://www.vlr.gg/team/2/sentinels',
//     'https://www.vlr.gg/team/2406/furia',
//     'https://www.vlr.gg/team/120/100-thieves',
//     'https://www.vlr.gg/team/5248/evil-geniuses',
//     'https://www.vlr.gg/team/2355/kr-esports',
//     'https://www.vlr.gg/team/2359/leviat-n',
//     'https://www.vlr.gg/team/7386/mibr',
//     'https://www.vlr.gg/team/6961/loud',
//     'https://www.vlr.gg/team/1034/nrg-esports',
//     'https://www.vlr.gg/team/8185/drx',
//     'https://www.vlr.gg/team/624/paper-rex',
//     'https://www.vlr.gg/team/14/t1',
//     'https://www.vlr.gg/team/5448/zeta-division',
//     'https://www.vlr.gg/team/6199/team-secret',
//     'https://www.vlr.gg/team/17/gen-g',
//     'https://www.vlr.gg/team/878/rex-regum-qeon',
//     'https://www.vlr.gg/team/918/global-esports',
//     'https://www.vlr.gg/team/8304/talon-esports',
//     'https://www.vlr.gg/team/278/detonation-focusme',
//   ];
//   var franchise= [ 
//     'https://www.vlr.gg/player/93/mixwell',
//     'https://www.vlr.gg/player/3582/keloqz',
//   ];
//   //loop through teams and make a request to each team page
//   var teamRatings = [];
//   tct = 0;
  
//   teams.forEach(function(team) {
//     tr(team, function(winrate) {
//       tct++;
//       var teamName = team.split('/')[5];
//       teamRatings.push(teamName + ':' + winrate);
  
//       if (tct === 30) {
//         teamRatings.sort(function(a, b) {
//           var ratingA = parseInt(a.split(':')[1]);
//           var ratingB = parseInt(b.split(':')[1]);
//           return ratingB - ratingA; // Sort in descending order
//         });
        
//         // for (var i = 0; i < teamRatings.length; i++) {
//         //   var rating = teamRatings[i].split(':');
//         //   console.log(rating[0] + ': ' + rating[1]);
//         //   teams.forEach(function(team) {
//         //     if (team.split('/')[5] === rating[0]) {
//         //       var tmUrl = team;
//         //       $.get(tmUrl, function (data) {
//         //         var players = $(data).find(".team-roster-item a");
//         //         var playerCount = 0;
//         //         var totald=0;
//         //         players.each(function () {
//         //           var player = 'https://www.vlr.gg' + $(this).attr('href');
//         //           // console.log(player)
//         //           //check if player is in teams
//         //           // if (franchise.includes(player)) {
//         //             // playerCount++;
//         //             if (0===1) {
//         //               console.log(player, 'coach')
//         //             }
//         //             else{
//         //               // console.log(this, 'player')

          
//         //             console.log(player)
//         //             $.get(player, function (data) {
//         //               // console.log("tl", totald)
//         //               var tdElements = $(data).find('.mod-table tr td:nth-child(4)');
//         //               var tdCount = $(data).find('.mod-table tr td:nth-child(2) span');
//         //               // Calculate the sum and count of the values
//         //               var numbersArray = [];
//         //               tdCount.each(function () {
//         //                 var text = $(this).text();
//         //                 var match = /\((\d+)\)/.exec(text);
              
//         //                 if (match) {
//         //                   var number = parseInt(match[1]);
//         //                   numbersArray.push(number);
//         //                 }
//         //               });
//         //               // console.log(numbersArray);
//         //               var sum = 0;
//         //               var count = 0;
//         //               var total = 0;
//         //               tdElements.each(function () {
//         //                 // console.log(tdCount[count]);
//         //                 var number = numbersArray[count];
//         //                 var value = parseFloat($(this).text());
//         //                 if (!isNaN(value)) {
//         //                   sum += value * number;
//         //                   count++;
//         //                   total += number;
//         //                 }
//         //               });
              
//         //               // Calculate the mean
//         //               var mean = sum / total;
//         //               var mean = mean.toFixed(2);
//         //               // console.log('total', totald);
              
//         //               // console.log(teamName, total);
//         //               // var teamRating = Math.round(mean * teamRating);
//         //               // console.log(teamName, teamRating , mean);
//         //               if (!isNaN(mean)){
//         //                 playerCount++;
//         //                 totald = parseFloat(mean) + parseFloat(totald);
//         //               }
//         //               // console.log(mean, totald, playerCount);
//         //               if (playerCount === 5) {

//         //                 console.log(Math.round(parseInt(rating[1])*(totald/playerCount)), tmUrl);
//         //               }
//         //             });
                    
//         //           }

//         //         });
              
//         //       });
//         //       console.log(tmUrl, rating);
//         //     }
//         //   });
//         // }
//       }
//     });
//   });
// });  



    // localStorage.setItem('player', 0);
  
    // Get current date
   
    // $.get(newUrl, function (data) {
    //   var winrates = $(data).find(".mod-table tr td:nth-child(3) .mod-first");
    //   var winrates = $(data).find(".mod-table tr td:nth-child(3) .mod-first");
    //   // console.log(winrates);
    //   //loop over each wintate and if it is percentage, then add together
    //   var winrate = 0;
    //   var count = 0;
    //   winrates.each(function () {
    //     var text = $(this).text().trim();
    //     var match = /(\d+)%/.exec(text);
    //     if (match) {
    //       var number = parseInt(match[1]) / 100;
    //       winrate += number;
    //       count++;
    //     }
    //   });
    //   var averageWinrate = winrate / count;
    //   // console.log(averageWinrate);
    //   var teamRating = Math.round(averageWinrate * 2000);
    //   console.log(teamName, teamRating);
    //   localStorage.setItem(teamName, teamRating);
    // });
    // console.log("rtg", localStorage.getItem(teamName), teamRating);
    // $.get(team, function (data) {
    //   // console.log("rtg", localStorage.getItem(teamName));
    //   var teamRating = localStorage.getItem(teamName);
    //   var players = $(data).find(".team-roster-item a");
    //   var playerCount = 0;
    //   var totald=0;
    //   players.each(function () {
    //     var player = 'https://www.vlr.gg' + $(this).attr('href');
    //     // console.log(player);
    //     // var total=0;
    //     $.get(player, function (data) {
    //       console.log("tl", totald)
    //       var tdElements = $(data).find('.mod-table tr td:nth-child(4)');
    //       var tdCount = $(data).find('.mod-table tr td:nth-child(2) span');
    //       // Calculate the sum and count of the values
    //       var numbersArray = [];
    //       tdCount.each(function () {
    //         var text = $(this).text();
    //         var match = /\((\d+)\)/.exec(text);
  
    //         if (match) {
    //           var number = parseInt(match[1]);
    //           numbersArray.push(number);
    //         }
    //       });
    //       // console.log(numbersArray);
    //       var sum = 0;
    //       var count = 0;
    //       var total = 0;
    //       tdElements.each(function () {
    //         // console.log(tdCount[count]);
    //         var number = numbersArray[count];
    //         var value = parseFloat($(this).text());
    //         if (!isNaN(value)) {
    //           sum += value * number;
    //           count++;
    //           total += number;
    //         }
    //       });
  
    //       // Calculate the mean
    //       var mean = sum / total;
    //       var mean = mean.toFixed(2);
    //       // console.log('total', totald);
  
    //       // console.log(teamName, total);
    //       // var teamRating = Math.round(mean * teamRating);
    //       // console.log(teamName, teamRating , mean);
    //       if (!isNaN(mean)){
    //         playerCount++;
    //         totald = parseFloat(mean) + parseFloat(totald);
    //         // console.log(mean, totald);
    //       }
    //       localStorage.setItem('time', totald);
    //       localStorage.setItem('player', playerCount);
    //       // console.log('loscal', localStorage.getItem('time'), localStorage.getItem('player'));
    //     });
    //     // console.log('local', localStorage.getItem('time'), localStorage.getItem('player'));
    //   });
    //   // console.log('local', localStorage.getItem('time'), localStorage.getItem('player'));
    //   var totald = localStorage.getItem('time');
    //   var playerCount = localStorage.getItem('player');
    //   // var teamRating = 0;
    //   // var teamRating = Math.round(parseFloat(Math.round(totald / playerCount)) * parseFloat(teamRating));
    //   // console.log('totals', totald, teamRating, teamName, playerCount);
    // });
