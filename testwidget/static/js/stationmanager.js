var Station = function(name, wmanager)
{
	this.name = name;
	this.wmanager = wmanager;
};

var StationNode = function(station)
{
	this.next = null;
	this.station = station;
};

var StationManager = function()
{
	this.stations = null;
};
StationManager.prototype.addStation = function(station)
{
	if (this.stations === null)
	{
		this.stations = new StationNode(station);
		return true;
	}
	else
	{
		var cur = this.stations;
		var prev;
		while (cur)
		{
			if (cur.station.name === station.name)
				return false;
			prev = cur;
			cur = cur.next;
		}
		prev.next = new StationNode(station);
		return true;
	}
};
StationManager.prototype.removeStation = function(station)
{
	var cur = this.stations;
	var prev = null;
	while (cur)
	{
		if (cur.station.name === station.name)
		{
			if (prev === null)
			{
				this.stations = cur.next;
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
StationManager.prototype.getStationByName = function(name)
{
	var cur = this.stations;
	while (cur)
	{
		if (cur.station.name === name) { return cur.station; }
		else { cur = cur.next; }
	}
	return null;
};
StationManager.prototype.exportStations = function()
{
	var stats = {};
	var cur = this.stations;
	while (cur)
	{
		stats[cur.station.name] = cur.station.wmanager.exportFields();
		cur = cur.next;
	}
	return stats;
};
