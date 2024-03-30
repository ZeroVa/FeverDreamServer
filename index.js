import 'dotenv/config'
import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import axios from 'axios'
import fs from 'fs'

const app = new Hono()

app.use('/*', cors())
app.get('/generateBackground', async (c) => {
	// Hit stability for some image n shit
	let res = await axios.post('https://api.stability.ai/v2beta/stable-image/generate/core',{
			'prompt': "Point and click adventure scene background image of an empty room in what looks like an art deco apartment building in new york. There is a view of the nyc skyline from one of the small windows in the room. We can see a locked door. in video game art style, the floor should meet the bottom of the back wall 2/3 up from the bottom of the image, 2d, beneath a steel sky style",
			'aspect_ratio': '3:2',
			'negative_prompt': 'realism, portrait, 3d, photo'
		}, 
		{
		headers: {
			'authorization': process.env.STABILITY_API_KEY,
			'content-type': 'multipart/form-data',
			'accept': 'application/json'
		}
	})
	let data = res.data.image
	let image = Buffer.from(data, 'base64')
	let writtenImage = fs.promises.appendFile(`./tmp/bg-${(new Date().getTime())}.png`, image)

	c.status(200)
	c.header('Content-type', 'image/png')
	c.header('Content-length', image.length)
	return c.body(image)
})

app.get('/image/:id', async (c) => {
	const imageId = c.req.param('id')

	let image = fs.readFileSync('./bg.png')
	c.status(200)
	c.header('Content-Type', 'image/png')
	return c.body(Buffer.from(image))
})

serve({
	fetch: app.fetch,
	port: 8787,
})