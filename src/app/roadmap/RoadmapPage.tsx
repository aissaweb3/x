'use client'
import { useState } from 'react'
import { Star, Zap, Target, Rocket, Flag } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

const roadmapItems = [
  { icon: Star, title: "Phase 1: Genesis", description: "Launch of the token and initial community building." },
  { icon: Zap, title: "Phase 2: Amplification", description: "Community expansion and partnership with other projects." },
  { icon: Target, title: "Phase 3: Targeting", description: "Major marketing push and listing on top exchanges." },
  { icon: Rocket, title: "Phase 4: Liftoff", description: "Launch of our exclusive NFT collection." },
  { icon: Flag, title: "Phase 5: New Horizons", description: "Release of our decentralized gaming platform." },
]

export default function RoadmapPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen text-primary-foreground p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary-dark to-background opacity-10" />
      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-accent">Roadmap</h1>
      <div className="relative w-full max-w-4xl">
        {roadmapItems.map((item, index) => (
          <div key={index} className={`flex items-center mb-16 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            <div className="relative">
              <div 
                className="absolute w-12 h-12 bg-primary border-2 border-accent rounded-full flex items-center justify-center z-10"
                style={{
                  left: index % 2 === 0 ? '-6px' : 'auto',
                  right: index % 2 === 1 ? '-6px' : 'auto',
                  boxShadow: hoveredIndex === index ? '0 0 15px #38fdfd' : 'none',
                  transition: 'box-shadow 0.3s ease-in-out',
                }}
              >
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <Card 
                className={`w-64 md:w-80 bg-card hover:bg-primary-dark transition-colors duration-300 ${
                  index % 2 === 0 ? 'ml-8' : 'mr-8'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold text-accent mb-2">{item.title}</h3>
                  <p style={{fontFamily: "auto"}} className="text-card-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </div>
            {index < roadmapItems.length - 1 && (
              <div 
                className="absolute w-1/2 border-t-2 border-accent z-0"
                style={{
                  left: index % 2 === 0 ? '0' : '50%',
                  top: '6px',
                  transform: index % 2 === 0 ? 'translateY(120px)' : 'translateY(-40px)',
                }}
              >
                <div 
                  className="absolute w-3 h-3 bg-accent rounded-full"
                  style={{
                    top: '-6px',
                    [index % 2 === 0 ? 'right' : 'left']: '-6px',
                    animation: 'pulse 2s infinite',
                    animationDelay: `${index * 0.5}s`,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}