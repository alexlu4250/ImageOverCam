import { useEffect, useRef } from 'react'

import '../styles/globals.css'
import Image from 'next/image'

const maxVideoWidth = 800
const maxVideoHeight = 600

export default function Page() {
  const videoElement = useRef(null)
  
  /**
   * In the useEffect hook what we are going to do is load the video
   * element so that it plays what you see on the camera. This way
   * it's like a viewer of what the camera sees and then at any
   * time we can capture a frame to take a picture.
   */
  useEffect(() => {
    async function setupCamera() {
      videoElement.current.width = maxVideoWidth
      videoElement.current.height = maxVideoHeight

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: 'environment',
            width: maxVideoWidth,
            height: maxVideoHeight,
          },
        })
        videoElement.current.srcObject = stream

        return new Promise(resolve => {
          videoElement.current.onloadedmetadata = () => {
            resolve(videoElement.current)
          }
        })
      }
      const errorMessage =
        'This browser does not support video capture, or this device does not have a camera'
      alert(errorMessage)
      return Promise.reject(errorMessage)
    }

    async function load() {
      const videoLoaded = await setupCamera()
      videoLoaded.play()
      return videoLoaded
    }

    async function fadeInOut(element) {
      var opacity = 1;
      var delta = -0.02;
      function changeOpacity () {
        opacity += delta;
        if (opacity <= 0 || opacity >= 1) {
          delta = -delta;
        }
        element.style.opacity = opacity;
        requestAnimationFrame(changeOpacity);
      }
      changeOpacity();
    }

    // async function moveBall() {
    //   let start = Date.now();
    //   let image = document.querySelector(".image")
    //   // timestamp: time elapsed in milliseconds since the web page was loaded
    //   let timer = requestAnimationFrame(function animateBall(timestamp) {
    //       let interval = Date.now() - start;
    //       image.style.opacity' = interval / 3 + 'px'; // move element down
    //       if (interval < 1000) requestAnimationFrame(animateBall); // queue request for next frame
    //   });
    // }

    const image = document.querySelector(".image")
    fadeInOut(image)
    load()
  }, [])

  /**
   * What we're going to render is:
   *
   * 1. A video component for the user to see what he sees on the camera.
   * 2. A overlay image
   * */
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        flexDirection: 'column',
      }}
    >
      <div className="video-wrapper">
        <video className="video" playsInline ref={videoElement} />
        <Image src="/Avatar.jpg" alt="Avatar" className="image" width={maxVideoWidth} height={maxVideoHeight}></Image>
      </div>
    </div>
  )
}
