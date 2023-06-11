const fs = require('fs');

console.time('time');
// const mainPath = 'Instagram/200k_words_100x100'
const mainPath = 'Instagram/2kk_words_400x400'

const files = fs.readdirSync(mainPath);

const getData = async () => {
  const mappedFiles = files.map((file) => new Promise((resolve, reject) => {
    fs.readFile(`${mainPath}/${file}`, 'utf-8', (err, data) => { 
        const wordsArr = data.split('\n')
        resolve([...new Set(wordsArr)])
    })
  }))

  const allWords = (await Promise.all(mappedFiles)).flat()
  
  const groupedData = allWords.reduce((acc, word) => {
    if (acc[word]) {
      acc[word] += 1
      return acc;
    }

    acc[word] = 1

    return acc
  }, {})

  return groupedData
}

const uniqueValues = (data) => Object.keys(data).length

const existInAllFiles = (data) => Object.values(data).filter((value) => value === files.length).length

const existInAtLeastTen = (data) => Object.values(data).filter((value) => value >= 10).length


const showResult = async () => {
  const groupedData = await getData()

  console.log(uniqueValues(groupedData), 'uniqueValues');
  console.log(existInAllFiles(groupedData), 'existInAllFiles');
  console.log(existInAtLeastTen(groupedData), 'existInAtLeastTen');

  console.timeEnd('time');
}

showResult()




