const axios = require('axios')

const endpoints= [
'https://jsonbase.com/lambdajson_type1/793',
'https://jsonbase.com/lambdajson_type1/955',
'https://jsonbase.com/lambdajson_type1/231',
'https://jsonbase.com/lambdajson_type1/931',
'https://jsonbase.com/lambdajson_type1/93',
'https://jsonbase.com/lambdajson_type2/342',
'https://jsonbase.com/lambdajson_type2/770',
'https://jsonbase.com/lambdajson_type2/491',
'https://jsonbase.com/lambdajson_type2/281',
'https://jsonbase.com/lambdajson_type2/718',
'https://jsonbase.com/lambdajson_type3/310',
'https://jsonbase.com/lambdajson_type3/806',
'https://jsonbase.com/lambdajson_type3/469',
'https://jsonbase.com/lambdajson_type3/258',
'https://jsonbase.com/lambdajson_type3/516',
'https://jsonbase.com/lambdajson_type4/79',
'https://jsonbase.com/lambdajson_type4/706',
'https://jsonbase.com/lambdajson_type4/521',
'https://jsonbase.com/lambdajson_type4/350',
'https://jsonbase.com/lambdajson_type4/64',
]

const getData = async (url, count = 0) => {
  try {
    const { data } = await axios(url)

    const result = findIsDone(data)
  
    return result.isDone
  } catch (error) {

    if (count < 3) {
      return getData(url, count + 1)
    }   
    
    console.log(url, 'error');
    return undefined
  }
}

const findIsDone = (data) => {
  if (data.isDone !== undefined) {
    return {isDone: data.isDone}
  }

  return Object.values(data).find((value) => {
    if (typeof value === 'object') {
      return findIsDone(value)
    }

    return undefined
  })
}

const getAllData = async () => {
  const mappedEndpoints = endpoints.map((endpoint) => getData(endpoint))

  const results = await axios.all(mappedEndpoints)

  console.log(results.filter((r) => r).length, 'True');
  console.log(results.filter((r) => r === false).length, 'False');
}

getAllData()
