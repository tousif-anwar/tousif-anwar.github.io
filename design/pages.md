# Separate portfolio pages

Menu links navigate to real HTML documents: index.html, projects.html, experience.html, skills.html, about.html, videos.html, blog.html, contact.html.

The home page retains the intro and profile choice. Recruiters enter Experience; visitors enter Home. Other pages load directly and preserve the selected profile without replaying the intro. Header navigation identifies the current page. Breadcrumbs and the shared menu provide navigation between pages.

Author common HTML in site-template.html and run `node prepare-deploy.cjs` to rebuild and package all eight pages. build-pages.cjs uses the existing local linkedom dependency in .verification/node_modules. Only the current section renders in each page's main landmark. The shared interaction code retains other section data in an inert hidden support container for search and dialogs; that content does not create scroll sections. Do not edit generated pages directly.

Project links use projects.html?project=ID; related skills use skills.html?skill=ID; published articles use blog.html?post=SLUG. The public bundle excludes the authoring template, build scripts, drafts, installed development skills, and test dependencies.

Copy distinguishes confirmed employment outcomes, research scope, academic work, and incomplete personal-project documentation. No repository names, algorithms, datasets, or project results are inferred.
