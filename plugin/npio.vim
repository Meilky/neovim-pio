noremap <C-p> Npio<CR>

command! Npio :call NPIO('neovim-pio.py')<CR>

function! NPIO(file)
	vsplit
	term python3 file 
	normal i
endfunction
