'use client'

import { useAuth } from '@/context/AuthContext'
import storage, { DatabaseMedia } from '@/services/databaseService'
import MovieCard from '@/components/MovieCard'
import { useState, useEffect } from 'react'
import ApiService from '@/services/apiService'
import { MediaResponse, MediaType } from '@/types/media'

export default function MyWatchlist() {
  const { user } = useAuth()
  const [watchlist, setWatchlist] = useState<MediaResponse[]>()

  useEffect(() => {
    if (!user) return;

    async function fetchWatchlist() {
      try {
        console.log('entrou na async')
        const data = await storage.read(user!.id, 'media') as DatabaseMedia[]
        console.log(data)
        let medias: MediaResponse[] = []

        if (data) {
            medias = await Promise.all(
            data.map(async (media) => {
              return media.type === MediaType.movie
              ? await ApiService.getMovieById(media.id)
              : await ApiService.getTvShowById(media.id)
            })
            )
            setWatchlist(medias)
        }

      } catch (error) {
        console.error('Failed to fetch watchlist:', error)
      }
    }
      fetchWatchlist()
  }, [user])

  return (
    <ul className='w-full grid grid-cols-[repeat(auto-fill,200px)] justify-center content-start gap-10 p-2 flex-grow'>
      {watchlist && watchlist!.map(media => (
        <MovieCard
          name={(media.name ?? media.title)!}
          media={media}
          watchlistCard={true}
          key={media.id}
        />
      ))}
    </ul>
  )
}
