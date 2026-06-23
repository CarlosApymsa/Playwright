const { spawn } = require("node:child_process")

(async ()=>{
const chrome = spawn (
    `"C:/Program Files/Google/Chrome/Application/chrome.exe"`,
    ["--remote-debugging-port=9222"],
    {shell:true}
)

await new promise (r => setTimeout(r, 3_000))

const browser = await chrome.connectOverCDP ("http://localhost:9222")
const defaultContext = browser.contexts ()[0]
const page = defaultContext.pages()[0]

await page.goto ("https://www.linkedin.com/mynetwork/grow/")

})
()

/* ejecutar en consola
node Add-linkedin-contacts */