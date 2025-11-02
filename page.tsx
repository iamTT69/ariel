"use client"
import { StarField } from "@/components/star-field"
import { ChevronDown, Twitter, Mail, Globe, Target, TrendingUp } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { ChatbotModal } from "@/components/chatbot-modal"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [isHeadingVisible, setIsHeadingVisible] = useState(false)
  const [isAboutVisible, setIsAboutVisible] = useState(false)
  const [isServicesVisible, setIsServicesVisible] = useState(false)
  const [isServicesTitleVisible, setIsServicesTitleVisible] = useState(false)
  const [isStatsVisible, setIsStatsVisible] = useState(false)
  const [isPricingVisible, setIsPricingVisible] = useState(false)
  const [blurAmount, setBlurAmount] = useState(0)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [initialHeight, setInitialHeight] = useState(0)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const aboutSectionRef = useRef<HTMLElement>(null)
  const aboutContentRef = useRef<HTMLDivElement>(null)
  const servicesSectionRef = useRef<HTMLElement>(null)
  const servicesContentRef = useRef<HTMLDivElement>(null)
  const servicesTitleRef = useRef<HTMLHeadingElement>(null)
  const statsSectionRef = useRef<HTMLElement>(null)
  const statsContentRef = useRef<HTMLDivElement>(null)
  const pricingSectionRef = useRef<HTMLElement>(null)
  const pricingContentRef = useRef<HTMLDivElement>(null)
  const contactSectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef(0)
  const lastScrollRef = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    if (initialHeight === 0) {
      setInitialHeight(window.innerHeight)
    }
  }, [initialHeight])

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const maxBlur = 8
          const triggerHeight = initialHeight * 1.2
          const newBlurAmount = Math.min(maxBlur, (scrollRef.current / triggerHeight) * maxBlur)

          setBlurAmount(newBlurAmount)

          lastScrollRef.current = scrollRef.current
          ticking.current = false
        })

        ticking.current = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [initialHeight])

  useEffect(() => {
    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeadingVisible(true)
          if (headingRef.current) {
            headingObserver.unobserve(headingRef.current)
          }
        }
      },
      { threshold: 0.1 },
    )

    if (headingRef.current) {
      headingObserver.observe(headingRef.current)
    }

    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true)
          if (aboutContentRef.current) {
            aboutObserver.unobserve(aboutContentRef.current)
          }
        }
      },
      { threshold: 0.1 },
    )

    if (aboutContentRef.current) {
      aboutObserver.observe(aboutContentRef.current)
    }

    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesVisible(true)
          if (servicesContentRef.current) {
            servicesObserver.unobserve(servicesContentRef.current)
          }
        }
      },
      { threshold: 0.1 },
    )

    if (servicesContentRef.current) {
      servicesObserver.observe(servicesContentRef.current)
    }

    const servicesTitleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesTitleVisible(true)
          if (servicesTitleRef.current) {
            servicesTitleObserver.unobserve(servicesTitleRef.current)
          }
        }
      },
      { threshold: 0.1 },
    )

    if (servicesTitleRef.current) {
      servicesTitleObserver.observe(servicesTitleRef.current)
    }

    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true)
          if (statsContentRef.current) {
            statsObserver.unobserve(statsContentRef.current)
          }
        }
      },
      { threshold: 0.1 },
    )

    if (statsContentRef.current) {
      statsObserver.observe(statsContentRef.current)
    }

    const pricingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPricingVisible(true)
          if (pricingContentRef.current) {
            pricingObserver.unobserve(pricingContentRef.current)
          }
        }
      },
      { threshold: 0.1 },
    )

    if (pricingContentRef.current) {
      pricingObserver.observe(pricingContentRef.current)
    }

    return () => {
      if (headingRef.current) {
        headingObserver.unobserve(headingRef.current)
      }
      if (aboutContentRef.current) {
        aboutObserver.unobserve(aboutContentRef.current)
      }
      if (servicesContentRef.current) {
        servicesObserver.unobserve(servicesContentRef.current)
      }
      if (servicesTitleRef.current) {
        servicesTitleObserver.unobserve(servicesTitleRef.current)
      }
      if (statsContentRef.current) {
        statsObserver.unobserve(statsContentRef.current)
      }
      if (pricingContentRef.current) {
        pricingObserver.unobserve(pricingContentRef.current)
      }
    }
  }, [])

  const scaleFactor = 1 + blurAmount / 16
  const warpSpeedStyle = {
    transform: `scale(${scaleFactor})`,
    transition: "transform 0.2s ease-out",
  }

  const scrollToAbout = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const scrollToContact = () => {
    if (contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const openChatbot = () => {
    setIsChatbotOpen(true)
  }

  const closeChatbot = () => {
    setIsChatbotOpen(false)
  }

  const heroStyle = {
    height: initialHeight ? `${initialHeight}px` : "100vh",
  }

  return (
    <div className="min-h-screen">
      <section className="relative w-full overflow-hidden bg-black" style={heroStyle}>
        <div className="absolute top-6 right-6 z-10 flex space-x-3">
          <Button
            onClick={scrollToContact}
            variant="outline"
            size="sm"
            className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors"
          >
            Contact
          </Button>
        </div>

        <div className="absolute inset-0" style={warpSpeedStyle}>
          <StarField blurAmount={blurAmount} />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <div
              className="backdrop-blur-sm px-6 py-4 rounded-lg inline-block relative"
              style={{
                background: "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)",
              }}
            >
              <h1 className="text-4xl font-bold text-white md:text-6xl font-heading">Ariel Fleischer</h1>
              <p className="mt-2 text-sm text-gray-400 md:text-base px-4 max-w-xs mx-auto md:max-w-none">
                The Man Who Saw Domains Before They Were Gold
              </p>
              <p className="mt-4 text-lg text-gray-300 md:text-xl px-4 max-w-xs mx-auto md:max-w-none">
                Collector. Strategist. Visionary. Turning words into digital real estate since 2002.
              </p>
              <Button
                onClick={scrollToAbout}
                variant="outline"
                size="sm"
                className="mt-6 bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors"
              >
                Explore His Portfolio
              </Button>
            </div>
          </div>

          <div
            className="absolute bottom-20 animate-bounce cursor-pointer"
            onClick={scrollToAbout}
            role="button"
            aria-label="Scroll to about section"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                scrollToAbout()
              }
            }}
          >
            <ChevronDown className="h-8 w-8 text-white" />
          </div>
        </div>
      </section>

      <section ref={aboutSectionRef} id="about" className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div
            ref={aboutContentRef}
            className={cn(
              "max-w-4xl mx-auto transition-all duration-1000 ease-out",
              isAboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="flex flex-col items-center gap-8 md:gap-12">
              <div className="space-y-4 text-center px-4 md:px-0">
                <h2 className="text-3xl font-bold font-heading">About Ariel Fleischer</h2>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <p className="text-gray-300 leading-relaxed">
                    I'm Ariel Fleischer — born in 1984 in Israel, raised with curiosity for the internet's hidden value.
                    While others surfed the web, I was buying it — one domain at a time. From the early 2000s onward,
                    I've quietly collected and held thousands of domains, watching digital real estate evolve into one
                    of the world's most valuable assets.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    To me, domains are more than URLs — they are opportunities, ideas, and futures waiting to be
                    claimed.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
                  <Button
                    onClick={scrollToContact}
                    variant="outline"
                    size="sm"
                    className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors w-[140px] mx-auto"
                  >
                    Get in Touch
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={servicesSectionRef} id="services" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2
            ref={servicesTitleRef}
            className={cn(
              "mb-12 text-center text-3xl font-bold font-heading transition-all duration-1000 ease-out",
              isServicesTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Domain Services
          </h2>
          <div
            ref={servicesContentRef}
            className={cn(
              "max-w-5xl mx-auto transition-all duration-1000 ease-out",
              isServicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Target className="h-7 w-7 text-white mr-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold font-heading">Domain Acquisition</h3>
                </div>
                <p className="text-gray-300">
                  We identify undervalued domains before they become trends — precision, patience, and timing define our
                  edge.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Globe className="h-7 w-7 text-white mr-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold font-heading">Holding Strategy</h3>
                </div>
                <p className="text-gray-300">
                  A portfolio built with foresight. Thousands of names held and curated for long-term digital value.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-7 w-7 text-white mr-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold font-heading">Brokerage & Sales</h3>
                </div>
                <p className="text-gray-300">
                  Connecting brands and investors with premium domain assets — discreet, data-driven, and global.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={statsSectionRef} id="stats" className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold font-heading mb-12">The Numbers Behind the Vision</h2>
          <div
            ref={statsContentRef}
            className={cn(
              "max-w-4xl mx-auto transition-all duration-1000 ease-out",
              isStatsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800 rounded-lg p-8 text-center hover:bg-gray-700 transition-colors">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">5,000+</div>
                <p className="text-gray-300 text-sm">Domains Acquired</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-8 text-center hover:bg-gray-700 transition-colors">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">20+</div>
                <p className="text-gray-300 text-sm">Years in the Market</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-8 text-center hover:bg-gray-700 transition-colors">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">$180K</div>
                <p className="text-gray-300 text-sm">Highest Sale (Confidential Deal)</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-8 text-center hover:bg-gray-700 transition-colors">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">4</div>
                <p className="text-gray-300 text-sm">Active Sectors: Tech, Finance, Media, Brandables</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={pricingSectionRef}
        id="pricing"
        className="py-16 bg-black text-white border-t border-gray-800 border-b border-gray-800"
      >
        <div className="container mx-auto px-4">
          <div
            ref={pricingContentRef}
            className={cn(
              "max-w-2xl mx-auto transition-all duration-1000 ease-out",
              isPricingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="text-center space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-heading mb-3">Current Domain Offering</h2>
                <p className="text-gray-300">This domain is available for acquisition.</p>
              </div>

              <div className="py-8">
                <div
                  className="inline-block px-8 py-6 rounded-lg relative"
                  style={{
                    background: "rgba(0, 0, 0, 0.6)",
                    boxShadow: "0 0 40px rgba(255, 255, 255, 0.1), inset 0 0 40px rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <div className="text-5xl md:text-6xl font-bold text-white mb-2">$299.99</div>
                  <p className="text-gray-300 text-sm">Premium Domain</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-300">Interested? Reach out directly: arielfleischerweb@gmail.com</p>
                <Button
                  onClick={() => (window.location.href = "mailto:arielfleischerweb@gmail.com")}
                  className="bg-white text-black hover:bg-gray-100 transition-colors font-semibold"
                >
                  Contact Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={contactSectionRef} id="contact" className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2
            ref={headingRef}
            className={cn(
              "mb-4 text-center text-3xl font-bold font-heading transition-all duration-1000 ease-out text-gray-900",
              isHeadingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Want to Acquire, Invest, or Collaborate?
          </h2>
          <p className="text-center text-gray-600 mb-8">Reach out directly to Ariel Fleischer</p>
          <ContactForm />
        </div>
      </section>

      <footer className="bg-black text-gray-300 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <p className="text-sm mb-6">© 2025 Ariel Fleischer — Domain Collector & Visionary. All Rights Reserved.</p>
            <div className="flex justify-center gap-4 mb-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="mailto:arielfleischerweb@gmail.com"
                aria-label="Email"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-gray-500">Contact: arielfleischerweb@gmail.com</p>
          </div>
        </div>
      </footer>

      <ChatbotModal isOpen={isChatbotOpen} onClose={closeChatbot} />
    </div>
  )
}
