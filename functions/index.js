const functions = require('firebase-functions')
const axios = require('axios')
const cheerio = require('cheerio')
const cors = require('cors')({ origin: true })
const dns = require('dns')
// const { Resolver } = dns

const domainEndings = require('./domainEndings.json')

const sites = {
   twitter: 'Twitter',
   github: 'GitHub',
   pastebin: 'Pastebin'
}


// const resolver = new Resolver()
// resolver.setServers(['1.1.1.1', '1.0.0.1'])

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.checkAvailability = functions.https.onRequest((req, res) => {
   cors(req, res, () => {
      let { name } = req.query
      let checks = {
         domains: {},
         social: {}
      }

      if(!name) {
         return res.status(400).json({
            error: 'name not defined'
         })
      }

      domainEndings.forEach((ending) => {
         let domain = `${name.toLowerCase()}.${ending}`
         checks['domains'][domain] = 'pending'
         checkDomainAvailability(`${name}.${ending}`)
            .then(() => {
               checks['domains'][domain] = 'available'
               callback(checks, res)
            })
            .catch(() => {
               checks['domains'][domain] = 'taken'
               callback(checks, res)
            })
      })

      checks['social'][sites.twitter] = 'pending'
      axios({
         method: 'GET',
         url: 'https://twitter.com/users/username_available',
         params: {
            username: name
         }
      })
      .then(({ data }) => {
         checks['social'][sites.twitter] = data.reason
         callback(checks, res)
      })
      .catch(() => {
         checks['social'][sites.twitter] = 'failed'
      })

      checks['social'][sites.github] = 'pending'
      axios({
         method: 'GET',
         url: `https://api.github.com/users/${name}`,
      })
      .then(({ data }) => {
         checks['social'][sites.github] = 'taken'
         callback(checks, res)
      })
      .catch((data) => {
         checks['social'][sites.github] = 'available'
         callback(checks, res)
      })

      checks['social'][sites.pastebin] = 'pending'
      axios({
         method: 'POST',
         url: 'https://pastebin.com/ajax/check_username.php',
         data: `action=check_username&username=${name}`,
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded charset=UTF-8'
         }
      })
      .then(({ data }) => {
         let $ = cheerio.load(data)
         checks['social'][sites.pastebin] = $('font').attr('color') == 'green' ? 'available' : 'taken'
         callback(checks, res)
      })
      .catch((data) => {
         checks['social'][sites.pastebin] = 'failed'
         callback(checks, res)
      })
   })
})


const checkDomainAvailability = (url) => {
   return new Promise((resolve, reject) => {
      dns.resolve4(url, function (err) {
         if (err) resolve(true)
         else reject(false)
      })
   })
}

const callback = (checks, res) => {
   let done = true
   for(let section in checks) {
      for(let key in checks[section]) {
         if(done) done = checks[section][key] != 'pending'
      }
   }

   if(done) {
      res.json({
         success: true,
         results: checks
      })
   }
}
