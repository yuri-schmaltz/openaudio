module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: "git pull"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "git pull"
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "if command -v uv >/dev/null; then uv pip install -e .; else pip install -e .; fi",
          "if command -v uv >/dev/null; then uv pip install -U cachetools livekit==0.18.1 livekit-agents==0.12.1; else pip install -U cachetools livekit==0.18.1 livekit-agents==0.12.1; fi"
        ]
      }
    }
  ]
}
