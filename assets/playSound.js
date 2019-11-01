/**
 * @param {string} src - The sound's source
*/
const playSound = (src) => {
   let audioEl = document.createElement('audio')
   audioEl.controls = false
   audioEl.autoplay = true

   let sourceEl = document.createElement('source')
   sourceEl.src = src

   audioEl.appendChild(sourceEl)

   document.body.appendChild(audioEl)
}


export default playSound
