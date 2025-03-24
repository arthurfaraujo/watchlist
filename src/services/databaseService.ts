import { MediaType } from '@/types/media'
import { supabase } from '@/lib/supabaseClient'

export interface DatabaseMedia {
  id: string
  type: MediaType
  watchlistId: string
}

export interface Watchlist {
  userId: string
  media?: DatabaseMedia[]
}

async function create(
  data: Watchlist | DatabaseMedia,
  resource: string = 'watchlist'
): Promise<Watchlist[] | DatabaseMedia[] | undefined> {
  const { data: created, error } = await supabase
    .from(resource)
    .insert(data)
    .select()

  if (error) {
    console.error(`Error creating record: ${error.message}`)
    return
  }

  return created
}

async function read(userId: string, resource: string = 'watchlist'): Promise<Watchlist[] | DatabaseMedia[] | undefined> {
  const { data, error } = await supabase
    .from(resource)
    .select('*')
    .eq(resource === 'media' ? 'watchlistId' : 'userId', userId)

  if (error) {
    console.error(`Error reading record: ${error.message}`)
    return
  }

  console.log(data)

  return data
}

async function update(
  id: string,
  data: Partial<Watchlist>,
  resource: string = 'watchlist'
): Promise<Watchlist | DatabaseMedia | undefined> {
  const { data: updated, error } = await supabase
    .from(resource)
    .update(data)
    .eq('id', id)
    .select()

  if (error) {
    console.error(`Error updating record: ${error.message}`)
  }

  return updated?.[0]
}

async function remove(id?: string, resource: string = 'watchlist') {
  const { error } = await supabase.from(resource).delete().eq('id', id)

  if (error) {
    console.error(`Error deleting record: ${error.message}`)
  }

  return true
}

const exports = {
  create,
  read,
  update,
  remove
}

export default exports
