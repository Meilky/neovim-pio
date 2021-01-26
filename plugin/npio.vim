noremap <C-p>Npio<CR>

command! Npio :call NPIO('neovim-pio.py')<CR>

let s:plugindir = expand('<sfile>:p:h:h')

function! NPIO(filePath)
	vsplit
	execute "term python3"." ".s:plugindir."/".a:filePath
	normal i
endfunction
