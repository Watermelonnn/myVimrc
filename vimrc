" ===================================================================
" Daniel 個人的 vimrc 設定
" 2015.11.01
" 
" ===================================================================
" Vundle 套件管理系統設定與初始化
" ===================================================================
set nocompatible                       " 必要設定
filetype off                           " 必要設定
set rtp+=~/.vim/bundle/vundle/         " 設定套件安裝路徑
call vundle#rc()                       " 開始管理套件
Plugin 'gmarik/vundle'                 " Vundle Base 套件
" 個人使用的套件放這裡 Start
" 個人使用的套件放這裡 End
call vundle#end()                      " 結束套件管理
filetype plugin on                     " 必要設定 
filetype plugin indent on              " 必要設定
" ===================================================================
" 編輯環境設定
" ===================================================================
" ==========
" 配色設定
" ==========
syntax enable                           " 開啟語法顏色支援
set background=dark                     " 設定背景為深色
colorscheme torte                       
" ==========
" 基本設定
" ========== 
set number                              " 顯示行號
set cmdheight=2                         " 設定狀態列行數
set textwidth=80                        " 每頁最大文字長度
set wrapmargin=80                       " 設定折行長度
set paste                               " 防止剪貼時位置不正確
set ruler                               " 狀態列顯示狀態
set showcmd                             " 在狀態列顯示目前執行指令
set showmode                            " 顯示目前模式
set history=50                          " 命令歷史紀錄檔紀錄長度
set autochdir                           " 自動切換成當前目錄
" ==========
" 游標控制
" ==========
set coursorline                         " 高亮度顯示當前列
set cursorcolumn                        " 高亮度顯示當前行
" ==========
" 縮排設定
" ========== 
set autoindent                          " 設定自動縮排
set cindent                             " 設定 C/C++ 縮排
set expandtab                           " 使用空白來取代 tab
set tabstop                             " 自訂縮排長度
set shiftwudth=2                        " 設定移動整行一次移動的寬度
set wrap
" ==========
" 關鍵字搜尋
" ==========
set ignorecase                          " 搜尋時不分大小寫 
set incsearch                           " 加強型搜尋功能
set hlsearch                            " 高亮度顯示搜尋關鍵字


" 這是寫入檔案時置放 EOL(end of line) 的形式
set ffs=unix,dos ff=unix

" powerline
set laststatus=2
set t_Co=256
python from powerline.vim import setup as powerline_setup
python powerline_setup()
python del powerline_setup