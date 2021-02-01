# Npio

 - [Installation](#Installation)
  - [Plugged](#Plugged)

Npio is a (neo)vim plugin that wrap the [Platformio cli](https://docs.platformio.org/en/latest/core/index.html).
It's build to help you with your daily arduino programing journey.

## Installation

### Plugged

To intall Npio with plugged, you need to add this line in your vimrc :

```vim
call plug#begin()
	Plug 'Meilky/npio', { do: "npm i && npm run build" }
call plug#end()
```

## Usage

Npio is a command that you can call with the path to the current directorie and the name of the ini config file from pio

```vim
:Npio(expand("%:p:h"),"platformio.ini")
```
