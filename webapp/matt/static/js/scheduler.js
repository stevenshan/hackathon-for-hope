$(function(){
    showPrescriptionList();

    var hourRow = $('<div class="row hour"></div>');
    var titleRow = $('<div class="row title-row"><span class="cell day-index">&nbsp;</span></div>');
    var days = ["Sun", "Mon", "Tue",
                "Wed", "Thur", "Fri", "Sat"];
    for (var d in days)
    {
        hourRow.append('<span class="cell day"></span>');
        titleRow.append('<span class="cell">' + days[d] + '</span>');
    }
    $("#right-pane").append(titleRow);
    var AM_PM = [" am", " pm"];
    for (var i = 7; i < 24; i++)
    {
        var row = hourRow.clone();
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
});

function showNewPrescriptionForm()
{
    $("#panes-header-buttons .button").css("display", "none");
    $(".pane-content").css("display", "none");
    $("#prescription-new").css("display", "");
    $("#cancel-new-prescription").css("display", "");
    $("#panes-title").html("New Prescription");
}

function showPrescriptionList()
{
    $("#panes-header-buttons .button").css("display", "none");
    $(".pane-content").css("display", "none");
    $("#prescription-list").css("display", "");
    $("#new-prescription-button").css("display", "");
    $("#panes-title").html("Prescriptions");
}