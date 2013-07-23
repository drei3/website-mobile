// Object View
// =============

// Includes file dependencies
define([ "jquery", 
         "backbone",
         "models/ObjectModel",
         "views/WidgetsPanelView",
         "views/WidgetsAreaView" ], 

    function( $, Backbone, ObjectModel, WidgetsPanelView, WidgetsAreaView ) {

        // Extends Backbone.View
        var ObjectView = Backbone.View.extend( {

            // The View Constructor
            initialize: function() {

                var self = this;

                this.model = new ObjectModel();
                this.model.parent = this;

                this.panelView = new WidgetsPanelView();
                this.panelView.parent = this;

                this.areaView = new WidgetsAreaView();
                this.areaView.parent = this;

                this.model.widgets.on("reset", this.reset, this);

                this.model.on("change:id", this.changeObject, this);

                // Bind event to open the panel
                this.$el.find('#openPanelButton').on("vclick", function() {

                    self.panelView.$el.panel('open');
                } );

                this.panelView.$el.find('ul').on("click", "li", function() {

                    var widgetName = $(this)[0].id.split('-')[0];

                    // find the widget in the collection
                    var widget = self.model.widgets.find( function(widget) { 
                        return widget.get('widgetName') == widgetName; 
                    } );

                    self.toggleVisibility(widget);

                } );
            },

            el: "#object-page",

            toggleVisibility: function(widget) {    

                widget.set( {visible: !widget.get('visible') } );
            },

            el: "#object-page",

            changeObject: function() {

                $.mobile.loading("show");

                this.model.widgets.fetch({

                    reset: true,

                    success: function() {

                        $.mobile.loading('hide');

                        $.mobile.changePage("#object-page", { reverse: false, changeHash: false } );
                    },

                    error: function() {
                        alert('error');
                    }
                });

            },

            // renders options on the panel and placeholders on the areaview
            render: function() {

                this.panelView.render();
                this.areaView.render();

                return this;
            },

            reset: function() {

                this.panelView.reset();
                this.areaView.reset();

                this.render();
            }
  
        } );

        // Returns the View class
        return ObjectView;

    } 
);