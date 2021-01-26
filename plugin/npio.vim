noremap <C-p>Npio<CR>

command! Npio :call NPIO('neovim-pio.py')<CR>

function! NPIO(filePath)
	vsplit
	execute "term python3"+ " " + string(a:filePath)
	normal i
endfunction
