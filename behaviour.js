var COOL_PHRASES = [
    "Those trees look like a triple deluxe pizza",
    "Burn the monkeys, they don't exist",
    "It's a bread stick on fire",
    "We will get the frogs to pay for it",
    "One small step for humanity, one big step for boomerang",
    "I took the watermelon for a walk",
    "He literally flew into the ceiling",
    "You mistook his royal crabbiness for a bronze boot?",
    "Where are the directions to the restroom?",
    "Sorry guys, I gotta charge my gaming chair",
    "Make him the magical girl he always wanted to be",
    "I don't have to draw gay windows",
    "A person can only take so many vines",
    "Girl look how orange you freaking look girl",
    "Crap, all the crackers fell out",
    "A giant freaking moth just entered my room",
    "Holy crap, it was massive",
    "It sounds like a yapping duck",
    "Crap, my banana just fell",
    "I'm exotic like a lamborghini",
    "Said the man who legally changed their name to 'Sexy Vegan'",
    "On a related note, so much freaking earwax",
];
document.addEventListener('DOMContentLoaded', function () {
    next_phrase();
    next_math();
    var modals = document.getElementsByClassName("modal");
    for (var i = 0; i < modals.length; i++) {
        new M.Modal(modals[i]);
    }
    window.onbeforeunload = function () { return true; };
});
function success() {
    var element = document.getElementById("success");
    var modal = M.Modal.getInstance(element);
    modal.open();
}
function failure() {
    var element = document.getElementById("failure");
    var modal = M.Modal.getInstance(element);
    modal.open();
}
function random_int(max) {
    return Math.floor(Math.random() * max);
}
function next_phrase() {
    document.getElementById("phrase").innerHTML = COOL_PHRASES[random_int(COOL_PHRASES.length)];
}
function check_math() {
    var a = +(document.getElementById("number_a").innerText);
    var b = +(document.getElementById("number_b").innerText);
    var result = +(document.getElementById("number_result").value);
    if (a + b == result) {
        failure();
    }
    else {
        success();
    }
    document.getElementById("number_result").value = "";
}
function next_math() {
    var a = String(random_int(10));
    var b = String(random_int(10));
    document.getElementById("number_a").innerText = a;
    document.getElementById("number_b").innerText = b;
}
function on_notify_switch() {
    var switch_on = document.getElementById("notify_switch").checked;
    var allowed = false;
    if (switch_on) {
        Notification.requestPermission(function (result) {
            if (result == "denied" || result == "default") {
                M.toast({
                    html: "Allow notifications to receive reality check reminders",
                    classes: "grey lighten-4 grey-text text-darken-4"
                });
            }
            else {
                allowed = true;
            }
        });
    }
    set_notify(switch_on && allowed);
}
var set_notify = (new /** @class */ (function () {
    function class_1() {
        var _this = this;
        this.POLL_INTERVAL_SECONDS = 1;
        this.REMINDER_INTERVAL_SECONDS = 3600;
        this.set_notify = function (enabled) {
            if (enabled) {
                if (_this.start == null) {
                    _this.start = Date.now();
                }
                else {
                    _this.start = Date.now() - _this.pause_elapsed;
                }
                _this.interval = window.setInterval(_this.check_notify, _this.POLL_INTERVAL_SECONDS * 1000);
            }
            else {
                _this.pause_elapsed = Date.now() - _this.start;
                window.clearInterval(_this.interval);
            }
        };
        this.check_notify = function () {
            var elapsed = Math.round((Date.now() - _this.start) / 1000);
            if (elapsed >= _this.REMINDER_INTERVAL_SECONDS) {
                _this.start = Date.now();
                _this.on_notify();
            }
            _this.draw(elapsed);
        };
        this.on_notify = function () {
            next_phrase();
            next_math();
            new Notification("Reality Check", {
                body: "Are you dreaming right now?",
            });
        };
        this.draw = function (elapsed) {
            var remaining = _this.REMINDER_INTERVAL_SECONDS - elapsed;
            var minutes = Math.floor(remaining / 60);
            var seconds = remaining % 60;
            document.getElementById("time_remaining").innerHTML = minutes + " minutes " + seconds + " seconds";
            var percentage = String((elapsed / _this.REMINDER_INTERVAL_SECONDS) * 100);
            var style_string = "width: " + percentage + "%";
            document.getElementById("remaining_progress").setAttribute("style", style_string);
        };
    }
    return class_1;
}())).set_notify;
