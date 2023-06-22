// Get all elements on the page
const allElems = document.querySelectorAll("*");
var postBody;


// Loop through each element
for (let i = 0; i < allElems.length; i++) {
  const elem = allElems[i];

  // Remove the ".wf-card" class
  elem.classList.remove("wf-card");
  elem.classList.remove("mod-color");
}
// Get all divs with the class 'header-div'
const headerDivs = document.querySelectorAll('.header-div');

// Loop through each header div
headerDivs.forEach(headerDiv => {
  // Check if the div is empty
  if (headerDiv.innerHTML.trim() === '') {
    // Remove the div
    headerDiv.remove();
  }
});  // Create the necessary elements
// Create button
const button = document.createElement("div");
button.id = "theme-button";
button.innerHTML = String.fromCodePoint(0x1F3A8);
// button.classList.add("header-nav-item");

// Add click event listener to button
button.addEventListener("click", () => {
  // Create modal
  const modal = document.createElement("div");
  modal.classList.add("modal");

  // Create modal content
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Create title
  const title = document.createElement("h2");
  title.textContent = "Choose Theme";
  modalContent.appendChild(title);

  // Create color picker
  const colorPickerWrapper = document.createElement("div");
  colorPickerWrapper.classList.add("color-picker-wrapper");

  const colorPickerInput = document.createElement("input");
  colorPickerInput.type = "color";
  colorPickerInput.classList.add("color-picker");

  // Read saved color from localStorage

  colorPickerInput.addEventListener("change", (event) => {
    const newColor = event.target.value;
    document.documentElement.style.setProperty("--color", newColor);
    colorPickerLabel.style.backgroundColor = newColor;

    // Save selected color to localStorage
    localStorage.setItem("color", newColor);
  });


  const colorPickerLabel = document.createElement("label");
  colorPickerLabel.classList.add("color-picker-label");
  colorPickerWrapper.appendChild(colorPickerInput);
  colorPickerWrapper.appendChild(colorPickerLabel);

  // // Create color value
  // const colorValue = document.createElement("span");
  // colorValue.classList.add("color-value");
  // colorValue.textContent = getComputedStyle(document.documentElement).getPropertyValue("--color");

  modalContent.appendChild(colorPickerWrapper);
  // modalContent.appendChild(colorValue);

  // Add modal content to modal
  modal.appendChild(modalContent);

  // Add modal to page
  document.body.appendChild(modal);

  // Remove modal when clicking outside of it
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });
});

// Add button to page
//const nav = document.getElementsByClassName("header-inner");
document.getElementsByClassName("header-inner").item(0).appendChild(button);
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

  if (localStorage.getItem('texture')) {
    $('body').get(0).style.setProperty('--img', localStorage.getItem('texture'));
  }
  if (localStorage.getItem('shade')) {
    $('body').get(0).style.setProperty('--shade', localStorage.getItem('shade'));
  }
  if (localStorage.getItem('postcol')) {
    var geTextLight = document.querySelector('.post-body');
    if (geTextLight != null) {
      $(".post-body").css('color', localStorage.getItem('postcol'));
    }
  }
  const forbiddenUrlPrefix = "https://www.vlr.gg/user/";
  var profileName = window.location.pathname.split('/').pop();
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
$(document).ready(function () {
  console.log($("#wrapper").css("background-color"));
  if ($("#wrapper").css("background-color") === "rgb(218, 218, 220)") {
    // console.log("dark");
    $('body').get(0).style.setProperty('--img', 'url("https://img.freepik.com/free-photo/grunge-wall-texture_1194-5334.jpg?w=740&t=st=1683760490~exp=1683761090~hmac=566c94bbb7040cdea39ef0f208614ecb09c836728807cf0d3431846af2f5041f")');
    localStorage.setItem('texture', 'url("https://img.freepik.com/free-photo/grunge-wall-texture_1194-5334.jpg?w=740&t=st=1683760490~exp=1683761090~hmac=566c94bbb7040cdea39ef0f208614ecb09c836728807cf0d3431846af2f5041f")');
    localStorage.setItem('shade', '0, 0, 0');
    localStorage.setItem('postcol', 'black')
    $('body').get(0).style.setProperty('--shade', '0, 0, 0');
    var geTextLight = document.querySelector('.post-body');
    if (geTextLight != null) {
      $(".post-body").css('color', 'black');
    }
    if (localStorage.getItem('camo') === 'on') {
      $('body').get(0).style.setProperty('--img', 'url("https://www.icolorpalette.com/download/solidcolorimage/ededed_solid_color_background_icolorpalette.png")');
      localStorage.setItem('texture', 'url("https://www.icolorpalette.com/download/solidcolorimage/ededed_solid_color_background_icolorpalette.png")');  
    }
  }
  else {
    var geTextLight = document.querySelector('.post-body');
    if (geTextLight != null) {
      $(".post-body").css('color', 'white');
    }
    $('body').get(0).style.setProperty('--img', 'url("https://img.freepik.com/free-photo/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall_1258-28312.jpg?w=900&t=st=1683622001~exp=1683622601~hmac=967bf231ef09d0e5d179f41641ae2bd59be87c351d7040907fffbcbfc1e0110c")');
    $('body').get(0).style.setProperty('--shade', '255, 255, 255');
    localStorage.setItem('texture', 'url("https://img.freepik.com/free-photo/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall_1258-28312.jpg?w=900&t=st=1683622001~exp=1683622601~hmac=967bf231ef09d0e5d179f41641ae2bd59be87c351d7040907fffbcbfc1e0110c")');
    localStorage.setItem('shade', '255, 255, 255');
    localStorage.setItem('postcol', 'white')
    if (localStorage.getItem('camo') === 'on') {
      $('body').get(0).style.setProperty('--img', 'url("https://www.colorhexa.com/0a0a0a.png")');
      localStorage.setItem('texture', 'url("https://www.colorhexa.com/0a0a0a.png")');  
    }
  }
});
$(".header-switch").click(function () {
  if ($("#wrapper").css("background-color") === "rgb(47, 51, 55)") {
    $('body').get(0).style.setProperty('--img', 'url("https://img.freepik.com/free-photo/grunge-wall-texture_1194-5334.jpg?w=740&t=st=1683760490~exp=1683761090~hmac=566c94bbb7040cdea39ef0f208614ecb09c836728807cf0d3431846af2f5041f")');
    localStorage.setItem('texture', 'url("https://img.freepik.com/free-photo/grunge-wall-texture_1194-5334.jpg?w=740&t=st=1683760490~exp=1683761090~hmac=566c94bbb7040cdea39ef0f208614ecb09c836728807cf0d3431846af2f5041f")');
    localStorage.setItem('shade', '0, 0, 0');
    localStorage.setItem('postcol', 'black')
    $('body').get(0).style.setProperty('--shade', '0, 0, 0');
    var geTextLight = document.querySelector('.post-body');
    if (geTextLight != null) {
      $(".post-body").css('color', 'black');
    }
    if (localStorage.getItem('camo') === 'on') {
      $('body').get(0).style.setProperty('--img', 'url("https://www.icolorpalette.com/download/solidcolorimage/ededed_solid_color_background_icolorpalette.png")');
      localStorage.setItem('texture', 'url("https://www.icolorpalette.com/download/solidcolorimage/ededed_solid_color_background_icolorpalette.png")');  
    }
  }
  else {
    var geTextLight = document.querySelector('.post-body');
    if (geTextLight != null) {
      $(".post-body").css('color', 'white');
    }
    $('body').get(0).style.setProperty('--img', 'url("https://img.freepik.com/free-photo/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall_1258-28312.jpg?w=900&t=st=1683622001~exp=1683622601~hmac=967bf231ef09d0e5d179f41641ae2bd59be87c351d7040907fffbcbfc1e0110c")');
    $('body').get(0).style.setProperty('--shade', '255, 255, 255');
    localStorage.setItem('texture', 'url("https://img.freepik.com/free-photo/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall_1258-28312.jpg?w=900&t=st=1683622001~exp=1683622601~hmac=967bf231ef09d0e5d179f41641ae2bd59be87c351d7040907fffbcbfc1e0110c")');
    localStorage.setItem('shade', '255, 255, 255');
    localStorage.setItem('postcol', 'white')
    if (localStorage.getItem('camo') === 'on') {
      $('body').get(0).style.setProperty('--img', 'url("https://www.colorhexa.com/0a0a0a.png")');
      localStorage.setItem('texture', 'url("https://www.colorhexa.com/0a0a0a.png")');  
    }
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
        if (lastChild.text().includes("Playoffs") && lastChild.text().includes("1st")) {
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
      nextDiv.children().last().append('<div class="trophyIcon"></div>');
    }
  }

  console.log("Trophy Count: " + trophyCount);
});

