module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: "if [ ! -d app/env ]; then echo 'environment not found'; exit 1; fi"
      }
    },
    {
      method: "fs.link",
      params: {
        venv: "app/env"
      }
    }
  ]
}
