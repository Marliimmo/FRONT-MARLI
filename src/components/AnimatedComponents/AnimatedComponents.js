import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useInView } from 'react-intersection-observer'

export const FadeIn = ({ children }) => {
  const [ref, inView] = useInView({ threshold: 0.1 })
  const props = useSpring({
    opacity: inView ? 1 : 0,
  })

  return (
    <animated.div ref={ref} style={props}>
      {children}
    </animated.div>
  )
}

export const SlideOfRight = ({ children }) => {
  const [ref, inView] = useInView({ threshold: 0.5 })
  const props = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0)' : 'translateX(20px)',
    delay: 200,
  })

  return (
    <animated.div ref={ref} style={props}>
      {children}
    </animated.div>
  )
}

export const SlideDown = ({ children }) => {
  const [ref, inView] = useInView({ threshold: 0.00001 })
  const props = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(-20px)' : 'translateY(-40px)',
    delay: 100,
  })

  return (
    <animated.div ref={ref} style={props}>
      {children}
    </animated.div>
  )
}

export const SlideUp = ({ children }) => {
  const [ref, inView] = useInView({ threshold: 0.0001 })
  const props = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(-20px)' : 'translateY(40px)',
    delay: 100,
  })

  return (
    <animated.div ref={ref} style={props}>
      {children}
    </animated.div>
  )
}

// Export des animations ensemble
const AnimatedComponents = {
  FadeIn,
  SlideOfRight,
  SlideDown,
  SlideUp,
}

export default AnimatedComponents
