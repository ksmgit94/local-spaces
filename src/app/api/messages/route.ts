import { createClient } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  
  try {
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { thread_id, body: messageBody, attachment_url } = body

    // Validate required fields
    if (!thread_id || !messageBody) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if user has access to this thread
    const { data: thread, error: threadError } = await supabase
      .from('threads')
      .select('*')
      .eq('id', thread_id)
      .or(`renter_id.eq.${user.id},host_id.eq.${user.id}`)
      .single()

    if (threadError || !thread) {
      return NextResponse.json({ error: 'Thread not found or access denied' }, { status: 404 })
    }

    // Create message
    const { data: message, error } = await supabase
      .from('messages')
      .insert({
        thread_id,
        sender_id: user.id,
        body: messageBody,
        attachment_url: attachment_url || null
      })
      .select(`
        *,
        sender:users!messages_sender_id_fkey(
          id,
          name,
          email
        )
      `)
      .single()

    if (error) {
      console.error('Error creating message:', error)
      return NextResponse.json({ error: 'Failed to create message' }, { status: 500 })
    }

    // Update thread updated_at timestamp
    await supabase
      .from('threads')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', thread_id)

    return NextResponse.json({ message }, { status: 201 })

  } catch (error) {
    console.error('Error in create message API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
