WordPress theme setup and configuration with _s(underscores), Bootstrap 3.0 (Bootstrap SASS https://github.com/twbs/bootstrap-sass), Grunt and wp_bootstrap_navwalker (wp-bootstrap-navwalker https://github.com/twittem/wp-bootstrap-navwalker)


### Requirements / Assumptions
* Node >= 0.8 (https://nodejs.org/)
* NPM version >= 1.4.21 (https://github.com/npm/npm)
* Grunt >= 0.4.0 (https://github.com/gruntjs/grunt)
* Grunt Compass requires, Ruby, Sass and Compass >=1.0.1 (https://github.com/gruntjs/grunt-contrib-compass)
* Access to a Wordpress development site on your local machine 


This task requires you to have Ruby, Sass, and Compass >=1.0.1 installed. If you're on OS X or Linux you probably already have Ruby installed; test with ruby -v in your terminal. When you've confirmed you have Ruby installed, run gem update --system && gem install compass to install Compass and Sass.

## The Purpose of WPBS - Grunt
This file automates the process of adding Bootstrap to a Wordpress theme. It creates a new Wordpress theme based off _s (Underscore), downloads a copy of Bootstrap Sass and Wp Nav Walker. It adds Bootstrap to the new theme along with a basic Grunt file so you can get your project going quickly. 

## Getting Started

### Step 1.
Create a temporary directory to build the theme in.

` $ mkdir dir mynewtheme`

` $cd mynewtheme`

` $ git clone https://github.com/tedgeving/wpbs-grunt.git`

` $ npm install `

` $ grunt `

Answer some questions. The theme is built in a new directory named after the value entered in the first question. The default directory is _s. The theme name needs to be one word all lower case. The input does not have validation or slugify the theme name.

If everything worked correctly you should see the following output in the terminal:

` Created 9 directories, copied 106 files `


### Step 2.

Copy the new theme to your development environment. 

In the theme directory run the following commands from the terminal:

`$ npm install`

` $ grunt `

Open a your text editor and save the file "aasets/styles.scss". This will generate a new style sheet in the root of the theme, "styles.css" which now includes bootstrap and any customs styles added to it. Login to the Worpdress install and activate the theme.  It should look like the default bootstrap files are applied.  

Also I highly recommend overriding all bootstrap variables in "assets/_bootstrap_variables.scss" instead of the core files. It makes it easier to update the framework and keep track of customizations. 

It is possible to customize Bootstrap by including only the components that are needed. Comment out modules in "assets/sylessheets/_bootstrap.scsss" that are not needed.

### Step 3.

Extra Configuration

Add the following snippet to functions.php 

Enque Bootstraps JS

    wp_enqueue_script( '{mythemename}', get_template_directory_uri() . '/assets/javascripts/bootstrap.min.js', array('jquery'), '20120208', true );


Enable live reload

    if (in_array($_SERVER['SERVER_ADDR'], ['127.0.0.1', '192.168.50.4']) || pathinfo($_SERVER['SERVER_NAME'], PATHINFO_EXTENSION) == 'dev') {
        wp_enqueue_script( 'livereload', '//localhost:35729/livereload.js', '', false, true );
}`


Documentation for the nav walker class, useful for building default bootstrap navigation bar from a WP Menu.
https://github.com/twittem/wp-bootstrap-navwalker




