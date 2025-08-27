module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/fishaudio/fish-speech app",
          //"git clone https://huggingface.co/spaces/cocktailpeanut/fish-speech-1 app",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        message: "if command -v conda >/dev/null; then conda install -y -c conda-forge huggingface_hub portaudio; else pip install huggingface_hub portaudio; fi"
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          // xformers: true   // uncomment this line if your project requires xformers
        }
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          //"pip install -r requirements.txt"
          "if command -v uv >/dev/null; then uv pip install -e .; else pip install -e .; fi",
          "if command -v uv >/dev/null; then uv pip install cachetools livekit==0.18.1 livekit-agents==0.12.1; else pip install cachetools livekit==0.18.1 livekit-agents==0.12.1; fi"
        ]
      }
    },
//    {
//      method: "hf.download",
//      params: {
//        path: "app/tools",
//        "_": [ "cocktailpeanut/f15" ],
//        "local-dir": "checkpoints/fish-speech-1.5"
//      }
//    },
    {
      method: "hf.download",
      params: {
        path: "app/tools",
        "_": [ "cocktailpeanut/oa" ],
        "local-dir": "checkpoints/openaudio-s1-mini"
      }
    }
  ]
}
