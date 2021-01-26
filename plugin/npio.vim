noremap <C-p> :call Npio<CR>

command Npio :call npio#NPIO('./neovim-pio.py')<CR>

function! npio#NPIO(file)
	:vsplit
	:term pwd 
	:normal i
endfunction
