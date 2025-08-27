# OpenAudio Pinokio Scripts

Automation scripts for installing and running the [Fish-Speech/OpenAudio](https://github.com/fishaudio/fish-speech) project in Pinokio.

## Installation
Run `install.js` from Pinokio. The script will:
- clone the upstream repository into `app`
- install `huggingface_hub` and `portaudio` using Conda when available (falls back to `pip`)
- install PyTorch through `torch.js`, selecting the proper build for your platform
- install project dependencies with `uv` when present, otherwise with `pip`
- download the default OpenAudio checkpoint

## Usage
After installation, launch the web UI with `start.js`. It executes `python tools/run_webui.py` inside the `env` virtual environment and selects the best device (CUDA, MPS or CPU).

Other maintenance scripts:
- `update.js` – pulls the latest code and refreshes Python dependencies
- `reset.js` – removes the `app` directory and its `env` virtual environment
- `link.js` – validates the environment before deduplicating libraries to save disk space

These scripts try to operate even when `conda` or `uv` are missing, providing basic fallbacks.
