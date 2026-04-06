'use client'

import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Photo {
  _id: string
  title?: string
  slug?: string
  image?: {
    asset?: {
      _id: string
      url: string
      metadata?: {
        lqip?: string
        dimensions?: {
          width: number
          height: number
        }
      }
    }
  }
}

interface DraggablePhotoGridProps {
  photos: Photo[]
  onReorder: (photoIds: string[]) => void
  onRemove?: (photoId: string) => void
  isLoading?: boolean
}

function SortablePhoto({ 
  photo, 
  onRemove 
}: { 
  photo: Photo
  onRemove?: (id: string) => void 
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: photo._id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group relative aspect-square bg-zinc-900 border overflow-hidden
        ${isDragging ? 'border-white shadow-lg opacity-90' : 'border-zinc-800 hover:border-zinc-700'}
      `}
    >
      {/* Drag handle overlay */}
      <div
        {...attributes}
        {...listeners}
        className="absolute inset-0 cursor-grab active:cursor-grabbing z-10"
      >
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black/80 p-1.5">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          </div>
        </div>
      </div>

      {/* Image */}
      {photo.image?.asset?.url ? (
        <img
          src={photo.image.asset.url}
          alt={photo.title || ''}
          className="w-full h-full object-cover"
          draggable={false}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-zinc-700">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}

      {/* Remove button */}
      {onRemove && (
        <button
          onClick={() => onRemove(photo._id)}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500/80 hover:bg-red-500 p-1.5 z-20"
        >
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Title overlay */}
      {photo.title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-[9px] text-white truncate">{photo.title}</p>
        </div>
      )}
    </div>
  )
}

export function DraggablePhotoGrid({ 
  photos, 
  onReorder, 
  onRemove,
  isLoading 
}: DraggablePhotoGridProps) {
  const [items, setItems] = useState(photos)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item._id === active.id)
      const newIndex = items.findIndex((item) => item._id === over.id)
      
      const newItems = arrayMove(items, oldIndex, newIndex)
      setItems(newItems)
      onReorder(newItems.map((item) => item._id))
    }
  }

  const handleRemove = (photoId: string) => {
    const newItems = items.filter((item) => item._id !== photoId)
    setItems(newItems)
    if (onRemove) onRemove(photoId)
    onReorder(newItems.map((item) => item._id))
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} className="aspect-square bg-zinc-900 animate-pulse" />
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="py-16 border border-dashed border-zinc-800 text-center">
        <svg className="w-12 h-12 text-zinc-800 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-zinc-600 text-sm italic">No photos in this gallery.</p>
        <p className="text-zinc-700 text-[10px] mt-2 uppercase tracking-wider">
          Add photos to get started
        </p>
      </div>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map(p => p._id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {items.map((photo) => (
            <SortablePhoto
              key={photo._id}
              photo={photo}
              onRemove={onRemove ? handleRemove : undefined}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
