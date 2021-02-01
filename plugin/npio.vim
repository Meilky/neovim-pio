noremap <C-p> Npio<CR>

command! Npio :NPIO(expand("%:p:h"),"platformio.ini","1")<CR>

let s:plugindir = expand('<sfile>:p:h:h')

function! NPIO(workingdir, filename, opts)
	let s:currentdir = expand("%:p:h")
	vsplit
	execute "term node "." ".s:plugindir."/build/index.js ".a:workingdir." ".a:filename." ".a:opts
	normal i
endfunction
