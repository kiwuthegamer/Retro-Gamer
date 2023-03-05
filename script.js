//
// Game Selection
//

var items = ["snake", "pacman", "space invaders", "profile", "achievements", "about", "see code"]
var itemInfo = {
  "snake": {
    "title": "Select Difficulty",
    "options": ["Easy", "Medium", "Hard", "Ultra Hard"],
    "value": "snake.html?diff=%s",
    "tooltip": ""
  },
  "pacman": {
    "title": "Select Difficulty",
    "options": ["Easy", "Medium", "Hard"],
    "value": "pacman.html?diff=%s",
    "tooltip": ""
  },
  "space invaders": {
    "title": "Select Difficulty",
    "options": ["Easy", "Medium", "Hard"],
    "value": "spaceinvaders.html?diff=%s",
    "tooltip": ""
  },
  "profile": {
    "title": "Profile",
    "options": [],
    "tooltip": ""
  },
  "achievements": {
    "title": "Achievements",
    "options": [],
    "tooltip": ""
  },
  "about": {
    "title": "About",
    "options": ["This game was made", "by Kevin George for the", "Science/Technology Fair 2022"],
    "tooltip": ""
  },
  "see code": {
    "value": "https://github.com/kiwuthegamer/Retro-Gamer",
    "tooltip": "I coded this entire website using HTML code"
  }
}
var inSubMenu = 0;
var itemElems = document.getElementsByClassName("item");
var itemElems = [].slice.call(itemElems);
var currSelection = -1;

addEventListener('keyup', (e) => {
  if (e.key == "ArrowUp") {
    if (items[currSelection - 1] != undefined && items[currSelection - 1] != "") {
      currSelection--;
    }
  }
  if (e.key == "ArrowDown") {
    if (items[currSelection + 1] != undefined && items[currSelection + 1] != "") {
      currSelection++;
    }
  }
  if (e.key == "Enter") {
    if (inSubMenu) {
      if(inSubMenu.value != undefined){
        window.open(inSubMenu.value.replace("%s", currSelection))
        window.location.href = window.location.href;
      } else { window.location.href = window.location.href }
    } else {
      if (itemInfo[items[currSelection]].options) {
        inSubMenu = itemInfo[items[currSelection]];
        document.getElementsByClassName("title")[0].innerHTML = itemInfo[items[currSelection]].title;
        items = itemInfo[items[currSelection]].options;
        currSelection = 0;
        updateItems();
      } else {
        window.open(itemInfo[items[currSelection]].value)
        window.location.href = window.location.href;
      }
    }
  }
  if (e.key == "Backspace") window.location.href = window.location.href;
  updateItems();
});

function updateItems() {
  for (var i = 0; i < itemElems.length; i++) {
    if(items[i]){
      itemElems[i].innerHTML = items[i]
    } else {
      itemElems[i].innerHTML = "";
    }
  }
  if(currSelection<0) return;
  itemElems.forEach(item => {
    if(item.innerHTML[0]=="#"){
      item.style.color = item.innerHTML.slice(0,7);
      item.innerHTML = item.innerHTML.slice(7)
    } else {
      item.style.color = "#989899"
      if(item.innerHTML == itemElems[currSelection].innerHTML){
        itemElems[currSelection].style.color = "#FFFFFF";
      }
    }
  });
  itemElems[currSelection].innerHTML = "> " + itemElems[currSelection].innerHTML + " <";
  if(!inSubMenu){
    updateToolTip();
  }
  checkAchievements();
  updateProfile();
}

function updateToolTip() {
  if(itemInfo[items[currSelection]].tooltip){
    document.getElementsByClassName("tooltip")[0].innerHTML = itemInfo[items[currSelection]].tooltip;
  } else {
    document.getElementsByClassName("tooltip")[0].innerHTML = "<br>";
  }
}

updateItems();

// Local Storage Defaults
if(localStorage.getItem("achievements") == undefined) localStorage.setItem("achievements", ",,");

if(localStorage.getItem("xp") == undefined) localStorage.setItem("xp", "0");

if(localStorage.getItem("snakehs") == undefined) localStorage.setItem("snakehs", "0");
if(localStorage.getItem("pacmanwins") == undefined) localStorage.setItem("pacmanwins", "0");
if(localStorage.getItem("spaceinvaderwins") == undefined) localStorage.setItem("spaceinvaderwins", "0");

// Achievement Handling
var defaultAchievements = ["Score of 20 in Snake at Medium Difficulty", "Beat Pacman at Hard Difficulty", "Beat Space Invaders at Hard Difficulty"];

function checkAchievements(){
  var achievements = localStorage.getItem("achievements").split(",");
  for(var i=0;i<achievements.length;i++){
    itemInfo["achievements"].options[i] = achievements[i] + defaultAchievements[i];
  }
}

// Profile Stats Handling
function updateProfile(){
  var xp = localStorage.getItem("xp");
  var level = ((xp / 100) >> 0) + 1;
  xp = xp%100;
  var snakehs = localStorage.getItem("snakehs");
  var pacmanwins = localStorage.getItem("pacmanwins");
  var spaceinvaderwins = localStorage.getItem("spaceinvaderwins");
  itemInfo["profile"].options = ["Level "+level + " • " + xp+" XP", "Snake Highscore - "+snakehs, "Pacman Wins - "+pacmanwins, "Space Invader Wins - "+spaceinvaderwins];
}
