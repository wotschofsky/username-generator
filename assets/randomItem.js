const randomItem = (array) => {
   let { length } = array
   let key = Math.floor(Math.random() * (length - 1)) + 1
   return array[key]
}


export default randomItem
