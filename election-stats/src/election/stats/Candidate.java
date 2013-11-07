package election.stats;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Candidate {
	String name;
	String DOB;
	String state;
	String constituency;
	boolean result;
	String party;
	int votes;
	
	public Candidate(String name, String dOB, String state,
			String constituency, boolean result, String party, int votes) {
		super();
		this.name = name;
		DOB = dOB;
		this.state = state;
		this.constituency = constituency;
		this.result = result;
		this.party = party;
		this.votes = votes;
	}

	public int getVotes() {
		return votes;
	}

	public void setVotes(int votes) {
		this.votes = votes;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getConstituency() {
		return constituency;
	}

	public void setConstituency(String constituency) {
		this.constituency = constituency;
	}

	public String getParty() {
		return party;
	}

	public void setParty(String party) {
		this.party = party;
	}

	public boolean getResult(){
		return result;
	}
	
	public void setResult(boolean result) {
		this.result = result;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDOB() {
		return DOB;
	}

	public void setDOB(String dOB) {
		DOB = dOB;
	}
}
