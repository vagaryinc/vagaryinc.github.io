"use strict"

function buildGallery(options) {
    var sel = options.key;
    var gallery = options.gallerycontainer
    var info_box = options.infocontainer;
    var item_class = options.itemclass;
    var data = portfolio[sel];

    //reset
    gallery.html('');
    info_box.html('');

    gallery.attr('data-current', sel);

    //build info box
    var title = document.createElement('h3');
    title.appendChild(document.createTextNode(data.title));
    info_box.append(title);

    var desc = document.createElement('p');
    desc.appendChild(document.createTextNode(data.description));
    info_box.append(desc);

    var rm_wrap = document.createElement('div');
    var rma     = document.createElement('a');
    
    rm_wrap.className = 'read-more-wrapper';
    rma.className = 'read-more';
    rma.appendChild(document.createTextNode('Read more...'));
    rma.setAttribute('href', '#');
    rm_wrap.appendChild(rma);
    info_box.append(rm_wrap);
    
    $.each(data.photos, function(key, val) {
        var g_item = document.createElement('div');
        var a      = document.createElement('a');
        var img    = new Image();

        g_item.className = item_class;
        a.setAttribute('data-lightbox', sel);
        a.setAttribute('href', data.photoroot+val.hsrc);
        img.className = 'lazy';
        img.setAttribute('data-original', data.photoroot+val.src);

        a.appendChild(img);
        g_item.appendChild(a);
        gallery.append(g_item);        
    });
};


$(function () {
    "use strict"

    var pf_data          = portfolio;
    var logo_wrapper     = $('.top-logo-wrapper');
    var logo             = $('.logo');
    var header           = $('.main-header');
    var slides           = $('#slides');
    var nav_container    = $('.nav-wrapper');
    var header_scroll    = false;
    
    var pf_trigger       = $('.pf-menu-trigger');
    var pf_menu          = $('.pf-menu-wrapper');
    var pf_item          = $('.pf-item-link');
    var gallery_container= $('.gallery-container');
    var gallery_info     = $('.pf-info');
    var def_gallery_item = 'uc';
    var item_class       = 'gallery-item';
    
    var device_width     = $('html').width();
    var dev_flag         = false;
    
    var logo             = $('.logo');
    var main_nav         = $('.menu ul');
    var main_nav_item         = $('.menu ul li');
    
    logo.addClass('sprite-inv_logo');

 
    
    if ($('body').scrollTop() > 0) {
        header.addClass('stuck');    
    }
    else {
        header.removeClass('stuck');
    }
    
    device_width <= 568 && device_width >= 320? dev_flag = true : '';
    console.log(dev_flag);
    
    slides.superslides({
        play: 3000,
        pagination: false,
        animation: "fade"
    });
    
    buildGallery({
        key: def_gallery_item,
        gallerycontainer: gallery_container,
        infocontainer: gallery_info,
        itemclass : item_class
    });
    
    $("img.lazy").lazyload({
        effect : "fadeIn"
    });
    
    $('.main-header a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 50
        }, 700, 'swing');
    });
    
    pf_trigger.click(function () {
        if(!pf_trigger.hasClass('active')) {
           pf_trigger.addClass('active');
           pf_menu.addClass('active');
        }
       else {
           pf_trigger.removeClass('active');
           pf_menu.removeClass('active');
        }
           
        
    });
    var logo_stick = new Waypoint.Sticky({
        element: logo_wrapper
    });    
    
    var header_wp = new Waypoint({
        element: header,
        handler: function () {
            if(!header_scroll) {
                header.addClass('stuck');
                console.log('stuck');
                logo.removeClass('sprite-inv_logo');
                logo.addClass('sprite-reg_logo');
                header_scroll = true;
                slides.superslides('stop');
                
                
            }
            else {
                console.log('unstuck');
                header.removeClass('stuck');
                logo.removeClass('sprite-reg_logo');
                logo.addClass('sprite-inv_logo');
                slides.superslides('start');
                header_scroll = false;
                main_nav.removeClass('menu-show')

            }
            
        }
    });
    
    pf_item.click(function () {
        var sel        = $(this).attr('data-reference');
        if(gallery_container.attr('data-current') != sel ) {
            buildGallery({
                key: sel,
                gallerycontainer: gallery_container,
                infocontainer: gallery_info,
                itemclass : item_class
            });
            
            $("img.lazy").lazyload({
                effect : "fadeIn"
            });
        }

    });
    
    logo.click(function () {
        var showclass = 'menu-show';
        var scroll = $('body').scrollTop();
        
        if(scroll > 0 ) {
            main_nav.hasClass(showclass)? main_nav.removeClass(showclass) :main_nav.addClass(showclass);
        }

    });
 
    main_nav_item.click(function () {
        var showclass = 'menu-show';
        main_nav.hasClass(showclass)? main_nav.removeClass(showclass) :main_nav.addClass(showclass);
    });
    
});