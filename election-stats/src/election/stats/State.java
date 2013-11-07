package election.stats;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class State {
	String name;
	String majorParty;
	
	public State(String name, String majorParty) {
		super();
		this.name = name;
		this.majorParty = majorParty;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMajorParty() {
		return majorParty;
	}

	public void setMajorParty(String majorParty) {
		this.majorParty = majorParty;
	}
	
}
