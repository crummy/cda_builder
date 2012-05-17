var DemoWidget = function()
{
	var DWidget = new Widget();
	DWidget.name = "DName";
	DWidget.addField("Placeholder Text 1");
	DWidget.addField("Placeholder Text 2");
	DWidget.addField("Placeholder Text 3");
	
	return DWidget;
};

var Widget_BasicInfo = function()
{
	var DWidget = new Widget();
	DWidget.name = "Basic Information";
	DWidget.addField("Age");
	DWidget.addField("Weight");
	DWidget.addField("Height");
	
	return DWidget;
};

var Widget_PresentIllness = function()
{
	var DWidget = new Widget();
	DWidget.name = "Present Illness";
	DWidget.addField("Malaria");
	DWidget.addField("AIDS");
	
	return DWidget;
};

var Widget_PastMedicalHistory = function()
{
	var DWidget = new Widget();
	DWidget.name = "Past Medical History";
	DWidget.addField("Asthma");
	DWidget.addField("Hypertension");
	DWidget.addField("Osteoarthritis");
	
	return DWidget;
};

var Widget_Medications = function()
{
	var DWidget = new Widget();
	DWidget.name = "Medications";
	DWidget.addField("Theodur");
	DWidget.addField("Proventil");
	DWidget.addField("Prednisone");
	DWidget.addField("HCTZ");
	
	return DWidget;
};

var Widget_Allergies = function()
{
	var DWidget = new Widget();
	DWidget.name = "Allergies";
	DWidget.addField("Penicillin");
	DWidget.addField("Aspirin");
	DWidget.addField("Latex");
	
	return DWidget;
};

var Widget_SocialHistory = function()
{
	var DWidget = new Widget();
	DWidget.name = "Social History";
	DWidget.addField("Smoking");
	DWidget.addField("Alcohol");
	
	return DWidget;
};

var Widget_PhysicalExam = function()
{
	var DWidget = new Widget();
	DWidget.name = "Physical Exam";
	DWidget.addField("Skin");
	DWidget.addField("Lungs");
	DWidget.addField("Cardiac");
	
	return DWidget;
};


var Widget_Labs = function()
{
	var DWidget = new Widget();
	DWidget.name = "Labs";
	DWidget.addField("Lab Reports Field");
	
	return DWidget;
};

var Widget_Assessment = function()
{
	var DWidget = new Widget();
	DWidget.name = "Assessment";
	DWidget.addField("Assessment Field");
	
	return DWidget;
};

var Widget_Plan = function()
{
	var DWidget = new Widget();
	DWidget.name = "Plan";
	DWidget.addField("Plan Field");	
	return DWidget;
};

var Widget_Signed = function()
{
	var DWidget = new Widget();
	DWidget.name = "Signed By";
	DWidget.addField("Signature");
	
	return DWidget;
};
