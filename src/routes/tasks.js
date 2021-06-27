const express = require('express')
const router = express.Router()

const Word = require('../models/Word')

const fetch = require('node-fetch')

router.get('/', async (req, res) => {
  const words = await Word.find({})
  // console.log('get: ',words)
  res.json(words);
});

router.get('/:id', async (req, res) => {
  const task = await Word.findById(req.params.id);
  res.json(task);
});

router.post('/', async (req, res) => {
  
  const task = new Word(req.body)
  const arrayObj = await getUrlImagenByWord( task.text ) 
  let arrayImages = []
  arrayObj.forEach(element => {
    arrayImages.push(element.imageurl)
  })
  
  console.log('arrayImages:',arrayImages)
  task.image_url = arrayImages
  await task.save()

  res.json({
    status: 'Word saved!!!'
  })

})

router.put('/:id', async (req, res) => {
  await Word.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'Word Updated'
  });
});

router.delete('/:id', async (req, res) => {
  await Word.findByIdAndRemove(req.params.id);
  res.json({
    status: 'Word deleted'
  });
})

async function getUrlImagenByWord( word ){
  
  const URL_API_IMAGES = 'http://glyffix.com/api/Image?word='
  try {
    
    let res = await fetch(URL_API_IMAGES + word)
    const arrayRst = await res.json()
    console.log('getUrlImagenByWord:',arrayRst)
    return arrayRst.data
    // return (await res.json()).data[0].imageurl

  } catch (error) {
    console.error(error) 
  }
}

module.exports = router;
