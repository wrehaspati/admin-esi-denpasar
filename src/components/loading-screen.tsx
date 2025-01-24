import { cn } from '@/lib/utils'
import React from 'react'
import { LoadingSpinner } from './loading-spinner'

const LoadingScreen: React.FC<{ isLoading?: boolean }> = ({ isLoading = true }) => {
  return (
    <>
      {isLoading && (
        <div className={cn('bg-muted flex items-center justify-center w-screen h-screen',
          'top-0 bottom-0 left-0 right-0 z-50 fixed overflow-hidden grid justify-center items-center')}>
          <LoadingSpinner className='size-16'/>
        </div>
      )}
    </>
  )
}

export default LoadingScreen