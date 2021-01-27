noremap <C-p>Npio<CR>

command! Npio :call NPIO('../build/index.js')<CR>

let s:plugindir = expand('<sfile>:p:h:h')

function! NPIO(filePath)
	vsplit
	execute "term node "." ".s:plugindir."/".a:filePath
	normal i
endfunction
