import React from 'react'
import Shimmer from './Shimmer'
import SkeletonElement from './SkeletonElement'

const SkeletonCard = ({ theme,avatar }) => {
  const themeClass = theme || 'light'

  return (
    <div className={`skeleton-wrapper ${themeClass}`}>
      <div className="skeleton-profile">
        <div>
          <SkeletonElement type="thumbnail" />
        </div>
        <div className='skeleton-spacing'>
          <SkeletonElement type="title" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
        </div>
      </div>
      <Shimmer />
    </div>
  )
}

export default SkeletonCard;