"use strict"

function buildGallery(options) {
    var sel = options.key;
    var gallery = options.gallerycontainer
    var info_box = options.infocontainer;
    var item_class = options.itemclass;
    var data = portfolio[sel];

    //reset
    gallery.innerHTML = '';
    info_box.innerHTML = '';

    gallery.setAttribute('data-current', sel);

    //build info box
    var title = document.createElement('h3');
    title.appendChild(document.createTextNode(data.title));
    info_box.appendChild(title);

    var desc = document.createElement('p');
    desc.appendChild(document.createTextNode(data.description));
    info_box.appendChild(desc);

    var rm_wrap = document.createElement('div');
    var rma     = document.createElement('a');
    
    rm_wrap.className = 'read-more-wrapper';
    rma.className = 'read-more';
    rma.appendChild(document.createTextNode('Read more...'));
    rma.setAttribute('href', '#');
    rm_wrap.appendChild(rma);
    info_box.appendChild(rm_wrap);
    
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
        gallery.appendChild(g_item);        
    });
};

function pfMenuSwitcher () {
    var sel        = this.getAttribute('data-reference');
    console.log(sel);
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
}

//workaround for header getting unstuck at contact section.
//occurs when page is refreshed whilst header has stuck class.
window.onbeforeunload = function(){
    window.scrollTo(0,0);
}
$(function () {
    "use strict"
    
    var pf_data          = portfolio;
    var logo_wrapper     = document.getElementsByClassName('top-logo-wrapper'); 
    var logo             = document.getElementsByClassName('logo')[0];
    var header           = document.getElementsByClassName('main-header')[0];
    var slides           = $('#slides');
    var nav_container    = document.getElementsByClassName('nav-wrapper'); //$('.nav-wrapper');
    var header_scroll    = false;
    
    var pf_trigger       = document.getElementsByClassName('pf-menu-trigger')[0]//$('.pf-menu-trigger');
    var pf_menu          = document.getElementsByClassName('pf-menu-wrapper')[0];//$('.pf-menu-wrapper');
    var pf_item          = document.getElementsByClassName('pf-item-link');//$('.pf-item-link');
    var gallery_container= document.getElementById('gallery-container');//$('.gallery-container');
    var gallery_info     = document.getElementById('pf-info');//$('.pf-info');
    var def_gallery_item = 'uc';
    var item_class       = 'gallery-item';
    
    var device_width     = document.getElementsByTagName('html').width;
    var dev_flag         = false;
    
    var main_nav         = $('.menu ul');
    var main_nav_item    = $('.menu li');
    
    logo.className+=' sprite-inv_logo';
    device_width <= 568 && device_width >= 320? dev_flag = true : '';
    
//    console.log(logo);
//    console.log('logoClassName: '+logo.className);
//    
//    console.log('deviceflag: '+dev_flag);
//    console.log('headerscroll: '+header_scroll);
//    
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
    
    
    var feed = new Instafeed({
        get: 'user',
        userId: 1467394148,
        clientId: '865d05560f40439688919615536bf9fe',
        accessToken: '297900451.865d055.a478c7e22d6f4bd5ab44f67c4230d5df',
        limit: 5,
        template: '<a href="{{link}}" target="_blank"><img src="{{image}}"/></a>'
    });
    
    feed.run();
    
    //events
    
    pf_trigger.onclick = function () {
        if(!pf_trigger.className.match(/\bactive\b/)) {
           pf_trigger.className+=' active';
           pf_menu.className+=' active';
        }
       else {
           pf_trigger.className = pf_trigger.className.replace(/\bactive\b/,'');
           pf_menu.className = pf_menu.className.replace(/\bactive\b/,'');
        }    
    };
    
    var logo_stick = new Waypoint.Sticky({
        element: logo_wrapper
    });    
    
    var header_wp = new Waypoint({
        element: header,
        handler: function () {
            if(!header_scroll) {
                header.className+=' stuck';
                //console.log('stuck');
                logo.className = logo.className.replace(/\bsprite-inv_logo\b/,'');
                logo.className+=' sprite-reg_logo';
                header_scroll = true;
                slides.superslides('stop');
  
            }
            else {
                //console.log('unstuck');
                header.className = header.className.replace(/\bstuck\b/,'');
                logo.className = logo.className.replace(/\bsprite-reg_logo\b/,'');
                logo.className+=' sprite-inv_logo';
                slides.superslides('start');
                header_scroll = false;
                main_nav.removeClass('menu-show')
            }
            
        },
        offset: '0'
    });
    
    for(var i = 0; i < pf_item.length; i++) {
        pf_item[i].onclick = function () {
            var sel        = this.getAttribute('data-reference');
            console.log(sel);
            if(gallery_container.getAttribute('data-current') != sel ) {
                buildGallery({
                    key: sel,
                    gallerycontainer: gallery_container,
                    infocontainer: gallery_info,
                    itemclass : item_class
                });

                $("img.lazy").lazyload({
                    effect : "fadeIn"
                });
                //reset menu trigger appearance
                pf_trigger.className = pf_trigger.className.replace(/\bactive\b/,'');
                pf_menu.className = pf_menu.className.replace(/\bactive\b/,'');
            }
        }
    }
    
    logo.onclick = function () {
        var showclass = 'menu-show';
        var scroll = $('body').scrollTop();
        if(scroll > 0 ) {
            main_nav.hasClass(showclass)? main_nav.removeClass(showclass) :main_nav.addClass(showclass);
        }

    } ;
 
    main_nav_item.click(function () {
        var showclass = 'menu-show';
        main_nav.hasClass(showclass)? main_nav.removeClass(showclass) :main_nav.addClass(showclass);
    });
    
});