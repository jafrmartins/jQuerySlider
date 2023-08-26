import BreakPoint from './BreakPoint.js';
import Orientation from './Orientation.js';

const cssVars = getComputedStyle(document.body);

const numItems = {
    xs:  {
        landscape: JSON.parse(cssVars.getPropertyValue('--xs-landscape-num-items')),
        portrait: JSON.parse(cssVars.getPropertyValue('--xs-portrait-num-items')),
    },
    sm:  {
        landscape: JSON.parse(cssVars.getPropertyValue('--sm-landscape-num-items')),
        portrait: JSON.parse(cssVars.getPropertyValue('--sm-portrait-num-items')),
    },
    md:  {
        landscape: JSON.parse(cssVars.getPropertyValue('--md-landscape-num-items')),
        portrait: JSON.parse(cssVars.getPropertyValue('--md-portrait-num-items')),
    },
    lg:  {
        landscape: JSON.parse(cssVars.getPropertyValue('--lg-landscape-num-items')),
        portrait: JSON.parse(cssVars.getPropertyValue('--lg-portrait-num-items')),
    },
    xl:  {
        landscape: JSON.parse(cssVars.getPropertyValue('--xl-landscape-num-items')),
        portrait: JSON.parse(cssVars.getPropertyValue('--xl-portrait-num-items')),
    },
    xxl: {
        landscape:  JSON.parse(cssVars.getPropertyValue('--xxl-landscape-num-items')),
        portrait:  JSON.parse(cssVars.getPropertyValue('--xxl-portrait-num-items')),
    }
}

let defaultOptions = {
    autoplay: false,
    autoplayDelay: 3000,
    activeIndex: 0,
    pagination: true,
    numItems: numItems,
    orientation: Orientation(),
    breakpoint: BreakPoint(),
};

export class Slider {

    options = null;
    active = null;
    $el = null;
    slides = [];
    pagination = null;
    scroll = null;
    interval = null;
    timeout = null;
    $track = null;
    scrollStep = null;
    
    constructor($el, options=defaultOptions) {

        this.$el = $el;
        this.$track = $el.find('.slides-track');
        this.options = options;
        
        if(!options.uuid) {
            throw new Error("invalid slider uuid");
        }

        $el.attr('data-uuid', options.uuid);
        
        const self = this;
        
        this.initScroll();
        this.initSlides();
        
        this.active = this.options.activeIndex || 0;

        if(options.pagination) {
            
            let $pagel = $el.find(`.pagination`);

            if(!$pagel.length) {
                throw new Error("missing pagination markup");
            }

            self.pagination = new Pagination(self, $pagel, self.slides.length, options);
        
        }

        if(options.autoplay) {
            self.interval = setInterval(() => {
                self.pagination.$next.trigger('click');
            }, options.autoplayDelay || 3000);
        }

    }

    initSlides() {
        
        let self = this;
        let $slides = self.$el.find('.slide');

        //let scrollStep = this.scroll.type == 'vertical' ?
        //    this.$el.find('.slide').innerHeight() : this.$el.find('.slide').outerWidth();
        
        let scrollStep = this.$el.find('.slide')[0].getBoundingClientRect().height;


        let scrollOffset = 0;
        this.scrollStep = scrollStep;

        let c = 0;

        $slides.map((i, slide) => {
            
            if(i >= self.scroll.items-1 && i > 0) { 
                if((i%self.scroll.items) == 0) {
                    c += 1;
                }
            }

            scrollOffset = scrollStep * c * self.scroll.items;

            let active = (!i) ? true : false;
            if(active) { self.active = i; }
            if(self.slides.length < $slides.length) {
                self.slides.push(new Slide($(slide), i, scrollOffset, active));
            } else {
                $(slide).attr('data-offset', `${scrollOffset}`);
            };

            //scrollOffset += scrollStep;

        });
    }

