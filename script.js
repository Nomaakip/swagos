app1.style.display = 'none';
settings_app.style.display = 'none';

function toggleApp(app) {
  if (app.style.display === 'none' || app.classList.contains('gone')) {
    app.classList.remove('gone');
    app.style.display = 'block';
  } else {
    app.classList.add('gone');
    setTimeout(() => app.style.display = 'none', 280);
  }
}

function openapp1() {
  toggleApp(app1);
}

function opensettings() {
  toggleApp(settings_app);
}

function closeapp1() {
  app1.classList.add('gone');
  setTimeout(() => app1.style.display = 'none', 280);
}

function closesettings() {
  settings_app.classList.add('gone');
  setTimeout(() => settings_app.style.display = 'none', 280);
}

dragElement(document.getElementById("app1"));
dragElement(document.getElementById("settings_app"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function showSection(sectionId) {
  const section = document.getElementById(sectionId);
  const allSections = document.querySelectorAll('.settings-section');

  allSections.forEach(function (sec) {
    if (sec !== section) {
      sec.style.maxHeight = null;
    }
  });

  if (section.style.maxHeight) {
    section.style.maxHeight = null;
  } else {
    section.style.maxHeight = section.scrollHeight + "px";
  }
}


function setLocalStorage(name, value) {
  localStorage.setItem(name, value);
}

function getLocalStorage(name) {
  return localStorage.getItem(name);
}

function checkLocalStorage() {
  const wallpaper = getLocalStorage("wallpaper");
  const pfp = getLocalStorage("profile_pic");

  if (wallpaper) {
    document.body.style.backgroundImage = wallpaper;
  }

  if (pfp) {
    profile_picture.src = pfp;
  }

}



document.getElementById("wallpaper").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const wallpaper = event.target.result;
      document.body.style.backgroundImage = "url('" + wallpaper + "')";
      setLocalStorage("wallpaper", "url('" + wallpaper + "')");
    };
    reader.readAsDataURL(file);
  }
});
document.getElementById("pic").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const pfp = event.target.result;
      setLocalStorage("profile_pic", "url('" + pfp + "')");
    };
    reader.readAsDataURL(file);
  }
});
window.onload = checkLocalStorage;
function cac() {
  const currentTime = new Date();
  const hours = String(currentTime.getHours()).padStart(2, '0');
  const minutes = String(currentTime.getMinutes()).padStart(2, '0');
  const timeString = `${hours}:${minutes}`;
  document.getElementById('current-time').textContent = timeString;
}

function checks() {
  //do not run yet 
  let storedUser = localStorage.getItem("username");
        let storedPass = localStorage.getItem("password");

        if (storedUser + storedPass) {
          document.getElementById("main").style.display = 'none';
          document.body.style.overflow = 'hidden';
          document.body.style.backgroundImage = "url('greg.jpeg')";
        }

        else {
          document.getElementById("main").style.display = 'none';

        }

}
setInterval(cac, 1000);
cac();
checkLocalStorage();