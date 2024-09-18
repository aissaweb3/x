'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface RoadmapItem {
  quarter: string;
  title: string;
  items: string[];
}

interface RoadmapCardProps extends RoadmapItem {}

const RoadmapCard: React.FC<RoadmapCardProps> = ({ quarter, title, items }) => (
  <div className="flex-shrink-0 w-80 bg-card p-6 rounded-lg shadow-lg mx-4 my-8 transform transition-transform hover:scale-105">
    <h3 className="text-accent opacity-60 text-2xl font-bold mb-4">{quarter}</h3>
    <h4 className="text-card-foreground text-xl font-semibold mb-2">{title}</h4>
    <ul
    style={{ fontFamily: "auto" }}
    className="list-disc list-inside text-card-foreground text-sm">
      {items && items.map((item, index) => (
        <li key={index} className="mb-2">{item}</li>
      ))}
    </ul>
  </div>
)

const RoadmapPage: React.FC = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [startX, setStartX] = useState<number>(0)
  const [scrollLeft, setScrollLeft] = useState<number>(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const roadmapData: RoadmapItem[] = [
    {
      quarter: 'Q1',
      title: 'Preparation and Foundation',
      items: [
        'Secure the "Forbidden Forest" domain',
        'Develop the official website',
        'Finalize the branding',
        'Create the "BOO Forest" NFTs',
        'Begin game bot development'
      ]
    },
    {
      quarter: 'Q2',
      title: 'Community Building and Initial Launch',
      items: [
        'Launch the official website',
        'Engage with the community',
        'Distribute "BOO Forest" NFTs',
        'Launch game bot beta version'
      ]
    },
    {
      quarter: 'Q3',
      title: 'Expansion and Public Sale',
      items: [
        'Launch game bot to the public',
        'Conduct private sale',
        'Launch marketing campaigns',
        'Execute public sale'
      ]
    },
    {
      quarter: 'Q4',
      title: 'Full Launch and Ecosystem Growth',
      items: [
        'Integrate game bot with ecosystem',
        'Distribute TGE airdrops',
        'List token on CEX',
        'Develop additional features',
        'Secure strategic partnerships'
      ]
    }
  ]

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      setIsDragging(true)
      setStartX(e.pageX - scrollRef.current.offsetLeft)
      setScrollLeft(scrollRef.current.scrollLeft)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp)
    return () => document.removeEventListener('mouseup', handleMouseUp)
  }, [])

  return (
    <div className="min-h-screen flex flex-col text-primary-foreground">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-accent mb-12 text-center">Forbidden Forest Roadmap</h1>
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto pb-8 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="flex">
            {roadmapData.map((item, index) => (
              <div key={index} className={`transform ${index % 2 === 0 ? 'translate-y-8' : '-translate-y-8'}`}>
                <RoadmapCard quarter={item.quarter} title={item.title} items={item.items} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default RoadmapPage