# Triangle Comments

Triangle comments is the simplest way to add comments to your static website. Simply define your API key and Site ID from Netlify, and you can add comments to any page on your website 🎉

***Important:** Currently, Triangle only works with Gatsby and Netlify, but support for other SSGs and hosting providers will be added in the future. If you have any questions or need assistance, you can [contact us](https://github.com/jarodpeachey/triangle-comments#support)*

### Table of Contents

 - [🚀 Getting Started](https://github.com/jarodpeachey/triangle-comments#getting-started)
	 - [Setting Up Your Website](https://github.com/jarodpeachey/triangle-comments#setting-up-your-website)
	 - [Installing Packages](https://github.com/jarodpeachey/triangle-comments#installing-packages)	 
	 - [Configuration](https://github.com/jarodpeachey/triangle-comments#configuration)
 - [💬 Adding Comment Functionality](https://github.com/jarodpeachey/triangle-comments#adding-comment-functionality)
	 - [Adding a Form](https://github.com/jarodpeachey/triangle-comments#adding-a-form)
	 - [Displaying Your Comments](https://github.com/jarodpeachey/triangle-comments#displaying-your-comments)
- [🎨 Custom Configuration](https://github.com/jarodpeachey/triangle-comments#custom-configuration) 

## Getting Started

### Setting up your website

Triangle only works with Netlify, so you need to make sure you have your site hosted on Netlify. If you don't, you can follow the instructions [here](https://www.netlify.com/blog/2016/10/27/a-step-by-step-guide-deploying-a-static-site-or-single-page-app/).

Once your site is hosted on Netlify, you can continue below.

### Installing Packages

To get started, just install `triangle-comments` and the Gatsby plugin, `gatsby-plugin-triangle-comments`.

**Using NPM:**

```
npm install --save triangle-comments gatsby-plugin-triangle-comments
```

**Using Yarn:**

```
yarn add triangle-comments gatsby-plugin-triangle-comments
```

### Configuration

In order to use Triange with Gatsby, you need to add the plugin to your `gatsby-config.js` file at the root of your project.

```
module.exports = {
	...,
	plugins: [
		...,
		{
			resolve: 'gatsby-plugin-triangle-comments',
			options: {
				...
			},
		}
	]
}
```

After updating your `gatsby-config.js` file, you need to add a few options to the configuration in order for Triangle to work.

First, you need a Netlify site ID. This can be found from your Netlify site dashboard by visiting **Settings > General > Site details > Site information**. Copy the value for **API ID** and store it in your environment variables as NETLIFY_SITE_ID. Then, use the environment variable as the value for the `siteID` options in `gatsby-config.js`

```
options: {
	...,
	siteID: process.env.NETLIFY_SITE_ID
}
```

The second mandatory value in the options object is the `apiKey`. This must be created manually in Netlify. Visit your **User Settings > Applications** at this link: [(Personal Access Tokens)](https://app.netlify.com/user/applications#personal-access-tokens)

Click "New Access Token" and follow the steps to generate a new API token. Copy this value and store it in your environment variables as `NETLIFY_TOKEN`. Then, update your options configuration in `gatsby-config.js` to use this new value.

```
options: {
	...,
	siteID: process.env.NETLIFY_SITE_ID,
	apiKey: process.env.NETLIFY_TOKEN
}
```

## Adding Comment Functionality

Triangle is set up to automatically filter all comments by page and only display the ones for that page. This means that you can have as many comment forms as you'd like on your site.

Triangle comes with 2 main components: `Form` and `Comments`. `Form` is the comment form, while `Comments` is the component that displays your comments (go figure 🤷‍♂️)

### Adding a Form

To add a comment form to your page, just import it

```
import { Form } from 'triangle-comments';
```

and add it wherever you please

```
<Form />
```

<!-- This form can be customized, but we'll get to that later. First, you have to display your comments somewhere! -->

### Displaying Your Comments

To display your comments, simply import the Comments compoment

```
import { Comments } from 'triangle-comments';
```

and add it wherever you'd like. Usually, this would be directly below the `Form`

```
<Form />
<Comments />
```

## Custom Configuration

Because everyone likes to do things their own way.

Triangle allows you to customize the stlying of your Form and your Comments components. Simply change the color value in `gatsby-config.js` to match Triangle to the theme of your website.

```
options: {
	...,
	color: "#2e35cd"
}
```

As of now, that's the only styling option, but support for custom CSS and styling of the inputs, buttons and comment display is coming soon. Stay tuned!

## Support

Triangle is currently in beta stages, and is constantly evolving and improving. If you have an questions or need help setting up Triangle, you can open an issue on [Github](https://github.com/jarodpeachey/triangle-comments/issues) or email us at trianglecomments@gmail.com
