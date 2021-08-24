$(function() {
  var header = $("#header"),
      headerTopH = $(".header__top").innerHeight(),
      headerH = $("#header").innerHeight(),
      scrollOffset = $(window).scrollTop(),
      doc_w = $(window).width();


  
  $('.nav__search').html($('#header__search--div').html());

  /* Fixed Header */
  checkScroll(scrollOffset);

  $(window).on("scroll", function() {
      scrollOffset = $(this).scrollTop();

      checkScroll(scrollOffset);
  });


  function checkScroll(scrollOffset) {
    if( scrollOffset >= headerTopH ) {
        $(".header__top").css({"margin-bottom": headerH});
        header.addClass("fixed");
        $(".header__lang").removeClass("active");
    } else {
        header.removeClass("fixed");
        $(".header__top").css({"margin-bottom": "0"});
    }

  }



  // Cart Products Variables
  let cartIconQuantityNum = $('#cartProductQuantity'),
  likedIconQuantityNum = $('#likedProductQuantity'),
  cartContentBtnNum = $('.subnav-content__btn--num'),
  fullprice = $(".fullprice span");



  function removeDots(price){
    price = String(price);
    let priceNoDots;
    let n = 0;

    for (let char of price) {
        if(char != "." && n != 0){
            priceNoDots += char;
        }
        if(char != "." && n == 0){
            n++;
            priceNoDots = char;
        }
    }

    priceNoDots = Number(priceNoDots);
    return priceNoDots;
  }



  function addDots(price){
    price = String(price);
    let priceArray = [],
        priceWithDots,
        l = 1;
        n = 1;


    for (let char of price) {
        priceArray.push(char);
    }

    priceArray.reverse();
    for (let num of priceArray) {
        if(n == 2) {
            priceArray[n] += ".";
        }

        n++;
    }

    priceArray.reverse();
    for (let num of priceArray) {
      if(l == 1){
        priceWithDots = num;
      }
      if(l != 1){
          priceWithDots += num;
      }

      l++;
    }
    return priceWithDots;
  }




  // Cart Or Liked Products Data-Ids
  function cartOrLikedProductsDataIds(a){
    let l = a.find(".product__item").length;
    product = a.find(".product__item").first();
    let productsIds = [];

    for(let i = 1; i <= l; i++){
      productsIds.push(product.attr("data-id"));
      product = product.next();
    }

    return productsIds;
  }





  // Calc full Price Sum
  function calcfullpriceSum(){
    cartContent = $("#cart");
    let l = cartContent.find(".cart__product").length;
    let fp = 0;
    cartProduct = $(".cart__product").first();
    

    for(let i = 1; i <= l; i++){
        cartProductPrice = removeDots(cartProduct.find(".product__price span").text());
        cartProductQuantityNum = cartProduct.find(".subnav-product__quantity--num").text();

        let productSum = cartProductQuantityNum *= cartProductPrice;
        fp += productSum;

        let a = cartProduct.attr("data-id");
        $("#liked").find('.liked__product[data-id|="'+a+'"]').find(".liked-product__cart").addClass("active");

        cartProduct = cartProduct.next();
    }

    fullprice.text(addDots(fp));

    if(l == 0){
      $('#cart').addClass("empty");
    }else{
      $('#cart').removeClass("empty");
    }

    cartContentBtnNum.text(l);
    cartIconQuantityNum.text(l);
  }
  calcfullpriceSum();



  // calc Liked Product Legth
  function calcLikedProductLegth(){
    likedContent = $("#liked");
    let l = likedContent.find(".liked__product").length;
    likedIconQuantityNum.text(l);

  }
  calcLikedProductLegth();



  // Generate Cart Product
  function generateCartProduct(img, title, price, id){
    return `
    <li class="subnav-content__item product__item cart__product" data-id="${id}">
      <article class="subnav-product">
          <div class="subnav-product__content">
              <img src="${img}" alt="" class="subnav-product__img">
              <div class="subnav-product__text">
                  <p class="product__title">${title}</p>
                  <div class="product__rating">
                      <svg>
                          <use xlink:href="assets/img/sprite.svg#star"></use>
                      </svg>
                      <svg>
                          <use xlink:href="assets/img/sprite.svg#star"></use>
                      </svg>
                      <svg>
                          <use xlink:href="assets/img/sprite.svg#star"></use>
                      </svg>
                      <svg>
                          <use xlink:href="assets/img/sprite.svg#star"></use>
                      </svg>
                      <svg>
                          <use xlink:href="assets/img/sprite.svg#star"></use>
                      </svg>
                  </div>
                  <div class="product__price">$<span>${price}</span></div>
              </div>
          </div>

          <div class="subnav-product__control">
              <div class="subnav-product__quantity">
                  <button class="subnav-product__quantity--btn subnav-product__btn--plus" type="button">
                      <svg>
                          <use xlink:href="assets/img/sprite.svg#plus"></use>
                      </svg>
                  </button>

                  <div class="subnav-product__quantity--num">1</div>

                  <button class="subnav-product__quantity--btn subnav-product__btn--minus" type="button">
                      <svg>
                          <use xlink:href="assets/img/sprite.svg#minus"></use>
                      </svg>
                  </button>
              </div>
              <button class="subnav-product__delete product__btnDelete" type="button">
                  <svg>
                      <use xlink:href="assets/img/sprite.svg#trash"></use>
                  </svg>
              </button>
          </div>
      </article>
    </li>
    `;
  };



  // Generate Cart Product
  function generateLikedProduct(img, title, price, id){
    return `
    <li class="subnav-content__item product__item liked__product" data-id="${id}">
      <article class="subnav-product">
          <div class="subnav-product__content">
              <img src="${img}" alt="" class="subnav-product__img">
              <div class="subnav-product__text">
                  <p class="product__title">${title}</p>
                  <div class="product__rating">
                      <svg>
                          <use xlink:href="assets/img/sprite.svg#star"></use>
                      </svg>
                      <svg>
                          <use xlink:href="assets/img/sprite.svg#star"></use>
                      </svg>
                      <svg>
                          <use xlink:href="assets/img/sprite.svg#star"></use>
                      </svg>
                      <svg>
                          <use xlink:href="assets/img/sprite.svg#star"></use>
                      </svg>
                      <svg>
                          <use xlink:href="assets/img/sprite.svg#star"></use>
                      </svg>
                  </div>
                  <div class="product__price">$<span>${price}</span></div>
              </div>
          </div>

          <div class="subnav-product__control">
              <button class="subnav-product__cart liked-product__cart" type="button">
                  <svg>
                      <use xlink:href="assets/img/sprite.svg#cart"></use>
                  </svg>
                  <span class="subnav-product__cart--quantity">
                      <svg>
                          <use xlink:href="assets/img/sprite.svg#checkMark"></use>
                      </svg>
                  </span>
              </button>
              <button class="subnav-product__delete product__btnDelete" type="button">
                  <svg>
                      <use xlink:href="assets/img/sprite.svg#trash"></use>
                  </svg>
              </button>
          </div>
      </article>
    </li>
    `;
  };








  // Adding products to
  // Cart and Liked

  // Add to Cart
  $(document).on("click", '.product__btnCart', function(event){
    event.preventDefault();

    let productImg = $(this).parents(".product__item").find(".product__preview img").attr("src"),
      productTitle = $(this).parents(".product__item").find(".product__title").text(),
      productPrice = $(this).parents(".product__item").find(".product__price span").text(),
      productDataId = $(this).parents(".product__item").attr("data-id"),
      b = "!=";

    for (let char of cartOrLikedProductsDataIds($("#cart"))) {
      if(char == productDataId){
        b = "==";
      }
    };

    if(b == "!="){
      $("#cartContentList").prepend(generateCartProduct(productImg, productTitle, productPrice, productDataId));
      calcfullpriceSum();
    };
  });



  $(document).on("click", '.liked-product__cart', function(event){
    if (!$(this).hasClass("active")){
      $(this).addClass("active");
      let productImg = $(this).parents(".product__item").find("img").attr("src"),
          productTitle = $(this).parents(".product__item").find(".product__title").text(),
          productPrice = $(this).parents(".product__item").find(".product__price span").text(),
          productDataId = $(this).parents(".product__item").attr("data-id");

        $("#cartContentList").prepend(generateCartProduct(productImg, productTitle, productPrice, productDataId));
        calcfullpriceSum();
    }
  });




  // Add to Liked
  $(document).on("click", '.product__btnLike', function(event){
    event.preventDefault();
    let productImg = $(this).parents(".product__item").find(".product__preview img").attr("src"),
        productTitle = $(this).parents(".product__item").find(".product__title").text(),
        productPrice = $(this).parents(".product__item").find(".product__price span").text(),
        productDataId = $(this).parents(".product__item").attr("data-id"),
        b = "!=";

    for (let char of cartOrLikedProductsDataIds($("#liked"))) {
      if(char == productDataId){
        b = "==";
      }
    };

    if(b == "!="){
      $(".likeContentList").prepend(generateLikedProduct(productImg, productTitle, productPrice, productDataId));
      calcLikedProductLegth();
    };
  });






  // Cart Product Btns
  //////////////////////////////////////////////////////////
  $(document).on("click", '.subnav-product__quantity--btn', function(){
    let cartProductQuantity = $(this).siblings(".subnav-product__quantity--num"),
        n = Number(cartProductQuantity.text());

    if ($(this).hasClass("subnav-product__btn--plus")){
      n++;
      cartProductQuantity.text(n);
      calcfullpriceSum();
    }

    if ($(this).hasClass("subnav-product__btn--minus")){
      if(Number(cartProductQuantity.text()) > 0){
        n--;
        cartProductQuantity.text(n);
        calcfullpriceSum();
      };
    }
    
  });


  $(document).on("click", '.product__btnDelete', function(event){
      event.preventDefault();

      $(this).parents(".product__item").slideUp(350, function(){
          $(this).detach();
          calcfullpriceSum();
          calcLikedProductLegth();
      });
      let a = $(this).parents(".product__item").attr("data-id");
      $("#liked").find('.liked__product[data-id|="'+a+'"]').find(".liked-product__cart").removeClass("active");
  });





90




  // Slick slider  https://kenwheeler.github.io/slick/#go-get-it
  $('.productPopular__slider').slick({
    arrows: false,
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 4,
    appendDots: $(".productPopular__sliderDots"),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });

  
  $(".header__lang").click(function(){
    $(this).toggleClass("active");
  });

  $("#cart").find(".subnav__btnBuck").click(function(){
    if(doc_w < '769'){
      $(this).parents(".subnav").animate({left: '-100%'}, 300);
      $("#overlay").animate({opacity: '0'}, 400);
      $("#overlay").hide();
      $("body").removeClass('no-scroll');
    }

    
  });
  

  $("#cart").find(".header__acc--cartIcon").click(function(){
    if(doc_w < '769'){
      $(".header__lang").removeClass("active");
      $("body").addClass('no-scroll');
      
      $("#overlay").show(function(){
        $("#overlay").animate({opacity: '0.3'}, 200);
        $("#cart").find(".subnav").animate({left: '0'}, 300);
      });  
    }

  });

  $("#liked").find(".header__acc--likeIcon").click(function(){
    if(doc_w < '769'){
      $(".header__lang").removeClass("active");
      $("body").addClass('no-scroll');
      
      $("#overlay").show(function(){
        $("#overlay").animate({opacity: '0.3'}, 200);
        $("#liked").find(".subnav").animate({left: '0%'}, 300);
      }); 
    }
 
  });

  $("#liked").find(".subnav__btnBuck").click(function(){
    if(doc_w < '769'){
      $(this).parents(".subnav").animate({left: '-100%'}, 300);
      $("#overlay").animate({opacity: '0'}, 400);
      $("#overlay").hide();
      $("body").removeClass('no-scroll');
    }

    
  });



  $("#nav_toggle").click(function(){
    $(".header__lang").removeClass("active");
    $("body").addClass('no-scroll');
    
    $("#overlay").show(function(){
      $(this).animate({opacity: '0.3', zIndex: '1000'}, 400);
      $("#nav__inner").animate({left: '0'}, 500);
    });
    
  });


  $("#overlay").click(function(){
    if(doc_w < '769'){
      $("#nav__inner").animate({left: '-100%'}, 500);
      $(this).animate({opacity: '0'}, 400);
      $(this).hide();
      $("body").removeClass('no-scroll');
    }
    
  });


  if(doc_w < '769'){
    let subBottom = $(".subnav-content__bottom").innerHeight();
    $("#nav__inner").animate({paddingBottom: '" '+ subBottom +' "'});
  }


  $("*").on("click", function(event){
    event.preventDefault();
  });


  

});



