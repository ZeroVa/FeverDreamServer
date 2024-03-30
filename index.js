import { Hono } from 'hono'

const app = new Hono()

app.get('/generateBackground', (c) => {
	// Hit stability for some image n shit
	let imageUrl = "https://placehold.co/600x400"
	c.json({
		backgroundImageUrl: imageUrl	
	})
})