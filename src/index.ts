import express from 'express';
import routes from './routes';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("hello");
})
app.use('/', routes);
app.listen(port, () => {
    console.log(`Listening on ${port}`)
});

export default app;
