const COOL_PHRASES = [
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

document.addEventListener('DOMContentLoaded', () => {
    next_phrase();
    next_math();
    let modals = document.getElementsByClassName("modal");
    for (let i = 0; i < modals.length; i++) {
        new M.Modal(modals[i]);
    }
});

function success() {
    let element = document.getElementById("success");
    let modal = M.Modal.getInstance(element);
    modal.open();
}

function failure() {
    let element = document.getElementById("failure");
    let modal = M.Modal.getInstance(element);
    modal.open();
}

function random_int(max) {
    return Math.floor(Math.random() * max);
}

function next_phrase() {
    document.getElementById("phrase").innerHTML = COOL_PHRASES[random_int(COOL_PHRASES.length)];
}

function check_math() {
    let a = +(document.getElementById("number_a").innerText);
    let b = +(document.getElementById("number_b").innerText);
    let result = +(document.getElementById("number_result").value);
    if (a + b == result) {
        failure();
    } else {
        success();
    }
    document.getElementById("number_result").value = "";
}

function next_math() {
    let a = String(random_int(10));
    let b = String(random_int(10));
    document.getElementById("number_a").innerText = a;
    document.getElementById("number_b").innerText = b;
}

function on_notify_switch() {
    let switch_on = document.getElementById("notify_switch").checked;
    if (switch_on) {
        Notification.requestPermission(result => {
            if (result == "denied" || result == "default") {
                M.toast({
                    html: "Allow notifications to receive reality check reminders",
                    classes: "grey lighten-4 grey-text text-darken-4"
                })
            }
        });
    }
    set_notify(switch_on);
}

const {set_notify} = new class {
    readonly POLL_INTERVAL_SECONDS = 1;
    readonly REMINDER_INTERVAL_SECONDS = 3600;

    timeout;
    remaining = 0;

    set_notify = (enabled) => {
        if (enabled) {
            this.timeout = window.setInterval(this.check_notify, this.POLL_INTERVAL_SECONDS * 1000);
        } else {
            window.clearInterval(this.timeout);
        }
    };

    check_notify = () => {
        this.remaining -= this.POLL_INTERVAL_SECONDS;

        if (this.remaining <= 0) {
            this.remaining = this.REMINDER_INTERVAL_SECONDS;
            this.on_notify();
        }

        this.draw();
    };

    on_notify = () => {
        next_phrase();
        new Notification("Reality Check", {
            body: "Are you dreaming right now?",
        });
    };

    draw = () => {
        let minutes = Math.floor(this.remaining / 60);
        let seconds = this.remaining % 60;
        document.getElementById("time_remaining").innerHTML = `${minutes} minutes ${seconds} seconds`;

        let percentage = String(100 - ((this.remaining / this.REMINDER_INTERVAL_SECONDS) * 100));
        let style_string = `width: ${percentage}%`;
        document.getElementById("remaining_progress").setAttribute("style", style_string);
    };
};
