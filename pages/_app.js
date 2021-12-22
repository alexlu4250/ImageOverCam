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
            facingMode: 'user',
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
