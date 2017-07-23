function toggleNav(place) {
  // Open the sublist
  // Show active list item
  // Changes font awesome icon
  var item = document.getElementsByClassName('listSection')[place];
  var subItem = item.getElementsByClassName('sublist')[0];
  var subItemClassList = subItem.classList;
  var setActive = item.getElementsByClassName('buttons')[0];
  var setIcon = item.getElementsByTagName('i')[0];

  subItemClassList.toggle('subListShow');
  setActive.classList.toggle('active');
  if (subItemClassList.contains('subListShow')) {
    setIcon.setAttribute('class', 'fa fa-minus-square-o');
  } else {
    setIcon.setAttribute('class', 'fa fa-plus-square-o')
  }
}

// =============================================================================

function buildComponents(item, addToggleNav) {

  var div = document.createElement('div');
  div.setAttribute('class', 'buttons');

  if (addToggleNav) {
    var btn2 = document.createElement('button');
    var i = document.createElement('i');

    btn2.setAttribute('class', 'btn2');
    i.setAttribute('class',"fa fa-plus-square-o");
    btn2.appendChild(i);
  } else {
    var btn2 = document.createElement('button');
    btn2.setAttribute('class', 'btn2');
  }

  var anchor = document.createElement('a');
  var btn1 = document.createElement('button');
  var text = document.createTextNode(item.innerText);

  anchor.setAttribute('href', '#'+item.id);
  btn1.setAttribute('class', 'btn1');
  anchor.appendChild(text);
  btn1.appendChild(anchor);

  div.appendChild(btn2);
  div.appendChild(btn1);

  return div;
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
      var getbtn2 = div.firstChild.getElementsByClassName('btn2')[0];
      getbtn2.setAttribute('onclick', 'toggleNav('+sec+')');
    } else {
    }
    sideNav.appendChild(div);
  }
}

buildNav();
