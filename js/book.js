$("#dismiss").on("click", function () {
  var top = $("#menu").offset().top + $("#menu").height();

  $("#sidebar").offset({ top: top, left: -250 });
});

$("#sidebarCollapse").on("click", function () {
  var top = $("#menu").offset().top + $("#menu").height();

  $("#sidebar").offset({ top: top, left: 0 });
  
});
