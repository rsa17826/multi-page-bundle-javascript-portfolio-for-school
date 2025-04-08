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
          href="/multi-page-bundle-javascript-portfolio-for-school/imgs/mainlogo.png"
        />
        <link rel="stylesheet" href="/multi-page-bundle-javascript-portfolio-for-school/styles/root.css" />
        <script src="/multi-page-bundle-javascript-portfolio-for-school/js globals/libloader.user.js"></script>
        <script src="/multi-page-bundle-javascript-portfolio-for-school/js globals/allfuncs.user.js"></script>
        <script src="/multi-page-bundle-javascript-portfolio-for-school/nav/nav.js"></script>
        <script src="/multi-page-bundle-javascript-portfolio-for-school/js globals/live.js"></script>
      )')
      rep(&text, "main", '<link rel="stylesheet" href="/multi-page-bundle-javascript-portfolio-for-school/styles/main.css" />')
      f.write(p, text.includes('html lang="en"') ? text : "
      (
        
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1"
    />
    <meta name="description" content="main page" />
  </head>
)" text "</html>")
    }
    rep(&text, key, val) {
      return text := text.RegExReplace("(?<=<!-- " key " includes start -->)[\s\S]*(?=<!-- " key " includes end -->)", val.RegExReplace(" *`n *(?!\w)", '').RegExReplace(" {2,}", " "))
    }
  }
