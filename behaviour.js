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
];
document.addEventListener('DOMContentLoaded', function () {
    next_phrase();
    next_math();
    var modals = document.getElementsByClassName("modal");
    for (var i = 0; i < modals.length; i++) {
        new M.Modal(modals[i]);
    }
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
}
function next_math() {
    var a = String(random_int(10));
    var b = String(random_int(10));
    document.getElementById("number_a").innerText = a;
    document.getElementById("number_b").innerText = b;
}
function on_notify_switch() {
    var switch_on = document.getElementById("notify_switch").checked;
    if (switch_on) {
        Notification.requestPermission(function (result) {
            if (result == "denied" || result == "default") {
                M.toast({
                    html: "Allow notifications to receive reality check reminders",
                    classes: "grey lighten-4 grey-text text-darken-4"
                });
            }
        });
    }
    set_notify(switch_on);
}
var set_notify = (new /** @class */ (function () {
    function class_1() {
        var _this = this;
        this.POLL_INTERVAL_SECONDS = 1;
        this.REMINDER_INTERVAL_SECONDS = 3600;
        this.remaining = 0;
        this.set_notify = function (enabled) {
            if (enabled) {
                _this.timeout = window.setInterval(_this.check_notify, _this.POLL_INTERVAL_SECONDS * 1000);
            }
            else {
                window.clearInterval(_this.timeout);
            }
        };
        this.check_notify = function () {
            _this.remaining -= _this.POLL_INTERVAL_SECONDS;
            if (_this.remaining <= 0) {
                _this.remaining = _this.REMINDER_INTERVAL_SECONDS;
                _this.on_notify();
            }
            _this.draw();
        };
        this.on_notify = function () {
            next_phrase();
            new Notification("Reality Check", {
                body: "Are you dreaming right now?",
            });
        };
        this.draw = function () {
            var minutes = Math.floor(_this.remaining / 60);
            var seconds = _this.remaining % 60;
            document.getElementById("time_remaining").innerHTML = minutes + " minutes " + seconds + " seconds";
            var percentage = String(100 - ((_this.remaining / _this.REMINDER_INTERVAL_SECONDS) * 100));
            var style_string = "width: " + percentage + "%";
            document.getElementById("remaining_progress").setAttribute("style", style_string);
        };
    }
    return class_1;
}())).set_notify;
;
;
