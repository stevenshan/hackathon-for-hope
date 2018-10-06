var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var STARTINGHOUR = 7;
var calendar = [];
// var COLORS = ["#FFFC00", "#00c300", "#ff6600", "#1ab7ea", "#ff0084", "#02b875", "#131418", "#3b5999", "#eb4924"];

$(function(){
    showNewPrescriptionForm();

    var hourRow = $('<div class="row hour"></div>');
    var titleRow = $('<div class="row title-row"><span class="cell day-index">&nbsp;</span></div>');
    var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    for (var d in days)
    {
        hourRow.append('<span class="cell day"></span>');
        titleRow.append('<span class="cell">' + days[d] + '</span>');
    }
    $("#right-pane").append(titleRow);
    var AM_PM = [" am", " pm"];
    for (var i = STARTINGHOUR; i < 24; i++)
    {
        var row = hourRow.clone();
        calendar.push(row.find(".day").toArray());
        var index = i;
        if (index == 0)
        {
            index = "Midnight";
        }
        else if (index == 12)
        {
            index = "Noon";
        }
        else
        {
            var j = Math.floor(i / 12);
            index = (i % 12) + AM_PM[j];
        }
        row.prepend('<span class="cell day-index">' + index + '</span>');
        $("#right-pane").append(row);
    }

    var tempMenu = $("#prescription-templates .select-input-menu");
    var temp = '<input type="radio" id="{}" name="prescription-temp"><label for="{}">{}</label>';
    _MEDICINES = {};
    for (var i in MEDICINES)
    {
        var medicine = MEDICINES[i];
        var id = "xyz" + i;
        tempMenu.append(temp.format(id, id, medicine["name"]));

        _MEDICINES[medicine["name"]] = medicine;
    }
    resetPrescriptionForm();

    initializeSelectInput($("#prescription-templates"), (label) => {
        var medicine = _MEDICINES[label];
        var getInput = (name) => $("#prescription-form [name='" + name + "']")

        getInput("name").val(medicine["name"]);
        getInput("instructions").val(medicine["instruction"]);
        getInput("recommendation").val(medicine["recommendation"]);
        getInput("dosage").val(medicine["dosage"]);

        var days = medicine["days"].split(",");
        for (var i in days)
        {
            days[i] = DAYS[days[i]];
        }
        getInput("days").val(days.join(", "));

        var times = medicine["times"].split(","); 
        for (var i in times)
        {
            var temp = times[i];
            var j = Math.floor(temp / 12);
            var k = temp % 12;
            times[i] = (k == 0 ? 12 : k) + AM_PM[j];
        }
        getInput("times").val(times.join(", "));
    });
});

function submitPrescription()
{
    $.post(window.location.href,
           $("#prescription-form").serialize(),
           dataType="json")
        .done(function(data) {
            data = JSON.parse(data);
            addPrescription(data);
            showPrescriptionList();
        })
        .fail(() => showMessage("Could not create new prescription. Please try again later."));
}

function showMessage(mesg)
{
    alert(mesg);
}

function addPrescription(prescription)
{
    var pList = $("#prescription-list");

    var timeLabel = "No schedule for prescription"
    var _times = prescription["times"].split(",");
    var times = _times.length;
    var _days = prescription["days"].split(",");
    var days = _days.length;
    if (times != 0 && days != 0)
    {
        timeLabel = "{} time{} a day for {} day{} a week"
            .format(times, (times == 1 ? "" : "s"),
                    days, (days == 1 ? "" : "s"));
    }
    var item = $('<div class="item"><div class="item-title">{}</div><div class="item-times">{}</div></div>'
        .format(prescription["name"], timeLabel));
    if (prescription["instruction"] != "")
    {
        item.append('<div class="item-notes">' + 
                    prescription["instruction"] + '</div>');
    }

    $("#prescription-list").prepend(item);

    var brick = $('<div class="brick"></div>');
    var color = str2rgb(prescription["_id"]);
    brick.css("background", "#" + color);

    for (var i in _days)
    {
        for (var j in _times)
        {
            var time = parseInt(_times[j]) - STARTINGHOUR;
            var day = parseInt(_days[i]);

            if (time < 0)
            {
                continue;
            }

            $(calendar[time][day]).append(brick.clone());
        }
    }
}

function resetPrescriptionForm()
{
    var temp = $("#prescription-form")
    temp.trigger("reset")
    temp.find("textarea").text("");
    $("#prescription-templates input").prop("checked", false);
    $("#prescription-templates .select-input-title span").html("select a prescription template");
}

function showNewPrescriptionForm()
{
    $("#panes-header-buttons .button").css("display", "none");
    $(".pane-content").css("display", "none");
    $("#prescription-new").css("display", "");
    $("#cancel-new-prescription").css("display", "");
    $("#panes-title").html("New Prescription");
    resetPrescriptionForm();
}

function showPrescriptionList()
{
    $("#panes-header-buttons .button").css("display", "none");
    $(".pane-content").css("display", "none");
    $("#prescription-list").css("display", "");
    $("#new-prescription-button").css("display", "");
    $("#panes-title").html("Prescriptions");
}

function str2rgb(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var c = (hash & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
} 

