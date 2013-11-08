package election.stats;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class FemaleCandidates {
	int count;
	String state;
	String party;
	String year;
	
	public FemaleCandidates(int count, String state, String party, String year) {
		super();
		this.count = count;
		this.state = state;
		this.party = party;
		this.year = year;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
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