// Get the vote counts for each team (these can be updated dynamically)
// let team1Votes = 3;
// let team2Votes = 0;

// // Calculate the percentage of votes for each team
// let totalVotes = team1Votes + team2Votes;
// let team1Percentage = (totalVotes > 0) ? (team1Votes / totalVotes) * 100 : 0;
// let team2Percentage = (totalVotes > 0) ? (team2Votes / totalVotes) * 100 : 0;

// // Get the team names
// let team1Name = $('.mod-1 .wf-title-med').text();
// let team2Name = $('.mod-2 .wf-title-med').text();

// // Create the prediction bar elements
// let bar1 = $('<div>').addClass('prediction-bar');
// let bar2 = $('<div>').addClass('prediction-bar');

// bgcolor=getComputedStyle(document.documentElement).getPropertyValue('--color')
// // Set the background color of each bar based on the percentage of votes
// bar1.css('background-color', `hsl(${bgcolor}, 70%, ${team1Percentage}%)`);
// bar2.css('background-color', `hsl(${bgcolor}, 70%, ${team2Percentage}%)`);

// // Set the width of each bar based on the percentage of votes
// bar1.css('width', `${team1Percentage}%`);
// bar2.css('width', `${team2Percentage}%`);

// // Set the text of each bar to the team name
// bar1.text(team1Name);
// bar2.text(team2Name);
// if (team1Votes > 0) {
// bar1.text(team1Name + " " + team1Votes + " votes");
// }
// if (team2Votes > 0) {
// bar2.text(team2Name + " " + team2Votes + " votes");
// }
// bar1.click(function() {
//   if (team1Votes == 0) {
//     team1Votes = 1;
//     let totalVotes = team1Votes + team2Votes;
// let team1Percentage = (totalVotes > 0) ? (team1Votes / totalVotes) * 100 : 0;
// let team2Percentage = (totalVotes > 0) ? (team2Votes / totalVotes) * 100 : 0;
// bar1.css('width', `${team1Percentage}%`);
// bar2.css('width', `${team2Percentage}%`);
// bar1.text(`${team1Name}: ${team1Votes} vote(s), ${team1Percentage.toFixed(1)}%`);
// bar2.text(`${team2Name}: ${team2Votes} vote(s), ${team2Percentage.toFixed(1)}%`);  }
//   else{
//     team1Votes= team1Votes + 1;
//     let totalVotes = team1Votes + team2Votes;
// let team1Percentage = (totalVotes > 0) ? (team1Votes / totalVotes) * 100 : 0;
// let team2Percentage = (totalVotes > 0) ? (team2Votes / totalVotes) * 100 : 0;
// bar1.css('width', `${team1Percentage}%`);
// bar2.css('width', `${team2Percentage}%`);
// bar1.text(`${team1Name}: ${team1Votes} vote(s), ${team1Percentage.toFixed(1)}%`);
// bar2.text(`${team2Name}: ${team2Votes} vote(s), ${team2Percentage.toFixed(1)}%`);
//   }
// });
// bar2.click(function() {
//   if (team2Votes == 0) {
//     team2Votes = 1;
//     let totalVotes = team1Votes + team2Votes;
// let team1Percentage = (totalVotes > 0) ? (team1Votes / totalVotes) * 100 : 0;
// let team2Percentage = (totalVotes > 0) ? (team2Votes / totalVotes) * 100 : 0;
// bar1.css('width', `${team1Percentage}%`);
// bar2.css('width', `${team2Percentage}%`);
// bar1.text(`${team1Name}: ${team1Votes} vote(s), ${team1Percentage.toFixed(1)}%`);
// bar2.text(`${team2Name}: ${team2Votes} vote(s), ${team2Percentage.toFixed(1)}%`);  }
//   else{
//     team2Votes++;
//     let totalVotes = team1Votes + team2Votes;
// let team1Percentage = (totalVotes > 0) ? (team1Votes / totalVotes) * 100 : 0;
// let team2Percentage = (totalVotes > 0) ? (team2Votes / totalVotes) * 100 : 0;
// bar1.css('width', `${team1Percentage}%`);
// bar2.css('width', `${team2Percentage}%`);
// bar1.text(`${team1Name}: ${team1Votes} vote(s), ${team1Percentage.toFixed(1)}%`);
// bar2.text(`${team2Name}: ${team2Votes} vote(s), ${team2Percentage.toFixed(1)}%`);  }
// });

// // Add the bars to the page
// $('.match-header').append("<div class='prediction-bars'></div>");
// $('.prediction-bars').append(bar1).append(bar2);
// //  * 100 : 0;
// //         bar1.css('width', `${team1Percentage}%`);
// //         bar2.css('width', `${team2Percentage}%`);
// //         bar1.text(`${team1Name}: ${totalVotes - team2Votes} vote(s), ${team1Percentage.toFixed(1)}%`);
// //         bar2.text(`${team2Name}: ${team2Votes} vote(s), ${team2Percentage.toFixed(1)}%`);
// //         setCookie('team2Votes', team2Votes);
// //         setCookie('totalVotes', totalVotes);
// //         // localStorage.setItem('hasVoted', 'true');
// //     }
// //     else {
// //         alert("You have already voted!");
// //     }
// // });

// // function setCookie(name, value, days) {
// //     let expires = "";
// //     if (days) {
// //         let date = new Date();
// //         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
// //         expires = "; expires=" + date.toUTCString();
// //     }
// //     let path = "; path=" + window.location.pathname; // set path to current page's path
// //     document.cookie = name + "=" + (value || "")  + expires + path + "; SameSite=Strict; Secure";
// // }


// // function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
// }


// // Add the bars to the page
// $('.match-header').append("<div class='prediction-bars'></div>");
// $('.prediction-bars').append(bar1).append(bar2);
// $('.prediction-bars').append("<div class='graybars'></div>")
// $('.graybars').append(bar3).append(bar4);

// find the second div with class "moment-tz-convert" and get the data-utc-ts attribute

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
  const btn = $("<a class='calenderbtn'></a>");
  btn.attr("href", link);
  btn.attr("target", '_blank');
  btn.text("Add to Google Calendar");
  // Append the link element to the body element of the document
  $(".match-header").append('<div class="clnd"></div>')
  $(".clnd").append(btn);


  $('.calenderbtn').css('color', function (index, value) {
    console.log(value);
    var rgb = value.match(/\d+/g); // extract RGB values
    console.log(rgb);
    var r = rgb[0]; // invert red component
    var g = rgb[1]; // invert green component
    var b = rgb[2]; // invert blue component
    return 'rgb(' + r + ',' + g + ',' + b + ')'; // return inverted color
    console.log('rgb(' + r + ',' + g + ',' + b + ')');
  });
}
// $(document).ready(function () {
//     // Loop through all elements with class "wf-label"
//     $('.wf-label').each(function () {
//         // Check if the text content of the element is "Live Streams" after trimming whitespace
//         if ($(this).text().trim() === "Live Streams") {
//             // Change the text to "Watch Parties"
//             $(this).text("Watch Parties");

//             // Find the first "mod-sidebar" element after this "wf-label" element
//             var $modSidebar = $(this).nextAll('.mod-sidebar:first');

