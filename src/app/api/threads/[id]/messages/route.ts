import { createClient } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = createClient()
  
  try {
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = (page - 1) * limit

    // Check if user has access to this thread
    const { data: thread, error: threadError } = await supabase
      .from('threads')
      .select('*')
      .eq('id', id)
      .or(`renter_id.eq.${user.id},host_id.eq.${user.id}`)
      .single()

    if (threadError || !thread) {
      return NextResponse.json({ error: 'Thread not found or access denied' }, { status: 404 })
    }

    // Get messages for this thread
    const { data: messages, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:users!messages_sender_id_fkey(
          id,
          name,
          email
        )
      `)
      .eq('thread_id', id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching messages:', error)
      return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
    }

    return NextResponse.json({
      messages: messages || [],
      pagination: {
        page,
        limit,
        hasMore: messages?.length === limit
      }
    })

  } catch (error) {
    console.error('Error in get messages API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
