function slugify(text){
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\u0100-\uFFFF\w\-]/g,'-') // Remove all non-word chars ( fix for UTF-8 chars )
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

function returntext(newurl,text){
    var return_text = "<strong><a href="+ newurl +">" + text + "</a></strong>";
    return return_text;
}

function newurl(text,url){

                var href = url;
                var index = href.indexOf('/wp-content/plugins/EasyTag/js');
                var homeUrl = href.substring(0, index);
                var sel = slugify(text);
                var newurl = homeUrl + "/tag/"+sel;
                return newurl;
}

function correcturl(url){

                var href = url;
                var index = href.indexOf('/js');
                var homeUrl = href.substring(0, index);
                return homeUrl;
}

(function() {
    tinymce.create("tinymce.plugins.easytag_plugin", {

        //url argument holds the absolute url of our plugin directory
        init : function(ed, url) {

            //add new button     
            ed.addButton("easytag", {
                title : "Easy Tags",
                cmd : "easytag_command",
                image : correcturl(url)+"/img/tag.png"
            });

            //button functionality.
            ed.addCommand("easytag_command", function() {
                var selected_text = ed.selection.getContent();
                
                
                ed.windowManager.open( {
                title: 'Insert URL tag',
                body: [{
                    type: 'textbox',
                    name: 'title',
                    value  : newurl(selected_text,url),
                    minWidth: 700,
                    minHeight: 50,
                }],
                onsubmit: function( e ) {
                    ed.execCommand("mceInsertContent", 0, returntext(e.data.title,selected_text));
                }
            });
            });

        },

        createControl : function(n, cm) {
            return null;
        },

        getInfo : function() {
            return {
                longname : "Easy Tags",
                author : "Adedoja Dami",
                version : "1"
            };
        }
    });

    tinymce.PluginManager.add("easytag_plugin", tinymce.plugins.easytag_plugin);
})();