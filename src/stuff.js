import React from 'react';
//import ReactDOM from 'react-dom';

import './stuff.scss';

import anime from 'animejs/lib/anime.es.js';
import { ReactSVG } from 'react-svg'
import LocomotiveScroll from 'locomotive-scroll';


class item {

    constructor(selem, states, istitle = false) {
        window.scroll = new LocomotiveScroll({
            el: document.querySelector("#main"),
            smooth: true,
            direction: 'vertical',
            lerp: 0.07

        });
        this.settings = {
            started: false,
            finished: false
        }

        let elem = selem;
        this.states = states;
        this.curr = states.init
        //force set item to initstate
        elem.style.left = 'calc(-50% + ' + Number(states.init.x) + 'vw)'
        elem.style.top = 'calc(-50% + ' + Number(states.init.y) + 'vw)'
        elem.style.opacity = states.init.opacity

        //need a local variable to be used in animation
        var targetdata = {
            x: states.init.x,
            y: states.init.y,
            width: states.init.width,
            opacity: states.init.opacity,
            wap: 1
        }

        //create anime to first scene
        var first = anime.timeline({
            targets: targetdata,
            easing: 'cubicBezier(.43,.94,.49,.99)',
            duration: 2000,
            update: function (anim) {
                elem.style.left = 'calc(-50% + ' + Number(targetdata.x) + 'vw)'
                elem.style.top = 'calc(-50% + ' + Number(targetdata.y) + 'vw)'
                if (elem.querySelector('.svgclass')) {
                    elem.querySelector('.svgclass').style.width = Number(targetdata.width) + 'vw'
                }
                elem.style.opacity = targetdata.opacity
                //console.log('rgba( 255,250,245,' + targetdata.wap + ')')
                document.getElementById('fixed-items').style.background = 'rgba( 255,250,245,' + targetdata.wap + ')'
            },
            loopComplete: function (anim) {
                anim.settings.finished = true;
            },

        }).add({
            x: this.states['one'].x,
            y: this.states['one'].y,
            width: this.states['one'].width,
            wap: 0,
        }).add({//opacity has different easing than other proeprties
            easing: 'cubicBezier(.63,0,.57,1)',
            opacity: this.states['one'].opacity
        }, 0).add({//goto scene two which is the big state
            duration: 750,
            //easing: 'spring(1, 80, 10, 0)',
            x: this.states['two'].x,
            y: this.states['two'].y,
            width: this.states['two'].width,
            opacity: this.states['two'].opacity,
            loopComplete: function (anim) {
                document.getElementById('fixed-items').style.pointerEvents = 'none'

            }
        })// need to add the other buttons
        first.settings = this.settings


        //anime for big / small states// need this to animate back and forth easily
        let targetdata2 = {
            x: this.states['two'].x,
            y: this.states['two'].y,
            width: this.states['two'].width
        }
        this.owo = anime({
            targets: targetdata2,
            x: this.states['three'].x,
            y: this.states['three'].y,
            width: this.states['three'].width,
            easing: 'cubicBezier(.28,.01,.57,1)',
            //direction: 'alternate',
            autoplay: false,
            duration: 500,
            update: function (anim) {
                elem.style.left = 'calc(-50% + ' + Number(targetdata2.x) + 'vw)'
                elem.style.top = 'calc(-50% + ' + Number(targetdata2.y) + 'vw)'
                if (elem.querySelector('.svgclass')) {
                    elem.querySelector('.svgclass').style.width = Number(targetdata2.width) + 'vw'
                }
            }
        })




    }

