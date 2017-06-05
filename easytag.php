<?php

/*
Plugin Name: Easy Tag for Wordpress Blogs
Plugin URI: http://thewebcrate.co.com
Description: Automatically links text to tags.
Author: Adedoja Dami
*/

function enqueue_plugin_scripts($plugin_array)
{
    //enqueue TinyMCE plugin script with its ID.
    $plugin_array["easytag_plugin"] =  plugin_dir_url(__FILE__) . "/js/index.js";
    return $plugin_array;
}


function register_buttons_editor($buttons)
{
    //register buttons with their id.
    array_push($buttons, "easytag");
    return $buttons;
}

add_action( 'init', 'tiny_mce_new_buttons' );

function tiny_mce_new_buttons() {
  add_filter("mce_external_plugins", "enqueue_plugin_scripts");
  add_filter("mce_buttons", "register_buttons_editor");
}

