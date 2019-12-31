var buttonElements = document.getElementsByClassName("continue_action")
for (var i = 0; i < buttonElements.length; i++) {
  buttonElements[i].addEventListener("click", function(){
    window.location.href = "/categories";
  });
}