    switch() {

        if (!this.settings.finished) {
            this.owo.reverse();
            return;
        }
        if (!this.settings.started) {
            this.settings.started = true;
            this.owo.play()
            return;
        }
        this.owo.pause();
        this.owo.reverse();
        this.owo.play();
    }

}
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.homeref = React.createRef();
        this.shopref = React.createRef();
        this.veniroeref = React.createRef();
        this.storyref = React.createRef();
        this.galleryref = React.createRef();
    }
    componentDidMount() {
        let items = {
            top: true,
            home: new item(this.homeref.current.container.childNodes[0],
                {
                    'init': { width: 4.844, x: 10, y: 5.375, opacity: 0 },
                    'one': { width: 4.844, x: 10, y: 5.375, opacity: 0 },
                    'two': { width: 4.844, x: 10, y: 4.375, opacity: 1 },
                    'three': { width: 3.2292, x: 10, y: 4.7656 }
                }),
            shop: new item(this.shopref.current.container.childNodes[0],
                {
                    'init': { width: 4.844, x: 27, y: 5.375, opacity: 0 },
                    'one': { width: 4.115, x: 24, y: 9.906, opacity: 0 },
                    'two': { width: 4.115, x: 24, y: 8.906, opacity: 1 },
                    'three': { width: 2.7604, x: 27, y: 4.7656 }
                }, true),
            veniroe: new item(this.veniroeref.current.container.childNodes[0],
                {
                    'init': { width: 65, x: 50, y: 25, opacity: 0 },
                    'one': { width: 58.333, x: 50, y: 25, opacity: 1 },
                    'two': { width: 34.896, x: 50, y: 14.271 },
                    'three': { width: 12.0833, x: 50, y: 4.7656 }
                }),
            story: new item(this.storyref.current.container.childNodes[0],
                {
                    'init': { width: 4.844, x: 73, y: 5.375, opacity: 0 },
                    'one': { width: 4.844, x: 76, y: 9.906, opacity: 0 },
                    'two': { width: 4.844, x: 76, y: 8.906, opacity: 1 },
                    'three': { width: 3.2292, x: 73, y: 4.7656 }
                }),
            gallery: new item(this.galleryref.current.container.childNodes[0],
                {
                    'init': { width: 4.844, x: 90, y: 5.375, opacity: 0 },
                    'one': { width: 6.25, x: 90, y: 5.375, opacity: 0 },
                    'two': { width: 6.25, x: 90, y: 4.375, opacity: 1 },
                    'three': { width: 4.1667, x: 90, y: 4.7656 }
                }),
            test: function () { console.log('test', this) }
        }

        /* 
        */



        window.scroll.on("call", (e) => {
            let elemname = '.dlines.' + e + ' path'
            console.log('.dlines.' + e + ' path')
            anime({
                targets: elemname,
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: 'easeInOutSine',
                duration: 1500,
                opacity: 1,
                delay: function (el, i) { return i * 250 },
                begin: function (anim) {
                    document.querySelector(elemname).style.opacity = 1;
                },
            });

        });

        items.test()
        this.stickyelems = document.getElementsByClassName('custom-sticky')
        window.scroll.on("scroll", (e) => {
            //update sticky stuff

            let ypos = e.scroll.y

            if (ypos < 100) {
                if (!items.top) {
                    //console.log('make bigger')
                    items.top = true;
                    items.veniroe.switch()
                    items.home.switch()
                    items.story.switch()
                    items.gallery.switch()
                    items.shop.switch()
                }

            } else {
                if (items.top) {
                    //console.log('make smaller')
                    items.top = false;
                    items.veniroe.switch()
                    items.home.switch()
                    items.story.switch()
                    items.gallery.switch()
                    items.shop.switch()
                }

            }
            window.atbotprev = window.atbot;
            window.atbot = false;

            if (ypos > window.innerWidth * 2.7) {
                //make top bar change color
                window.atbot = true;
            }
            if (window.atbot && !window.atbotprev) {
                document.querySelectorAll('.item path').forEach((el) => {
                    el.style.fill = '#F4C095'
                })
            } else if (!window.atbot && window.atbotprev) {
                document.querySelectorAll('.item path').forEach((el) => {
                    el.style.fill = 'black'
                })
            }

        });

    }
    componentWillUnmount() {
        // /window.scroll.destroy()
    }
    render() {
        return (
            <div className="navbar">

                <ReactSVG ref={this.homeref}
                    className="item home" src="navbar/home.svg"
                    beforeInjection={(svg) => {
                        svg.classList.add("svgclass")
                    }}
                />

                <ReactSVG ref={this.shopref}
                    className="item  shop" src="navbar/shop.svg"
                    beforeInjection={(svg) => {
                        svg.classList.add('svgclass')
                    }}
                />


                <ReactSVG ref={this.veniroeref}
                    className="item veniroe" src="navbar/NOMINA.svg"
                    beforeInjection={(svg) => {
                        svg.classList.add('svgclass')
                    }}
                />

                <ReactSVG ref={this.storyref} className="item story" src="navbar/story.svg"
                    beforeInjection={(svg) => {
                        svg.classList.add('svgclass')
                    }}
                />


                <ReactSVG ref={this.galleryref} className="item gallery" src="navbar/gallery.svg"
                    beforeInjection={(svg) => {
                        svg.classList.add('svgclass')
                    }}
                />

            </div>

        )
    }

}
class Itemtext extends React.Component {



    updatehover(bool) {
        if (bool) {
            console.log(this)
        }
    }

    componentDidMount() {

        //console.log(this.props.children)
        this.name = this.props.children
    }
    render() {
        return (

            <span
                onMouseEnter={() => { this.updatehover(true) }}
                onMouseLeave={() => { this.updatehover(false) }}
                className="item-text">
                {this.props.children}
            </span>
        )
    }

}

class Filler extends React.Component {

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    render() {
        return (
            <div style={{ background: this.getRandomColor() }} className="filler">

            </div>

        )
    }
}


export { Navbar, Filler, Itemtext }