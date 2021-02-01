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

Npio is a command that you can call with the path to the current directory, the name of the ini config file and the options your want to run.

```vim
:call Npio(expand("%:p:h"), "platformio.ini", "3 2 1")
```

1.) expand() = Function that parse the path

2.) %:p = Current working directory

3.) :h = Remove last element from path (exemple: "/joe/bloe" -> "/joe")

4.) "platformio.ini" = Platformio project config file

5.) "3 1 0" = all the menu to execute (exemple: "3 1 0" will select the option 1, after the option 2, etc ... )