//             // Add a new "h1" element with class "wf-label" and "mod-sidebar" after the "mod-sidebar" element
//             $('<h1>', {
//                 class: 'wf-label mod-sidebar',
//                 text: 'Other Streams'
//             }).insertAfter($modSidebar);
//         }
//     });
// });
if ($('.thread-header-desc').length) {
  if (localStorage.getItem('original_poster')) {
    if (localStorage.getItem('original_poster') === 'on') {
      if ($(".thread-header-desc").text().trim().startsWith("posted in")) {
        var firstAuthor = $('.post-header-author').first().text();
        $('.post-header-author').each(function () {
          if ($(this).text() === firstAuthor) {
            $(this).after('<span class="original">OP</span>');
          }
        });
      }
    }
  }
}
$('.vm-stats-gamesnav').removeClass('noselect');
$.get("https://snippet.host/wjgwkc/raw", function (data) {
  var plusUpdate = $(data);
  $(".js-home-threads").after(data);
});
// Blocked words array

var blockedWords = ["vlr"];
// Check if the URL matches the specified pattern
// Check if the URL matches the specified pattern
$(document).ready(function() {
  // Check if font is saved in localStorage
  var savedFont = localStorage.getItem('font');
  if (savedFont) {
    applyFont(savedFont);
    $('#font-input').val(savedFont);
  }
  
  $('#submit-btn').click(function() {
    var fontName = $('#font-input').val();
    applyFont(fontName);
    
    // Save font to localStorage
    localStorage.setItem('font', fontName);
  });
  
  $('#reset-btn').click(function() {
    resetFont();
  });
});

function applyFont(fontName) {
  // Remove any existing font stylesheet
  $('link#font-stylesheet').remove();
  
  // Add the new font stylesheet
  var fontStylesheet = '<link id="font-stylesheet" rel="stylesheet" href="https://fonts.googleapis.com/css?family=' + fontName + '">';
  $('head').append(fontStylesheet);
  
  // Apply the font to all elements
  $('*:not(.fa)').css('font-family', "'" + fontName + "', serif");
  }

