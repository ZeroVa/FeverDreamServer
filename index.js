import { Hono } from 'hono'
import { serve } from '@hono/node-server'

const app = new Hono()

app.get('/generateBackground', (c) => {
	// Hit stability for some image n shit
	let imageUrl = "https://placehold.co/600x400"
	return c.json({
		backgroundImageUrl: imageUrl	
	})
})

serve({
	fetch: app.fetch,
	port: 8787,
})