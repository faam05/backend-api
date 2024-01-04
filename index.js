import express from 'express'
import cors from 'cors'
import session from 'express-session'
import db from './config/database.js'
import dotenv from 'dotenv'
import SequelizeStore from 'connect-session-sequelize'
import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import ProductRoute from './routes/ProductRoute.js'

dotenv.config()

const app = express()

const sessionStore = SequelizeStore(session.Store)

const store = new sessionStore({
  db: db,
})

// ;(async () => {
//   await db.sync()
// })()

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      // secure true jika menggunakan https / false jika http
      secure: 'auto',
    },
  })
)

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5173'],
  })
)

app.use(express.json())
app.use(UserRoute)
app.use(ProductRoute)
app.use(AuthRoute)

// store.sync()

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`)
})