function resetFont() {
  // Remove font from localStorage
  localStorage.removeItem('font');
  
  // Remove any existing font stylesheet
  $('link#font-stylesheet').remove();
  
  // Apply default font
  $('*').css('font-family', 'serif');
  
  // Clear the input field
  $('#font-input').val('');
}
if (window.location.href === 'https://www.vlr.gg/settings') {

  $('<div class="form-label">Change Font</div>').insertBefore('input[type="submit"]');
  var fontchange = $('<div id="fontchange"><input type="text" id="font-input"><button id="submit-btn">Submit</button><button id="reset-btn">Reset</button></div><br>');
  fontchange.insertBefore('input[type="submit"]');
  // Add a h1 with the "Mute Words" text
  $('<div class="form-label">Mute Words</div>').insertBefore('input[type="submit"]');

  var flexbtn = $('<div id="flexbtn"><input type="text" id="wordInput"><div id="updateButton">Update Blocked Words</div></div>');
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
        $(this).children('p').hide();
        $(this).append('<p class="blocked">Contains blocked word</p>');
        // add button to toggle content
        $(this).append('<div class="toggle">Show Content</div>');
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
  var sportmode = $('<div class="sportMode">').text('Sport Mode');
  sportmode.insertBefore($submitButton);
  sportmode.click(function () {
    if (localStorage.getItem('sport_mode') === 'on') {
      $('.sportMode').css('background-color', 'red');
      localStorage.setItem('sport_mode', 'off');
      $('.sporthide').show();
    }
    else {
      $('.sportMode').css('background-color', 'green');
      localStorage.setItem('sport_mode', 'on');
      $('.sporthide').hide();
    }
    $('a[href="/threads"]').toggle();
  });
  var secretLink = $('<div class="secretLink">').text('Link Preview');
  secretLink.insertBefore($submitButton);
  secretLink.click(function () {
    if (localStorage.getItem('secret_link') === 'on') {
      $('.secretLink').css('background-color', 'red');
      localStorage.setItem('secret_link', 'off');
    }
    else {
      $('.secretLink').css('background-color', 'green');
      localStorage.setItem('secret_link', 'on');
    }
  });
  var camo = $('<div class="camo">').text('Turn Camo On/Off');
  camo.insertBefore($submitButton);
  camo.click(function () {
    console.log(localStorage.getItem('camo'));
    if (localStorage.getItem('camo') === 'on') {
      $('.camo').css('background-color', 'red');
      localStorage.setItem('camo', 'off');
    }
    else {
      $('.camo').css('background-color', 'green');
      localStorage.setItem('camo', 'on');
    }
    console.log(localStorage.getItem('camo'));
  });
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



var isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;



$(document).ready(function () {
  if (!isMobile) {
  var currentURL = window.location.href;

  if (!currentURL.startsWith("https://www.vlr.gg/events") && !currentURL.startsWith("https://www.vlr.gg/user") && !currentURL.startsWith("https://www.vlr.gg/privacy") && !currentURL.startsWith("https://www.vlr.gg/matches") && !currentURL.startsWith("https://www.vlr.gg/inbox") && !currentURL.startsWith("https://www.vlr.gg/settings") && !currentURL.startsWith("https://www.vlr.gg/stats") && !currentURL.startsWith("https://www.vlr.gg/rankings") && !currentURL.startsWith("https://www.vlr.gg/team") && !currentURL.startsWith("https://www.vlr.gg/player")) {
    $(".mod-1:first").addClass("sporthide");
    $(".noselect").addClass("sporthide");
    $(".post-container").addClass("sporthide");
    $(".action-container").addClass("sporthide");
    $('form[action="/post/add"]').addClass("sporthide");
  }
  if (localStorage.getItem('sport_mode') === 'on') {
    $('.sporthide').hide();
    $('a[href="/threads"]').hide();
    $('.mod-user').hide();
    $('.mod-inbox').hide();
    $('.sportMode').css('background-color', 'green');
  }
  else {
    $('.sportMode').css('background-color', 'red');
    $('.sporthide').show();
    $('a[href="/threads"]').show();
    $('.mod-user').show();
    $('.mod-inbox').show();
  }
}
  if (localStorage.getItem('secret_link') === 'on') {
    $(".secretLink").css("background-color", "green");
  }
  else {
    $(".secretLink").css("background-color", "red");
  }
  if (localStorage.getItem('camo') === 'on') {
    $(".camo").css("background-color", "green");
  }
  else {
    $(".camo").css("background-color", "red");
  }

});

function extractClipId(url) {
  var regex = /clip\/([^\/]*)/;
  var match = url.match(regex);
  if (match && match.length >= 2) {
    return match[1];
  }
  return null;
}

// 
// $(document).ready(function() {
  // $('.post-body > *').each(function() {
  //   var twitchClipLink = $(this).html().trim();
  //   var clipId = extractClipId(twitchClipLink);
    
  //   if (clipId) {
      // var iframeCode = '<iframe src="https://clips.twitch.tv/embed?clip=' + clipId + '&parent=www.vlr.gg" height="360" width="640" allowfullscreen></iframe>';
  //     $(this).html(iframeCode);
  //   }
  // });

//   function extractClipId(url) {
//     var regex = /clip\/([^\/]*)/;
//     var match = url.match(regex);
//     if (match && match.length >= 2) {
//       return match[1];
//     }
//     return null;
//   }
// });

// $(document).ready(function() {
//   $('.post-body > *').each(function() {
//     var youtubeLink = $(this).html().trim();
//     var videoId = extractVideoId(youtubeLink);

//     if (videoId) {
//       var iframeCode = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
//       $(this).html(iframeCode);
//     }
//   });

//   function extractVideoId(url) {
//     var regex = /[?&]v=([^&#]*)/;
//     var match = url.match(regex);
//     if (match && match.length >= 2) {
//       return match[1];
//     }
//     return null;
//   }
// });
// $(document).ready(function() {
//   $('.post-body > *').each(function() {
//     var postContent = $(this).html().trim();
//     var updatedContent = replaceTwitchLinks(postContent);
//     updatedContent = replaceYouTubeLinks(updatedContent);
//     $(this).html(updatedContent);
//   });

//   function replaceTwitchLinks(content) {
//     var regex = /(https?:\/\/(?:www\.)?twitch\.tv\/[^\/]+\/clip\/([^\s]+))/g;
//     var parentDomain = 'www.vlr.gg';
//     var iframeCode = '<iframe src="https://clips.twitch.tv/embed?clip=$2&parent=' + parentDomain + '" height="360" width="640" allowfullscreen></iframe>';
//     return content.replace(regex, iframeCode);
//   }
  

//   function replaceYouTubeLinks(content) {
//     var regex = /(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([^\s&]+))/g;
//     if (content.includes('youtu.be')) {
//       var regex = /(https?:\/\/(?:www\.)?youtu\.be\/([^\s&]+))/g;
//     }
//     var youtubeEmbedTemplate = '<iframe width="560" height="315" src="https://www.youtube.com/embed/$2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
//     return content.replace(regex, youtubeEmbedTemplate);
//   }  
//   //make function if anye elements text = target="_blank" rel="nofollow" class="tooltipt"> then remove it
//   function removeTooltip(content) {
//     var eegex = 'target="_blank" rel="nofollow" class="tooltipt">';
//     if (content == eegex) {
//     return '';
//   }
// }
//   //loop over every iframe and if src contains '</a>' then remove it
// $('iframe').each(function() {
//   // console.log($(this));
//   if ($(this).attr('src') != undefined) {
//   if ($(this).attr('src').includes('</a>')) {
//     $(this).attr('src', $(this).attr('src').replace('</a>', ''));
//   }
//   if ($(this).attr('src').includes('</p>')) {
//     $(this).attr('src', $(this).attr('src').replace('</p>', ''));
//   }
//   if ($(this).attr('src').includes('<br>')) {
//     $(this).attr('src', $(this).attr('src').replace('<br>', ''));
//   }
// }
// });
// });
// $(document).ready(function() {
//   $('.post-body > * > a').each(function() {
//     var tt = $(this).text().trim();
//     var tt2 = removeTooltip(tt);
//     $(this).text(tt2);
//   });
//   function removeTooltip(content) {
//     var eegex = 'target="_blank" rel="nofollow"';
//     if (content == eegex) {
//     return '';
//   }
// }
// });

$(document).ready(function() {
  $('.post-editor-header').each(function() {
    var emojiIcon = $('<div class="emoji-icon">&#x1F603;</div>');
    var emojiModal = $('<div class="emoji-modal">' +
    '<p>Team Emojis</p>' +
    '<img class="emoji" src="//owcdn.net/img/628addcbd509e.png" alt=":c9;">' +
    '<img class="emoji" src="//owcdn.net/img/62a409ad29351.png" alt=":eg;">' +
    '<img class="emoji" src="//owcdn.net/img/62875027c8e06.png" alt=":sen;">' +
    '<img class="emoji" src="//owcdn.net/img/603c00d5c5a08.png" alt=":100t;">' +
    '<img class="emoji" src="//owcdn.net/img/62874d7ac0534.png" alt=":nrg;">' +
    '<img class="emoji" src="//owcdn.net/img/63976677069e1.png" alt=":kru;">' +
    '<img class="emoji" src="//owcdn.net/img/61b8888cc3860.png" alt=":lev;">' +
    '<img class="emoji" src="//owcdn.net/img/62bbec8dc1b9f.png" alt=":loud;">' +
    '<img class="emoji" src="//owcdn.net/img/632be7626d6d9.png" alt=":mibr;">' +
    '<img class="emoji" src="//owcdn.net/img/632be843b7d51.png" alt=":fur;">' +
    '<img class="emoji" src="//owcdn.net/img/62fe0b8f6b084.png" alt=":t1;">' +
    '<img class="emoji" src="//owcdn.net/img/63b17abd77fc0.png" alt=":drx;">' +
    '<img class="emoji" src="//owcdn.net/img/62a1d44914aa9.png" alt=":geng;">' +
    '<img class="emoji" src="//owcdn.net/img/62bbeba74d5cb.png" alt=":prx;">' +
    '<img class="emoji" src="//owcdn.net/img/629f316ddd4dd.png" alt=":ge;">' +
    '<img class="emoji" src="//owcdn.net/img/629f17f51e7a3.png" alt=":rrq;">' +
    '<img class="emoji" src="//owcdn.net/img/63972e548cdc9.png" alt=":dfm;">' +
    '<img class="emoji" src="//owcdn.net/img/62a411783d94d.png" alt=":zeta;">' +
    '<img class="emoji" src="//owcdn.net/img/629f13085ead6.png" alt=":ts;">' +
    '<img class="emoji" src="//owcdn.net/img/6226f3d764e03.png" alt=":tln;">' +
    '<img class="emoji" src="//owcdn.net/img/640c381f0603f.png" alt=":tl;">' +
    '<img class="emoji" src="//owcdn.net/img/62a40cc2b5e29.png" alt=":fnc;">' +
    '<img class="emoji" src="//owcdn.net/img/62a4109ddbd7f.png" alt=":navi;">' +
    '<img class="emoji" src="//owcdn.net/img/632be9976b8fe.png" alt=":fut;">' +
    '<img class="emoji" src="//owcdn.net/img/6466d79e1ed40.png" alt=":vit;">' +
    '<img class="emoji" src="//owcdn.net/img/6346b8ad2331d.png" alt=":koi;">' +
    '<img class="emoji" src="//owcdn.net/img/627403a0d9e48.png" alt=":kc;">' +
    '<img class="emoji" src="//owcdn.net/img/637b755224c12.png" alt=":th;">' +
    '<img class="emoji" src="//owcdn.net/img/634b4412d95b3.png" alt=":bbl;">' +
    '<img class="emoji" src="//owcdn.net/img/61dfcae52b0d8.png" alt=":gia;">' +
    '<p>Pepes</p>' +
    '<img class="emoji" src="https://emoji.discadia.com/emojis/0fc8cd8f-bc87-4f06-a4ca-84b35b3daf2d.gif" alt=":pepenoob;">' +
    '<img class="emoji" src="https://emoji.discadia.com/emojis/a871d706-578b-4b1e-b56b-ea7bde6e14fd.GIF" alt=":pepehappy;">' +
    '<img class="emoji" src="https://emoji.discadia.com/emojis/0e63fbc0-33a4-45be-8c90-d733c535e0db.png" alt=":peperage;">' +
    '<img class="emoji" src="https://emoji.discadia.com/emojis/14e5562c-c368-4c40-8d67-3cc84f04f269.GIF" alt=":pepeclap;">' +
    '<img class="emoji" src="https://emoji.discadia.com/emojis/4548f68f-ef3b-4e6f-a307-e6ff778284e1.PNG" alt=":pepehide;">' +
    '<img class="emoji" src="https://emoji.discadia.com/emojis/edcbf71c-04ba-44ee-812d-b66550ac72f0.GIF" alt=":pepelaugh;">' +
    '<img class="emoji" src="https://emoji.discadia.com/emojis/0d1d3ac4-c8e0-49cf-b02b-37224347133b.GIF" alt=":pepesteer;">' +
    '<img class="emoji" src="https://emoji.discadia.com/emojis/c3617497-81c1-4e37-a5c4-7f50853795cd.PNG" alt=":pepefeelsbad;">' +
    '<img class="emoji" src="https://emoji.discadia.com/emojis/7b856dcc-ce74-4ee4-a770-081a55ba3ad5.GIF" alt=":pepelaser;">' +
    '<img class="emoji" src="https://emoji.discadia.com/emojis/e4890f2e-65c3-49a3-83a8-e191be0e53d1.webp" alt=":pepeyes;">' +
    '<img class="emoji" src="https://emoji.discadia.com/emojis/2b17a3b6-ca67-4d2c-a9b9-a07b6fe582a9.gif" alt=":pepepog;">' +
    '<img class="emoji" src="https://emoji.discadia.com/emojis/PepeKMS.png" alt=":pepekms;">' +
    '<img class="emoji" src="https://emoji.discadia.com/emojis/04a7b8f4-fa23-472c-9373-365fe561ad5d.png" alt=":pepemad;">' +
    '<img class="emoji" src="https://emoji.discadia.com/emojis/4b8a69a1-c7f8-49fe-851c-2ff90f2a3912.png" alt=":pepethink;">' +
    '<img class="emoji" src="https://emoji.discadia.com/emojis/037fa260-56cf-4503-ac14-d25a082ec590.png" alt=":pepeno;">' +
    '<img class="emoji" src="https://emoji.discadia.com/emojis/ed2b4409-16e4-4810-8372-eaf71553bfc0.gif" alt=":pepelmao;">' +
    '<img class="emoji" src="https://emoji.discadia.com/emojis/b07d109f-4b79-4df2-9f11-4a158809f7b3.gif" alt=":pepeshoot;">' +
    '<img class="emoji" src="https://emoji.discadia.com/emojis/0eadc90a-2017-44cc-a9a4-9937cdd06c3e.png" alt=":pepecry;">' +
    '<p>Agents</p>' +
    '<img class="emoji" src="https://emoji.discadia.com/emojis/9208e8c8-e055-4dd9-aed4-8135c43d66ef.PNG" alt=":phoenix;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/bd1caa1d-b711-43b5-99dd-700ea99920c2.PNG" alt=":astra;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/b3572b7a-afbc-44b9-8d6a-191baf3b760e.PNG" alt=":raze;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/2786e758-8898-4e3b-8b54-b3919aea471a.PNG" alt=":cypher;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/c19223d9-5c77-448a-bdd8-54e5af724765.PNG" alt=":yoru;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/f6cf98e0-6c7f-4577-b623-4bc02295e556.PNG" alt=":fade;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/6b23e9f8-74e2-487e-b29f-86e9324585ae.PNG" alt=":reyna;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/22796c30-232d-4cb6-9be9-f9eb5d681a0b.PNG" alt=":omen;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/b7232996-34e3-4321-a539-d3edecc04df0.PNG" alt=":brimstone;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/f7c9f441-d4a1-4f39-9472-706372b01cda.PNG" alt=":kayo;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/eac4792e-e46b-4e68-9eba-f8cb5bd15b7f.PNG" alt=":breach;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/1da15151-6320-4249-a07b-8ca0cf0c4e7a.PNG" alt=":sova;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/60ee1673-3b02-451b-839f-455abc283aa2.PNG" alt=":killjoy;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/9ed08f69-8a79-45e7-a92c-f7eaadf86296.PNG" alt=":sage;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/1afc5190-8418-4ab1-95bb-81e12fcf5527.PNG" alt=":viper;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/91a8df3f-f262-448f-bfe1-497e946e3c5b.PNG" alt=":skye;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/59377212-8498-497d-b298-758ff54d2bd4.PNG" alt=":jett;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/fd0e7f3d-99e0-4ce6-810d-01a98661f9e2.png" alt=":harbor;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/2270f0d0-8f0b-4d28-9a48-ad023c4ca2ac.png" alt=":gekko;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/358f33f4-afe0-4c3f-be31-e5f95d1a9832.PNG" alt=":neon;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/a994f2cb-f48b-43dc-8313-a23f39d2cdde.PNG" alt=":chamber;">' +
'<p>Other</p>' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/788f3a39-7ecf-4aee-bac0-d7c0dbbf02a3.gif" alt=":anime;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/9fa603df-4864-439b-b78d-544c7f78cdca.gif" alt=":dance;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/45a3f5e5-be26-42bd-bbe3-14e13d2a82b3.gif" alt=":smart;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/9b48b483-f8a9-45bd-8bcf-f5b64ed01945.webp" alt=":catyes;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/huh.png" alt=":huh;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/d5fd8082-f98c-41df-9163-d08cb3c5c135.png" alt=":kekw;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/4f2f6d20-94a5-44b0-924e-8cd2331f11dd.png" alt=":f;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/whatthe.png" alt=":what;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/2697f46a-8866-4475-b9b8-ea9a1ee4db47.png" alt=":gunpoint;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/4db3729c-92a1-472b-b25d-d3a0a8a46945.png" alt=":why;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/b589f1f4-4f73-4e30-9e39-5b47dd8b7f68.PNG" alt=":pikalaugh;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/09b15aed-74ae-4412-95e8-848bd1abf7e7.gif" alt=":fire;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/thonk.png" alt=":thonk;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/d8c2ee15-06fa-43c5-8996-515431b746b0.webp" alt=":trollface;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/7aa79b98-dda6-4e01-9869-f6100f8683fc.png" alt=":jerry;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/a898c69b-048e-44b4-a837-b508a5bd1de9.png" alt=":bruh;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/757ccf41-e1f1-4243-82dc-0b662a324b94.png" alt=":kekyou;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/bc310bc3-6cb8-4279-860d-c4fdb7162848.png" alt=":pain;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/79a2692d-6534-4eec-9369-62713a5a5c94.gif" alt=":youtried;">' +
'<img class="emoji" src="https://emoji.discadia.com/emojis/667a49eb-df03-44ff-adf4-aec2c6ba5abe.PNG" alt=":gigachad;">' +
'<img class="emoji" src="https://o.remove.bg/downloads/73ed5641-3bd2-45f7-b455-a9cbdec1b113/image-removebg-preview.png" alt=":batchest;">' +
'</div>');

  
      if ($(this).find('.emoji-icon').length === 0) {
    $(this).append(emojiIcon);
    $(this).append(emojiModal);
      }
    $('.emoji-icon').click(function() {
      $(this).next('.emoji-modal').toggle();
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
  //     '<img class="emoji" src="//owcdn.net/img/628addcbd509e.png" alt=":c9;">' +
  //     '<img class="emoji" src="//owcdn.net/img/62a409ad29351.png" alt=":eg;">' +
  //     '<img class="emoji" src="//owcdn.net/img/62875027c8e06.png" alt=":sen;">' +
  //     '</div>');
  //     if ($(this).find('.emoji-icon').length === 0) {
  //   $(this).append(emojiIcon);
  //   $(this).append(emojiModal);
  //     }
    $('.emoji-icon').click(function() {
      $(this).next('.emoji-modal').toggle();
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
      $(this).parent().hide();
    });
  // });
});

$(document).ready(function() {
  var emojiDictionary = {
    "eg": "//owcdn.net/img/62a409ad29351.png",
    "sen": "//owcdn.net/img/62875027c8e06.png",
    "c9": "//owcdn.net/img/628addcbd509e.png",
    "100t": "//owcdn.net/img/603c00d5c5a08.png",
    "nrg": "//owcdn.net/img/62874d7ac0534.png",
    "kru": "//owcdn.net/img/63976677069e1.png",
    "lev": "//owcdn.net/img/61b8888cc3860.png",
    "loud": "//owcdn.net/img/62bbec8dc1b9f.png",
    "mibr": "//owcdn.net/img/632be7626d6d9.png",
    "fur": "//owcdn.net/img/632be843b7d51.png",

    "t1": "//owcdn.net/img/62fe0b8f6b084.png",
    "drx": "//owcdn.net/img/63b17abd77fc0.png",
    "geng": "//owcdn.net/img/62a1d44914aa9.png",
    "prx": "//owcdn.net/img/62bbeba74d5cb.png",
    "ge": "//owcdn.net/img/629f316ddd4dd.png",
    "rrq": "//owcdn.net/img/629f17f51e7a3.png",
    "dfm": "//owcdn.net/img/63972e548cdc9.png",
    "zeta": "//owcdn.net/img/62a411783d94d.png",
    "ts": "//owcdn.net/img/629f13085ead6.png",
    "tln": "//owcdn.net/img/6226f3d764e03.png",

    "tl": "//owcdn.net/img/640c381f0603f.png",
    "fnc": "//owcdn.net/img/62a40cc2b5e29.png",
    "navi": "//owcdn.net/img/62a4109ddbd7f.png",
    "fut": "//owcdn.net/img/632be9976b8fe.png",
    "vit": "//owcdn.net/img/6466d79e1ed40.png",
    "koi": "//owcdn.net/img/6346b8ad2331d.png",
    "kc": "//owcdn.net/img/627403a0d9e48.png",
    "th": "//owcdn.net/img/637b755224c12.png",
    "bbl": "//owcdn.net/img/634b4412d95b3.png",
    "gia": "//owcdn.net/img/61dfcae52b0d8.png",

    //pepes
    "pepenoob": "https://emoji.discadia.com/emojis/0fc8cd8f-bc87-4f06-a4ca-84b35b3daf2d.gif",
    "pepehappy": "https://emoji.discadia.com/emojis/a871d706-578b-4b1e-b56b-ea7bde6e14fd.GIF",
    "peperage": "https://emoji.discadia.com/emojis/0e63fbc0-33a4-45be-8c90-d733c535e0db.png",
    "pepeclap": "https://emoji.discadia.com/emojis/14e5562c-c368-4c40-8d67-3cc84f04f269.GIF",
    "pepehide": "https://emoji.discadia.com/emojis/4548f68f-ef3b-4e6f-a307-e6ff778284e1.PNG",
    "pepelaugh": "https://emoji.discadia.com/emojis/edcbf71c-04ba-44ee-812d-b66550ac72f0.GIF",
    "pepesteer": "https://emoji.discadia.com/emojis/0d1d3ac4-c8e0-49cf-b02b-37224347133b.GIF",
    "pepefeelsbad": "https://emoji.discadia.com/emojis/c3617497-81c1-4e37-a5c4-7f50853795cd.PNG",
    "pepelaser": "https://emoji.discadia.com/emojis/7b856dcc-ce74-4ee4-a770-081a55ba3ad5.GIF",
    "pepeyes": "https://emoji.discadia.com/emojis/e4890f2e-65c3-49a3-83a8-e191be0e53d1.webp",
    "pepepog": "https://emoji.discadia.com/emojis/2b17a3b6-ca67-4d2c-a9b9-a07b6fe582a9.gif",
    "pepekms": "https://emoji.discadia.com/emojis/PepeKMS.png",
    "pepemad": "https://emoji.discadia.com/emojis/04a7b8f4-fa23-472c-9373-365fe561ad5d.png",
    "pepethink": "https://emoji.discadia.com/emojis/4b8a69a1-c7f8-49fe-851c-2ff90f2a3912.png",
    "pepeno": "https://emoji.discadia.com/emojis/037fa260-56cf-4503-ac14-d25a082ec590.png",
    "pepelmao": "https://emoji.discadia.com/emojis/ed2b4409-16e4-4810-8372-eaf71553bfc0.gif",
    "pepeshoot": "https://emoji.discadia.com/emojis/b07d109f-4b79-4df2-9f11-4a158809f7b3.gif",
    "pepecry": "https://emoji.discadia.com/emojis/0eadc90a-2017-44cc-a9a4-9937cdd06c3e.png",

    //agents
    "phoenix": "https://emoji.discadia.com/emojis/9208e8c8-e055-4dd9-aed4-8135c43d66ef.PNG",
    "astra": "https://emoji.discadia.com/emojis/bd1caa1d-b711-43b5-99dd-700ea99920c2.PNG",
    "raze": "https://emoji.discadia.com/emojis/b3572b7a-afbc-44b9-8d6a-191baf3b760e.PNG",
    "cypher": "https://emoji.discadia.com/emojis/2786e758-8898-4e3b-8b54-b3919aea471a.PNG",
    "yoru": "https://emoji.discadia.com/emojis/c19223d9-5c77-448a-bdd8-54e5af724765.PNG",
    "fade": "https://emoji.discadia.com/emojis/f6cf98e0-6c7f-4577-b623-4bc02295e556.PNG",
    "reyna": "https://emoji.discadia.com/emojis/6b23e9f8-74e2-487e-b29f-86e9324585ae.PNG",
    "omen": "https://emoji.discadia.com/emojis/22796c30-232d-4cb6-9be9-f9eb5d681a0b.PNG",
    "brimstone": "https://emoji.discadia.com/emojis/b7232996-34e3-4321-a539-d3edecc04df0.PNG",
    "kayo": "https://emoji.discadia.com/emojis/f7c9f441-d4a1-4f39-9472-706372b01cda.PNG",
    "breach": "https://emoji.discadia.com/emojis/eac4792e-e46b-4e68-9eba-f8cb5bd15b7f.PNG",
    "sova": "https://emoji.discadia.com/emojis/1da15151-6320-4249-a07b-8ca0cf0c4e7a.PNG",
    "killjoy": "https://emoji.discadia.com/emojis/60ee1673-3b02-451b-839f-455abc283aa2.PNG",
    "sage": "https://emoji.discadia.com/emojis/9ed08f69-8a79-45e7-a92c-f7eaadf86296.PNG",
    "viper": "https://emoji.discadia.com/emojis/1afc5190-8418-4ab1-95bb-81e12fcf5527.PNG",
    "skye": "https://emoji.discadia.com/emojis/91a8df3f-f262-448f-bfe1-497e946e3c5b.PNG",
    "jett": "https://emoji.discadia.com/emojis/59377212-8498-497d-b298-758ff54d2bd4.PNG",
    "harbor": "https://emoji.discadia.com/emojis/fd0e7f3d-99e0-4ce6-810d-01a98661f9e2.png",
    "gekko": "https://emoji.discadia.com/emojis/2270f0d0-8f0b-4d28-9a48-ad023c4ca2ac.png",
    "neon": "https://emoji.discadia.com/emojis/358f33f4-afe0-4c3f-be31-e5f95d1a9832.PNG",
    "chamber": "https://emoji.discadia.com/emojis/a994f2cb-f48b-43dc-8313-a23f39d2cdde.PNG",

    //other
    "anime": "https://emoji.discadia.com/emojis/788f3a39-7ecf-4aee-bac0-d7c0dbbf02a3.gif",
    "dance": "https://emoji.discadia.com/emojis/9fa603df-4864-439b-b78d-544c7f78cdca.gif",
    "smart": "https://emoji.discadia.com/emojis/45a3f5e5-be26-42bd-bbe3-14e13d2a82b3.gif",
    "catyes": "https://emoji.discadia.com/emojis/9b48b483-f8a9-45bd-8bcf-f5b64ed01945.webp",
    "huh": "https://emoji.discadia.com/emojis/huh.png",
    "kekw": "https://emoji.discadia.com/emojis/d5fd8082-f98c-41df-9163-d08cb3c5c135.png",
    "f": "https://emoji.discadia.com/emojis/4f2f6d20-94a5-44b0-924e-8cd2331f11dd.png",
    "what": "https://emoji.discadia.com/emojis/whatthe.png",
    "gunpoint": "https://emoji.discadia.com/emojis/2697f46a-8866-4475-b9b8-ea9a1ee4db47.png",
    "why": "https://emoji.discadia.com/emojis/4db3729c-92a1-472b-b25d-d3a0a8a46945.png",
    "pikalaugh": "https://emoji.discadia.com/emojis/b589f1f4-4f73-4e30-9e39-5b47dd8b7f68.PNG",
    "fire": "https://emoji.discadia.com/emojis/09b15aed-74ae-4412-95e8-848bd1abf7e7.gif",
    "thonk": "https://emoji.discadia.com/emojis/thonk.png",
    "trollface": "https://emoji.discadia.com/emojis/d8c2ee15-06fa-43c5-8996-515431b746b0.webp",
    "jerry": "https://emoji.discadia.com/emojis/7aa79b98-dda6-4e01-9869-f6100f8683fc.png",
    "bruh": "https://emoji.discadia.com/emojis/a898c69b-048e-44b4-a837-b508a5bd1de9.png",
    "kekyou": "https://emoji.discadia.com/emojis/757ccf41-e1f1-4243-82dc-0b662a324b94.png",
    "pain": "https://emoji.discadia.com/emojis/bc310bc3-6cb8-4279-860d-c4fdb7162848.png",
    "youtried": "https://emoji.discadia.com/emojis/79a2692d-6534-4eec-9369-62713a5a5c94.gif",
    "gigachad": "https://emoji.discadia.com/emojis/667a49eb-df03-44ff-adf4-aec2c6ba5abe.PNG",
    "batchest": "https://o.remove.bg/downloads/73ed5641-3bd2-45f7-b455-a9cbdec1b113/image-removebg-preview.png"

  };

  $('.post-body').children().each(function() {
    var text = $(this).text();
    var matches = text.match(/:([\w-]+);/g);
    
    if (matches) {
      matches.forEach(function(match) {
        var emojiName = match.slice(1, -1); // Remove the leading ":" and trailing ";"
        var emojiUrl = emojiDictionary[emojiName];
        if (emojiUrl) {
          var imageTag = '<img class="emoji" src="' + emojiUrl + '">';
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
$('.post-editor-header-preview').click(function() {
$('.emoji-modal').hide();
//wait 5 seconds 
setTimeout(function () {
  var emojiDictionary = {
    "eg": "//owcdn.net/img/62a409ad29351.png",
    "sen": "//owcdn.net/img/62875027c8e06.png",
    "c9": "//owcdn.net/img/628addcbd509e.png",
    "100t": "//owcdn.net/img/603c00d5c5a08.png",
    "nrg": "//owcdn.net/img/62874d7ac0534.png",
    "kru": "//owcdn.net/img/63976677069e1.png",
    "lev": "//owcdn.net/img/61b8888cc3860.png",
    "loud": "//owcdn.net/img/62bbec8dc1b9f.png",
    "mibr": "//owcdn.net/img/632be7626d6d9.png",
    "fur": "//owcdn.net/img/632be843b7d51.png",

    "t1": "//owcdn.net/img/62fe0b8f6b084.png",
    "drx": "//owcdn.net/img/63b17abd77fc0.png",
    "geng": "//owcdn.net/img/62a1d44914aa9.png",
    "prx": "//owcdn.net/img/62bbeba74d5cb.png",
    "ge": "//owcdn.net/img/629f316ddd4dd.png",
    "rrq": "//owcdn.net/img/629f17f51e7a3.png",
    "dfm": "//owcdn.net/img/63972e548cdc9.png",
    "zeta": "//owcdn.net/img/62a411783d94d.png",
    "ts": "//owcdn.net/img/629f13085ead6.png",
    "tln": "//owcdn.net/img/6226f3d764e03.png",

    "tl": "//owcdn.net/img/640c381f0603f.png",
    "fnc": "//owcdn.net/img/62a40cc2b5e29.png",
    "navi": "//owcdn.net/img/62a4109ddbd7f.png",
    "fut": "//owcdn.net/img/632be9976b8fe.png",
    "vit": "//owcdn.net/img/6466d79e1ed40.png",
    "koi": "//owcdn.net/img/6346b8ad2331d.png",
    "kc": "//owcdn.net/img/627403a0d9e48.png",
    "th": "//owcdn.net/img/637b755224c12.png",
    "bbl": "//owcdn.net/img/634b4412d95b3.png",
    "gia": "//owcdn.net/img/61dfcae52b0d8.png",
    
    //pepes
    "pepenoob": "https://emoji.discadia.com/emojis/0fc8cd8f-bc87-4f06-a4ca-84b35b3daf2d.gif",
    "pepehappy": "https://emoji.discadia.com/emojis/a871d706-578b-4b1e-b56b-ea7bde6e14fd.GIF",
    "peperage": "https://emoji.discadia.com/emojis/0e63fbc0-33a4-45be-8c90-d733c535e0db.png",
    "pepeclap": "https://emoji.discadia.com/emojis/14e5562c-c368-4c40-8d67-3cc84f04f269.GIF",
    "pepehide": "https://emoji.discadia.com/emojis/4548f68f-ef3b-4e6f-a307-e6ff778284e1.PNG",
    "pepelaugh": "https://emoji.discadia.com/emojis/edcbf71c-04ba-44ee-812d-b66550ac72f0.GIF",
    "pepesteer": "https://emoji.discadia.com/emojis/0d1d3ac4-c8e0-49cf-b02b-37224347133b.GIF",
    "pepefeelsbad": "https://emoji.discadia.com/emojis/c3617497-81c1-4e37-a5c4-7f50853795cd.PNG",
    "pepelaser": "https://emoji.discadia.com/emojis/7b856dcc-ce74-4ee4-a770-081a55ba3ad5.GIF",
    "pepeyes": "https://emoji.discadia.com/emojis/e4890f2e-65c3-49a3-83a8-e191be0e53d1.webp",
    "pepepog": "https://emoji.discadia.com/emojis/2b17a3b6-ca67-4d2c-a9b9-a07b6fe582a9.gif",
    "pepekms": "https://emoji.discadia.com/emojis/PepeKMS.png",
    "pepemad": "https://emoji.discadia.com/emojis/04a7b8f4-fa23-472c-9373-365fe561ad5d.png",
    "pepethink": "https://emoji.discadia.com/emojis/4b8a69a1-c7f8-49fe-851c-2ff90f2a3912.png",
    "pepeno": "https://emoji.discadia.com/emojis/037fa260-56cf-4503-ac14-d25a082ec590.png",
    "pepelmao": "https://emoji.discadia.com/emojis/ed2b4409-16e4-4810-8372-eaf71553bfc0.gif",
    "pepeshoot": "https://emoji.discadia.com/emojis/b07d109f-4b79-4df2-9f11-4a158809f7b3.gif",
    "pepecry": "https://emoji.discadia.com/emojis/0eadc90a-2017-44cc-a9a4-9937cdd06c3e.png",

        //agents
        "phoenix": "https://emoji.discadia.com/emojis/9208e8c8-e055-4dd9-aed4-8135c43d66ef.PNG",
        "astra": "https://emoji.discadia.com/emojis/bd1caa1d-b711-43b5-99dd-700ea99920c2.PNG",
        "raze": "https://emoji.discadia.com/emojis/b3572b7a-afbc-44b9-8d6a-191baf3b760e.PNG",
        "cypher": "https://emoji.discadia.com/emojis/2786e758-8898-4e3b-8b54-b3919aea471a.PNG",
        "yoru": "https://emoji.discadia.com/emojis/c19223d9-5c77-448a-bdd8-54e5af724765.PNG",
        "fade": "https://emoji.discadia.com/emojis/f6cf98e0-6c7f-4577-b623-4bc02295e556.PNG",
        "reyna": "https://emoji.discadia.com/emojis/6b23e9f8-74e2-487e-b29f-86e9324585ae.PNG",
        "omen": "https://emoji.discadia.com/emojis/22796c30-232d-4cb6-9be9-f9eb5d681a0b.PNG",
        "brimstone": "https://emoji.discadia.com/emojis/b7232996-34e3-4321-a539-d3edecc04df0.PNG",
        "kayo": "https://emoji.discadia.com/emojis/f7c9f441-d4a1-4f39-9472-706372b01cda.PNG",
        "breach": "https://emoji.discadia.com/emojis/eac4792e-e46b-4e68-9eba-f8cb5bd15b7f.PNG",
        "sova": "https://emoji.discadia.com/emojis/1da15151-6320-4249-a07b-8ca0cf0c4e7a.PNG",
        "killjoy": "https://emoji.discadia.com/emojis/60ee1673-3b02-451b-839f-455abc283aa2.PNG",
        "sage": "https://emoji.discadia.com/emojis/9ed08f69-8a79-45e7-a92c-f7eaadf86296.PNG",
        "viper": "https://emoji.discadia.com/emojis/1afc5190-8418-4ab1-95bb-81e12fcf5527.PNG",
        "skye": "https://emoji.discadia.com/emojis/91a8df3f-f262-448f-bfe1-497e946e3c5b.PNG",
        "jett": "https://emoji.discadia.com/emojis/59377212-8498-497d-b298-758ff54d2bd4.PNG",
        "harbor": "https://emoji.discadia.com/emojis/fd0e7f3d-99e0-4ce6-810d-01a98661f9e2.png",
        "gekko": "https://emoji.discadia.com/emojis/2270f0d0-8f0b-4d28-9a48-ad023c4ca2ac.png",
        "neon": "https://emoji.discadia.com/emojis/358f33f4-afe0-4c3f-be31-e5f95d1a9832.PNG",
        "chamber": "https://emoji.discadia.com/emojis/a994f2cb-f48b-43dc-8313-a23f39d2cdde.PNG",

            //other
    "anime": "https://emoji.discadia.com/emojis/788f3a39-7ecf-4aee-bac0-d7c0dbbf02a3.gif",
    "dance": "https://emoji.discadia.com/emojis/9fa603df-4864-439b-b78d-544c7f78cdca.gif",
    "smart": "https://emoji.discadia.com/emojis/45a3f5e5-be26-42bd-bbe3-14e13d2a82b3.gif",
    "catyes": "https://emoji.discadia.com/emojis/9b48b483-f8a9-45bd-8bcf-f5b64ed01945.webp",
    "huh": "https://emoji.discadia.com/emojis/huh.png",
    "kekw": "https://emoji.discadia.com/emojis/d5fd8082-f98c-41df-9163-d08cb3c5c135.png",
    "f": "https://emoji.discadia.com/emojis/4f2f6d20-94a5-44b0-924e-8cd2331f11dd.png",
    "what": "https://emoji.discadia.com/emojis/whatthe.png",
    "gunpoint": "https://emoji.discadia.com/emojis/2697f46a-8866-4475-b9b8-ea9a1ee4db47.png",
    "why": "https://emoji.discadia.com/emojis/4db3729c-92a1-472b-b25d-d3a0a8a46945.png",
    "pikalaugh": "https://emoji.discadia.com/emojis/b589f1f4-4f73-4e30-9e39-5b47dd8b7f68.PNG",
    "fire": "https://emoji.discadia.com/emojis/09b15aed-74ae-4412-95e8-848bd1abf7e7.gif",
    "thonk": "https://emoji.discadia.com/emojis/thonk.png",
    "trollface": "https://emoji.discadia.com/emojis/d8c2ee15-06fa-43c5-8996-515431b746b0.webp",
    "jerry": "https://emoji.discadia.com/emojis/7aa79b98-dda6-4e01-9869-f6100f8683fc.png",
    "bruh": "https://emoji.discadia.com/emojis/a898c69b-048e-44b4-a837-b508a5bd1de9.png",
    "kekyou": "https://emoji.discadia.com/emojis/757ccf41-e1f1-4243-82dc-0b662a324b94.png",
    "pain": "https://emoji.discadia.com/emojis/bc310bc3-6cb8-4279-860d-c4fdb7162848.png",
    "youtried": "https://emoji.discadia.com/emojis/79a2692d-6534-4eec-9369-62713a5a5c94.gif",
    "gigachad": "https://emoji.discadia.com/emojis/667a49eb-df03-44ff-adf4-aec2c6ba5abe.PNG",
    "batchest": "https://o.remove.bg/downloads/73ed5641-3bd2-45f7-b455-a9cbdec1b113/image-removebg-preview.png"

  };
  $('.post-body').children().each(function() {
    var text = $(this).text();
    console.log(text);
    var matches = text.match(/:([\w-]+);/g);
    
    if (matches) {
      matches.forEach(function(match) {
        var emojiName = match.slice(1, -1); // Remove the leading ":" and trailing ";"
        var emojiUrl = emojiDictionary[emojiName];
        if (emojiUrl) {
          var imageTag = '<img class="emoji" src="' + emojiUrl + '">';
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
}, 500);
});


$(document).ready(function () {
  if (localStorage.getItem('secret_link') == "on") {
    //loop through all links and prepend span class tooltiptext
    $('body').append('<div class="tooltiptextt"></div>');
    $('.post-body a').each(function (i, a) {

      $(this).addClass('tooltipt');
      // $(this).prepend('<span class="tooltiptextt"></span>');
    });
    $('.post-body a').hover(function () {
      var link = $(this).attr('href');
      var screenshotUrl = 'https://api.microlink.io?url=' + encodeURIComponent(link) + '&screenshot=true&embed=screenshot.url';
      // console.log($(this).children()[0].attr('class'));
      $('.tooltiptextt').css('background-image', 'url(' + screenshotUrl + ')');
    });
    $('.post-body a').hover(
      function () {
        $('.tooltiptextt').css({
          opacity: 1,
          visibility: 'visible'
        });
      },
      function () {
        $('.tooltiptextt').css({
          opacity: 0,
          visibility: 'hidden'
        });
      }
    );
  }
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

function tr(team, callback) {
  var currentDate = new Date();
  var teamName = team.split('/')[5];
  var teamId = team.match(/team\/(\d+)/)[1];

  // Subtract one month
  currentDate.setMonth(currentDate.getMonth() - 2);

  // Format the date as YYYY-MM-DD
  var year = currentDate.getFullYear();
  var month = String(currentDate.getMonth() + 1).padStart(2, '0');
  var day = String(currentDate.getDate()).padStart(2, '0');
  var formattedDate = year + '-' + month + '-' + day;

  // Output the formatted date
  // console.log(formattedDate);
  var teamRating = 0;
  var newUrl = "https://www.vlr.gg/team/stats/" + teamId + "/" + teamName + "/?event_id=all&core_id=all&date_start=" + formattedDate + "&date_end=";
  // console.log(newUrl);
  var aUrl = "https://www.vlr.gg/team/matches/" + teamId + "/" + teamName;
  $.get(aUrl, function (data) {
    var winrates = $(data).find(".m-item-games");
    var count = 0;
    var wins = 0;
    var loss = 0;
    // var sbreak = 0;
    var breakLoop = false;

    winrates.each(function () {
      if (breakLoop) {
        return false; // Exit the each function
      }

      score = $(this).find(".m-item-games-result .score").text();
      var lines = score.split('\n');
      // console.log(lines);
      // console.log('-------------------');
      lines.forEach(function (line) {
        var scoreMatch = line.match(/\d+-\d+/);

        if (scoreMatch) {
          // if (count === 20) {
          //   breakLoop = true;
          //   return false; // Exit the forEach function
          // }
          var scores = scoreMatch[0].split('-');
          var score1 = parseInt(scores[0]);
          var score2 = parseInt(scores[1]);
          // console.log(score1, score2, line, wins, loss);
          wins += score1;
          loss += score2;
          // count++;
          // if (count === 20) {
          //   breakLoop = true;
          //   return false; // Exit the forEach function
          // }
        }
      });
      count++;
      if (count === 10) {
        breakLoop = true;
        return false; // Exit the forEach function
      }
    });
    var winrate = Math.round((wins / (wins + loss)) * 4000);
    // console.log(teamName, winrate, count, wins, loss);
    // console.log(winrates);
    // console.log(teamName, winrate, count, wins, loss);
    callback(winrate);
  });
  // return winrate;
  // var winrate = Math.round((wins / (wins + loss)) * 3000);
}
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
//   //loop through teams and make a request to each team page
//   var teamRatings = [];
//   tct=0;
//   teams.forEach(function (team) {
//     tr(team, function(winrate) {
//       tct++;
//       console.log(tct);
//       var teamName = team.split('/')[5];
//       // console.log(teamName + ": " + winrate);
//       // console.log(teamRatings.length);
//       // console.log(teamRatings);
//       teamRatings.push(teamName + ':' + winrate);
//       if (tct===30){
//         for (i in teamRatings){
//           console.log(teamRatings[i].split(':')[0] + ': ' + teamRatings[i].split(':')[1]);
//         }
//       }
//     });
//   console.log(teamRatings[0]);
//   console.log(teamRatings);
  
//   });  
//   //loop through teamratings log teamname, score
// // for (var key in teamRatings) {
// // console.log(key + ": " + teamRatings[key]);
// // }
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