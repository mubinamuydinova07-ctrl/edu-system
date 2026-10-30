import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const baseColor = '#e9edf6'
const highlightColor = '#f5f8ff'

export function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <Skeleton height={150} baseColor={baseColor} highlightColor={highlightColor} />
      <div className="p-4">
        <Skeleton width="45%" height={10} baseColor={baseColor} highlightColor={highlightColor} />
        <div className="mt-3">
          <Skeleton count={2} height={13} baseColor={baseColor} highlightColor={highlightColor} />
        </div>
        <div className="mt-3">
          <Skeleton width="55%" height={11} baseColor={baseColor} highlightColor={highlightColor} />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Skeleton width={90} height={18} baseColor={baseColor} highlightColor={highlightColor} />
          <Skeleton width={80} height={30} borderRadius={12} baseColor={baseColor} highlightColor={highlightColor} />
        </div>
      </div>
    </div>
  )
}

export function CourseGridSkeleton({ count = 8 }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <CourseCardSkeleton key={index} />
      ))}
    </div>
  )
}

export function CourseDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Skeleton width={180} height={14} baseColor={baseColor} highlightColor={highlightColor} />
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <Skeleton width="80%" height={38} baseColor={baseColor} highlightColor={highlightColor} />
          <Skeleton className="mt-3" width="60%" height={20} baseColor={baseColor} highlightColor={highlightColor} />
          <div className="mt-5">
            <Skeleton count={3} height={14} baseColor={baseColor} highlightColor={highlightColor} />
          </div>
          <div className="mt-8 rounded-2xl border border-slate-200 p-6">
            <Skeleton width="40%" height={22} baseColor={baseColor} highlightColor={highlightColor} />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Skeleton count={6} height={14} baseColor={baseColor} highlightColor={highlightColor} />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 p-4">
          <Skeleton height={200} borderRadius={16} baseColor={baseColor} highlightColor={highlightColor} />
          <div className="mt-4">
            <Skeleton height={40} baseColor={baseColor} highlightColor={highlightColor} />
          </div>
          <div className="mt-3">
            <Skeleton height={40} baseColor={baseColor} highlightColor={highlightColor} />
          </div>
        </div>
      </div>
    </div>
  )
}
