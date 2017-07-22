function toggleNav(place) {
  var item = document.getElementsByClassName('listSection')[place];
  var subItem = item.getElementsByClassName('sublist')[0];
  subItem.classList.toggle('subListShow');
}

// =============================================================================

function buildComponents(item, addToggleNav) {
  var anchor = document.createElement('a');
  var h3 = document.createElement('h3');
  var text = document.createTextNode(' '+item.innerText);

  if (addToggleNav) {
    var i = document.createElement('i');
    i.setAttribute('class',"fa fa-plus-square-o");
    h3.appendChild(i);
  } else {
  }

  anchor.setAttribute('href', '#'+item.id);
  anchor.appendChild(text);
  h3.appendChild(anchor);

  return h3;
}

// =============================================================================

function buildNav() {
  var sectionContent = document.getElementsByClassName('section');
  var numberOfSections = sectionContent.length;
  var sideNav = document.getElementsByClassName('sideNav')[0];
  var titleList = [];
  var subSectionList = [];

  // Makes a list of all section titles and associated subsection titleLis
  // There should only be one sectionTitle per section
  for (i=0; i<numberOfSections; i++) {
    titleList.push(sectionContent[i].getElementsByClassName('sectionTitle'));
    subSectionList.push(sectionContent[i].getElementsByClassName('subSectionTitle'));
  }

  // Builds the navigation
  for (sec=0; sec<numberOfSections; sec++) {
    var div = document.createElement('div');
    div.setAttribute('class', 'listSection');
    var subSection = subSectionList[sec];

    if (subSection.length > 0) {
      var addToggle = true;
      var sub = document.createElement('div');
      sub.setAttribute('class', 'sublist');
      for (subSec=0; subSec<subSection.length; subSec++) {
        var subItem = buildComponents(subSection[subSec], false);
        sub.appendChild(subItem);
      }
    } else {
      var addToggle = false;
    }

    var listItem = buildComponents(titleList[sec][0], addToggle);

    div.appendChild(listItem);
    if (addToggle) {
      div.appendChild(sub);
      div.firstChild.firstChild.setAttribute('onclick', 'toggleNav('+sec+')');
      sideNav.appendChild(div);
    } else {
      sideNav.appendChild(div);
    }
  }
}

buildNav();