    initScroll() {

        let $el = this.$el;
        let options = this.options;

        let scroll = {
            type: null,
            length: null,
            items: null,
        };

        switch(options.breakpoint.breakpoint) {
            case 'xs':
                switch(options.orientation) {
                    case 'landscape': 
                        scroll = {
                            type: 'vertical',
                            length: $el.outerWidth(),
                            items: numItems[options.breakpoint.breakpoint][options.orientation],
                        }; break;

                    case 'portrait':

                        scroll = {
                            type: 'vertical',
                            length: $el.outerHeight(),
                            items: numItems[options.breakpoint.breakpoint][options.orientation],
                        }; break;

                    default:
                        throw new Error(`invalid orientation ${options.orientation}`);
                }
                break;
            case 'sm':
                switch(options.orientation) {
                    case 'landscape': 
                        scroll = {
                            type: 'vertical',
                            length: $el.innerHeight(),
                            items: numItems[options.breakpoint.breakpoint][options.orientation],
                        }; break;

                    case 'portrait':
                        scroll = {
                            type: 'vertical',
                            length: $el.innerWidth(),
                            items: numItems[options.breakpoint.breakpoint][options.orientation],
                        }; break;

                    default:
                        throw new Error(`invalid orientation ${options.orientation}`);
                }
                break;
            case 'md':
                switch(options.orientation) {
                    case 'landscape': 
                        scroll = {
                            type: 'vertical',
                            length: $el.innerHeight(),
                            items: numItems[options.breakpoint.breakpoint][options.orientation],
                        }; break;

                    case 'portrait':
                        scroll = {
                            type: 'vertical',
                            length: $el.innerWidth(),
                            items: numItems[options.breakpoint.breakpoint][options.orientation],
                        }; break;

                    default:
                        throw new Error(`invalid orientation ${options.orientation}`);
                }
                break;
            case 'lg':
                switch(options.orientation) {
                    case 'landscape': 
                        scroll = {
                            type: 'vertical',
                            length: $el.innerWidth(),
                            items: numItems[options.breakpoint.breakpoint][options.orientation],
                        }; break;

                    case 'portrait':
                        scroll = {
                            type: 'vertical',
                            length: $el.innerHeight(),
                            items: numItems[options.breakpoint.breakpoint][options.orientation],
                        }; break;

                    default:
                        throw new Error(`invalid orientation ${options.orientation}`);
                }
                break;
            case 'xl':
                switch(options.orientation) {
                    case 'landscape': 
                        scroll = {
                            type: 'vertical',
                            length: $el.innerWidth(),
                            items: numItems[options.breakpoint.breakpoint][options.orientation],
                        }; break;

                    case 'portrait':
                        scroll = {
                            type: 'vertical',
                            length: $el.innerHeight(),
                            items: numItems[options.breakpoint.breakpoint][options.orientation],
                        }; break;

                    default:
                        throw new Error(`invalid orientation ${options.orientation}`);
                }
                break;
            case 'xxl':
                switch(options.orientation) {

                    case 'landscape': 
                        scroll = {
                            type: 'vertical',
                            length: $el.innerWidth(),
                            items: numItems[options.breakpoint.breakpoint][options.orientation],
                        }; break;

                    case 'portrait':
                        scroll = {
                            type: 'vertical',
                            length: $el.innerHeight(),
                            items: numItems[options.breakpoint.breakpoint][options.orientation],
                        }; break;

                    default:
                        throw new Error(`invalid orientation ${options.orientation}`);

                }
                break;
            default:
                throw new `invalid breakpont ${options.breakpoint.breakpoint}`;
            
        }

        this.scroll = scroll;

    }

}

export class Slide {

    $el = null;

    constructor($el, i, offset, active) {
        this.$el = $el;
        if(active) { $el.addClass('active'); }
        $el.attr('data-index', `${i}`);
        $el.attr('data-offset', `${offset}`);
    }

}

export class Pagination {

    slider = null;
    
    $el = null;
    $prev = null;
    $next = null;
    $dots = [];

    waypoints = [];
    
    constructor(slider, $el, totalSlides, options=defaultOptions) {

        this.$el = $el;
        this.slider = slider;
        this.initPagination(options, totalSlides);


    }

    initPagination() {

        let options = this.slider.options;
        let totalSlides = this.slider.slides.length;
        let slider = this.slider;
        let r = totalSlides % slider.scroll.items == 0 ? 0 : slider.scroll.items == 1 ? 0 : 1;
        
        let paginationItems = Math.floor(totalSlides / slider.scroll.items) + r;

        
        this.$el.empty()
        let $el = this.$el;
        this.$dots = [];

        let $prev = this.slider.$el.find('.prev');
        if(!$prev.length) {
            $prev = $('<button>');
            $prev.addClass('prev');
            $prev.html('&lt;');
            $el.append($prev);
        }

        this.$prev = $prev;

        for (let index = 0; index < paginationItems; index++) {
            let $dot = $('<span>');
            $dot.addClass('dot');

            let r = index * slider.scroll.items;
            $dot.attr('data-index', r);
            if(index == slider.active) { $dot.addClass('active'); }
            $el.append($dot);
            this.$dots.push($dot);
        }

        let $next = this.slider.$el.find('.next');
        if(!$next.length) {
            $next = $('<button>');
            $next.addClass('next');
            $next.html('&gt;');
            $el.append($next);
        }

        this.$next = $next;
        
        this.registerEventListeners(options);
    }

    debounceInterval(options, $el) {
        const self = this;
        clearInterval(self.slider.interval);
        clearTimeout(self.slider.timeout);
        self.slider.timeout = setTimeout(() => {
            if(!self.interval && self.slider.options.autoplay) {
                self.slider.interval = setInterval(() => {
                    $el.trigger('click');
                }, options.autoplayDelay || 3000);
            }
        }, options.autoplayDelay || 3000);
    }

