const fs = require('fs');

console.time('time');
// const mainPath = 'Instagram/200k_words_100x100'
const mainPath = 'Instagram/2kk_words_400x400'

const files = fs.readdirSync(mainPath);

const getData = () => {
  const groupedData = files.reduce((acc, file) => {
    const allFileContents = fs.readFileSync(`${mainPath}/${file}`, 'utf-8');
    const wordsArr = allFileContents.split('\n')

    wordsArr.forEach((word) => {
      if (acc[word] && acc[word][file]) {
        acc[word][file] += 1
        return
      }
      acc[word] = {
        ...acc[word],
        [file]: 1
      }
    })

    return acc
  }, {})

  return groupedData
}

const uniqueValues = (data) => Object.keys(data).length

const existInAllFiles = (data) => Object.values(data).filter((keys) => Object.keys(keys).length === files.length).length

const existInAtLeastTen = (data) => Object.values(data).filter((keys) => Object.keys(keys).length >= 10).length

const groupedData = getData()

console.log(uniqueValues(groupedData), 'uniqueValues');
console.log(existInAllFiles(groupedData), 'existInAllFiles');
console.log(existInAtLeastTen(groupedData), 'existInAtLeastTen');

console.timeEnd('time');

