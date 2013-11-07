package election.stats;

import java.util.ArrayList;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Constituency {
	String name;
	String state;
	String facts;
	String foundationYear;
	String majorParty;
	ArrayList<Person> notablePerson;
	
	public Constituency(String name, String state, String facts,
			String foundationYear, String majorParty,
			ArrayList<Person> notablePerson) {
		super();
		this.name = name;
		this.state = state;
		this.facts = facts;
		this.foundationYear = foundationYear;
		this.majorParty = majorParty;
		this.notablePerson = notablePerson;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getFacts() {
		return facts;
	}

	public void setFacts(String facts) {
		this.facts = facts;
	}

	public String getFoundationYear() {
		return foundationYear;
	}

	public void setFoundationYear(String foundationYear) {
		this.foundationYear = foundationYear;
	}

	public String getMajorParty() {
		return majorParty;
	}

	public void setMajorParty(String majorParty) {
		this.majorParty = majorParty;
	}

	public ArrayList<Person> getNotablePerson() {
		return notablePerson;
	}

	public void setNotablePerson(ArrayList<Person> notablePerson) {
		this.notablePerson = notablePerson;
	}
}
