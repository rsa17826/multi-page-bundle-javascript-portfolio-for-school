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
            self.reset_debounce_timer()

    def reset_debounce_timer(self):
        # Cancel the previous timer if it exists
        if self.debounce_timer is not None:
            self.debounce_timer.cancel()

        # Start a new timer
        self.debounce_timer = Timer(self.debounce_time, self.restart_process)
        self.debounce_timer.start()

    def restart_process(self):

        # Start the new process
        print("Starting new process...")
        self.process = subprocess.Popen(
            ["cmd.exe", "/c", "npm run build"],
            shell=True,
            # stdout=subprocess.PIPE,
            # stderr=subprocess.PIPE,
        )  

  # git add .
  # git commit -m "starting to add nav bar"
  # git push
#   git add . ; git commit -m "starting to add nav bar" ; git push

def main():
    path = os.path.dirname(
        os.path.abspath(__file__)
    )  # Watch the directory of the script
    event_handler = ChangeHandler()
    observer = Observer()
    observer.schedule(event_handler, path, recursive=True)
    event_handler.restart_process()
    print(f"Watching for changes in: {path}")
    observer.start()

    try:
        while True:
            time.sleep(1)  # Keep the script running
    except KeyboardInterrupt:
        observer.stop()
    observer.join()


if __name__ == "__main__":
    main()
