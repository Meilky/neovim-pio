noremap <C-p>:Npio<CR>

command! Npio pwd<CR>

let s:plugindir = expand('<sfile>:p:h:h')

function! NPIO(filePath)
	vsplit
	execute "term node "." ".s:plugindir."/".a:filePath
	normal i
endfunction
