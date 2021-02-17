import React from 'react';
import './App.scss';
import '../node_modules/locomotive-scroll/dist/locomotive-scroll.css'

import anime from 'animejs/lib/anime.es.js';
import { ReactSVG } from 'react-svg'

import LocomotiveScroll from 'locomotive-scroll';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));
console.log(images)

class App extends React.Component {

  constructor(props) {
    super(props);
    //this.dlinesone = React.createRef();
    this.poetry = false;
    this.taken = false;
    this.shape = false;
    this.flower = false;
    this.jewel = false;

  }

  introanim() {
    if (
      this.poetry &&
      this.taken &&
      this.shape &&
      this.flower
    ) {
      this.fadein(this.poetry, 'up', 5, 1000, 0, 'cubicBezier(.45,.01,.48,1.01)')
      this.fadein(this.taken, 'up', 7, 1000, 200)
      this.fadein(this.shape, 'up', 9, 1000, 400)
      this.fadein(this.flower, 'up', 11, 500, 600)
      this.fadein(document.getElementById('jewel'), 'up', 11, 500, 800)
    }
  }

  fadein(elem, direction, distance, duration, delay, easing = "cubicBezier(.28,.01,.57,1)") {
    //make invisible
    elem.style.opacity = "0"

    let config = {
      targets: elem,
      opacity: 1,
      easing: easing,
      duration: duration,
      delay: 2500 + delay
    }
    //offset here 
    if (direction == 'up') {//positive is down
      elem.style.transform = "translateY(" + distance + "px)"
      config.translateY = -distance
    } else if (direction == 'down') {
      elem.style.transform = "translateY(" + -distance + "px)"
      config.translateY = distance
    } else if (direction == 'left') {
      elem.style.transform = "translateX(" + distance + "px)"
      config.translateX = -distance
    } else if (direction = 'right') {//positive is right
      elem.style.transform = "translateX(" + -distance + "px)"
      config.translateX = distance
    }
    console.log(config)

    anime(config)
  }

