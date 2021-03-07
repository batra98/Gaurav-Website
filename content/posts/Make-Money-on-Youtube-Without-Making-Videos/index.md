---
title: Make Money on Youtube Without Making Videos
description: In this blog, I will showcase a simple way of making infinite videos using Google Trends and Flourish Studio
date: '2021-02-01'
draft: false
slug: '/pensieve/make-money-on-youtube-without-making-videos'
tags:
  - Data Visualization
---

You must have seen tones of videos on youtube similar to the one shown below:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/0YCPh2fv0HQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

At the time of this blog post, this video has \~1 million views and it shows some data scrapped elegantly. In this post, I will explain how one can make such amazing vizualizations using [Flourish](https://flourish.studio/).

<details>
	<summary>Note</summary>
	I kept such a title only because it seemed catchy. I am not sure if one can actually monetize such videos. (Bump!)
</details>

### Get the data

In order to plot data, we need data (duh!). So, we will use [Google Trends](https://trends.google.com/trends/?geo=US) to get our data using its api. One limitation of this approach is that only five requests are allowed at one time, but fret not I have written a short script that solves this problem. Also, google trends does not give exact values but relative scaled values, so we need to all the components using one of them as a reference.

<iframe 
    width="100%"
    height="545"    
    src="data:text/html;charset=utf-8,
    <head><base target='_blank' /></head>
    <body><script src='https://gist.github.com/batra98/d566f7352d6de43eb506126b384902ff.js'></script></script>
    </body>"></iframe>

This script will generate a `sample.csv` containing the relevant data, you can also insert images as a list.

Finally, insert this data in flourish and see the magic.

## Flourish Bar Race

<iframe src='https://flo.uri.sh/visualisation/5201246/embed' title='Interactive or visual content' frameborder='0' scrolling='no' style='width:100%;height:800px;border: 3px solid green;' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe><div style='width:100%!;margin-top:4px!important;text-align:right!important;'><a class='flourish-credit' href='https://public.flourish.studio/visualisation/5201246/?utm_source=embed&utm_campaign=visualisation/5201246' target='_top' style='text-decoration:none!important'><img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'> </a></div>

This is highly customizable.

## Flourish Line Race

If you are bored by seeing bar races, what about a line race?

<iframe src='https://flo.uri.sh/visualisation/5200896/embed' title='Interactive or visual content' frameborder='0' scrolling='no' style='width:100%;height:700px;border: 3px solid green;' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe><div style='width:100%!;margin-top:4px!important;text-align:right!important;'><a class='flourish-credit' href='https://public.flourish.studio/visualisation/5200896/?utm_source=embed&utm_campaign=visualisation/5200896' target='_top' style='text-decoration:none!important'><img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'> </a></div>

It is as easy as this to get a lott of views on Youtube. Enjoy!
