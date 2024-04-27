import express from 'express'
import routes from './src/routes/index'

const app = express()

app.use(express.json())

app.use(routes)

app.get('', (req, res) => res.send("salut"))

app.listen(3000, () => {
    console.log("Draw G back launched");
});


