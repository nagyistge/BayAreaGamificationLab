
define([
	"/js/pages/concepts3/ArborGraphAlgos.js",
	"/js/pages/concepts3/LinkedList.js"
],function(
	ArborGraphAlgos,
	LinkedList
){
	var BreadcrumbsModel = function(model,content)
	{
		var that = {

			breadcrumbContainer: null,
			breadcrumbs: null,

			init: function(done)
			{
				model.ee.on("selectedNodeChanged", that.refresh);

				that.breadcrumbContainer = that.createBreadcrumbContainer();
				that.breadcrumbs = LinkedList();

				if (done)
					done();
			},

			refresh: function()
			{
				that.clearBreadcrumbs();

				var nodePath = ArborGraphAlgos.search(model.sys,model.gameNode,model.selectedNode);

				nodePath.forEach(function(node)
				{
					that.addBreadcrumbForNode(node);
				})
			},

			clearBreadcrumbs: function(breadcrumb)
			{
				that.breadcrumbs.walkFwd(function(breadcrumb)
				{
					breadcrumb.unbind("click",that.onBreadcrumbClicked);
					breadcrumb.remove();
				});

				that.breadcrumbs.empty();
			},

			addBreadcrumbForNode: function(node)
			{
				var breadcrumb = $("<a class='breadcrumb' href='#breadcrumb'>" + node.name + "</a>").appendTo(that.breadcrumbContainer);
				breadcrumb.bind("click",that.onBreadcrumbClicked);
				breadcrumb.data(node);

				that.breadcrumbs.append(breadcrumb);
			},

			onBreadcrumbClicked: function(e)
			{
				var breadcrumb = $(e.target);
				var node = breadcrumb.data();

				model.setValue("selectedNode",node);
			},

			createBreadcrumbContainer: function()
			{
				var container = $("<div class='breadcrumbContainer'></div>").appendTo(content);

				return container;
			}
		};

		return that;
	};

	return BreadcrumbsModel;
})