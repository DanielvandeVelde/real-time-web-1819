(function() {
  var socket = io();
  document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();
    socket.emit("chat message", document.querySelector("#m").value);
    document.querySelector("#m").value = "";
    return false;
  });
  socket.on("chat message", function(msg) {
    var newLi = document.createElement("li");

    let arr = [
      "yellow",
      "red",
      "purple",
      "green",
      "cyan",
      "white",
      "flash1",
      "flash2",
      "flash3",
      "glow1",
      "glow2",
      "glow3"
    ];

    let re = /^(\w){3,6}:/;
    let mtch = msg.match(re);

    if (mtch) {
      let str = mtch[0];
      str = str.substr(0, str.length - 1);

      if (arr.includes(str)) {
        msg = msg.substr(str.length + 1, msg.length);
        newLi.className = str;
      }

      if (str == "scroll" || str == "slide" || str == "shake") {
        msg = msg.substr(str.length + 1, msg.length);
        newLi.className = str;

        let newSpan = document.createElement("span");
        newSpan.textContent = msg;
        newLi.append(newSpan);
        document.querySelector("#messages").append(newLi);
        return;
      }

      if (str == "wave") {
        msg = msg.substr(str.length + 1, msg.length);
        let split = "<span>" + msg.split("").join("</span>" + "<span>");
        split.substr(0, split.length - 6);
        split += "</span>";

        newLi.className = str;
        newLi.innerHTML = split;
        document.querySelector("#messages").append(newLi);
        return;
      }
    }

    newLi.textContent = msg;
    document.querySelector("#messages").append(newLi);
  });
})();
