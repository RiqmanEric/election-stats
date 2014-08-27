package election.stats;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class VotePercentage {
	int votes;
	double count;
	String state;
	String party;
	String year;

	public VotePercentage(int votes, double count, String state, String party,
			String year) {
		super();
		this.votes = votes;
		this.count = count;
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

	public double getcount() {
		return count;
	}

	public void setcount(double count) {
		this.count = count;
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
