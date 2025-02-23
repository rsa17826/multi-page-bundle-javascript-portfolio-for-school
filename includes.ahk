#Requires AutoHotkey v2.0
#SingleInstance Force

#Include *i <AutoThemed>

try TraySetIcon("icon.ico")
SetWorkingDir(A_ScriptDir)
#Include *i <vars>

#Include <Misc>

#Include *i <betterui> ; betterui

#Include *i <textfind> ; FindText, setSpeed, doClick

; #Include *i <CMD> ; CMD - cmd.exe - broken?


::includes::{
  lc := A_Clipboard
  A_Clipboard := '
  (
    <link rel="stylesheet" href="/multi-page-bundle/styles/root.css" />
<link rel="stylesheet" href="/multi-page-bundle/nav/nav.css" />
<script src="/multi-page-bundle/js globals/libloader.js"></script>
<script src="/multi-page-bundle/js globals/allfuncs.js"></script>
<script src="/multi-page-bundle/nav/nav.js"></script>
<script src="/multi-page-bundle/js globals/live.js"></script>
  )'
  send("^v")
  A_Clipboard := lc
}