    registerEventListeners(options) {

        const self = this;

        self.slider.$track.unbind("scroll");
        self.$next.unbind("click");
        self.$prev.unbind("click");
        self.slider.$el.find('.dot').unbind("click");

        //self.debounceInterval(options, self.$next);

        self.slider.$track.on("scroll", (e) => {

            let currentOffset = $(e.target).scrollTop();
            
            let $_dot = null;

            self.slider.slides.map((slide, i) => {
                let slideOffset = parseFloat(slide.$el.attr('data-offset'));
                let slideIndex = parseInt(slide.$el.attr('data-index'));

                //console.log("o", currentOffset, "s", slideOffset)
                if(slideOffset <= currentOffset || self.slider.active >= slideIndex) {
                    for (const $dot of self.$dots) {
                        let paginationIndex = parseInt($dot.attr('data-index'));
                        if(slideIndex >= paginationIndex) {
                            $_dot = $dot;
                        }
                    }
                    //self.slider.active = parseInt($_dot.attr('data-index'));
                    //console.log(self.slider.active)
                }
            });

            self.$el.find('.dot.active').removeClass('active');
            $_dot.addClass('active');
            

        });

        self.$next.on('click', (e) => {

            let $active = self.slider.slides[self.slider.active].$el;
            $active.removeClass('active');
            
            if(self.slider.active >= ((self.slider.slides.length-1)-self.slider.scroll.items)) {
                if(self.slider.slides.length%self.slider.scroll.items == 0 && self.slider.scroll.items != 1) {
                    self.slider.active = 0;    
                } else {
                    self.slider.active = self.slider.slides.length-1;
                }
            } else {
                self.slider.active += self.slider.scroll.items;
            }

            let $next = self.slider.slides[self.slider.active].$el;
            $next.addClass('active');

            self.slider.$track.animate({
                scrollTop: $next.attr('data-offset')
            });

        });
        
        self.$prev.on('click', (e) => {

            //self.debounceInterval(options, self.$prev);
            if(self.slider.active < 0) { this.slider.active = 0; }
            if(self.slider.active > this.slider.slides.length-1) { this.slider.active = this.slider.slides.length-1; } 
            
            let $active = self.slider.slides[self.slider.active].$el;
            $active.removeClass('active');
            
            if(self.slider.active >= self.slider.scroll.items) {
                self.slider.active -= self.slider.scroll.items;
            } else if(self.slider.active > 0) {
                self.slider.active = 0;
            } else {
                self.slider.active = self.slider.slides.length-1;
            }
            
            
            let $prev = self.slider.slides[self.slider.active].$el;
            $prev.addClass('active');
            
            self.slider.$el.find('.slides-track').animate({
                scrollTop: $prev.attr('data-offset')
            });

        });

        self.slider.$el.find('.dot').on("click", (e) => {

            let $el = $(e.target).closest('.dot');

            //self.debounceInterval(options, $el);

            self.slider.$el.find('.dot.active').removeClass('active');
            self.slider.active = parseInt($el.attr('data-index'));
            $(e.target).closest('.dot').addClass('active');

            self.slider.$el.find('.slides-track').animate({
                scrollTop: parseFloat(self.slider.slides[self.slider.active].$el.attr('data-offset')),
            });
            
        });

    }

}

export default class SliderFactory {

    static sliders = [];

    static uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    static initializeSlider(selector=undefined, options=defaultOptions) {

        options = {...defaultOptions, ...options};

        let $els;

        if(!selector) {
            
            throw new Error(`Invalid selector ${selector}`);

        } else {

            $els = $(selector);

            if(!$els.length) {

                throw new Error(`Invalid selector ${selector}`);

            }

            let sliders = [];
            if($els.length == 1) {

                let $el = $els
                let opts = {...options, uuid: SliderFactory.uuidv4() };
                let slider = new Slider($el, opts);
                SliderFactory.sliders.push(slider);

            } else {

                $els.forEach(el => {
                    let $el = $(el)
                    let opts = {...options, uuid: SliderFactory.uuidv4() };
                    let slider = new Slider($el, opts);
                    SliderFactory.sliders.push(slider);
                });

            }

            return SliderFactory.sliders.length == 1 ? 
                SliderFactory.sliders[0] : SliderFactory.sliders;

        }


    }

    static onOrientationChange() {

        const self = this;
        
        self.sliders.map((slider, i) => {

            slider.options.orientation = Orientation();
            slider.options.breakpoint = BreakPoint();
            slider.active = slider.options.autoplay ? -1 : 0;
            slider.$el.find('.slide.active').removeClass('active');
            slider.slides[0].$el.addClass('active');
            slider.$track.animate({
                scrollTop: 0
            });
            
            slider.initScroll();
            slider.pagination.initPagination();

            setTimeout(() => {
                if(slider.options.autoplay) {
                    clearInterval(slider.interval);
                    slider.pagination.debounceInterval(slider.options, slider.pagination.$next);
                }
                slider.initSlides();
            }, 100);
            

        });
    }

}