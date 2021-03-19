$(document).ready(function () {
    
    //momentjs current date and time variables
    var currentDate = moment().format('MMMM D, YYYY<br>h:mm a');
    var currentTime = moment().format("HH");

    
    //Arrays for time
    var clockArr24 = [9, 10, 11, 12, 13, 14, 15, 16, 17];
    var clockArr = [9, 10, 11, 12, 1, 2, 3, 4, 5,];
    var numArr = ["nine", "ten", "eleven", "twelve", "one", "two", "three", "four", "five"];

    
    //display current date and time
    $("#currentDay").append(currentDate);
  
    for (var i = 0; i < clockArr.length; i++) {
        //create new rows with corresponding time variable from Array
        var newRow = $("<row>");
        newRow.addClass("time-block row");
        newRow.attr("id", clockArr24[i]);
        $(".container").append(newRow);

        //create columns in rows for time and text area
        var newColumnTime = $("<col>");
        var newColumnText = $("<col>");
        newRow.append(newColumnTime, newColumnText);
        newColumnTime.attr("class", "col-2 hour");
        newColumnText.attr("class", "col-9 input");
        newColumnText.attr("id", numArr[i]);
        newColumnText.html("<textarea rows='3'style='width: 100%; margin-left: -2rem; height: 100%'></textarea>");

        //add tme text to first column
        if (clockArr[i] === 12) {
            newColumnTime.text(clockArr[i] + "PM");
        } else if (clockArr[i] > 8) {
            newColumnTime.text(clockArr[i] + "AM");
        } else { newColumnTime.text(clockArr[i] + "PM") };

        
        //add button to be able to save text to local storage, add font awesome icon
        var addButton = $("<button>");
        addButton.attr("id", clockArr[i]);
        addButton.attr("class", "saveBtn fas fa-save col-1");
        newRow.append(addButton);
        
    }

    //create classes to show css styles for past,present,future; parseInt changes string to integer
    $("row").each(function () {
        var getId = parseInt($(this).attr("id"));
        

        if (parseInt(currentTime) < 9 || parseInt(currentTime) > 17) {
            $(this).addClass("past");
        } if (getId < parseInt(currentTime)) {
            $(this).addClass("past");
        } if (getId > parseInt(currentTime)) {
            $(this).addClass("future");
        } if (getId === parseInt(currentTime)) {
            $(this).addClass("present");

        }

    })

    //on click event to save to local storage
    var saveBtn = $(".saveBtn");
    saveBtn.on("click", function (event) {
        event.preventDefault();
        console.log($(this).attr("id"));
        console.log($(this).siblings(".input").children("textarea"));
        console.log($(this).siblings(".input").children("textarea").val());

        var hour = $(this).attr("id");
        var note = $(this).siblings(".input").children("textarea").val();

        localStorage.setItem(hour, note);
    })
    //for loop to retrieve from local storage
    for (let i=0; i < clockArr.length; i++) {
    $("#"+numArr[i]).children("textarea").text(localStorage.getItem(clockArr[i]));
    }
})