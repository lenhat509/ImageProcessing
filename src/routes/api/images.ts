import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const images = express.Router();
images.get('/images', async (req, res) => {
    const query = req.query;
    const filename = query.filename as string;
    const width: number = parseInt(query.width as string);
    const height: number = parseInt(query.height as string);
    const myPath: string = `images/full/${filename}.jpg`
    if(fs.existsSync(myPath))
    {
        const newFile: string = `images/thumb/${filename}_${width}_${height}.jpg`;
        if(!fs.existsSync(newFile))
        {
            await sharp(myPath)
            .resize(width, height)
            .toFile(newFile);
            res.sendFile(path.resolve(newFile));
        }
        else
        {
            res.sendFile(path.resolve(newFile));
        }
    }
    else
    {
        res.sendStatus(404);
    }
})
export default images;