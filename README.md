# users

to start visit the link at the bottom of the About section then read the descriptions of the links found on the home page, where the link takes you, and click on the one that you want to use

# devs

to start download the code with git

to add a new page first create a new folder to contain all the apps pages, then go to
[./vite.config.js](./vite.config.js) and add all of the apps pages to build.rollupOptions.input

to view the site run [./auto recompile.py](./auto%20recompile.py), [./includes.ahk](./includes.ahk), or [./includes.exe](./includes.exe) if you dont have ahk installed, and

> npm run preview

to get the page served locally and have it be auto built when any file changes

inside the index.html file you should add

> <\!-- nav includes start --><\!-- nav includes end -->

and to have consistant styles that accept the user set color you should also include

> <\!-- main includes start --><\!-- main includes end -->

then press ^p / Ctrl+P to generate the included data

this will add the nav bar to the new html file

to have your file be included in the nav bar add

```
    a.newelem("a", {
      innerHTML: "${YOUR FOLDER NAME HERE}",
      href: "/multi-page-bundle-javascript-portfolio-for-school/${YOUR FOLDER NAME HERE}/",
    }),
```

to [./nav/nav.js](./nav/nav.js) right after the last call that looks the same, currently ~line 100

to add your link to the home page

do the same thing as above, but with [/index.html](/index.html) and this code

```
    <div>
      <a
        href="/multi-page-bundle-javascript-portfolio-for-school/${YOUR FOLDER NAME HERE}/"
        >${YOUR FOLDER NAME HERE}</a
      >
      <p>${YOUR PROJECT DESCRIPTION HERE}</p>
    </div>
```

to set your project as featured just replace my call to feature with

```
feature("${YOUR PROJECT NAME HERE}")
```
