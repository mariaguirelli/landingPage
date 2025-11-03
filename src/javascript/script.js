$( document ).ready(function() {
  
    // scroll para as seções
  
    let navBtn = $('.nav-item');
  
    let homeSection = $('#home-menu');
    let palestrantesSection = $('#palestrantes-menu');
    let apoiadoresSection = $('#apoiadores-menu');
    let inscricaoSection = $('#inscricao-menu');
    let faleConoscoSection = $('#faleConosco-menu');
  
    let scrollTo = '';
  
    $(navBtn).click(function() {
  
      let btnId = $(this).attr('id');
  
      if(btnId == 'home-menu') {
        scrollTo = homeSection;
      } else if(btnId == 'palestrantes-menu') {
        scrollTo = palestrantesSection;
      } else if(btnId == 'apoiadores-menu') {
        scrollTo = apoiadoresSection;
      } else if(btnId == 'inscricao-menu') {
        scrollTo = inscricaoSection;
      } else if(btnId == 'faleConosco-menu') {
        scrollTo = faleConoscoSection;
      } else {
        scrollTo = homeSection;
      }
  
      $([document.documentElement, document.body]).animate({
          scrollTop: $(scrollTo).offset().top - 70
      }, 1500);
    });
  
  });