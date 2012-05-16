var Widget = function()
{
	this.name;
	this.fields = [];
};
Widget.prototype.addField = function(field)
{
	var i = 0;
	for(; i < this.fields.length; ++i)
	{
		if(this.fields[i] == field)
		{
			return;
		}
	}
	this.fields[this.fields.length]=field;
};

var WidgetNode = function(widget)
{
	this.next = null;
	this.widget = widget;
};

var WidgetManager = function()
{
	this.fields = []; //not sure if we'll be using this
	this.widgets = null; //a linked list of widgets
};
WidgetManager.prototype.addWidget = function(widget)
{
	if (this.widgets === null)
	{
		this.widgets = new WidgetNode(widget);
		return true;
	}
	else
	{
		var cur = this.widgets;
		var prev;
		while (cur)
		{
			if (cur.widget.name === widget.name)
				return false;
			prev = cur;
			cur = cur.next;
		}
		prev.next = new WidgetNode(widget);
		return true;
	}
};
WidgetManager.prototype.removeWidget = function(widget)
{
	var cur = this.widgets;
	var prev = null;
	while (cur)
	{
		if (cur.widget.name === widget.name)
		{
			if (prev === null)
			{
				this.widgets = cur.next;
			}
			else
			{
				prev.next = cur.next;
			}
			return true;
		}
		prev = cur;
		cur = cur.next;
	}
	return false;
};
WidgetManager.prototype.getWidgetByName = function(name)
{
	var cur = this.widgets;
	while (cur)
	{
		if (cur.widget.name === name) { return cur.widget; }
		else { cur = cur.next; }
	}
	return null;
};
WidgetManager.prototype.exportFields = function()
{
	var fields = [];
	var i = 0;
	var cur = this.widgets;
	while (cur)
	{
		var j;
		for (j = 0; j < cur.widget.fields.length; ++i, ++j)
		{
			fields[i] = cur.widget.fields[j];
		}
		cur = cur.next;
	}
	return fields;
};
