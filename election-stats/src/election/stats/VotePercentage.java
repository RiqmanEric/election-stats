package election.stats;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class VotePercentage {
	int votes;
	double percentage;
	String state;
	String party;
	String year;
	
	public VotePercentage(int votes, double percentage, String state,
			String party, String year) {
		super();
		this.votes = votes;
		this.percentage = percentage;
		this.state = state;
		this.party = party;
		this.year = year;
	}

	public int getVotes() {
		return votes;
	}

	public void setVotes(int votes) {
		this.votes = votes;
	}

	public double getPercentage() {
		return percentage;
	}

	public void setPercentage(double percentage) {
		this.percentage = percentage;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getParty() {
		return party;
	}

	public void setParty(String party) {
		this.party = party;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

}
