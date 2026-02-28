// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Parse everything from the POST body for clarity with frontend SDK
    const body = await req.json().catch(() => ({}))
    const { action, id, type, q, page = 1, perPage = 12 } = body

    // ── GET single listing by slug ──
    if (action === 'get_listing' && id) {
      const { data, error } = await supabaseClient
        .from('listings')
        .select(`
          *,
          neighborhood:neighborhoods(*),
          agent:agents(*)
        `)
        .eq('slug', id)
        .single()

      if (error) throw error

      return new Response(JSON.stringify({ success: true, data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    // ── GET all listings (with pagination + filters) ──
    if (action === 'get_listings') {
      let query = supabaseClient
        .from('listings')
        .select(`
          *,
          neighborhood:neighborhoods(*),
          agent:agents(*)
        `, { count: 'exact' })

      if (type) query = query.eq('type', type.toUpperCase())
      if (q) query = query.ilike('title', `%${q}%`)

      const { data, error, count } = await query
        .range((page - 1) * perPage, page * perPage - 1)
        .order('created_at', { ascending: false })

      if (error) throw error

      return new Response(JSON.stringify({
        success: true,
        data,
        meta: {
          page,
          perPage,
          total: count,
          totalPages: count ? Math.ceil(count / perPage) : 0
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    // ── POST create a new listing ──
    if (action === 'create_listing') {
      const { data, error } = await supabaseClient
        .from('listings')
        .insert(body.payload)
        .select()
        .single()

      if (error) throw error

      return new Response(JSON.stringify({ success: true, data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 201,
      })
    }

    return new Response(JSON.stringify({ error: 'Action Not Allowed or Not Found' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
