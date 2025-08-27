const TORCH_VERSION = "2.4.1";
const TORCHAUDIO_VERSION = "2.4.1";
function install(pkgs, index) {
  return `if command -v uv >/dev/null; then uv pip install ${pkgs}${index ? ' --index-url ' + index : ''}; else pip install ${pkgs}${index ? ' --index-url ' + index : ''}; fi`;
}

module.exports = {
  run: [
    // nvidia 50 series
    {
      "when": "{{gpu === 'nvidia' && kernel.gpu_model && / 50.+/.test(kernel.gpu_model) }}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": install("torch torchvision torchaudio", "https://download.pytorch.org/whl/cu128")
      },
      "next": null
    },
    // windows nvidia
    {
      "when": "{{platform === 'win32' && gpu === 'nvidia'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": install(`torch==${TORCH_VERSION} torchaudio==${TORCHAUDIO_VERSION} {{args && args.xformers ? 'xformers' : ''}}`, "https://download.pytorch.org/whl/cu121")
      }
    },
    // windows amd
    {
      "when": "{{platform === 'win32' && gpu === 'amd'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": install("torch-directml torchaudio numpy==1.26.4")
      }
    },
    // windows cpu
    {
      "when": "{{platform === 'win32' && (gpu !== 'nvidia' && gpu !== 'amd')}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": install(`torch==${TORCH_VERSION} torchaudio==${TORCHAUDIO_VERSION}`)
      }
    },
    // apple mac
    {
      "when": "{{platform === 'darwin' && arch === 'arm64'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": install(`torch==${TORCH_VERSION} torchaudio==${TORCHAUDIO_VERSION}`)
      }
    },
    // intel mac
    {
      "when": "{{platform === 'darwin' && arch !== 'arm64'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": install("torch==2.1.2 torchaudio==2.1.2")
      }
    },
    // linux nvidia
    {
      "when": "{{platform === 'linux' && gpu === 'nvidia'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": install(`torch==${TORCH_VERSION} torchaudio==${TORCHAUDIO_VERSION} {{args && args.xformers ? 'xformers' : ''}}`, "https://download.pytorch.org/whl/cu121")
      }
    },
    // linux rocm (amd)
    {
      "when": "{{platform === 'linux' && gpu === 'amd'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": install(`torch==${TORCH_VERSION} torchaudio==${TORCHAUDIO_VERSION}`, "https://download.pytorch.org/whl/rocm6.0")
      }
    },
    // linux cpu
    {
      "when": "{{platform === 'linux' && (gpu !== 'amd' && gpu !=='nvidia')}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": install(`torch==${TORCH_VERSION} torchaudio==${TORCHAUDIO_VERSION}`, "https://download.pytorch.org/whl/cpu")
      }
    }
  ]
}
