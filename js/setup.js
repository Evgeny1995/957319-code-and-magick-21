'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_LIMITS = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandElementFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

var randName = function () {
  var nameFirst = getRandElementFromArray(WIZARD_NAMES);
  var surName = getRandElementFromArray(WIZARD_SURNAME);
  return nameFirst + ' ' + surName;
};

var randCoat = function () {
  var randCoatColor = getRandElementFromArray(WIZARD_COAT);
  return randCoatColor;
};

var randEyes = function () {
  var randEyesColor = getRandElementFromArray(WIZARD_EYES);
  return randEyesColor;
};

var createWizard = function () {
  return {
    name: randName(),
    coatColor: randCoat(),
    eyesColor: randEyes()
  };
};

var getRandomWizards = (count) => {
  var wizards = [];

  for (var j = 0; j < count; j++) {
    var wizard = createWizard();

    wizards.push(wizard);
  }

  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
var readyWizards = getRandomWizards(WIZARDS_LIMITS);

readyWizards.forEach((item) => {
  var wizardFragment = renderWizard(item);

  fragment.appendChild(wizardFragment);
});

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
