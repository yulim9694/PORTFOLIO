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



    // web
    gsap.to("#web .web_wrap", {
      scrollTrigger : {
        trigger: "#web .web_wrap",
        start: "-20% top",
        end: "-10% top",
        scrub: 1,
        onEnter: () => {
          gsap.to("#web .web_wrap", {opacity:"1"})
        },
        onLeaveBack: () => {
          gsap.to("#web .web_wrap", {opacity:"0"})
        }
      }
    })
    
    $("#web .web_wrap .card").each(function(i,e){

      if ($(e).hasClass("last")) {
        return;
      }

      ScrollTrigger.create({
        trigger: e,
        endTrigger: "#web .web_wrap .card.last",
        start: "top top+=60",
        end: "top -5%",
        pin: true,
        pinSpacing: false,
        // markers: 1,
      });

      gsap.to(e, {
        scrollTrigger: {
          trigger: e,
          start: "top top+=65",
          end: "top -=70%",
          scrub: 1,
        },
        scale: 0.7,
        filter: "blur(8px)",
        ease: "none",
      });
    });
    
    const web_bottom = gsap.timeline({
      scrollTrigger: {
        trigger: "#web .web_wrap .card.last",
        start: "top top",
        end: "70% top",
        scrub: 1,
        // markers: true,
      }
    });
    web_bottom.to("#web .bottom div:first-child", {backgroundSize: "100%", duration: 1}, 0);
    web_bottom.to("#web .bottom div:nth-child(2)", {backgroundSize: "100%", duration: 1}, 0.1);
    web_bottom.to("#web .bottom .btn", {opacity: "1", filter: "blur(0px)", y: "0", duration: 0.5}, 0);






    // detail popup

    const detailImg = $('#detail .content .d_img');
    
    $(detailImg).click(function(){
        let clickimgsrc = $(this).css("background-image").replace(/url\(["']?(.*?)["']?\)/, '$1');
        // backgorund image src가져오기

        $("#detail .popup .popup_img img").attr("src", clickimgsrc);
        $("#detail .popup").css('display', 'block');
        $("#detail .popup .popup_img").scrollTop(0);
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


