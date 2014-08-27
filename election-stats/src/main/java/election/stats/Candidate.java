package election.stats;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Candidate {
	int candidateID;
	int votes;
	Double percentVotes;
	int year;
	String result;
	String party;
	String constituency;
	String state;
	Person person;

	public Candidate(int candidateID, int votes, Double percentVotes, int year,
			String result, String party, String constituency, String state,
			Person person) {
		super();
		this.candidateID = candidateID;
		this.votes = votes;
		this.percentVotes = percentVotes;
		this.year = year;
		this.result = result;
		this.party = party;
		this.constituency = constituency;
		this.state = state;
		this.person = person;
	}

	public Double getPercentVotes() {
		return percentVotes;
	}

	public void setPercentVotes(Double percentVotes) {
		this.percentVotes = percentVotes;
	}

	public int getCandidateID() {
		return candidateID;
	}

	public void setCandidateID(int candidateID) {
		this.candidateID = candidateID;
	}

	public int getVotes() {
		return votes;
	}

	public void setVotes(int votes) {
		this.votes = votes;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getParty() {
		return party;
	}

	public void setParty(String party) {
		this.party = party;
	}

	public String getConstituency() {
		return constituency;
	}

	public void setConstituency(String constituency) {
		this.constituency = constituency;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Person getPerson() {
		return person;
	}

	public void setPerson(Person person) {
		this.person = person;
	}
}
