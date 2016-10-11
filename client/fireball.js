import { Scores } from '../imports/api/scores.js';

import '../imports/ui/controls/controls.js';
import '../imports/ui/scores/scores.js';

Session.setDefault("counter", 10);
Session.setDefault("food", "Meat");
let timer = null;

//Sets the counter and start the game timer.
const start = function () {
  const startTime = new Date().getTime();
  Session.set("counter", 10);

  timer = Meteor.setInterval(function () {
    // every 10 seconds (10 * 1000), subtract 1 from the counter
    const currentCounter = Session.get("counter");
    if (currentCounter > 0) {
      Session.set("counter", currentCounter - 1);
    }
    else {
      const endTime = new Date().getTime();
      var userName = prompt('Tell your name young tamer.');

      if (typeof userName === 'undefined' || userName === null) {
        userName = 'Tamer_' + endTime;
      }

      Meteor.clearInterval(timer);
      Scores.insert({
        name: userName,
        score: endTime - startTime
      });
      alert("Game over! Your score is " + (endTime - startTime));
    }
  }, 10 * 1000);
};

Template.reset.events({
  'click button': function () {
    Meteor.clearInterval(timer);
    start();
  }
});

// execute the start function
Meteor.startup(start);