  render() {

    return (
      <div id="main">


        <div className="intro">

        </div>
        <div id="panel-one">
          <ReactSVG
            data-scroll data-scroll-speed="4"


            ref={this.dlinesone}
            className="dlines one"
            src="panel-one/panel-one-dlines.svg"

            beforeInjection={(svg) => {
              svg.classList.add('svgclass')
            }}
            afterInjection={(error, svg) => {
              console.log(svg)
              //play dline animation
              anime({
                targets: '.dlines.one path',
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: 'easeInOutSine',
                duration: 1500,
                delay: function (el, i) { return i * 250 + 2500 },
                begin: function (anim) {
                  document.querySelector('.dlines.one .svgclass').style.opacity = 1;
                },
              });
              window.scroll.update()
            }}

          />
          <ReactSVG
            data-scroll data-scroll-speed="2"
            className="flower one"
            src="panel-one/plain-owo.svg"
            beforeInjection={(svg) => {
              svg.classList.add('svgclass')
            }}
            afterInjection={(error, svg) => {
              this.flower = svg
              this.introanim()
              window.scroll.update()
            }}
          />

          <div
            data-scroll data-scroll-speed="1"
            className="jewel one" >
            <picture id="jewel" className="svgclass" >
              <source srcSet="panel-one/clean-cropped-min.webp" type="image/webp"></source>
              <img src="panel-one/clean-cropped-min.png"></img>
            </picture>
          </div>

          <ReactSVG
            className="poetry one"
            src="panel-one/POETRY.svg"
            beforeInjection={(svg) => {
              svg.classList.add('svgclass')
            }}
            afterInjection={(error, svg) => {
              this.poetry = svg
              this.introanim()
            }}
          />

          <ReactSVG
            className="taken one"
            src="panel-one/TAKEN.svg"
            beforeInjection={(svg) => {
              svg.classList.add('svgclass')
            }}
            afterInjection={(error, svg) => {
              this.taken = svg
              this.introanim()
            }}
          />
          <ReactSVG
            className="shape one"
            src="panel-one/SHAPE.svg"
            beforeInjection={(svg) => {
              svg.classList.add('svgclass')
            }}
            afterInjection={(error, svg) => {
              this.shape = svg
              this.introanim()
            }}
          />

        </div>

        <div
          data-scroll
          data-scroll-call='two'
          data-scroll-offset='41%'
          id="panel-two">

          <ReactSVG className="dlines two" src="panel-two/dlines-two.svg"

            beforeInjection={(svg) => {
              svg.classList.add('svgclass')
            }}
          />
          <div
            data-scroll-speed='2'
            data-scroll
            className='collection-items two'>
            <div
              style={{
                backgroundImage: 'url(' + images['a1.jpg'] + ')'
              }}
              className='collection-item'>

            </div>
            <div className='collection-item'
              style={{
                backgroundImage: 'url(' + images['a2.jpg'] + ')'
              }}>

            </div>
            <div className='collection-item'
              style={{
                backgroundImage: 'url(' + images['a3.jpg'] + ')'
              }}>

            </div>
            <div className='collection-item'
              style={{
                backgroundImage: 'url(' + images['a4.jpg'] + ')'
              }}>

            </div>
            <div className='collection-item'
              style={{
                backgroundImage: 'url(' + images['a5.jpg'] + ')'
              }}>

            </div>
          </div>
          <ReactSVG
            data-scroll-direction='horizontal'
            data-scroll-speed='3'
            data-scroll

            className="collection two"
            src="panel-two/COLLECTION.svg"
            beforeInjection={(svg) => {
              svg.classList.add('svgclass')
            }}
          />

          <div className='buttonbg two'>
            <div id="owo">

            </div>
          </div>

          <ReactSVG
            onMouseEnter={
              () => {
                try {
                  window.currb2.remove('#owo')
                } catch {

                }
                window.currb2 = anime({
                  targets: '#owo',
                  easing: 'easeInQuad',
                  duration: 150,
                  width: '11.7vw'
                })
              }
            }
            onMouseLeave={
              () => {
                try {
                  window.currb2.remove('#owo')
                } catch {

                }
                //console.log('leave')
                window.currb2 = anime({
                  targets: '#owo',
                  easing: 'easeInQuad',
                  duration: 150,
                  width: '0vw'
                })
              }
            }
            className="viewall two" src="panel-two/view all.svg"
            beforeInjection={(svg) => {
              svg.classList.add('svgclass')
            }}
          />


        </div>
        <div
          data-scroll
          data-scroll-call='three'
          data-scroll-offset='41%'
          id="panel-three">
          <ReactSVG
            className="dlines three"

            src="panel-three/jewel dlines.svg"
            beforeInjection={(svg) => {
              svg.classList.add('svgclass')
            }}
          />
          <ReactSVG

            data-scroll-speed='2'
            data-scroll
            className="rect three"
            src="panel-three/panel3rect.svg"
            beforeInjection={(svg) => {
              svg.classList.add('svgclass')
            }}
          />
          <div
            data-scroll-speed='1'
            data-scroll
            className="portrait three" >
            <picture id="portrait" className="svgclass" >
              <source srcSet="panel-three/portrait-cropped-300kb.jpg" type="image/jpeg"></source>
              <img src="panel-three/portrait-cropped-300kb.jpg"></img>
            </picture>
          </div>
          <ReactSVG
            data-scroll-direction='horizontal'
            data-scroll-speed='3'
            data-scroll
            className="jewelof three"
            src="panel-three/JEWEL OF.svg"
            beforeInjection={(svg) => {
              svg.classList.add('svgclass')
            }}
          />
          <ReactSVG
            data-scroll-direction='horizontal'
            data-scroll-speed='-2'
            data-scroll
            className="laguna three"
            src="panel-three/LAGUNA.svg"
            beforeInjection={(svg) => {
              svg.classList.add('svgclass')
            }}

          />


          <ReactSVG
            className="thestory three"
            src="panel-three/the story button.svg"
            beforeInjection={(svg) => {
              svg.classList.add('svgclass')
            }}

          />

        </div>
        <div
          data-scroll
          data-scroll-call='four'
          data-scroll-offset='71%'
          id="panel-four">
          <ReactSVG
            data-scroll-direction='horizontal'
            data-scroll-speed='3'
            data-scroll
            className="gallery four"
            src="panel-four/GALLERY.svg"
            beforeInjection={(svg) => {
              svg.classList.add('svgclass')
            }}
          />
          <div className='buttonbg four'>
            <div id="uwu">

            </div>
          </div>


          <ReactSVG className="dlines four" src="panel-four/gallery dlines.svg"

            beforeInjection={(svg) => {
              svg.classList.add('svgclass')
            }}
          />
          <ReactSVG
            onMouseEnter={
              () => {
                console.log(1)
                try {
                  window.currb4.remove('#uwu')
                } catch {

                }
                window.currb4 = anime({
                  targets: '#uwu',
                  easing: 'easeInQuad',
                  duration: 150,
                  width: '11.7vw'
                })
              }
            }
            onMouseLeave={
              () => {
                console.log(1)
                try {
                  window.currb4.remove('#uwu')
                } catch {

                }
                //console.log('leave')
                window.currb4 = anime({
                  targets: '#uwu',
                  easing: 'easeInQuad',
                  duration: 150,
                  width: '0vw'
                })
              }
            }
            className="viewall four"
            src="panel-four/view all.svg"
            beforeInjection={(svg) => {
              svg.classList.add('svgclass')
            }}
          />
          <div className='gallery-item'>

            <div
              style={{
                backgroundImage: 'url(' + images['b1.jpg'] + ')'
              }}
              className='a1'>

            </div>
            <div className='a2 '
              style={{
                backgroundImage: 'url(' + images['b2.jpg'] + ')'
              }}>

            </div>
            <div className=' a3 '
              style={{
                backgroundImage: 'url(' + images['b3.jpg'] + ')'
              }}>

            </div>
            <div className='a4'
              style={{
                backgroundImage: 'url(' + images['b4.jpg'] + ')'
              }}>

            </div>
            <div className='a5'
              style={{
                backgroundImage: 'url(' + images['b5.jpg'] + ')'
              }}>

            </div>
            <div className='a6'
              style={{
                backgroundImage: 'url(' + images['b6.jpg'] + ')'
              }}>

            </div>
          </div>

        </div>
        <div id="panel-five">

          <ReactSVG
            className="five stayintouch" src="panel-five/stayintouch.svg"
            beforeInjection={(svg) => {
              svg.classList.add('svgclass')
            }}
          />
          <ReactSVG
            className="five panel" src="panel-five/panel4dir.svg"
            beforeInjection={(svg) => {
              svg.classList.add('svgclass')
            }}
          />
          <ReactSVG
            className="five flower" src="panel-five/flower.svg"
            beforeInjection={(svg) => {
              svg.classList.add('svgclass')
            }}
          />

        </div>


      </div >

    );
  }

  componentDidMount() {

  }

}



export default App;
