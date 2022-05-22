  $(function () {
    // declare variable
    var myArray;
    var inputLength;
    var reading = false;
    var counter;
    var action;
    var frequency=500;
    // on page load hide element we dont need, leave only text area and start button
    $("#new").hide();
    $("#resume").hide();
    $("#pause").hide();
    $("#controls").hide();
    $("#result").hide();
    $("#error").hide();

    // click on start Reading
    $("#start").click(function() {
      // get text and split it into words inside an myArray
      // \s matches spaces tabs, new lines, etc and+ means one or more

      myArray = $("#userInput").val().split(/\s+/);

      inputLength = myArray.length;

      if (inputLength>1) {
         reading = true;

         // Hide Start, Error, UserInput and show New, pause, control
          $("#start").hide();
          $("#error").hide();
          $("#userInput").hide();
          $("#new").show();
          $("#pause").show();

            $("#controls").show();
            // set the progress slider max
              $("#progressslider").attr("max", inputLength - 1);

            counter = 0;
           // show reading box with the first box
           $("#result").show();
           $("#result").text(myArray[counter]);
           // start reading from the first word
           action = setInterval(read, frequency);



      } else {
        $("#error").show();
      }

    });

    // click on New
    $("#new").click(function() {
      location.reload();

    });

    // click on Pause
      $("#pause").click(function() {
        clearInterval(action);
        reading = false;
        // hide pause and show Resume
        $("#pause").hide();
        $("#resume").show();

      });


    // click on Resume
      $("#resume").click(function() {
        action = setInterval(read, frequency);
        reading = true;
        // hide resume and show pause
        $("#pause").show();
        $("#resume").hide();

      });


    // change fontsize
    $("#fontsizeslider").on("slidestop", function(event, ui) {
      $("#fontsizeslider").slider("refresh");
      var slidervalue = parseInt($("#fontsizeslider").val());

      $("#result").css("fontSize", slidervalue);
      $("#fontsize").text(slidervalue);
    });

    // change speedslider
    $("#speedslider").on("slidestop", function(event, ui) {
      $("#speedslider").slider("refresh");
      var slidervalue = parseInt($("#speedslider").val());


      $("#speed").text(slidervalue);
      // stop Reading
      clearInterval(action);
      // change the frequency
      frequency = 60000/slidervalue;
      // Resume reading if we are reading mode
      if(reading){
            action = setInterval(read, frequency);
      }
    });


    // progress slider
      $("#progressslider").on("slidestop", function(event, ui) {
        $("#progressslider").slider("refresh");
        var slidervalue = parseInt($("#progressslider").val());



        // stop Reading
        clearInterval(action);
        // change the counter
        counter = slidervalue;

        // change the word
        $("#result").text(myArray[counter]);
        // change the value of progressslider
        $("#percentage").text(Math.floor(counter/(inputLength - 1)*100));
        // Resume reading if we are reading mode
        if(reading){
              action = setInterval(read, frequency);
        }
      });

    // function
    function read() {
      if (counter=== inputLength - 1) {
        clearInterval(action);
        reading = false;
        $("#pause").hide();

      } else {
        counter++;
        $("#result").text(myArray[counter]);
        // change the progress slider value and refresh
        $("#progressslider").val(counter);
        $("#progressslider").slider("refresh");
        // change the percentage of text
        $("#percentage").text(Math.floor((counter/(inputLength - 1))*100));
      }

    }


  });
