$(() => {
  function filterInit() {
    // 버튼 클릭하면
    $(".fbtn").click(function () {
      // 모든 버튼에서 active 제거, 클릭한 버튼만 active 추가
      $(".fbtn").removeClass("active");
      $(this).addClass("active");

      // 선택한 필터 종류
      const type = $(this).data("filter");

      // 모든 아이템 숨기기
      $(".item").hide();

      // all이면 모두 보이기, 아니면 해당 종류만 보이기
      if (type === "all") {
        $(".item").fadeIn();
      } else {
        $(`.item[data-cate="${type}"]`).fadeIn();
      }
    });
  }

  function modalInit() {
    $(".item[data-url]").on("click", function () {
      const url = $(this).data("url");
      if (url) {
        $("body").addClass("modal-open");
        $("#modal").fadeIn(300);
        $("#modal-body").load(url);
      }
    });

    function closeModal() {
      $("#modal").fadeOut(300);
      $("body").removeClass("modal-open");
    }

    $(".close").on("click", closeModal);

    $(window).on("click", function (event) {
      if (event.target.id === "modal") {
        closeModal();
      }
    });
  }

  filterInit();
  modalInit();
});
