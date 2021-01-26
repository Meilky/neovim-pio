noremap <C-p> Npio<CR>

command! Npio :call NPIO('neovim-pio.py')<CR>

function! NPIO(filePath)
	let file=a:filePath
	vsplit
	term python3 string(file)
	normal i
endfunction
