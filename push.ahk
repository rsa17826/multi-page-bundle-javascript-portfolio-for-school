#Requires AutoHotkey v2.0
#SingleInstance Force

#Include *i <AutoThemed>
#Include <admin>

try TraySetIcon("icon.ico")
SetWorkingDir(A_ScriptDir)
#Include *i <vars>

#Include <Misc>
#Include <base>

getcmd(opts := '') {
  cmds := WinGetList("ahk_exe cmd.exe")
  if opts.includes("hide")
    DetectHiddenWindows(1)
  run("cmd.exe", , opts)
  while 1 {
    cmd := (newlist := WinGetList("ahk_exe cmd.exe")).find(e => !cmds.includes(e))
    if cmd {
      return newlist[cmd]
    }
  }
}
msg := input("message", '', , , '').replace("\", '\\').replace('"', '\"')
if !msg
  return
cmd := getcmd('hide')
ControlSend('git add . {enter} git commit -m "', , cmd)
ControlSendText(msg '"', , cmd)
ControlSend('{enter}', , cmd)
Sleep(1000)
ControlSend(envget("gitpass"), , cmd)
ControlSend('{enter}git push{enter}', , cmd)
Sleep(1000)
ControlSend(envget("gitpass"), , cmd)
ControlSend('{enter}', , cmd)
Sleep(7000)
WinClose(cmd)