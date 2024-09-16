"use client"

import GhostLoader from '@/app/loading';
import React, { useState, ReactNode } from 'react'

interface LoadingWrapperProps {
  className: string;
  children: ReactNode;
  loadingIndicator?: ReactNode;
  delay?: number;
  onClick?: (event: React.MouseEvent) => void;
}


export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  children,className,
  loadingIndicator = <div className="fixed w-[100vw] h-[100vh] bg-[#00192b] top-0 left-0 " style={{ zIndex: "60" }} ><GhostLoader /></div>,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async (event: React.MouseEvent) => {
    setIsLoading(true)
  }

  return (
    <div className={className} onClick={handleClick}>
      {children}
      {isLoading && loadingIndicator}
    </div>
  )
}

