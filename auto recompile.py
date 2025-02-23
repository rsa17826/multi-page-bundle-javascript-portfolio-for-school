import os
import subprocess
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from threading import Timer
from misc import print


class ChangeHandler(FileSystemEventHandler):
    def __init__(self):
        self.process = None
        self.debounce_timer = None
        self.debounce_time = 2

    def on_any_event(self, event):
        if (
            "docs" in event.src_path
            or "node_modules" in event.src_path
            or ".git" in event.src_path
        ):
            return
        print(event)

        if event.event_type in ["modified", "created", "deleted"]:
            print(f"Change detected: {event.src_path}")
            if self.debounce_timer is not None:
                self.debounce_timer.cancel()

            self.debounce_timer = Timer(self.debounce_time, self.build)
            self.debounce_timer.start()

    def build(self):
        print("Starting new process...")
        self.process = subprocess.Popen(
            ["cmd.exe", "/c", "npm run build"],
            shell=True,
        )


#   git add . ; git commit -m "removed unused css styles and added a sitewide color picker to allow changing global site colors" ; git push

path = os.path.dirname(os.path.abspath(__file__))
event_handler = ChangeHandler()
observer = Observer()
observer.schedule(event_handler, path, recursive=True)
event_handler.build()
print(f"Watching for changes in: {path}")
observer.start()

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    observer.stop()
observer.join()
