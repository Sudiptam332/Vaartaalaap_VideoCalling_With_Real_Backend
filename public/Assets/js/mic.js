$(function () {
  let recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = true;
  let isMicOn = false;

  recognition.onresult = function (event) {
    let interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        $("#messages").append(
          "<div>" + event.results[i][0].transcript + "</div>"
        );
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
  };

  recognition.onerror = function (event) {
    console.error("Speech recognition error:", event.error);
  };

  $("#btnToggleMic").click(function () {
    if (!isMicOn) {
      recognition.start();
      isMicOn = true;
      $("#btnToggleMic")
        .removeClass("mic-off")
        .addClass("mic-on")
        .text("Turn Off Microphone");
    } else {
      recognition.stop();
      isMicOn = false;
      $("#btnToggleMic")
        .removeClass("mic-on")
        .addClass("mic-off")
        .text("Turn On Microphone");
    }
  });
});
