// Place your application-specific JavaScript functions and classes here
//TODO move much of this to files for specific features
$(document).ready(function() {

    $.datepicker.setDefaults({ dateFormat: 'dd/mm/yy' });

    var $dialog = $("#holidayFormDialog").dialog({
        autoOpen: false,
        title: 'Edit holiday'
    });

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        eventClick: function() {
            $dialog.dialog('open');
        },
        events: "/vacations"
    });

    $('#vacation_date_from').datepicker();
    $("#vacation_date_to").datepicker();

    $("#cancelUpdate").click(function() {
        $("fieldset.vacation, legend.vacation").removeClass("update").addClass("create");
        $("legend.vacation").html("Create Holiday");
        $(this).hide();
        clearForm($("#new_vacation"));
        $("#vacation_date_from").val($.formatDate(new Date(), "dd/MM/yyyy"));
        $("#vacation_date_to").val($.formatDate(new Date(), "dd/MM/yyyy"));
        $("form.vacation").attr("action", "/vacations");
        $("form.vacation").attr("method", "POST");
        $("#vacation_submit").val("Create Holiday");
    });

});

function clearForm(myForm) {
    $(myForm).find(':input').each(function() {
        switch (this.type) {
            case 'password':
            case 'select-multiple':
            case 'select-one':
            case 'text':
            case 'textarea':
                $(this).val('');
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });
}


