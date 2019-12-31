var buttonElements = document.getElementsByClassName("update_action")
for (var i = 0; i < buttonElements.length; i++) {
  buttonElements[i].addEventListener("click", function(){
    window.location.href = "/feedback";
  });
}
