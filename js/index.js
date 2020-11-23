var mySwiper = new Swiper('.swiper-container', {
  direction: 'horizontal', // 切换选项
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  speed: 2000,
  autoplay: {
    delay: 5000
  },
  loop: true, // 循环模式选项

  pagination :{
    el: '.swiper-pagination',
    clickable :true,
    },

  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },


})