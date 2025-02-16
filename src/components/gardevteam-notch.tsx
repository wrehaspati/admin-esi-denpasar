"use client"

import { useEffect, useState } from "react"

const GARDevTeamNotch = () => {
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const threshold = 100;
      const element = document.getElementById("floating-label");

      if (element) {
        const { left, top, width, height } = element.getBoundingClientRect();
        const elementCenterX = left + width / 2;
        const elementCenterY = top + height / 2;

        const distance = Math.sqrt(
          (e.clientX - elementCenterX) ** 2 + (e.clientY - elementCenterY) ** 2
        );

        setIsHidden(distance < threshold);
      }
    }

    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
      setIsHidden(isBottom);
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      id="floating-label"
      className={`fixed bottom-0 right-0 p-2 text-xs text-muted-foreground font-semibold bg-muted rounded-md m-2 transition-opacity duration-300 ${
        isHidden ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
    >
      GAR Developers Team
    </div>
  )
}
export default GARDevTeamNotch