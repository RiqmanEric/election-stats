package election.stats;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Person {
	String name;
	String dob;

	public Person(String name, String dob) {
		super();
		this.name = name;
		this.dob = dob;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}
}
