const express = require('express')
const app = express()
const port = 3000

// include express-handlebars
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// set static
app.use(express.static('public'))

app.get('/', (req, res) => {
    
   const numberList = [{
    a:14},{a:15},{a:18}]

  res.render('index', {movies: movieList.results, numbers: numberList})
})

app.get('/movies/:movie_id', (req, res) => {
  console.log(req.params.movie_id)
  let movie = movieList.results.find(item => item.id.toString() === req.params.movie_id)
  res.render('show', {movie})
})
// search bar 
app.get('/search', (req, res) => {
  console.log('query', req.query.keyword)
  const movies = movieList.results.filter(movie =>movie.title.toLowerCase().includes(req.query.keyword.toLowerCase()))
  res.render('index', { movies: movies, keyword: req.query.keyword})
})
app.listen(port, () => {
  console.log(`Express is running on localhost:${port}`)
})