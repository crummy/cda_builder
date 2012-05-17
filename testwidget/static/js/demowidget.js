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
	DWidget.addField("Age: 47 years");
	DWidget.addField("Weight: 156 lbs");
	DWidget.addField("Height: 6' 2''");
	
	return DWidget;
};

var Widget_PresentIllness = function()
{
	var DWidget = new Widget();
	DWidget.name = "Present Illness";
	DWidget.addField("Our patient is a 70 year old male referred for further asthma management.");
	
	return DWidget;
};

var Widget_PastMedicalHistory = function()
{
	var DWidget = new Widget();
	DWidget.name = "Past Medical History";
	DWidget.addField("Asthma");
	DWidget.addField("Hypertension");
	DWidget.addField("Osteoarthritis, right knee");
	
	return DWidget;
};

var Widget_Medications = function()
{
	var DWidget = new Widget();
	DWidget.name = "Medications";
	DWidget.addField("Theodur 200mg BID");
	DWidget.addField("Proventil inhaler 2 puffs QID PRN");
	DWidget.addField("Prednisone 20mg qd");
	DWidget.addField("HCTZ 25mg qd");
	
	return DWidget;
};

var Widget_Allergies = function()
{
	var DWidget = new Widget();
	DWidget.name = "Allergies";
	DWidget.addField("Penicillin - Hives");
	DWidget.addField("Aspirin - Wheezing");
	
	return DWidget;
};

var Widget_SocialHistory = function()
{
	var DWidget = new Widget();
	DWidget.name = "Social History";
	DWidget.addField("Smoking :: 1 PPD since 20 years old");
	DWidget.addField("Alcohol :: Rarely");
	
	return DWidget;
};

var Widget_PhysicalExam = function()
{
	var DWidget = new Widget();
	DWidget.name = "Physical Exam";
	DWidget.addField("Skin :: Erythematous rash, palmar surface, left index finger.");
	DWidget.addField("Lungs :: Clear with no wheeze. Good air flow.");
	DWidget.addField("Cardiac :: RRR with no murmur, no S3, no S4.");
	
	return DWidget;
};


var Widget_Labs = function()
{
	var DWidget = new Widget();
	DWidget.name = "Labs";
	DWidget.addField("CXR 02/03/1999: Hyperinflated. Normal cardiac silhouette, clear lungs.");
	DWidget.addField("Peak Flow today: 260 l/m.");
	
	return DWidget;
};

var Widget_Assessment = function()
{
	var DWidget = new Widget();
	DWidget.name = "Assessment";
	DWidget.addField("Asthma, with prior smoking history. Difficulty weaning off steroids. Will try gradual taper.");
	DWidget.addField("Hypertension, well-controlled.");
	DWidget.addField("Contact dermatitis on finger.");
	
	return DWidget;
};

var Widget_Plan = function()
{
	var DWidget = new Widget();
	DWidget.name = "Plan";
	DWidget.addField("Complete PFTs with lung volumes.");
	DWidget.addField("Chem-7");
	DWidget.addField("Provide education material on inhaler usage and peak flow self-monitoring.");
	DWidget.addField("Decrease prednisone to 20qOD alternating with 18qOD.");
	DWidget.addField("Hydrocortisone cream to finger BID.");
	DWidget.addField("RTC 1 week.");
	
	return DWidget;
};

var Widget_Signed = function()
{
	var DWidget = new Widget();
	DWidget.name = "Signed by:";
	DWidget.addField("Robert Dolin, MD April 8, 2000");
	
	return DWidget;
};
