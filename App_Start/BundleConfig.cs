using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Optimization;

namespace AlarmClock
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                "~/Scripts/jquery.unobtrusive*",
                "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
                "~/Scripts/knockout-{version}.js",
                "~/Scripts/knockout.validation.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/Scripts/sammy-{version}.js",
                "~/Scripts/app/common.js",
                "~/Scripts/app/app.datamodel.js",
                "~/Scripts/app/app.viewmodel.js",
                "~/Scripts/app/home.viewmodel.js",
                "~/Scripts/app/_run.js"));

            bundles.Add(
        new ScriptBundle("~/Scripts/vendor")
          .Include("~/Scripts/knockout-{version}.js")
          .Include("~/Scripts/knockout.dirtyFlag.js")
          .Include("~/Scripts/knockout.command.js")
          .Include("~/Scripts/knockout.mapping.js")
          .Include("~/Scripts/knockout.activity.js")
          .Include("~/Scripts/sammy-{version}.js")
          .Include("~/Scripts/wickedpicker.js")
          .Include("~/Scripts/custom.js")
          .Include("~/Scripts/moment.min.js")
          .Include("~/Scripts/materialize.min.js")
           .Include("~/Scripts/flipclock.min.js")
          .Include("~/Scripts/toastr.js"));


            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.js",
                "~/Scripts/respond.js"));


            bundles.Add(new StyleBundle("~/Content/css").Include(
                       "~/Content/toastr.css", "~/Content/font-awesome.min.css", "~/Content/wickedpicker.min.css", "~/Content/materialize.min.css", "~/Content/flipclock.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/jQuery-File-Upload").Include(
                "~/Content/jQuery.FileUpload/css/jquery.fileupload.css",
               "~/Content/jQuery.FileUpload/css/jquery.fileupload-ui.css",
               "~/Content/blueimp-gallery2/css/blueimp-gallery.css",
                 "~/Content/blueimp-gallery2/css/blueimp-gallery-video.css",
                   "~/Content/blueimp-gallery2/css/blueimp-gallery-indicator.css"
               ));

            bundles.Add(new ScriptBundle("~/bundles/jQuery-File-Upload").Include(
                     //<!-- The Templates plugin is included to render the upload/download listings -->
                     "~/Scripts/jQuery.FileUpload/vendor/jquery.ui.widget.js",
                       "~/Scripts/jQuery.FileUpload/tmpl.min.js",
//<!-- The Load Image plugin is included for the preview images and image resizing functionality -->
"~/Scripts/jQuery.FileUpload/load-image.all.min.js",
//<!-- The Canvas to Blob plugin is included for image resizing functionality -->
"~/Scripts/jQuery.FileUpload/canvas-to-blob.min.js",
//"~/Scripts/file-upload/jquery.blueimp-gallery.min.js",
//<!-- The Iframe Transport is required for browsers without support for XHR file uploads -->
"~/Scripts/jQuery.FileUpload/jquery.iframe-transport.js",
//<!-- The basic File Upload plugin -->
"~/Scripts/jQuery.FileUpload/jquery.fileupload.js",
//<!-- The File Upload processing plugin -->
"~/Scripts/jQuery.FileUpload/jquery.fileupload-process.js",
//<!-- The File Upload image preview & resize plugin -->
"~/Scripts/jQuery.FileUpload/jquery.fileupload-image.js",
//<!-- The File Upload audio preview plugin -->
"~/Scripts/jQuery.FileUpload/jquery.fileupload-audio.js",
//<!-- The File Upload video preview plugin -->
"~/Scripts/jQuery.FileUpload/jquery.fileupload-video.js",
//<!-- The File Upload validation plugin -->
"~/Scripts/jQuery.FileUpload/jquery.fileupload-validate.js",
//!-- The File Upload user interface plugin -->
"~/Scripts/jQuery.FileUpload/jquery.fileupload-ui.js",
//Blueimp Gallery 2 
"~/Scripts/blueimp-gallery2/js/blueimp-gallery.js",
"~/Scripts/blueimp-gallery2/js/blueimp-gallery-video.js",
"~/Scripts/blueimp-gallery2/js/blueimp-gallery-indicator.js",
"~/Scripts/blueimp-gallery2/js/jquery.blueimp-gallery.js"

));
        }
    }
}
