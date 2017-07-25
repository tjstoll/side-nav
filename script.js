
// var openIcon = 'fa fa-plus-square-o';
// var closeIcon = 'fa fa-minus-square-o';

var openIcon = "fa fa-plus-square";
var closeIcon = "fa fa-minus-square";

// =============================================================================

// Opens/Closes the sublist
// Sets the main list active to "active"
// elem: (this)
// state: (true/false) whether to open or close sublist respectively
function openNav(elem, state) {

  var buttons = elem.parentNode;
  var setIcon = elem.getElementsByTagName('i')[0];
  var sublist = buttons.nextSibling;
  var sublistClassList = sublist.classList;

  if (state) {
    sublistClassList.add('sn-sublistShow');
    setIcon.setAttribute('class', closeIcon);
    elem.setAttribute('onclick', 'openNav(this, false)');
  } else {
    sublistClassList.remove('sn-sublistShow');
    setIcon.setAttribute('class', openIcon);
    elem.setAttribute('onclick', 'openNav(this, true)');
  }
}

// =============================================================================

// Jumps to the requested section in the document
// Opens the sublist & Closes all other open sublists
// elem: (this) a button object -> btn1
// id: section id to jump to
function jumpToSection(elem, id) {
  window.location.href=id;

  var allSections = Array.from(document.getElementsByClassName('sideNav'));
  var allButtons = Array.from(allSections[0].getElementsByClassName('sn-buttons'));

  allButtons.forEach(function(btn) {
    // Remove all active classes and close all sublists
    btn.classList.remove('sn-active');
    if (btn.parentNode.classList.contains('sn-listSection')) {
      if (btn.parentNode.lastChild.classList.contains('sn-sublist')) {
        openNav(btn.firstChild, false);
      } else {}
    } else {}
  });

  var buttonDiv = elem.parentNode;
  var listTypeDiv = buttonDiv.parentNode;

  // Highlights where you are
  buttonDiv.classList.add('sn-active');
  if (listTypeDiv.classList.contains('sn-sublist')) {
    var listSection = listTypeDiv.parentNode;
    listSection.firstChild.classList.add('sn-active');
    openNav(listSection.firstChild.firstChild, true);
  } else {
    if (listTypeDiv.lastChild.classList.contains('sn-sublist')) {
      openNav(listTypeDiv.firstChild.firstChild, true);
    } else { }
  }
}

// =============================================================================

// Builds the button groups for the side navigation
// item: element from titleList containing title name and reference id
// addToggle: boolean stating whether to add toggle sublist functionality
function buildListButtons(item, addToggle) {
  var div = document.createElement('div');
  var btn1 = document.createElement('button');
  var btn2 = document.createElement('button');
  var title = document.createTextNode(item.innerText);
  var section = '"#'+item.id+'"';

  div.setAttribute('class', 'sn-buttons');
  btn1.setAttribute('class', 'sn-btn1');
  btn1.appendChild(title)
  btn2.setAttribute('class', 'sn-btn2');

  if (addToggle) {
    var i = document.createElement('i');

    i.setAttribute('class',openIcon);
    btn2.appendChild(i);
    btn2.setAttribute('onclick', 'openNav(this, true)');
  } else {
    btn2.setAttribute('disabled', '_self')
  }

  btn1.setAttribute('onclick', 'jumpToSection(this,'+section+')');
  div.appendChild(btn2);
  div.appendChild(btn1);

  return div;
}

// =============================================================================

// Creates the main divisions within sideNav div (listSection, subListShow)
// item: HTMLcollection of section headings or subheadings
// className: string containing the class name of the div (listSection, subListShow)
// addToggle: boolean stating whether to add toggle sublist functionality
function build(item, className, addToggle) {
  var div = document.createElement('div');
  div.setAttribute('class', className);

  for (i=0; i<item.length; i++) {
    div.appendChild(buildListButtons(item.item(i), addToggle));
  }
  return div;
}

// =============================================================================

// Reads through content for titles and associated subtitles
// Initiates the side navigation build
function buildNav() {
  var sectionContent = document.getElementsByClassName('section');
  var numberOfSections = sectionContent.length;
  var sideNav = document.getElementsByClassName('sideNav')[0];
  var titleList = [];
  var subSectionList = [];

  // Makes a list of all section titles and associated subsection titles
  // There should only be one sectionTitle per section
  for (i=0; i<numberOfSections; i++) {
    titleList.push(sectionContent[i].getElementsByClassName('sectionTitle'));
    subSectionList.push(sectionContent[i].getElementsByClassName('subSectionTitle'));
  }

  // Builds the listSection
  for (sec=0; sec<numberOfSections; sec++) {
    if (subSectionList[sec].length > 0) {
      var listSection = build(titleList[sec], 'sn-listSection', true);
      var sublist = build(subSectionList[sec], 'sn-sublist', false);

      listSection.appendChild(sublist)
    } else {
      var listSection = build(titleList[sec], 'sn-listSection', false);
    }
    sideNav.appendChild(listSection);
  }
}

buildNav();
