Create Table Person(
	Name		VARCHAR(45),
	DOB		DATE,
	Photo		OID,
	History		OID,
	DeathDate	DATE,

	PRIMARY KEY(Name, DOB),
	Check(DOB < DeathDate)
);
 
Create Table ActiveRelatives(
	Name1	VARCHAR(45),
	Name2	VARCHAR(45),
	DOB1		DATE,
	DOB2		DATE,

	PRIMARY KEY(Name1 ,Name2 ,DOB1,DOB2),
	FOREIGN KEY (Name1,DOB1) REFERENCES Person(Name,DOB),
	FOREIGN KEY (Name2,DOB2) REFERENCES Person(Name,DOB)
);

Create Table Party(
	Name					VARCHAR(100),
	Ideology				TEXT,
	History					OID,
	NumberOfFollowers		BIGINT,
	Existence				BOOLEAN,
	ElectionSymbol			OID,
	NumberOfMembersInParliament	INT,
	ChairPersonName			VARCHAR(45),
	ChairPersonDOB			DATE,

	PRIMARY KEY (Name),
	Check( Existence =true OR NumberOfMembersInParliament =0 ),
	FOREIGN KEY (ChairPersonName,ChairPersonDOB) REFERENCES Person(Name,DOB),
	UNIQUE(Name,ChairPersonName)

);


Create Table NotablePerson(
	PartyName				VARCHAR(100),
	PersonName				VARCHAR(45),
	DOB					DATE,

	PRIMARY KEY (PersonName,DOB),
	FOREIGN KEY (PartyName) REFERENCES Party(Name),
	FOREIGN KEY (PersonName,DOB) REFERENCES Person(Name,DOB)

);

Create Table State(
	Name					VARCHAR(100),
	MajorPartyName			VARCHAR(100),

	PRIMARY KEY (Name),
	FOREIGN KEY (MajorPartyName) REFERENCES Party(Name)

);

Create Table Constituency(
	Name					VARCHAR(100),
	StateName				VARCHAR(100),
	Facts					TEXT,
	FoundationYear			INT,
	MajorParty				VARCHAR(100),
	
	PRIMARY KEY (Name, StateName),
	FOREIGN KEY (StateName) REFERENCES State(Name),
	FOREIGN KEY (MajorParty) REFERENCES Party(Name)

);

Create Table NotablePersonConstituency(	
	Name					VARCHAR(100),
	StateName				VARCHAR(100),
	NotablePersonName			VARCHAR(45),
	NotablePersonDOB			DATE,

	PRIMARY KEY (Name, StateName, NotablePersonName, NotablePersonDOB),
	FOREIGN KEY (Name, StateName) REFERENCES Constituency(Name,StateName),
	FOREIGN KEY (NotablePersonName, NotablePersonDOB) REFERENCES Person(Name, DOB)

);

Create Table Election (
	Year					INT,
	LokSabha				INT,
	
	PRIMARY KEY (Year)

);


Create Table Stats(
	ElectionYear			INT,
	ConstituencyName		VARCHAR(100),
	StateName				VARCHAR(100),
	TotalVoters				BIGINT,
	VotesCasted				BIGINT,

	PRIMARY KEY(ElectionYear, ConstituencyName,StateName),
	FOREIGN KEY (ConstituencyName, StateName) REFERENCES Constituency(Name,StateName),
	FOREIGN KEY (ElectionYear) REFERENCES Election(Year),
	CHECK(TotalVoters>= VotesCasted)

);

Create Table Users(
	EmailId	VARCHAR(200),
	Name		VARCHAR(45),

	PRIMARY KEY (EmailId)	

);

Create Table Follows(
	EmailId	VARCHAR(200),
	PartyName	VARCHAR(100),


	PRIMARY KEY (EmailId,PartyName),	
	FOREIGN KEY (EmailId) REFERENCES	Users(EmailId),
	FOREIGN KEY (PartyName) REFERENCES Party(Name) 
);

Create Table Candidate(
	CandidateID			BIGINT,
	Votes				BIGINT,
	Year				INT,
	Results				BOOLEAN,				
	PartyName			VARCHAR(100),
	ConstituencyName	VARCHAR(100),
	StateName			VARCHAR(100),
	PersonName			VARCHAR(45),
	PersonDOB			DATE,

	PRIMARY KEY (CandidateID),
	UNIQUE (Year, PartyName, ConstituencyName, StateName, PersonName, PersonDOB),
	FOREIGN KEY (Year) REFERENCES Election (Year),
	FOREIGN KEY (PartyName) REFERENCES Party(Name),
	FOREIGN KEY (ConstituencyName,StateName) REFERENCES Constituency(Name,StateName),	 
	FOREIGN KEY (PersonName,PersonDOB) REFERENCES	Person(Name,DOB)

);

Create Table Discussion(
	ID			BIGINT,
	Content		TEXT,
	EmailId		VARCHAR(200),

	PRIMARY KEY (ID),
	FOREIGN KEY (EmailId) REFERENCES Users(EmailId) 	


);

Create Table Starter(
	ID			BIGINT,
	TOPIC		TEXT,

	PRIMARY KEY (ID),
	FOREIGN KEY (ID) REFERENCES Discussion(ID)	

);

Create Table Comment(
	ID			BIGINT,
	ParentDiscussionID	BIGINT,

	PRIMARY KEY (ID),
	FOREIGN KEY (ParentDiscussionID) REFERENCES Discussion(ID),
	FOREIGN KEY (ID) REFERENCES Discussion(ID)


); 

Create Table PartyStarter(
	ID			BIGINT,
	PartyName	VARCHAR(100),

	PRIMARY KEY (ID,PartyName),
	FOREIGN KEY (ID) REFERENCES Starter(ID),
	FOREIGN KEY (PartyName) REFERENCES Party(Name)

);

Create Table StateStarter(
	ID			BIGINT,
	StateName	VARCHAR(100),

	PRIMARY KEY (ID,StateName),
	FOREIGN KEY (ID) REFERENCES Starter(ID),
	FOREIGN KEY (StateName) REFERENCES State(Name)

);

Create Table ConstituencyStarter(
	ID			BIGINT,
	ConstituencyName	VARCHAR(100),
	StateName	VARCHAR(100),

	PRIMARY KEY (ID,ConstituencyName,StateName),
	FOREIGN KEY (ID) REFERENCES Starter(ID),
	FOREIGN KEY (ConstituencyName,StateName) REFERENCES Constituency(Name,StateName)

);

Create Table PersonStarter(
	ID			BIGINT,
	PersonName	VARCHAR(100),
	PersonDOB	DATE,

	PRIMARY KEY (ID,PersonName),
	FOREIGN KEY (ID) REFERENCES Starter(ID),
	FOREIGN KEY (PersonName,PersonDOB) REFERENCES Person(Name,DOB)

);

Create Table ElectionStarter(
	ID			BIGINT,
	Year		INT,

	PRIMARY KEY (ID,Year),
	FOREIGN KEY (ID) REFERENCES Starter(ID),
	FOREIGN KEY (Year) REFERENCES Election (Year)



);

