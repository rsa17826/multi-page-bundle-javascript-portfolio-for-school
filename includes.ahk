#Requires AutoHotkey v2.0
#SingleInstance Force

#Include *i <AutoThemed>

try TraySetIcon("icon.ico")
SetWorkingDir(A_ScriptDir)
#Include *i <vars>

#Include <Misc>

#HotIf WinActive('ahk_exe VSCodium.exe')
  ^p::{
    loop files A_WorkingDir '/*.html', "rf" {
      p := path.info(A_LoopFileFullPath).abspath
      if p.includes('/docs/')
        continue
      start := text := f.read(p)
      rep(&text, "nav", '
      (
        <link
          rel="icon"
          type="image/x-icon"
          href="/multi-page-bundle-javascript/imgs/mainlogo.png"
        />
        <link rel="stylesheet" href="/multi-page-bundle-javascript/styles/root.css" />
        <link rel="stylesheet" href="/multi-page-bundle-javascript/nav/nav.css" />
        <script src="/multi-page-bundle-javascript/js globals/libloader.js"></script>
        <script src="/multi-page-bundle-javascript/js globals/allfuncs.js"></script>
        <script src="/multi-page-bundle-javascript/nav/nav.js"></script>
        <script src="/multi-page-bundle-javascript/js globals/live.js"></script>
      )')
      rep(&text, "main", '<link rel="stylesheet" href="/multi-page-bundle-javascript/styles/main.css" />')
      f.write(p, text)
    }
    rep(&text, key, val) {
      return text := text.RegExReplace("(?<=<!-- " key " includes start -->)[\s\S]*(?=<!-- " key " includes end -->)", val.RegExReplace(" *`n *(?!\w)", '').RegExReplace(" {2,}", " "))
    }
  }
