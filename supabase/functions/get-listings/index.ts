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

    const url = new URL(req.url)
    const id = url.searchParams.get('id')

    // ── GET single listing by slug ──
    if (req.method === 'GET' && id) {
      const { data, error } = await supabaseClient
        .from('listings')
        .select('*')
        .eq('slug', id)
        .single()

      if (error) throw error

      return new Response(JSON.stringify({ success: true, data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    // ── GET all listings (with pagination + filters) ──
    if (req.method === 'GET') {
      const type = url.searchParams.get('type')
      const q = url.searchParams.get('q')
      const page = parseInt(url.searchParams.get('page') || '1')
      const perPage = parseInt(url.searchParams.get('perPage') || '12')

      let query = supabaseClient
        .from('listings')
        .select('*', { count: 'exact' })

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
    if (req.method === 'POST') {
      const body = await req.json()

      const { data, error } = await supabaseClient
        .from('listings')
        .insert(body)
        .select()
        .single()

      if (error) throw error

      return new Response(JSON.stringify({ success: true, data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 201,
      })
    }

    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 405,
    })
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
