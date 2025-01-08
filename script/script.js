$(function(){
  
    // lenis : 사이트 부드럽게
    const lenis = new Lenis()

    lenis.on('scroll', (e) => {
    console.log(e)
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)
    


    // gsap : 스크롤트리거 
    gsap.registerPlugin(ScrollTrigger);



    // nav 부드럽게 이동
    function getSamePageAnchor (link) {
        if (
          link.protocol !== window.location.protocol ||
          link.host !== window.location.host ||
          link.pathname !== window.location.pathname ||
          link.search !== window.location.search
        ) {
          return false;
        }
      
        return link.hash;
    }
      
    function scrollToHash(hash, e) {
        const elem = hash ? document.querySelector(hash) : false;
        if(elem) {
          if(e) e.preventDefault();
          gsap.to(window, {
            scrollTo: elem,
            duration: 1, 
            ease: "power2.out",
          });
        }
    }
      
    document.querySelectorAll('a[href]').forEach(a => {
        a.addEventListener('click', e => {
          scrollToHash(getSamePageAnchor(a), e);
        });
    });
      
    scrollToHash(window.location.hash);



    // about img 마우스 움직임 따라가기
    $("#about .me .me_img").mousemove(function(e){
      w = $(this).width();  // 넓이값
      h = $(this).height(); // 높이값
      xVal = e.offsetX - w / 2; // 중심값 잡아주기
      yVal = e.offsetY - h / 2; // 중심값 잡아주기

      gsap.to($(this).find('img'), {
          x: xVal / 2,
          y: yVal / 2
      });
    });



    // web파트 pin 고정

    const web1 = document.querySelector("#web .web1");
    const web2 = document.querySelector("#web .web2");

    // web1 화면에 들어올 때 애니메이션
    // const webani1 = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: web1,
    //     start: "-80% top",
    //     end: "-30% top",
    //     scrub: true,
    //     // markers: true,
    //   },
    // });
    // webani1
    // .fromTo(web1,{width: "90%", y: 100},{width: "100%", y: 0})

    // web1 고정
    ScrollTrigger.create({
      trigger: web1,
      start: "top top",
      // end: "bottom bottom",
      pin: true,
      pinSpacing: false,
      // markers: true,
    });
    ScrollTrigger.create({
      trigger: web2,
      start: "top top",
      end: "bottom bottom",
      pin: true,
      pinSpacing: false,
      // markers: true,
    });

    // web2가 화면에 들어올 때 애니메이션
    // const webani2 = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: web2,
    //     start: "-100% top",
    //     end: "bottom bottom",
    //     scrub: true,
    //     // markers: true,
    //   },
    // });
    // webani2
    // .fromTo(web2, {width: "80%"},{width: "100%"},"a")
    // .to(web1, {opacity: 0.5, duration: 1},"a+=0.1")

    


    // detail popup

    const detailImg = $('#detail .content .d_img');
    
    $(detailImg).click(function(){
        let clickimgsrc = $(this).css("background-image").replace(/url\(["']?(.*?)["']?\)/, '$1');
        // backgorund image src가져오기

        $("#detail .popup .popup_img img").attr("src", clickimgsrc);
        $("#detail .popup").fadeIn();
        $('body').css('overflow', 'hidden');
    });

    $("#detail .popup").click(function(){
        $(this).fadeOut();
        $('body').css('overflow', 'auto');
    });

    $(".popup .popup_img").on('wheel', function (e) {
        e.stopPropagation();  // 팝업 내에서만 스크롤 가능하게 하기
    });

    // detail img ani
    
    gsap.utils.toArray("#detail .inner").forEach((index, i) => {
      gsap.fromTo(index, 
          { 
            opacity: 0, 
            y: 100,
          },
          { 
            opacity: 1, 
            y: 0,
            scrollTrigger: {
                trigger: index,
                start: "top 80%",
                end: "top 20%",
                scrub: true,
                // markers: true,
            }
          }
      );
    });

    

  // banner swiper
  const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay:{delay: 5000},
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

  });



  // banner popup

  const bannerImg = $('#banner .banner_img');
    
  $(bannerImg).click(function(){
      let clickimgsrc = $(this).css("background-image").replace(/url\(["']?(.*?)["']?\)/, '$1');
      // backgorund image src가져오기

      $("#banner .popup .popup_img img").attr("src", clickimgsrc);
      $("#banner .popup").fadeIn();
      $('body').css('overflow', 'hidden');
  });

  $("#banner .popup").click(function(){
      $(this).fadeOut();
      $('body').css('overflow', 'auto');
  });

  $(".popup .popup_img").on('wheel', function (e) {
      e.stopPropagation();  // 팝업 내에서만 스크롤 가능하게 하기
  });



  // footer clipbord 복사
  const copyBtn = document.querySelectorAll("#footer .copy");
  const text = document.querySelectorAll("#footer .copytext");

  copyBtn.forEach((button, index) => {
    button.addEventListener("click", () => {
      const textToCopy = text[index].textContent;
      navigator.clipboard.writeText(textToCopy).catch(err => {
        console.error("클립보드 복사 실패 : ", err);
      });
    });
  });

}); //script end...


