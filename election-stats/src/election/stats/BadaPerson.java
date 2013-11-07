package election.stats;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class BadaPerson {
	ChotaPerson chotaPerson;
	String history;
	
	public BadaPerson(ChotaPerson chotaPerson, String history) {
		super();
		this.chotaPerson = chotaPerson;
		this.history = history;
	}

	public ChotaPerson getChotaPerson() {
		return chotaPerson;
	}

	public void setChotaPerson(ChotaPerson chotaPerson) {
		this.chotaPerson = chotaPerson;
	}

	public String getHistory() {
		return history;
	}

	public void setHistory(String history) {
		this.history = history;
	}
}
