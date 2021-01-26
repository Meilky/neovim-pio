nmap <C-p> :Npio<CR>

command Npio :call npio#NPIO('./neovim-pio.py')<CR>

function! npio#NPIO(file)
	:vsplit
	:term python3 file 
	:normal i
endfunction
