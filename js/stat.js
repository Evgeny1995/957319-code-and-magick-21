"use strict";

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var GAP_DATA = 30;
var FONT_GAP = 20;
var COLUMN_GAP = 50;
var FONT = "16px PT Mono";
// var FONT_GAP = 15;
// var TEXT_WIDTH = 50;

var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, "rgba(0, 0, 0, 0.7)");
  renderCloud(ctx, CLOUD_X, CLOUD_Y, "#fff");
  ctx.font = FONT;
  ctx.fillStyle = "#000";
  ctx.fillText(`Ура вы победили!`, CLOUD_X + GAP_DATA, CLOUD_Y + GAP_DATA);
  ctx.fillText(
      `Список результатов:`,
      CLOUD_X + GAP_DATA,
      CLOUD_Y + GAP_DATA + FONT_GAP
  );

  var maxTime = getMaxElement(times);

  var getRandomInt = function (min, max) {
    var rand = min + Math.random() * (max - min);
    return Math.round(rand);
  };

  var getRandomColor = function (name) {
    if (name === "Вы") {
      return "red";
    }

    var color = getRandomInt(200, 255).toString();

    var hsl = "hsl(" + color + ",100%,50%)";

    return hsl;
  };

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = getRandomColor(players[i]);

    ctx.fillRect(
        CLOUD_X + COLUMN_GAP + (BAR_WIDTH + COLUMN_GAP) * i,
        CLOUD_Y + GAP + CLOUD_HEIGHT - GAP_DATA - FONT_GAP,
        BAR_WIDTH,
        -(BAR_HEIGHT * times[i]) / maxTime
    );
    ctx.fillStyle = "black";
    ctx.fillText(
        players[i],
        CLOUD_X + COLUMN_GAP + (BAR_WIDTH + COLUMN_GAP) * i,
        CLOUD_Y + CLOUD_HEIGHT - GAP_DATA + GAP
    );
    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + COLUMN_GAP + (BAR_WIDTH + COLUMN_GAP) * i,
        CLOUD_Y +
        CLOUD_HEIGHT -
        GAP_DATA -
        FONT_GAP -
        (BAR_HEIGHT * times[i]) / maxTime
    );
  }
};
