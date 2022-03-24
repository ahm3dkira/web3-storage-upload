import minimist from 'minimist'
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import 'dotenv/config'

async function main () {
  const token = process.env.WEB3_STORAGE_TOKEN;
  const args = minimist(process.argv.slice(2))

  if (!token) {
    return console.error('A token is needed. You can create one on https://web3.storage')
  }

  if (args._.length < 1) {
    return console.error('Please supply the path to a file or directory')
  }

  const storage = new Web3Storage({ token })
  const files = []

  for (const path of args._) {
    const pathFiles = await getFilesFromPath(path)
    files.push(...pathFiles)
  }

  console.log(`// Uploading ${files.length} files`)
  const cid = await storage.put(files)
  let url_old = `https://${cid}.ipfs.dweb.link`
  let url = `https://ipfs.dweb.link/${cid}`

  files.map(file => file.url = `${url}${file.name}`)


  console.log(JSON.stringify(files, null, 2))
}

main()