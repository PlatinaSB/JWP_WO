# how to use

## clone this repo

```bash
git clone //this repo
```

## install node.js and Bun

### nodejs

Windows 10/11 using [chocolatey](https://chocolatey.org/install)

```powershell
choco install nodejs
```

MacOS

```bash
brew install node
```

Linux apt

```bash
sudo apt install nodejs
```

Linux Pacman (ARCH)

```bash
pacman -S nodejs npm
```

### bun

Windows

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

MacOS/Linux

```bash
curl -fsSL https://bun.sh/install | bash
```

## Install all the node module

```bash
bun install
```

## Development

**don't forget to setup .env by copying .env.example and name it to .env and set it up**

### run both

```bash
bun run dev
```

### run api server

```bash
bun run dev:api
```

### run frontend

```bash
bun run dev:front
```

## Build

not yet 🙃
